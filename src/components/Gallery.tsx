"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  file: string;
  category: "Kitchen" | "Bathroom" | "Closet" | "Laundry";
  title: string;
  h: number; // display height in px for masonry variety
}

const IMAGES: GalleryImage[] = [
  { file: "kitchen-01.JPG",      category: "Kitchen",   title: "Craftsman Kitchen Suite",      h: 300 },
  { file: "kitchen-02.JPG",      category: "Kitchen",   title: "White Shaker Kitchen",          h: 380 },
  { file: "kitchen-03.JPG",      category: "Kitchen",   title: "Modern Farmhouse Kitchen",      h: 260 },
  { file: "kitchen-04.JPG",      category: "Kitchen",   title: "Custom Island Kitchen",         h: 420 },
  { file: "kitchen-05.JPG",      category: "Kitchen",   title: "Two-Tone Kitchen Design",       h: 300 },
  { file: "kitchen06.JPG",       category: "Kitchen",   title: "Classic Painted Kitchen",       h: 340 },
  { file: "kitchen-07.JPG",      category: "Kitchen",   title: "Transitional Kitchen",          h: 280 },
  { file: "kitchen-08.JPG",      category: "Kitchen",   title: "Inset Door Kitchen",            h: 380 },
  { file: "kitchen-09.JPG",      category: "Kitchen",   title: "Moody Dark Kitchen",            h: 320 },
  { file: "kitchen-10.JPG",      category: "Kitchen",   title: "Open Concept Kitchen",          h: 260 },
  { file: "kitchen-11.JPG",      category: "Kitchen",   title: "Butler's Pantry Kitchen",       h: 400 },
  { file: "kitchen-12.JPG",      category: "Kitchen",   title: "Full-Height Cabinet Kitchen",   h: 300 },
  { file: "kitchen-dining-01.JPG", category: "Kitchen", title: "Kitchen & Dining Built-Ins",   h: 360 },
  { file: "kitchen-dining-02.JPG", category: "Kitchen", title: "Dining Room Cabinetry",        h: 280 },
  { file: "kitchen-pantry-01.JPG", category: "Kitchen", title: "Walk-In Pantry System",        h: 380 },
  { file: "kitchen-pantry-02.JPG", category: "Kitchen", title: "Custom Pantry Storage",        h: 320 },
  { file: "coffee-bar-01.JPG",   category: "Kitchen",   title: "Custom Coffee Bar",             h: 340 },
  { file: "bathroom-01.JPG",     category: "Bathroom",  title: "Primary Bath Vanity",           h: 420 },
  { file: "bathroom-02.JPG",     category: "Bathroom",  title: "Double Vanity Suite",           h: 360 },
  { file: "bathroom-03.JPG",     category: "Bathroom",  title: "Guest Bath Cabinetry",          h: 300 },
  { file: "closet-01.JPG",       category: "Closet",    title: "Custom Reach-In Closet",        h: 440 },
  { file: "laundry-01.JPG",      category: "Laundry",   title: "Laundry Room Built-Ins",        h: 320 },
  { file: "laundry-02.JPG",      category: "Laundry",   title: "Custom Laundry Cabinetry",      h: 280 },
];

