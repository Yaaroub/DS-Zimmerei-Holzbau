// src/components/Footer.jsx
"use client";

import Image from "next/image";

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

            <div className="mt-4">
              <a
                href="#kontakt"
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  bg-brand-green
                  px-4 py-2
                  text-xs font-semibold text-black
                  shadow-sm
                  hover:brightness-110
                  transition
                "
              >
                Angebot anfordern
              </a>
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
