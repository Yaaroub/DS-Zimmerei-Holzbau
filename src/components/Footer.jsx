"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return <footer className="site-footer"><div className="page-wrap">
    <div className="footer-top"><div><Link href="/" className="footer-brand"><Image src="/ds-logo-128.webp" alt="DS Zimmerei & Holzbau" width={72} height={72} /><span>Handwerk,<br /><em>das bleibt.</em></span></Link><p>Zimmerermeister Dennis Steckel<br />Behler Weg 11 · 24329 Grebin</p></div><div><h2>Entdecken</h2><Link href="/leistungen">Leistungen</Link><Link href="/projekte">Werkarchiv</Link><Link href="/ueber-uns">Über DS</Link><Link href="/ratgeber">Wissen</Link><Link href="/region">Region</Link><Link href="/kontakt">Kontakt</Link></div><div><h2>Direkter Kontakt</h2><a href="tel:+491729759134">0172 9759134</a><a href="mailto:kontakt@ds-zimmerei-holzbau.de">kontakt@ds-zimmerei-holzbau.de</a><p>Grebin bei Plön<br />Schleswig-Holstein</p></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} DS Zimmerei &amp; Holzbau</span><div><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>Cookie-Einstellungen</button></div><span>Gestaltung &amp; Umsetzung: <a href="https://hexel-tech.de" target="_blank" rel="noopener noreferrer">HEXEL tech</a></span></div>
  </div></footer>;
}
