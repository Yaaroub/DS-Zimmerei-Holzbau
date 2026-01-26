// src/components/KontaktSection.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

/**
 * ✅ Local SEO / NAP Daten (BITTE anpassen)
 * - Wenn keine Straße öffentlich: streetAddress leer lassen oder entfernen
 * - Geo nur, wenn korrekt
 */
const BUSINESS = {
  name: "DS Zimmerei & Holzbau",
  url: "https://www.ds-zimmerei-holzbau.de",
  telephone: "+491729759134",
  email: "kontakt@ds-zimmerei-holzbau.de",

  // Optional / empfohlen:
  address: {
    streetAddress: "", // z.B. "Behler Weg 11"
    postalCode: "24329",
    addressLocality: "Grebin",
    addressRegion: "Schleswig-Holstein",
    addressCountry: "DE",
  },

  // Optional: wenn du die Coordinates sicher kennst (sonst rauslassen)
  geo: {
    latitude: 54.19458047243291,
    longitude: 10.483522811669367,
  },

  // Optional: Öffnungszeiten (wenn du welche hast)
  openingHours: [
    // "Mo-Fr 07:00-17:00",
  ],

  // Optional: bediente Orte / Bereich
  serviceAreaText:
    "Schleswig-Holstein – u.a. Kiel, Lübeck, Plön, Rendsburg, Neumünster, Elmshorn, Norderstedt & Umgebung",
};

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function GoogleMapEmbed() {
  const { effective, acceptAll } = useCookieConsent();

  if (!effective.external) {
    return (
      <div className="rounded-lg border border-brand-border bg-white p-4">
        <p className="text-sm font-semibold">Karte (Google Maps)</p>
        <p className="mt-1 text-xs text-brand-textMuted">
          Externe Inhalte sind deaktiviert. Zum Laden der Karte bitte zustimmen.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={acceptAll}
            className="
              inline-flex items-center justify-center
              rounded-full bg-brand-green px-4 py-2
              text-xs font-semibold text-black
              hover:brightness-110 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30
            "
          >
            Karte laden
          </button>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
            className="
              inline-flex items-center justify-center
              rounded-full border border-brand-border bg-white px-4 py-2
              text-xs font-semibold text-brand-textMuted
              hover:text-brand-text hover:border-brand-green/40 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/20
            "
          >
            Einstellungen
          </button>
        </div>

        <p className="mt-3 text-[11px] md:text-xs text-brand-textMuted leading-relaxed">
          Hinweis: Beim Laden der Karte können Daten an Google übertragen werden.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-lg border border-brand-border bg-white h-[140px] sm:h-[160px] md:h-[180px]">
        <iframe
          title={`Standort ${BUSINESS.name} in Google Maps`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2334.1809263008035!2d10.483522811669367!3d54.19458047243291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b267e6e06c85e1%3A0x2d127a08d29f8f8f!2sDS%20Zimmerei%20%26%20Holzbau!5e0!3m2!1sde!2sde!4v1768941897096!5m2!1sde!2sde"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <p className="mt-3 text-[11px] md:text-xs text-brand-textMuted leading-relaxed">
        Hinweis: Beim Laden der Karte können Daten an Google übertragen werden.
      </p>
    </>
  );
}

export default function KontaktSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [wantCallback, setWantCallback] = useState(false);

  const successRef = useRef(null);
  const errorRef = useRef(null);

  const SUBJECTS = useMemo(
    () => [
      "Allgemeine Anfrage",
      "Dachsanierung / Neueindeckung",
      "Dachfenster / Dachflächenfenster",
      "Carport / Terrasse / Überdachung",
      "Gaube / Anbau / Aufstockung",
      "Innenausbau / Trockenbau",
      "Fassade / Holzverkleidung",
      "Reparatur / Sturmschaden",
    ],
    []
  );

  // ✅ JSON-LD: LocalBusiness
  const localBusinessJsonLd = useMemo(() => {
    const hasStreet = Boolean(BUSINESS.address?.streetAddress?.trim());

    const address = {
      "@type": "PostalAddress",
      ...(hasStreet ? { streetAddress: BUSINESS.address.streetAddress } : {}),
      postalCode: BUSINESS.address.postalCode,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    };

    const data = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      url: BUSINESS.url,
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      address,
      ...(BUSINESS.geo?.latitude && BUSINESS.geo?.longitude
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: BUSINESS.geo.latitude,
              longitude: BUSINESS.geo.longitude,
            },
          }
        : {}),
      // Optional: Öffnungszeiten
      ...(BUSINESS.openingHours?.length
        ? { openingHours: BUSINESS.openingHours }
        : {}),
      // ContactPoint (hilft bei Rich Results)
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: BUSINESS.telephone,
          contactType: "customer service",
          availableLanguage: ["de"],
        },
      ],
      // Optional: Service Area als Text (kein perfekter Standard, aber nützlich)
      areaServed: BUSINESS.serviceAreaText,
    };

    return data;
  }, []);

  /**
   * Optional: FAQ Schema (nur nutzen, wenn du wirklich FAQs auf der Seite anzeigst)
   * Wenn du später FAQ-Accordion hast, sag Bescheid → wir koppeln das exakt.
   */
  // const faqJsonLd = useMemo(
  //   () => ({
  //     "@context": "https://schema.org",
  //     "@type": "FAQPage",
  //     mainEntity: [
  //       {
  //         "@type": "Question",
  //         name: "Wie schnell bekomme ich eine Rückmeldung?",
  //         acceptedAnswer: {
  //           "@type": "Answer",
  //           text: "In der Regel melden wir uns zeitnah mit Rückfragen oder einem unverbindlichen Angebot.",
  //         },
  //       },
  //       {
  //         "@type": "Question",
  //         name: "Kann ich Fotos oder Dokumente mitsenden?",
  //         acceptedAnswer: {
  //           "@type": "Answer",
  //           text: "Im Erstkontakt reicht eine kurze Beschreibung. Fotos/PDFs können Sie im Anschluss per E-Mail nachreichen.",
  //         },
  //       },
  //     ],
  //   }),
  //   []
  // );

  const validate = (payload) => {
    if (!payload.name?.trim()) return "Bitte geben Sie Ihren Namen an.";
    if (!payload.email?.trim()) return "Bitte geben Sie Ihre E-Mail-Adresse an.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      return "Bitte geben Sie eine gültige E-Mail-Adresse an.";

    // ✅ Pflichtfeld: Vorhaben
    if (!payload.nachricht?.trim())
      return "Bitte beschreiben Sie Ihr Vorhaben / Projekt.";

    // Rückruf erfordert Telefon
    if (payload.rueckruf) {
      if (!payload.telefon?.trim())
        return "Für einen Rückruf benötigen wir Ihre Telefonnummer.";
      // leichte Plausibilitätsprüfung
      if (!/^[0-9+()\/\s-]{6,}$/.test(payload.telefon.trim()))
        return "Bitte geben Sie eine gültige Telefonnummer an.";
    }

    if (!payload.dsgvo) {
      return "Bitte stimmen Sie der Datenverarbeitung zu (DSGVO).";
    }

    // Honeypot
    if (payload.website) return "Spam erkannt.";

    return "";
  };

  useEffect(() => {
    // Fokus-Management: nach Erfolg/Fehler sichtbar fokusieren
    if (sent && successRef.current) successRef.current.focus();
  }, [sent]);

  useEffect(() => {
    if (errorMsg && errorRef.current) errorRef.current.focus();
  }, [errorMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSent(false);
    setErrorMsg("");
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    try {
      const formData = new FormData(e.target);

      const payload = {
        name: (formData.get("name") || "").toString(),
        telefon: (formData.get("telefon") || "").toString(),
        email: (formData.get("email") || "").toString(),
        nachricht: (formData.get("nachricht") || "").toString(),
        betreff: (formData.get("betreff") || "").toString(),
        leistung: (formData.get("leistung") || "").toString(),
        plz: (formData.get("plz") || "").toString(),
        ort: (formData.get("ort") || "").toString(),
        strasse: (formData.get("strasse") || "").toString(),
        rueckruf: formData.get("rueckruf") === "ja",
        rueckrufZeit: (formData.get("rueckrufZeit") || "").toString(),
        dsgvo: formData.get("dsgvo") === "ja",
        website: (formData.get("website") || "").toString(),
      };

      const err = validate(payload);
      if (err) throw new Error(err);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const ct = res.headers.get("content-type") || "";
      let data = {};
      if (ct.includes("application/json")) {
        data = await res.json().catch(() => ({}));
      } else {
        const txt = await res.text().catch(() => "");
        data = { error: txt?.slice(0, 300) || "" };
      }

      if (!res.ok || data?.ok === false) {
        const detail = data?.error ? ` (${data.error})` : "";
        throw new Error(
          `Senden fehlgeschlagen (HTTP ${res.status})${detail}` ||
            "Fehler beim Senden. Bitte später erneut versuchen."
        );
      }

      setSent(true);
      e.target.reset();
      setWantCallback(false);
    } catch (err) {
      console.error(err);

      if (err?.name === "AbortError") {
        setErrorMsg(
          "Zeitüberschreitung. Bitte erneut versuchen oder uns direkt anrufen."
        );
      } else {
        setErrorMsg(
          err?.message ||
            "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an."
        );
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  // Für better a11y: IDs für descriptions
  const hintNachrichtId = "nachricht-hint";
  const dsgvoHintId = "dsgvo-hint";

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-heading"
      className="
        bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F8FA_100%)]
        text-brand-text
        py-24 md:py-32
        px-6
        border-t border-brand-border
      "
    >
      {/* ✅ Structured Data (Local SEO) */}
      <JsonLd data={localBusinessJsonLd} />
      {/* Optional: FAQ Schema */}
      {/* <JsonLd data={faqJsonLd} /> */}

      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[1.3fr,1fr] items-start">
        {/* TEXT / LOCAL / MAP */}
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-brand-green uppercase tracking-[0.25em] text-sm font-semibold">
              Kontakt
            </p>

            <h2
              id="kontakt-heading"
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Angebot anfordern oder Rückruf vereinbaren
            </h2>

            <p className="text-brand-textMuted text-sm md:text-base max-w-xl leading-relaxed">
              Beschreiben Sie uns Ihr Vorhaben – wir melden uns zeitnah mit Rückfragen
              oder einem unverbindlichen Angebot.
            </p>
          </div>

          {/* Quick Value Props */}
          <div className="grid gap-3 text-sm text-brand-textMuted">
            <p>• Zimmerer- &amp; Dacharbeiten für Neu- und Bestandsbauten</p>
            <p>• Sanierungen, Gauben, Carports, Terrassen, Fassaden</p>
            <p>• Fenster- &amp; Türenaustausch, Innenausbau, Dachflächenfenster</p>
            <p className="pt-1">
              <a
                href="#leistungen"
                className="underline underline-offset-4 hover:text-brand-text"
              >
                Leistungen ansehen
              </a>
              <span className="text-brand-textMuted"> · </span>
              <a
                href="#projekte"
                className="underline underline-offset-4 hover:text-brand-text"
              >
                Projekte ansehen
              </a>
            </p>
          </div>

          {/* Rückruf Info Box (Anchor target for Hero) */}
          <div
            id="rueckruf"
            className="
              scroll-mt-28
              rounded-2xl
              border border-brand-border
              bg-brand-surface
              p-5 md:p-6
              shadow-[0_12px_30px_rgba(15,23,42,0.08)]
            "
          >
            <div className="border-l-[3px] border-brand-green/70 pl-4">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-textMuted">
                Rückruf gewünscht?
              </p>
              <p className="text-base font-semibold mt-1">
                Wir melden uns telefonisch bei Ihnen.
              </p>
              <p className="mt-2 text-sm text-brand-textMuted leading-relaxed">
                Telefonnummer eintragen und Rückruf aktivieren – optional mit Wunschzeit.
              </p>
            </div>
          </div>

          {/* Direktkontakt + NAP (Local SEO) */}
          <div className="rounded-2xl border border-brand-border bg-white/70 p-5 md:p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold">Direktkontakt</p>

            <div className="mt-3 grid gap-2 text-sm text-brand-textMuted">
              <a
                className="underline underline-offset-4 hover:text-brand-text"
                href={`tel:${BUSINESS.telephone}`}
              >
                Telefon: {BUSINESS.telephone.replace("+49", "0")}
              </a>

              <a
                className="underline underline-offset-4 hover:text-brand-text"
                href={`mailto:${BUSINESS.email}`}
              >
                E-Mail: {BUSINESS.email}
              </a>

              {/* NAP Text (sehr gut für Local SEO) */}
              <div className="pt-2 text-xs leading-relaxed">
                <p className="font-semibold text-brand-text">{BUSINESS.name}</p>
                <p>
                  {BUSINESS.address.streetAddress ? (
                    <>
                      {BUSINESS.address.streetAddress},{" "}
                      {BUSINESS.address.postalCode} {BUSINESS.address.addressLocality}
                    </>
                  ) : (
                    <>
                      {BUSINESS.address.postalCode} {BUSINESS.address.addressLocality},{" "}
                      {BUSINESS.address.addressRegion}
                    </>
                  )}
                </p>
                <p className="text-brand-textMuted">{BUSINESS.serviceAreaText}</p>
              </div>
            </div>
          </div>

          {/* Standort + Map */}
          <div
            className="
              rounded-xl border border-brand-border bg-white/60
              p-4
              shadow-[0_8px_20px_rgba(15,23,42,0.05)]
            "
            aria-labelledby="standort-heading"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p id="standort-heading" className="text-sm font-semibold">
                  Standort
                </p>
                <p className="mt-0.5 text-xs text-brand-textMuted">
                  {BUSINESS.address.postalCode} {BUSINESS.address.addressLocality},{" "}
                  {BUSINESS.address.addressRegion}
                </p>
              </div>

              <a
                href="https://www.google.com/maps?cid=3247349287802319231"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-[11px]
                  underline underline-offset-4
                  text-brand-textMuted
                  hover:text-brand-text
                  whitespace-nowrap
                "
              >
                Google Maps öffnen
              </a>
            </div>

            <div className="mt-3">
              <GoogleMapEmbed />
            </div>
          </div>
        </div>

        {/* FORM */}
        <div
          className="
            bg-brand-surface
            border border-brand-border
            rounded-2xl
            p-6 md:p-8
            shadow-[0_12px_30px_rgba(15,23,42,0.08)]
          "
          aria-labelledby="formular-heading"
        >
          <p id="formular-heading" className="text-sm font-semibold">
            Anfrageformular
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm" noValidate>
            {/* Honeypot */}
            <div className="hidden">
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {/* Betreff + Leistung */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-brand-textMuted" htmlFor="betreff">
                  Betreff
                </label>
                <select
                  id="betreff"
                  name="betreff"
                  defaultValue={SUBJECTS[0]}
                  className="
                    w-full rounded-lg bg-white
                    border border-brand-border px-3 py-2
                    text-sm text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-brand-textMuted" htmlFor="leistung">
                  Leistung / Bereich
                </label>
                <select
                  id="leistung"
                  name="leistung"
                  defaultValue="Beratung"
                  className="
                    w-full rounded-lg bg-white
                    border border-brand-border px-3 py-2
                    text-sm text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                >
                  <option value="Beratung">Beratung</option>
                  <option value="Angebot">Angebot</option>
                  <option value="Reparatur">Reparatur</option>
                  <option value="Notfall/Sturmschaden">Notfall / Sturmschaden</option>
                </select>
              </div>
            </div>

            {/* Name / Telefon */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-brand-textMuted" htmlFor="name">
                  Name <span className="text-brand-green">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="
                    w-full rounded-lg bg-white
                    border border-brand-border px-3 py-2
                    text-sm text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                  aria-invalid={Boolean(errorMsg) ? "true" : "false"}
                />
              </div>

              <div>
                <label className="block mb-1 text-brand-textMuted" htmlFor="telefon">
                  Telefon{" "}
                  {wantCallback ? <span className="text-brand-green">*</span> : null}
                </label>
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="z. B. 0172 1234567"
                  required={wantCallback}
                  pattern={wantCallback ? "^[0-9+()\\/\\s-]{6,}$" : undefined}
                  className="
                    w-full rounded-lg bg-white
                    border border-brand-border px-3 py-2
                    text-sm text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-brand-textMuted" htmlFor="email">
                E-Mail <span className="text-brand-green">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                className="
                  w-full rounded-lg bg-white
                  border border-brand-border px-3 py-2
                  text-sm text-brand-text
                  outline-none
                  focus:border-brand-green/60
                  focus:ring-2 focus:ring-brand-green/20
                "
              />
            </div>

            {/* Adresse */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-brand-textMuted" htmlFor="plz">
                  PLZ
                </label>
                <input
                  id="plz"
                  name="plz"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="z. B. 24329"
                  className="
                    w-full rounded-lg bg-white
                    border border-brand-border px-3 py-2
                    text-sm text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-brand-textMuted" htmlFor="ort">
                  Ort
                </label>
                <input
                  id="ort"
                  name="ort"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="z. B. Grebin"
                  className="
                    w-full rounded-lg bg-white
                    border border-brand-border px-3 py-2
                    text-sm text-brand-text
                    outline-none
                    focus:border-brand-green/60
                    focus:ring-2 focus:ring-brand-green/20
                  "
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-brand-textMuted" htmlFor="strasse">
                Straße / Hausnummer (optional)
              </label>
              <input
                id="strasse"
                name="strasse"
                type="text"
                autoComplete="street-address"
                placeholder="z. B. Behler Weg 11"
                className="
                  w-full rounded-lg bg-white
                  border border-brand-border px-3 py-2
                  text-sm text-brand-text
                  outline-none
                  focus:border-brand-green/60
                  focus:ring-2 focus:ring-brand-green/20
                "
              />
            </div>

            {/* Vorhaben / Projekt */}
            <div>
              <label className="block mb-1 text-brand-textMuted" htmlFor="nachricht">
                Ihr Vorhaben / Projekt <span className="text-brand-green">*</span>
              </label>
              <textarea
                id="nachricht"
                name="nachricht"
                rows={4}
                required
                className="
                  w-full rounded-lg bg-white
                  border border-brand-border px-3 py-2
                  text-sm text-brand-text
                  outline-none
                  focus:border-brand-green/60
                  focus:ring-2 focus:ring-brand-green/20
                  resize-none
                "
                placeholder="z.B. Dachsanierung, Gaube, Anbau, Carport, Fenster-/Türentausch…"
                aria-describedby={hintNachrichtId}
              />
              <p
                id={hintNachrichtId}
                className="mt-2 text-[11px] text-brand-textMuted leading-relaxed"
              >
                Bitte kurz beschreiben: Was soll gemacht werden? Wo (Ort/PLZ)? Und bis wann?
              </p>
            </div>

            <p className="text-[11px] text-brand-textMuted">
              Fotos/PDFs können Sie nach dem Erstkontakt per E-Mail nachreichen.
            </p>

            {/* Rückruf */}
            <div className="mt-3 space-y-2">
              <p className="block text-brand-text font-semibold">Rückrufvereinbarung</p>

              <div className="flex items-start gap-2">
                <input
                  id="rueckrufCheck"
                  name="rueckruf"
                  type="checkbox"
                  value="ja"
                  checked={wantCallback}
                  onChange={(e) => setWantCallback(e.target.checked)}
                  className="
                    mt-0.5 h-4 w-4 rounded
                    border border-brand-border
                    bg-white
                    text-brand-green
                    focus:ring-2 focus:ring-brand-green/20
                  "
                />
                <label htmlFor="rueckrufCheck" className="text-xs text-brand-textMuted">
                  Ich wünsche einen telefonischen Rückruf.
                </label>
              </div>

              {wantCallback && (
                <div className="rounded-xl border border-brand-border bg-white/70 p-4">
                  <label className="block mb-1 text-brand-textMuted text-xs" htmlFor="rueckrufZeit">
                    Bevorzugte Rückrufzeit (optional)
                  </label>
                  <input
                    id="rueckrufZeit"
                    name="rueckrufZeit"
                    type="text"
                    placeholder="z.B. werktags zwischen 16 und 18 Uhr"
                    className="
                      w-full rounded-lg bg-white
                      border border-brand-border px-3 py-2
                      text-xs text-brand-text
                      outline-none
                      focus:border-brand-green/60
                      focus:ring-2 focus:ring-brand-green/20
                    "
                  />
                  <p className="mt-2 text-[11px] text-brand-textMuted">
                    Tipp: Wenn es dringend ist, schreiben Sie „Dringend“ in die Nachricht.
                  </p>
                </div>
              )}
            </div>

            {/* DSGVO */}
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2">
                <input
                  id="dsgvo"
                  name="dsgvo"
                  type="checkbox"
                  value="ja"
                  className="
                    mt-0.5 h-4 w-4 rounded
                    border border-brand-border
                    bg-white
                    text-brand-green
                    focus:ring-2 focus:ring-brand-green/20
                  "
                  required
                  aria-describedby={dsgvoHintId}
                />
                <label htmlFor="dsgvo" className="text-xs text-brand-textMuted">
                  Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden.
                  Weitere Infos in der{" "}
                  <a
                    href="/datenschutz"
                    className="underline underline-offset-4 hover:text-brand-text"
                  >
                    Datenschutzerklärung
                  </a>
                  .
                </label>
              </div>

              <p id={dsgvoHintId} className="text-[11px] text-brand-textMuted leading-relaxed">
                Hinweis: Bitte keine sensiblen Daten (z.B. Gesundheitsdaten) über das Formular senden.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                mt-2 inline-flex w-full items-center justify-center
                rounded-full
                bg-brand-green text-black
                px-6 py-3
                text-sm font-semibold
                shadow-sm
                hover:brightness-110
                transition
                disabled:opacity-60 disabled:cursor-not-allowed
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30
              "
            >
              {loading ? "Wird gesendet…" : "Nachricht senden"}
            </button>

            {/* Success / Error (aria-live) */}
            {sent && (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="rounded-xl border border-brand-green/25 bg-brand-green/10 px-4 py-3"
              >
                <p className="text-xs text-brand-text">
                  <span className="font-semibold">Vielen Dank!</span> Ihre Nachricht wurde erfolgreich
                  übermittelt. Wir melden uns zeitnah bei Ihnen.
                </p>
              </div>
            )}

            {errorMsg && (
              <div
                ref={errorRef}
                tabIndex={-1}
                role="alert"
                aria-live="assertive"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
              >
                <p className="text-xs text-red-700">{errorMsg}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
