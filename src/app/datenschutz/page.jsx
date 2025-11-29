// src/app/datenschutz/page.jsx
import DatenschutzSection from "@/components/DatenschutzSection";

export const metadata = {
  title: "Datenschutz – DS Zimmerei & Holzbau",
  description:
    "Datenschutz­erklärung von DS Zimmerei & Holzbau gemäß DSGVO. Informationen zur Verarbeitung personenbezogener Daten.",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <DatenschutzSection />
    </main>
  );
}
