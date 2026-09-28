"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const POINTS = [
  {
    text: "Future-ready curriculum",
    badgeBg: "bg-[#f59e0b] text-white",
  },
  {
    text: "Industry Expert Sessions",
    badgeBg: "bg-[#22c55e] text-white",
  },
  {
    text: "Exposure to live projects",
    badgeBg: "bg-[#087ec5] text-white",
  },
  {
    text: "Creative Thinking Guidance",
    badgeBg: "bg-[#f59e0b] text-white",
  },
];

export default function AboutPoster() {
  const containerRef = useRef<HTMLElement>(null);
  const letterARef = useRef<HTMLDivElement>(null);
  const letterBRef = useRef<HTMLDivElement>(null);
  const giantGaaRef = useRef<HTMLDivElement>(null);
  const diagonalRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle scroll parallax on the giant typography
      gsap.to(giantGaaRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(letterARef.current, {
        x: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(diagonalRef.current, {
        x: 35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      if (pointsRef.current) {
        gsap.fromTo(
          pointsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pointsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about-poster"
      className="relative w-full min-h-[95vh] lg:min-h-screen overflow-hidden select-none py-16 lg:py-24"
      style={{
        background: "linear-gradient(145deg, #f2f7fc 0%, #e8f2fa 50%, #edf5fc 100%)",
        color: "#092b4d",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,800;0,900;1,800;1,900&family=Syne:wght@800;900&display=swap');
        
        .font-editorial {
          font-family: 'Barlow Condensed', 'Anton', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
        }

        .text-3d-shadow {
          text-shadow: 
            -1px 1px 0 #061d34,
            -2px 2px 0 #061d34,
            -3px 3px 0 #061d34,
            -4px 4px 0 #061d34,
            -5px 5px 0 #061d34,
            -6px 6px 0 #061d34,
            -7px 7px 0 #061d34,
            -8px 8px 0 #061d34,
            -10px 10px 22px rgba(9, 43, 77, 0.28);
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[450px] w-[450px] rounded-full bg-[#ffd629]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[450px] w-[450px] rounded-full bg-[#087ec5]/15 blur-[130px]" />

      {/* 1. Paper Grain Texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <filter id="paper-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-noise)" />
      </svg>

      {/* 2. Top-Right Editorial Poetic Micro-Text */}
      <div className="absolute top-8 right-6 sm:top-12 sm:right-12 z-20 text-right max-w-[280px] sm:max-w-[320px]">
        <p className="font-editorial text-[10px] sm:text-[11px] font-black tracking-[0.24em] text-[#092b4d] opacity-80 leading-relaxed">
          OF THIS CREATIVE THEATRE IN WHICH WE DWELL,
          WHERE PASSION MEETS DISCIPLINE AND CRAFT.
          WE SHAPE TOMORROW’S VISUAL STORYTELLERS,
          DISRUPTING MEDIOCRITY WITH FEARLESS ART.
        </p>
        <div className="mt-3 flex items-center justify-end gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ffd629] shadow-[0_0_8px_#ffd629]" />
          <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-[#087ec5]">
            VOL. 26 // MANIFESTO
          </span>
        </div>
      </div>

      {/* 3. Top-Left Circular GAA Stamp & Navigation Label */}
      <div className="absolute top-8 left-6 sm:top-12 sm:left-12 z-20 flex items-center gap-3.5 sm:gap-4">
        <div className="group relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border-2 sm:border-[2.5px] border-[#092b4d] bg-white shadow-[4px_4px_0px_#092b4d] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#ffd629]">
          <span className="font-editorial text-base sm:text-lg font-black tracking-tight text-[#092b4d] select-none">
            GAA
          </span>
        </div>
        <div className="hidden sm:block">
          <p className="font-editorial text-xs font-black tracking-widest text-[#092b4d]">
            GLOBAL ACADEMY OF ARTISTRY
          </p>
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#d99b00]">
            HOUSE OF YELLOWTOOTHS — EST. 2009
          </p>
        </div>
      </div>

      {/* 4. Giant Asymmetrical Typography Composition */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden">

        {/* Row 1: Giant "A B O U T" with 3D block isometric depth in Dark Navy Blue */}
        <div className="relative w-full flex items-baseline leading-[0.8]">
          {/* Giant 'A' protruding from left viewport */}
          <div
            ref={letterARef}
            className="font-editorial text-3d-shadow tracking-[-0.06em] text-[#092b4d] font-black"
            style={{
              fontSize: "clamp(12rem, 30vw, 36rem)",
              marginLeft: "-4vw",
              lineHeight: 0.78,
            }}
          >
            A
          </div>

          {/* Connected 'BOUT' block overlapping and stretching */}
          <div
            ref={letterBRef}
            className="font-editorial text-[#092b4d] font-black tracking-[-0.05em] flex items-baseline"
            style={{
              fontSize: "clamp(7.5rem, 18vw, 22rem)",
              marginLeft: "-1vw",
              lineHeight: 0.8,
            }}
          >
            <span className="inline-block transform -rotate-[2deg]">B</span>
            <span className="inline-block transform scale-y-110">O</span>
            <span className="inline-block transform rotate-[1.5deg]">U</span>
            <span className="inline-block transform -rotate-[3deg]">T</span>
          </div>
        </div>

        {/* Diagonal Slogan Slash across the composition */}
        <div
          ref={diagonalRef}
          className="relative z-15 my-[-2vw] sm:my-[-3vw] pl-6 sm:pl-16 transform -rotate-[8deg] sm:-rotate-[10deg] origin-left"
        >
          <div className="inline-flex items-center gap-4 bg-[#092b4d] text-white px-5 py-2 sm:px-8 sm:py-3 shadow-[6px_6px_0px_#ffd629]">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffd629]" />
            <span className="font-editorial text-xl sm:text-3xl lg:text-4xl font-black tracking-[0.14em]">
              WHERE CREATIVITY BECOMES A <span className="text-[#ffd629]">CAREER</span>
            </span>
          </div>
        </div>

        {/* Row 2: Monumental "G A A" Dominating the Bottom/Right Side in Dark Navy Blue */}
        <div
          ref={giantGaaRef}
          className="relative w-full flex items-end justify-between leading-[0.72] mt-4 sm:mt-0"
        >
          {/* Bottom Left About Philosophy & Manifesto Paragraph */}
          <div className="z-20 max-w-xl pl-8 sm:pl-16 lg:pl-20 pb-6 sm:pb-8">
            <div className="h-1.5 w-12 bg-[#ffd629] mb-4 rounded-full" />
            <p className="font-editorial text-xs sm:text-[13px] lg:text-[14px] font-black uppercase tracking-[0.16em] sm:tracking-[0.18em] leading-relaxed text-[#092b4d]">
              GLOBAL ACADEMY OF ARTISTRY (GAA) IS A FUTURISTIC ACADEMY FROM THE HOUSE OF YELLOWTOOTHS, A CREATIVE AGENCY WITH 15+ YEARS OF EXPERIENCE IN FILM POSTER DESIGN, BRANDING, DIGITAL MARKETING AND MORE. OUR TEACHING PHILOSOPHY BLENDS HANDS-ON LEARNING, MENTORSHIP FROM WELL-KNOWN CREATIVE PERSONALITIES AND EXPOSURE TO LIVE PROJECTS. WE SHAPE CREATIVE LEADERS RATHER THAN REGULAR EMPLOYEES THROUGH OUR WELL-RESEARCHED COURSE OFFERINGS.
            </p>
            <Link
              href="#courses"
              className="group mt-4 inline-flex items-center gap-2 font-editorial text-xs sm:text-sm font-black tracking-widest text-[#087ec5] hover:text-[#092b4d] transition-colors"
            >
              EXPLORE OUR COURSES
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Giant 'GAA' dominating right edge in Dark Navy Blue */}
          <div
            className="font-editorial text-[#092b4d] font-black tracking-[-0.08em] flex items-baseline ml-auto text-right"
            style={{
              fontSize: "clamp(13rem, 36vw, 44rem)",
              marginRight: "-5vw",
              lineHeight: 0.72,
            }}
          >
            <span className="inline-block transform scale-y-105 tracking-[-0.09em]">G</span>
            <span className="inline-block transform -rotate-[1deg] tracking-[-0.08em] text-[#092b4d]">A</span>
            <span className="inline-block transform tracking-[-0.07em]">A</span>
          </div>
        </div>
      </div>

      {/* 5. Points Checklist (Clean 2x2 Grid) */}
      <div className="relative z-20 mx-auto mt-12 sm:mt-16 max-w-5xl px-6 sm:px-10 lg:px-12">
        <div
          ref={pointsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 sm:gap-y-6 border-t-2 border-[#092b4d]/15 pt-8"
        >
          {POINTS.map(({ text, badgeBg }, idx) => (
            <div key={idx} className="flex items-center gap-3.5 sm:gap-4">
              <div
                className={`grid h-5 w-5 sm:h-6 sm:w-6 shrink-0 place-items-center rounded-full ${badgeBg} shadow-sm`}
              >
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} />
              </div>
              <span className="font-editorial text-xs sm:text-sm lg:text-[15px] font-black uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#092b4d]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Vertical Running Micro-Labels along edges */}
      <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-20 -rotate-90 origin-center">
        <p className="font-editorial text-[9px] font-black tracking-[0.35em] text-[#087ec5]/60 whitespace-nowrap">
          LEARN /// CREATE /// LEAD /// INNOVATE /// PRODUCE
        </p>
      </div>

      <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-20 rotate-90 origin-center">
        <p className="font-editorial text-[9px] font-black tracking-[0.35em] text-[#087ec5]/60 whitespace-nowrap">
          GLOBAL ACADEMY OF ARTISTRY &bull; YELLOWTOOTHS &bull; 2026
        </p>
      </div>
    </section>
  );
}
