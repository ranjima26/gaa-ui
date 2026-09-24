"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Bot, Clock3, Layers3, Sparkles, WandSparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const courses = [
    { title: "GRAPHIC DESIGN + UI/UX With AI – Integration", tag: "Flagship", duration: "8 months training + 2-month internship at Yellowtooths", description: "Build visual identities and digital experiences with AI-assisted creative workflows.", image: "/course-design.jpg", icon: Layers3, number: "01", color: "#b7f36b", topics: ["Visual identity and graphic design", "User interface and experience design", "AI-assisted creative workflows", "Portfolio and project presentation"] },
    { title: "GRAPHIC DESIGN + 3D With AI – Integration", tag: "Studio", duration: "8 months training + 2-month internship at Yellowtooths", description: "Bring graphic ideas into three dimensions, from concept to finished presentation.", image: "/course-animation.jpg", icon: Sparkles, number: "02", color: "#85d6ff", topics: ["Graphic design fundamentals", "3D modeling and composition", "AI-assisted visual creation", "Portfolio and project presentation"] },
    { title: "Film Poster Design", tag: "Crash course", duration: "3 months", description: "Create cinematic poster concepts through typography, composition and retouching.", image: "/poster.png", icon: WandSparkles, number: "03", color: "#ffbc77", topics: ["Film poster concepts", "Typography and visual hierarchy", "Image composition and retouching", "Campaign-ready artwork"] },
    { title: "Digital Marketing with AI Tools", tag: "AI marketing", duration: "3 months", description: "Plan creative campaigns and social content with modern AI marketing tools.", image: "/digital.png", icon: Bot, number: "04", color: "#c3adff", topics: ["Digital campaign planning", "Social content and creative strategy", "AI tools for marketing workflows", "Measuring and improving results"] },
];

