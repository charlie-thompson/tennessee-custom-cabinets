"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizData {
  roomType: string;
  style: string;
  timeline: string;
  budget: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY: QuizData = {
  roomType: "", style: "", timeline: "", budget: "",
  firstName: "", lastName: "", email: "", phone: "", message: "",
};

// ─── Step config ──────────────────────────────────────────────────────────────

const STEP_1 = {
  question: "What room are we building for?",
  field: "roomType" as const,
  cols: 3,
  options: [
    { label: "Kitchen",   emoji: "🍳" },
    { label: "Bathroom",  emoji: "🚿" },
    { label: "Closet",    emoji: "👗" },
    { label: "Laundry",   emoji: "🧺" },
    { label: "Office",    emoji: "💼" },
    { label: "Other",     emoji: "✨" },
  ],
};

const STEP_2 = {
  question: "What style speaks to you?",
  field: "style" as const,
  cols: 2,
  options: [
    { label: "Modern / Transitional" },
    { label: "Farmhouse / Shaker" },
    { label: "Traditional" },
    { label: "Not sure yet" },
  ],
};

const STEP_3 = {
  question: "What's your project timeline?",
  field: "timeline" as const,
  cols: 2,
  options: [
    { label: "ASAP" },
    { label: "3–6 months" },
    { label: "6+ months" },
    { label: "Just exploring" },
  ],
};

