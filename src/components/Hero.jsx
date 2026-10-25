import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return <section className="home-hero">
    <div className="home-hero-photo"><Image src="/projekte/molfsee/dachsanierung-molfsee-luftaufnahme.jpeg" alt="Realisierte Dachsanierung in Molfsee aus der Vogelperspektive" fill priority sizes="100vw" /></div>
    <div className="home-hero-shade" />
    <div className="page-wrap home-hero-inner">
      <div className="home-hero-content">
        <p className="hero-overline"><span className="hero-rule" /> Zimmerermeisterbetrieb · Grebin / Schleswig-Holstein</p>
        <h1>WIR BAUEN<br /><em>WAS BLEIBT.</em></h1>
        <div className="hero-bottom"><div><p className="hero-lead">Holzbau, Dach &amp; Sanierung.<br />Mit Erfahrung. Mit Anspruch. Mit Handschrift.</p><div className="hero-actions"><Link href="/projekte" className="button button-light">Arbeiten entdecken</Link><Link href="/kontakt" className="hero-second">Projekt besprechen</Link></div></div><p className="hero-index">01 — 08<br />ECHTE PROJEKTE</p></div>
      </div>
      <span className="hero-vertical">DAS HANDWERK HINTER DEM ERGEBNIS</span>
    </div>
  </section>;
}
