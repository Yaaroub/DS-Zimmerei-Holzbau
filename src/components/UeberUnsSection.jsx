"use client";

export default function UeberUnsSection() {
  return (
    <section
      id="ueber"
      className="
        bg-[linear-gradient(180deg,#F7F8FA_0%,#FFFFFF_100%)]
        text-brand-text
        py-24 md:py-32
        px-6
      "
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.4fr,1fr] gap-14 items-start">
        {/* Text */}
        <div className="space-y-7 md:space-y-8">
          <p className="text-brand-green uppercase tracking-[0.25em] text-sm font-semibold">
            Über uns
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Wer steckt hinter DS Zimmerei &amp; Holzbau?
          </h2>

          <p className="text-brand-textMuted leading-[1.75] tracking-[0.01em]">
            Hallo, mein Name ist <strong>Dennis Steckel</strong>. Ich wurde am{" "}
            <strong>21.09.1985 in Schwerin</strong> geboren und lebe seit{" "}
            <strong>2007 in Schleswig-Holstein</strong>. Nach meiner Ausbildung
            zum <strong>Tischler</strong> habe ich schnell gemerkt, dass meine
            Leidenschaft im Zimmereihandwerk liegt. Deshalb habe ich zusätzlich
            den Beruf des <strong>Zimmerers</strong> erlernt und mich später zum{" "}
            <strong>Zimmerermeister</strong> weiterqualifiziert – der Schritt in
            die Selbstständigkeit war die logische Konsequenz.
          </p>

          <p className="text-brand-textMuted leading-[1.75] tracking-[0.01em]">
            Handwerkliches Arbeiten ist für mich weit mehr als nur ein Beruf –
            es ist eine echte Leidenschaft. <strong>Qualität</strong>,{" "}
            <strong>Präzision</strong> und <strong>Verantwortung</strong>
            prägen meinen Arbeitsalltag. Ich stehe für saubere Ausführung,
            ehrliche Beratung und praxisnahe Lösungen rund um Dach, Holzbau
            und Innenausbau.
          </p>

          <p className="text-brand-textMuted leading-[1.75] tracking-[0.01em]">
            Gemeinsam mit einem kleinen, eingespielten handwerklichen Team
            realisieren wir Projekte von <strong>Neu- und Anbauten</strong> über{" "}
            <strong>Dachsanierungen</strong> bis hin zu{" "}
            <strong>individuellen Einbauten aus Holz</strong>. Dabei bleibt der
            persönliche Kontakt und der direkte Draht zum Meister immer
            erhalten.
          </p>

          {/* Premium Bullets */}
          <div className="grid sm:grid-cols-2 gap-5 pt-4">
            <Bullet
              title="Zusammenarbeit auf Augenhöhe"
              desc="Direkte, ehrliche Kommunikation – vom ersten Gespräch bis zur Fertigstellung."
            />
            <Bullet
              title="Termintreue & Verlässlichkeit"
              desc="Realistische Zeitpläne, saubere Absprachen und eingehaltene Termine."
            />
            <Bullet
              title="Persönlicher Ansprechpartner"
              desc="Fester Kontakt statt wechselnder Teams oder anonymer Abläufe."
            />
            <Bullet
              title="Meisterliche Ausführung"
              desc="Sorgfältige Detailarbeit, hochwertige Materialien und langlebige Lösungen."
            />
          </div>
        </div>

        {/* Premium Infobox */}
        <div
          className="
            rounded-2xl
            bg-brand-surface
            border border-brand-border
            p-7 md:p-8
            shadow-[0_12px_30px_rgba(15,23,42,0.08)]
          "
        >
          <div className="border-l-[3px] border-brand-green/70 pl-4 mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-textMuted">
              Was Sie von uns erwarten können
            </p>
            <p className="text-lg md:text-xl font-semibold mt-2">
              Meisterbetrieb mit direktem Ansprechpartner.
            </p>
          </div>

          <ul className="space-y-3 text-sm md:text-base text-brand-textMuted">
            <li>• Persönliche Betreuung ohne anonyme Hotline</li>
            <li>• Durchdachte Planung von Dach, Holzbau &amp; Ausbau</li>
            <li>• Individuelle Lösungen statt Standardpakete</li>
            <li>• Bewährte Materialien und saubere Ausführung</li>
            <li>• Zuverlässige, termingerechte Umsetzung</li>
          </ul>

          <div className="mt-7 pt-4 border-t border-brand-border text-sm text-brand-textMuted">
            Gerne berate ich Sie persönlich zu Ihrem Projekt – von der ersten
            Idee bis zur fachgerechten Umsetzung.
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="
          mt-2 h-2.5 w-2.5 rounded-full
          bg-brand-green
          shadow-[0_0_0_3px_rgba(23,232,0,0.15)]
        "
      />
      <div>
        <p className="font-semibold text-sm md:text-base">{title}</p>
        <p className="text-xs md:text-sm text-brand-textMuted leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
