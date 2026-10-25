import LeistungenSection from "@/components/LeistungenSection";
import { services } from "@/lib/siteContent";

export const metadata = {
  title: "Leistungen: Dach, Holzbau, Fassade & Innenausbau",
  description: "Neun Leistungen von DS Zimmerei & Holzbau im Detail: Dachsanierung, energetische Sanierung, Dachstühle, Holzrahmenbau, Fassaden, Carports und mehr.",
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return <main><header className="page-intro"><div className="page-wrap"><p className="eyebrow">Leistungen / Überblick</p><h1>Handwerk, das<br /><em>zusammenpasst.</em></h1><p>Ein gutes Ergebnis entsteht, wenn Konstruktion, Material und Anschlussdetails zum Gebäude und zu Ihrer Nutzung passen. Entdecken Sie unsere Arbeitsbereiche und echte Beispiele dazu.</p><span className="page-intro-count">{String(services.length).padStart(2, "0")} Leistungsbereiche</span></div></header><LeistungenSection full /></main>;
}
