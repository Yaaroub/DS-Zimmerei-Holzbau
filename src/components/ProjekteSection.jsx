"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projekte = [
  {
    title: "Dachsanierung Doppelgaube – Seitenansicht",
    subtitle: "Komplette Dachsanierung inkl. neuer Dämmung & Verkleidung",
    image: "/projekte/dachsanierung-doppelgaube-seite.webp",
  },
  {
    title: "Dachsanierung Doppelgaube – Vorderansicht",
    subtitle: "Erneuerung der Gaubenverkleidung und Dachfläche",
    image: "/projekte/dachsanierung-doppelgaube-vorne.webp",
  },
  {
    title: "Dachsanierung Gaube – Links",
    subtitle: "Sanierung der linken Gaubenseite inkl. Blechanschlüsse",
    image: "/projekte/dachsanierung-gaube-links.webp",
  },
  {
    title: "Dachsanierung Gaube – Rechts",
    subtitle: "Neue Dacheindeckung und seitliche Abdeckungen",
    image: "/projekte/dachsanierung-gaube-rechts.webp",
  },
  {
    title: "Giebelsanierung Links",
    subtitle: "Erneuerung der Giebelverkleidung & Anschlüsse",
    image: "/projekte/dachsanierung-giebel-links.webp",
  },
  {
    title: "Dachseite – Giebelansicht",
    subtitle: "Modernisierte Dachfläche mit hochwertigen Materialien",
    image: "/projekte/dachseite-giebelansicht.webp",
  },
  {
    title: "Fassadenverkleidung Garage",
    subtitle: "Neuverkleidung der Garage mit modernen Fassadenplatten",
    image: "/projekte/fassadenverkleidung-garage.webp",
  },
  {
    title: "Fassadenverkleidung Hausfront",
    subtitle: "Komplette Modernisierung der Hausvorderseite",
    image: "/projekte/fassadenverkleidung-hausfront.webp",
  },
  {
    title: "Giebelverkleidung Oben",
    subtitle: "Neue hochwertige Giebelelemente für optimalen Schutz",
    image: "/projekte/giebelverkleidung-oben.webp",
  },
  {
    title: "PV-Anlage auf modernem Holzbau",
    subtitle: "Integrierte Photovoltaikanlage auf neuer Dachfläche",
    image: "/projekte/pv-anlage-moderner-holzbau.webp",
  },
];

export default function ProjekteSection() {
  return (
    <section
    id="projekte"
    className="bg-[#050505] text-white py-24 px-6 relative overflow-x-hidden"
  >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-[#17E800]/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-[#17E800]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Titel */}
        <div className="text-center mb-14">
          <p className="text-[#17E800] uppercase tracking-[0.25em] text-xs md:text-sm font-semibold">
            Projekte
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Ausgewählte Arbeiten aus Dach, Holzbau & Sanierung
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Ein Blick in unsere realisierten Projekte – von Dachsanierungen
            über Giebelverkleidungen bis hin zu modernen Fassadenlösungen.
          </p>
          <div className="mt-6 h-px w-20 mx-auto bg-gradient-to-r from-[#17E800] via-[#17E800]/0 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-[1fr]">
          {projekte.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`
                group relative overflow-hidden rounded-2xl
                border border-white/10
                bg-gradient-to-b from-white/5 to-white/[0.02]
                transition-all duration-300
                hover:-translate-y-1.5
                hover:border-[#17E800]/60
                hover:shadow-[0_0_40px_rgba(23,232,0,0.25)]
                ${i === 0 ? "md:col-span-2 xl:col-span-2 md:row-span-2" : ""}
              `}
            >
              {/* Bild + Overlay */}
              <div className={`relative w-full ${i === 0 ? "h-80 md:h-[22rem]" : "h-64 md:h-72"}`}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes={
                    i === 0
                      ? "(min-width: 1280px) 66vw, (min-width: 768px) 50vw, 100vw"
                      : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/5" />
              </div>

              {/* Inhalt (Overlay unten) */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-gray-300/80">
                  <span
                    className="
                      inline-flex items-center gap-1 rounded-full
                      border border-white/15 bg-black/40
                      px-3 py-1 uppercase tracking-[0.18em] text-[0.65rem]
                    "
                  >
                    {p.title.split(" ")[0]}
                  </span>
                  <span className="text-gray-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className="
                    text-lg md:text-xl font-semibold
                    text-white
                    group-hover:text-[#17E800]
                    transition-colors duration-300
                  "
                >
                  {p.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-300/90 max-w-lg">
                  {p.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
