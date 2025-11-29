// src/app/impressum/page.jsx
import ImpressumSection from "@/components/ImpressumSection";

export const metadata = {
  title: "Impressum – DS Zimmerei & Holzbau",
  description:
    "Impressum von DS Zimmerei & Holzbau – rechtliche Pflichtangaben gemäß § 5 TMG und § 55 RStV.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <ImpressumSection />
    </main>
  );
}
