// src/lib/cookieConsent.js

export const CONSENT_KEY = "ds_cookie_consent_v1"; // versionieren wenn Text/Kategorien ändern

export const defaultConsent = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  updatedAt: null,
};

// Cookie helpers
export function setCookie(name, value, days = 180) {
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
  // Try cookie first (useful if you later read it server-side)
  const fromCookie = getCookie(CONSENT_KEY);
  if (fromCookie) {
    try {
      const parsed = JSON.parse(fromCookie);
      return { ...defaultConsent, ...parsed, necessary: true };
    } catch (_) {}
  }

  // Fallback to localStorage
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return { ...defaultConsent, ...parsed, necessary: true };
      } catch (_) {}
    }
  }

  return null; // null = noch nicht entschieden -> Banner zeigen
}

export function writeConsent(consent) {
  const payload = {
    ...defaultConsent,
    ...consent,
    necessary: true,
    updatedAt: new Date().toISOString(),
  };

  const json = JSON.stringify(payload);
  window.localStorage.setItem(CONSENT_KEY, json);
  setCookie(CONSENT_KEY, json, 180);

  // optional: event, damit andere Teile reagieren können
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: payload }));

  return payload;
}

export function clearConsent() {
  window.localStorage.removeItem(CONSENT_KEY);
  // Cookie löschen
  document.cookie = `${encodeURIComponent(CONSENT_KEY)}=; Path=/; Max-Age=0; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("cookie-consent-cleared"));
}
