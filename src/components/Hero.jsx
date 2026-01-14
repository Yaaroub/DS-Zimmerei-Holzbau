"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="
        relative w-full overflow-hidden bg-black
        min-h-[100svh] sm:min-h-[760px] md:min-h-[92vh]
        pt-24 sm:pt-28 pb-10 sm:pb-16
      "
    >
      {/* Background */}
      <Image
        src="/hero-dach.jpg"
        alt="Neu eingedecktes Dach eines Einfamilienhauses"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_48%)]" />

      {/* Content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Center vertically on larger screens, but allow natural flow on tiny screens */}
          <div className="flex min-h-[calc(100svh-6rem)] sm:min-h-[calc(760px-7rem)] md:min-h-[calc(92vh-7rem)] items-center">
            <div className="w-full max-w-2xl">
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
              <h1 className="mt-6 sm:mt-7 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-white">
                Präzision aus Meisterhand
              </h1>

              <p className="mt-4 sm:mt-5 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                Zimmerei, Dachdeckerei und individueller Holzbau – modern geplant,
                sauber umgesetzt und zuverlässig betreut.
              </p>

              
              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-3">
                <a
                  href="#kontakt"
                  className="
                    w-full sm:w-auto
                    inline-flex items-center justify-center
                    rounded-full bg-brand-green px-6 py-3
                    text-sm font-semibold text-black
                    shadow-[0_14px_36px_-18px_rgba(0,0,0,0.9)]
                    hover:brightness-110 transition
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                  "
                >
                  Angebot anfordern
                </a>

                <a
                  href="#rueckruf"
                  className="
                    w-full sm:w-auto
                    inline-flex items-center justify-center
                    rounded-full border border-white/30
                    bg-white/5 px-6 py-3
                    text-sm font-semibold text-white/90
                    hover:bg-white/10 transition
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                  "
                >
                  Rückruf vereinbaren
                </a>
              </div>

              {/* TRUST */}
              <div className="mt-7 sm:mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
                <span>✔ Termintreu</span>
                <span>✔ Saubere Ausführung</span>
                <span>✔ Transparente Angebote</span>
              </div>

              {/* Optional: small safe space on very small screens */}
              <div className="h-6 sm:h-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
    </section>
  );
}
