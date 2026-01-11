"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Sparkles, MessageCircle } from "lucide-react";

export default function WarumWirSection() {
  return (
    <section
      id="warum-wir"
      className="
        bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F8FA_100%)]
        text-brand-text
        py-24 md:py-32
        px-6
        border-t border-brand-border
      "
    >
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[1.4fr,1fr] items-start">
        {/* Linke Seite – Textbereich */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-7 md:space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-surface px-3 py-1 text-[11px] font-medium text-brand-text uppercase tracking-[0.22em] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_0_3px_rgba(23,232,0,0.12)]" />
            Meisterbetrieb · Zimmerermeister
          </div>

          <p className="text-brand-green uppercase tracking-[0.25em] text-sm font-semibold">
            Warum wir?
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Handwerk mit Anspruch – persönlich, sauber, zuverlässig.
          </h2>

          <p className="text-brand-textMuted text-sm md:text-base leading-[1.75] tracking-[0.01em]">
            Hinter DS Zimmerei &amp; Holzbau stehe ich,{" "}
            <strong>Dennis Steckel</strong>, Zimmerermeister mit langjähriger
            Erfahrung auf Baustellen in Schleswig-Holstein. Mir ist wichtig,
            dass Sie von Anfang an wissen, wer auf Ihrem Dach und an Ihrem Haus
            arbeitet – ohne anonyme Strukturen, sondern mit einem klar
            erreichbaren Ansprechpartner.
          </p>

          <p className="text-brand-textMuted text-sm md:text-base leading-[1.75] tracking-[0.01em]">
            Gemeinsam als kleines, handwerklich geprägtes Team begleiten wir
            Projekte von der ersten Idee über die Planung bis zur letzten
            Schraube. Dabei denken wir Details wie Anschlüsse, Dämmung und
            spätere Nutzung von Anfang an mit, damit das Ergebnis nicht nur gut
            aussieht, sondern im Alltag lange und zuverlässig funktioniert.
          </p>

          {/* Vorteile mit Icons */}
          <div className="grid sm:grid-cols-2 gap-5 pt-2">
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Meisterbetrieb"
              desc="Planung und Ausführung durch einen Zimmerermeister mit echter Baustellenpraxis."
            />
            <Feature
              icon={<UserCheck className="h-5 w-5" />}
              title="Persönlicher Kontakt"
              desc="Direkter Draht zum Meister – klare Absprachen und Rückmeldung auf Augenhöhe."
            />
            <Feature
              icon={<Sparkles className="h-5 w-5" />}
              title="Saubere Ausführung"
              desc="Aufgeräumte Baustellen, saubere Schnittkanten und eine ordentliche Übergabe."
            />
            <Feature
              icon={<MessageCircle className="h-5 w-5" />}
              title="Ehrliche Beratung"
              desc="Klare Empfehlungen – technisch sinnvoll, wirtschaftlich passend, langfristig gedacht."
            />
          </div>
        </motion.div>

        {/* Rechte Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="
            rounded-2xl
            bg-brand-surface
            border border-brand-border
            p-7 md:p-8
            shadow-[0_12px_30px_rgba(15,23,42,0.08)]
          "
        >
          <div className="border-l-[3px] border-brand-green/70 pl-4 mb-5">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-textMuted">
              Kurz zusammengefasst
            </p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              Ein Meister, ein Team – klare Verantwortung.
            </p>
          </div>

          <ul className="space-y-2 text-sm md:text-base text-brand-textMuted">
            <li>• Direkter Ansprechpartner vom ersten Gespräch bis zur Übergabe</li>
            <li>• Überschaubares Team statt wechselnder Kolonnen</li>
            <li>• Verlässliche Terminabsprachen &amp; transparente Kommunikation</li>
            <li>• Durchdachte Details bei Dach, Holzbau &amp; Innenausbau</li>
            <li>• Regionale Verankerung in Schleswig-Holstein und Umgebung</li>
          </ul>

          <div className="mt-7 pt-4 border-t border-brand-border text-sm text-brand-textMuted">
            <p>
              Wir schauen uns Ihr Objekt persönlich vor Ort an und geben eine
              ehrliche Einschätzung, welche Lösung technisch und wirtschaftlich
              sinnvoll ist.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="
          mt-0.5
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-brand-border
          bg-white
          text-brand-green
          shadow-sm
        "
      >
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm md:text-base">{title}</p>
        <p className="text-xs md:text-sm text-brand-textMuted leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
