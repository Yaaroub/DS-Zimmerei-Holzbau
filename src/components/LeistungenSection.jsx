// src/components/LeistungenSection.jsx
"use client";

export default function LeistungenSection() {
    return (
      <section
        id="leistungen"
        className="bg-black text-white py-20 md:py-28 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-brand-green uppercase tracking-[0.25em] text-sm font-semibold">
              Unsere Leistungen
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Zimmerei · Dachdeckerarbeiten · Innenausbau
            </h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">
              Handwerkliche Meisterqualität für Neubau, Sanierung und individuelle
              Holzbauprojekte.
            </p>
          </div>
  
          {/* Karten-Gitter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Box 1 */}
            <div className="rounded-2xl border border-white/5 bg-brand-muted p-6 md:p-7 shadow-[0_0_14px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-brand-green hover:shadow-[0_0_24px_rgba(23,232,0,0.25)]">
              <h3 className="text-xl font-semibold text-brand-green mb-4">
                Zimmerei &amp; Dachdeckerarbeiten
              </h3>
              <ul className="space-y-2 text-gray-200 text-sm md:text-base">
                <li className="list-disc ml-5">Neu- und Anbauten</li>
                <li className="list-disc ml-5">Gauben</li>
                <li className="list-disc ml-5">Dachstühle</li>
                <li className="list-disc ml-5">Dachsanierungen</li>
                <li className="list-disc ml-5">Carports &amp; Terrassen</li>
                <li className="list-disc ml-5">
                  Energetische Sanierung der Gebäudehülle
                </li>
              </ul>
            </div>
  
            {/* Box 2 */}
            <div className="rounded-2xl border border-white/5 bg-brand-muted p-6 md:p-7 shadow-[0_0_14px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-brand-green hover:shadow-[0_0_24px_rgba(23,232,0,0.25)]">
              <h3 className="text-xl font-semibold text-brand-green mb-4">
                Baudischlerei &amp; Innenausbau
              </h3>
              <ul className="space-y-2 text-gray-200 text-sm md:text-base">
                <li className="list-disc ml-5">Einbauten</li>
                <li className="list-disc ml-5">Innentüren</li>
                <li className="list-disc ml-5">
                  Türen &amp; Fenster (Neubau &amp; Austausch)
                </li>
                <li className="list-disc ml-5">Dachflächenfenster (Velux)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
  