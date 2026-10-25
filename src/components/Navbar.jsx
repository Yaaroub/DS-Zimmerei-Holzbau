"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/projekte", label: "Projekte" },
  { href: "/ueber-uns", label: "Über DS" },
  { href: "/ratgeber", label: "Wissen" },
  { href: "/region", label: "Region" },
];

export default function Navbar() {
  const pathname = usePathname();
  return <header className="site-header">
    <div className="site-topline"><span>Zimmerermeister Dennis Steckel · Grebin / Schleswig-Holstein</span><a href="tel:+491729759134">Anrufen: 0172 9759134</a></div>
    <div className="page-wrap site-header-inner">
      <Link href="/" className="brand-mark" aria-label="DS Zimmerei & Holzbau – Startseite"><Image src="/ds-logo-128.webp" alt="" width={66} height={66} priority /><span className="brand-text"><strong>DS ZIMMEREI &amp; HOLZBAU</strong><small>DENNIS STECKEL · MEISTERBETRIEB</small></span><span className="brand-mobile">DS ZIMMEREI</span></Link>
      <nav className="desktop-nav" aria-label="Hauptnavigation">{links.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname === href || (href !== "/kontakt" && pathname.startsWith(`${href}/`)) ? "page" : undefined}>{label}</Link>)}</nav>
      <Link href="/kontakt" className="header-cta">Projekt besprechen</Link>
      <details className="mobile-menu">
        <summary className="menu-toggle">
          <span className="menu-toggle-label menu-label-closed">Menü</span>
          <span className="menu-toggle-label menu-label-open">Schließen</span>
          <span className="menu-toggle-lines" aria-hidden="true"><i /><i /></span>
        </summary>
        <nav id="mobile-menu" aria-label="Mobile Navigation" className="mobile-nav">
          <p className="mobile-nav-eyebrow">Navigation / DS Holzbau</p>
          {links.map(({ href, label }) => <a key={href} href={href} aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}><span>{label}</span></a>)}
          <a href="/kontakt" className="mobile-nav-cta"><span>Projekt besprechen</span></a>
          <div><a href="tel:+491729759134">0172 9759134</a><a href="mailto:kontakt@ds-zimmerei-holzbau.de">kontakt@ds-zimmerei-holzbau.de</a></div>
        </nav>
      </details>
    </div>
  </header>;
}
