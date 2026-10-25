import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, index }) {
  const cover = project.images[project.coverIndex || 0];
  return (
    <Link href={`/projekte/${project.slug}`} className="archive-project-card">
      <div className="archive-project-media">
        <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span className="archive-project-label">{project.category}</span>
        {project.comparison && <span className="archive-project-compare">Vorher / Nachher</span>}
        <span className="archive-project-hover">Projekt ansehen</span>
      </div>
      <div className="archive-project-info">
        <small>{String(index + 1).padStart(2, "0")} / {project.location || "Schleswig-Holstein"}</small>
        <h3>{project.title}</h3>
        <p>{project.lead}</p>
      </div>
    </Link>
  );
}
