"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Users, Target } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    accent: "#d4af37",
    accentDim: "rgba(212,175,55,0.1)",
    title: "Total Security",
    body: "Every employee must be verified by an admin before accessing the workspace, ensuring complete data integrity from day one.",
    bgImage: "/images/img9.jpg",
  },
  {
    icon: Users,
    accent: "#ebd076",
    accentDim: "rgba(235,208,118,0.1)",
    title: "Seamless Teamwork",
    body: "Assign tasks to individuals or entire roles and collaborate instantly using the built-in live chat within a unified interface.",
    bgImage: "/images/img10.jpg",
  },
  {
    icon: Target,
    accent: "#fadb5f",
    accentDim: "rgba(250,219,95,0.1)",
    title: "Laser Focus",
    body: "Cut noise by categorising tasks by priority. Your team always knows what deserves attention right now.",
    bgImage: "/images/img11.jpg",
  },
];

export default function About() {
  const sectionRef = useRef(null);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "120px 0 100px",
        background: "#1c050b",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Right-side glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-15%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "#d4af37",
          opacity: 0.04,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 var(--section-px)" }}
        className="about-container"
      >
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "72px", maxWidth: "640px" }}>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f4f4f5",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            One hub.<br />
            <span style={{ color: "#d4af37" }}>Zero workplace chaos.</span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#71717a",
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            Nextrack brings role-based access, priority task boards, and
            real-time communication into a single secure platform designed for
            teams that need to stay highly organized.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
          className="about-grid"
        >
          {pillars.map(({ icon: Icon, accent, accentDim, title, body, bgImage }, idx) => (
            <div
              key={title}
              className={`reveal delay-${idx + 1}`}
              style={{
                padding: "40px 36px",
                borderRadius: "20px",
                background: "rgba(15,15,30,0.6)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                transition:
                  "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${accent}44`;
                e.currentTarget.style.boxShadow = `0 0 40px ${accent}14, 0 16px 40px rgba(0,0,0,0.4)`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url('${bgImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(4px) brightness(0.6)",
                  opacity: 0.5,
                  zIndex: 0,
                }}
              />
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: accentDim,
                    border: `1px solid ${accent}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "28px",
                  }}
                >
                  <Icon size={26} color={accent} />
                </div>
                <div
                  style={{
                    width: "28px",
                    height: "2px",
                    background: accent,
                    borderRadius: "2px",
                    marginBottom: "20px",
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#e4e4e7",
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#71717a", lineHeight: 1.7 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
