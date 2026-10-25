import KontaktSection from "@/components/KontaktSection";

export const metadata = { title: "Kontakt & Projektanfrage", description: "Fragen Sie DS Zimmerei & Holzbau für Ihr Dach-, Holzbau- oder Sanierungsvorhaben an. Kontakt zu Dennis Steckel in Grebin bei Plön.", alternates: { canonical: "/kontakt" } };

export default function ContactPage() { return <main><header className="page-intro"><div className="page-wrap"><p className="eyebrow">Kontakt / Anfrage</p><h1>Erzählen Sie uns,<br /><em>was Sie vorhaben.</em></h1><p>Eine kurze Beschreibung Ihres Projekts reicht für den Anfang. Ob Neubau, Sanierung oder Reparatur: Wir besprechen gemeinsam, was als Nächstes sinnvoll ist.</p></div></header><KontaktSection /></main>; }
