"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Globe, FileText, Info } from "lucide-react";

export default function DatenschutzSection() {
  return (
    <section
      id="datenschutz"
      className="bg-[#050505] text-white py-20 md:py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.4fr,1fr] items-start">
        {/* Linke Seite */}
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
            Datenschutz · DSGVO
          </div>

          <p className="text-[#17E800] uppercase tracking-[0.25em] text-sm font-semibold">
            Datenschutz
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Datenschutz­erklärung für DS Zimmerei &amp; Holzbau
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Der Schutz Ihrer persönlichen Daten ist uns besonders wichtig.
            Nachfolgend informieren wir Sie darüber, welche Daten auf dieser
            Website verarbeitet werden, zu welchen Zwecken dies geschieht und
            welche Rechte Sie als betroffene Person haben – gemäß der
            Datenschutz-Grundverordnung (DSGVO).
          </p>

          {/* Inhalt-Blöcke */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {/* Verantwortliche Stelle */}
            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#17E800]" />
                Verantwortliche Stelle
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                <br />
                <br />
                <span className="font-semibold">DS Zimmerei &amp; Holzbau</span>
                <br />
                Inhaber: Zimmerermeister Dennis Steckel
                <br />
                Behler Weg 11
                <br />
                24329 Grebin
                <br />
                Deutschland
                <br />
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:info@ds-zimmerei.de"
                  className="hover:text-[#17E800] underline underline-offset-2"
                >
                  info@ds-zimmerei.de
                </a>
                <br />
                Telefon:{" "}
                <a
                  href="tel:+491729759134"
                  className="hover:text-[#17E800] underline underline-offset-2"
                >
                  0172&nbsp;9759134
                </a>
              </p>
            </div>

            {/* Server-Logs */}
            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#17E800]" />
                Zugriffsdaten / Server-Logs
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Beim Aufruf dieser Website werden automatisch Informationen
                durch den Browser an unseren Server übermittelt und in
                sogenannten Server-Logfiles gespeichert. Dazu gehören u.&nbsp;a.:
                IP-Adresse (gekürzt oder pseudonymisiert), Datum und Uhrzeit des
                Zugriffs, aufgerufene Seite, übertragene Datenmenge, Browsertyp
                und Betriebssystem. Die Verarbeitung erfolgt auf Grundlage von
                Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten
                Interesses an der technischen Stabilität, Sicherheit und
                Optimierung der Website. Die Logfiles werden regelmäßig
                gelöscht, sofern sie nicht zur Aufklärung konkreter
                Sicherheitsvorfälle benötigt werden.
              </p>
            </div>

            {/* Kontaktformular */}
            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#17E800]" />
                Kontaktformular &amp; E-Mail
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Wenn Sie uns über das Kontaktformular oder per E-Mail
                kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten
                (z.&nbsp;B. Name, E-Mail-Adresse, Telefonnummer, Angaben zum
                Projekt) ausschließlich zur Bearbeitung und Beantwortung Ihrer
                Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
                (vorvertragliche Maßnahmen bzw. Vertragserfüllung) oder
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
                Kundenkommunikation). Eine Weitergabe an Dritte erfolgt nicht,
                es sei denn, wir sind gesetzlich dazu verpflichtet. Anfragen
                werden gelöscht, sobald sie abschließend bearbeitet sind und
                keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </div>

            {/* Rechte der Nutzer */}
            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#17E800]" />
                Rechte der betroffenen Personen
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Ihnen stehen im Rahmen der DSGVO folgende Rechte zu:
                <br />
                • Recht auf Auskunft über die zu Ihrer Person gespeicherten
                Daten (Art. 15 DSGVO)
                <br />
                • Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)
                <br />
                • Recht auf Löschung (Art. 17 DSGVO)
                <br />
                • Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
                <br />
                • Recht auf Datenübertragbarkeit (Art. 20 DSGVO)
                <br />
                • Recht auf Widerspruch gegen bestimmte Verarbeitungen
                (Art. 21 DSGVO)
                <br />
                Außerdem haben Sie das Recht, sich bei einer zuständigen
                Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht
                sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen
                Datenschutzrecht verstößt.
              </p>
            </div>

            {/* Cookies */}
            <div className="space-y-2 sm:col-span-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Info className="h-4 w-4 text-[#17E800]" />
                Cookies
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Unsere Website verwendet keine Cookies, die einer Einwilligung
                nach Art. 6 Abs. 1 lit. a DSGVO bedürfen. Es kommen weder
                Tracking-, Analyse- noch Marketing-Cookies zum Einsatz. Ein
                Cookie-Banner ist daher nicht erforderlich. Es werden
                ausschließlich technisch notwendige Serverdaten verarbeitet, die
                automatisch beim Aufruf der Website entstehen (z.&nbsp;B.
                Logfiles zur technischen Stabilität und Sicherheit).
              </p>
            </div>

            {/* Google Fonts lokal */}
            <div className="space-y-2 sm:col-span-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#17E800]" />
                Google Fonts (lokale Einbindung)
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Auf dieser Website werden Schriftarten („Google Fonts“) von
                Google verwendet. Die Einbindung erfolgt ausschließlich lokal
                über den Server dieser Website. Es findet kein Nachladen der
                Schriftarten von Servern der Google LLC statt. Dadurch werden
                keine personenbezogenen Daten an Google übertragen und es
                werden auch keine Cookies von Google Fonts gesetzt.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rechte Box – DSGVO Details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-7 shadow-[0_0_24px_rgba(0,0,0,0.6)] space-y-5"
        >
          <div className="border-l-4 border-[#17E800] pl-4">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Rechtliche Grundlage
            </p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              Art. 6 DSGVO – Datenverarbeitung
            </p>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-300">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4 text-[#17E800]" />
              Zwecke der Verarbeitung
            </h3>
            <p className="leading-relaxed">
              Die Verarbeitung personenbezogener Daten auf dieser Website
              erfolgt insbesondere zur Bereitstellung und technischen
              Auslieferung der Inhalte, zur Kommunikation mit Interessenten und
              Kunden, zur Bearbeitung von Anfragen sowie zur Gewährleistung von
              Stabilität und Sicherheit der Systeme.
            </p>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-300">
            <h3 className="font-semibold">Speicherdauer</h3>
            <p className="leading-relaxed">
              Personenbezogene Daten werden nur so lange gespeichert, wie es
              für die jeweiligen Zwecke erforderlich ist oder wir gesetzlich
              dazu verpflichtet sind. Server-Logfiles werden in der Regel
              kurzfristig gelöscht, es sei denn, sie werden zur Aufklärung
              konkreter Sicherheitsvorfälle benötigt. Kommunikationsdaten aus
              Anfragen werden gelöscht, sobald die Angelegenheit abgeschlossen
              ist und keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-300">
            <h3 className="font-semibold">Empfänger &amp; Hosting</h3>
            <p className="leading-relaxed">
              Für das Hosting und die technische Bereitstellung der Website
              kann ein externer Dienstleister (Hosting-Provider) eingesetzt
              werden. Dieser verarbeitet personenbezogene Daten ausschließlich
              in unserem Auftrag und auf Grundlage eines
              Auftragsverarbeitungsvertrags gemäß Art. 28 DSGVO. Eine
              darüber hinausgehende Weitergabe von Daten an Dritte findet nur
              statt, wenn dies gesetzlich vorgeschrieben ist oder Sie
              ausdrücklich eingewilligt haben.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[11px] md:text-xs text-gray-500">
            <p>
              Hinweis: Diese Datenschutz­erklärung gilt für die Domain sowie
              ggf. verbundene Online-Auftritte von DS Zimmerei &amp; Holzbau.
              Diese Information stellt keine Rechtsberatung dar, sondern eine
              sorgfältig erstellte allgemeine Information nach aktuellem Stand.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
