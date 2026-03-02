"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BENEFITS = [
  {
    title: "Trade Pricing",
    description:
      "Competitive volume rates structured around the way builders and contractors work.",
  },
  {
    title: "Dedicated Rep",
    description:
      "One point of contact who knows your projects, your specs, and responds fast.",
  },
  {
    title: "Reliable Lead Times",
    description:
      "Clear timelines, honest communication, and on-schedule delivery, every job.",
  },
  {
    title: "Design Support",
    description:
      "From rough plans to final specs, we help keep your builds on track.",
  },
];

const ANIM = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const ease = [0.25, 0.1, 0.25, 1] as any;

export default function BuilderSection() {
  return (
    <section
      id="builders"
      style={{ position: "relative", backgroundColor: "var(--charcoal)" }}
    >
      <div className="flex flex-col-reverse lg:flex-row" style={{ minHeight: "680px" }}>
        {/* Content - left */}
        <div
          className="w-full lg:w-1/2 flex items-center"
          style={{
            padding: "4rem 2.5rem 5rem",
            paddingLeft: "clamp(2rem, 5vw, 5rem)",
            paddingRight: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          <div style={{ maxWidth: "520px" }}>
            <motion.p
              {...ANIM}
              transition={{ duration: 0.6, ease, delay: 0 }}
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
              For Builders
            </motion.p>

            <motion.h2
              {...ANIM}
              transition={{ duration: 0.6, ease, delay: 0.12 }}
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(1.9rem, 3vw, 3rem)",
                color: "white",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              The cabinet partner
              <br />
              <em style={{ color: "var(--brass-light)", fontStyle: "italic" }}>
                your projects deserve.
              </em>
            </motion.h2>

            <motion.p
              {...ANIM}
              transition={{ duration: 0.6, ease, delay: 0.24 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                marginBottom: "2.75rem",
              }}
            >
              We work alongside builders, developers, and designers across
              Middle Tennessee, delivering quality cabinetry on schedule and
              within budget, every time.
            </motion.p>

            {/* Benefits grid */}
            <motion.div
              {...ANIM}
              transition={{ duration: 0.6, ease, delay: 0.36 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.75rem 2rem",
                marginBottom: "3rem",
              }}
            >
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  style={{
                    paddingLeft: "0.875rem",
                    borderLeft: "1px solid var(--brass)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      fontWeight: 300,
                      color: "white",
                      lineHeight: 1.2,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {b.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.65,
                    }}
                  >
                    {b.description}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Email CTA */}
            <motion.div {...ANIM} transition={{ duration: 0.6, ease, delay: 0.48 }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.05em",
                  marginBottom: "0.6rem",
                }}
              >
                Ready to partner with us?
              </p>
              <a
                href="mailto:builders@tennesseecustomcabinets.com"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--brass)",
                  border: "1px solid var(--brass)",
                  padding: "0.9rem 2rem",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "background-color 0.22s ease, color 0.22s ease",
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
                Email Our Builder Team
              </a>
            </motion.div>
          </div>
        </div>

        {/* Image - right */}
        <div
          className="relative w-full lg:w-1/2"
          style={{ minHeight: "420px" }}
        >
          <Image
            src="/images/projects/kitchen-05.JPG"
            alt="Custom kitchen cabinetry for builders"
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
                "linear-gradient(to left, transparent 70%, rgba(28,25,23,0.65) 100%)",
            }}
          />
        </div>
      </div>

      {/* Floating stat box - overlaps the image/content split on desktop */}
      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "calc(50% + 2rem)",
          backgroundColor: "var(--brass)",
          padding: "1.4rem 1.75rem",
          zIndex: 10,
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
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
          10+
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
          Years Serving Tennessee
        </p>
      </div>
    </section>
  );
}
