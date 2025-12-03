"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Sparkles, MessageCircle } from "lucide-react";

export default function WarumWirSection() {
  return (
    <section
      id="warum-wir"
      className="bg-[#050505] text-white py-20 md:py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.4fr,1fr] items-start">
        {/* Linke Seite – Textbereich */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#17E800]/50 bg-[#0A0A0A] px-3 py-1 text-[11px] font-medium text-[#8BFF7A] uppercase tracking-[0.22em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#17E800]" />
            Meisterbetrieb · Zimmerermeister
          </div>

          <p className="text-[#17E800] uppercase tracking-[0.25em] text-sm font-semibold">
            Warum wir?
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Handwerk mit Anspruch – persönlich, sauber, zuverlässig.
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Hinter DS Zimmerei &amp; Holzbau stehe ich,{" "}
            <strong>Dennis Steckel</strong>, Zimmerermeister mit langjähriger
            Erfahrung auf Baustellen in Schleswig-Holstein. Mir ist wichtig,
            dass Sie von Anfang an wissen, wer auf Ihrem Dach und an Ihrem Haus
            arbeitet – ohne anonyme Strukturen, sondern mit einem klar
            erreichbaren Ansprechpartner.
          </p>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Gemeinsam als kleines, handwerklich geprägtes Team begleiten wir
            Projekte von der ersten Idee über die Planung bis zur letzten
            Schraube. Dabei denken wir Details wie Anschlüsse, Dämmung und
            spätere Nutzung von Anfang an mit, damit das Ergebnis nicht nur
            gut aussieht, sondern im Alltag lange und zuverlässig funktioniert.
          </p>

          {/* Vorteile mit Icons */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full">
                <ShieldCheck className="h-4 w-4 text-[#17E800]" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  Meisterbetrieb
                </p>
                <p className="text-xs md:text-sm text-gray-400">
                  Planung und Ausführung durch einen Zimmerermeister, der die
                  Praxis auf der Baustelle kennt – nicht nur die Theorie vom
                  Schreibtisch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full">
                <UserCheck className="h-4 w-4 text-[#17E800]" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  Persönlicher Kontakt
                </p>
                <p className="text-xs md:text-sm text-gray-400">
                  Direkter Draht zum Meister – ohne anonyme Hotline, mit klaren
                  Absprachen und Rückmeldungen auf Augenhöhe.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full">
                <Sparkles className="h-4 w-4 text-[#17E800]" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  Saubere Ausführung
                </p>
                <p className="text-xs md:text-sm text-gray-400">
                  Aufgeräumte Baustellen, saubere Schnittkanten und eine
                  ordentliche Übergabe – damit Sie sich im Ergebnis sofort wohl
                  fühlen.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full">
                <MessageCircle className="h-4 w-4 text-[#17E800]" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  Ehrliche Beratung
                </p>
                <p className="text-xs md:text-sm text-gray-400">
                  Klare Empfehlungen, was technisch und wirtschaftlich Sinn
                  ergibt – mit Blick auf Bestand, Budget und langfristige
                  Nutzung.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rechte Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-7 shadow-[0_0_24px_rgba(0,0,0,0.6)]"
        >
          <div className="border-l-4 border-[#17E800] pl-4 mb-5">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Kurz zusammengefasst
            </p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              Ein Meister, ein Team – klare Verantwortung.
            </p>
          </div>

          <ul className="space-y-2 text-sm md:text-base text-gray-200">
            <li>• Direkter Ansprechpartner vom ersten Gespräch bis zur Übergabe</li>
            <li>• Überschaubares, handwerklich geprägtes Team statt wechselnder Kolonnen</li>
            <li>• Verlässliche Terminabsprachen und transparente Kommunikation</li>
            <li>• Durchdachte Details bei Dach, Holzbau &amp; Innenausbau</li>
            <li>• Regionale Verankerung in Schleswig-Holstein und Umgebung</li>
          </ul>

          <div className="mt-6 pt-4 border-t border-white/10 text-sm text-gray-400">
            <p>
              Wir schauen uns Ihr Objekt persönlich vor Ort an und geben eine
              ehrliche Einschätzung, welche Lösung für Ihr Dach oder Ihren
              Holzbau technisch und wirtschaftlich sinnvoll ist.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