const FILTERS = ["All", "Kitchen", "Bathroom", "Closet", "Laundry"] as const;
type Filter = (typeof FILTERS)[number];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered =
    activeFilter === "All"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeFilter);

  const previewCount = isMobile ? 4 : 6;
  const visible = expanded ? filtered : filtered.slice(0, previewCount);
  const hasMore = filtered.length > previewCount;

  // Reset expansion on filter change
  useEffect(() => {
    setExpanded(false);
  }, [activeFilter]);

  // Keyboard nav + scroll lock for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i !== null ? (i - 1 + filtered.length) % filtered.length : null
        );
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filtered.length]);

  const lightboxImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <section
        id="the-craft"
        style={{
          backgroundColor: "var(--cream)",
          padding: "6rem 0 5rem",
        }}
      >
        {/* Section header */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2.5rem",
          }}
        >
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                fontWeight: 400,
                color: "var(--brass)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              The Craft
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                color: "var(--charcoal)",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Discover the art of{" "}
              <em style={{ fontStyle: "italic", color: "var(--brass)" }}>
                Amish craftsmanship.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "1rem",
                color: "var(--text-muted)",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Every project is built by hand in the USA, designed to
              fit your home and last a lifetime.
            </p>
          </div>

          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.25rem",
              marginBottom: "3rem",
              flexWrap: "wrap",
            }}
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.68rem",
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.55rem 1.4rem",
                    border: isActive
                      ? "1px solid var(--brass)"
                      : "1px solid transparent",
                    backgroundColor: isActive ? "var(--brass)" : "transparent",
                    color: isActive ? "var(--charcoal)" : "var(--text-muted)",
                    cursor: "pointer",
                    transition:
                      "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--charcoal)";
                      e.currentTarget.style.borderColor = "var(--cream-dark)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3"
              style={{ columnGap: "10px" }}
            >
              {visible.map((img, i) => (
                <div
                  key={img.file}
                  style={{
                    position: "relative",
                    breakInside: "avoid",
                    marginBottom: "10px",
                    cursor: "pointer",
                    overflow: "hidden",
                    height: `${img.h}px`,
                  }}
                  onClick={() => setLightboxIndex(i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    src={`/images/projects/${img.file}`}
                    alt={img.title}
                    fill
                    quality={80}
                    className="object-cover"
                    style={{
                      transform:
                        hoveredIndex === i ? "scale(1.04)" : "scale(1)",
                      transition: "transform 0.55s ease",
                    }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Hover overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(28,25,23,0.88) 0%, rgba(28,25,23,0.3) 50%, transparent 100%)",
                      opacity: hoveredIndex === i ? 1 : 0,
                      transition: "opacity 0.35s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.25rem 1.1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.58rem",
                        fontWeight: 500,
                        color: "var(--brass)",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        marginBottom: "0.3rem",
                        display: "block",
                      }}
                    >
                      {img.category}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.15rem",
                        fontWeight: 300,
                        color: "var(--cream)",
                        lineHeight: 1.2,
                        display: "block",
                      }}
                    >
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Expand / collapse controls */}
          {hasMore && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              {!expanded ? (
                <button
                  onClick={() => setExpanded(true)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.88)",
                    backgroundColor: "var(--charcoal)",
                    border: "1px solid var(--charcoal)",
                    padding: "0.9rem 2.25rem",
                    cursor: "pointer",
                    transition: "background-color 0.22s ease, border-color 0.22s ease, color 0.22s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--brass)";
                    e.currentTarget.style.borderColor = "var(--brass)";
                    e.currentTarget.style.color = "var(--charcoal)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--charcoal)";
                    e.currentTarget.style.borderColor = "var(--charcoal)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.88)";
                  }}
                >
                  View All {filtered.length} Projects
                </button>
              ) : (
                <button
                  onClick={() => setExpanded(false)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.68rem",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(0,0,0,0.12)",
                    padding: "0.75rem 2rem",
                    cursor: "pointer",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--charcoal)";
                    e.currentTarget.style.borderColor = "var(--charcoal)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                  }}
                >
                  Show Less
                </button>
              )}
            </div>
          )}

          {/* Bottom CTA */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            <Link
              href="#consultation"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brass)",
                border: "1px solid var(--brass)",
                padding: "1rem 2.5rem",
                textDecoration: "none",
                display: "inline-block",
                transition:
                  "background-color 0.22s ease, color 0.22s ease",
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
              Begin Your Custom Project
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              backgroundColor: "rgba(18,15,13,0.96)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Image container - stops propagation so clicking image doesn't close */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "relative",
                width: "min(90vw, 1100px)",
                height: "min(82vh, 800px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/images/projects/${lightboxImage.file}`}
                alt={lightboxImage.title}
                fill
                quality={90}
                style={{ objectFit: "contain" }}
                sizes="90vw"
              />

              {/* Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-2.75rem",
                  left: 0,
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    color: "var(--brass)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {lightboxImage.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "rgba(250,247,242,0.8)",
                  }}
                >
                  {lightboxImage.title}
                </span>
              </div>

              {/* Counter */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-2.75rem",
                  right: 0,
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                }}
              >
                {lightboxIndex + 1} / {filtered.length}
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              style={{
                position: "fixed",
                top: "1.5rem",
                right: "1.75rem",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                padding: "4px",
                transition: "color 0.2s ease",
                zIndex: 101,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "white")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
              }
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + filtered.length) % filtered.length
                );
              }}
              aria-label="Previous image"
              style={{
                position: "fixed",
                left: "1.25rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(28,25,23,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s ease, color 0.2s ease",
                zIndex: 101,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--brass)";
                e.currentTarget.style.color = "var(--charcoal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(28,25,23,0.5)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % filtered.length);
              }}
              aria-label="Next image"
              style={{
                position: "fixed",
                right: "1.25rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(28,25,23,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s ease, color 0.2s ease",
                zIndex: 101,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--brass)";
                e.currentTarget.style.color = "var(--charcoal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(28,25,23,0.5)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
