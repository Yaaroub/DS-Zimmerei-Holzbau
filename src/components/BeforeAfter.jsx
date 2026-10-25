"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfter({ before, after, title }) {
  const [position, setPosition] = useState(50);
  const activePointer = useRef(null);

  function moveTo(clientX, frame) {
    const bounds = frame.getBoundingClientRect();
    if (!bounds.width) return;
    setPosition(Math.round(Math.max(0, Math.min(100, ((clientX - bounds.left) / bounds.width) * 100))));
  }

  function startDrag(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    moveTo(event.clientX, event.currentTarget);
  }

  function drag(event) {
    if (activePointer.current === event.pointerId) moveTo(event.clientX, event.currentTarget);
  }

  function stopDrag(event) {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <figure className="comparison">
      <div className="comparison-frame" onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
        <Image src={after.src} alt={after.alt} fill sizes="(max-width: 768px) 100vw, 1100px" className="comparison-image" draggable={false} />
        <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes="(max-width: 768px) 100vw, 1100px" className="comparison-image" draggable={false} />
        </div>
        <span className="comparison-label comparison-label-left">Vorher</span>
        <span className="comparison-label comparison-label-right">Nachher</span>
        <div className="comparison-line" style={{ left: `${position}%` }} aria-hidden="true"><span>↔</span></div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Vorher-Nachher-Vergleich: ${title}`}
        className="comparison-range"
      />
      <figcaption>Bild mit dem Finger nach links oder rechts ziehen – oder den Regler nutzen.</figcaption>
    </figure>
  );
}
