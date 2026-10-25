"use client";

import { useState } from "react";
import Image from "next/image";

export default function DetailAtlas({ image, details, title }) {
  const [active, setActive] = useState(0);
  if (!details?.length) return null;

  return (
    <section className="atlas" aria-labelledby="atlas-heading">
      <div className="atlas-heading">
        <p className="eyebrow">Detailatlas</p>
        <h2 id="atlas-heading">Was an diesem Projekt zählt</h2>
        <p>Wählen Sie ein Detail und erfahren Sie, worauf es bei der Ausführung ankommt.</p>
      </div>
      <div className="atlas-grid">
        <div className="atlas-image">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 60vw" />
          <span>{title}</span>
        </div>
        <div className="atlas-list" role="tablist" aria-label="Handwerkliche Details">
          {details.map((detail, index) => (
            <button
              key={detail.title}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="atlas-panel"
              onClick={() => setActive(index)}
              className={active === index ? "atlas-tab is-active" : "atlas-tab"}
            >
              <span className="atlas-number">0{index + 1}</span>
              <span><strong>{detail.title}</strong><small>{active === index ? detail.text : "Detail ansehen"}</small></span>
            </button>
          ))}
          <div id="atlas-panel" role="tabpanel" className="sr-only">{details[active].text}</div>
        </div>
      </div>
    </section>
  );
}
