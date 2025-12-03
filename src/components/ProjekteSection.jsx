"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "@/components/Lightbox"; // <-- Variante B

export default function ProjekteSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProject, setLightboxProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // 🔧 Projekte — OHNE Subtitles (dein Wunsch)
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
    <section id="projekte" className="bg-[#050505] text-white py-20 md:py-24 px-4 sm:px-6 relative">

      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <p className="text-[#17E800] uppercase tracking-[0.25em] text-xs md:text-sm font-semibold">
          Projekte
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
          Ausgewählte Arbeiten – Dach, Holzbau & Sanierung
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mt-3">
          Eine Auswahl unserer realisierten Bauprojekte – hochwertig,
          langlebig und handwerklich präzise umgesetzt.
        </p>
      </div>

      {/* GRID – neues Design */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">

        {projekte.map((p, i) => {
          const cover = p.images[0];

          return (
            <motion.button
              key={p.title}
              onClick={() => {
                setLightboxProject(p);
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              viewport={{ once: true }}
              className="
                group relative rounded-2xl overflow-hidden
                bg-[#0A0A0A] border border-white/10
                hover:border-[#17E800]/50 hover:shadow-[0_0_30px_rgba(23,232,0,0.25)]
                transition-all duration-300
                cursor-pointer flex flex-col
              "
            >
              {/* COVER IMAGE */}
              <div className="relative w-full h-52 sm:h-64 md:h-72">
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 p-5 flex flex-col gap-2 text-left">
                <span className="text-[#17E800] text-xs uppercase tracking-[0.2em] font-medium">
                  {p.badge}
                </span>

                <h3 className="text-lg md:text-xl font-semibold leading-snug group-hover:text-[#17E800] transition-colors">
                  {p.title}
                </h3>
              </div>
            </motion.button>
          );
        })}

      </div>

      {/* LIGHTBOX B (Clean, Fullscreen, Slide) */}
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
