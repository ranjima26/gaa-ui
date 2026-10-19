"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Maximize2,
  X,
  Sparkles,
  GraduationCap,
  Briefcase,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export interface Mentor {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  image: string;
  tag: string;
  courses: string[];
  experience: string;
  highlights: string[];
  quote?: string;
}

const MENTORS_DATA: Mentor[] = [
  {
    id: "christina",
    name: "Christina",
    role: "Head of Design & AI Workflows",
    shortBio: "Over 12+ years leading UI/UX & visual branding for major entertainment and tech brands. Christina leads our AI design integrations and creative strategy.",
    fullBio: "Christina has spearheaded high-impact brand identities, digital design systems, and motion campaigns for top studio clients. Her curriculum blends classical design fundamentals with cutting-edge AI generative tools, enabling GAA students to craft world-class visual portfolios that command attention.",
    image: "/mentor-christina-nobg.png",
    tag: "GAA STUDIO SENIOR MENTOR",
    courses: ["GRAPHIC DESIGN + UI/UX WITH AI INTEGRATION"],
    experience: "12+ Years Industry Lead",
    highlights: ["500+ Alumni Mentored", "Ex-Yellowtooths Lead", "AI Design Pioneer"],
    quote: "Design is no longer just about aesthetics — it is about intelligent visual problem solving."
  },
  {
    id: "ancy",
    name: "Ancy",
    role: "Senior 3D & Motion Art Director",
    shortBio: "Specializing in high-octane 3D spatial graphics, keyframe animation, and cinematic VFX rendering. Passionate about pushing student projects into world-class digital realms.",
    fullBio: "Ancy brings deep technical expertise in Blender, Cinema4D, and Unreal Engine into the GAA studio floor. She mentors students in creating commercial 3D assets, fluid motion physics, and AI-assisted 3D generation pipelines for international advertising campaigns.",
    image: "/mentor-ancy-nobg.png",
    tag: "3D & VISUAL EFFECTS LEAD",
    courses: ["GRAPHIC DESIGN + 3D WITH AI INTEGRATION"],
    experience: "10+ Years 3D Specialist",
    highlights: ["Unreal Engine Certified", "3D Poster Art Lead", "Cinema4D Master"],
    quote: "3D motion gives your imagination depth, weight, and unforgettable cinematic impact."
  },
  {
    id: "lakshmi",
    name: "Lakshmi",
    role: "Principal Film Poster Designer",
    shortBio: "Crafting iconic theatrical key-art for Indian and international cinema. Known for bold typography, high-concept storytelling, and masterclass composition.",
    fullBio: "With over 150+ blockbuster film posters to her name, Lakshmi brings real-world agency workflows straight into the GAA classroom. She teaches poster conceptualization, photo manipulation, title design, and visual storytelling that stands out on billboard scale.",
    image: "/mentor-lakshmi-nobg.png",
    tag: "THEATRICAL KEY ART MENTOR",
    courses: ["FILM POSTER DESIGN + KEY ART MASTERY"],
    experience: "15+ Years Film Key Art",
    highlights: ["150+ Film Posters", "Key Art Specialist", "Typography Maestro"],
    quote: "A single poster frame must tell an entire story before a viewer even reads the title."
  },
  {
    id: "maria",
    name: "Maria",
    role: "Creative Director & Marketing Strategist",
    shortBio: "Bridging the gap between visual art and high-converting marketing campaigns using futuristic AI analysis and viral social creative direction.",
    fullBio: "Maria transforms creative ideas into scalable brand strategies. She guides students through performance marketing, AI audience profiling, creative copywriting, and brand identity systems built to thrive in the fast-paced modern digital economy.",
    image: "/mentor-maria-nobg.png",
    tag: "CREATIVE DIRECTION MENTOR",
    courses: ["DIGITAL MARKETING WITH AI TOOLS"],
    experience: "9+ Years Brand Strategist",
    highlights: ["100+ Campaigns", "AI Marketing Pipeline", "Growth Architect"],
    quote: "Great design without strategic direction is art; with strategy, it becomes a movement."
  }
];

