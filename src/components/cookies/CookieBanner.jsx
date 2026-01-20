"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

export default function CookieBanner() {
  const { ready, hasDecision, acceptNecessary, acceptAll } = useCookieConsent();
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    const open = () => setOpenInfo(true);
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  const show = ready && !hasDecision;
  if (!show && !openInfo) return null;

  return (
    <>
      {show && (
        <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/90 p-4 text-white shadow-xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold">🍪 Cookie- &amp; Inhalte-Hinweis</p>
                <p className="text-xs text-white/80">
                  Wir verwenden notwendige Cookies für den Betrieb. Externe Inhalte (z.B. Google Maps) werden erst nach
                  Zustimmung geladen. Es findet kein Tracking durch uns statt.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setOpenInfo(true)}
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

      {openInfo && <CookieInfoModal onClose={() => setOpenInfo(false)} />}
    </>
  );
}

function CookieInfoModal({ onClose }) {
  const { effective, acceptNecessary, acceptAll, setExternal } = useCookieConsent();

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 md:items-center" onMouseDown={onBackdrop}>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-950 p-5 text-white shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Einstellungen</h2>
            <p className="mt-1 text-xs text-white/75">
              Notwendige Cookies sind immer aktiv. Externe Inhalte können optional aktiviert werden.
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

        <div className="space-y-4 text-sm text-white/85">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-white">Notwendig</p>
                <p className="mt-1 text-xs text-white/75">
                  Speichert Ihre Auswahl und stellt die Website sicher bereit.
                </p>
              </div>
              <span className="text-xs font-semibold text-white/80">Immer aktiv</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-white">Externe Inhalte (Google Maps)</p>
                <p className="mt-1 text-xs text-white/75">
                  Beim Laden der Karte können Daten an Google übertragen werden (z.B. IP-Adresse).
                </p>
              </div>

              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!effective.external}
                  onChange={(e) => setExternal(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-brand-green focus:ring-2 focus:ring-brand-green/30"
                />
                <span className="text-xs text-white/80">Aktiv</span>
              </label>
            </div>
          </div>

          <p className="text-[11px] text-white/60">
            Details finden Sie in der Datenschutzerklärung.
          </p>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
            onClick={() => {
              acceptAll();
              onClose();
            }}
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:opacity-90"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
