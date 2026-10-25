export const guides = [
  {
    slug: "dachsanierung-planen",
    title: "Dachsanierung planen: Was vor dem Angebot wichtig ist",
    lead: "Eine Dachsanierung beginnt mit Fragen zum Bestand. Wer die Ausgangslage gut beschreibt, erleichtert die erste Einschätzung und vermeidet Missverständnisse im weiteren Ablauf.",
    service: "dachsanierung",
    project: "dachsanierung-preetz",
    sections: [
      { title: "Den Anlass festhalten", text: "Geht es um sichtbare Schäden, eine gealterte Eindeckung, einen Umbau oder eine energetische Verbesserung? Notieren Sie, was Sie selbst beobachten und seit wann. Fotos von außen und, wenn sicher zugänglich, von innen helfen beim ersten Gespräch. Eine technische Beurteilung vor Ort ersetzen sie nicht." },
      { title: "Das ganze Dach mitdenken", text: "Neben der Fläche gehören Gauben, Schornstein, Dachfenster, Entwässerung und die Ränder des Daches zur Aufgabe. Wenn an diesen Stellen bereits Probleme bekannt sind, sollten sie früh genannt werden. Auch spätere Wünsche wie ein Dachfenster oder Photovoltaik sind für die Planung relevant." },
      { title: "Unterlagen und Ziele sammeln", text: "Vorhandene Pläne, frühere Rechnungen, Angaben zu Umbauten und Fotos des Gebäudes sind nützlich. Ebenso wichtig ist Ihr Ziel: Soll das Dach vor allem instandgesetzt, energetisch verbessert oder auch gestalterisch verändert werden? Der konkrete Umfang ergibt sich erst aus dem Gebäude." },
      { title: "Nächste Schritte abstimmen", text: "Nach einer ersten Anfrage folgt üblicherweise die Besichtigung des Bestands. Dabei werden mögliche Arbeiten, Schnittstellen und offene Fragen besprochen. Eine belastbare Lösung und ein Angebot brauchen diese Grundlage; pauschale Quadratmeterpreise können die Unterschiede zwischen Gebäuden nicht abbilden." },
    ],
  },
  {
    slug: "holzfassade-planen",
    title: "Holzfassade planen: Oberfläche, Aufbau und Anschlüsse",
    lead: "Eine Holzfassade prägt das Haus. Damit sie langfristig funktioniert, braucht es mehr als eine schöne Bekleidung: auch Unterkonstruktion, Wasserführung und Übergänge gehören zur Planung.",
    service: "holzfassaden",
    project: "fassadensanierung-ploen",
    sections: [
      { title: "Welche Wirkung soll entstehen?", text: "Schon Profil, Richtung und Fugenbild verändern die Wahrnehmung eines Gebäudes. Hilfreich ist, wenn Sie Beispiele sammeln und festhalten, welche Flächen überhaupt erneuert werden sollen: das ganze Haus, ein Giebel oder nur ein Teilbereich." },
      { title: "Den Bestand prüfen", text: "Vor einer neuen Bekleidung sollte klar sein, wie die vorhandene Wand aufgebaut ist und ob sichtbare Schäden bestehen. Bei einem Bestandsgebäude beeinflussen Sockel, Dachüberstand, Fenster und Türen die möglichen Lösungen." },
      { title: "Details früh klären", text: "Gerade an Ecken, Fensterlaibungen, Sockel und Dachrand zeigt sich, ob eine Fassade sauber durchdacht wurde. Diese Bereiche bestimmen nicht nur das Bild, sondern auch den Umgang mit Witterung. Eine Auswahl der Holzart allein reicht deshalb nicht für die Planung." },
      { title: "Pflege realistisch besprechen", text: "Holz verändert sich im Außenbereich. Wie stark, hängt unter anderem von Material, Oberfläche und Bewitterung ab. Sprechen Sie vor der Entscheidung darüber, welches Erscheinungsbild Sie wünschen und welche Pflege Sie übernehmen möchten." },
    ],
  },
  {
    slug: "carport-planen",
    title: "Carport aus Holz planen: Nutzung vor Form",
    lead: "Ein Carport muss zum Grundstück und zum Alltag passen. Wer vorab Nutzung, Wege und zusätzlichen Stauraum klärt, kann die Holzkonstruktion sinnvoll planen lassen.",
    service: "carports-terrassen",
    project: "carport-geraeteschuppen",
    sections: [
      { title: "Nutzung zuerst", text: "Wie viele Fahrzeuge sollen geschützt stehen? Brauchen Sie Platz für Fahrräder, Mülltonnen oder Geräte? Und welche Wege müssen frei bleiben? Diese Fragen beeinflussen Maße, Öffnungen und die Lage auf dem Grundstück." },
      { title: "Grundstück und Haus betrachten", text: "Ein Carport steht selten für sich allein. Zufahrt, Geländehöhen, Hausfassade und Regenwasserführung müssen zusammen betrachtet werden. Fotos und eine Skizze des gewünschten Standorts helfen bei der ersten Einschätzung." },
      { title: "Konstruktion und Erscheinung verbinden", text: "Stützen, Träger, Dachform und mögliche geschlossene Bereiche bilden eine Einheit. Unsere Referenz mit Geräteschuppen zeigt, wie Stellfläche und Stauraum in einer Holzkonstruktion zusammenkommen können." },
      { title: "Rechtliches früh klären", text: "Ob für Ihr Vorhaben eine Genehmigung oder weitere Unterlagen nötig sind, hängt von Größe, Lage und den örtlichen Regeln ab. Diese Frage sollte vor der Ausführung geklärt werden. Erst danach lassen sich Umfang und Ablauf verlässlich festlegen." },
    ],
  },
];

export const getGuide = (slug) => guides.find((guide) => guide.slug === slug);
