import Link from "next/link";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/siteContent";

export default function ProjekteSection({ full = false }) {
  if (full) return <section id="projekte" className="section-pad section-cream"><div className="page-wrap"><div className="section-head"><div><p className="eyebrow">Werkarchiv / alle Arbeiten</p><h2>Gebaut. Fotografiert.<br /><em>Nachvollziehbar.</em></h2></div><p>Acht reale Arbeiten mit Fotos, Ausführungsdetails und mehreren Vorher-Nachher-Vergleichen.</p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></div></section>;
  const selected = [projects[1], projects[4], projects[3]];
  const titles = ["Ein Dach. Viele durchdachte Details.", "Ein neuer Weg nach draußen.", "Holz gibt einer Fassade Charakter."];
  return <section id="projekte" className="editorial-portfolio"><div className="page-wrap">
    <div className="section-head"><div><p className="eyebrow">Das Werkarchiv / ausgewählte Referenzen</p><h2>Nicht nur zeigen.<br /><em>Einblicke geben.</em></h2></div><div><p>Jede Baustelle ist anders. Unsere Arbeiten erzählen, was durch Erfahrung, Planung und präzise Umsetzung möglich wird.</p></div><Link href="/projekte" className="text-link">Alle acht Projekte</Link></div>
    <div className="editorial-portfolio-grid"><EditorialProject project={selected[0]} title={titles[0]} index={0} large /><div>{selected.slice(1).map((project, index) => <EditorialProject key={project.slug} project={project} title={titles[index + 1]} index={index + 1} />)}</div></div>
    <div className="portfolio-foot"><span>ECHTE BAUSTELLEN. ECHTE ERGEBNISSE.</span><Link href="/projekte" className="text-link">Zum vollständigen Archiv</Link></div>
  </div></section>;
}

function EditorialProject({ project, title, index, large = false }) {
  const cover = project.images[project.coverIndex || 0];
  return <Link href={`/projekte/${project.slug}`} className={large ? "editorial-project editorial-project-large" : "editorial-project"}>
    <div className="editorial-project-image"><Image src={cover.src} alt={cover.alt} fill sizes={large ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 100vw, 40vw"} /><span>{project.category}</span><span className="editorial-project-hover">Projekt ansehen</span></div>
    <div className="editorial-project-copy"><div><small>{String(index + 1).padStart(2, "0")} / {project.location || "Schleswig-Holstein"}</small><h3>{title}</h3></div><span>Projekt ansehen</span></div>
  </Link>;
}
