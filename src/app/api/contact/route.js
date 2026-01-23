// src/app/api/contact/route.js
import nodemailer from "nodemailer";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs"; // nodemailer needs Node runtime
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
    const err = new Error(
      "Zu viele Anfragen. Bitte kurz warten und erneut versuchen."
    );
    err.status = 429;
    throw err;
  }
}

function cleanText(v, max = 4000) {
  const s = (v ?? "").toString().trim();
  const safe = s.replace(/[\u0000-\u001F\u007F]/g, " ");
  return safe.length > max ? safe.slice(0, max) + "…" : safe;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Robust file type check (MIME + extension fallback)
function isAllowedFileType(file) {
  const t = (file?.type || "").toLowerCase();
  const name = (file?.name || "").toLowerCase();

  if (t.startsWith("image/")) return true;
  if (t === "application/pdf") return true;

  const allowedExt = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".heic",
    ".heif",
    ".pdf",
  ];
  return allowedExt.some((ext) => name.endsWith(ext));
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

async function loadLogoPngBase64() {
  // Put logo here: /public/ds-logo.png
  const p = path.join(process.cwd(), "public", "ds-logo.png");
  const buf = await fs.readFile(p);
  return buf.toString("base64");
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

export async function POST(req) {
  try {
    assertEnv();

    const ip = getClientIp(req);
    rateLimitOrThrow(ip);

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      return Response.json(
        {
          ok: false,
          error: "Ungültiger Request (multipart/form-data erwartet).",
        },
        { status: 415 }
      );
    }

    const fd = await req.formData();

    // Honeypot
    const website = cleanText(fd.get("website"), 200);
    if (website) return Response.json({ ok: true }, { status: 200 });

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
      return Response.json(
        { ok: false, error: "Bitte geben Sie Ihren Namen an." },
        { status: 400 }
      );
    }
    if (!email || !isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse an." },
        { status: 400 }
      );
      if (!nachricht) {
        return Response.json(
          { ok: false, error: "Bitte beschreiben Sie Ihr Vorhaben / Projekt." },
          { status: 400 }
        );
      }
    }
    if (!dsgvo) {
      return Response.json(
        {
          ok: false,
          error: "Bitte stimmen Sie der Datenverarbeitung zu (DSGVO).",
        },
        { status: 400 }
      );
    }
    if (rueckruf && !telefon) {
      return Response.json(
        {
          ok: false,
          error: "Für einen Rückruf benötigen wir Ihre Telefonnummer.",
        },
        { status: 400 }
      );
    }

    // Files (ignore empty pseudo-files)
    const filesRaw = fd.getAll("files");
    const files = filesRaw.filter((f) => {
      const isFile = typeof f === "object" && f && "arrayBuffer" in f;
      if (!isFile) return false;
      const fn = (f.name || "").trim();
      const sz = Number(f.size || 0);
      return fn.length > 0 && sz > 0;
    });

    const MAX_FILES = Number(process.env.CONTACT_MAX_FILES || 5);
    const MAX_FILE_BYTES = Number(
      process.env.CONTACT_MAX_FILE_BYTES || 7_000_000
    );
    const MAX_TOTAL_BYTES = Number(
      process.env.CONTACT_MAX_TOTAL_BYTES || 15_000_000
    );

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
          {
            ok: false,
            error: `Eine Datei ist zu groß (max. ${Math.round(
              MAX_FILE_BYTES / 1e6
            )} MB).`,
          },
          { status: 400 }
        );
      }

      totalBytes += size;
      if (totalBytes > MAX_TOTAL_BYTES) {
        return Response.json(
          {
            ok: false,
            error: `Anhänge insgesamt zu groß (max. ${Math.round(
              MAX_TOTAL_BYTES / 1e6
            )} MB).`,
          },
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

    // Prepare main email
    const subjectLine = `[DS Zimmerei] ${
      betreff || "Kontaktanfrage"
    } — ${name}`;

    const text = [
      `Neue Kontaktanfrage über ds-zimmerei-holzbau.de`,
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
    <tr><td style="padding:6px 12px 6px 0;"><b>Name</b></td><td style="padding:6px 0;">${escapeHtml(
      name
    )}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;"><b>E-Mail</b></td><td style="padding:6px 0;">${escapeHtml(
      email
    )}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;"><b>Telefon</b></td><td style="padding:6px 0;">${escapeHtml(
      telefon || "-"
    )}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;"><b>Rückruf</b></td><td style="padding:6px 0;">${
      rueckruf ? "Ja" : "Nein"
    }</td></tr>
    <tr><td style="padding:6px 12px 6px 0;"><b>Wunschzeit</b></td><td style="padding:6px 0;">${escapeHtml(
      rueckrufZeit || "-"
    )}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;"><b>Betreff</b></td><td style="padding:6px 0;">${escapeHtml(
      betreff || "-"
    )}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;"><b>Leistung</b></td><td style="padding:6px 0;">${escapeHtml(
      leistung || "-"
    )}</td></tr>
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
    IP: ${escapeHtml(ip)} · UA: ${escapeHtml(
      cleanText(req.headers.get("user-agent"), 300) || "-"
    )}
  </p>
