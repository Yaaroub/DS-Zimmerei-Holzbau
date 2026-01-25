import Hero from "@/components/Hero";
import LeistungenSection from "@/components/LeistungenSection";
import UeberUnsSection from "@/components/UeberUnsSection";
import ProjekteSection from "@/components/ProjekteSection";
import KontaktSection from "@/components/KontaktSection";
import WarumWirSection from "@/components/WarumWirSection";

export const metadata = {
  title: "Zimmerei & Dacharbeiten in Schleswig-Holstein | DS Zimmerei & Holzbau",
  description:
    "DS Zimmerei & Holzbau – Ihr Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein. Tätig in Kiel, Lübeck, Plön, Rendsburg & Umgebung.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen text-white">
      <Hero />
      <LeistungenSection />
      <UeberUnsSection />
      <WarumWirSection />
      <ProjekteSection />
      <KontaktSection />
    </main>
  );
}
