// src/components/Footer.jsx
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 border-t border-white/10 ">
      {/* Brand-Linie */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#17E800] via-[#bbff5a] to-[#17E800]" />

      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr,1fr,1fr]">
          {/* Spalte 1: Brand / Claim */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-32">
                <Image
                  src="/ds-logo.png"
                  alt="DS Zimmerei & Holzbau Logo"
                  fill
                  className="object-contain"
                  />
              </div>
                  <p className="text-[#8BFF7A] font-semibold" >DS ZIMMEREI & HOLZBAU</p>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              DS Zimmerei &amp; Holzbau steht für saubere Ausführung, ehrliche
              Beratung und handwerkliche Qualität rund um Dach, Holzbau und
              Innenausbau.
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-[#8BFF7A]">
              Meisterbetrieb · Zimmerei · Dach · Holzbau
            </p>
          </div>

          {/* Spalte 2: Kontakt */}
          <div className="space-y-3 text-sm">
            <h3 className="text-base font-semibold text-white">
              Kontakt &amp; Betrieb
            </h3>
            <div className="space-y-1 text-gray-400">
              <p>DS Zimmerei &amp; Holzbau</p>
              <p>Dennis Steckel</p>
              {/* Adresse kannst du später exakt ergänzen */}
              <p>PLZ / Ort</p>
            </div>

            <div className="space-y-1 text-gray-400 mt-3">
              <p>
                Telefon:{" "}
                <a
                  href="tel:+49..."
                  className="hover:text-[#17E800] transition"
                >
                  +49 …
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:info@ds-zimmerei.de"
                  className="hover:text-[#17E800] transition"
                >
                  info@ds-zimmerei.de
                </a>
              </p>
            </div>

            <div className="mt-4">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-full bg-[#17E800] px-4 py-1.5 text-xs font-semibold text-black shadow-[0_0_14px_rgba(23,232,0,0.6)] hover:bg-white transition"
              >
                Angebot anfordern
              </a>
            </div>
          </div>

          {/* Spalte 3: Leistungen & Links */}
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="text-base font-semibold text-white">
                Leistungen
              </h3>
              <ul className="mt-2 space-y-1 text-gray-400">
                <li>• Zimmerei &amp; Dachdeckerarbeiten</li>
                <li>• Gauben, Anbauten, Carports</li>
                <li>• Dachsanierungen &amp; Dämmung</li>
                <li>• Fassaden &amp; Giebelverkleidung</li>
                <li>• Innenausbau, Fenster &amp; Türen</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">
                Rechtliches
              </h3>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-400">
                <a href="/impressum" className="hover:text-[#17E800]">
                  Impressum
                </a>
                <a href="/datenschutz" className="hover:text-[#17E800]">
                  Datenschutz
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {year} DS Zimmerei &amp; Holzbau – Alle Rechte vorbehalten.</p>
          <p className="text-[11px]">
            Gestaltung &amp; Umsetzung: DS Zimmerei Website · Hexel / Yaaroub
          </p>
        </div>
      </div>
    </footer>
  );
}
