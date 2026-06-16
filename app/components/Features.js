"use client";

import { useEffect, useRef } from "react";
import { Shield, LayoutDashboard, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    accent: "#d4af37",
    accentDim: "rgba(212,175,55,0.15)",
    title: "Admin Approvals",
    front: "Only verified employees get in.",
    back: "A secure verification flow ensures only approved employees access your workspace. Reject or approve incoming registrations with a single action — and keep a full audit trail.",
  },
  {
    icon: LayoutDashboard,
    accent: "#ebd076",
    accentDim: "rgba(235,208,118,0.15)",
    title: "Dynamic Roles",
    front: "Permissions that match your org.",
    back: "Create custom roles like Manager or Editor and assign specific permissions across your entire organization. Changes propagate instantly — no re-login required.",
  },
  {
    icon: Zap,
    accent: "#fadb5f",
    accentDim: "rgba(250,219,95,0.15)",
    title: "Priority Tasking",
    front: "High, Medium, Low — crystal clear.",
    back: "Filter and manage tasks by priority tier to keep your team focused on what moves the needle. Smart ordering surfaces the most critical work at the top.",
  },
];

export default function Features() {
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
      id="features"
      ref={sectionRef}
      style={{
        padding: "120px 0 100px",
        background: "#1c050b",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "#ebd076",
          opacity: 0.05,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 var(--section-px)" }}
        className="feat-container"
      >
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "72px", maxWidth: "560px" }}>

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
            Everything your team<br />
            <span style={{ color: "#ebd076" }}>needs to ship faster.</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#71717a", lineHeight: 1.75, fontWeight: 300 }}>
            Hover each card to see what's inside.
          </p>
        </div>

        {/* Flip cards */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
          className="feat-grid"
        >
          {features.map(({ icon: Icon, accent, accentDim, title, front, back }, idx) => (
            <div key={title} className={`flip-wrap reveal-scale delay-${idx + 1}`}>
              <div className="flip-inner">
                {/* FRONT */}
                <div
                  className="flip-face flip-front"
                  style={{
                    padding: "36px 28px",
                    borderRadius: "20px",
                    background: "#240b17",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "14px",
                      background: accentDim,
                      border: `1px solid ${accent}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <Icon size={24} color={accent} />
                  </div>
                  <div
                    style={{
                      width: "24px",
                      height: "2px",
                      background: accent,
                      borderRadius: "2px",
                      marginBottom: "18px",
                      boxShadow: `0 0 8px ${accent}`,
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#e4e4e7",
                      marginBottom: "10px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#52525b", lineHeight: 1.6, marginBottom: "20px" }}>
                    {front}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: accent, marginTop: "auto", opacity: 0.7 }}>
                    Hover to learn more →
                  </p>
                </div>

                {/* BACK */}
                <div
                  className="flip-face flip-back"
                  style={{
                    padding: "36px 28px",
                    borderRadius: "20px",
                    background: "#240b17",
                    border: `1px solid ${accent}55`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: `inset 0 0 60px ${accent}0a`,
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "2px",
                      background: accent,
                      borderRadius: "2px",
                      marginBottom: "20px",
                      boxShadow: `0 0 8px ${accent}`,
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: accent,
                      marginBottom: "16px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: "0.92rem", color: "#d4d4d8", lineHeight: 1.7 }}>{back}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .flip-wrap {
          perspective: 1200px;
          height: 300px;
        }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.6s ease;
        }
        .flip-wrap:hover .flip-inner {
          transform: rotateY(180deg);
          box-shadow: 0 0 35px rgba(212, 175, 55, 0.4);
        }
        .flip-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-back {
          transform: rotateY(180deg);
        }
        @media (max-width: 1024px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .flip-wrap { height: 280px; }
        }
        @media (max-width: 640px) {
          .feat-container { padding: 0 24px !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
          .flip-wrap { height: 260px; }
        }
      `}</style>
    </section>
  );
}
