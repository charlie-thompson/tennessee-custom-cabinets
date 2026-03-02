"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Free In-Home Consultation",
    timing: null,
    description:
      "We come to you. Our team visits your home, takes precise measurements, and listens carefully to your vision, at no cost and no obligation.",
    dark: false,
  },
  {
    number: "02",
    title: "Custom Design & Quote",
    timing: "5–7 business days",
    description:
      "Our designers draft a detailed layout, present material and finish options, and deliver a transparent, itemized quote with no hidden fees.",
    dark: true,
  },
  {
    number: "03",
    title: "Build & Expert Installation",
    timing: null,
    description:
      "Handcrafted in Tennessee, installed by our own crew. We handle everything from delivery to final walkthrough, on schedule, every time.",
    dark: false,
  },
];

export default function Process() {
  return (
    <section
      id="process"
      style={{ backgroundColor: "var(--cream)", padding: "6rem 0" }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2.5rem",
          textAlign: "center",
          marginBottom: "4rem",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.62rem",
            fontWeight: 400,
            color: "var(--brass)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          How It Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
            color: "var(--charcoal)",
            lineHeight: 1.1,
          }}
        >
          Simple process.{" "}
          <em style={{ fontStyle: "italic", color: "var(--brass)" }}>
            Exceptional result.
          </em>
        </motion.h2>
      </div>

      {/* Step cards */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2.5rem",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "1.5px", backgroundColor: "var(--cream-dark)" }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                backgroundColor: step.dark ? "var(--charcoal)" : "var(--cream)",
                padding: "3rem 2.5rem 3.5rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  width: "2rem",
                  height: "2px",
                  backgroundColor: "var(--brass)",
                  marginBottom: "2rem",
                }}
              />

              {/* Step number */}
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "4rem",
                  fontWeight: 300,
                  color: step.dark ? "var(--brass)" : "var(--brass)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.75rem",
                }}
              >
                {step.number}
              </p>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: step.dark ? "white" : "var(--charcoal)",
                  lineHeight: 1.2,
                  marginBottom: step.timing ? "0.5rem" : "1rem",
                }}
              >
                {step.title}
              </h3>

              {/* Timing badge */}
              {step.timing && (
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    color: "var(--brass)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  {step.timing}
                </p>
              )}

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "0.88rem",
                  color: step.dark
                    ? "rgba(255,255,255,0.6)"
                    : "var(--text-muted)",
                  lineHeight: 1.8,
                  marginTop: "auto",
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