</div>
`;

    const transporter = createTransporter();

    // 1) send to business inbox
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: subjectLine,
      text,
      html,
      attachments,
    });

    // 2) optional auto reply (PNG logo via CID)
    const AUTO = (process.env.CONTACT_SEND_AUTOREPLY || "")
      .trim()
      .toLowerCase();
    const sendAutoReply = ["true", "1", "yes", "y", "on"].includes(AUTO);

    if (sendAutoReply) {
      const customerName = cleanText(name, 80) || "Guten Tag";

      // logo is optional – do not fail the request if logo file is missing
      let logoAttachment = null;
      try {
        const logoBase64 = await loadLogoPngBase64();
        logoAttachment = {
          filename: "ds-logo.png",
          content: logoBase64,
          encoding: "base64",
          cid: "dslogo",
          contentType: "image/png",
        };
      } catch (e) {
        console.warn("AUTOREPLY_LOGO_MISSING", e?.message || e);
      }

      const autoText = `
Hallo ${customerName},

vielen Dank für Ihre Anfrage.

Wir haben Ihre Nachricht erhalten und melden uns zeitnah persönlich bei Ihnen.

Mit freundlichen Grüßen
DS Zimmerei & Holzbau
Zimmerermeister Dennis Steckel

Telefon: 0172 9759134
E-Mail: kontakt@ds-zimmerei-holzbau.de
Web: https://ds-zimmerei-holzbau.de
`.trim();

      const autoHtml = `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#0f172a;">

  <!-- Message -->
  <p style="margin:0 0 12px;">
    <strong>Hallo ${escapeHtml(customerName)},</strong>
  </p>

  <p style="margin:0 0 10px;">
    vielen Dank für Ihre Anfrage.
  </p>

  <p style="margin:0 0 18px;">
    Wir haben Ihre Nachricht erhalten und melden uns zeitnah persönlich bei Ihnen.
  </p>
  <p style="margin:0 0 10px;">
    Mit freundlichen Grüßen<br/>
    <p/>
  

  <!-- Green line = start of signature -->
  <div style="
    height:4px;
    width:100%;
    background:#17E800;
    border-radius:2px 2px 0 0;
  "></div>

  <!-- Signature block -->
  <div style="
    background:#0f172a;
    color:#e5e7eb;
    padding:18px 18px 16px;
    border-radius:0 0 12px 12px;
  ">
    <p style="margin:0 0 6px;color:#ffffff;">
      <strong>DS Zimmerei &amp; Holzbau</strong>
    </p>

    <p style="margin:0 0 10px;color:#cbd5e1;">
      Zimmerermeister Dennis Steckel
    </p>

    <p style="margin:0 0 10px;font-size:13px;color:#cbd5e1;">
      Telefon:
      <a href="tel:+491729759134" style="color:#e5e7eb;text-decoration:none;">
        0172&nbsp;9759134
      </a><br>
      E-Mail:
      <a href="mailto:kontakt@ds-zimmerei-holzbau.de" style="color:#e5e7eb;text-decoration:none;">
        kontakt@ds-zimmerei-holzbau.de
      </a><br>
      Web:
      <a href="https://ds-zimmerei-holzbau.de" style="color:#e5e7eb;text-decoration:none;">
        ds-zimmerei-holzbau.de
      </a>
    </p>

    ${
      logoAttachment
        ? `<div style="margin-top:14px;">
             <img
               src="cid:dslogo"
               alt="DS Zimmerei & Holzbau"
               width="200"
               style="display:block;border:0;outline:none;text-decoration:none;"
             />
           </div>`
        : ""
    }
  </div>

  <p style="margin-top:10px;font-size:11px;color:#6b7280;">
    Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.
  </p>
