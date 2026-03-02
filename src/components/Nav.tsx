"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "The Craft", href: "#the-craft" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "For Builders", href: "#builders" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled ? "rgba(28,25,23,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "background-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2.5rem",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <Image
              src="/TN-custom-cabinets-logo.PNG"
              alt="Tennessee Custom Cabinets"
              width={200}
              height={56}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "2.5rem" }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <ConsultationCTA href="#consultation" />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-0 top-[80px] z-40 md:hidden"
            style={{
              backgroundColor: "rgba(28,25,23,0.98)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(181,146,76,0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2rem 2.5rem 2.5rem",
                gap: "0",
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.8)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "1rem 0",
                    borderBottom:
                      i < NAV_LINKS.length - 1
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--brass)",
                  border: "1px solid var(--brass)",
                  padding: "0.875rem 1.5rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  textAlign: "center",
                  marginTop: "1.5rem",
                }}
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        fontWeight: 400,
        color: "rgba(255,255,255,0.82)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "color 0.2s ease",
        position: "relative",
        textShadow: "0 1px 8px rgba(0,0,0,0.6)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "var(--brass-light)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "rgba(255,255,255,0.82)")
      }
    >
      {children}
    </Link>
  );
}

function ConsultationCTA({ href }: { href: string }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.68rem",
        fontWeight: 500,
        color: "var(--brass)",
        border: "1px solid var(--brass)",
        padding: "0.55rem 1.3rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "background-color 0.2s ease, color 0.2s ease",
        display: "inline-block",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--brass)";
        e.currentTarget.style.color = "var(--charcoal)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "var(--brass)";
      }}
    >
      Free Consultation
    </Link>
  );
}
