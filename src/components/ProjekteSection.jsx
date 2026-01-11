"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "@/components/Lightbox";

export default function ProjekteSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProject, setLightboxProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const projekte = [
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
  ];

  return (
    <section
      id="projekte"
      className="
        relative
        bg-[linear-gradient(180deg,#F7F8FA_0%,#FFFFFF_100%)]
        text-brand-text
        py-24 md:py-32
        px-4 sm:px-6
        border-t border-brand-border
      "
    >
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-14 md:mb-16">
        <p className="text-brand-green uppercase tracking-[0.25em] text-xs md:text-sm font-semibold">
          Projekte
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight tracking-tight">
          Ausgewählte Arbeiten – Dach, Holzbau &amp; Sanierung
        </h2>
        <p className="text-brand-textMuted text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
          Eine Auswahl unserer realisierten Bauprojekte – hochwertig, langlebig
          und handwerklich präzise umgesetzt.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
        {projekte.map((p, i) => {
          const cover = p.images[0];

          return (
            <motion.button
              key={p.title}
              type="button"
              onClick={() => {
                setLightboxProject(p);
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              viewport={{ once: true }}
              className="
                group relative
                rounded-2xl overflow-hidden
                bg-brand-surface
                border border-brand-border
                shadow-[0_12px_30px_rgba(15,23,42,0.08)]
                transition
                hover:-translate-y-1
                hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50
              "
            >
              {/* COVER IMAGE */}
              <div className="relative w-full h-52 sm:h-64 md:h-72">
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                {/* Premium Overlay: subtil statt schwarz */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <span className="inline-flex items-center rounded-full border border-brand-green/30 bg-white/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-text">
                  {p.badge}
                </span>

                <h3 className="mt-2 text-lg md:text-xl font-semibold leading-snug tracking-tight group-hover:text-brand-green transition-colors">
                  {p.title}
                </h3>

                <p className="mt-1 text-xs text-brand-textMuted">
                  {p.images.length} Fotos
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxProject.images}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
