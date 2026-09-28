"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const GALLERY_IMAGES = [
  { src: "/mentor-graphic-design.png", label: "Graphic Design", sub: "GAA STUDIO" },
  { src: "/mentor-3d-motion.png", label: "3D & Motion", sub: "GAA STUDIO" },
  { src: "/about-students.png", label: "Studio Work", sub: "GAA STUDIO" },
  { src: "/mentor-film-poster-woman.png", label: "Film Poster", sub: "GAA STUDIO" },
  { src: "/mentor-uiux.png", label: "UI / UX Design", sub: "GAA STUDIO" },
  { src: "/mentor-motion-design-woman.png", label: "Motion VFX", sub: "GAA STUDIO" },
  { src: "/course-design.jpg", label: "AI Workflows", sub: "GAA STUDIO" },
  { src: "/mentor-marketing.png", label: "Creative Direction", sub: "GAA STUDIO" },
  { src: "/course-animation.jpg", label: "3D Animation", sub: "GAA STUDIO" },
  { src: "/gallery-showcase.jpg", label: "Exhibition Space", sub: "GAA STUDIO" },
  { src: "/mentorship-studio.jpg", label: "Studio Floor", sub: "GAA STUDIO" },
  { src: "/poster.png", label: "Poster Concepts", sub: "GAA STUDIO" },
];

