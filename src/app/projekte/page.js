import ProjekteSection from "@/components/ProjekteSection";
import { projects } from "@/lib/siteContent";

export const metadata = {
  title: "Werkarchiv: echte Dach- und Holzbauprojekte",
  description: "Acht dokumentierte Projekte von DS Zimmerei & Holzbau: Dachsanierungen, Fassaden, Außentreppe, Carport, Holzbau und Umbau. Mit Fotos und Vorher-Nachher-Vergleichen.",
  alternates: { canonical: "/projekte" },
};

export default function ProjektePage() {
  return <main><header className="page-intro"><div className="page-wrap"><p className="eyebrow">Werkarchiv / Projekte</p><h1>Jedes Projekt<br /><em>erzählt mehr.</em></h1><p>Hier sehen Sie reale Arbeiten aus dem Betrieb: vom Dach in Preetz und Molfsee über Fassaden bis zu Holzbauten im Außenbereich. Die Fotos dokumentieren Aufgaben, Details und fertige Ergebnisse.</p><span className="page-intro-count">{String(projects.length).padStart(2, "0")} dokumentierte Arbeiten</span></div></header><ProjekteSection full /></main>;
}