</div>

`;

      try {
        await transporter.sendMail({
          from: process.env.MAIL_FROM,
          to: email,
          replyTo: process.env.MAIL_TO,
          subject: "Vielen Dank für Ihre Anfrage – DS Zimmerei & Holzbau",
          text: autoText,
          html: autoHtml,
          headers: {
            "Auto-Submitted": "auto-replied",
            "X-Auto-Response-Suppress": "All",
          },
          attachments: logoAttachment ? [logoAttachment] : [],
        });
      } catch (e) {
        // do not fail whole request if autoreply fails
        console.error("AUTOREPLY_ERROR", e);
      }
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    const status = err?.status || 500;

    console.error("CONTACT_API_ERROR", {
      code: err?.code,
      responseCode: err?.responseCode,
      command: err?.command,
      message: err?.message,
    });

    const msg =
      status === 429
        ? err.message
        : status === 500
        ? "Serverfehler. Bitte später erneut versuchen."
        : err?.message || "Fehler beim Senden.";

    return Response.json({ ok: false, error: msg }, { status });
  }
}

// import { Resend } from "resend";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// /* ---------------- Rate Limit (in-memory) ---------------- */
// const RATE_WINDOW_MS = 60_000;
// const RATE_MAX = 8;
// const rateStore = globalThis.__contactRateStore || new Map();
// globalThis.__contactRateStore = rateStore;

// function getClientIp(req) {
//   const xff = req.headers.get("x-forwarded-for");
//   if (xff) return xff.split(",")[0].trim();
//   const xrip = req.headers.get("x-real-ip");
//   if (xrip) return xrip.trim();
//   return "unknown";
// }

// function rateLimitOrThrow(ip) {
//   const now = Date.now();
//   const entry = rateStore.get(ip) || { count: 0, start: now };

//   if (now - entry.start > RATE_WINDOW_MS) {
//     entry.count = 0;
//     entry.start = now;
//   }

//   entry.count += 1;
//   rateStore.set(ip, entry);

//   if (entry.count > RATE_MAX) {
//     const err = new Error("Zu viele Anfragen. Bitte kurz warten und erneut versuchen.");
//     err.status = 429;
//     throw err;
//   }
// }

// /* ---------------- Helpers ---------------- */
// function assertEnv() {
//   const required = ["RESEND_API_KEY", "MAIL_FROM", "MAIL_TO"];
//   const missing = required.filter((k) => !process.env[k]);
//   if (missing.length) {
//     const err = new Error(`Server-Konfiguration fehlt: ${missing.join(", ")}`);
//     err.status = 500;
//     throw err;
//   }
// }

// function cleanText(v, max = 4000) {
//   const s = (v ?? "").toString().trim();
//   const safe = s.replace(/[\u0000-\u001F\u007F]/g, " ");
//   return safe.length > max ? safe.slice(0, max) + "…" : safe;
// }

// function escapeHtml(str) {
//   return (str ?? "")
//     .toString()
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//     .replaceAll("'", "&#039;");
// }

// function isValidEmail(email) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function isAllowedFileType(file) {
//   const t = (file?.type || "").toLowerCase();
//   const name = (file?.name || "").toLowerCase();

//   if (t.startsWith("image/")) return true;
//   if (t === "application/pdf") return true;

//   const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".heif", ".pdf"];
//   return allowedExt.some((ext) => name.endsWith(ext));
// }

// function toBase64(buffer) {
//   return Buffer.from(buffer).toString("base64");
// }

// /* ---------------- Route ---------------- */
// export async function POST(req) {
//   try {
//     assertEnv();

//     const ip = getClientIp(req);
//     rateLimitOrThrow(ip);

//     const contentType = req.headers.get("content-type") || "";
//     if (!contentType.toLowerCase().includes("multipart/form-data")) {
//       return Response.json(
//         { ok: false, error: "Ungültiger Request (multipart/form-data erwartet)." },
//         { status: 415 }
//       );
//     }

//     const fd = await req.formData();

//     // Honeypot
//     const website = cleanText(fd.get("website"), 200);
//     if (website) return Response.json({ ok: true }, { status: 200 });

//     // Fields
//     const name = cleanText(fd.get("name"), 120);
//     const email = cleanText(fd.get("email"), 200);
//     const telefon = cleanText(fd.get("telefon"), 60);
//     const nachricht = cleanText(fd.get("nachricht"), 6000);
//     const betreff = cleanText(fd.get("betreff"), 140);
//     const leistung = cleanText(fd.get("leistung"), 80);
//     const plz = cleanText(fd.get("plz"), 12);
//     const ort = cleanText(fd.get("ort"), 80);
//     const strasse = cleanText(fd.get("strasse"), 140);
//     const rueckruf = (fd.get("rueckruf") || "").toString() === "ja";
//     const rueckrufZeit = cleanText(fd.get("rueckrufZeit"), 140);
//     const dsgvo = (fd.get("dsgvo") || "").toString() === "ja";

//     // Validate
//     if (!name) return Response.json({ ok: false, error: "Bitte geben Sie Ihren Namen an." }, { status: 400 });
//     if (!email || !isValidEmail(email))
//       return Response.json({ ok: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse an." }, { status: 400 });
//     if (!dsgvo)
//       return Response.json({ ok: false, error: "Bitte stimmen Sie der Datenverarbeitung zu (DSGVO)." }, { status: 400 });
//     if (rueckruf && !telefon)
//       return Response.json({ ok: false, error: "Für einen Rückruf benötigen wir Ihre Telefonnummer." }, { status: 400 });

//     // Files (ignore empty pseudo-files)
//     const filesRaw = fd.getAll("files");
//     const files = filesRaw.filter((f) => {
//       const isFile = typeof f === "object" && f && "arrayBuffer" in f;
//       if (!isFile) return false;
//       const fn = (f.name || "").trim();
//       const sz = Number(f.size || 0);
//       return fn.length > 0 && sz > 0;
//     });

//     const MAX_FILES = Number(process.env.CONTACT_MAX_FILES || 5);
//     const MAX_FILE_BYTES = Number(process.env.CONTACT_MAX_FILE_BYTES || 7_000_000);
//     const MAX_TOTAL_BYTES = Number(process.env.CONTACT_MAX_TOTAL_BYTES || 15_000_000);

//     if (files.length > MAX_FILES) {
//       return Response.json({ ok: false, error: `Bitte maximal ${MAX_FILES} Dateien anhängen.` }, { status: 400 });
//     }

//     let totalBytes = 0;
//     const attachments = [];

//     for (const file of files) {
//       if (!isAllowedFileType(file)) {
//         return Response.json({ ok: false, error: "Nur Bilder oder PDF-Dateien sind erlaubt." }, { status: 400 });
//       }

//       const size = Number(file.size || 0);
//       if (size > MAX_FILE_BYTES) {
//         return Response.json(
//           { ok: false, error: `Eine Datei ist zu groß (max. ${Math.round(MAX_FILE_BYTES / 1e6)} MB).` },
//           { status: 400 }
//         );
//       }

//       totalBytes += size;
//       if (totalBytes > MAX_TOTAL_BYTES) {
//         return Response.json(
//           { ok: false, error: `Anhänge insgesamt zu groß (max. ${Math.round(MAX_TOTAL_BYTES / 1e6)} MB).` },
//           { status: 400 }
//         );
//       }

//       const ab = await file.arrayBuffer();
//       attachments.push({
//         filename: cleanText(file.name || "upload", 140) || "upload",
//         content: toBase64(ab),
//       });
//     }

//     const resend = new Resend(process.env.RESEND_API_KEY);

//     // Business Mail
//     const subjectLine = `[DS Zimmerei] ${betreff || "Kontaktanfrage"} — ${name}`;

//     const text = [
//       `Neue Kontaktanfrage über ds-zimmerei-holzbau.de`,
//       ``,
//       `Name: ${name}`,
//       `E-Mail: ${email}`,
//       `Telefon: ${telefon || "-"}`,
//       `Rückruf: ${rueckruf ? "Ja" : "Nein"}`,
//       `Wunschzeit: ${rueckrufZeit || "-"}`,
//       ``,
//       `Betreff: ${betreff || "-"}`,
//       `Leistung: ${leistung || "-"}`,
//       ``,
//       `Adresse:`,
//       `  Straße: ${strasse || "-"}`,
//       `  PLZ/Ort: ${plz || "-"} ${ort || ""}`.trimEnd(),
//       ``,
//       `Nachricht:`,
//       `${nachricht || "-"}`,
//       ``,
//       `Meta:`,
//       `  IP: ${ip}`,
//       `  User-Agent: ${cleanText(req.headers.get("user-agent"), 400) || "-"}`,
//       `  Zeitpunkt: ${new Date().toISOString()}`,
//     ].join("\n");

//     const html = `
// <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; line-height:1.5;">
//   <h2 style="margin:0 0 12px;">Neue Kontaktanfrage</h2>
//   <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
//     <tr><td style="padding:6px 12px 6px 0;"><b>Name</b></td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
//     <tr><td style="padding:6px 12px 6px 0;"><b>E-Mail</b></td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>
//     <tr><td style="padding:6px 12px 6px 0;"><b>Telefon</b></td><td style="padding:6px 0;">${escapeHtml(telefon || "-")}</td></tr>
//     <tr><td style="padding:6px 12px 6px 0;"><b>Rückruf</b></td><td style="padding:6px 0;">${rueckruf ? "Ja" : "Nein"}</td></tr>
//     <tr><td style="padding:6px 12px 6px 0;"><b>Wunschzeit</b></td><td style="padding:6px 0;">${escapeHtml(rueckrufZeit || "-")}</td></tr>
//     <tr><td style="padding:6px 12px 6px 0;"><b>Betreff</b></td><td style="padding:6px 0;">${escapeHtml(betreff || "-")}</td></tr>
//     <tr><td style="padding:6px 12px 6px 0;"><b>Leistung</b></td><td style="padding:6px 0;">${escapeHtml(leistung || "-")}</td></tr>
//     <tr><td style="padding:6px 12px 6px 0;"><b>Adresse</b></td><td style="padding:6px 0;">
//       ${escapeHtml(strasse || "-")}<br/>
//       ${escapeHtml(plz || "-")} ${escapeHtml(ort || "")}
//     </td></tr>
//   </table>
//   <hr style="margin:16px 0; border:none; border-top:1px solid #e5e7eb;" />
//   <h3 style="margin:0 0 8px;">Nachricht</h3>
//   <pre style="white-space:pre-wrap; margin:0; background:#f9fafb; padding:12px; border-radius:10px; border:1px solid #e5e7eb;">${escapeHtml(
//     nachricht || "-"
//   )}</pre>
// </div>`;

