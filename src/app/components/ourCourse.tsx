"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Clock,
  CheckCircle2,
  Layers,
  Cpu,
  Compass,
  Flame,
  Award
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface CourseDetail {
  heading: string;
  items: string[];
}

interface CourseItem {
  number: string;
  badgeNumber: string;
  title: string;
  subtitle: string;
  tag: string;
  duration: string;
  level: string;
  description: string;
  image: string;
  topics: string[];
  color: string;
  colorDark: string;
  accentBg: string;
  glowColor: string;
  labelColor: string;
  milestoneTitle: string;
  milestoneCategory: string;
  highlight: string;
  details: CourseDetail[];
}

const COURSES: CourseItem[] = [
  {
    number: "01",
    badgeNumber: "01",
    title: "GRAPHIC DESIGN + UI/UX",
    subtitle: "With AI – Integration",
    tag: "Flagship Program",
    duration: "8 Months + 2-Mo Internship",
    level: "Beginner to Advanced",
    description:
      "Build visual identities and high-conversion digital experiences with AI-assisted creative workflows. Master Figma, typography, design systems, user psychology, and end-to-end product prototyping.",
    image: "/images/journey/journey_uiux_3d.jpg",
    topics: ["Figma & Design Systems", "UI/UX & Prototyping", "AI Generative Workflows", "Brand Identity", "Design Thinking", "Portfolio Launch"],
    color: "#0284C7", // Sky blue
    colorDark: "#0369A1",
    accentBg: "rgba(2, 132, 199, 0.08)",
    glowColor: "rgba(2, 132, 199, 0.35)",
    labelColor: "#0284C7",
    milestoneTitle: "Creative Foundation & UI/UX",
    milestoneCategory: "Milestone 01 • Design Strategy",
    highlight: "100% Live Studio Projects & Portfolio Ready",
    details: [
      {
        heading: "AI – Workflow Integration",
        items: ["Midjourney & Firefly for Creative Ideation", "AI-assisted Wireframing & Moodboarding", "Prompt Engineering for Designers"]
      },
      {
        heading: "Brand & Graphic Systems",
        items: ["Advanced Typography & Grid Theory", "Visual Identity & Packaging Systems", "Vector Graphics & Print Production"]
      },
      {
        heading: "UI/UX & Product Design",
        items: ["User Research & Information Architecture", "Interactive Figma Micro-interactions", "Usability Testing & Design Handoff"]
      },
      {
        heading: "Career & Studio Floor",
        items: ["2 Months In-House Yellowtooths Internship", "Industry Mentor Reviews", "Placement Support & Resume Polish"]
      }
    ]
  },
  {
    number: "02",
    badgeNumber: "02",
    title: "GRAPHIC DESIGN + 3D",
    subtitle: "With AI – Integration",
    tag: "Studio Course",
    duration: "8 Months + 2-Mo Internship",
    level: "Intermediate to Pro",
    description:
      "Elevate your visual storytelling into three dimensions. Learn 3D spatial modeling, octane texturing, cinematic lighting, motion graphics, and AI-accelerated 3D asset generation.",
    image: "/images/journey/journey_3d_design.jpg",
    topics: ["3D Modeling & Sculpting", "Cinematic Texturing", "Motion Graphics & VFX", "AI 3D Synthesis", "Lighting & Rigging", "Studio Production"],
    color: "#D97706", // Amber Gold
    colorDark: "#B45309",
    accentBg: "rgba(217, 119, 6, 0.08)",
    glowColor: "rgba(217, 119, 6, 0.35)",
    labelColor: "#D97706",
    milestoneTitle: "3D Worlds & Motion Arts",
    milestoneCategory: "Milestone 02 • Spatial Creation",
    highlight: "Hands-on Rigging, VFX & In-House Production",
    details: [
      {
        heading: "AI 3D & Concept Tools",
        items: ["AI Prompt Generation for 3D Assets", "Text-to-Texture & Style Synthesizers", "Content Creation with Modern AI Pipelines"]
      },
      {
        heading: "Advanced 2D/3D Graphic Design",
        items: ["Photo Manipulation & Matte Painting", "Color Grading & Digital Retouching", "Film & Commercial Poster Typography"]
      },
      {
        heading: "3D & Motion Production",
        items: ["Hard Surface & Organic 3D Modeling", "Procedural Texturing & Octane/Cycles Lighting", "Motion Graphics Animation & Visual Effects"]
      },
      {
        heading: "Yellowtooths Studio Exposure",
        items: ["Production Floor Real-Time Projects", "Masterclasses by 3D Art Directors", "Portfolio Reel for Global Studios"]
      }
    ]
  },
  {
    number: "03",
    badgeNumber: "03",
    title: "FILM POSTER DESIGN",
    subtitle: "Crash Course",
    tag: "Industry Intensive",
    duration: "3 Months Fast-Track",
    level: "All Skill Levels",
    description:
      "Master the high-stakes art of cinematic poster composition. Transform raw stills into emotionally gripping movie key art with Hollywood-grade typography, retouching, and dramatic color grading.",
    image: "/images/journey/journey_film_poster.jpg",
    topics: ["Cinematic Key Art", "Dramatic Retouching", "Film Typography", "Color Atmosphere", "Visual Storytelling", "Pitch Ready Portfolios"],
    color: "#059669", // Emerald Green
    colorDark: "#047857",
    accentBg: "rgba(5, 150, 105, 0.08)",
    glowColor: "rgba(5, 150, 105, 0.35)",
    labelColor: "#059669",
    milestoneTitle: "Cinematic Narratives & Key Art",
    milestoneCategory: "Milestone 03 • Film Visuals",
    highlight: "Taught by Film Industry Creative Directors",
    details: [
      {
        heading: "Cinematic Visual Storytelling",
        items: ["Genre Moodboards & Key Theme Extraction", "Composition Dynamics & Visual Tension", "Lighting Contrast & Atmosphere Creation"]
      },
      {
        heading: "Advanced Photo Manipulation",
        items: ["Hollywood-Standard Face & Skin Retouching", "Seamless Asset Blending & Compositing", "Custom Brush FX, Smoke, Dust & Flares"]
      },
      {
        heading: "Title Treatment & Typography",
        items: ["Custom Display Lettering for Cinema", "Hierarchical Billing Block & Credits Setup", "Metallics, 3D Extrusions & Distressed Text"]
      },
      {
        heading: "Industry Pitch Delivery",
        items: ["Teaser vs Theatrical Release Layouts", "Streaming Platform Thumbnail Optimization", "Commercial Studio Portfolio Pack"]
      }
    ]
  },
  {
    number: "04",
    badgeNumber: "04",
    title: "DIGITAL MARKETING",
    subtitle: "With AI Tools",
    tag: "High Growth Career",
    duration: "3 Months Fast-Track",
    level: "All Skill Levels",
    description:
      "Scale brands and drive measurable ROI with AI-powered marketing stacks. Master performance marketing, creative copywriting, funnel architecture, multi-channel analytics, and viral content growth.",
    image: "/images/journey/journey_digital_marketing.jpg",
    topics: ["AI Growth Stacks", "Performance Ads (Meta/Google)", "Conversion Funnels", "Social Growth Strategy", "Marketing Analytics", "Brand ROI"],
    color: "#EA580C", // Vibrant Orange
    colorDark: "#C2410C",
    accentBg: "rgba(234, 88, 12, 0.08)",
    glowColor: "rgba(234, 88, 12, 0.35)",
    labelColor: "#EA580C",
    milestoneTitle: "Market Scale & AI Growth",
    milestoneCategory: "Milestone 04 • Career Acceleration",
    highlight: "Live Ad Spend Budgets & Real Campaign Audits",
    details: [
      {
        heading: "AI Marketing Intelligence",
        items: ["AI Copywriting & Hook Generation", "Automated Visual Ad Creative Variations", "Predictive Trend & Competitor Analytics"]
      },
      {
        heading: "Paid Acquisition & Funnels",
        items: ["High-ROAS Meta & Google Ad Architectures", "Landing Page CRO (Conversion Rate Optimization)", "Audience Segmentation & Retargeting Loops"]
      },
      {
        heading: "Organic Reach & Social Systems",
        items: ["Viral Content Frameworks & Short-form Video", "LinkedIn & Personal Branding for Creatives", "Email Nurture & Retention Automation"]
      },
      {
        heading: "Analytics & Executive Reporting",
        items: ["Google Analytics 4 & Attribution Models", "Data Studio Dashboard Building", "Client Pitch & Agency Proposal Preparation"]
      }
    ]
  }
];

