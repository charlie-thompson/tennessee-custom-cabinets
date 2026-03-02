"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SLIDES = [
  { src: "/images/projects/kitchen-04.JPG", alt: "Custom kitchen cabinetry" },
  { src: "/images/projects/kitchen-01.JPG", alt: "Handcrafted kitchen cabinets" },
  { src: "/images/projects/kitchen-pantry-02.JPG", alt: "Custom pantry cabinetry" },
];

const INTERVAL_MS = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "600px",
        overflow: "hidden",
        backgroundColor: "var(--charcoal)",
      }}
    >
      {/* Crossfading background images */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            priority={current === 0}
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay: dark at bottom → transparent at top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to top, rgba(28,25,23,0.88) 0%, rgba(28,25,23,0.65) 40%, rgba(28,25,23,0.55) 75%, rgba(28,25,23,0.55) 100%)",
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8125rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              margin: 0,
              textShadow: "0 1px 10px rgba(0,0,0,0.8)",
            }}
          >
            Nashville &amp; Middle Tennessee
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(3.2rem, 7.5vw, 5.75rem)",
              lineHeight: 1.08,
              color: "white",
              margin: 0,
              maxWidth: "820px",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Built by hand.
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--brass-light)",
              }}
            >
              Made for your Home.
            </em>
          </h1>

          {/* Sub-headline */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "clamp(1rem, 1.6vw, 1.1875rem)",
              color: "rgba(255,255,255,0.92)",
              maxWidth: "500px",
              lineHeight: 1.75,
              margin: 0,
              textShadow: "0 1px 12px rgba(0,0,0,0.7)",
            }}
          >
            Heirloom-quality cabinetry designed around your space,
            your taste, and the way you live.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            <HeroCTA href="#consultation" variant="filled">
              Get a Free Consultation
            </HeroCTA>
            <HeroCTA href="#the-craft" variant="outlined">
              See The Craft
            </HeroCTA>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.55rem",
            fontWeight: 400,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            size={16}
            style={{ color: "var(--brass)", display: "block" }}
          />
        </motion.div>
      </motion.div>

      {/* Slide dot indicators - bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2rem",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              width: "2px",
              height: i === current ? "28px" : "10px",
              backgroundColor:
                i === current ? "var(--brass)" : "rgba(255,255,255,0.3)",
              transition: "height 0.4s ease, background-color 0.4s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function HeroCTA({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "filled" | "outlined";
  children: React.ReactNode;
}) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "0.72rem",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    textDecoration: "none",
    padding: "0.9rem 2.1rem",
    display: "inline-block",
    transition: "background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease",
    whiteSpace: "nowrap",
  };

  const filled: React.CSSProperties = {
    ...base,
    backgroundColor: "var(--brass)",
    color: "var(--charcoal)",
    border: "1px solid var(--brass)",
  };

  const outlined: React.CSSProperties = {
    ...base,
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,0.45)",
  };

  return (
    <Link
      href={href}
      style={variant === "filled" ? filled : outlined}
      onMouseEnter={(e) => {
        if (variant === "filled") {
          e.currentTarget.style.backgroundColor = "var(--brass-light)";
          e.currentTarget.style.borderColor = "var(--brass-light)";
        } else {
          e.currentTarget.style.borderColor = "var(--brass-light)";
          e.currentTarget.style.color = "var(--brass-light)";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "filled") {
          e.currentTarget.style.backgroundColor = "var(--brass)";
          e.currentTarget.style.borderColor = "var(--brass)";
        } else {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
          e.currentTarget.style.color = "white";
        }
      }}
    >
      {children}
    </Link>
  );
}
