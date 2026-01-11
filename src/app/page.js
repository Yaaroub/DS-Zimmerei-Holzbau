import Hero from "@/components/Hero";
import LeistungenSection from "@/components/LeistungenSection";
import UeberUnsSection from "@/components/UeberUnsSection";
import ProjekteSection from "@/components/ProjekteSection";
import KontaktSection from "@/components/KontaktSection";
import Footer from "@/components/Footer";
import WarumWirSection from "@/components/WarumWirSection";
export default function HomePage() {
  return (
    <main className=" text-white min-h-screen">
      <Hero />
      <LeistungenSection />
      <WarumWirSection />
      <UeberUnsSection />
      <ProjekteSection />
      <KontaktSection />
      
    </main>
  );
}
