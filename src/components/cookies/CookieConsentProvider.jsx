"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultConsent, readConsent, writeConsent } from "@/lib/cookieConsent";

const ConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(null); // null = unentschieden
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    setConsent(existing); // null wenn noch nichts
    setReady(true);

    const onChanged = (e) => setConsent(e.detail);
    const onCleared = () => setConsent(null);

    window.addEventListener("cookie-consent-changed", onChanged);
    window.addEventListener("cookie-consent-cleared", onCleared);

    return () => {
      window.removeEventListener("cookie-consent-changed", onChanged);
      window.removeEventListener("cookie-consent-cleared", onCleared);
    };
  }, []);

  const api = useMemo(() => {
    return {
      ready,
      consent,
      hasDecision: consent !== null,
      effective: consent ?? defaultConsent,
      acceptAll: () => setConsent(writeConsent({ functional: true, analytics: true, marketing: true })),
      acceptNecessary: () => setConsent(writeConsent({ functional: false, analytics: false, marketing: false })),
      save: (next) => setConsent(writeConsent(next)),
    };
  }, [consent, ready]);

  return <ConsentContext.Provider value={api}>{children}</ConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  return ctx;
}
