"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/images/slide1.png',
    label: 'Dashboard',
    title: 'Your Task Board at a Glance',
    description: 'Every task assigned to you, right on the dashboard. Filter by status, see priorities, and know exactly what needs your attention today.',
    accent: '#d4af37',
  },
  {
    image: '/images/slide2.png',
    label: 'Role Management',
    title: 'Define Roles & Permissions',
    description: 'Create custom roles with specific permissions and assign them across your team. Access is always intentional — never accidental.',
    accent: '#ebd076',
  },
  {
    image: '/images/slide3.png',
    label: 'Task Approvals',
    title: 'Approve & Control Tasks',
    description: 'Admins review and approve tasks before they go live. Nothing moves forward without the right sign-off — full control at every step.',
    accent: '#fadb5f',
  },
  {
    image: '/images/slide4.png',
    label: 'User Management',
    title: 'Manage Your Entire Team',
    description: 'Add users, assign roles, verify accounts, and control who has access — all from one clean admin screen.',
    accent: '#d4af37',
  },
  {
    image: '/images/slide5.png',
    label: 'Analytics — Overview',
    title: 'The Big Picture, Instantly',
    description: 'A high-level summary of all tasks across the workspace. Completed, in-progress, and pending — broken down at a glance.',
    accent: '#ebd076',
  },
  {
    image: '/images/slide6.png',
    label: 'Analytics — By User',
    title: 'See Who\'s Doing What',
    description: 'Drill into per-user task data to understand individual workloads and completion rates. Spot bottlenecks before they become problems.',
    accent: '#fadb5f',
  },
  {
    image: '/images/slide7.png',
    label: 'Analytics — Trends',
    title: 'Track Progress Over Time',
    description: 'Visualise task trends across your team over days and weeks. Keep momentum high and deadlines firmly on track.',
    accent: '#ffffff',
  },
];

const INTERVAL = 4500;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
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
    progressRef.current.style.transition = 'none';
    progressRef.current.style.width = '0%';
    if (paused) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!progressRef.current) return;
        progressRef.current.style.transition = `width ${INTERVAL}ms linear`;
        progressRef.current.style.width = '100%';
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [current, paused]);

  const slide = slides[current];

  return (
    <section
      id="preview"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
        background: '#1c050b',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '45vw',
        height: '45vw',
        borderRadius: '50%',
        background: slide.accent,
        opacity: 0.05,
        filter: 'blur(100px)',
        transition: 'background 0.8s',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--section-px)' }}>

        {/* Section header */}
        <div style={{ marginBottom: '48px' }}>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#f4f4f5',
            lineHeight: 1.1,
            marginTop: '8px',
          }}>
            See Nextrack <span style={{ color: '#d4af37' }}>in action.</span>
          </h2>
        </div>

        {/* Main carousel card */}
        <div
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            border: `1px solid ${slide.accent}22`,
            boxShadow: `0 0 80px ${slide.accent}12`,
            transition: 'border-color 0.6s, box-shadow 0.6s',
            background: '#0d0208',
            position: 'relative',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Image area */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>

            {slides.map((s, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: current === i ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                  zIndex: current === i ? 1 : 0,
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 1280px"
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Left arrow */}
            <button
              onClick={() => go(current - 1)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(28,5,11,0.75)',
                border: `1px solid ${slide.accent}55`,
                color: slide.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${slide.accent}22`;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(28,5,11,0.75)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => go(current + 1)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(28,5,11,0.75)',
                border: `1px solid ${slide.accent}55`,
                color: slide.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${slide.accent}22`;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(28,5,11,0.75)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Progress bar */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '3px',
              background: 'rgba(255,255,255,0.07)',
              zIndex: 10,
            }}>
              <div
                ref={progressRef}
                style={{
                  height: '100%',
                  width: '0%',
                  background: slide.accent,
                  boxShadow: `0 0 8px ${slide.accent}`,
                  transition: `background 0.5s`,
                }}
              />
            </div>
          </div>

          {/* Info bar below image */}
          <div style={{
            padding: '28px 36px',
            background: '#190408',
            borderTop: `1px solid ${slide.accent}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            transition: 'border-color 0.5s',
          }}>
            {/* Left: label + title + description */}
            <div style={{ flex: 1, minWidth: '260px' }}>

              <h3 style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                fontWeight: 800,
                color: '#f4f4f5',
                letterSpacing: '-0.02em',
                marginBottom: '6px',
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(6px)' : 'translateY(0)',
                transition: 'opacity 0.3s 0.04s, transform 0.3s 0.04s',
              }}>
                {slide.title}
              </h3>
              <p style={{
                fontSize: '0.88rem',
                color: '#71717a',
                lineHeight: 1.65,
                maxWidth: '540px',
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(6px)' : 'translateY(0)',
                transition: 'opacity 0.3s 0.08s, transform 0.3s 0.08s',
              }}>
                {slide.description}
              </p>
            </div>

            {/* Right: dots + counter */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    title={slides[i].label}
                    style={{
                      width: current === i ? '24px' : '7px',
                      height: '7px',
                      borderRadius: '4px',
                      background: current === i ? slide.accent : 'rgba(255,255,255,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.35s ease',
                      boxShadow: current === i ? `0 0 8px ${slide.accent}88` : 'none',
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#3f3f46' }}>
                0{current + 1} / 0{slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}