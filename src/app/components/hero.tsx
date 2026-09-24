"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const titleLine1Ref = useRef<HTMLSpanElement>(null);
    const titleLine2Ref = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollDownRef = useRef<HTMLAnchorElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // Initial Entrance Animation
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                bgContainerRef.current,
                { scale: 1.08, opacity: 0.7 },
                { scale: 1.02, opacity: 1, duration: 1.8, ease: "power2.out" }
            )
                .fromTo(
                    tagRef.current,
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=1.2"
                )
                .fromTo(
                    titleLine1Ref.current,
                    { opacity: 0, y: 36 },
                    { opacity: 1, y: 0, duration: 1.0 },
                    "-=0.7"
                )
                .fromTo(
                    titleLine2Ref.current,
                    { opacity: 0, y: 36 },
                    { opacity: 1, y: 0, duration: 1.0 },
                    "-=0.8"
                )
                .fromTo(
                    descRef.current,
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: 0.9 },
                    "-=0.7"
                )
                .fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 20, scale: 0.96 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(
                    scrollDownRef.current,
                    { opacity: 0, y: 15 },
                    { opacity: 0.85, y: 0, duration: 0.8 },
                    "-=0.5"
                );

            // Scroll-driven exit choreography (Desktop / Tablet)
            mm.add("(min-width: 768px)", () => {
                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                });

                // Image scales down smoothly from 1.02 to 0.96, subtle vertical parallax
                scrollTl.to(
                    bgContainerRef.current,
                    {
                        scale: 0.96,
                        yPercent: 14,
                        opacity: 0.45,
                        ease: "none",
                    },
                    0
                );

                // Content translates upward and smoothly fades
                scrollTl.to(
                    contentRef.current,
                    {
                        y: -80,
                        opacity: 0,
                        ease: "power1.in",
                    },
                    0
                );

                // Scroll down indicator fades quickly
                scrollTl.to(
                    scrollDownRef.current,
                    {
                        opacity: 0,
                        y: -20,
                        ease: "power1.in",
                    },
                    0
                );
            });

            // Mobile optimized scroll behavior
            mm.add("(max-width: 767px)", () => {
                gsap.to(bgContainerRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    opacity: 0.6,
                    scale: 0.98,
                    ease: "none",
                });
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#034b86] text-white"
        >
            {/* Background Media with Parallax Container */}
            <div
                ref={bgContainerRef}
                className="will-change-transform absolute inset-0 -z-30 h-full w-full origin-center"
            >
                <Image
                    src="/gaa.jpeg"
                    alt="Global Academy of Artistry building"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[68%_center] sm:object-[62%_center] lg:object-center"
                />
            </div>

            {/* Editorial Gradient Overlays for GAA Cinematic Tone */}
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(1,54,100,0.95)_0%,rgba(2,91,157,0.82)_38%,rgba(2,61,108,0.30)_68%,rgba(0,24,45,0.22)_100%)]" />
            <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-t from-[#021a30]/80 via-transparent to-[#021a30]/30" />

            {/* Subtle Ambient Glow Elements */}
            <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#ffd629]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#087ec5]/25 blur-3xl" />

            <div
                ref={contentRef}
                className="will-change-transform mx-auto flex w-full max-w-[1500px] flex-col justify-center px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-12 xl:px-16"
            >
                <div className="relative max-w-3xl">
                    {/* GAA Category Tag */}
                    <div
                        ref={tagRef}
                        className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/95 backdrop-blur-md sm:text-[11px]"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ffd629]" />
                        <span>Learn&nbsp; / &nbsp;Create&nbsp; / &nbsp;Explore</span>
                    </div>

                    {/* Masked Editorial Headline */}
                    <h1 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-[3.85rem]">
                        <span ref={titleLine1Ref} className="block">
                            Where Creativity
                        </span>
                        <span ref={titleLine2Ref} className="mt-2 block">
                            <span className="text-[#ffd629]">Builds</span> Your Future
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        ref={descRef}
                        className="mt-6 max-w-xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7 lg:text-lg"
                    >
                        Global Academy of Artistry is a premier institution dedicated to nurturing creativity,
                        inspiring innovation and shaping tomorrow&apos;s leaders in the arts and beyond.
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="#courses"
                            className="group inline-flex items-center gap-2.5 rounded-full bg-[#ffd629] px-6 py-3.5 text-xs font-extrabold text-[#142238] shadow-xl shadow-yellow-500/25 transition-all hover:-translate-y-1 hover:bg-[#ffe15c] hover:shadow-yellow-500/35 sm:px-7 sm:py-4 sm:text-sm"
                        >
                            Explore Courses
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#about"
                            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 sm:px-7 sm:py-4 sm:text-sm"
                        >
                            About GAA
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <a
                ref={scrollDownRef}
                href="#about"
                aria-label="Scroll to about section"
                className="absolute bottom-8 left-5 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/80 transition-colors hover:text-white sm:flex sm:left-8 lg:left-12 xl:left-16"
            >
                <span className="grid h-11 w-7 place-items-center rounded-full border-2 border-white/70">
                    <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#ffd629]" />
                </span>
                <span>Scroll down</span>
            </a>
        </section>
    );
}