const STEP_4 = {
  question: "What's your approximate budget?",
  field: "budget" as const,
  cols: 2,
  options: [
    { label: "$10k–$25k" },
    { label: "$25k–$50k" },
    { label: "$50k+" },
    { label: "Not sure" },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function OptionCard({
  label,
  emoji,
  isSelected,
  onClick,
}: {
  label: string;
  emoji?: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = isSelected || hovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: emoji ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        padding: emoji ? "1.5rem 1rem" : "1.1rem 1.5rem",
        border: `1px solid ${active ? "var(--brass)" : "rgba(255,255,255,0.1)"}`,
        backgroundColor: isSelected
          ? "rgba(181,146,76,0.12)"
          : hovered
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        cursor: "pointer",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
        textAlign: "center",
        gap: emoji ? "0.6rem" : 0,
        width: "100%",
      }}
    >
      {emoji && (
        <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>{emoji}</span>
      )}
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: emoji ? "1rem" : "1.15rem",
          fontWeight: 300,
          color: isSelected ? "var(--brass-light)" : "rgba(255,255,255,0.88)",
          letterSpacing: "0.01em",
          lineHeight: 1.2,
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function FormField({
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.58rem",
          fontWeight: 500,
          color: focused ? "var(--brass)" : "rgba(255,255,255,0.45)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          transition: "color 0.2s ease",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--brass)", marginLeft: "2px" }}>*</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "var(--brass)" : "rgba(255,255,255,0.18)"}`,
          color: "white",
          fontFamily: "var(--font-sans)",
          fontSize: "0.92rem",
          fontWeight: 300,
          padding: "0.6rem 0",
          outline: "none",
          width: "100%",
          transition: "border-color 0.2s ease",
        }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LeadQuiz() {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const totalSteps = 5;

  const set = (field: keyof QuizData) => (value: string) =>
    setQuizData((prev) => ({ ...prev, [field]: value }));

  const select = (field: keyof QuizData, value: string) => {
    setQuizData((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => setStep((s) => s + 1), 320);
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const isFormValid = () => {
    const { firstName, lastName, email, phone } = quizData;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return firstName.trim() && lastName.trim() && emailOk && phone.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setFormError("Please fill in all required fields with a valid email.");
      return;
    }
    setFormError("");
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step renderers ─────────────────────────────────────────────────────────

  const renderOptions = (
    config: typeof STEP_1 | typeof STEP_2 | typeof STEP_3 | typeof STEP_4
  ) => (
    <div>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 300,
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          color: "white",
          lineHeight: 1.2,
          marginBottom: "2rem",
        }}
      >
        {config.question}
      </h3>
      <div
        className={`grid gap-3 ${config.cols === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
      >
        {config.options.map((opt) => (
          <OptionCard
            key={opt.label}
            label={opt.label}
            emoji={"emoji" in opt ? opt.emoji : undefined}
            isSelected={quizData[config.field] === opt.label}
            onClick={() => select(config.field, opt.label)}
          />
        ))}
      </div>
    </div>
  );

  const renderContactForm = () => (
    <form onSubmit={handleSubmit} noValidate>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 300,
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          color: "white",
          lineHeight: 1.2,
          marginBottom: "0.5rem",
        }}
      >
        Almost there.
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: "0.88rem",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "2.25rem",
        }}
      >
        We'll reach out within one business day to schedule your free
        in-home consultation.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.75rem" }}>
          <FormField label="First Name" value={quizData.firstName} onChange={set("firstName")} required />
          <FormField label="Last Name"  value={quizData.lastName}  onChange={set("lastName")}  required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.75rem" }}>
          <FormField label="Email"  type="email" value={quizData.email} onChange={set("email")} required />
          <FormField label="Phone"  type="tel"   value={quizData.phone} onChange={set("phone")} required placeholder="615-555-0100" />
        </div>
        <FormField
          label="Anything else we should know? (optional)"
          value={quizData.message}
          onChange={set("message")}
        />

        {formError && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "#f87171",
            }}
          >
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            backgroundColor: loading ? "rgba(181,146,76,0.5)" : "var(--brass)",
            color: "var(--charcoal)",
            border: "none",
            padding: "1rem 2.5rem",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            transition: "background-color 0.22s ease",
            marginTop: "0.25rem",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = "var(--brass-light)";
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = "var(--brass)";
          }}
        >
          {loading ? "Sending…" : "Request My Free Consultation"}
        </button>
      </div>
    </form>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: "center", padding: "2rem 0" }}
    >
      <CheckCircle
        size={48}
        style={{ color: "var(--brass)", margin: "0 auto 1.5rem", display: "block" }}
      />
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 300,
          fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          color: "white",
          lineHeight: 1.15,
          marginBottom: "1rem",
        }}
      >
        Thank you, {quizData.firstName}.
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.75,
          maxWidth: "400px",
          margin: "0 auto 2rem",
        }}
      >
        We'll be in touch within one business day to schedule your free
        in-home consultation.
      </p>
      <a
        href="tel:9314468034"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.7rem",
          fontWeight: 500,
          color: "var(--brass)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        Or call us now: 931.446.8034
      </a>
    </motion.div>
  );

  const renderStep = () => {
    switch (step) {
      case 1: return renderOptions(STEP_1);
      case 2: return renderOptions(STEP_2);
      case 3: return renderOptions(STEP_3);
      case 4: return renderOptions(STEP_4);
      case 5: return renderContactForm();
      default: return null;
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section
      id="consultation"
      style={{ position: "relative", backgroundColor: "var(--charcoal)" }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/projects/kitchen-08.JPG"
          alt=""
          fill
          quality={60}
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundColor: "rgba(18,15,13,0.90)",
        }}
      />

      {/* Quiz */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "640px",
          margin: "0 auto",
          padding: "6rem 2rem 7rem",
        }}
      >
        {/* Section eyebrow */}
        {!submitted && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.62rem",
              fontWeight: 400,
              color: "var(--brass)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Free Consultation
          </p>
        )}

        {submitted ? (
          renderSuccess()
        ) : (
          <>
            {/* Progress */}
            <div style={{ marginBottom: "2.5rem" }}>
              {/* Bar track */}
              <div
                style={{
                  height: "2px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  width: "100%",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(step / totalSteps) * 100}%`,
                    backgroundColor: "var(--brass)",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              {/* Back + step counter */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {step > 1 ? (
                  <button
                    onClick={goBack}
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.45)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      padding: 0,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                    }
                  >
                    <ChevronLeft size={14} /> Back
                  </button>
                ) : (
                  <div />
                )}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Step {step} of {totalSteps}
                </p>
              </div>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}
