// src/components/cookies/CookieBanner.jsx
"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

export default function CookieBanner() {
  const { ready, hasDecision, acceptAll, acceptNecessary } = useCookieConsent();
  const [openSettings, setOpenSettings] = useState(false);

  // ✅ von überall (z.B. Footer-Link) Modal öffnen:
  useEffect(() => {
    const open = () => setOpenSettings(true);
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  // Banner zeigen: nur wenn ready && keine Entscheidung
  const showBanner = ready && !hasDecision;

  // Wenn weder Banner noch Modal offen ist, nichts rendern
  if (!showBanner && !openSettings) return null;

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/90 p-4 text-white shadow-xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold">🍪 Cookie-Einstellungen</p>
                <p className="text-xs text-white/80">
                  Wir nutzen Cookies, um die Website sicher zu betreiben und optional zu verbessern (z. B. Statistik).
                  Sie können Ihre Auswahl jederzeit ändern.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setOpenSettings(true)}
                  className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold hover:bg-white/10"
                >
                  Einstellungen
                </button>

                <button
                  type="button"
                  onClick={acceptNecessary}
                  className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold hover:bg-white/10"
                >
                  Nur notwendig
                </button>

                <button
                  type="button"
                  onClick={acceptAll}
                  className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:opacity-90"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {openSettings && <CookieSettingsModal onClose={() => setOpenSettings(false)} />}
    </>
  );
}

function CookieSettingsModal({ onClose }) {
  const { effective, save, acceptNecessary } = useCookieConsent();

  const [functional, setFunctional] = useState(effective.functional);
  const [analytics, setAnalytics] = useState(effective.analytics);
  const [marketing, setMarketing] = useState(effective.marketing);

  // sync wenn Modal über Footer geöffnet wird
  useEffect(() => {
    setFunctional(effective.functional);
    setAnalytics(effective.analytics);
    setMarketing(effective.marketing);
  }, [effective]);

  const onSave = () => {
    save({ functional, analytics, marketing });
    onClose();
  };

  const onBackdrop = (e) => {
    // nur schließen, wenn wirklich das Backdrop geklickt wurde
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 md:items-center"
      onMouseDown={onBackdrop}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-950 p-5 text-white shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Cookie-Einstellungen</h2>
            <p className="mt-1 text-xs text-white/75">
              Notwendige Cookies sind immer aktiv. Optional können Sie Funktion, Statistik und Marketing erlauben.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 px-3 py-1 text-xs hover:bg-white/10"
          >
            Schließen
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <Row
            title="Notwendig"
            desc="Erforderlich für Betrieb & Sicherheit (kann nicht deaktiviert werden)."
            checked
            disabled
          />

          <Row
            title="Funktional"
            desc="Speichert z. B. Einstellungen (Sprache, Formulare)."
            checked={functional}
            onChange={setFunctional}
          />

          <Row
            title="Statistik / Analyse"
            desc="Hilft uns, die Website zu verbessern (anonym/aggregiert)."
            checked={analytics}
            onChange={setAnalytics}
          />

          <Row
            title="Marketing"
            desc="Nur falls Werbe-/Tracking-Dienste eingebunden sind."
            checked={marketing}
            onChange={setMarketing}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              acceptNecessary();
              onClose();
            }}
            className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold hover:bg-white/10"
          >
            Nur notwendig
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:opacity-90"
          >
            Auswahl speichern
          </button>
        </div>

        <p className="mt-4 text-[11px] text-white/60">
          Weitere Informationen finden Sie in der Datenschutzerklärung.
        </p>
      </div>
    </div>
  );
}

function Row({ title, desc, checked, onChange, disabled }) {
  return (
    <div className="rounded-xl border border-white/10 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-white/70">{desc}</p>
        </div>

        <label className="inline-flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            className="h-4 w-4 accent-white"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
}
