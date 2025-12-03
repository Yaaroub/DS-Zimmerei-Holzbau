"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images = [], index = 0, onClose }) {
  const [current, setCurrent] = useState(index);

  // Wenn ein anderes Projekt geöffnet wird → Index zurücksetzen
  useEffect(() => {
    setCurrent(index);
  }, [index]);

  // Tastatursteuerung: Links / Rechts / Escape
  useEffect(() => {
    if (!images.length) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key === "ArrowRight") {
        setCurrent((prev) =>
          prev < images.length - 1 ? prev + 1 : prev
        );
      }
      if (e.key === "ArrowLeft") {
        setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  if (!images.length) return null;

  const hasPrev = current > 0;
  const hasNext = current < images.length - 1;
  const currentImg = images[current];

  // Touch-Swipe (nur innerhalb einer Geste, sehr zuverlässig)
  let touchStartX = 0;
  let touchStartY = 0;

  const handleTouchStart = (e) => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  };

  const handleTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    // nur horizontale, genügend lange Swipes werten
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0 && hasNext) {
      setCurrent((prev) => prev + 1); // nach links wischen → nächstes Bild
    }
    if (dx > 0 && hasPrev) {
      setCurrent((prev) => prev - 1); // nach rechts wischen → vorheriges Bild
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center px-3 sm:px-4"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full border border-white/20 bg-black/70 p-1.5 sm:p-2 text-white hover:bg-black/90"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Prev / Next */}
      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
          }}
          className="absolute left-2 sm:left-4 md:left-6 rounded-full border border-white/20 bg-black/70 p-1.5 sm:p-2 text-white hover:bg-black/90"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) =>
              prev < images.length - 1 ? prev + 1 : prev
            );
          }}
          className="absolute right-2 sm:right-4 md:right-6 rounded-full border border-white/20 bg-black/70 p-1.5 sm:p-2 text-white hover:bg-black/90"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}

      {/* Bild + Footer */}
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[80vh] aspect-[4/3] sm:aspect-[3/2] overflow-hidden rounded-2xl border border-white/15 bg-black flex items-center justify-center">
          <Image
            src={currentImg.src}
            alt={currentImg.alt || ""}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 70vw, 100vw"
          />
        </div>

        <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-gray-300">
          <span className="font-medium line-clamp-2">
            {currentImg.alt || "Projektbild"}
          </span>
          <span>
            Bild {current + 1} von {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
