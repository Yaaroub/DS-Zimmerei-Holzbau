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
            Deshalb informieren wir Sie nachfolgend darüber, welche Daten wir
            erheben, wie wir sie verarbeiten und welche Rechte Sie haben – gemäß
            der Datenschutzgrundverordnung (DSGVO).
          </p>

          {/* Inhalt-Blöcke */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">

            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#17E800]" />
                Verantwortliche Stelle
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                DS Zimmerei &amp; Holzbau
                <br />
                Inhaber: Zimmerermeister Dennis Steckel
                <br />
                Musterstraße 12 · 12345 Musterstadt
                <br />
                E-Mail: info@ds-zimmerei.de
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#17E800]" />
                Zugriffsdaten / Server-Logs
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Beim Aufrufen der Website werden automatisch Daten wie
                IP-Adresse, Browsertyp, Uhrzeit des Zugriffs und aufgerufene
                Seiten verarbeitet.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#17E800]" />
                Kontaktformular & E-Mail
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Die von Ihnen eingegebenen Daten werden ausschließlich zur
                Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte
                weitergegeben.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#17E800]" />
                Rechte der Nutzer
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
                Löschung, Einschränkung der Verarbeitung sowie Widerspruch gegen
                die Verarbeitung Ihrer Daten.
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
              Verarbeitung erfolgt zur Bereitstellung der Website, zur
              Kommunikation mit Kunden sowie zur technischen Sicherheit der
              Server.
            </p>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-300">
            <h3 className="font-semibold">Speicherdauer</h3>
            <p className="leading-relaxed">
              Daten werden nur so lange gespeichert, wie es für den jeweiligen
              Zweck erforderlich ist oder gesetzlich vorgeschrieben wird.
            </p>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-300">
            <h3 className="font-semibold">Weitergabe an Dritte</h3>
            <p className="leading-relaxed">
              Es erfolgt keine Weitergabe personenbezogener Daten an Dritte,
              außer gesetzlich vorgeschrieben oder technisch notwendig (z. B.
              Hosting).
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[11px] md:text-xs text-gray-500">
            <p>
              Hinweis: Diese Datenschutz­erklärung gilt für die Domain sowie
              verbundene Social-Media-Profile von DS Zimmerei &amp; Holzbau.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
