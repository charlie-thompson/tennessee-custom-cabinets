"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const SPECS = [
  "Amish-crafted",
  "Blum soft-close hinges",
  "All-wood construction",
  "Blumotion drawer slides",
  "Unlimited finishes",
  "Middle Tennessee service area",
];


export default function CraftStory() {
  return (
    <section
      id="about"
      style={{ position: "relative", backgroundColor: "var(--charcoal)" }}
    >
      {/* Split layout */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "680px" }}>
        {/* Image - left */}
        <div
          className="relative w-full lg:w-1/2"
          style={{ minHeight: "420px" }}
        >
          <Image
            src="/images/projects/laundry-01.JPG"
            alt="Handcrafted laundry room cabinetry"
            fill
            quality={85}
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Edge gradient bleeding into content side (desktop only) */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 70%, rgba(28,25,23,0.7) 100%)",
            }}
          />
          {/* Bottom gradient for mobile text legibility */}
          <div
            className="block lg:hidden"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(28,25,23,0.85) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Content - right */}
        <div
          className="w-full lg:w-1/2 flex items-center"
          style={{ padding: "4rem 2.5rem 5rem", paddingLeft: "clamp(2rem, 5vw, 5rem)", paddingRight: "clamp(2rem, 5vw, 5rem)" }}
        >
          <div style={{ maxWidth: "520px" }}>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.62rem",
                fontWeight: 400,
                color: "var(--brass)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Craftsmanship
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(1.9rem, 3vw, 3rem)",
                color: "white",
                lineHeight: 1.15,
                marginBottom: "2rem",
              }}
            >
              No shortcuts.
              <br />
              No particle board.
              <br />
              <em style={{ color: "var(--brass-light)", fontStyle: "italic" }}>
                No compromises.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                marginBottom: "2.5rem",
              }}
            >
              Every cabinet we build starts with solid wood and ends with a
              finish that will outlast the trends. No compromises on materials.
              No shortcuts in construction.
            </motion.p>

            {/* Specs grid */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem 2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {SPECS.map((spec) => (
                <div
                  key={spec}
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      backgroundColor: "var(--brass)",
                      flexShrink: 0,
                      borderRadius: "0",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8rem",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.72)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {spec}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Stat box - inline after specs grid */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.4 }}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                backgroundColor: "var(--brass)",
                padding: "1.4rem 1.75rem",
                marginTop: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2.6rem",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                100%
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.56rem",
                  fontWeight: 500,
                  color: "rgba(28,25,23,0.8)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}
              >
                All-Wood Construction
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
