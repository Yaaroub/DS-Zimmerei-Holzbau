"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="
        relative w-full overflow-hidden bg-black
        min-h-[700px] h-[100svh] md:h-[92vh]
        pt-28 pb-24 sm:pb-0
      "
    >
      {/* Background */}
      <Image
        src="/hero-dach.jpg"
        alt="Neu eingedecktes Dach eines Einfamilienhauses"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_45%)]" />

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex h-full items-center">
            <div className="max-w-2xl">
              {/* LOGO BLOCK */}
              <div className="mb-6 inline-flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-lg px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
                <Image
                  src="/ds-logo.png"
                  alt="DS Zimmerei & Holzbau"
                  width={220}
                  height={220}
                  priority
                  className="h-20 sm:h-24 md:h-28 w-auto"
                />

                <div className="leading-tight">
                  <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                    DS Zimmerei
                  </p>
                  <p className="text-white/80 text-sm sm:text-base">
                    Holzbau & Dacharbeiten
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
                    Meisterbetrieb
                  </p>
                </div>
              </div>

              {/* HEADLINE */}
              <h1 className="mt-7 text-[34px] sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight text-white">
                Präzision aus Meisterhand
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-white/80">
                Zimmerei, Dachdeckerei und individueller Holzbau – modern geplant,
                sauber umgesetzt und zuverlässig betreut.
              </p>

              {/* CTA */}
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
                <a
                  href="#kontakt"
                  className="
                    inline-flex items-center justify-center
                    rounded-full bg-brand-green px-6 py-3
                    text-sm font-semibold text-black
                    shadow-[0_14px_36px_-18px_rgba(0,0,0,0.9)]
                    hover:brightness-110 transition
                  "
                >
                  Angebot anfordern
                </a>

                <a
                  href="#rueckruf"
                  className="
                    inline-flex items-center justify-center
                    rounded-full border border-white/30
                    bg-white/5 px-6 py-3
                    text-sm font-semibold text-white/90
                    hover:bg-white/10 transition
                  "
                >
                  Rückruf vereinbaren
                </a>
              </div>

              {/* TRUST */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
                <span>✔ Termintreu</span>
                <span>✔ Saubere Ausführung</span>
                <span>✔ Transparente Angebote</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
    </section>
  );
}