//     const businessRes = await resend.emails.send({
//       from: process.env.MAIL_FROM,
//       to: process.env.MAIL_TO,
//       reply_to: email,
//       subject: subjectLine,
//       text,
//       html,
//       attachments,
//     });

//     if (businessRes?.error) {
//       const err = new Error(businessRes.error.message || "Mailversand fehlgeschlagen.");
//       err.status = 502;
//       throw err;
//     }

//     // Optional Autoreply
//     const AUTO = (process.env.CONTACT_SEND_AUTOREPLY || "").trim().toLowerCase();
//     const sendAutoReply = ["true", "1", "yes", "y", "on"].includes(AUTO);

//     if (sendAutoReply) {
//       const customerName = cleanText(name, 80) || "Guten Tag";

//       const autoText = `
// Hallo ${customerName},

// vielen Dank für Ihre Anfrage.

// Wir haben Ihre Nachricht erhalten und melden uns zeitnah persönlich bei Ihnen.

// Mit freundlichen Grüßen
// DS Zimmerei & Holzbau
// Zimmerermeister Dennis Steckel

// Telefon: 0172 9759134
// E-Mail: kontakt@ds-zimmerei-holzbau.de
// Web: https://ds-zimmerei-holzbau.de
// `.trim();

//       const autoHtml = `
// <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#0f172a;">
//   <div style="height:4px;width:100%;background:#17E800;margin-bottom:18px;"></div>

