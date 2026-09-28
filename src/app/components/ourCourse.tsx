"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const COURSES = [
  {
    number: "01",
    title: "GRAPHIC DESIGN + UI/UX",
    subtitle: "With AI – Integration",
    tag: "Flagship Course",
    duration: "8 months training + 2-month internship",
    description:
      "Build visual identities and digital experiences with AI-assisted creative workflows. Master design thinking, branding, and user experience.",
    image: "/course-design.jpg",
    topics: ["Visual identity", "UI/UX design", "AI workflows", "Portfolio building"],
    color: "#2E9FD8",
    accent: "#e8f6ff",
    labelColor: "#1a6fa0",
    details: [],
  },
  {
    number: "02",
    title: "GRAPHIC DESIGN + 3D",
    subtitle: "With AI – Integration",
    tag: "Studio Course",
    duration: "8 months training + 2-month internship",
    description:
      "Bring graphic ideas into three dimensions—from concept to finished presentation. Learn 3D modelling, texturing, lighting, and AI-powered visual creation.",
    image: "/course-animation.jpg",
    topics: ["Graphic design", "3D modelling", "AI visual creation", "Studio projects"],
    color: "#F5B800",
    accent: "#fff9e0",
    labelColor: "#a07a00",
    details: [
      { heading: "AI – Integration", items: ["AI Prompt Generation (Graphic & 3D)", "Content Creation with AI Software"] },
      { heading: "Graphic Design", items: ["Photo Manipulation", "Typography", "Grading & Retouching", "Film Poster Design", "Branding (Corporate, FMCG, Print & more)", "Magazine & Newspaper Layouts", "Photography Creative Direction"] },
      { heading: "3D & Motion", items: ["3D Modelling", "Texturing", "Rigging", "Lighting", "Motion Graphics Animation", "VFX"] },
      { heading: "Program Highlights", items: ["Live Projects", "Industry Expert Sessions", "Yellowtooths In-house Production Support", "Studio Floor Exposure"] },
    ],
  },
  {
    number: "03",
    title: "FILM POSTER DESIGN",
    subtitle: "Crash Course",
    tag: "Crash Course",
    duration: "3 months",
    description:
      "Create cinematic poster concepts through typography, composition, and photo retouching. Turn raw images into powerful visual narratives.",
    image: "/poster.png",
    topics: ["Poster concepts", "Typography", "Photo retouching", "Campaign artwork"],
    color: "#4CAF50",
    accent: "#edfaee",
    labelColor: "#2e7a30",
    details: [],
  },
  {
    number: "04",
    title: "DIGITAL MARKETING",
    subtitle: "With AI Tools",
    tag: "AI Marketing",
    duration: "3 months",
    description:
      "Plan creative campaigns and social content with modern AI marketing tools. Learn strategy, analytics, and content creation for today's digital landscape.",
    image: "/digital.png",
    topics: ["Campaign planning", "Content strategy", "AI marketing tools", "Performance insights"],
    color: "#E96822",
    accent: "#fff1ea",
    labelColor: "#b84d12",
    details: [],
  },
];