const GALLERY_DOUBLED = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // 3D Auto-play continuous loop gallery with curved perspective
  useEffect(() => {
    if (typeof window === "undefined" || !trackRef.current) return;

    const CARD_W = 280;
    const CARD_GAP = 24;
    const CARD_STEP = CARD_W + CARD_GAP; // 304px
    const LOOP_WIDTH = GALLERY_IMAGES.length * CARD_STEP;

    const update3DEffect = () => {
      const centerX = window.innerWidth / 2;
      cardRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distFromCenter = cardCenter - centerX;
        const normalized = distFromCenter / (window.innerWidth * 0.52);

        const clampedNorm = Math.max(-1.3, Math.min(1.3, normalized));
        const rotateY = -clampedNorm * 26;
        const scale = Math.max(0.82, 1 - Math.abs(clampedNorm) * 0.16);
        const opacity = Math.max(0.4, 1 - Math.abs(clampedNorm) * 0.42);

        gsap.set(el, {
          rotationY: rotateY,
          scale: scale,
          opacity: opacity,
          transformPerspective: 1100,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });
      });
    };

    const tween = gsap.fromTo(
      trackRef.current,
      { x: 0 },
      {
        x: -LOOP_WIDTH,
        duration: 44,
        ease: "none",
        repeat: -1,
        onUpdate: update3DEffect,
      }
    );

    tweenRef.current = tween;

    // Slow down on hover
    const trackEl = trackRef.current;
    const handleMouseEnter = () => tween.timeScale(0.25);
    const handleMouseLeave = () => tween.timeScale(1);

    trackEl.addEventListener("mouseenter", handleMouseEnter);
    trackEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      trackEl.removeEventListener("mouseenter", handleMouseEnter);
      trackEl.removeEventListener("mouseleave", handleMouseLeave);
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-[#f4f7fb]">
      {/* ========================================================================= */}
      {/* 1. 3D CAROUSEL WITH EXACT CENTER GLASSMORPHISM CARD                      */}
      {/* ========================================================================= */}
      <div
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20 lg:py-28"
        style={{
          background: "linear-gradient(180deg, #edf3fa 0%, #f6f9fc 45%, #ffffff 80%, #f2f7fc 100%)",
        }}
      >
        {/* Soft background ambient lighting glow (warm yellow left + blue right) */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-[#ffd629]/12 blur-[140px]" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[#087ec5]/12 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/60 blur-[100px]" />


        {/* 3D Moving Track Behind */}
        <div
          className="absolute inset-0 flex items-center overflow-hidden"
          style={{ perspective: 1200, perspectiveOrigin: "50% 50%" }}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-6 will-change-transform"
            style={{ width: "max-content", paddingLeft: "8vw" }}
          >
            {GALLERY_DOUBLED.map((item, idx) => (
              <div
                key={`${item.src}-${idx}`}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="group relative h-[420px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-[32px] bg-[#1a2d42] shadow-[0_25px_60px_-15px_rgba(9,43,77,0.35)] transition-[transform,box-shadow] duration-500 hover:shadow-[0_30px_70px_-10px_rgba(9,43,77,0.5)]"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061524]/90 via-[#061524]/25 to-transparent" />

                {/* GAA STUDIO Label + Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                    {item.sub}
                  </p>
                  <h4 className="mt-1 text-lg font-black tracking-tight text-white drop-shadow-sm">
                    {item.label}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Floating Glassmorphism Hero Card (Scaled down proportions) */}
        <div className="relative z-10 mx-auto w-full max-w-[490px] px-4 font-editorial">
          <div
            className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_25px_80px_-15px_rgba(7,27,48,0.45),inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.2)]"
            style={{
              background:
                "linear-gradient(155deg, rgba(22, 54, 86, 0.58) 0%, rgba(10, 30, 52, 0.70) 100%)",
              backdropFilter: "blur(26px) saturate(170%)",
              WebkitBackdropFilter: "blur(26px) saturate(170%)",
              border: "1px solid rgba(255, 255, 255, 0.26)",
            }}
          >
            {/* Top glass gloss & light reflection */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 80%)",
              }}
            />
            <div className="pointer-events-none absolute -top-14 left-1/2 h-28 w-56 -translate-x-1/2 rounded-full bg-[#087ec5]/25 blur-2xl" />

            {/* Pill Badge: • ABOUT GAA */}
            <div className="relative z-10 text-center">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-white/95 shadow-sm font-editorial"
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.28)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#ffd629] shadow-[0_0_6px_#ffd629]" />
                ABOUT GAA
              </div>
            </div>

            {/* Main Headline: Creativity becomes a career here. */}
            <h2 className="relative z-10 mt-4 sm:mt-5 text-center text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-[0.03em] text-white leading-tight sm:leading-[1.1] drop-shadow-sm font-editorial">
              Creativity becomes a{" "}
              <span className="text-[#ffd629] block sm:inline drop-shadow-sm">career here.</span>
            </h2>

            {/* Description Paragraph */}
            <p className="relative z-10 mx-auto mt-3.5 max-w-md text-center text-sm sm:text-[15px] font-medium leading-relaxed text-white/90 drop-shadow-sm font-editorial tracking-[0.02em]">
              Global Academy of Artistry — futuristic creative education from the house of{" "}
              <span className="font-bold text-[#ffd629]">Yellowtooths</span>, with 15+ years of
              industry excellence.
            </p>

            {/* Thin Divider Line */}
            <div className="relative z-10 my-4 sm:my-5 h-px w-full bg-white/20" />

            {/* Stats Row: 15+ YEARS | 2000+ STUDENTS | 100% PLACEMENT */}
            <div className="relative z-10 grid grid-cols-3 text-center font-editorial">
              <div>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ffd629] drop-shadow-sm">
                  15+
                </p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 sm:text-[12px]">
                  YEARS
                </p>
              </div>
              <div className="border-x border-white/15">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ffd629] drop-shadow-sm">
                  2000+
                </p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 sm:text-[12px]">
                  STUDENTS
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ffd629] drop-shadow-sm">
                  100%
                </p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 sm:text-[12px]">
                  PLACEMENT
                </p>
              </div>
            </div>

            {/* CTA Button: Explore our courses (↗) */}
            <div className="relative z-10 mt-6 sm:mt-7 flex items-center justify-center font-editorial">
              <Link
                href="#courses"
                className="group inline-flex items-center gap-2.5 font-bold text-white transition-opacity duration-200 hover:opacity-95"
              >
                <span className="text-sm sm:text-[15px] font-bold tracking-[0.16em] uppercase drop-shadow-sm">
                  Explore our courses
                </span>
                <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-[#ffd629] text-[#092b4d] shadow-md shadow-[#ffd629]/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.8} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}


