"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/slide1.png",
    label: "Dashboard",
    title: "Your Task Board at a Glance",
    description:
      "Every task assigned to you, right on the dashboard. Filter by status, see priorities, and know exactly what needs your attention today.",
    accent: "#d4af37",
  },
  {
    id: 2,
    image: "/images/slide2.png",
    label: "Role Management",
    title: "Define Roles & Permissions",
    description:
      "Set up specific roles for your organization. Everyone gets exactly the access they need to do their jobs without seeing sensitive admin areas.",
    accent: "#ebd076",
  },
  {
    id: 3,
    image: "/images/slide3.png",
    label: "Task Approvals",
    title: "Approve & Control Tasks",
    description:
      "Managers can review and sign off on tasks before they are finalized, ensuring quality control across the board.",
    accent: "#fadb5f",
  },
  {
    id: 4,
    image: "/images/slide4.png",
    label: "User Management",
    title: "Manage Your Entire Team",
    description:
      "Add new team members, verify accounts, and update permissions from a single, easy-to-use directory.",
    accent: "#d4af37",
  },
  {
    id: 5,
    image: "/images/slide5.png",
    label: "Analytics Overview",
    title: "The Big Picture, Instantly",
    description:
      "See a top-level breakdown of what is done, what is in progress, and what needs immediate attention.",
    accent: "#ebd076",
  },
  {
    id: 6,
    image: "/images/slide6.png",
    label: "Analytics By User",
    title: "See Who is Doing What",
    description:
      "Look into individual performance metrics to balance workloads and help team members who might be stuck.",
    accent: "#fadb5f",
  },
  {
    id: 7,
    image: "/images/slide7.png",
    label: "Analytics Trends",
    title: "Track Progress Over Time",
    description:
      "Watch how your team's output trends over weeks or months to keep everyone on schedule.",
    accent: "#ffffff",
  },
];

const INTERVAL = 4500;

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  const go = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(((idx % slides.length) + slides.length) % slides.length);
      setAnimating(false);
    }, 300);
  };

  /* Auto-play */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  /* Progress bar */
  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.style.transition = "none";
    progressRef.current.style.width = "0%";
    if (paused) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!progressRef.current) return;
        progressRef.current.style.transition = `width ${INTERVAL}ms linear`;
        progressRef.current.style.width = "100%";
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [current, paused]);

  /* Scroll reveal */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    if (!els?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const slide = slides[current];

  return (
    <section
      id="preview"
      ref={sectionRef}
      style={{
        padding: "120px 0 100px",
        background: "#1c050b",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: slide.accent,
          opacity: 0.05,
          filter: "blur(100px)",
          transition: "background 0.8s",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 var(--section-px)" }}
        className="carousel-container"
      >
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "60px", maxWidth: "560px" }}>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f4f4f5",
              lineHeight: 1.1,
            }}
          >
            See Nextrack<br />
            <span style={{ color: "#d4af37" }}>in action.</span>
          </h2>
        </div>

        {/* Carousel layout */}
        <div
          className="carousel-grid reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "32px",
            alignItems: "center",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Image panel */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "16/9",
              background: "#0d0208",
              border: `1px solid ${slide.accent}22`,
              boxShadow: `0 0 60px ${slide.accent}14`,
              transition: "border-color 0.5s, box-shadow 0.5s",
            }}
          >
            {slides.map((s, i) => (
              <div
                key={s.id}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: current === i ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Arrows */}
            {[
              { dir: -1, side: "left", Icon: ChevronLeft },
              { dir: 1, side: "right", Icon: ChevronRight },
            ].map(({ dir, side, Icon }) => (
              <button
                key={side}
                onClick={() => go(current + dir)}
                style={{
                  position: "absolute",
                  top: "50%",
                  [side]: "16px",
                  transform: "translateY(-50%)",
                  zIndex: 5,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(28,5,11,0.72)",
                  border: `1px solid ${slide.accent}44`,
                  color: slide.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = `${slide.accent}22`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(28,5,11,0.72)")
                }
              >
                <Icon size={20} />
              </button>
            ))}

            {/* Progress bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "3px",
                background: "rgba(255,255,255,0.08)",
                width: "100%",
                zIndex: 6,
              }}
            >
              <div
                ref={progressRef}
                style={{
                  height: "100%",
                  background: slide.accent,
                  width: "0%",
                  boxShadow: `0 0 6px ${slide.accent}`,
                }}
              />
            </div>
          </div>

          {/* Text panel */}
          <div
            style={{
              padding: "36px 32px",
              borderRadius: "20px",
              background: "#240b17",
              border: `1px solid ${slide.accent}22`,
              boxShadow: `0 0 40px ${slide.accent}10`,
              transition: "border-color 0.5s, box-shadow 0.5s",
            }}
          >
            {/* Label */}


            <h3
              style={{
                fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#f4f4f5",
                marginBottom: "14px",
                lineHeight: 1.25,
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 0.3s ease 0.04s, transform 0.3s ease 0.04s",
              }}
            >
              {slide.title}
            </h3>

            <div
              style={{
                width: "24px",
                height: "2px",
                background: slide.accent,
                borderRadius: "2px",
                marginBottom: "14px",
                boxShadow: `0 0 8px ${slide.accent}`,
              }}
            />

            <p
              style={{
                fontSize: "0.9rem",
                color: "#71717a",
                lineHeight: 1.75,
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 0.3s ease 0.08s, transform 0.3s ease 0.08s",
              }}
            >
              {slide.description}
            </p>

            {/* Dots — two rows of 4+3 for 7 slides */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    title={slides[i].label}
                    style={{
                      width: current === i ? "24px" : "7px",
                      height: "7px",
                      borderRadius: "4px",
                      background:
                        current === i ? slide.accent : "rgba(255,255,255,0.15)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.35s ease",
                      boxShadow:
                        current === i ? `0 0 8px ${slide.accent}88` : "none",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "0.7rem", color: "#3f3f46", marginTop: "10px", display: "block" }}>
                0{current + 1} / 0{slides.length} - {slide.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .carousel-container { padding: 0 24px !important; }
          .carousel-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}