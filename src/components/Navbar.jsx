"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo links */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/ds-logo.png"
              alt="DS Zimmerei & Holzbau"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-200">
            <Link
              href="/#leistungen"
              className="hover:text-[#17E800] transition"
            >
              Leistungen
            </Link>
            <Link
              href="/#warum-wir"
              className="hover:text-[#17E800] transition"
            >
              Warum Wir
            </Link>
            <Link href="/#ueber" className="hover:text-[#17E800] transition">
              Über uns
            </Link>
            <Link href="/#projekte" className="hover:text-[#17E800] transition">
              Projekte
            </Link>
            <Link href="/#kontakt" className="hover:text-[#17E800] transition">
              Kontakt
            </Link>
            <Link href="/impressum" className="hover:text-[#17E800] transition">
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="hover:text-[#17E800] transition"
            >
              Datenschutz
            </Link>
          </div>

          {/* CTA Desktop */}
          <Link
            href="/#kontakt"
            className="hidden md:inline-block px-4 py-2 bg-[#17E800] text-black font-semibold rounded-full shadow-[0_0_12px_rgba(23,232,0,0.6)] hover:bg-white transition"
          >
            Angebot
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Fullscreen Overlay Menü – nur Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 md:hidden">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white text-4xl"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>

          {/* Menü Links */}
          <Link
            href="/#leistungen"
            className="text-2xl font-semibold text-white hover:text-[#17E800] transition"
            onClick={() => setIsOpen(false)}
          >
            Leistungen
          </Link>

          <Link
            href="/#warum-wir"
            className="text-2xl font-semibold text-white hover:text-[#17E800] transition"
            onClick={() => setIsOpen(false)}
          >
            Warum Wir
          </Link>

          <Link
            href="/#ueber"
            className="text-2xl font-semibold text-white hover:text-[#17E800] transition"
            onClick={() => setIsOpen(false)}
          >
            Über uns
          </Link>
          <Link
            href="/#projekte"
            className="text-2xl font-semibold text-white hover:text-[#17E800] transition"
            onClick={() => setIsOpen(false)}
          >
            Projekte
          </Link>

          <Link
            href="/#kontakt"
            className="text-2xl font-semibold text-white hover:text-[#17E800] transition"
            onClick={() => setIsOpen(false)}
          >
            Kontakt
          </Link>

          <Link
            href="/impressum"
            className="text-lg text-gray-300 hover:text-[#17E800] transition mt-4"
            onClick={() => setIsOpen(false)}
          >
            Impressum
          </Link>

          <Link
            href="/datenschutz"
            className="text-lg text-gray-300 hover:text-[#17E800] transition"
            onClick={() => setIsOpen(false)}
          >
            Datenschutz
          </Link>

          {/* CTA Button */}
          <Link
            href="/#kontakt"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-6 py-3 rounded-full bg-[#17E800] text-black font-semibold shadow-[0_0_18px_rgba(23,232,0,0.7)] hover:bg-white transition"
          >
            Angebot anfordern
          </Link>
        </div>
      )}
    </>
  );
}
