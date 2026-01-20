// src/lib/cookieConsent.js

export const CONSENT_KEY = "ds_cookie_consent_v2"; // v2 wegen neuem Schema
export const CONSENT_DAYS = 180;

export const defaultConsent = {
  necessary: true,
  external: false, // NEW: Google Maps / externe Inhalte
  updatedAt: null,
};

// Cookie helpers
export function setCookie(name, value, days = CONSENT_DAYS) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function getCookie(name) {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function readConsent() {
  const fromCookie = getCookie(CONSENT_KEY);
  if (fromCookie) {
    try {
      const parsed = JSON.parse(fromCookie);
      return { ...defaultConsent, ...parsed, necessary: true };
    } catch (_) {}
  }

  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return { ...defaultConsent, ...parsed, necessary: true };
      } catch (_) {}
    }
  }

  return null; // noch nicht entschieden
}

export function writeConsent(next) {
  const payload = {
    ...defaultConsent,
    ...next,
    necessary: true,
    updatedAt: new Date().toISOString(),
  };

  const json = JSON.stringify(payload);
  window.localStorage.setItem(CONSENT_KEY, json);
  setCookie(CONSENT_KEY, json, CONSENT_DAYS);

  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: payload })
  );

  return payload;
}

export function acceptNecessaryOnly() {
  return writeConsent({ external: false });
}

export function acceptAll() {
  return writeConsent({ external: true });
}

export function clearConsent() {
  window.localStorage.removeItem(CONSENT_KEY);
  document.cookie = `${encodeURIComponent(CONSENT_KEY)}=; Path=/; Max-Age=0; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("cookie-consent-cleared"));
}
