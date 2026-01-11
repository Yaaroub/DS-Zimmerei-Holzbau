// src/app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      telefon,
      nachricht,
      rueckruf,
      rueckrufZeit,
    } = body || {};

    if (!name || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name und E-Mail sind erforderlich.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const rueckrufText = rueckruf
      ? `JA (bitte zurückrufen)\nBevorzugte Zeit: ${
          rueckrufZeit || "keine Angabe"
        }`
      : "NEIN";

    const mailText = `
Neue Anfrage über das Kontaktformular der Website (DS Zimmerei & Holzbau)

Name: ${name}
E-Mail: ${email}
Telefon: ${telefon || "-"}

Rückruf gewünscht: ${rueckrufText}

Nachricht / Projektbeschreibung:
${nachricht || "-"}

Eingang: ${new Date().toLocaleString("de-DE")}
    `.trim();

    await transporter.sendMail({
      from: process.env.CONTACT_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `Neue Anfrage von ${name} – DS Zimmerei & Holzbau`,
      replyTo: email,
      text: mailText,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Kontakt-API Fehler:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Serverfehler beim Senden der E-Mail.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
