"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Lightbulb, Presentation, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const highlights = [
    { title: "Future-ready curriculum", text: "Courses shaped around tomorrow's creative tools and skills.", icon: Sparkles },
    { title: "Industry expert sessions", text: "Learn directly from celebrated creatives and practitioners.", icon: Presentation },
    { title: "Live project exposure", text: "Turn classroom knowledge into meaningful real-world work.", icon: BriefcaseBusiness },
    { title: "Creative mentorship", text: "Build confidence, imagination and an original point of view.", icon: Lightbulb },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const experienceBadgeRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // Desktop & Tablet choreographed sequence
            mm.add("(min-width: 768px)", () => {
                // Main Content Reveal Timeline
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 25%",
                        toggleActions: "play none none reverse",
                    },
                    defaults: { ease: "power3.out" },
                });

                tl.fromTo(
                    badgeRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6 }
                )
                    .fromTo(
                        headingRef.current,
                        { opacity: 0, y: 35 },
                        { opacity: 1, y: 0, duration: 0.9 },
                        "-=0.4"
                    )
                    .fromTo(
                        paragraphsRef.current,
                        { opacity: 0, y: 25 },
                        { opacity: 1, y: 0, duration: 0.8 },
                        "-=0.6"
                    )
                    .fromTo(
                        ctaRef.current,
                        { opacity: 0, x: -15 },
                        { opacity: 1, x: 0, duration: 0.6 },
                        "-=0.4"
                    )
                    .fromTo(
                        imageWrapperRef.current,
                        { opacity: 0, scale: 0.94, x: -30 },
                        { opacity: 1, scale: 1, x: 0, duration: 1.1, ease: "power2.out" },
                        "-=0.9"
                    )
                    .fromTo(
                        experienceBadgeRef.current,
                        { opacity: 0, scale: 0.75, y: 30 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
                        "-=0.6"
                    );

                // Parallax depth on image during scroll
                gsap.to(imageWrapperRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                    yPercent: -8,
                    ease: "none",
                });

                // Cards entrance staggered
                if (cardsContainerRef.current) {
                    const cards = cardsContainerRef.current.children;
                    gsap.fromTo(
                        cards,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            stagger: 0.12,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: cardsContainerRef.current,
                                start: "top 82%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            });

            // Mobile view: gentle fade without aggressive movement
            mm.add("(max-width: 767px)", () => {
                gsap.fromTo(
                    [badgeRef.current, headingRef.current, paragraphsRef.current, imageWrapperRef.current],
                    { opacity: 0, y: 24 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                if (cardsContainerRef.current) {
                    gsap.fromTo(
                        cardsContainerRef.current.children,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: cardsContainerRef.current,
                                start: "top 90%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                }
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative isolate overflow-hidden bg-[#f4f8fb] px-5 py-24 text-slate-900 transition-colors duration-700 sm:px-8 sm:py-32 lg:px-12 xl:px-16"
        >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -right-36 -top-36 -z-10 h-96 w-96 rounded-full bg-[#ffd629]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#087ec5]/12 blur-3xl" />

            <div className="mx-auto max-w-[1500px]">
                <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 xl:gap-28">
                    {/* Visual Showcase Card */}
                    <div ref={imageWrapperRef} className="will-change-transform relative pb-8 sm:pr-8 lg:pb-10">
                        <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-[2.5rem] border-l-2 border-t-2 border-[#ffd629] sm:-left-6 sm:-top-6" />
                        
                        <div className="relative overflow-hidden rounded-[1.75rem] bg-[#092b4d] shadow-[0_28px_70px_-24px_rgba(9,43,77,0.40)] sm:rounded-[2.5rem]">
                            <Image
                                src="/about-students.png"
                                alt="Students learning creative skills with an industry mentor"
                                width={1536}
                                height={1024}
                                sizes="(min-width: 1024px) 52vw, 100vw"
                                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#061f37]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
                                <p className="max-w-xs text-xl font-black leading-tight sm:text-2xl">
                                    A space to think, make and grow.
                                </p>
                                <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-white/35 bg-white/15 backdrop-blur-md sm:grid">
                                    <Sparkles className="h-5 w-5 text-[#ffd629]" />
                                </span>
                            </div>
                        </div>

                        {/* 15+ Years Creative Impact Badge */}
                        <div
                            ref={experienceBadgeRef}
                            className="absolute bottom-0 right-0 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl shadow-[#092b4d]/15 backdrop-blur-md sm:right-1 sm:flex sm:items-center sm:gap-4 sm:rounded-3xl sm:px-6 sm:py-5"
                        >
                            <p className="text-3xl font-black leading-none text-[#087ec5] sm:text-4xl">
                                15<span className="text-[#ffd629]">+</span>
                            </p>
                            <p className="mt-1 text-[10px] font-extrabold uppercase leading-4 tracking-[0.14em] text-[#092b4d] sm:mt-0">
                                Years of<br />creative impact
                            </p>
                        </div>
                    </div>

                    {/* Editorial Content */}
                    <div>
                        <div
                            ref={badgeRef}
                            className="inline-flex items-center gap-3 rounded-full border border-[#087ec5]/20 bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#087ec5] shadow-sm"
                        >
                            <span className="h-2 w-2 rounded-full bg-[#ffd629]" />
                            About GAA
                        </div>

                        <h2
                            ref={headingRef}
                            className="mt-6 max-w-2xl text-3xl font-black leading-[1.08] tracking-[-0.035em] text-[#092b4d] sm:text-4xl lg:text-5xl"
                        >
                            Creativity becomes a{" "}
                            <span className="relative inline-block text-[#087ec5]">
                                career
                                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-[#ffd629]" />
                            </span>{" "}
                            here.
                        </h2>

                        <div ref={paragraphsRef} className="space-y-4">
                            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                                Global Academy of Artistry is a futuristic academy from the house of Yellowtooths,
                                bringing 15+ years of creative industry experience into the classroom.
                            </p>
                            <p className="max-w-2xl text-base leading-7 text-slate-600">
                                We combine hands-on learning, expert mentorship and live projects to shape independent
                                thinkers—not just regular employees.
                            </p>
                        </div>

                        <Link
                            ref={ctaRef}
                            href="#courses"
                            className="group mt-8 inline-flex items-center gap-3 font-extrabold text-[#092b4d] transition-colors hover:text-[#087ec5]"
                        >
                            Discover our courses
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffd629] text-[#092b4d] shadow-md transition-transform group-hover:translate-x-1 group-hover:bg-[#ffe15c]">
                                <ArrowUpRight className="h-4 w-4" />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Highlight Cards Grid */}
                <div
                    ref={cardsContainerRef}
                    className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-5"
                >
                    {highlights.map(({ title, text, icon: Icon }, index) => (
                        <article
                            key={title}
                            className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-[1.75rem] border border-[#d8e6f0] bg-white p-6 text-[#092b4d] shadow-[0_18px_45px_-32px_rgba(9,43,77,0.45)] transition-[transform,box-shadow,background-color,border-color,color] duration-300 hover:-translate-y-1.5 hover:border-[#092b4d] hover:bg-[#092b4d] hover:text-white hover:shadow-[0_28px_55px_-28px_rgba(9,43,77,0.4)] sm:p-7"
                        >
                            <div className="absolute inset-x-0 top-0 h-1 bg-[#087ec5] transition-colors duration-300 group-hover:bg-[#ffd629]" />
                            <div className="mb-10 flex items-start justify-between">
                                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e8f4fb] text-[#087ec5] transition-colors duration-300 group-hover:bg-[#ffd629] group-hover:text-[#092b4d]">
                                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                                </span>
                                <span className="text-4xl font-black leading-none tracking-[-0.08em] text-[#d8e8f2] transition-colors duration-300 group-hover:text-white/20">
                                    0{index + 1}
                                </span>
                            </div>
                            <h3 className="text-xl font-black leading-tight tracking-[-0.03em]">
                                {title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600 transition-colors duration-300 group-hover:text-[#c5d6e5]">
                                {text}
                            </p>
                            <div className="mt-auto pt-6">
                                <div className="h-px w-full bg-[#dce8f0] transition-colors duration-300 group-hover:bg-white/20" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
