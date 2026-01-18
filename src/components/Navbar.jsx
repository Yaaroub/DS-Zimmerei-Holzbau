"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/#leistungen", label: "Leistungen", id: "leistungen" },
  { href: "/#ueber", label: "Über uns", id: "ueber" },
  { href: "/#warum-wir", label: "Warum wir", id: "warum-wir" },
  { href: "/#projekte", label: "Projekte", id: "projekte" },
  { href: "/#kontakt", label: "Kontakt", id: "kontakt" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const offset = 120;

  const allLinks = useMemo(
    () => [
      ...NAV_LINKS,
      { href: "/impressum", label: "Impressum", id: "impressum" },
      { href: "/datenschutz", label: "Datenschutz", id: "datenschutz" },
    ],
    []
  );

  // ✅ Logo always scrolls to top (even if already on "/")
  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault();
      setIsOpen(false);

      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      router.push("/");
      // smooth scroll right after route change starts
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    [pathname, router]
  );

  // ✅ Smooth + reliable hash navigation (works from subpages too)
  const handleNavClick = useCallback(
    (href) => (e) => {
      // only handle in-page anchors like "/#kontakt"
      if (!href.startsWith("/#")) return;

      e.preventDefault();
      setIsOpen(false);

      const id = href.replace("/#", "");
      const scrollToId = () => {
        const el = document.getElementById(id);
        if (!el) return false;

        const y =
          el.getBoundingClientRect().top + window.scrollY - offset + 1;
        window.scrollTo({ top: y, behavior: "smooth" });
        return true;
      };

      // already on homepage -> just scroll
      if (pathname === "/") {
        // wait a tick so drawer closes and layout settles
        requestAnimationFrame(() => scrollToId());
        return;
      }

      // from subpage -> go home, then scroll
      router.push(href);

      // try a few times until section exists (after render)
      let tries = 0;
      const maxTries = 30;

      const tick = () => {
        tries += 1;
        if (scrollToId()) return;
        if (tries < maxTries) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    [offset, pathname, router]
  );

  // ✅ Scroll spy (throttled via rAF for better perf)
  useEffect(() => {
    let raf = null;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;

        const y = window.scrollY;
        setScrolled(y > 10);

        // Only compute active section on homepage (prevents useless work on /impressum etc.)
        if (pathname !== "/") {
          setActiveSection(null);
          return;
        }

        let current = null;
        for (const link of NAV_LINKS) {
          const el = document.getElementById(link.id);
          if (!el) continue;

          const top = el.offsetTop - offset;
          const bottom = top + el.offsetHeight;

          if (y >= top && y < bottom) {
            current = link.id;
            break;
          }
        }
        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [offset, pathname]);

  // BODY scroll lock for drawer
  useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = isOpen ? "hidden" : prevOverflow || "";
    return () => {
      body.style.overflow = prevOverflow || "";
    };
  }, [isOpen]);

  // ESC closes drawer
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setIsOpen(false);
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Close drawer if switching to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const desktopItemClass = (id) => {
    const isActive = activeSection === id && pathname === "/";
    return `
      relative select-none
      px-2.5 lg:px-3 py-2 rounded-full
      text-[13px] lg:text-[15px]
      transition-all duration-200
      ${isActive ? "text-black" : "text-white/85 hover:text-white"}
      ${isActive ? "bg-brand-green shadow-sm" : "hover:bg-white/8"}
      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
    `;
  };

  const mobileItemClass = (isPrimary = true) => `
    flex items-center justify-between
    rounded-2xl px-4 py-3.5
    ${isPrimary ? "bg-white/5 border border-white/10" : "bg-transparent"}
    text-white/90 hover:text-white hover:bg-white/8
    transition
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
  `;

  return (
    <>
      {/* Top Glow line */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>

      <header className="fixed top-0 left-0 w-full z-40">
        <div
          className={[
            "mx-auto max-w-7xl",
            "px-3 sm:px-4 md:px-6 lg:px-8",
            "transition-all duration-300",
            scrolled ? "pt-2.5 sm:pt-3" : "pt-3 sm:pt-4",
          ].join(" ")}
        >
          <div
            className={[
              "flex items-center justify-between",
              "h-14 sm:h-16",
              "rounded-2xl border",
              "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.65)]",
              "transition-all duration-300",
              scrolled
                ? "bg-black/55 backdrop-blur-xl border-white/12"
                : "bg-black/30 backdrop-blur-md border-white/10",
            ].join(" ")}
          >
            {/* Left */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2.5 sm:pl-3">
              <Link
                href="/"
                onClick={handleLogoClick}
                className="flex items-center gap-2 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl"
                aria-label="Zur Startseite"
              >
                <div className="rounded-xl border border-white/10 bg-white/5 p-1">
                  <Image
                    src="/ds-logo.svg"
                    alt="DS Zimmerei & Holzbau"
                    width={96}
                    height={96}
                    // ✅ no priority here; hero should take priority
                    className={[
                      "w-auto transition-all duration-300",
                      scrolled ? "h-8 sm:h-9" : "h-9 sm:h-10",
                    ].join(" ")}
                  />
                </div>

                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-white font-semibold tracking-tight text-sm md:text-base">
                    DS Zimmerei
                  </span>
                  <span className="text-white/60 text-[11px] md:text-xs -mt-0.5">
                    Holzbau & Dacharbeiten
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  className={desktopItemClass(item.id)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mx-1.5 lg:mx-2 h-6 w-px bg-white/10 hidden lg:block" />

              <Link
                href="/impressum"
                className="hidden lg:inline-flex px-2.5 py-2 rounded-full text-[13px] lg:text-[15px] text-white/75 hover:text-white hover:bg-white/8 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="hidden lg:inline-flex px-2.5 py-2 rounded-full text-[13px] lg:text-[15px] text-white/75 hover:text-white hover:bg-white/8 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Datenschutz
              </Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2 pr-2.5 sm:pr-3">
              <Link
                href="/#kontakt"
                onClick={handleNavClick("/#kontakt")}
                className="
                  hidden md:inline-flex items-center justify-center
                  px-3.5 lg:px-4 py-2 rounded-full
                  bg-brand-green text-black font-semibold
                  text-sm
                  shadow-sm
                  hover:brightness-110 transition
                  select-none
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                "
              >
                Angebot
              </Link>

              <button
                className="
                  md:hidden inline-flex items-center justify-center
                  h-11 w-11 rounded-xl
                  bg-white/5 border border-white/10
                  text-white
                  hover:bg-white/10 transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                "
                onClick={() => setIsOpen(true)}
                aria-label="Menü öffnen"
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
              >
                <span className="text-2xl leading-none">☰</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        className={[
          "fixed inset-0 z-50 md:hidden",
          "transition-opacity duration-200",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <button
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-label="Menü schließen"
        />

        <aside
          className={[
            "absolute right-0 top-0 h-full w-[86%] max-w-sm",
            "bg-black/70 backdrop-blur-xl",
            "border-l border-white/12",
            "shadow-2xl",
            "transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="p-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-white/5 border border-white/10 p-2">
                <Image
                  src="/ds-logo.svg"
                  alt="DS Zimmerei & Holzbau"
                  width={64}
                  height={64}
                  className="h-8 w-auto"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-semibold">DS Zimmerei</span>
                <span className="text-white/60 text-xs">Navigation</span>
              </div>
            </div>

            <button
              className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              onClick={() => setIsOpen(false)}
              aria-label="Menü schließen"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
          </div>

          <div className="p-5 flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick(item.href)}
                className={mobileItemClass(true)}
              >
                <span className="text-base sm:text-lg font-semibold">
                  {item.label}
                </span>
                <span className="text-white/40">→</span>
              </Link>
            ))}

            <div className="my-3 h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/impressum"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-white/75 hover:text-white hover:bg-white/8 transition text-sm text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-white/75 hover:text-white hover:bg-white/8 transition text-sm text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Datenschutz
              </Link>
            </div>

            <Link
              href="/#kontakt"
              onClick={handleNavClick("/#kontakt")}
              className="
                mt-4 inline-flex items-center justify-center
                rounded-2xl px-5 py-4
                bg-brand-green text-black font-semibold
                shadow-sm hover:brightness-110 transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              "
            >
              Angebot anfordern
            </Link>

            <p className="mt-4 text-xs text-white/45 leading-relaxed">
              © {new Date().getFullYear()} DS Zimmerei & Holzbau
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