export default function OurCourse() {
  const containerRef = useRef<HTMLElement>(null);
  const [openDetailIndex, setOpenDetailIndex] = useState<number | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<number>(0);

  // Scroll tracking for ribbon progress and traveling comet
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const pathLengthSpring = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Calculate active milestone as scroll progresses
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveMilestone(0);
      else if (latest < 0.5) setActiveMilestone(1);
      else if (latest < 0.75) setActiveMilestone(2);
      else setActiveMilestone(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const openEnrollment = (courseTitle: string) => {
    window.dispatchEvent(
      new CustomEvent("open-enroll-modal", { detail: { course: courseTitle } })
    );
  };

  const toggleDetail = (index: number) => {
    setOpenDetailIndex(prev => prev === index ? null : index);
  };

  return (
    <section
      id="courses"
      ref={containerRef}
      className="relative isolate overflow-hidden py-20 sm:py-28"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 25%, #F0F9FF 55%, #F8FAFC 100%)",
        fontFamily: "'Barlow Condensed', 'Anton', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,800;0,900;1,800;1,900&family=Syne:wght@800;900&family=Caveat:wght@700&display=swap');
        
        .font-editorial {
          font-family: 'Barlow Condensed', 'Anton', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
        }

        .font-handwriting {
          font-family: 'Caveat', cursive;
          font-weight: 700;
        }
      `}</style>

      {/* ── Background Subtle Mesh & Glow Elements ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Paper Grain Noise Texture */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-multiply"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="paper-noise-courses">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-noise-courses)" />
        </svg>

        {/* Soft isometric grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#0284C7 1.5px, transparent 1.5px), radial-gradient(#F59E0B 1.5px, transparent 1.5px)`,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px"
          }}
        />
        {/* Soft ambient gradient spots */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-tr from-sky-200/30 via-emerald-100/25 to-amber-100/30 blur-[140px]" />
        <div className="absolute top-[45%] -left-32 h-[500px] w-[500px] rounded-full bg-amber-200/20 blur-[130px]" />
        <div className="absolute bottom-[15%] -right-32 h-[550px] w-[550px] rounded-full bg-emerald-200/20 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header (Image 1 Editorial Style & 3D Staircase Visual) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-20 sm:mb-28">

          {/* LEFT COLUMN: Editorial Typography & Filter Pills */}
          <div className="lg:col-span-6 flex flex-col items-start">



            {/* Giant Stacked Headline using Barlow Condensed / Anton */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative w-full select-none"
            >
              <h2 className="font-editorial text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] font-black tracking-[-0.03em] leading-[0.82] text-[#092B4D]">
                <span className="block">YOUR</span>
                <span className="relative inline-block my-1 text-[#0284C7]">
                  {/* Painterly watercolor glow behind CREATIVE */}
                  <span className="absolute -inset-x-6 inset-y-1 -z-10 bg-gradient-to-r from-sky-400/20 via-sky-300/35 to-sky-500/20 blur-xl rounded-3xl transform -rotate-1" />
                  <span className="relative bg-gradient-to-r from-[#0284C7] via-[#087EC5] to-[#0369A1] bg-clip-text text-transparent">
                    CREATIVE
                  </span>
                  {/* Brushed stroke highlight underline */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-4 text-[#0284C7]/40"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path d="M 2 8 C 50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="block">JOURNEY</span>
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed max-w-xl"
            >
              Step into the Global Academy of Artistry and traverse a continuous, hands-on learning roadmap.
              From foundational creative thinking to AI-accelerated mastery, each milestone moves you directly towards high-demand industry roles.
            </motion.p>

            {/* Milestone Legend Filter Pills (Matching Image 1) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {COURSES.map((c, idx) => (
                <button
                  key={c.number}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`milestone-item-${idx}`);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`font-editorial inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 ${activeMilestone === idx
                    ? "bg-[#092B4D] text-white shadow-[3px_3px_0px_#0284C7] scale-105"
                    : "bg-white/90 border-2 border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>0{idx + 1}</span>
                  <span className="text-slate-400">|</span>
                  <span>{c.title.split("+")[0]}</span>
                </button>
              ))}
            </motion.div>

          </div>

          {/* RIGHT COLUMN: 3D Concrete Staircase, Mounted Blocks & Climbing Kid Silhouette (Enlarged Visual) */}
          {/* RIGHT COLUMN: Interactive Native Vector 3D Blocks Staircase with Girl Student, Creative Props & Rocket Loop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center pt-6 lg:pt-0"
          >
            <div className="relative w-full max-w-[660px] aspect-[1.12/1] scale-105 transform origin-center transition-transform duration-500 hover:scale-110 my-2">
              <svg className="w-full h-full drop-shadow-2xl overflow-visible select-none" viewBox="0 0 700 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Grid Dots */}
                  <pattern id="stairGridPattern" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.2" fill="#0284C7" opacity="0.1" />
                  </pattern>

                  {/* Soft Drop Shadow for 3D blocks */}
                  <filter id="vectorBlockShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="22" stdDeviation="16" floodColor="#092B4D" floodOpacity="0.22" />
                  </filter>

                  <filter id="vectorGirlShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="4" dy="12" stdDeviation="6" floodColor="#092B4D" floodOpacity="0.3" />
                  </filter>

                  {/* Sky Arc Gradient */}
                  <linearGradient id="skyArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.75" />
                    <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Sun Gradient */}
                  <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
                    <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background Texture & Sky Arc */}
                <rect width="100%" height="100%" fill="url(#stairGridPattern)" opacity="0.8" />
                <ellipse cx="320" cy="310" rx="270" ry="210" fill="url(#skyArcGrad)" />
                <circle cx="240" cy="290" r="85" fill="url(#sunGrad)" />

                {/* Sunburst Rays */}
                <g stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
                  <line x1="160" y1="290" x2="140" y2="290" />
                  <line x1="172" y1="240" x2="155" y2="230" />
                  <line x1="200" y1="202" x2="188" y2="188" />
                  <line x1="240" y1="185" x2="240" y2="170" />
                </g>

                {/* Ground Shadow */}
                <ellipse cx="360" cy="490" rx="230" ry="40" fill="#092B4D" opacity="0.12" filter="url(#vectorBlockShadow)" />

                {/* Green Foliage Sprouts Left */}
                <g transform="translate(105, 380)">
                  <path d="M 0 60 Q -20 20 -40 30 Q -10 40 0 60 Z" fill="#22C55E" />
                  <path d="M 0 60 Q 20 10 35 25 Q 10 40 0 60 Z" fill="#15803D" />
                  <path d="M 0 60 Q -5 -10 -15 0 Q 5 25 0 60 Z" fill="#4ADE80" />
                </g>

                {/* ──────────────────────────────────────────────────────────
                    THE 4 COLORFUL 3D BLOCK STEPS
                    ────────────────────────────────────────────────────────── */}

                {/* STEP 01 BLOCK: DARK BLUE (EXPLORE) */}
                <g filter="url(#vectorBlockShadow)" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                  {/* Top Face */}
                  <polygon points="180,410 390,320 290,260 80,350" fill="#0B2D53" />
                  {/* Front-Left Face */}
                  <polygon points="80,350 180,410 180,500 80,440" fill="#05172C" />
                  {/* Front-Right Face (Side) */}
                  <polygon points="180,410 390,320 390,410 180,500" fill="#08223F" />

                  {/* Compass Icon on Front Face */}
                  <g transform="translate(230, 442) rotate(-24)">
                    <circle cx="0" cy="0" r="13" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
                    <polygon points="0,-9 4,0 0,9 -4,0" fill="#FFFFFF" />
                    <circle cx="0" cy="0" r="2.5" fill="#0B2D53" />
                  </g>
                  {/* EXPLORE Text */}
                  <text
                    x="295"
                    y="428"
                    fontFamily="Barlow Condensed, Anton, sans-serif"
                    fontSize="22"
                    fontWeight="900"
                    fill="#FFFFFF"
                    letterSpacing="0.1em"
                    transform="rotate(-24 295 428)"
                  >
                    EXPLORE
                  </text>
                </g>

                {/* STEP 02 BLOCK: SKY BLUE (LEARN) */}
                <g filter="url(#vectorBlockShadow)" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                  {/* Top Face */}
                  <polygon points="250,330 460,240 360,180 150,270" fill="#008CE3" />
                  {/* Front-Left Face */}
                  <polygon points="150,270 250,330 250,420 150,360" fill="#0065A4" />
                  {/* Front-Right Face (Side) */}
                  <polygon points="250,330 460,240 460,330 250,420" fill="#0079C4" />

                  {/* Open Book Icon on Front Face */}
                  <g transform="translate(305, 362) rotate(-24)" stroke="#FFFFFF" strokeWidth="2.2" fill="none" strokeLinejoin="round">
                    <path d="M -12 -5 Q -6 -8 0 -5 Q 6 -8 12 -5 L 12 7 Q 6 4 0 7 Q -6 4 -12 7 Z" fill="#008CE3" opacity="0.3" />
                    <path d="M -12 -5 Q -6 -8 0 -5 L 0 7 Q -6 4 -12 7 Z" />
                    <path d="M 12 -5 Q 6 -8 0 -5 L 0 7 Q 6 4 12 7 Z" />
                  </g>
                  {/* LEARN Text */}
                  <text
                    x="365"
                    y="348"
                    fontFamily="Barlow Condensed, Anton, sans-serif"
                    fontSize="23"
                    fontWeight="900"
                    fill="#FFFFFF"
                    letterSpacing="0.1em"
                    transform="rotate(-24 365 348)"
                  >
                    LEARN
                  </text>
                </g>

                {/* STEP 03 BLOCK: TEAL GREEN (PRACTICE) */}
                <g filter="url(#vectorBlockShadow)" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                  {/* Top Face */}
                  <polygon points="320,250 530,160 430,100 220,190" fill="#00A878" />
                  {/* Front-Left Face */}
                  <polygon points="220,190 320,250 320,340 220,280" fill="#007A57" />
                  {/* Front-Right Face (Side) */}
                  <polygon points="320,250 530,160 530,250 320,340" fill="#009167" />

                  {/* Light Bulb Icon on Front Face */}
                  <g transform="translate(370, 282) rotate(-24)" stroke="#FFFFFF" strokeWidth="2.2" fill="none">
                    <path d="M -7 -4 C -7 -9 7 -9 7 -4 C 7 -1 4 1 4 4 L -4 4 C -4 1 -7 -1 -7 -4 Z" />
                    <line x1="-3" y1="7" x2="3" y2="7" />
                    <line x1="-2" y1="10" x2="2" y2="10" />
                  </g>
                  {/* PRACTICE Text */}
                  <text
                    x="430"
                    y="268"
                    fontFamily="Barlow Condensed, Anton, sans-serif"
                    fontSize="22"
                    fontWeight="900"
                    fill="#FFFFFF"
                    letterSpacing="0.1em"
                    transform="rotate(-24 430 268)"
                  >
                    PRACTICE
                  </text>
                </g>

                {/* STEP 04 BLOCK: GOLDEN YELLOW (ACHIEVE + FLAG) */}
                <g filter="url(#vectorBlockShadow)" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                  {/* Top Face */}
                  <polygon points="390,170 600,80 500,20 290,110" fill="#FFC220" />
                  {/* Front-Left Face */}
                  <polygon points="290,110 390,170 390,260 290,200" fill="#D49A00" />
                  {/* Front-Right Face (Side) */}
                  <polygon points="390,170 600,80 600,170 390,260" fill="#E5AA00" />

                  {/* Bullseye Target Icon on Front Face */}
                  <g transform="translate(440, 202) rotate(-24)" stroke="#FFFFFF" strokeWidth="2.2" fill="none">
                    <circle cx="0" cy="0" r="12" />
                    <circle cx="0" cy="0" r="7" />
                    <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
                  </g>
                  {/* ACHIEVE Text */}
                  <text
                    x="500"
                    y="188"
                    fontFamily="Barlow Condensed, Anton, sans-serif"
                    fontSize="22"
                    fontWeight="900"
                    fill="#FFFFFF"
                    letterSpacing="0.1em"
                    transform="rotate(-24 500 188)"
                  >
                    ACHIEVE
                  </text>
                </g>

                {/* Golden Flag on Top Yellow Step */}
                <g transform="translate(540, 20)">
                  {/* Pole */}
                  <line x1="0" y1="0" x2="0" y2="70" stroke="#092B4D" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="5" fill="#FFC220" stroke="#092B4D" strokeWidth="2" />
                  {/* Waving Flag */}
                  <path d="M 0 5 Q 25 -5 45 10 Q 25 25 0 32 Z" fill="#FFC220" stroke="#092B4D" strokeWidth="2" strokeLinejoin="round" />
                  {/* Yellow Burst Rays */}
                  <g stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="-20" y1="15" x2="-32" y2="10" />
                    <line x1="-15" y1="35" x2="-28" y2="40" />
                    <line x1="20" y1="-10" x2="25" y2="-22" />
                    <line x1="40" y1="-5" x2="52" y2="-12" />
                    <line x1="55" y1="18" x2="68" y2="18" />
                  </g>
                </g>

                {/* ──────────────────────────────────────────────────────────
                    CREATIVE PROPS ON RIGHT SIDE (Picture Frame, Clapper, Pen/Brush)
                    ────────────────────────────────────────────────────────── */}
                <g filter="url(#vectorBlockShadow)">
                  {/* Framed Landscape Painting Leaning against blocks */}
                  <g transform="translate(560, 250) rotate(8)">
                    {/* Outer Frame */}
                    <rect x="0" y="0" width="115" height="145" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
                    {/* Inner Picture Canvas */}
                    <rect x="10" y="10" width="95" height="125" rx="4" fill="#F0F9FF" />
                    {/* Sun */}
                    <circle cx="32" cy="35" r="14" fill="#FDE047" />
                    {/* Mountain Peaks */}
                    <polygon points="10,135 45,70 75,135" fill="#F97316" />
                    <polygon points="40,135 80,60 105,135" fill="#4338CA" />
                    <polygon points="65,135 90,85 105,135" fill="#E11D48" />
                  </g>

                  {/* Movie Clapperboard */}
                  <g transform="translate(480, 335) rotate(-12)">
                    <rect x="0" y="18" width="85" height="65" rx="5" fill="#092B4D" />
                    {/* Top Clapper Bar */}
                    <g transform="translate(0, 0) rotate(-10)">
                      <rect x="0" y="0" width="85" height="18" rx="3" fill="#092B4D" />
                      {/* White Stripes */}
                      <polygon points="15,0 25,0 15,18 5,18" fill="#FFFFFF" />
                      <polygon points="40,0 50,0 40,18 30,18" fill="#FFFFFF" />
                      <polygon points="65,0 75,0 65,18 55,18" fill="#FFFFFF" />
                    </g>
                    {/* Clapperboard slate text lines */}
                    <line x1="12" y1="35" x2="73" y2="35" stroke="#94A3B8" strokeWidth="2" strokeDasharray="12 6" />
                    <line x1="12" y1="50" x2="73" y2="50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="18 8" />
                  </g>

                  {/* Yellow Pencil sticking up */}
                  <g transform="translate(620, 160) rotate(15)">
                    <rect x="0" y="0" width="14" height="160" rx="3" fill="#F59E0B" />
                    <polygon points="0,160 7,185 14,160" fill="#FDE047" />
                    <polygon points="4,175 7,185 10,175" fill="#092B4D" />
                    <rect x="0" y="0" width="14" height="20" rx="2" fill="#F43F5E" />
                    <rect x="0" y="18" width="14" height="8" fill="#94A3B8" />
                  </g>

                  {/* Artist Paintbrush sticking up */}
                  <g transform="translate(660, 140) rotate(22)">
                    <rect x="0" y="30" width="10" height="170" rx="4" fill="#78350F" />
                    <rect x="-1" y="20" width="12" height="22" rx="2" fill="#CBD5E1" />
                    {/* Dark Bristles */}
                    <path d="M -1 20 C -2 0, 12 0, 11 20 Z" fill="#334155" />
                  </g>

                  {/* Green Foliage Sprouts Right */}
                  <g transform="translate(650, 360)">
                    <path d="M 0 60 Q 30 20 50 30 Q 20 40 0 60 Z" fill="#22C55E" />
                    <path d="M 0 60 Q -20 10 -35 25 Q -10 40 0 60 Z" fill="#15803D" />
                    <path d="M 0 60 Q 5 -10 15 0 Q -5 25 0 60 Z" fill="#4ADE80" />
                  </g>
                </g>

                {/* ──────────────────────────────────────────────────────────
                    THE GIRL STUDENT CHARACTER (Stepping up from Sky Blue to Teal Step)
                    ────────────────────────────────────────────────────────── */}
                {/* ──────────────────────────────────────────────────────────
                    HANDWRITTEN "LEARN BUILD GROW" & PAPER PLANE ROCKET LOOP TRAIL
                    ────────────────────────────────────────────────────────── */}
                <g>
                  {/* Handwritten Text */}
                  <text x="35" y="60" fontFamily="Caveat, cursive" fontSize="34" fontWeight="700" fill="#092B4D" transform="rotate(-7 35 60)">
                    LEARN
                  </text>
                  <text x="44" y="94" fontFamily="Caveat, cursive" fontSize="34" fontWeight="700" fill="#092B4D" transform="rotate(-7 44 94)">
                    BUILD
                  </text>
                  <text x="52" y="128" fontFamily="Caveat, cursive" fontSize="34" fontWeight="700" fill="#092B4D" transform="rotate(-7 52 128)">
                    GROW
                  </text>
                  {/* Yellow underline accent */}
                  <path d="M 45 138 Q 80 148 115 132" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />

                  {/* Dashed Flight Path Trail with Loop */}
                  <path
                    d="M 125 105 C 165 160, 95 165, 95 125 C 95 85, 150 70, 220 85 C 300 105, 380 65, 450 35"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3"
                    strokeDasharray="7 5"
                    strokeLinecap="round"
                  />

                  {/* Line Art Paper Rocket / Airplane at end of flight path */}
                  <g transform="translate(455, 20) rotate(-22) scale(0.9)" filter="url(#vectorGirlShadow)">
                    <polygon points="0,35 60,0 20,42" fill="#FFFFFF" stroke="#092B4D" strokeWidth="2.5" strokeLinejoin="round" />
                    <polygon points="60,0 20,42 42,28" fill="#F0F9FF" stroke="#092B4D" strokeWidth="2.5" strokeLinejoin="round" />
                    <polygon points="20,42 42,28 26,20" fill="#0284C7" stroke="#092B4D" strokeWidth="2" strokeLinejoin="round" />
                    <line x1="60" y1="0" x2="20" y2="42" stroke="#092B4D" strokeWidth="2.2" />
                    <path d="M 30 24 L 34 29 M 35 20 L 40 25 M 25 28 L 28 32" stroke="#092B4D" strokeWidth="1.8" strokeLinecap="round" />
                  </g>
                </g>

                {/* ──────────────────────────────────────────────────────────
                    BOTTOM RIGHT: "Dream Learn Create" WITH CROWN SKETCH
                    ────────────────────────────────────────────────────────── */}
                <g transform="translate(540, 470)">
                  {/* Crown Sketch */}
                  <path d="M 80 0 L 87 14 L 97 2 L 107 14 L 114 0 L 118 20 L 76 20 Z" fill="none" stroke="#092B4D" strokeWidth="2.5" strokeLinejoin="round" />
                  {/* Handwritten Text */}
                  <text x="45" y="42" fontFamily="Caveat, cursive" fontSize="28" fontWeight="700" fill="#092B4D" transform="rotate(-6 45 42)">
                    Dream
                  </text>
                  <text x="60" y="68" fontFamily="Caveat, cursive" fontSize="28" fontWeight="700" fill="#092B4D" transform="rotate(-6 60 68)">
                    Learn
                  </text>
                  <text x="55" y="95" fontFamily="Caveat, cursive" fontSize="28" fontWeight="700" fill="#092B4D" transform="rotate(-6 55 95)">
                    Create
                  </text>
                  {/* Yellow underline */}
                  <path d="M 55 105 Q 90 112 125 98" fill="none" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                </g>

              </svg>
            </div>
          </motion.div>

        </div>

        {/* ── Continuous 3D Ribbon Road & Milestones Container ── */}
        <div className="relative">

          {/* ══════════════════════════════════════════════════════════════════
              DESKTOP 3D ISOMETRIC SERPENTINE ROAD (SVG PATH WITH 3D EXTRUSION)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:block pointer-events-none absolute inset-0 z-0 overflow-visible">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1200 3200"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Master Ribbon Road Gradient */}
                <linearGradient id="ribbon3dGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="30%" stopColor="#0EA5E9" />
                  <stop offset="55%" stopColor="#D97706" />
                  <stop offset="78%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>

                {/* 3D Extrusion Side Wall Gradient */}
                <linearGradient id="ribbon3dWallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0369A1" />
                  <stop offset="30%" stopColor="#0284C7" />
                  <stop offset="55%" stopColor="#92400E" />
                  <stop offset="78%" stopColor="#065F46" />
                  <stop offset="100%" stopColor="#9A3412" />
                </linearGradient>

                {/* Drop shadow for 3D depth */}
                <filter id="roadGroundShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="16" />
                  <feOffset dx="0" dy="24" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.16" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Base 3D Soft Cast Shadow */}
              <path
                d="M 600 0 
                   C 600 120, 850 160, 880 380 
                   C 910 600, 880 750, 600 880
                   C 320 1010, 290 1200, 320 1420 
                   C 350 1640, 520 1760, 600 1880
                   C 680 2000, 880 2120, 880 2340 
                   C 880 2560, 720 2680, 600 2820
                   C 480 2960, 320 3060, 320 3200"
                stroke="rgba(15, 23, 42, 0.12)"
                strokeWidth="110"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, 30)"
                filter="url(#roadGroundShadow)"
              />

              {/* 2. 3D Extrusion Side Layer (Gives the isometric thickness like reference) */}
              <path
                d="M 600 0 
                   C 600 120, 850 160, 880 380 
                   C 910 600, 880 750, 600 880
                   C 320 1010, 290 1200, 320 1420 
                   C 350 1640, 520 1760, 600 1880
                   C 680 2000, 880 2120, 880 2340 
                   C 880 2560, 720 2680, 600 2820
                   C 480 2960, 320 3060, 320 3200"
                stroke="url(#ribbon3dWallGradient)"
                strokeWidth="84"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, 14)"
              />

              {/* 3. Top Ribbon Surface Path */}
              <path
                d="M 600 0 
                   C 600 120, 850 160, 880 380 
                   C 910 600, 880 750, 600 880
                   C 320 1010, 290 1200, 320 1420 
                   C 350 1640, 520 1760, 600 1880
                   C 680 2000, 880 2120, 880 2340 
                   C 880 2560, 720 2680, 600 2820
                   C 480 2960, 320 3060, 320 3200"
                stroke="url(#ribbon3dGradient)"
                strokeWidth="78"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 4. Top Ribbon Inner Highlight Stroke */}
              <path
                d="M 600 0 
                   C 600 120, 850 160, 880 380 
                   C 910 600, 880 750, 600 880
                   C 320 1010, 290 1200, 320 1420 
                   C 350 1640, 520 1760, 600 1880
                   C 680 2000, 880 2120, 880 2340 
                   C 880 2560, 720 2680, 600 2820
                   C 480 2960, 320 3060, 320 3200"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="14 16"
              />

              {/* 5. Animated Scroll Progress Glow Overlay */}
              <motion.path
                d="M 600 0 
                   C 600 120, 850 160, 880 380 
                   C 910 600, 880 750, 600 880
                   C 320 1010, 290 1200, 320 1420 
                   C 350 1640, 520 1760, 600 1880
                   C 680 2000, 880 2120, 880 2340 
                   C 880 2560, 720 2680, 600 2820
                   C 480 2960, 320 3060, 320 3200"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
                style={{
                  pathLength: pathLengthSpring,
                  opacity: 0.9,
                  filter: "drop-shadow(0 0 8px #FFFFFF)"
                }}
              />
            </svg>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              MOBILE VERTICAL CONTINUOUS RIBBON (LEFT-ALIGNED TRACK)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="block lg:hidden pointer-events-none absolute left-6 sm:left-10 top-0 bottom-0 z-0 w-8">
            <div className="h-full w-3.5 mx-auto rounded-full bg-gradient-to-b from-[#0284C7] via-[#F59E0B] via-[#059669] to-[#EA580C] shadow-lg relative">
              {/* Inner glowing core */}
              <div className="absolute inset-0 w-1 mx-auto rounded-full bg-white/60" />
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              COURSE MILESTONES (ALTERNATING S-CURVE NODES)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="relative z-10 flex flex-col gap-28 sm:gap-40 lg:gap-52 py-6">
            {COURSES.map((course, index) => {
              const isEven = index % 2 === 0; // Alternate the content and artwork around the center road.
              const isDetailsOpen = openDetailIndex === index;

              return (
                <div
                  key={course.number}
                  id={`milestone-item-${index}`}
                  className="relative scroll-mt-32"
                >
                  {/* Outer wrapper: Alternates on desktop */}
                  <div className={`flex flex-col lg:items-center lg:gap-28 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-8 pl-14 sm:pl-20 lg:pl-0`}>

                    {/* ──────────────────────────────────────────────────────────
                        COLUMN A: EDITORIAL COURSE CARD (Milestone Details)
                        ────────────────────────────────────────────────────────── */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 30 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full lg:w-[calc(50%-3.5rem)] flex flex-col ${index === 3 ? "lg:translate-x-16 xl:translate-x-24" : ""}`}
                    >
                      <div className="group relative px-1 py-3 sm:px-5 sm:py-5">
                        {/* Ambient corner light glow */}
                        <div
                          className="pointer-events-none absolute -right-12 -top-12 -z-10 h-52 w-52 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                          style={{ backgroundColor: course.color }}
                        />

                        {/* Top Header: Badge, Duration & Milestone Indicator */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                          <div className="flex items-center gap-2.5">
                            {/* Milestone Category Pill */}
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider"
                              style={{
                                backgroundColor: course.accentBg,
                                color: course.labelColor
                              }}
                            >
                              <Sparkles className="h-3 w-3" />
                              {course.tag}
                            </span>

                            {/* Level Pill */}
                            <span className="hidden sm:inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                              {course.level}
                            </span>
                          </div>

                          {/* Duration Badge */}
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                          {course.title}{" "}
                          <span
                            className="block sm:inline font-extrabold"
                            style={{ color: course.color }}
                          >
                            {course.subtitle}
                          </span>
                        </h3>

                        {/* Description */}
                        <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
                          {course.description}
                        </p>

                        {/* Highlight Callout Box */}
                        <div className="mt-5 flex items-center gap-2.5 border-l-2 py-1 pl-3 text-xs font-bold text-slate-700" style={{ borderColor: course.color }}>
                          <Award className="h-4 w-4 shrink-0" style={{ color: course.color }} />
                          <span>{course.highlight}</span>
                        </div>

                        {/* Skills / Topics Chips */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {course.topics.map((topic) => (
                            <span
                              key={topic}
                              className="border-b border-slate-300 px-1 py-1 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-600"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        {/* Interactive "What You'll Learn" Accordion Panel */}
                        <div className="mt-6 border-t border-slate-100 pt-5">
                          <button
                            type="button"
                            onClick={() => toggleDetail(index)}
                            id={`journey-curriculum-toggle-${course.number}`}
                            className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <Layers className="h-3.5 w-3.5" style={{ color: course.color }} />
                              <span>Explore Detailed Curriculum & Modules</span>
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${isDetailsOpen ? "rotate-180 text-slate-900" : ""
                                }`}
                            />
                          </button>

                          {/* Expandable Content */}
                          {isDetailsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="mt-4 space-y-4 border-l-2 border-slate-200 py-2 pl-4 sm:pl-5"
                            >
                              {course.details.map((group) => (
                                <div key={group.heading} className="space-y-1.5">
                                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: course.color }} />
                                    {group.heading}
                                  </h4>
                                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-3">
                                    {group.items.map((item) => (
                                      <li key={item} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug">
                                        <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0 text-emerald-500" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>

                        {/* Action Buttons: Enroll & Talk to Mentor */}
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => openEnrollment(course.title)}
                            id={`enroll-journey-${course.number}`}
                            className="group flex-1 min-w-[170px] inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-black text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                            style={{
                              backgroundColor: course.color,
                              boxShadow: `0 10px 25px -6px ${course.glowColor}`
                            }}
                          >
                            <span>Enroll in {course.title.split("+")[0]}</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openEnrollment("")}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
                          >
                            <span>Syllabus PDF</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* ──────────────────────────────────────────────────────────
                        COLUMN B: 3D ISOMETRIC VISUAL STAGE & CALLOUT BEACON
                        (Positioned directly on the winding road path)
                        ────────────────────────────────────────────────────────── */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 40 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full lg:w-[calc(50%-3.5rem)] relative flex items-center ${isEven ? "lg:justify-end" : "lg:justify-start"} justify-center`}
                    >
                      {/* 3D Visual Floating Card Stage */}
                      <div className="relative group w-full max-w-[380px]">

                        {/* Milestone Number Badge (Large 3D glowing sphere) */}
                        <div
                          className="absolute -top-5 left-3 sm:-top-6 sm:left-4 z-30 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl sm:rounded-3xl text-lg sm:text-xl font-black text-white shadow-[0_12px_32px_-6px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            background: `linear-gradient(135deg, ${course.color}, ${course.colorDark})`,
                            boxShadow: `0 14px 36px -8px ${course.glowColor}`
                          }}
                        >
                          {course.badgeNumber}
                        </div>

                        {/* Milestone label */}
                        <div className="absolute -bottom-8 right-2 z-30 flex items-center gap-2 border-b border-slate-300 px-1 py-2 text-xs font-bold text-slate-800">
                          <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: course.color }} />
                          <span>{course.milestoneTitle}</span>
                        </div>

                        {/* Artwork sits directly beside the road, without a card frame. */}
                        <div className="relative transition-transform duration-700 group-hover:-translate-y-2">
                          <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-slate-100 shadow-[0_28px_55px_-30px_rgba(15,23,42,0.45)]">
                            <Image
                              src={course.image}
                              alt={course.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                              priority={index === 0}
                            />

                            {/* Inner Glass Highlights */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-white/10 pointer-events-none" />

                            {/* Dotted Leader Line & Tag Overlay (like reference image) */}
                            <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 rounded-full bg-slate-900/80 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                              <Compass className="h-3 w-3 text-amber-400" />
                              <span>{course.milestoneCategory}</span>
                            </div>
                          </div>
                        </div>

                        {/* 3D Platform Ground Glow */}
                        <div
                          className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-16 rounded-full blur-2xl -z-10 opacity-40 transition-opacity group-hover:opacity-70"
                          style={{ backgroundColor: course.color }}
                        />
                      </div>
                    </motion.div>

                  </div>

                  {/* ──────────────────────────────────────────────────────────
                      WAYPOINT ROAD BEACON (The Node on the Center Ribbon)
                      ────────────────────────────────────────────────────────── */}
                  <div className="hidden lg:flex pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center">
                    {/* Glowing Waypoint Ring */}
                    <div
                      className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl border-4"
                      style={{ borderColor: course.color }}
                    >
                      <span className="h-4 w-4 rounded-full" style={{ backgroundColor: course.color }} />
                      <span
                        className="absolute -inset-2 rounded-full opacity-40 animate-ping"
                        style={{ backgroundColor: course.color }}
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
