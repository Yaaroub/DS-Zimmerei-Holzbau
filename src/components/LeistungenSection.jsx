"use client";

export default function LeistungenSection() {
  return (
    <section
      id="leistungen"
      className="bg-brand-bg text-brand-text py-20 md:py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-brand-green uppercase tracking-[0.25em] text-sm font-semibold">
            Unsere Leistungen
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Zimmererarbeiten · Dachdeckerarbeiten · Innenausbau
          </h2>

          <p className="text-brand-textMuted mt-4 max-w-xl mx-auto text-sm md:text-base">
            Fachgerechte Holzbauarbeiten für Neubau, Sanierung und Reparatur –
            geplant und umgesetzt mit handwerklicher Präzision und hochwertigen
            Materialien.
          </p>
        </div>

        {/* Karten-Gitter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Box 1 */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 md:p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-md">
            <h3 className="text-xl font-semibold text-brand-green mb-4">
              Zimmererarbeiten &amp; Dachdeckerarbeiten
            </h3>

            <ul className="space-y-2 text-brand-textMuted text-sm md:text-base">
              <li className="list-disc ml-5">Neu- und Anbauten</li>
              <li className="list-disc ml-5">Dachstühle &amp; Gauben</li>
              <li className="list-disc ml-5">Dachsanierungen &amp; Reparaturen</li>
              <li className="list-disc ml-5">Carports &amp; Terrassen</li>
              <li className="list-disc ml-5">Holzfassaden</li>
              <li className="list-disc ml-5">Zäune &amp; konstruktive Holzbauten</li>
              <li className="list-disc ml-5">
                Energetische Sanierung der Gebäudehülle
              </li>
            </ul>
          </div>

          {/* Box 2 */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 md:p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-md">
            <h3 className="text-xl font-semibold text-brand-green mb-4">
              Bautischlerei &amp; Innenausbau
            </h3>

            <ul className="space-y-2 text-brand-textMuted text-sm md:text-base">
              <li className="list-disc ml-5">Einbauten nach Maß</li>
              <li className="list-disc ml-5">Innentüren</li>
              <li className="list-disc ml-5">
                Türen &amp; Fenster (Neubau &amp; Austausch)
              </li>
              <li className="list-disc ml-5">
                Dachflächenfenster (z. B. Velux)
              </li>
              <li className="list-disc ml-5">Trockenbauarbeiten</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
