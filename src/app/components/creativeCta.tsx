"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, BadgeCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const mentors = [
    { name: "Christina", courses: ["GRAPHIC DESIGN + UI/UX With AI – Integration"], image: "/mentor-uiux.png" },
    { name: "Ancy", courses: ["GRAPHIC DESIGN + 3D With AI – Integration"], image: "/mentor-film-poster-woman.png" },
    { name: "Lakshmi", courses: ["Film Poster Design"], image: "/mentor-marketing.png" },
    { name: "Maria", courses: ["Digital Marketing with AI Tools"], image: "/mentor-motion-design-woman.png" },
];

export default function CreativeCta() {
    const sectionRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const timeline = gsap.timeline({
            scrollTrigger: { trigger: sectionRef.current, start: "top 76%", once: true },
        });

        timeline
            .fromTo(".mentor-intro > *", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" })
            .fromTo(".mentor-card", { autoAlpha: 0, y: 48, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }, "-=0.35")
            .fromTo(".mentor-cta", { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.65, ease: "back.out(1.7)" }, "-=0.2");

        gsap.to(".mentor-glow", { scale: 1.18, opacity: 0.8, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
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

    return (
        <section id="mentorship" ref={sectionRef} className="relative isolate overflow-hidden bg-[#031a31] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="mentor-glow pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#087ec5]/20 blur-[130px]" />
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(#159ee9_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(120deg,black,transparent_26%,transparent_74%,black)]" />
            <div className="pointer-events-none absolute -left-24 -top-24 h-52 w-52 rotate-45 border-r border-[#159ee9]/35" />
            <div className="pointer-events-none absolute -bottom-28 -right-28 h-64 w-64 rotate-45 border-l border-[#159ee9]/30" />

            <div className="relative mx-auto max-w-[1320px]">
                <div className="mentor-intro text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#19adff]/35 bg-[#052845]/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#39c1ff]">
                        <BadgeCheck className="h-4 w-4 text-[#ffd629]" /> Our qualified people matter
                    </div>
                    <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                        Meet our <span className="bg-gradient-to-r from-[#35c9ff] to-[#087ec5] bg-clip-text text-transparent">expert mentors</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#b3c9db] sm:text-base">
                        Learn from working creatives who bring real-world experience, honest feedback and personal guidance to every project.
                    </p>
                </div>

                <div className="mx-auto mt-11 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {mentors.map((mentor) => (
                        <article key={mentor.name} className="mentor-card group relative rounded-2xl border border-[#159ee9]/45 bg-[#041d36]/80 p-3 shadow-[0_24px_55px_-35px_rgba(14,171,255,.8)] transition-all duration-500 hover:-translate-y-2 hover:border-[#39c1ff] hover:shadow-[0_28px_60px_-25px_rgba(14,171,255,.55)]">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[#0858d5] via-[#087ec5] to-[#20b8f5]">
                                <div className="absolute -bottom-[26%] left-1/2 h-[108%] w-[120%] -translate-x-1/2 rounded-full bg-[#087ff0]/70 ring-1 ring-white/20" />
                                <Image
                                    src={mentor.image}
                                    alt={`Temporary AI portrait for ${mentor.name}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.045]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#031a31]/80 via-transparent to-transparent" />
                            </div>

                            <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-4">
                                <div>
                                    <div className="space-y-0.5">
                                        {mentor.courses.map((course) => (
                                            <span key={course} className="block text-[8px] font-black uppercase leading-3 tracking-[0.08em] text-[#35c9ff]">{course}</span>
                                        ))}
                                    </div>
                                    <h3 className="mt-1.5 text-lg font-black leading-5 text-white">{mentor.name}</h3>
                                </div>
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#35c9ff]/60 text-[#35c9ff] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#35c9ff] group-hover:text-[#031a31]">
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mentor-cta mt-10 flex items-center justify-center gap-3 sm:gap-5">
                    <span className="h-px max-w-48 flex-1 bg-gradient-to-r from-transparent via-[#159ee9] to-[#ffd629]" />
                    <button
                        ref={buttonRef}
                        type="button"
                        onClick={openEnrollment}
                        onPointerMove={moveButton}
                        onPointerLeave={resetButton}
                        className="group relative isolate flex items-center gap-3 overflow-hidden rounded-full bg-[#ffd629] px-6 py-3.5 text-xs font-black text-[#06213b] shadow-[0_0_35px_rgba(255,214,41,.35)] transition-transform hover:scale-[1.03] sm:px-8 sm:text-sm"
                    >
                        <span className="absolute inset-y-0 -left-1/2 -z-10 w-1/3 -skew-x-12 bg-white/70 blur-sm transition-all duration-700 group-hover:left-[125%]" />
                        Join our creative community
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#06213b] text-[#ffd629] transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    </button>
                    <span className="h-px max-w-48 flex-1 bg-gradient-to-l from-transparent via-[#159ee9] to-[#ffd629]" />
                </div>

            </div>
        </section>
    );
}
