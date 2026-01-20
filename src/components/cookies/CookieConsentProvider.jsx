"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  defaultConsent,
  readConsent,
  writeConsent,
  acceptNecessaryOnly,
  acceptAll,
} from "@/lib/cookieConsent";

const ConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
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
    const effective = consent ?? defaultConsent;

    return {
      ready,
      consent,
      hasDecision: consent !== null,
      effective,

      acceptNecessary: () => setConsent(acceptNecessaryOnly()),
      acceptAll: () => setConsent(acceptAll()),

      setExternal: (value) => setConsent(writeConsent({ external: !!value })),
      clear: () => {
        // optional falls du es brauchst, sonst weglassen
        // clearConsent()
      },
    };
  }, [consent, ready]);

  return <ConsentContext.Provider value={api}>{children}</ConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  return ctx;
}
