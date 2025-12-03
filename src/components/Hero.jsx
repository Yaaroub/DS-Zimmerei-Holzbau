"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden bg-black">
      {/* Hintergrundbild */}
      <Image
        src="/hero-dach.jpg"
        alt="Neu eingedecktes Dach eines Einfamilienhauses"
        fill
        priority
        className="object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(23,232,0,0.12),_transparent_55%)]" />

      {/* Inhalt */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Logo mit Float-Animation */}
        <div className="relative mb-8 ">
          <Image
            src="/ds-logo.png"
            alt="DS Zimmerei & Holzbau Logo"
            width={340}
            height={340}
            className="w-[260px] md:w-[340px] h-auto drop-shadow-[0_0_35px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Text + Buttons mit Pop-In */}
        <div className="animate-hero-pop">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Präzision aus Meisterhand
          </h1>

          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-gray-200/90">
            Zimmerei, Dachdeckerei und individueller Holzbau – modern geplant,
            sauber ausgeführt und zuverlässig betreut.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold bg-brand-green text-black shadow-[0_0_20px_rgba(23,232,0,0.7)] hover:bg-white transition transform hover:-translate-y-[1px] hover:scale-[1.02]"
            >
              Angebot erhalten
            </a>
            <a
              href="#rueckruf"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold border border-brand-green text-brand-green hover:bg-brand-green hover:text-black transition transform hover:-translate-y-[1px] hover:scale-[1.02]"
            >
              Rückruf vereinbaren
            </a>
          </div>

          <p className="mt-6 text-xs md:text-sm text-gray-300/70">
            Meisterbetrieb · Dach · Zimmerei · Holzbau · Sanierung
          </p>
        </div>
      </div>

      {/* Brand-Linie */}
      <div className="absolute bottom-0 left-0 h-[4px] w-full bg-gradient-to-r from-brand-green via-[#bbff5a] to-brand-green" />
    </section>
  );
}
