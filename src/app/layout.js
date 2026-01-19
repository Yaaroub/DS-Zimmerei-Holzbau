import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ✅ Cookies
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import CookieBanner from "@/components/cookies/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://www.ds-zimmerei-holzbau.de"; // TODO: anpassen
const siteName = "DS Zimmerei & Holzbau";

export const metadata = {
  title: {
    default: "DS Zimmerei & Holzbau – Zimmerei & Dacharbeiten in Schleswig-Holstein",
    template: "%s | DS Zimmerei & Holzbau",
  },
  description:
    "DS Zimmerei & Holzbau – Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein. Tätig in Kiel, Lübeck, Flensburg, Neumünster, Elmshorn, Norderstedt, Rendsburg, Plön & Umgebung.",
  openGraph: {
    title: "DS Zimmerei & Holzbau – Zimmerei & Dacharbeiten in Schleswig-Holstein",
    description:
      "Meisterbetrieb für Zimmerei, Dacharbeiten & Holzbau in Schleswig-Holstein – aktiv in Kiel, Lübeck, Flensburg, Neumünster, Elmshorn, Norderstedt, Rendsburg & Plön.",
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
    icon: [{ url: "/favicon.ico" }, { url: "/ds-logo.svg", type: "image/svg+xml" }],
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

          {/* ✅ global, damit Footer "Cookie-Einstellungen" öffnen kann */}
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
