"use client";

import { motion } from "framer-motion";
import { FileText, Phone, Mail, MapPin, Gavel } from "lucide-react";

export default function ImpressumSection() {
  return (
    <section
      id="impressum"
      className="bg-[#050505] text-white py-20 md:py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.4fr,1fr] items-start">
        {/* Linke Seite – Textbereich */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#17E800]/50 bg-[#0A0A0A] px-3 py-1 text-[11px] font-medium text-[#8BFF7A] uppercase tracking-[0.22em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#17E800]" />
            Rechtliche Angaben · Impressum
          </div>

          <p className="text-[#17E800] uppercase tracking-[0.25em] text-sm font-semibold">
            Impressum
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            DS Zimmerei &amp; Holzbau – Angaben gemäß § 5 TMG.
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Nachfolgend finden Sie alle gesetzlich vorgeschriebenen
            Informationen zu unserem Betrieb, der verantwortlichen Person sowie
            Kontaktmöglichkeiten. Bei Fragen sprechen Sie uns jederzeit direkt
            an – wir legen Wert auf transparente und faire Kommunikation.
          </p>

          {/* Blöcke – Firma, Inhaber, Adresse */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#17E800]" />
                Firmenangaben
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold">DS Zimmerei &amp; Holzbau</span>
                <br />
                Inhaber: Zimmerermeister Dennis Steckel
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#17E800]" />
                Anschrift
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Musterstraße 12
                <br />
                12345 Musterstadt
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#17E800]" />
                Kontakt
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Telefon: 01234 / 567 890
                <br />
                E-Mail: info@ds-zimmerei.de
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Gavel className="h-4 w-4 text-[#17E800]" />
                Handwerksbetrieb
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Eingetragen in die Handwerksrolle der zuständigen
                Handwerkskammer.
                <br />
                Berufsbezeichnung: Zimmerermeister (verliehen in Deutschland)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rechte Box – rechtliche Hinweise */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-7 shadow-[0_0_24px_rgba(0,0,0,0.6)] space-y-5"
        >
          <div className="border-l-4 border-[#17E800] pl-4">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Verantwortlich nach § 55 Abs. 2 RStV
            </p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              Zimmerermeister Dennis Steckel
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Anschrift wie oben.
            </p>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-300">
            <h3 className="font-semibold">Haftung für Inhalte</h3>
            <p className="leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen
              zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-300">
            <h3 className="font-semibold">Haftung für Links</h3>
            <p className="leading-relaxed">
              Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-300">
            <h3 className="font-semibold">Urheberrecht</h3>
            <p className="leading-relaxed">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht.
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[11px] md:text-xs text-gray-500">
            <p>
              Hinweis: Dieses Impressum gilt für die Domain sowie eventuell
              verbundene Social-Media-Profile von DS Zimmerei &amp; Holzbau.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
