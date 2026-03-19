"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram } from "lucide-react";

function useAnchorNav() {
  const pathname = usePathname();
  return (href: string) => {
    if (!href.startsWith("#")) { window.location.href = href; return; }
    const id = href.slice(1);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };
}

const NAV_LINKS = [
  { label: "The Craft",         href: "#the-craft" },
  { label: "Process",           href: "#process" },
  { label: "About",             href: "#about" },
  { label: "For Builders",      href: "#builders" },
  { label: "Resources",         href: "/resources" },
  { label: "Free Consultation", href: "#consultation" },
];

const SERVICE_CITIES = [
  "Nashville",
  "Franklin",
  "Murfreesboro",
  "Columbia",
  "Brentwood",
  "Nolensville",
  "Spring Hill",
  "Shelbyville",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useAnchorNav();

  return (
    <footer
      style={{
        backgroundColor: "var(--charcoal)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Main footer grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "5rem 2.5rem 4rem",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "3rem" }}>
          {/* Col 1 - Brand */}
          <div className="items-center sm:items-start" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <Image
                src="/TN-custom-cabinets-logo.PNG"
                alt="Tennessee Custom Cabinets"
                width={240}
                height={80}
                style={{ objectFit: "contain" }}
              />
            </Link>

            <p
              className="text-center sm:text-left"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.75,
                maxWidth: "240px",
              }}
            >
              Handcrafted cabinetry built by hand in the USA.
            </p>

            {/* Phone */}
            <a
              href="tel:9314468034"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brass-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              931.446.8034
            </a>

            {/* Social */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <SocialLink
                href="https://www.facebook.com/profile.php?id=61581191876137"
                label="Facebook"
                icon={<Facebook size={17} />}
              />
              <SocialLink
                href="https://instagram.com/tennesseecustomcabinets"
                label="Instagram"
                icon={<Instagram size={17} />}
              />
            </div>
          </div>

          {/* Col 2 - Navigation */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.58rem",
                fontWeight: 500,
                color: "var(--brass)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Navigation
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Col 3 - Service Area */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.58rem",
                fontWeight: 500,
                color: "var(--brass)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Service Area
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {SERVICE_CITIES.map((city) => (
                <li
                  key={city}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - CTA block */}
          <div
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              paddingLeft: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "1.5rem",
                color: "white",
                lineHeight: 1.25,
              }}
            >
              Ready to start your project?
            </p>
            <Link
              href="#consultation"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brass)",
                border: "1px solid var(--brass)",
                padding: "0.75rem 1.5rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "background-color 0.22s ease, color 0.22s ease",
                alignSelf: "flex-start",
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
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1.25rem 2.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.3)",
            margin: 0,
          }}
        >
          © {year} Tennessee Custom Cabinets. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.2)",
            margin: 0,
          }}
        >
          Handcrafted in the USA
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        color: "rgba(255,255,255,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 0.2s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brass)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
    >
      {icon}
    </a>
  );
}
