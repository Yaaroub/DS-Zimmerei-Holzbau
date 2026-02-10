import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

// ✅ Cookies
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import CookieBanner from "@/components/cookies/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://ds-zimmerei-holzbau.de";
const siteName = "DS Zimmerei & Holzbau";
const mapsUrl = "https://maps.app.goo.gl/Ge7ckiZnhL4XQAmY9";

export const metadata = {
  // ✅ absolute URLs (canonical/OG) korrekt
  metadataBase: new URL(siteUrl),

  title: {
    default: "DS Zimmerei & Holzbau – Zimmerei & Dacharbeiten in Schleswig-Holstein",
    template: "%s | DS Zimmerei & Holzbau",
  },

  description:
    "DS Zimmerei & Holzbau – Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein. Tätig in Kiel, Lübeck, Flensburg, Neumünster, Rendsburg, Plön & Umgebung.",

  // ✅ Canonical (Unterseiten können überschreiben)
  alternates: {
    canonical: siteUrl + "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "DS Zimmerei & Holzbau – Zimmerei & Dacharbeiten in Schleswig-Holstein",
    description:
      "Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein – aktiv in Kiel, Lübeck, Flensburg, Neumünster, Rendsburg & Plön.",
    url: siteUrl + "/",
    siteName,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // -> /public/og-image.jpg (1200x630)
        width: 1200,
        height: 630,
        alt: "DS Zimmerei & Holzbau – Dach- & Holzbau Meisterbetrieb in Schleswig-Holstein",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DS Zimmerei & Holzbau – Zimmerei & Dacharbeiten in Schleswig-Holstein",
    description:
      "Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein – aktiv in Kiel, Lübeck, Flensburg, Neumünster, Rendsburg & Plön.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/ds-logo.svg", type: "image/svg+xml" }],
    // ✅ iOS: besser PNG statt SVG
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({ children }) {
  // ✅ Local SEO Schema (prüfe/ändere Daten falls nötig)
  const jsonLd = {
    "@context": "https://schema.org",
    "@id": siteUrl + "/#business",
    "@type": "HomeAndConstructionBusiness",
    name: siteName,
    url: siteUrl + "/",
    image: siteUrl + "/og-image.jpg",
    telephone: "+491729759134",
    email: "kontakt@ds-zimmerei-holzbau.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Behler Weg 11",
      postalCode: "24329",
      addressLocality: "Grebin",
      addressRegion: "Schleswig-Holstein",
      addressCountry: "DE",
    },

    // ✅ Google Maps / Google Business Profile Link
    hasMap: mapsUrl,
    sameAs: [mapsUrl],

    areaServed: [
      { "@type": "AdministrativeArea", name: "Schleswig-Holstein" },
      { "@type": "City", name: "Kiel" },
      { "@type": "City", name: "Lübeck" },
      { "@type": "City", name: "Flensburg" },
      { "@type": "City", name: "Neumünster" },
      { "@type": "City", name: "Eutin" },
      { "@type": "City", name: "Plön" },
    ],

    description:
      "Meisterbetrieb für Zimmerei, Dacharbeiten, Dachsanierung und individuellen Holzbau in Schleswig-Holstein.",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <html lang="de">
      <body className={inter.className}>
        {/* ✅ LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <CookieConsentProvider>
          <Navbar />
          {children}
          <Footer />
          <SpeedInsights />
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
