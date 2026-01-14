// src/app/api/contact/route.js
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // IMPORTANT: nodemailer needs node runtime
export const dynamic = "force-dynamic";

/**
 * Optional: very small in-memory rate limit (per server instance).
 * For production with multiple instances, use Redis/Upstash etc.
 */
const RATE_WINDOW_MS = 60_000; // 1 min
const RATE_MAX = 8; // max requests per IP per window
const rateStore = globalThis.__contactRateStore || new Map();
globalThis.__contactRateStore = rateStore;

function getClientIp(req) {
  // Vercel/Proxy typical headers
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xrip = req.headers.get("x-real-ip");
  if (xrip) return xrip.trim();
  return "unknown";
}

function rateLimitOrThrow(ip) {
  const now = Date.now();
  const entry = rateStore.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count += 1;
  rateStore.set(ip, entry);

  if (entry.count > RATE_MAX) {
    const err = new Error("Zu viele Anfragen. Bitte kurz warten und erneut versuchen.");
    err.status = 429;
    throw err;
  }
}

function cleanText(v, max = 4000) {
  const s = (v ?? "").toString().trim();
  // remove control chars
  const safe = s.replace(/[\u0000-\u001F\u007F]/g, " ");
  return safe.length > max ? safe.slice(0, max) + "…" : safe;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedFileType(file) {
  // file.type comes from browser (best-effort), still useful.
  const t = (file?.type || "").toLowerCase();
  return (
    t.startsWith("image/") ||
    t === "application/pdf" ||
    t === "image/heic" ||
    t === "image/heif"
  );
}

function toBase64(buffer) {
  return Buffer.from(buffer).toString("base64");
}

function assertEnv() {
  const required = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "MAIL_FROM",
    "MAIL_TO",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    const err = new Error(`Server-Konfiguration fehlt: ${missing.join(", ")}`);
    err.status = 500;
    throw err;
  }
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req) {
  try {
    assertEnv();

    const ip = getClientIp(req);
    rateLimitOrThrow(ip);

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      return Response.json(
        { ok: false, error: "Ungültiger Request (multipart/form-data erwartet)." },
        { status: 415 }
      );
    }

    const fd = await req.formData();

    // Honeypot
    const website = cleanText(fd.get("website"), 200);
    if (website) {
      return Response.json({ ok: true }, { status: 200 }); // quietly ignore bots
    }

    // Read fields
    const name = cleanText(fd.get("name"), 120);
    const email = cleanText(fd.get("email"), 200);
    const telefon = cleanText(fd.get("telefon"), 60);
    const nachricht = cleanText(fd.get("nachricht"), 6000);
    const betreff = cleanText(fd.get("betreff"), 140);
    const leistung = cleanText(fd.get("leistung"), 80);
    const plz = cleanText(fd.get("plz"), 12);
    const ort = cleanText(fd.get("ort"), 80);
    const strasse = cleanText(fd.get("strasse"), 140);
    const rueckruf = (fd.get("rueckruf") || "").toString() === "ja";
    const rueckrufZeit = cleanText(fd.get("rueckrufZeit"), 140);
    const dsgvo = (fd.get("dsgvo") || "").toString() === "ja";

    // Validate
    if (!name) {
      return Response.json({ ok: false, error: "Bitte geben Sie Ihren Namen an." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse an." },
        { status: 400 }
      );
    }
    if (!dsgvo) {
      return Response.json(
        { ok: false, error: "Bitte stimmen Sie der Datenverarbeitung zu (DSGVO)." },
        { status: 400 }
      );
    }
    if (rueckruf && !telefon) {
      return Response.json(
        { ok: false, error: "Für einen Rückruf benötigen wir Ihre Telefonnummer." },
        { status: 400 }
      );
    }

    // Files
    const filesRaw = fd.getAll("files");

    // IMPORTANT: ignore empty pseudo-files (no selection)
    const files = filesRaw.filter((f) => {
      // In Next/Node runtime, formData files are File objects
      const isFile = typeof f === "object" && f && "arrayBuffer" in f;
      if (!isFile) return false;
    
      // Some browsers send an empty file even when nothing selected
      const name = (f.name || "").trim();
      const size = Number(f.size || 0);
    
      return name.length > 0 && size > 0;
    });
    

    const MAX_FILES = Number(process.env.CONTACT_MAX_FILES || 5);
    const MAX_FILE_BYTES = Number(process.env.CONTACT_MAX_FILE_BYTES || 7_000_000); // 7MB each
    const MAX_TOTAL_BYTES = Number(process.env.CONTACT_MAX_TOTAL_BYTES || 15_000_000); // 15MB total

    if (files.length > MAX_FILES) {
      return Response.json(
        { ok: false, error: `Bitte maximal ${MAX_FILES} Dateien anhängen.` },
        { status: 400 }
      );
    }

    let totalBytes = 0;
    const attachments = [];

    for (const file of files) {
      if (!isAllowedFileType(file)) {
        return Response.json(
          { ok: false, error: "Nur Bilder oder PDF-Dateien sind erlaubt." },
          { status: 400 }
        );
      }

      const size = Number(file.size || 0);
      if (size > MAX_FILE_BYTES) {
        return Response.json(
          { ok: false, error: `Eine Datei ist zu groß (max. ${Math.round(MAX_FILE_BYTES / 1e6)} MB).` },
          { status: 400 }
        );
      }

      totalBytes += size;
      if (totalBytes > MAX_TOTAL_BYTES) {
        return Response.json(
          { ok: false, error: `Anhänge insgesamt zu groß (max. ${Math.round(MAX_TOTAL_BYTES / 1e6)} MB).` },
          { status: 400 }
        );
      }

      const ab = await file.arrayBuffer();
      const filename = cleanText(file.name || "upload", 140) || "upload";
      attachments.push({
        filename,
        content: toBase64(ab),
        encoding: "base64",
        contentType: file.type || undefined,
      });
    }

    // Prepare email content
    const subjectLine = `[DS Zimmerei] ${betreff || "Kontaktanfrage"} — ${name}`;

    const text = [
      `Neue Kontaktanfrage über ds-zimmerei.de`,
      ``,
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${telefon || "-"}`,
      `Rückruf: ${rueckruf ? "Ja" : "Nein"}`,
      `Wunschzeit: ${rueckrufZeit || "-"}`,
      ``,
      `Betreff: ${betreff || "-"}`,
      `Leistung: ${leistung || "-"}`,
      ``,
      `Adresse:`,
      `  Straße: ${strasse || "-"}`,
      `  PLZ/Ort: ${plz || "-"} ${ort || ""}`.trimEnd(),
      ``,
      `Nachricht:`,
      `${nachricht || "-"}`,
      ``,
      `Meta:`,
      `  IP: ${ip}`,
      `  User-Agent: ${cleanText(req.headers.get("user-agent"), 400) || "-"}`,
      `  Zeitpunkt: ${new Date().toISOString()}`,
    ].join("\n");

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; line-height:1.5;">
        <h2 style="margin:0 0 12px;">Neue Kontaktanfrage</h2>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          <tr><td style="padding:6px 12px 6px 0;"><b>Name</b></td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;"><b>E-Mail</b></td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;"><b>Telefon</b></td><td style="padding:6px 0;">${escapeHtml(telefon || "-")}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;"><b>Rückruf</b></td><td style="padding:6px 0;">${rueckruf ? "Ja" : "Nein"}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;"><b>Wunschzeit</b></td><td style="padding:6px 0;">${escapeHtml(rueckrufZeit || "-")}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;"><b>Betreff</b></td><td style="padding:6px 0;">${escapeHtml(betreff || "-")}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;"><b>Leistung</b></td><td style="padding:6px 0;">${escapeHtml(leistung || "-")}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;"><b>Adresse</b></td><td style="padding:6px 0;">
            ${escapeHtml(strasse || "-")}<br/>
            ${escapeHtml(plz || "-")} ${escapeHtml(ort || "")}
          </td></tr>
        </table>
        <hr style="margin:16px 0; border:none; border-top:1px solid #e5e7eb;" />
        <h3 style="margin:0 0 8px;">Nachricht</h3>
        <pre style="white-space:pre-wrap; margin:0; background:#f9fafb; padding:12px; border-radius:10px; border:1px solid #e5e7eb;">${escapeHtml(
          nachricht || "-"
        )}</pre>
        <p style="margin:14px 0 0; color:#6b7280; font-size:12px;">
          IP: ${escapeHtml(ip)} · UA: ${escapeHtml(cleanText(req.headers.get("user-agent"), 300) || "-")}
        </p>
      </div>
    `;

    // Send mail
    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email, // so you can reply directly to the customer
      subject: subjectLine,
      text,
      html,
      attachments,
    });

    // Optional: send confirmation to customer (set env to enable)
    if ((process.env.CONTACT_SEND_AUTOREPLY || "").toLowerCase() === "true") {
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Wir haben Ihre Anfrage erhalten",
        text:
          "Vielen Dank für Ihre Nachricht. Wir melden uns zeitnah bei Ihnen.\n\n— DS Zimmerei & Holzbau",
      });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    const status = err?.status || 500;
    const msg =
      status === 429
        ? err.message
        : status === 500
        ? "Serverfehler. Bitte später erneut versuchen."
        : err?.message || "Fehler beim Senden.";

    console.error("CONTACT_API_ERROR", err);
    return Response.json({ ok: false, error: msg }, { status });
  }
}

function escapeHtml(str) {
  return (str ?? "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
