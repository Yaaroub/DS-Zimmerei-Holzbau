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
              DS Zimmerei &amp; Holzbau –
              <br className="hidden md:block" />
              geführt von Zimmerermeister Dennis Steckel
            </h2>
  
            <p className="text-gray-300 leading-relaxed">
              Mein Name ist <strong>Dennis Steckel</strong>, Jahrgang 1985. Als
              gelernter <strong>Tischler / Zimmerer</strong> und{" "}
              <strong>Zimmerermeister</strong> stehe ich für saubere Ausführung,
              ehrliche Beratung und praxisnahe Lösungen rund um Dach, Holzbau und
              Innenausbau.
            </p>
  
            <p className="text-gray-300 leading-relaxed">
              Mit einem kleinen, eingespielten Team – bestehend aus mir,{" "}
              <strong>einem Gesellen</strong> sowie ausgewählten, qualifizierten
              Subunternehmen – realisieren wir Projekte von Neu- und Anbauten über
              Dachsanierungen bis hin zu individuellen Einbauten aus Holz.
            </p>
  
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <Bullet
                title="Zusammenarbeit auf Augenhöhe"
                desc="Miteinander statt Gegeneinander – direkt und ehrlich."
              />
              <Bullet
                title="Pünktliche & termingerechte Ausführung"
                desc="Verlässliche Absprachen und eingehaltene Termine."
              />
              <Bullet
                title="Persönlicher Umgang"
                desc="Freundliche, direkte Kommunikation auf der Baustelle und davor."
              />
              <Bullet
                title="Qualitativ hochwertige Ausführung"
                desc="Saubere Arbeit, hochwertige Materialien und detaillierte Verarbeitung."
              />
            </div>
          </div>
  
          {/* Infobox */}
          <div className="rounded-2xl border border-white/5 bg-black/70 p-6 md:p-7 shadow-xl shadow-black/50">
            <div className="border-l-4 border-brand-green pl-4 mb-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Warum DS Zimmerei &amp; Holzbau?
              </p>
              <p className="text-lg md:text-xl font-semibold mt-2">
                Meisterbetrieb mit kleinem Team &amp; direktem Ansprechpartner.
              </p>
            </div>
  
            <ul className="space-y-3 text-sm md:text-base text-gray-200">
              <li>• Persönliche Betreuung statt anonymer Hotline</li>
              <li>• Sorgfältige Planung von Neu- und Anbauten</li>
              <li>• Koordination mit qualifizierten Subunternehmen nach Bedarf</li>
              <li>• Einsatz hochwertiger Materialien und Systemlösungen</li>
              <li>• Zuverlässige, saubere und termingerechte Ausführung</li>
            </ul>
  
            <div className="mt-6 pt-4 border-t border-white/10 text-sm text-gray-400">
              Gerne beraten wir Sie persönlich zu Ihrem Projekt – ob
              Dachsanierung, Anbau, Carport, Terrassenkonstruktion oder
              Fenster- und Türentausch.
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
  