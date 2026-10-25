
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import CookieBanner from "@/components/cookies/CookieBanner";

const siteUrl = "https://ds-zimmerei-holzbau.de";
const siteName = "DS Zimmerei & Holzbau";
const mapsUrl = "https://maps.app.goo.gl/Ge7ckiZnhL4XQAmY9";

const description =
  "DS Zimmerei & Holzbau – Meisterbetrieb für Zimmerei, Dacharbeiten, Dachsanierung und individuellen Holzbau in Schleswig-Holstein. Aus Grebin für Plön, Kiel und Umgebung.";

export const metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,

  title: {
    default:
      "DS Zimmerei & Holzbau | Zimmerei & Dacharbeiten in Schleswig-Holstein",
    template: "%s | DS Zimmerei & Holzbau",
  },

  description,

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
    title: siteName,
    description,
    siteName,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DS Zimmerei & Holzbau – Meisterbetrieb in Schleswig-Holstein",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/ds-logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
    shortcut: "/favicon.ico",
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteUrl}/#business`,

  name: siteName,
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,

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

  hasMap: mapsUrl,
  sameAs: [mapsUrl],

  areaServed: { "@type": "AdministrativeArea", name: "Schleswig-Holstein" },

  description:
    "Zimmerei, Dacharbeiten, Dachsanierung und individueller Holzbau in Schleswig-Holstein.",

};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <CookieConsentProvider>
          <Navbar />

          {children}

          <Footer />

          <CookieBanner />
        </CookieConsentProvider>

        <SpeedInsights />
      </body>
    </html>
  );
}
