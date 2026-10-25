import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service, index }) {
  return (
    <Link className="service-card" href={`/leistungen/${service.slug}`}>
      <div className="service-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{service.kicker}</span></div>
      <div className="service-card-image"><Image src={service.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div>
      <h3>{service.title}</h3>
      <p>{service.intro}</p>
      <span className="text-link">Leistung ansehen </span>
    </Link>
  );
}
