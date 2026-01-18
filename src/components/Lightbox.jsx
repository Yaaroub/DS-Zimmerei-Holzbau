"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";

export default function Lightbox({ images, index: initialIndex = 0, onClose }) {
  const len = images?.length || 0;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const safeInitial = clamp(initialIndex ?? 0, 0, Math.max(0, len - 1));
  const [index, setIndex] = useState(safeInitial);

  const stageRef = useRef(null);
  const trackRef = useRef(null);

  // Focus / dialog refs
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  // pointer
  const isDown = useRef(false);
  const pointerId = useRef(null);

  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);

  const dx = useRef(0);
  const vx = useRef(0);

  const raf = useRef(null);
  const width = useRef(0);

  const captionId = "lightbox-caption";

  // keep in sync if parent changes initialIndex while open
  useEffect(() => {
    setIndex(clamp(initialIndex ?? 0, 0, Math.max(0, len - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex, len]);

  const neighbors = useMemo(() => {
    if (!len) return new Set();
    const prev = clamp(index - 1, 0, len - 1);
    const next = clamp(index + 1, 0, len - 1);
    return new Set([prev, index, next]);
  }, [index, len]);

  const apply = useCallback(
    (offsetX = 0, animate = false) => {
      const el = trackRef.current;
      if (!el) return;

      const w = width.current || 1;
      const x = -index * w + offsetX;

      el.style.transition = animate
        ? "transform 280ms cubic-bezier(.2,.9,.2,1)"
        : "none";
      el.style.transform = `translate3d(${x}px,0,0)`;
    },
    [index]
  );

  const measure = useCallback(() => {
    width.current = stageRef.current?.clientWidth || window.innerWidth || 1;
    apply(0, false);
  }, [apply]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // BODY SCROLL LOCK (ohne Layout Jump)
  useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    const scrollbarW =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      body.style.overflow = prevOverflow || "";
      body.style.paddingRight = prevPaddingRight || "";
    };
  }, []);

  // snap when index changes
  useEffect(() => {
    apply(0, true);
  }, [index, apply]);

  // ✅ Focus trap + initial focus + restore focus on close
  useEffect(() => {
    const prevActive = document.activeElement;

    // initial focus
    closeBtnRef.current?.focus?.({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();

      if (e.key === "ArrowRight") setIndex((v) => clamp(v + 1, 0, len - 1));
      if (e.key === "ArrowLeft") setIndex((v) => clamp(v - 1, 0, len - 1));

      // trap tab inside dialog
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;

        const focusables = root.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const list = Array.from(focusables).filter((el) => {
          if (el.hasAttribute("disabled")) return false;
          if (el.getAttribute("aria-hidden") === "true") return false;
          return true;
        });

        if (!list.length) return;

        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // restore focus
      prevActive?.focus?.({ preventScroll: true });
    };
  }, [len, onClose]);

  const schedule = () => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      apply(dx.current, false);
    });
  };

  const onPointerDown = (e) => {
    if (len <= 1) return;
    if (e.target.closest("[data-noswipe]")) return;

    isDown.current = true;
    pointerId.current = e.pointerId;

    startX.current = e.clientX;
    startY.current = e.clientY;
    lastX.current = e.clientX;

    const now = performance.now();
    lastT.current = now;
    vx.current = 0;
    dx.current = 0;

    apply(0, false);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e) => {
    if (!isDown.current) return;
    if (pointerId.current !== null && e.pointerId !== pointerId.current) return;

    const x = e.clientX;
    const y = e.clientY;

    const moveX = x - lastX.current;
    const totalX = x - startX.current;
    const totalY = y - startY.current;

    // if user moves vertical more than horizontal, ignore swipe
    if (Math.abs(totalY) > Math.abs(totalX) * 1.25) return;

    const now = performance.now();
    const dt = Math.max(1, now - lastT.current);
    lastT.current = now;

    vx.current = moveX / dt;
    lastX.current = x;

    dx.current += moveX;

    // edge resistance
    if (
      (index === 0 && dx.current > 0) ||
      (index === len - 1 && dx.current < 0)
    ) {
      dx.current *= 0.55;
    }

    schedule();
  };

  const finishSwipe = (e) => {
    if (!isDown.current) return;
    isDown.current = false;

    // release pointer capture (prevents sticky capture in some browsers)
    try {
      if (pointerId.current != null) {
        stageRef.current?.releasePointerCapture?.(pointerId.current);
      }
    } catch {}

    pointerId.current = null;

    const w = width.current || window.innerWidth || 1;

    const distThreshold = Math.min(140, w * 0.18);
    const veloThreshold = 0.55;

    const goNext = dx.current <= -distThreshold || vx.current <= -veloThreshold;
    const goPrev = dx.current >= distThreshold || vx.current >= veloThreshold;

    if (goNext && index < len - 1) setIndex((v) => v + 1);
    else if (goPrev && index > 0) setIndex((v) => v - 1);
    else apply(0, true);

    dx.current = 0;
    vx.current = 0;
  };

  const prev = () => setIndex((v) => clamp(v - 1, 0, len - 1));
  const next = () => setIndex((v) => clamp(v + 1, 0, len - 1));

  if (!images || !len) return null;

  return (
    <div
      ref={dialogRef}
      className="
        fixed inset-0 z-[999]
        bg-black/80 backdrop-blur-[2px]
        flex items-center justify-center
        p-0 sm:p-6
        [padding-top:calc(env(safe-area-inset-top)+8px)]
        [padding-bottom:calc(env(safe-area-inset-bottom)+8px)]
        [padding-left:calc(env(safe-area-inset-left)+8px)]
        [padding-right:calc(env(safe-area-inset-right)+8px)]
      "
      role="dialog"
      aria-modal="true"
      aria-label="Bildergalerie"
      aria-describedby={captionId}
      // ✅ click on backdrop closes (but not clicks inside)
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {/* Content wrapper */}
      <div
        className="
          relative w-full
          sm:max-w-5xl
          h-[100svh] sm:h-auto
          sm:px-0
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="absolute top-3 left-3 right-3 sm:-top-12 sm:left-0 sm:right-0 flex items-center justify-between text-white/80 z-10">
          <div className="text-sm bg-black/35 border border-white/10 rounded-full px-3 py-1">
            {index + 1} / {len}
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            data-noswipe
            className="h-10 px-3.5 rounded-full border border-white/15 bg-black/35 hover:bg-black/55 transition text-white"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>

        {/* Stage */}
        <div
          ref={stageRef}
          className="
            relative overflow-hidden
            h-[100svh] sm:h-auto
            rounded-none sm:rounded-2xl
            border-0 sm:border border-white/10
            bg-black
            shadow-none sm:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
            touch-none select-none
            overscroll-contain
          "
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishSwipe}
          onPointerCancel={finishSwipe}
        >
          <div ref={trackRef} className="flex will-change-transform">
            {images.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="
                  relative w-full shrink-0
                  h-[100svh] sm:h-auto
                  sm:aspect-[16/9]
                  bg-black
                "
              >
                {neighbors.has(i) ? (
                  <Image
                    src={img.src}
                    alt={img.alt || "Projektbild"}
                    fill
                    sizes="(max-width: 640px) 100vw, 960px"
                    className="object-contain"
                    loading={i === index ? "eager" : "lazy"}
                  />
                ) : (
                  <div className="absolute inset-0 bg-black" />
                )}
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute inset-0 pointer-events-none">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              data-noswipe
              className="
                pointer-events-auto
                absolute left-3
                bottom-20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
                h-11 w-11 rounded-full
                border border-white/15 bg-white/5
                text-white hover:bg-white/10 transition
                disabled:opacity-30 disabled:cursor-not-allowed
              "
              aria-label="Vorheriges Bild"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={next}
              disabled={index === len - 1}
              data-noswipe
              className="
                pointer-events-auto
                absolute right-3
                bottom-20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
                h-11 w-11 rounded-full
                border border-white/15 bg-white/5
                text-white hover:bg-white/10 transition
                disabled:opacity-30 disabled:cursor-not-allowed
              "
              aria-label="Nächstes Bild"
            >
              ›
            </button>
          </div>
        </div>

        {/* Caption */}
        <div
          id={captionId}
          className="
            absolute bottom-3 left-1/2 -translate-x-1/2
            max-w-[92%]
            rounded-full
            bg-black/45 backdrop-blur
            px-4 py-1.5
            text-center text-xs sm:text-sm
            text-white/80
          "
        >
          {images[index]?.alt}
        </div>
      </div>
    </div>
  );
}