export default function OurCourse() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".courses-header-reveal",
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      const rows = gsap.utils.toArray<HTMLElement>(".course-infographic-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const openEnrollment = (courseTitle: string) =>
    window.dispatchEvent(new CustomEvent("open-enroll-modal", { detail: { course: courseTitle } }));

  const [openLearn, setOpenLearn] = useState<string | null>(null);
  const toggleLearn = (num: string) => setOpenLearn(prev => prev === num ? null : num);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative isolate overflow-hidden py-20 sm:py-28"
      style={{ background: "linear-gradient(150deg,#f0f8ff 0%,#ffffff 45%,#f5fff8 100%)" }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-48 top-0 -z-10 h-[560px] w-[560px] rounded-full opacity-25 blur-[130px]" style={{ background: "#2E9FD8" }} />
      <div className="pointer-events-none absolute -right-48 bottom-0 -z-10 h-[560px] w-[560px] rounded-full opacity-20 blur-[130px]" style={{ background: "#F5B800" }} />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.04] [background-image:radial-gradient(#2E9FD8_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="courses-header-reveal mb-16 text-center">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] shadow-sm"
            style={{ borderColor: "#2E9FD828", background: "white", color: "#2E9FD8" }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: "#F5B800" }} />
            Our Programs
          </div>
          <h2
            className="text-4xl font-black tracking-[-0.05em] leading-[1.05] sm:text-5xl lg:text-6xl"
            style={{ color: "#1a2a3a" }}
          >
            Choose Your{" "}
            <span style={{ backgroundImage: "linear-gradient(90deg,#F5B800 0%,#4CAF50 45%,#2E9FD8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Creative Path
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
            Explore each program and find the perfect creative direction to launch your career in design and digital arts.
          </p>
        </div>

        {/* ── Zigzag infographic rows ── */}
        <div className="relative flex flex-col">
          {COURSES.map((course, i) => {
            const isEven = i % 2 === 0;
            const isLast = i === COURSES.length - 1;
            const nextCourse = COURSES[i + 1];

            return (
              <div key={course.number} className="course-infographic-row">

                {/* ─ Pill row ─ */}
                <div className={`flex items-center gap-0 overflow-x-clip ${isEven ? "flex-row" : "flex-row-reverse"}`}>

                  {/* Circular image — floats outside pill on the correct end */}
                  <div className="relative shrink-0" style={{ width: 140, height: 140, zIndex: 10, marginLeft: isEven ? 12 : undefined, marginRight: isEven ? undefined : 12 }}>
                    {/* Outer shadow ring */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(${course.color} 0deg 270deg, ${course.color}33 270deg 360deg)`,
                        padding: 5,
                        borderRadius: "50%",
                        boxShadow: `0 10px 36px -10px ${course.color}70`,
                      }}
                    >
                      <div className="h-full w-full overflow-hidden rounded-full" style={{ border: "5px solid white" }}>
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={140}
                          height={140}
                          className="h-full w-full object-cover rounded-full"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                    {/* Number badge */}
                    <div
                      className="absolute bottom-0 flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white shadow-lg"
                      style={{ background: course.color, right: isEven ? -2 : undefined, left: isEven ? undefined : -2 }}
                    >
                      {course.number}
                    </div>

                    {/* What You'll Learn toggle button */}
                    <button
                      type="button"
                      onClick={() => toggleLearn(course.number)}
                      id={`learn-toggle-${course.number}`}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold shadow-md transition-all duration-300 hover:scale-105 z-20"
                      style={{
                        background: "white",
                        color: course.color,
                        border: `1.5px solid ${course.color}40`,
                        boxShadow: `0 4px 14px -4px ${course.color}40`,
                      }}
                    >
                      What You&apos;ll Learn
                      <ChevronDown
                        className="h-3 w-3 transition-transform duration-300"
                        style={{ transform: openLearn === course.number ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>
                  </div>

                  {/* Pill capsule body */}
                  <div
                    className={`relative flex flex-1 items-center gap-6 overflow-hidden rounded-full bg-white transition-all duration-500 hover:shadow-[0_24px_70px_-16px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 ${isEven ? "-ml-6 pl-12 pr-8" : "-mr-6 pr-12 pl-8"}`}
                    style={{
                      border: `2.5px solid ${course.color}30`,
                      boxShadow: `0 14px 55px -18px rgba(0,0,0,0.16), 0 0 0 1px ${course.color}12`,
                      minHeight: 170,
                    }}
                  >
                    {/* Text content */}
                    <div className="flex-1 min-w-0 py-5">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em]"
                          style={{ background: course.accent, color: course.labelColor }}
                        >
                          {course.tag}
                        </span>
                        <span className="hidden sm:block text-[10px] font-semibold text-slate-400 uppercase tracking-widest truncate">
                          ⏱ {course.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-black leading-snug tracking-[-0.03em] sm:text-2xl text-[#1a2a3a]">
                        {course.title}{" "}
                        <span style={{ color: course.color }}>{course.subtitle}</span>
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500 hidden md:block line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Topics chips */}
                    <div className="hidden lg:flex flex-wrap gap-2 max-w-[200px]">
                      {course.topics.map((t) => (
                        <span key={t} className="rounded-full border px-3 py-1 text-[10px] font-semibold text-slate-500" style={{ borderColor: `${course.color}30`, background: course.accent }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Enroll CTA */}
                    <button
                      type="button"
                      onClick={() => openEnrollment(course.title)}
                      id={`enroll-course-${course.number}`}
                      className="shrink-0 hidden sm:flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-black text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap"
                      style={{ background: course.color }}
                    >
                      Enroll Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* ─ What You'll Learn expandable panel ─ */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isEven ? "flex justify-start" : "flex justify-end"}`}
                  style={{ maxHeight: openLearn === course.number ? "200px" : "0px", opacity: openLearn === course.number ? 1 : 0 }}
                >
                  <div
                    className="mt-3 rounded-2xl px-5 py-4 shadow-lg"
                    style={{
                      background: course.accent,
                      border: `1.5px solid ${course.color}28`,
                      width: 220,
                      marginLeft: isEven ? 10 : undefined,
                      marginRight: isEven ? undefined : 10,
                    }}
                  >
                    <p className="mb-2 text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: course.labelColor }}>
                      What You&apos;ll Learn
                    </p>
                    <ul className="space-y-1.5">
                      {course.topics.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: course.color }} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ─ Curved track connector (matches reference image) ─ */}
                {!isLast && nextCourse && (
                  <div className="relative" style={{ height: 100 }}>
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 860 100"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id={`cg-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={course.color} />
                          <stop offset="100%" stopColor={nextCourse.color} />
                        </linearGradient>
                      </defs>

                      {/*
                        The path draws a rounded rectangular track connecting:
                        - isEven: from left circle (x≈90) going down, sweeps right with rounded corner,
                          travels across to right side, sweeps down with rounded corner to next circle (x≈770)
                        - isOdd: from right circle (x≈770) going down, sweeps left, across, sweeps down to left circle (x≈90)
                        Radius r=28 for the corner arcs.
                      */}
                      {isEven ? (
                        // From left-circle bottom → curve right → travel across → curve down to right-circle top
                        // M startX,0  L startX,midY-r  A r,r 0 0,0 startX+r,midY  L endX-r,midY  A r,r 0 0,1 endX,midY+r  L endX,100
                        <path
                          d="M 90 0 L 90 22 A 28 28 0 0 0 118 50 L 742 50 A 28 28 0 0 1 770 78 L 770 100"
                          stroke={`url(#cg-${i})`}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ) : (
                        // From right-circle bottom → curve left → travel across → curve down to left-circle top
                        <path
                          d="M 770 0 L 770 22 A 28 28 0 0 1 742 50 L 118 50 A 28 28 0 0 0 90 78 L 90 100"
                          stroke={`url(#cg-${i})`}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {/* Mountain / chevron triangles at the arrival point */}
                      {isEven ? (
                        // Arriving at right side (x=770), triangles pointing down
                        <>
                          <polygon points="770,82 756,68 784,68" fill={nextCourse.color} />
                          <polygon points="770,94 756,80 784,80" fill={nextCourse.color} opacity="0.5" />
                        </>
                      ) : (
                        // Arriving at left side (x=90), triangles pointing down
                        <>
                          <polygon points="90,82 76,68 104,68" fill={nextCourse.color} />
                          <polygon points="90,94 76,80 104,80" fill={nextCourse.color} opacity="0.5" />
                        </>
                      )}
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="courses-header-reveal mt-16 text-center">
          <p className="mb-5 text-sm text-slate-400">Not sure which course fits you best? Talk to us.</p>
          <button
            type="button"
            onClick={() => openEnrollment("")}
            id="courses-counsellor-btn"
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-black text-white transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg,#2E9FD8 0%,#4CAF50 100%)",
              boxShadow: "0 16px 48px -18px rgba(46,159,216,0.7)",
            }}
          >
            Talk to a Counsellor
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile: soften pill rounding */}
      <style>{`
        @media (max-width: 639px) {
          .course-infographic-row .rounded-full {
            border-radius: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
