"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { sendEmail } from "../actions/sendEmail";
import { Send, Loader2 } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);
  const textareaRef = useRef(null);
  const sectionRef = useRef(null);

  /* Auto-resize textarea */
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.max(el.scrollHeight, 120) + "px";
  }, []);

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

  async function handleSubmit(formData) {
    setStatus("loading");
    const result = await sendEmail(formData);
    setStatus(result.success ? "success" : "error");
  }

  const inputStyle = (name) => ({
    width: "100%",
    padding: "16px 20px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${focused === name ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.06)"}`,
    color: "#f4f4f5",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    boxShadow: focused === name ? "0 0 0 4px rgba(212,175,55,0.15)" : "inset 0 2px 4px rgba(0,0,0,0.2)",
    fontFamily: "inherit",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: "120px 0 100px",
        background: "#1c050b",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "#d4af37",
          opacity: 0.06,
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      {/* Right glow */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "#ebd076",
          opacity: 0.05,
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 var(--section-px)" }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: "48px", textAlign: "center" }}>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f4f4f5",
              lineHeight: 1.1,
              marginBottom: "16px",
              marginTop: "4px",
            }}
          >
            Questions? Ideas?<br />
            <span style={{ color: "#d4af37" }}>We'd love to hear from you.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#71717a", lineHeight: 1.7 }}>
            Request a feature, ask about access, or just say hello.
          </p>
        </div>

        {/* Card */}
        <div
          className="reveal delay-1"
          style={{
            padding: "48px 44px",
            borderRadius: "24px",
            background: "linear-gradient(145deg, rgba(30, 10, 20, 0.4) 0%, rgba(15, 5, 10, 0.2) 100%)",
            border: "1px solid rgba(255,255,255,0.04)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
          }}
        >
          <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
              className="contact-row"
            >
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.82rem", fontWeight: 600, color: "#a1a1aa", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  style={inputStyle("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.82rem", fontWeight: 600, color: "#a1a1aa", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@company.com"
                  style={inputStyle("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.82rem", fontWeight: 600, color: "#a1a1aa", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Message
              </label>
              <textarea
                ref={textareaRef}
                name="message"
                required
                placeholder="How can we help?"
                rows={4}
                style={{
                  ...inputStyle("message"),
                  resize: "none",
                  minHeight: "120px",
                  overflow: "hidden",
                  lineHeight: 1.65,
                  transition: "border-color 0.2s, height 0.15s ease",
                }}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused("")}
                onInput={autoResize}
              />
            </div>

            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />

            <button
              type="submit"
              disabled={status === "loading"}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "14px",
                borderRadius: "10px",
                background: status === "loading" ? "rgba(212,175,55,0.5)" : "#d4af37",
                color: "#1c050b",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                opacity: btnHovered && status !== "loading" ? 0.88 : 1,
                transform: btnHovered && status !== "loading" ? "translateY(-1px)" : "translateY(0)",
                transition: "opacity 0.2s, transform 0.2s",
                letterSpacing: "-0.01em",
              }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                  Sending…
                </>
              ) : (
                <>
                  <span
                    style={{
                      display: "inline-flex",
                      animation: btnHovered ? "wiggle 0.5s ease-in-out" : "none",
                    }}
                  >
                    <Send size={18} />
                  </span>
                  Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "10px",
                  background: "rgba(250,219,95,0.08)",
                  border: "1px solid rgba(250,219,95,0.25)",
                  color: "#fadb5f",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                ✓ Message sent. We will get back to you shortly.
              </div>
            )}

            {status === "error" && (
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "10px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#f87171",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes wiggle {
          0%   { transform: rotate(0deg) translateX(0); }
          15%  { transform: rotate(-18deg) translateX(-2px); }
          35%  { transform: rotate(18deg) translateX(2px); }
          55%  { transform: rotate(-12deg) translateX(-1px); }
          75%  { transform: rotate(10deg) translateX(1px); }
          90%  { transform: rotate(-4deg); }
          100% { transform: rotate(0deg) translateX(0); }
        }
        @media (max-width: 640px) {
          .contact-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