export default function CreativeCta() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);

  const sectionRef = useRef<HTMLElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeMentor = MENTORS_DATA[selectedIndex];

  // Next / Prev handlers with wrap-around
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev === 0 ? MENTORS_DATA.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setSelectedIndex((prev) => (prev === MENTORS_DATA.length - 1 ? 0 : prev + 1));
  }, []);

  const handleSelectMentor = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  // Scroll active thumbnail smoothly within its container ONLY (prevents page layout shift)
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeEl = thumbnailContainerRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const container = thumbnailContainerRef.current;
        const targetScrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === "Escape") setIsModalOpen(false);
        return;
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, isModalOpen]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      ".mentor-header-reveal",
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );

    gsap.to(".mentor-glow", { scale: 1.25, opacity: 0.5, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, { scope: sectionRef });

  const openEnrollment = () => window.dispatchEvent(new CustomEvent("open-enroll-modal"));

  const moveButton = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    gsap.to(buttonRef.current, {
      x: (event.clientX - box.left - box.width / 2) * 0.12,
      y: (event.clientY - box.top - box.height / 2) * 0.16,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const resetButton = () => gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, .45)" });

  // Animation variants
  const slideVariants: Variants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
      scale: 0.98
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
      scale: 0.98,
      transition: { duration: 0.35, ease: "easeOut" }
    })
  };

  return (
    <section
      id="mentorship"
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-16 text-[#092b4d] sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      style={{
        background: "linear-gradient(180deg, #edf3fa 0%, #f6f9fc 45%, #ffffff 80%, #f2f7fc 100%)",
      }}
    >
      {/* Background Subtle Mesh & Soft Light Ambient Spot */}
      <div className="mentor-glow pointer-events-none absolute left-1/2 top-1/3 -z-20 h-[45rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#087ec5]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-[#ffd629]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-[350px] w-[350px] rounded-full bg-[#087ec5]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1340px]">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="mentor-header-reveal text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl text-[#092b4d]">
            Meet our <span className="bg-gradient-to-r from-[#0284c7] via-[#087ec5] to-[#0369a1] bg-clip-text text-transparent">expert mentors</span>
          </h2>
          <p className="mentor-header-reveal mx-auto mt-3.5 max-w-2xl text-sm leading-7 text-[#475569] sm:text-base font-medium">
            Learn from working creatives who bring real-world experience, honest feedback and personal guidance to every project.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MAIN MENTOR SHOWCASE (NO HEAVY CARD, OPEN CANVAS DESIGN)                  */}
        {/* ========================================================================= */}
        <div className="relative lg:min-h-[640px] px-2 sm:px-6 lg:px-12 py-4">

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeMentor.id}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 grid grid-cols-1 items-center gap-0 lg:grid-cols-12 lg:gap-12"
            >
              {/* LEFT COLUMN: MENTOR INFO */}
              <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start px-3 sm:px-8 pt-5 lg:pt-0">
                {/* Mentor Name (Large, modern typography) */}
                <h3 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#092b4d] font-editorial">
                  {activeMentor.name}
                </h3>

                {/* Designation */}
                <p className="mt-1 text-base sm:text-lg lg:text-xl font-bold text-[#087ec5] tracking-wide">
                  {activeMentor.role}
                </p>

                {/* Biography */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#334155] font-normal max-w-xl">
                  {activeMentor.shortBio}
                </p>

                {/* Course Pill & Highlights */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {activeMentor.courses.map((course) => (
                    <span
                      key={course}
                      className="rounded-full border border-[#087ec5]/30 bg-white/80 px-3.5 py-1 text-[11px] font-bold text-[#087ec5] tracking-wider shadow-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>

                {/* Highlights List */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg">
                  {activeMentor.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#334155]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#087ec5] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={openEnrollment}
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#ffd629] px-6 py-3.5 text-xs sm:text-sm font-black text-[#092b4d] uppercase tracking-wider shadow-[0_6px_25px_rgba(255,214,41,0.45)] transition-all hover:scale-105 hover:bg-[#ffe15c]"
                  >
                    <span>Book Mentorship Session</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-5 py-3.5 text-xs sm:text-sm font-bold text-[#092b4d] shadow-sm transition-all hover:bg-white hover:border-[#087ec5] hover:text-[#087ec5]"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-[#087ec5]" />
                    <span>View Full Profile</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: PORTRAIT SHOWCASE IMAGE (OPEN CANVAS / NO BG CARD) */}
              <div className="order-1 lg:order-2 lg:col-span-5 relative flex justify-center items-end">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="group relative h-[320px] sm:h-[460px] lg:h-[640px] w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[540px] cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
                >
                  {/* Subtle glow ambient aura behind cutout */}
                  <div className="absolute inset-x-8 bottom-0 top-8 bg-[#087ec5]/20 blur-3xl rounded-full transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  <Image
                    src={activeMentor.image}
                    alt={`Portrait of ${activeMentor.name}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-contain object-bottom drop-shadow-[0_25px_45px_rgba(9,43,77,0.22)] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL MENTOR SELECTION THUMBNAIL STRIP (NAV STRIP)                  */}
        {/* ========================================================================= */}
        <div className="mt-12">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#087ec5] mb-5">
            Select Mentor to Explore Profile
          </p>

          <div
            ref={thumbnailContainerRef}
            className="flex items-center gap-5 overflow-x-auto pb-4 pt-2 px-2 scrollbar-none scroll-smooth justify-start sm:justify-center"
          >
            {MENTORS_DATA.map((mentor, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={mentor.id}
                  type="button"
                  onClick={() => handleSelectMentor(index)}
                  className={`group relative flex shrink-0 items-center gap-3.5 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${isActive
                    ? "border-[#087ec5] bg-white shadow-[0_10px_30px_-5px_rgba(8,126,197,0.25)] scale-105"
                    : "border-slate-200/80 bg-white/60 hover:border-slate-300 hover:bg-white/90"
                    }`}
                >
                  {/* Circular Avatar */}
                  <div className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 transition-all duration-300 ${isActive ? "border-[#087ec5] ring-4 ring-[#087ec5]/20" : "border-slate-200 group-hover:border-[#087ec5]"
                    }`}>
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Name & Role */}
                  <div className="text-left pr-1">
                    <p className={`text-sm font-black transition-colors ${isActive ? "text-[#087ec5]" : "text-[#092b4d] group-hover:text-[#087ec5]"
                      }`}>
                      {mentor.name}
                    </p>
                    <p className="text-[10px] font-semibold text-slate-500 truncate max-w-[110px] sm:max-w-[130px]">
                      {mentor.role.split("&")[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Join Community Button */}
        <div className="mentor-cta mt-12 flex items-center justify-center gap-3 sm:gap-5">
          <span className="h-px max-w-48 flex-1 bg-gradient-to-r from-transparent via-[#087ec5]/30 to-[#ffd629]" />
          <button
            ref={buttonRef}
            type="button"
            onClick={openEnrollment}
            onPointerMove={moveButton}
            onPointerLeave={resetButton}
            className="group relative isolate flex items-center gap-3 overflow-hidden rounded-full bg-[#ffd629] px-6 py-3.5 text-xs font-black text-[#092b4d] shadow-[0_6px_25px_rgba(255,214,41,.4)] transition-transform hover:scale-[1.03] sm:px-8 sm:text-sm"
          >
            <span className="absolute inset-y-0 -left-1/2 -z-10 w-1/3 -skew-x-12 bg-white/70 blur-sm transition-all duration-700 group-hover:left-[125%]" />
            Join our creative community
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#092b4d] text-[#ffd629] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
          <span className="h-px max-w-48 flex-1 bg-gradient-to-l from-transparent via-[#087ec5]/30 to-[#ffd629]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN / MODAL EXPAND MENTOR PROFILE VIEW                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#06192d]/80 backdrop-blur-xl"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 my-auto w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 text-[#092b4d] shadow-2xl sm:p-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition-all hover:bg-slate-200 hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                {/* Portrait */}
                <div className="md:col-span-5 relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 shadow-md">
                  <Image
                    src={activeMentor.image}
                    alt={activeMentor.name}
                    fill
                    sizes="400px"
                    className="object-contain object-bottom p-2 drop-shadow-md"
                  />
                </div>

                {/* Details */}
                <div className="md:col-span-7 flex flex-col items-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#087ec5]/30 bg-[#087ec5]/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#087ec5]">
                    <GraduationCap className="h-3.5 w-3.5" /> GAA MENTOR MASTERY
                  </div>

                  <h3 className="mt-3 text-3xl sm:text-4xl font-light text-[#092b4d] font-editorial">
                    {activeMentor.name}
                  </h3>

                  <p className="mt-1 text-base font-bold text-[#087ec5]">
                    {activeMentor.role}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-[#334155]">
                    {activeMentor.fullBio}
                  </p>

                  {activeMentor.quote && (
                    <blockquote className="mt-5 rounded-xl border-l-4 border-[#ffd629] bg-slate-50 p-4 text-xs italic text-[#334155]">
                      &ldquo;{activeMentor.quote}&rdquo;
                    </blockquote>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeMentor.courses.map((c) => (
                      <span key={c} className="rounded-lg bg-[#087ec5]/10 border border-[#087ec5]/30 px-3 py-1 text-[10px] font-extrabold text-[#087ec5]">
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-4 w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        openEnrollment();
                      }}
                      className="flex-1 rounded-full bg-[#ffd629] py-3.5 text-center text-xs font-black uppercase tracking-wider text-[#092b4d] shadow-md hover:bg-[#ffe15c]"
                    >
                      Book Session with {activeMentor.name}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

