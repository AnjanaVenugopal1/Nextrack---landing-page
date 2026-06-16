"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ClipboardList,
  Users,
  ShieldCheck,
  BarChart2,
} from "lucide-react";

const slides = [
  {
    id: 0,
    label: "Task Management",
    title: "Create, Assign,\nTrack. Done.",
    description:
      "Admins create and assign tasks to any user. Team members update status as work progresses - no emails, no guesswork.",
    accent: "#d4af37",
    icon: ClipboardList,
  },
  {
    id: 1,
    label: "User & Role Management",
    title: "The Right Access\nFor Every Person.",
    description:
      "Admins manage users and assign roles with specific permissions. Access is controlled and consistent across the workspace.",
    accent: "#ebd076",
    icon: Users,
  },
  {
    id: 2,
    label: "Security",
    title: "MFA On.\nWorkspace Locked.",
    description:
      "Multi-factor authentication protects every account. Only verified users get access - no exceptions.",
    accent: "#fadb5f",
    icon: ShieldCheck,
  },
  {
    id: 3,
    label: "Analytics",
    title: "See How Your\nTeam Is Doing.",
    description:
      "Analytics show task progress across users and teams so nothing gets stuck and deadlines stay on track.",
    accent: "#ffffff",
    icon: BarChart2,
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const glowRef = useRef(null);

  const goTo = useCallback(
    (idx) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 320);
    },
    [animating, current]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % slides.length);
        setAnimating(false);
      }, 320);
    }, 3500);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#1c050b",
      }}
    >
      {/* Background images */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {["/images/img1.png", "/images/img2.png", "/images/img4.png"].map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            style={{
              objectFit: "cover",
              filter: "blur(2px) saturate(110%) brightness(0.85)",
              opacity: current % 3 === i ? 0.55 : 0,
              transform: current % 3 === i ? "scale(1.06)" : "scale(1)",
              transition: "opacity 1.6s ease-in-out, transform 10s ease-out",
            }}
          />
        ))}
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(28,5,11,0.55) 0%, rgba(28,5,11,0.82) 55%, rgba(28,5,11,0.97) 100%)",
          }}
        />
        {/* Noise */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Parallax accent glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "5%",
          left: "-15%",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background: slide.accent,
          opacity: 0.055,
          filter: "blur(130px)",
          zIndex: 0,
          transition: "background 1s ease, transform 0.12s ease-out",
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 var(--section-px)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "620px", width: "100%" }}>

          {/* Section label */}

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 5vw, 4.6rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#f4f4f5",
              marginBottom: "28px",
              whiteSpace: "pre-line",
              letterSpacing: "-0.03em",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.32s 0.04s, transform 0.32s 0.04s",
            }}
          >
            {slide.title.split("\n")[0]}
            {"\n"}
            <span style={{ color: slide.accent }}>
              {slide.title.split("\n")[1]}
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "#9f9fa8",
              maxWidth: "500px",
              lineHeight: 1.75,
              marginBottom: "44px",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.32s 0.08s, transform 0.32s 0.08s",
            }}
          >
            {slide.description}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="#preview"
              style={{
                padding: "14px 34px",
                borderRadius: "10px",
                background: slide.accent,
                color: "#1c050b",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.95rem",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              See it Live <ArrowRight size={16} />
            </Link>

            <Link
              href="#contact"
              style={{
                padding: "14px 34px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#d4d4d8",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.95rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.09)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
              }
            >
              Get in Touch
            </Link>
          </div>

          {/* Slide dots */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginTop: "52px",
            }}
          >
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: current === i ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background:
                    current === i ? slide.accent : "rgba(255,255,255,0.18)",
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
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .hero-grid {
            padding-top: 100px !important;
            padding-bottom: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}