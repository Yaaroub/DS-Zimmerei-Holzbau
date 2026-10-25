import Link from "next/link";
import { services } from "@/lib/siteContent";

export default function LeistungenSection({ full = false }) {
  const visible = full ? services : [services[0], services[4], services[3], services[5]];
  const teasers = ["Der Bestand bleibt. Das Dach wird neu gedacht.", "Eine Hülle mit Haltung.", "Raum schaffen. Natürlich mit Holz.", "Durchdachter Platz für den Alltag."];
  return <section id="leistungen" className="editorial-services"><div className="page-wrap">
    <div className="section-head"><div><p className="eyebrow">Leistungen / unsere Arbeitsbereiche</p><h2>Was wir können.<br /><em>Und warum es zählt.</em></h2></div><div><p>Vom Dach über die Fassade bis zur maßgefertigten Holzkonstruktion: Entscheidend ist das Zusammenspiel der Details.</p></div></div>
    <div className="editorial-services-list">{visible.map((service, index) => <Link key={service.slug} href={`/leistungen/${service.slug}`} className="editorial-service-row"><span className="editorial-service-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{service.title}</strong><small>{full ? service.intro : teasers[index]}</small></span><span className="editorial-service-more">Leistung ansehen</span></Link>)}</div>
    {!full && <Link href="/leistungen" className="text-link">Alle neun Leistungen im Detail</Link>}
  </div></section>;
}
