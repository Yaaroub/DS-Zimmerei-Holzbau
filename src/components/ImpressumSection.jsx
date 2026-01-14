"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Phone,
  Mail,
  MapPin,
  Gavel,
  Info,
  Shield,
} from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: "easeOut" },
};

function Card({ icon: Icon, title, children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-black/5 bg-white p-5 md:p-6",
        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        className,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#17E800]/10">
          <Icon className="h-4 w-4 text-[#17E800]" />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm md:text-base font-semibold text-gray-900">
            {title}
          </h2>
          <div className="mt-2 text-xs md:text-sm leading-relaxed text-gray-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImpressumSection() {
  return (
    <section
      id="impressum"
      className="relative bg-[#f7f8f9] py-28 md:py-28 border-t border-black/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.45fr,1fr] items-start">
          {/* LEFT */}
          <motion.div {...fade} className="space-y-6">
            {/* badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17E800]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-600">
                Rechtliche Angaben · Impressum
              </span>
            </div>

            <p className="text-[#17E800] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold">
              Impressum
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              Angaben gemäß § 5 TMG
              <span className="text-gray-500">
                {" "}
                – DS Zimmerei &amp; Holzbau
              </span>
            </h1>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
              Nachfolgend finden Sie die gesetzlich vorgeschriebenen
              Informationen zu unserem Betrieb, der verantwortlichen Person
              sowie Kontaktmöglichkeiten. Bei Fragen sprechen Sie uns jederzeit
              direkt an.
            </p>

            {/* cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <Card icon={FileText} title="Firmenangaben">
                <span className="font-semibold text-gray-900">
                  DS Zimmerei &amp; Holzbau
                </span>
                <br />
                Inhaber: Zimmerermeister Dennis Steckel
              </Card>

              <Card icon={MapPin} title="Anschrift">
                Behler Weg 11
                <br />
                24329 Grebin
                <br />
                Deutschland
              </Card>

              <Card icon={Phone} title="Kontakt">
                Telefon:&nbsp;
                <a
                  href="tel:+491729759134"
                  className="underline underline-offset-4 hover:text-black"
                >
                  0172&nbsp;9759134
                </a>
                <br />
                E-Mail:&nbsp;
                <a
                  href="mailto:kontakt@ds-zimmerei-holzbau.de"
                  className="underline underline-offset-4 hover:text-black"
                >
                  kontakt@ds-zimmerei-holzbau.de
                </a>
              </Card>

              <Card icon={Gavel} title="Handwerksbetrieb">
                Eingetragen in die Handwerksrolle der zuständigen
                Handwerkskammer.
                <br />
                Berufsbezeichnung: Zimmerermeister (verliehen in Deutschland)
              </Card>

              <Card icon={Info} title="Umsatzsteuer">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
                <br />
                <span className="font-semibold text-gray-900">DE366221415</span>
              </Card>
            </div>

            <p className="pt-2 text-[11px] text-gray-500 leading-relaxed max-w-2xl">
              Hinweis: Dieses Impressum gilt für diese Website sowie ggf.
              verbundene Online-Auftritte von DS Zimmerei &amp; Holzbau.
            </p>
          </motion.div>

          {/* RIGHT / sticky legal box */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.08 }}
            className="md:sticky md:top-28"
          >
            <div className="rounded-2xl border border-black/5 bg-white p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#17E800]/10">
                  <Shield className="h-5 w-5 text-[#17E800]" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
                    Verantwortlich i. S. d. § 55 Abs. 2 RStV / MStV
                  </p>
                  <p className="mt-1 text-lg md:text-xl font-semibold text-gray-900">
                    Zimmerermeister Dennis Steckel
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Anschrift wie oben.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5 text-sm text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Haftung für Inhalte
                  </h3>
                  <p className="mt-2 leading-relaxed">
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                    Inhalte nach den allgemeinen Gesetzen verantwortlich. Nach
                    §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet,
                    übermittelte oder gespeicherte fremde Informationen zu
                    überwachen oder nach Umständen zu forschen, die auf eine
                    rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div className="h-px bg-black/10" />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Haftung für Links
                  </h3>
                  <p className="mt-2 leading-relaxed">
                    Unser Angebot enthält ggf. Links zu externen Websites
                    Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Deshalb können wir für diese fremden Inhalte keine Gewähr
                    übernehmen. Für die Inhalte der verlinkten Seiten ist stets
                    der jeweilige Anbieter oder Betreiber verantwortlich.
                  </p>
                </div>

                <div className="h-px bg-black/10" />

                <div>
                  <h3 className="font-semibold text-gray-900">Urheberrecht</h3>
                  <p className="mt-2 leading-relaxed">
                    Die durch den Seitenbetreiber erstellten Inhalte und Werke
                    unterliegen dem deutschen Urheberrecht. Vervielfältigung,
                    Bearbeitung, Verbreitung und jede Art der Verwertung
                    außerhalb der Grenzen des Urheberrechtes bedürfen der
                    schriftlichen Zustimmung des jeweiligen Autors bzw.
                    Erstellers.
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-black/10 bg-[#f2f4f6] p-4 text-[11px] text-gray-500 leading-relaxed">
                  Tipp: Wenn du Medien/Logos/Fotos von Dritten nutzt, nenne ggf.
                  die Quellen/ Rechteinhaber hier oder auf einer separaten
                  Seite.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
