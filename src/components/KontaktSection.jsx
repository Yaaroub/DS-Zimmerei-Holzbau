// src/components/KontaktSection.jsx
"use client";

import { useState } from "react";

export default function KontaktSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier später API-Route anbinden (/api/contact)
    setSent(true);
  };

  return (
    <section
      id="kontakt"
      className="bg-black text-white py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[1.3fr,1fr]">
        {/* Text & Vorteile */}
        <div>
          <p className="text-[#17E800] uppercase tracking-[0.25em] text-sm font-semibold">
            Kontakt
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Angebot anfordern oder Rückruf vereinbaren
          </h2>
          <p className="text-gray-300 mt-4 text-sm md:text-base max-w-xl">
            Beschreiben Sie uns Ihr Vorhaben – wir melden uns zeitnah mit
            Rückfragen oder einem unverbindlichen Angebot.
          </p>

          <div className="mt-6 grid gap-3 text-sm text-gray-200">
            <p>• Zimmerei- &amp; Dacharbeiten für Neu- und Bestandsbauten</p>
            <p>• Sanierungen, Gauben, Carports, Terrassen, Fassaden</p>
            <p>• Fenster- &amp; Türenaustausch, Innenausbau, Dachflächenfenster</p>
          </div>

          <div
            id="rueckruf"
            className="mt-8 rounded-xl border border-[#17E800]/40 bg-[#050505] px-4 py-4 text-sm text-gray-200"
          >
            <p className="font-semibold text-white mb-1">
              Rückruf gewünscht?
            </p>
            <p>
              Schreiben Sie einfach Ihre Telefonnummer in das Formular und wir
              melden uns bei Ihnen.
            </p>
          </div>
        </div>

        {/* Formular */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-7 shadow-[0_0_24px_rgba(0,0,0,0.6)]">
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-300">
                  Name <span className="text-[#17E800]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-md bg-black/60 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-[#17E800] focus:ring-1 focus:ring-[#17E800]"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Telefon</label>
                <input
                  type="tel"
                  className="w-full rounded-md bg-black/60 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-[#17E800] focus:ring-1 focus:ring-[#17E800]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-300">
                E-Mail <span className="text-[#17E800]">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full rounded-md bg-black/60 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-[#17E800] focus:ring-1 focus:ring-[#17E800]"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-300">
                Ihr Vorhaben / Projekt
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md bg-black/60 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-[#17E800] focus:ring-1 focus:ring-[#17E800] resize-none"
                placeholder="z.B. Dachsanierung, Gaube, Anbau, Carport, Fenster-/Türentausch…"
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#17E800] px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_18px_rgba(23,232,0,0.7)] transition hover:bg-white"
            >
              Nachricht senden
            </button>

            {sent && (
              <p className="text-xs text-[#8BFF7A] mt-2">
                Vielen Dank! Ihre Nachricht wurde vorgemerkt. Die technische
                Übermittlung kann später über eine API ergänzt werden.
              </p>
            )}

            <p className="text-[11px] text-gray-500 mt-4">
              Mit dem Absenden erklären Sie sich damit einverstanden, dass wir
              Ihre Angaben zur Beantwortung Ihrer Anfrage verwenden. Weitere
              Informationen zum Datenschutz folgen im Impressum/Datenschutz.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
