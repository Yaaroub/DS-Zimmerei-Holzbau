import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "DS Zimmerei & Holzbau – Zimmerei, Dachdeckerarbeiten & Holzbau",
  description:
    "DS Zimmerei & Holzbau – Zimmerei, Dachdeckerarbeiten, Neu- & Anbauten, Dachsanierungen, Carports, Terrassen, Fenster & Türen. Meisterbetrieb von Dennis Steckel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
