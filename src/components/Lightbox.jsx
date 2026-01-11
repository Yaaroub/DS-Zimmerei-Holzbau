"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export default function Lightbox({ images, index: initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);

  const stageRef = useRef(null);
  const trackRef = useRef(null);

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

  const len = images?.length || 0;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const neighbors = useMemo(() => {
    const prev = clamp(index - 1, 0, len - 1);
    const next = clamp(index + 1, 0, len - 1);
    return new Set([prev, index, next]);
  }, [index, len]);

  const apply = (offsetX = 0, animate = false) => {
    const el = trackRef.current;
    if (!el) return;

    const w = width.current || 1;
    const x = -index * w + offsetX;

    el.style.transition = animate ? "transform 280ms cubic-bezier(.2,.9,.2,1)" : "none";
    el.style.transform = `translate3d(${x}px,0,0)`;
  };

  const measure = () => {
    width.current = stageRef.current?.clientWidth || window.innerWidth;
    apply(0, false);
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, []);

  useEffect(() => {
    // snap on index change
    apply(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") setIndex((v) => clamp(v + 1, 0, len - 1));
      if (e.key === "ArrowLeft") setIndex((v) => clamp(v - 1, 0, len - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

    isDown.current = true;
    pointerId.current = e.pointerId;

    startX.current = e.clientX;
    startY.current = e.clientY;
    lastX.current = e.clientX;

    const now = performance.now();
    lastT.current = now;
    vx.current = 0;
    dx.current = 0;

    // stop animation instantly
    apply(0, false);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e) => {
    if (!isDown.current) return;

    // ignore other pointers
    if (pointerId.current !== null && e.pointerId !== pointerId.current) return;

    const x = e.clientX;
    const y = e.clientY;

    const moveX = x - lastX.current;
    const totalX = x - startX.current;
    const totalY = y - startY.current;

    // if the gesture is clearly vertical, allow it to be a "no-op"
    // (but we already prevent scroll via body lock; this helps feel)
    if (Math.abs(totalY) > Math.abs(totalX) * 1.2) return;

    const now = performance.now();
    const dt = Math.max(1, now - lastT.current);
    lastT.current = now;

    // velocity (px/ms)
    vx.current = moveX / dt;

    lastX.current = x;
    dx.current += moveX;

    // rubber band at edges
    if ((index === 0 && dx.current > 0) || (index === len - 1 && dx.current < 0)) {
      dx.current *= 0.55;
    }

    schedule();
  };

  const finishSwipe = () => {
    if (!isDown.current) return;
    isDown.current = false;
    pointerId.current = null;

    const w = width.current || window.innerWidth;

    // thresholds
    const distThreshold = Math.min(140, w * 0.18); // distance
    const veloThreshold = 0.55; // px/ms  (~550px/s)

    const goNext = dx.current <= -distThreshold || vx.current <= -veloThreshold;
    const goPrev = dx.current >= distThreshold || vx.current >= veloThreshold;

    if (goNext && index < len - 1) {
      setIndex((v) => v + 1);
    } else if (goPrev && index > 0) {
      setIndex((v) => v - 1);
    } else {
      apply(0, true); // snap back
    }

    dx.current = 0;
    vx.current = 0;
  };

  const prev = () => setIndex((v) => clamp(v - 1, 0, len - 1));
  const next = () => setIndex((v) => clamp(v + 1, 0, len - 1));

  if (!images || !len) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Schließen"
      />

      <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-6">
        <div className="relative w-full max-w-5xl">
          {/* Top bar */}
          <div className="absolute -top-12 left-0 right-0 flex items-center justify-between text-white/80">
            <div className="text-sm">
              {index + 1} / {len}
            </div>
            <button
              onClick={onClose}
              className="h-10 px-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              Schließen
            </button>
          </div>

          {/* Stage */}
          <div
            ref={stageRef}
            className="
              relative overflow-hidden rounded-2xl
              border border-white/10 bg-black
              shadow-[0_30px_80px_rgba(0,0,0,0.6)]
              touch-none select-none
            "
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishSwipe}
            onPointerCancel={finishSwipe}
          >
            <div ref={trackRef} className="flex will-change-transform">
              {images.map((img, i) => (
                <div
                  key={img.src}
                  className="relative w-full shrink-0 aspect-[16/10] sm:aspect-[16/9]"
                >
                  {neighbors.has(i) ? (
                    <Image
                      src={img.src}
                      alt={img.alt || "Projektbild"}
                      fill
                      sizes="(max-width: 768px) 100vw, 960px"
                      className="object-contain bg-black"
                      priority={i === index}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black" />
                  )}
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              className="
                absolute left-3 top-1/2 -translate-y-1/2
                h-11 w-11 rounded-full
                border border-white/15 bg-white/5 text-white
                hover:bg-white/10 transition
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
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                h-11 w-11 rounded-full
                border border-white/15 bg-white/5 text-white
                hover:bg-white/10 transition
                disabled:opacity-30 disabled:cursor-not-allowed
              "
              aria-label="Nächstes Bild"
            >
              ›
            </button>
          </div>

          {/* Caption */}
          <div className="mt-4 text-center text-xs sm:text-sm text-white/65">
            {images[index]?.alt}
          </div>
        </div>
      </div>
    </div>
  );
}
