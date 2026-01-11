// src/components/KontaktSection.jsx
"use client";

import { useState } from "react";

export default function KontaktSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSent(false);
    setErrorMsg("");
    setLoading(true);

    try {
      const formData = new FormData(e.target);

      const payload = {
        name: formData.get("name") || "",
        telefon: formData.get("telefon") || "",
        email: formData.get("email") || "",
        nachricht: formData.get("nachricht") || "",
        rueckruf: formData.get("rueckruf") === "ja",
        rueckrufZeit: formData.get("rueckrufZeit") || "",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Fehler beim Senden");

      setSent(true);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="kontakt"
      className="
        bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F8FA_100%)]
        text-brand-text
        py-24 md:py-32
        px-6
        border-t border-brand-border
      "
    >
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[1.3fr,1fr] items-start">
        {/* Text & Vorteile */}
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-brand-green uppercase tracking-[0.25em] text-sm font-semibold">
              Kontakt
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Angebot anfordern oder Rückruf vereinbaren
            </h2>
            <p className="text-brand-textMuted text-sm md:text-base max-w-xl leading-relaxed">
              Beschreiben Sie uns Ihr Vorhaben – wir melden uns zeitnah mit
              Rückfragen oder einem unverbindlichen Angebot.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-brand-textMuted">
            <p>• Zimmerei- &amp; Dacharbeiten für Neu- und Bestandsbauten</p>
            <p>• Sanierungen, Gauben, Carports, Terrassen, Fassaden</p>
            <p>• Fenster- &amp; Türenaustausch, Innenausbau, Dachflächenfenster</p>
          </div>

          {/* Rückruf Info Box */}
          <div
            id="rueckruf"
            className="
              rounded-2xl
              border border-brand-border
              bg-brand-surface
              p-5 md:p-6
              shadow-[0_12px_30px_rgba(15,23,42,0.08)]
            "
          >
            <div className="border-l-[3px] border-brand-green/70 pl-4">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-textMuted">
                Rückruf gewünscht?
              </p>
              <p className="text-base font-semibold mt-1">
                Wir melden uns telefonisch bei Ihnen.
              </p>
              <p className="mt-2 text-sm text-brand-textMuted leading-relaxed">
                Tragen Sie einfach Ihre Telefonnummer ein und setzen Sie das
                Häkchen für einen Rückruf – optional mit Wunschzeit.
              </p>
            </div>
          </div>
        </div>

        {/* Formular */}
        <div
          className="
            bg-brand-surface
            border border-brand-border
            rounded-2xl
            p-6 md:p-8
            shadow-[0_12px_30px_rgba(15,23,42,0.08)]
          "
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-brand-textMuted">
                  Name <span className="text-brand-green">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="
                    w-full rounded-lg
                    bg-white
                    border border-brand-border
                    px-3 py-2
                    text-sm text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                />
              </div>

              <div>
                <label className="block mb-1 text-brand-textMuted">
                  Telefon 
                </label>
                <input
                  name="telefon"
                  type="tel"
                  autoComplete="tel"
                  className="
                    w-full rounded-lg
                    bg-white
                    border border-brand-border
                    px-3 py-2
                    text-sm text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-brand-textMuted">
                E-Mail <span className="text-brand-green">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="
                  w-full rounded-lg
                  bg-white
                  border border-brand-border
                  px-3 py-2
                  text-sm text-brand-text
                  outline-none
                  focus:border-brand-green/60
                  focus:ring-2 focus:ring-brand-green/20
                "
              />
            </div>

            <div>
              <label className="block mb-1 text-brand-textMuted">
                Ihr Vorhaben / Projekt
              </label>
              <textarea
                name="nachricht"
                rows={4}
                className="
                  w-full rounded-lg
                  bg-white
                  border border-brand-border
                  px-3 py-2
                  text-sm text-brand-text
                  outline-none
                  focus:border-brand-green/60
                  focus:ring-2 focus:ring-brand-green/20
                  resize-none
                "
                placeholder="z.B. Dachsanierung, Gaube, Anbau, Carport, Fenster-/Türentausch…"
              />
            </div>

            {/* Rückruf-Option */}
            <div className="mt-3 space-y-2">
              <label className="block text-brand-text font-semibold">
                Rückrufvereinbarung
              </label>

              <div className="flex items-start gap-2">
                <input
                  id="rueckrufCheck"
                  name="rueckruf"
                  type="checkbox"
                  value="ja"
                  className="
                    mt-0.5 h-4 w-4 rounded
                    border border-brand-border
                    bg-white
                    text-brand-green
                    focus:ring-2 focus:ring-brand-green/20
                  "
                />
                <label htmlFor="rueckrufCheck" className="text-xs text-brand-textMuted">
                  Ich wünsche einen telefonischen Rückruf.
                </label>
              </div>

              <div>
                <label className="block mb-1 text-brand-textMuted text-xs">
                  Bevorzugte Rückrufzeit (optional)
                </label>
                <input
                  name="rueckrufZeit"
                  type="text"
                  placeholder="z.B. werktags zwischen 16 und 18 Uhr"
                  className="
                    w-full rounded-lg
                    bg-white
                    border border-brand-border
                    px-3 py-2
                    text-xs text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                mt-2 inline-flex w-full items-center justify-center
                rounded-full
                bg-brand-green text-black
                px-6 py-3
                text-sm font-semibold
                shadow-sm
                hover:brightness-110
                transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Wird gesendet…" : "Nachricht senden"}
            </button>

            {sent && (
              <div className="rounded-xl border border-brand-green/25 bg-brand-green/10 px-4 py-3">
                <p className="text-xs text-brand-text">
                  <span className="font-semibold">Vielen Dank!</span> Ihre Nachricht wurde
                  erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen.
                </p>
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-xs text-red-700">{errorMsg}</p>
              </div>
            )}

            <p className="text-[11px] text-brand-textMuted mt-4 leading-relaxed">
              Mit dem Absenden erklären Sie sich damit einverstanden, dass wir
              Ihre Angaben zur Beantwortung Ihrer Anfrage verwenden. Weitere
              Informationen finden Sie in der Datenschutzerklärung.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
