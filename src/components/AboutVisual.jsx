import Image from "next/image";

export default function AboutVisual({ priority = false }) {
  return (
    <div className="editorial-portrait-image">
      <Image
        src="/projekte/fassade-ploen/holzfassade-detail-01.jpeg"
        alt="Fertig ausgeführte Holzfassade an einem Projekt von DS Zimmerei & Holzbau in Plön"
        fill
        priority={priority}
        sizes="(max-width: 800px) 100vw, 50vw"
      />
      <div className="editorial-portrait-logo">
        <Image src="/ds-logo.svg" alt="DS Zimmerei & Holzbau Logo" fill sizes="(max-width: 560px) 100px, 150px" />
      </div>
    </div>
  );
}