//   <p style="margin:0 0 12px;"><strong>Hallo ${escapeHtml(customerName)},</strong></p>
//   <p style="margin:0 0 10px;">vielen Dank für Ihre Anfrage.</p>
//   <p style="margin:0 0 10px;">Wir haben Ihre Nachricht erhalten und melden uns zeitnah persönlich bei Ihnen.</p>

//   <div style="margin-top:24px;">
//     <p style="margin:0;">
//       Mit freundlichen Grüßen<br>
//       <strong>DS Zimmerei &amp; Holzbau</strong><br>
//       <span style="color:#475569;">Zimmerermeister Dennis Steckel</span>
//     </p>

//     <p style="margin:12px 0 0;font-size:13px;color:#475569;">
//       Telefon: <a href="tel:+491729759134" style="color:#0f172a;text-decoration:none;">0172&nbsp;9759134</a><br>
//       E-Mail: <a href="mailto:kontakt@ds-zimmerei-holzbau.de" style="color:#0f172a;text-decoration:none;">kontakt@ds-zimmerei-holzbau.de</a><br>
//       Web: <a href="https://ds-zimmerei-holzbau.de" style="color:#0f172a;text-decoration:none;">ds-zimmerei-holzbau.de</a>
//     </p>

//     <div style="margin-top:14px;color:#6b7280;font-size:11px;">
//       Hinweis: Diese E-Mail wurde automatisch generiert.
//     </div>
//   </div>
// </div>`;

//       const autoRes = await resend.emails.send({
//         from: process.env.MAIL_FROM,
//         to: email,
//         reply_to: process.env.MAIL_TO,
//         subject: "Vielen Dank für Ihre Anfrage – DS Zimmerei & Holzbau",
//         text: autoText,
//         html: autoHtml,
//         headers: {
//           "Auto-Submitted": "auto-replied",
//           "X-Auto-Response-Suppress": "All",
//         },
//       });

//       // Do not fail request if autoreply fails
//       if (autoRes?.error) console.error("AUTOREPLY_ERROR", autoRes.error);
//     }

//     return Response.json({ ok: true }, { status: 200 });
//   } catch (err) {
//     const status = err?.status || 500;
//     console.error("CONTACT_API_ERROR", {
//       status,
//       message: err?.message,
//       code: err?.code,
//     });

//     const msg =
//       status === 429
//         ? err.message
//         : status === 500
//         ? "Serverfehler. Bitte später erneut versuchen."
//         : err?.message || "Fehler beim Senden.";

//     return Response.json({ ok: false, error: msg }, { status });
//   }
// }
