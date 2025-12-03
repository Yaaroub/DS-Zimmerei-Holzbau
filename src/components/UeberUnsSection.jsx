"use client";

export default function UeberUnsSection() {
  return (
    <section
      id="ueber"
      className="bg-brand-dark text-white py-20 md:py-24 px-6"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.4fr,1fr] gap-12 items-start">
        {/* Text */}
        <div className="space-y-6">
          <p className="text-brand-green uppercase tracking-[0.25em] text-sm font-semibold">
            Über uns
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Wer steckt hinter DS Zimmerei &amp; Holzbau?
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Hallo, mein Name ist <strong>Dennis Steckel</strong>. Ich wurde am{" "}
            <strong>21.09.1985 in Schwerin</strong> geboren und lebe seit{" "}
            <strong>2007 in Schleswig-Holstein</strong>. Nach meiner Ausbildung
            zum <strong>Tischler</strong> habe ich schnell gemerkt, dass meine
            Leidenschaft im Zimmereihandwerk liegt. Deshalb habe ich zusätzlich
            den Beruf des <strong>Zimmerers</strong> erlernt und mich später zum{" "}
            <strong>Zimmerermeister</strong> weiterqualifiziert – der Schritt in
            die Selbstständigkeit war die logische Konsequenz.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Handwerkliches Arbeiten ist für mich weit mehr als nur ein Beruf –
            es ist eine echte Leidenschaft, die ich tagtäglich mit Freude
            ausübe. <strong>Qualität</strong>, <strong>Präzision</strong> und{" "}
            <strong>Verantwortung</strong> prägen meinen Arbeitsalltag. Ich
            stehe für saubere Ausführung, ehrliche Beratung und praxisnahe
            Lösungen rund um Dach, Holzbau und Innenausbau.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Neben der Arbeit spielt <strong>Sport</strong> eine wichtige Rolle
            in meinem Alltag. Durch regelmäßige Bewegung halte ich mich
            körperlich und geistig fit – das gibt mir die nötige Energie, um
            jedes Projekt mit voller Konzentration und Sorgfalt zu begleiten.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Gemeinsam mit einem kleinen, eingespielten handwerklichen Team
            realisieren wir Projekte von <strong>Neu- und Anbauten</strong> über{" "}
            <strong>Dachsanierungen</strong> bis hin zu{" "}
            <strong>individuellen Einbauten aus Holz</strong>. Dabei bleibt der
            persönliche Kontakt und der direkte Draht zum Meister immer
            erhalten.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <Bullet
              title="Zusammenarbeit auf Augenhöhe"
              desc="Direkte, ehrliche Kommunikation – vom ersten Gespräch bis zur Fertigstellung."
            />
            <Bullet
              title="Pünktliche & termingerechte Ausführung"
              desc="Verlässliche Absprachen, realistische Zeitpläne und eingehaltene Termine."
            />
            <Bullet
              title="Persönlicher Umgang"
              desc="Fester Ansprechpartner statt anonymer Hotline oder wechselnder Teams."
            />
            <Bullet
              title="Qualitativ hochwertige Ausführung"
              desc="Saubere Arbeit, passende Materialien und sorgfältige Detailausbildung."
            />
          </div>
        </div>

        {/* Infobox */}
        <div className="rounded-2xl border border-white/5 bg-black/70 p-6 md:p-7 shadow-xl shadow-black/50">
          <div className="border-l-4 border-brand-green pl-4 mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Was Sie von uns erwarten können
            </p>
            <p className="text-lg md:text-xl font-semibold mt-2">
              Meisterbetrieb mit direktem Ansprechpartner.
            </p>
          </div>

          <ul className="space-y-3 text-sm md:text-base text-gray-200">
            <li>• Persönliche Betreuung – ohne anonyme Hotline</li>
            <li>• Sorgfältige Planung von Dach, Holzbau &amp; Ausbau</li>
            <li>• Individuelle Lösungen statt Standardpakete von der Stange</li>
            <li>• Einsatz bewährter Materialien und Systemlösungen</li>
            <li>• Zuverlässige, saubere und termingerechte Ausführung</li>
          </ul>

          <div className="mt-6 pt-4 border-t border-white/10 text-sm text-gray-400">
            Gerne berate ich Sie persönlich zu Ihrem Projekt – ob Dachsanierung,
            Anbau, Carport, Terrassenkonstruktion oder individuelle
            Holzlösung im Innenbereich.
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-brand-green/60 bg-brand-green/10 text-xs">
        ✓
      </span>
      <div>
        <p className="font-semibold text-sm md:text-base">{title}</p>
        <p className="text-xs md:text-sm text-gray-400">{desc}</p>
      </div>
    </div>
  );
}
