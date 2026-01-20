// src/components/Footer.jsx
"use client";

import Image from "next/image";

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M17.6 6.6h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 9h2V6.6c0-1.3 1-2.6 2.9-2.6H21v3h-1.7c-.5 0-.8.3-.8.8V9H21l-.5 3H18.5V22h-3.3V12H13V9h2.2V7.2c0-2.8 1.6-5.2 5.2-5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 22V12H5.5V9H8V6.8C8 4.3 9.6 2 13 2"
        opacity=".0"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const openCookieSettings = () => {
    window.dispatchEvent(new Event("open-cookie-settings"));
  };

  return (
    <footer className="bg-brand-bg text-brand-text border-t border-brand-border">
      {/* dezente Brand-Linie */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-green/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr,1fr,1fr]">
          {/* Spalte 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-32">
                <Image
                  src="/ds-logo.svg"
                  alt="DS Zimmerei & Holzbau Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-semibold tracking-tight">
                DS ZIMMEREI &amp; HOLZBAU
              </p>
            </div>

            <p className="text-sm text-brand-textMuted max-w-md leading-relaxed">
              DS Zimmerei &amp; Holzbau steht für saubere Ausführung, ehrliche
              Beratung und handwerkliche Qualität rund um Dach, Holzbau und
              Innenausbau.
            </p>

            <p className="text-xs uppercase tracking-[0.18em] text-brand-textMuted">
              Meisterbetrieb · Zimmerei · Dach · Holzbau
            </p>
            {/* ✅ Social Icons (dezent, passend) */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-textMuted">
                Social Media
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <a
                  href="https://www.instagram.com/dennis.steckel?igsh=MXNvNXJsdWhteTgzaQ=="
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram – DS Zimmerei & Holzbau"
                  className="
                    inline-flex items-center gap-2
                    rounded-full border border-brand-border bg-white/70
                    px-3 py-2
                    text-xs text-brand-textMuted
                    hover:text-brand-text hover:border-brand-green/40
                    transition
                  "
                >
                  <IconInstagram className="h-4 w-4" />
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/share/1CAasiKx7k/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook – DS Zimmerei & Holzbau"
                  className="
                    inline-flex items-center gap-2
                    rounded-full border border-brand-border bg-white/70
                    px-3 py-2
                    text-xs text-brand-textMuted
                    hover:text-brand-text hover:border-brand-green/40
                    transition
                  "
                >
                  <IconFacebook className="h-4 w-4" />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Spalte 2: Kontakt */}
          <div className="space-y-3 text-sm">
            <h3 className="text-base font-semibold">Kontakt &amp; Betrieb</h3>

            <div className="space-y-1 text-brand-textMuted">
              <p>DS Zimmerei &amp; Holzbau</p>
              <p>Dennis Steckel</p>
              <p>Behler Weg 11</p>
              <p>24329 Grebin</p>
            </div>

            <div className="space-y-1 text-brand-textMuted mt-3">
              <p>
                Telefon:{" "}
                <a
                  href="tel:+491729759134"
                  className="hover:text-brand-green transition"
                >
                  0172&nbsp;9759134
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:kontakt@ds-zimmerei-holzbau.de"
                  className="hover:text-brand-green transition"
                >
                  kontakt@ds-zimmerei-holzbau.de
                </a>
              </p>
            </div>


            
          </div>

          {/* Spalte 3: Leistungen & Rechtliches */}
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="text-base font-semibold">Leistungen</h3>
              <ul className="mt-2 space-y-1 text-brand-textMuted">
                <li>• Zimmerer - &amp; Dachdeckerarbeiten</li>
                <li>• Gauben, Anbauten, Carports</li>
                <li>• Dachsanierungen &amp; Dämmung</li>
                <li>• Fassaden &amp; Giebelverkleidung</li>
                <li>• Innenausbau, Fenster &amp; Türen</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold">Rechtliches</h3>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-brand-textMuted">
                <a href="/impressum" className="hover:text-brand-green transition">
                  Impressum
                </a>
                <a href="/datenschutz" className="hover:text-brand-green transition">
                  Datenschutz
                </a>

                {/* NEU: Cookie Einstellungen */}
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="hover:text-brand-green transition"
                >
                  Cookie-Einstellungen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-4 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-textMuted">
          <p>© {year} DS Zimmerei &amp; Holzbau – Alle Rechte vorbehalten.</p>

          <p className="text-[11px] text-center md:text-right">
            Gestaltung &amp; Umsetzung: DS Zimmerei &amp; Holzbau Website ·{" "}
            <a
              href="https://hexel-tech.de"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-green transition"
            >
              HEXEL tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
