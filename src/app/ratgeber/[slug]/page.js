import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";
import { getProject, getService } from "@/lib/siteContent";

export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const guide = getGuide(slug); if (!guide) return {}; return { title: guide.title, description: guide.lead, alternates: { canonical: `/ratgeber/${slug}` } }; }

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const service = getService(guide.service);
  const project = getProject(guide.project);
  return <main><header className="page-intro"><div className="page-wrap"><nav className="breadcrumbs" aria-label="Brotkrumen"><Link href="/">Start</Link><span>/</span><Link href="/ratgeber">Wissen</Link></nav><p className="eyebrow">Wissen / Planung</p><h1>{guide.title}</h1><p>{guide.lead}</p></div></header><article className="section-pad section-cream"><div className="page-wrap guide-article"><aside><p className="eyebrow">Im Überblick</p><ol>{guide.sections.map((section) => <li key={section.title}>{section.title}</li>)}</ol></aside><div>{guide.sections.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2><p>{section.text}</p></section>)}<div className="guide-related"><p className="eyebrow">Zum Thema</p><Link href={`/leistungen/${service.slug}`}>Leistung: {service.title}</Link><Link href={`/projekte/${project.slug}`}>Projekt: {project.title}</Link></div></div></div></article><section className="final-cta"><div className="page-wrap"><p className="eyebrow">Ihr Vorhaben</p><h2>Jetzt konkret<br /><em>werden.</em></h2><p>Beschreiben Sie uns Ihr Gebäude und Ihr Ziel. Wir besprechen die nächsten Schritte.</p><Link href="/kontakt" className="button button-light">Projekt besprechen</Link></div></section></main>;
}
