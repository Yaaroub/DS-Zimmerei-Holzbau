import Hero from "@/components/Hero";
import LeistungenSection from "@/components/LeistungenSection";
import UeberUnsSection from "@/components/UeberUnsSection";
import ProjekteSection from "@/components/ProjekteSection";
import KontaktSection from "@/components/KontaktSection";
import WarumWirSection from "@/components/WarumWirSection";

export const metadata = {
  title: "Zimmerei & Dacharbeiten in Schleswig-Holstein",
  description:
    "Ihr Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein.",
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
