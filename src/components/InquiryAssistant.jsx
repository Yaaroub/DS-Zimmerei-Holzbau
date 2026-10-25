"use client";

import { useState } from "react";

const areas = ["Dach", "Holzbau / Anbau", "Fassade", "Carport / Terrasse", "Innenausbau", "Reparatur", "Noch unsicher"];
const situations = ["Neues Vorhaben", "Bestehendes sanieren", "Schaden beheben", "Beratung gesucht"];
const timings = ["Zeitnah", "In den nächsten Monaten", "Noch offen"];

export default function InquiryAssistant({ onApply }) {
  const [area, setArea] = useState("");
  const [situation, setSituation] = useState("");
  const [timing, setTiming] = useState("");
  const [place, setPlace] = useState("");
  const ready = area && situation && timing;
  const message = ready ? `Ich interessiere mich für: ${area}.\nAusgangslage: ${situation}.\nZeitrahmen: ${timing}.${place.trim() ? `\nOrt des Vorhabens: ${place.trim()}.` : ""}\n\nWeitere Angaben zu meinem Projekt: ` : "";
  return <section className="inquiry-assistant" aria-labelledby="inquiry-heading">
    <div><p className="eyebrow">Anfragehilfe</p><h2 id="inquiry-heading">In drei Schritten<br /><em>zum guten Erstgespräch.</em></h2><p>Wählen Sie, was Sie schon wissen. Die Angaben werden nur in das Formular übernommen, wenn Sie auf „Angaben übernehmen“ klicken.</p></div>
    <div className="inquiry-steps">
      <fieldset><legend><span>01</span> Worum geht es?</legend><div className="inquiry-choices">{areas.map((item) => <button key={item} type="button" aria-pressed={area === item} onClick={() => setArea(item)}>{item}</button>)}</div></fieldset>
      <fieldset><legend><span>02</span> Was ist die Ausgangslage?</legend><div className="inquiry-choices">{situations.map((item) => <button key={item} type="button" aria-pressed={situation === item} onClick={() => setSituation(item)}>{item}</button>)}</div></fieldset>
      <fieldset><legend><span>03</span> Wann soll es losgehen?</legend><div className="inquiry-choices">{timings.map((item) => <button key={item} type="button" aria-pressed={timing === item} onClick={() => setTiming(item)}>{item}</button>)}</div></fieldset>
      <label className="inquiry-place">Ort des Vorhabens <span>(optional)</span><input value={place} onChange={(event) => setPlace(event.target.value)} placeholder="z. B. Plön" maxLength={80} /></label>
      <button type="button" className="button button-dark" disabled={!ready} onClick={() => onApply(message)}>Angaben ins Formular übernehmen</button>
    </div>
  </section>;
}
