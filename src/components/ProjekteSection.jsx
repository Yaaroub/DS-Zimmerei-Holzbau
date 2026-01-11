"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Lightbox from "@/components/Lightbox";

export default function ProjekteSection() {
  const reduce = useReducedMotion();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProject, setLightboxProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const projekte = useMemo(
    () => [
      {
        title: "Dachsanierung Reihenendhaus in Preetz",
        badge: "Dachsanierung",
        images: [
          { src: "/projekte/dachsanierungpreetz/dachsanierungpreetz1.webp", alt: "Dachsanierung Preetz – neue Dachfläche." },
          { src: "/projekte/dachsanierungpreetz/dachsanierungpreetz2.webp", alt: "Gaube und Edelstahlkamin Preetz." },
          { src: "/projekte/dachsanierungpreetz/dachsanierungpreetz3.webp", alt: "Neue Fenster und Dachdeckung – Preetz." },
          { src: "/projekte/dachsanierungpreetz/dachsanierungpreetz4.webp", alt: "Reihenendhaus Dachsanierung Preetz." },
          { src: "/projekte/dachsanierungpreetz/dachsanierungpreetz5.webp", alt: "Gaubenfront saniert Preetz." },
          { src: "/projekte/dachsanierungpreetz/dachsanierungpreetz6.webp", alt: "Dachanschlüsse sauber ausgeführt – Preetz." },
        ],
      },
      {
        title: "Energetische Dachsanierung in Molfsee",
        badge: "Energetische Sanierung",
        images: [
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-01.webp", alt: "Energetische Dachsanierung Molfsee – moderner Giebel." },
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-02.webp", alt: "Neue Fassadenverkleidung Garage Molfsee." },
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-03.webp", alt: "PV-Dachfläche energetisch saniert Molfsee." },
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-04.webp", alt: "Neuer Giebelbereich nach Sanierung Molfsee." },
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-05.webp", alt: "Ortgangverkleidung energetisch modernisiert Molfsee." },
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-06.webp", alt: "Gaubenverkleidung nach Sanierung – Molfsee." },
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-07.webp", alt: "Detail neue Fassadenelemente Molfsee." },
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-08.webp", alt: "PV-Anlage Dach – energetische Sanierung Molfsee." },
          { src: "/projekte/molfsee/molfsee-energetische-dachsanierung-09.webp", alt: "Dachfläche mit Dachfenster – Sanierung Molfsee." },
        ],
      },
      {
        title: "Neubau in moderner Holzbauweise",
        badge: "Neubau · Holzbau",
        images: [
          { src: "/projekte/neubau/neubau-holzbau-01.webp", alt: "Neubau Holzbau – Glasfront & Dachüberstand." },
          { src: "/projekte/neubau/neubau-holzbau-02.webp", alt: "Neubau Holzhaus mit Holzfassade." },
        ],
      },
      {
        title: "Energetische Sanierung Einfamilienhaus Stocksee",
        badge: "Sanierung",
        images: [
          { src: "/projekte/stocksee/sanierung-stocksee-01.webp", alt: "EFH Stocksee energetisch saniert – neue Fassade und Dach." },
          { src: "/projekte/stocksee/sanierung-stocksee-02.webp", alt: "Stocksee Sanierung – neue Fassadendetails." },
          { src: "/projekte/stocksee/sanierung-stocksee-03.webp", alt: "Neugestalteter Wohnraum mit Giebelfenster zum See." },
        ],
      },
    ],
    []
  );

  const open = (p) => {
    setLightboxProject(p);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const container = {
    hidden: {},
    show: {
      transition: reduce ? {} : { staggerChildren: 0.06, delayChildren: 0.04 },
    },
  };

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: reduce
      ? { opacity: 1, transition: { duration: 0.2 } }
      : { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="projekte"
      className="
        relative
        bg-[linear-gradient(180deg,#F7F8FA_0%,#FFFFFF_100%)]
        text-brand-text
        py-20 md:py-28
        border-t border-brand-border
        overflow-hidden
      "
    >
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-green/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-brand-green uppercase tracking-[0.25em] text-xs md:text-sm font-semibold">
            Projekte
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 leading-tight tracking-tight">
            Ausgewählte Arbeiten – Dach, Holzbau &amp; Sanierung
          </h2>
          <p className="text-brand-textMuted text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Eine Auswahl realisierter Projekte – hochwertig, langlebig und handwerklich präzise umgesetzt.
          </p>
        </div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {projekte.map((p, i) => {
            const cover = p.images[0];
            const priority = i < 2; // nur die ersten zwei "above the fold"

            return (
              <motion.button
                key={p.title}
                type="button"
                variants={item}
                onClick={() => open(p)}
                aria-label={`Projekt öffnen: ${p.title}`}
                className="
                  group relative text-left
                  rounded-2xl overflow-hidden
                  bg-white
                  border border-brand-border
                  shadow-[0_12px_30px_rgba(15,23,42,0.08)]
                  transition
                  hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50
                "
              >
                {/* media */}
                <div className="relative w-full aspect-[4/3] bg-slate-100">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    priority={priority}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />

                  {/* premium overlay: dunkle scrim für Lesbarkeit */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-90" />

                  {/* badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-white backdrop-blur-md">
                      {p.badge}
                    </span>
                  </div>
                </div>

                {/* content */}
                <div className="p-5">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight text-brand-text">
                    {p.title}
                  </h3>

                  <div className="mt-2 flex items-center justify-between text-xs text-brand-textMuted">
                    <span>{p.images.length} Fotos</span>
                    <span className="inline-flex items-center gap-1 text-brand-green font-semibold">
                      Ansehen <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </div>

                {/* hover ring (premium detail) */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-brand-green/20 transition" />
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && lightboxProject && (
        <Lightbox
          images={lightboxProject.images}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