function CourseVisual({ index, image, title, number }: { index: number; image: string | null; title: string; number: string }) {
    return (
        <div className="course-visual relative min-h-[300px] overflow-hidden border border-white/10 bg-[#0b2943] sm:min-h-[380px] lg:min-h-[430px]">
            {image ? (
                <div className="course-visual-art absolute -inset-y-[5%] inset-x-0">
                    <Image src={image} alt={`Creative workspace for ${title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04182b]/70 via-transparent to-transparent" />
                </div>
            ) : index === 2 ? (
                <div className="course-visual-art relative grid h-full min-h-[300px] place-items-center overflow-hidden bg-[#121b2a] sm:min-h-[380px] lg:min-h-[430px]">
                    <div className="absolute -right-16 top-4 h-64 w-64 rounded-full border border-[#ffbc77]/20" />
                    <div className="absolute -left-14 bottom-0 h-52 w-52 rounded-full border border-[#ffbc77]/15" />
                    <div className="relative h-64 w-[60%] min-w-[200px] -rotate-6 overflow-hidden border border-white/20 bg-[#291f29] shadow-[18px_22px_45px_rgba(0,0,0,0.35)] sm:h-80 lg:h-96">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_30%,#a96f57_0%,#583b48_34%,#182538_70%)]" />
                        <div className="absolute left-[12%] top-[15%] h-[48%] w-[76%] -rotate-12 rounded-[50%] border-[18px] border-[#f6c899]/45 blur-[1px]" />
                        <div className="absolute bottom-0 left-0 right-0 h-[43%] bg-gradient-to-t from-[#101521] via-[#101521]/80 to-transparent" />
                        <span className="absolute left-[9%] top-[7%] text-[8px] font-bold uppercase tracking-[0.3em] text-white/70">A study in visual storytelling</span>
                        <span className="absolute bottom-[9%] left-[9%] text-4xl font-black uppercase leading-[0.85] tracking-[-0.08em] text-[#fff0db] sm:text-5xl lg:text-6xl">Beyond<br />Form</span>
                        <span className="absolute bottom-[4%] left-[9%] text-[7px] font-bold uppercase tracking-[0.25em] text-white/60">Film poster / creative direction</span>
                    </div>
                </div>
            ) : (
                <div className="course-visual-art relative flex h-full min-h-[300px] items-center justify-center overflow-hidden bg-[#0b2943] p-7 sm:min-h-[380px] sm:p-10 lg:min-h-[430px]">
                    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#5b85a5_1px,transparent_1px)] [background-size:24px_24px]" />
                    <div className="relative w-full max-w-md border border-[#8ab3d0]/30 bg-[#061a30] shadow-[16px_20px_0_rgba(2,15,29,0.5)]">
                        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#c3adff]">Campaign studio</span>
                            <span className="flex gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[#c3adff]" /><i className="h-1.5 w-1.5 rounded-full bg-[#c3adff]/40" /><i className="h-1.5 w-1.5 rounded-full bg-[#c3adff]/20" /></span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 border-b border-white/10 p-5">
                            {["Reach", "Engagement", "Growth"].map((label, item) => (
                                <div key={label} className="border-l border-[#c3adff]/40 pl-3">
                                    <span className="block text-[9px] uppercase tracking-wider text-[#9fb9d1]">{label}</span>
                                    <strong className="mt-1 block text-xl font-black text-white sm:text-2xl">{["82K", "14.8%", "+36%"][item]}</strong>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 pb-6 pt-5">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9fb9d1]">Audience momentum</span>
                            <svg viewBox="0 0 320 105" className="mt-3 w-full" aria-hidden="true">
                                <path d="M0 91 H320 M0 55 H320 M0 19 H320" fill="none" stroke="#44617a" strokeDasharray="3 6" opacity="0.5" />
                                <path d="M0 88 C35 76 44 84 72 70 S112 55 135 62 S176 30 198 38 S244 49 265 19 S295 27 320 7" fill="none" stroke="#c3adff" strokeWidth="3" strokeLinecap="round" />
                                <circle cx="320" cy="7" r="5" fill="#ffd629" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
            <div className="pointer-events-none absolute bottom-4 right-5 border border-white/30 bg-[#061a30]/75 px-3 py-1.5 text-[10px] font-black tracking-[0.22em] text-white backdrop-blur-sm">GAA / {number}</div>
        </div>
    );
}

export default function OurCourse() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        gsap.fromTo(".course-heading", { autoAlpha: 0, y: 30 }, {
            autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        });

        gsap.utils.toArray<HTMLElement>(".course-row").forEach((row, index) => {
            const copy = row.querySelector(".course-copy");
            const visual = row.querySelector(".course-visual");
            const art = row.querySelector(".course-visual-art");
            if (!copy || !visual || !art) return;

            const reveal = gsap.timeline({
                defaults: { ease: "none", force3D: true },
                scrollTrigger: { trigger: row, start: "top 90%", end: "top 50%", scrub: 0.9, invalidateOnRefresh: true },
            });
            reveal.fromTo(copy, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1 }, 0);
            reveal.fromTo(visual, { autoAlpha: 0, scale: 0.97, x: index % 2 === 0 ? 16 : -16 }, { autoAlpha: 1, scale: 1, x: 0, duration: 1 }, 0.08);

            gsap.fromTo(art, { yPercent: -2 }, {
                yPercent: 2, ease: "none", force3D: true,
                scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 1.2, invalidateOnRefresh: true },
            });
            ScrollTrigger.create({ trigger: row, start: "top 60%", end: "bottom 40%", toggleClass: { targets: row, className: "course-current" } });
        });
    }, { scope: sectionRef });

    const openEnrollment = (course: string) => window.dispatchEvent(new CustomEvent("open-enroll-modal", { detail: { course } }));

    return (
        <section id="courses" ref={sectionRef} className="relative overflow-hidden bg-[#061a30] py-20 text-white sm:py-28">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(#6d91b0_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="pointer-events-none absolute -left-40 top-28 h-[30rem] w-[30rem] rounded-full bg-[#0877c5]/20 blur-[100px]" />

            <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
                <div className="course-heading mb-14 flex flex-col justify-between gap-8 sm:mb-20 lg:flex-row lg:items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#ffd629]"><span className="h-2 w-2 rounded-full bg-[#ffd629]" /> Explore our programs</div>
                        <h2 className="mt-7 max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl xl:text-7xl">Ideas become <span className="text-[#ffd629]">careers.</span></h2>
                        <p className="mt-7 max-w-md text-base leading-8 text-[#b9cee1]">Choose your creative direction. Learn through practical work and build skills for the world you want to shape.</p>
                    </div>
                    <div className="flex items-center gap-4 border-t border-white/15 pt-6 lg:min-w-52">
                        <span className="text-5xl font-black tracking-tight text-[#ffd629]">04</span>
                        <span className="max-w-32 text-xs font-bold uppercase leading-5 tracking-[0.16em] text-[#b9cee1]">Creative programs to explore</span>
                    </div>
                </div>

                <div className="course-list border-t border-white/15">
                    {courses.map((course, index) => {
                        const Icon = course.icon;
                        return (
                            <article key={course.number} className="course-row group grid items-center gap-8 border-b border-white/15 py-12 md:grid-cols-2 md:gap-10 md:py-20 lg:gap-16">
                                <div className={`course-copy min-w-0 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                                    <span className="course-number block text-5xl font-black leading-none tracking-[-0.07em] text-[#ffd629] transition-opacity duration-300 sm:text-6xl">{course.number}</span>
                                    <div className="mt-7 flex flex-wrap items-center gap-3">
                                        <span style={{ color: course.color, borderColor: `${course.color}55` }} className="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">{course.tag}</span>
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-[#9fb9d1]"><Clock3 className="h-3.5 w-3.5" />{course.duration}</span>
                                    </div>
                                    <h3 className="mt-5 max-w-2xl text-3xl font-black leading-[1.08] tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#ffd629] sm:text-4xl xl:text-5xl">{course.title}</h3>
                                    <p className="mt-5 max-w-lg text-sm leading-7 text-[#b9cee1] sm:text-base">{course.description}</p>
                                    <h4 className="mt-7 text-sm font-bold text-[#c3d6e7]">What you will learn</h4>
                                    <ul className="mt-4 grid gap-2 text-sm text-[#b9cee1] sm:grid-cols-2">{course.topics.map((topic) => <li key={topic} className="flex items-start gap-2"><span style={{ backgroundColor: course.color }} className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />{topic}</li>)}</ul>
                                    <button type="button" onClick={() => openEnrollment(course.title)} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#ffd629] transition-all hover:gap-3">Enroll now <ArrowRight className="h-4 w-4" /></button>
                                </div>
                                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                                    <CourseVisual index={index} image={course.image} title={course.title} number={course.number} />
                                    <div className="mt-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#86a6bf]"><Icon className="h-4 w-4" /> Creative program / {course.number}</div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
