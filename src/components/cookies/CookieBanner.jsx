"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

export default function CookieBanner() {
  const { ready, hasDecision, acceptNecessary } = useCookieConsent();
  const [openInfo, setOpenInfo] = useState(false);

  // Footer-Link: Cookie-Hinweis öffnen
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
                <p className="text-sm font-semibold">🍪 Cookies</p>
                <p className="text-xs text-white/80">
                  Wir verwenden nur technisch notwendige Cookies, um Ihre Cookie-Auswahl zu speichern und die Website
                  sicher bereitzustellen. Es findet kein Tracking statt.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setOpenInfo(true)}
                  className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold hover:bg-white/10"
                >
                  Mehr Infos
                </button>

                <button
                  type="button"
                  onClick={acceptNecessary}
                  className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:opacity-90"
                >
                  Verstanden
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
  const { acceptNecessary } = useCookieConsent();

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 md:items-center" onMouseDown={onBackdrop}>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-950 p-5 text-white shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Cookie-Hinweis</h2>
            <p className="mt-1 text-xs text-white/75">
              Auf dieser Website werden ausschließlich notwendige Cookies eingesetzt.
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

        <div className="space-y-3 text-sm text-white/85">
          <p>
            <span className="font-semibold text-white">Zweck:</span> Speicherung Ihrer Cookie-Auswahl, Sicherheit und
            stabiler Betrieb der Website.
          </p>
          <p>
            <span className="font-semibold text-white">Tracking:</span> Es werden keine Analyse- oder Marketing-Tools
            eingesetzt.
          </p>
          <p>
            <span className="font-semibold text-white">Speicherdauer:</span> bis zu 180 Tage oder bis zum Löschen in
            Ihrem Browser.
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              acceptNecessary();
              onClose();
            }}
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:opacity-90"
          >
            Verstanden
          </button>
        </div>

        <p className="mt-4 text-[11px] text-white/60">
          Details finden Sie in der Datenschutzerklärung.
        </p>
      </div>
    </div>
  );
}
