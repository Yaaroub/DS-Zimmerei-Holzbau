import Link from "next/link";
import Hero from "@/components/Hero";
import LeistungenSection from "@/components/LeistungenSection";
import ProjekteSection from "@/components/ProjekteSection";
import BeforeAfter from "@/components/BeforeAfter";
import AboutVisual from "@/components/AboutVisual";
import { projects } from "@/lib/siteContent";

export const metadata = {
  title: "Zimmerei, Dach & Holzbau aus Grebin bei Plön",
  description: "DS Zimmerei & Holzbau: Meisterbetrieb für Dachsanierung, Holzbau, Fassaden und Innenausbau in Schleswig-Holstein. Leistungen und echte Projekte entdecken.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const comparison = projects.find((project) => project.slug === "carport-geraeteschuppen");
  return <main>
    <Hero />
    <div className="intro-strip"><div className="page-wrap"><span>01 / Persönlich</span><span>02 / Meistergeführt</span><span>03 / Regional</span><span>04 / Mit Holz gebaut</span></div></div>
    <section className="editorial-intro page-wrap"><div className="editorial-intro-side"><p className="eyebrow">Mehr als ein Gewerk</p><span>HANDWERK<br />MIT HALTUNG.</span></div><div><h2>Gute Arbeit erkennt man nicht nur am Ende.<br /><em>Sondern an jedem Detail.</em></h2><div className="editorial-intro-bottom"><p>Wir sind DS Zimmerei &amp; Holzbau. Als inhabergeführter Meisterbetrieb aus Grebin kümmern wir uns um Bauvorhaben rund um Dach, Holz und Gebäudehülle – von der ersten Einschätzung bis zum letzten Anschluss.</p><Link href="/ueber-uns" className="text-link">Den Betrieb kennenlernen</Link></div></div></section>
    <ProjekteSection />
    <section className="editorial-quote"><div className="page-wrap"><span>“</span><p>Eine gute Lösung ist die, die <em>zum Haus</em> passt. Nicht die, die gerade jeder macht.</p><small>DS ZIMMEREI &amp; HOLZBAU — UNSER ANSPRUCH</small></div></section>
    <LeistungenSection />
    <section className="editorial-comparison"><div className="page-wrap before-after-feature"><div><p className="eyebrow">Vorher / Nachher</p><h2>Veränderung,<br /><em>die man sieht.</em></h2><p>Beim Carport mit Geräteschuppen lässt sich der Ausgangszustand direkt mit dem fertigen Bau vergleichen. Im Werkarchiv finden Sie weitere dokumentierte Umbauten.</p><Link href={`/projekte/${comparison.slug}`} className="text-link">Projekt ansehen</Link></div><BeforeAfter before={comparison.images[comparison.comparison.before]} after={comparison.images[comparison.comparison.after]} title={comparison.title} /></div></section>
    <section className="editorial-portrait page-wrap"><AboutVisual /><div><p className="eyebrow">Über den Betrieb</p><h2>Persönlich.<br /><em>Von Anfang an.</em></h2><p>Ich bin Dennis Steckel, Zimmerermeister und Inhaber von DS Zimmerei &amp; Holzbau. Gemeinsam mit einem kleinen Team realisiere ich Projekte rund um Dach und Holzbau. Der direkte Kontakt bleibt während der gesamten Arbeit erhalten.</p><Link href="/ueber-uns" className="text-link">Mehr über DS erfahren</Link></div></section>
    <section className="editorial-region"><div className="page-wrap editorial-region-grid"><div><p className="eyebrow">Region / Zuhause im Norden</p><h2>Aus Grebin.<br /><em>Für die Region.</em></h2></div><div><p>Unser Betrieb ist in Grebin bei Plön zu Hause. Die Referenzen aus Preetz, Molfsee, Stocksee und Plön zeigen, wo wir bereits gearbeitet haben. Für weitere Orte in Schleswig-Holstein besprechen wir Ihr Vorhaben individuell.</p><div className="region-places"><span>Preetz</span><span>Molfsee</span><span>Stocksee</span><span>Plön</span></div><Link href="/region" className="text-link">Mehr zur Region</Link></div></div></section>
    <section className="final-cta"><div className="page-wrap"><p className="eyebrow">Ein Projekt beginnt mit einem Gespräch</p><h2>Was möchten Sie<br /><em>bauen oder verändern?</em></h2><p>Ob Dach, Fassade oder eine neue Holzkonstruktion: Erzählen Sie uns von Ihrem Vorhaben.</p><Link href="/kontakt" className="button button-light">Projekt besprechen</Link></div></section>
  </main>;
}
