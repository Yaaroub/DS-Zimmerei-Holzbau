import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeforeAfter from "@/components/BeforeAfter";
import DetailAtlas from "@/components/DetailAtlas";
import ProjectCard from "@/components/ProjectCard";
import { getProject, projects, services, siteUrl } from "@/lib/siteContent";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = `${project.lead} Fotodokumentation von DS Zimmerei & Holzbau${project.location ? ` in ${project.location}` : ""}.`;
  return { title: project.title, description, alternates: { canonical: `/projekte/${slug}` }, openGraph: { title: project.title, description, url: `/projekte/${slug}`, images: [project.images[project.coverIndex || 0].src] } };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const cover = project.images[project.coverIndex || 0];
  const relatedServices = project.services.map((serviceSlug) => services.find((service) => service.slug === serviceSlug)).filter(Boolean);
  const otherProjects = projects.filter((item) => item.slug !== slug).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.lead, url: `${siteUrl}/projekte/${slug}`, image: project.images.map((image) => `${siteUrl}${image.src}`), creator: { "@id": `${siteUrl}/#business` }, ...(project.location ? { contentLocation: { "@type": "Place", name: project.location } } : {}) };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className="detail-hero project-hero"><div className="detail-hero-image"><Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" /></div><div className="detail-hero-shade" /><div className="page-wrap detail-hero-inner"><nav className="breadcrumbs" aria-label="Brotkrumen"><Link href="/">Start</Link><span>/</span><Link href="/projekte">Projekte</Link><span>/</span><span>{project.title}</span></nav><p className="eyebrow">{project.category} {project.location ? `· ${project.location}` : ""}</p><h1>{project.title}</h1><p>{project.lead}</p><a href="#projektbericht" className="button button-light">Projekt entdecken ↓</a></div></header>
    <section id="projektbericht" className="section-pad section-cream"><div className="page-wrap project-story"><div><p className="eyebrow">Die Aufgabe</p><h2>Was war<br /><em>zu tun?</em></h2><p>{project.task}</p></div><div><p className="eyebrow">Die Ausführung</p><h2>Was wurde<br /><em>gemacht?</em></h2><p>{project.work}</p></div><div><p className="eyebrow">Das Ergebnis</p><h2>Was bleibt?</h2><p>{project.result}</p></div></div></section>
    {project.comparison && <section className="section-pad section-dark"><div className="page-wrap"><div className="section-head"><div><p className="eyebrow">Direkter Vergleich</p><h2>Vorher.<br /><em>Nachher.</em></h2></div><p>Schieben Sie den Regler über die Bilder, um den Ausgangszustand und das Ergebnis zu sehen.</p></div><BeforeAfter before={project.images[project.comparison.before]} after={project.images[project.comparison.after]} title={project.title} /></div></section>}
    {project.detail && <div className="section-pad section-white"><div className="page-wrap"><DetailAtlas image={cover} details={project.detail} title={project.location || project.title} /></div></div>}
    <section className="section-pad section-cream"><div className="page-wrap"><div className="section-head"><div><p className="eyebrow">Fotodokumentation</p><h2>Ein Projekt,<br /><em>mehrere Blickwinkel.</em></h2></div><p>Originalfotos aus dem Projektarchiv. Sie zeigen den Bauzustand, das fertige Ergebnis und ausgewählte Details.</p></div><div className="gallery-grid">{project.images.map((image, index) => <figure key={`${image.src}-${index}`} className={index === 0 ? "gallery-item gallery-wide" : "gallery-item"}><div><Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width: 900px) 100vw, 80vw" : "(max-width: 900px) 100vw, 50vw"} /></div><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{image.caption}</figcaption></figure>)}</div></div></section>
    <section className="section-pad section-white"><div className="page-wrap project-service-links"><div><p className="eyebrow">Dazu passen</p><h2>Leistungen<br /><em>hinter dem Projekt.</em></h2></div><div>{relatedServices.map((service) => <Link key={service.slug} href={`/leistungen/${service.slug}`}><span>{service.title}</span></Link>)}</div></div></section>
    <section className="section-pad section-cream"><div className="page-wrap"><div className="section-head"><div><p className="eyebrow">Weitersehen</p><h2>Weitere<br /><em>Arbeiten.</em></h2></div><Link href="/projekte" className="text-link">Alle Projekte</Link></div><div className="project-grid">{otherProjects.map((item, index) => <ProjectCard key={item.slug} project={item} index={index} />)}</div></div></section>
    <section className="final-cta"><div className="page-wrap"><p className="eyebrow">Ihr eigenes Vorhaben</p><h2>Was können wir<br /><em>für Sie bauen?</em></h2><Link href="/kontakt" className="button button-light">Projekt anfragen</Link></div></section>
  </main>;
}
