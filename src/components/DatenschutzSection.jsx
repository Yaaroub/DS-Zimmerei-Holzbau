"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Globe,
  FileText,
  Info,
  Users,
  Database,
  Mail,
  Phone,
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

export default function DatenschutzSection() {
  return (
    <section
      id="datenschutz"
      className="relative bg-[#f7f8f9] py-28 md:py-28 border-t border-black/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.45fr,1fr] items-start">
          {/* LEFT */}
          <motion.div {...fade} className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17E800]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-600">
                Datenschutz · DSGVO
              </span>
            </div>

            <p className="text-[#17E800] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold">
              Datenschutz
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              Datenschutzerklärung
              <span className="text-gray-500">
                {" "}
                – DS Zimmerei &amp; Holzbau
              </span>
            </h1>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend
              informieren wir Sie darüber, welche Daten auf dieser Website
              verarbeitet werden, zu welchen Zwecken dies geschieht und welche
              Rechte Sie als betroffene Person nach der DSGVO haben.
            </p>

            {/* Cards */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <Card icon={Users} title="Verantwortliche Stelle">
                <p>
                  <span className="font-semibold text-gray-900">
                    DS Zimmerei &amp; Holzbau
                  </span>
                  <br />
                  Inhaber: Zimmerermeister Dennis Steckel
                  <br />
                  Behler Weg 11, 24329 Grebin, Deutschland
                </p>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#17E800]" />
                    <a
                      href="mailto:kontakt@ds-zimmerei-holzbau.de"
                      className="underline underline-offset-4 hover:text-black"
                    >
                      kontakt@ds-zimmerei-holzbau.de
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#17E800]" />
                    <a
                      href="tel:+491729759134"
                      className="underline underline-offset-4 hover:text-black"
                    >
                      0172&nbsp;9759134
                    </a>
                  </div>
                </div>
              </Card>

              <Card icon={Globe} title="Zugriffsdaten / Server-Logs">
                Beim Aufruf der Website werden technisch notwendige Daten
                verarbeitet (z. B. IP-Adresse, Datum/Uhrzeit, Browser, Betriebssystem).
                Rechtsgrundlage ist{" "}
                <span className="font-medium text-gray-900">
                  Art. 6 Abs. 1 lit. f DSGVO
                </span>{" "}
                (berechtigtes Interesse an Sicherheit und Stabilität).
              </Card>

              <Card icon={Lock} title="Kontaktformular & E-Mail">
                Die von Ihnen übermittelten Daten werden ausschließlich zur
                Bearbeitung Ihrer Anfrage verwendet. Rechtsgrundlage:{" "}
                <span className="font-medium text-gray-900">
                  Art. 6 Abs. 1 lit. b DSGVO
                </span>{" "}
                oder{" "}
                <span className="font-medium text-gray-900">
                  Art. 6 Abs. 1 lit. f DSGVO
                </span>.
              </Card>

              <Card icon={FileText} title="Rechte der betroffenen Personen">
                <ul className="space-y-1">
                  <li>• Auskunft (Art. 15 DSGVO)</li>
                  <li>• Berichtigung (Art. 16 DSGVO)</li>
                  <li>• Löschung (Art. 17 DSGVO)</li>
                  <li>• Einschränkung (Art. 18 DSGVO)</li>
                  <li>• Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>• Widerspruch (Art. 21 DSGVO)</li>
                </ul>
              </Card>

              <Card
                icon={Database}
                title="Cookies & Tracking"
                className="sm:col-span-2"
              >
                Diese Website verwendet keine Tracking- oder Marketing-Cookies.
                Es kommen ausschließlich technisch notwendige Serverdaten zum
                Einsatz. Ein Cookie-Banner ist nicht erforderlich.
              </Card>

              <Card
                icon={FileText}
                title="Google Fonts (lokale Einbindung)"
                className="sm:col-span-2"
              >
                Die verwendeten Schriftarten werden lokal eingebunden. Es erfolgt
                keine Verbindung zu Servern der Google LLC und keine Übertragung
                personenbezogener Daten.
              </Card>
            </div>

            <p className="pt-2 text-[11px] text-gray-500 leading-relaxed max-w-2xl">
              Hinweis: Diese Datenschutzerklärung stellt keine Rechtsberatung dar.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div {...fade} transition={{ delay: 0.08 }} className="md:sticky md:top-28">
            <div className="rounded-2xl border border-black/5 bg-white p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#17E800]/10">
                  <Info className="h-5 w-5 text-[#17E800]" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
                    Rechtliche Grundlage
                  </p>
                  <p className="mt-1 text-lg md:text-xl font-semibold text-gray-900">
                    Art. 6 DSGVO – Datenverarbeitung
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5 text-sm text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#17E800]" />
                    Zwecke der Verarbeitung
                  </h3>
                  <p className="mt-2 leading-relaxed">
                    Technische Bereitstellung der Website, Kommunikation mit
                    Interessenten und Kunden, Bearbeitung von Anfragen sowie
                    Gewährleistung von Stabilität und Sicherheit.
                  </p>
                </div>

                <div className="h-px bg-black/10" />

                <div>
                  <h3 className="font-semibold text-gray-900">Speicherdauer</h3>
                  <p className="mt-2 leading-relaxed">
                    Personenbezogene Daten werden nur so lange gespeichert, wie
                    es für den jeweiligen Zweck erforderlich ist oder gesetzliche
                    Aufbewahrungspflichten bestehen.
                  </p>
                </div>

                <div className="h-px bg-black/10" />

                <div>
                  <h3 className="font-semibold text-gray-900">Empfänger & Hosting</h3>
                  <p className="mt-2 leading-relaxed">
                    Hosting kann durch einen externen Anbieter erfolgen, der
                    personenbezogene Daten ausschließlich im Auftrag und gemäß
                    Art. 28 DSGVO verarbeitet.
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-black/10 bg-[#f2f4f6] p-4 text-[11px] text-gray-500 leading-relaxed">
                  Gültig für diese Domain sowie ggf. verbundene Online-Auftritte
                  von DS Zimmerei &amp; Holzbau.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
