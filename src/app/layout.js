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

export const metadata = {
  // ✅ Wichtig: sorgt für absolute URLs (OG, canonical, etc.)
  metadataBase: new URL(siteUrl),

  title: {
    default: "DS Zimmerei & Holzbau – Zimmerei & Dacharbeiten in Schleswig-Holstein",
    template: "%s | DS Zimmerei & Holzbau",
  },

  description:
    "DS Zimmerei & Holzbau – Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein. Tätig in Kiel, Lübeck, Flensburg, Neumünster, Elmshorn, Norderstedt, Rendsburg, Plön & Umgebung.",

  // ✅ Canonical (Pages können das überschreiben)
  alternates: {
    canonical: "/",
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
      "Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein – aktiv in Kiel, Lübeck, Flensburg, Neumünster, Elmshorn, Norderstedt, Rendsburg & Plön.",
    url: siteUrl,
    siteName,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DS Zimmerei & Holzbau – Dach- & Holzbau Meisterbetrieb in Schleswig-Holstein",
      },
    ],
  },

  

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/ds-logo.svg", type: "image/svg+xml" },
    ],
    apple: "/ds-logo.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>
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
