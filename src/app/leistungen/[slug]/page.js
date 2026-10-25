import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { getService, projects, services, siteUrl } from "@/lib/siteContent";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const description = `${service.intro} Echte Beispiele und Antworten von DS Zimmerei & Holzbau aus Grebin.`;
  return { title: service.title, description, alternates: { canonical: `/leistungen/${slug}` }, openGraph: { title: service.title, description, url: `/leistungen/${slug}`, images: [service.image] } };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = service.projects.map((projectSlug) => projects.find((project) => project.slug === projectSlug)).filter(Boolean);
  const schema = { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.intro, provider: { "@id": `${siteUrl}/#business` }, areaServed: { "@type": "AdministrativeArea", name: "Schleswig-Holstein" }, url: `${siteUrl}/leistungen/${slug}` };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className="detail-hero"><div className="detail-hero-image"><Image src={service.image} alt="" fill priority sizes="100vw" /></div><div className="detail-hero-shade" /><div className="page-wrap detail-hero-inner"><nav className="breadcrumbs" aria-label="Brotkrumen"><Link href="/">Start</Link><span>/</span><Link href="/leistungen">Leistungen</Link><span>/</span><span>{service.title}</span></nav><p className="eyebrow">{service.kicker} / Leistung</p><h1>{service.title}</h1><p>{service.intro}</p><Link href="/kontakt" className="button button-light">Vorhaben besprechen</Link></div></header>
    <section className="section-pad section-cream"><div className="page-wrap detail-layout"><div className="detail-main"><p className="eyebrow">Worum es geht</p><h2>Eine Lösung für<br /><em>Ihr Gebäude.</em></h2><p className="large-copy">{service.suited}</p><div className="divider" /><p className="eyebrow">Leistungsumfang</p><h2>Die Arbeit steckt<br /><em>im Detail.</em></h2><div className="scope-list">{service.scope.map(([title, text], index) => <div key={title} className="scope-item"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div><aside className="detail-aside"><p className="eyebrow">So gehen wir vor</p><ol>{service.process.map((step) => <li key={step}>{step}</li>)}</ol><Link href="/kontakt" className="text-link">Projekt anfragen</Link></aside></div></section>
    <section className="section-pad section-white"><div className="page-wrap"><div className="section-head"><div><p className="eyebrow">Aus der Praxis</p><h2>Passende<br /><em>Arbeiten.</em></h2></div><p>Diese Referenzen zeigen, wie die Leistung an konkreten Gebäuden und Bauteilen umgesetzt wurde.</p></div><div className="project-grid">{related.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></div></section>
    <section className="section-pad section-cream"><div className="page-wrap faq-layout"><div><p className="eyebrow">Häufige Fragen</p><h2>Gut zu wissen,<br /><em>bevor es losgeht.</em></h2></div><div className="faq-list">{service.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="final-cta"><div className="page-wrap"><p className="eyebrow">Nächster Schritt</p><h2>Beschreiben Sie uns<br /><em>Ihr Vorhaben.</em></h2><p>Eine kurze Schilderung und der Standort genügen für den ersten Kontakt. Technische Details klären wir gemeinsam.</p><Link href="/kontakt" className="button button-light">Kontakt aufnehmen</Link></div></section>
  </main>;
}
