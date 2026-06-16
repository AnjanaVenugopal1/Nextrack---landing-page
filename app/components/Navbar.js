"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "72px",
          display: "flex",
          alignItems: "center",
          background: isScrolled
            ? "rgba(8, 0, 18, 0.85)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(18px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
          transition: "all 0.25s ease",
        }}
      >
        {/* ===== Constrained container ===== */}
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto",
            padding: "0 var(--section-px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="#home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <div style={{ width: 36, height: 36, position: "relative" }}>
              <Image
                src="/logo.png"
                alt="Nextrack Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                letterSpacing: "-0.4px",
                color: "#f4f4f5",
              }}
            >
              Nextrack
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              gap: "36px",
              alignItems: "center",
            }}
          >
            {["About", "Features", "Preview", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#e5e7eb",
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* ===== Mobile menu ===== */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            background: "rgba(28,5,11,0.96)",
            backdropFilter: "blur(18px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            zIndex: 40,
            padding: "24px 24px 32px",
          }}
        >
          {["About", "Features", "Preview", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                padding: "14px 0",
                fontSize: "1.05rem",
                fontWeight: 500,
                color: "#e5e7eb",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* ===== Styles ===== */}
      <style jsx>{`
        .nav-link {
          position: relative;
          font-size: 0.95rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #d4af37, #ffffff);
          transition: width 0.25s ease;
          border-radius: 2px;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        @media (max-width: 1024px) {
          nav > div {
            padding: 0 32px !important;
          }
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}