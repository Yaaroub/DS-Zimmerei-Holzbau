"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  const itemUp = {
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduce
        ? { duration: 0.01 }
        : { duration: 0.85, ease: easeOut },
    },
  };

  const itemUpSoft = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduce
        ? { duration: 0.01 }
        : { duration: 0.75, ease: easeOut },
    },
  };

  const bgAnim = reduce
    ? {}
    : {
        scale: [1.12, 1.02],
        x: ["-1.5%", "0%"],
        y: ["1.5%", "0%"],
        transition: { duration: 7.5, ease: easeOut },
      };

  const glowAnim = reduce
    ? {}
    : {
        opacity: [0.0, 0.65, 0.35],
        scale: [0.98, 1.03, 1.0],
        transition: { duration: 3.2, ease: easeOut, delay: 0.25 },
      };

  const sweepAnim = reduce
    ? {}
    : {
        x: ["-35%", "125%"],
        opacity: [0, 0.35, 0],
        transition: { duration: 2.4, ease: easeOut, delay: 0.35 },
      };

  const floatAnim = reduce
    ? {}
    : {
        y: [0, -6, 0],
        transition: { duration: 5.5, ease: "easeInOut", repeat: Infinity },
      };

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="
          relative w-full overflow-hidden bg-black
          min-h-[100svh] sm:min-h-[760px] md:min-h-[92vh]
          pt-24 sm:pt-28 pb-10 sm:pb-16
        "
      >
        {/* Background (cinematic) */}
        <m.div
          className="absolute inset-0"
          initial={reduce ? undefined : { scale: 1.12, x: "-1.5%", y: "1.5%" }}
          animate={bgAnim}
        >
          <Image
            src="/hero-dach.jpg"
            alt="Neu eingedecktes Dach eines Einfamilienhauses"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Soft vignette for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_25%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_120%,rgba(0,0,0,0.75),transparent_50%)]" />
        </m.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/90" />

        {/* Premium glow blob */}
        <m.div
          className="absolute inset-0 pointer-events-none"
          initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
          animate={glowAnim}
        >
          <div className="absolute -left-24 top-10 h-[340px] w-[340px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-[-90px] top-[28%] h-[280px] w-[280px] rounded-full bg-white/8 blur-3xl" />
        </m.div>

        {/* Light sweep */}
        <m.div
          className="absolute inset-0 pointer-events-none"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
        >
          <m.div
            className="absolute top-0 h-full w-[55%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"
            initial={reduce ? undefined : { x: "-35%", opacity: 0 }}
            animate={sweepAnim}
          />
        </m.div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[calc(100svh-6rem)] sm:min-h-[calc(760px-7rem)] md:min-h-[calc(92vh-7rem)] items-center">
              <m.div className="w-full max-w-2xl" variants={container} initial="hidden" animate="show">
                {/* LOGO BLOCK */}
                <m.div variants={itemUp} animate={floatAnim}>
                <m.div
  className="mb-6 inline-flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-lg px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
>

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
                      <p className="text-white/80 text-sm sm:text-base">Holzbau & Dacharbeiten</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
                        Meisterbetrieb
                      </p>
                    </div>
                  </m.div>
                </m.div>

                {/* HEADLINE */}
                <m.h1
                  variants={itemUp}
                  className="mt-6 sm:mt-7 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-white"
                >
                  Präzision aus Meisterhand
                </m.h1>

                <m.p
                  variants={itemUpSoft}
                  className="mt-4 sm:mt-5 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80"
                >
                  Zimmerei, Dachdeckerei und individueller Holzbau – modern geplant, sauber umgesetzt und zuverlässig
                  betreut.
                </m.p>

                {/* CTA */}
                <m.div variants={itemUpSoft} className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-3">
                  <PremiumButton href="#kontakt" variant="primary" reduce={reduce}>
                    Angebot anfordern
                  </PremiumButton>
                  <PremiumButton href="#rueckruf" variant="ghost" reduce={reduce}>
                    Rückruf vereinbaren
                  </PremiumButton>
                </m.div>

                {/* TRUST */}
                <m.div variants={itemUpSoft} className="mt-7 sm:mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
                  <TrustPill reduce={reduce}>✔ Termintreu</TrustPill>
                  <TrustPill reduce={reduce}>✔ Saubere Ausführung</TrustPill>
                  <TrustPill reduce={reduce}>✔ Transparente Angebote</TrustPill>
                </m.div>

                <div className="h-6 sm:h-0" />
              </m.div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
      </section>
    </LazyMotion>
  );
}

function PremiumButton({ href, variant, reduce, children }) {
  const base =
    "relative isolate w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 overflow-hidden";

  const styles =
    variant === "primary"
      ? "bg-brand-green text-black shadow-[0_14px_36px_-18px_rgba(0,0,0,0.9)] hover:brightness-110"
      : "border border-white/30 bg-white/5 text-white/90 hover:bg-white/10";

  return (
    <m.a
      href={href}
      className={`${base} ${styles}`}
      whileHover={
        reduce ? undefined : variant === "primary" ? { y: -2, scale: 1.01 } : { y: -1, scale: 1.01 }
      }
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={reduce ? undefined : { type: "spring", stiffness: 420, damping: 26 }}
    >
      {/* Shine sweep */}
      {!reduce && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[-130%] hover:translate-x-[130%] transition-transform duration-[900ms] ease-out"
        >
          <span className="absolute left-0 top-0 h-full w-[55%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
        </span>
      )}

      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />

      <span className="relative z-10">{children}</span>
    </m.a>
  );
}

function TrustPill({ children, reduce }) {
  return (
    <m.span
      className="inline-flex items-center gap-2"
      initial={reduce ? undefined : { opacity: 0, y: 6 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={reduce ? undefined : { duration: 0.5, ease: easeOut }}
      whileHover={reduce ? undefined : { y: -1 }}
    >
      {children}
    </m.span>
  );
}
