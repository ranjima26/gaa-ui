"use client";

import { useEffect, useState, useId } from "react";
import { CheckCircle2, Sparkles, X, Send } from "lucide-react";

const courseOptions = [
    "GRAPHIC DESIGN + UI/UX With AI – Integration",
    "GRAPHIC DESIGN + 3D With AI – Integration",
    "Film Poster Design",
    "Digital Marketing with AI Tools",
];

export default function QuickEnrollModal() {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        email: "",
        phone: "",
        qualification: "",
        course: courseOptions[0],
    });

    const courseSelectId = useId();

    useEffect(() => {
        setMounted(true);

        // Listen to custom event so "Enroll Now" buttons can trigger this modal anytime
        const handleOpenEvent = (event: Event) => {
            const course = (event as CustomEvent<{ course?: string }>).detail?.course;
            if (course && courseOptions.includes(course)) {
                setFormData((current) => ({ ...current, course }));
            }
            setIsOpen(true);
        };
        window.addEventListener("open-enroll-modal", handleOpenEvent);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("open-enroll-modal", handleOpenEvent);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            handleClose();
            setSubmitted(false);
        }, 2500);
    };

    if (!mounted || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
            {/* Backdrop */}
            <div
                onClick={handleClose}
                className="absolute inset-0 bg-[#021426]/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
            />

            {/* Modal Card */}
            <div role="dialog" aria-modal="true" aria-labelledby="quick-enroll-title" className="relative z-10 my-auto w-full max-w-lg overflow-hidden rounded-[2.25rem] border border-white/20 bg-gradient-to-b from-[#062444] via-[#041a33] to-[#021224] p-6 text-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all sm:p-8 animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close modal"
                    className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white/80 transition-all hover:bg-white/25 hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Subtle Glows */}
                <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#ffd629]/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#087ec5]/30 blur-3xl" />

                {/* Content */}
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffd629]">
                            <Sparkles className="h-3.5 w-3.5" />
                            Admissions 2026 • GAA
                        </div>

                        <h2 id="quick-enroll-title" className="mt-3 text-2xl font-black tracking-tight sm:text-3xl text-white">
                            Quick <span className="text-[#ffd629]">Enroll</span>
                        </h2>
                        <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                            Take the first step toward your creative career at Global Academy of Artistry.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="my-10 flex flex-col items-center justify-center py-6 text-center animate-in zoom-in-95 duration-300">
                            <span className="grid h-16 w-16 place-items-center rounded-full bg-[#ffd629]/20 text-[#ffd629] ring-8 ring-[#ffd629]/10">
                                <CheckCircle2 className="h-9 w-9" />
                            </span>
                            <h3 className="mt-5 text-xl font-black text-white">Application Received!</h3>
                            <p className="mt-2 max-w-xs text-xs leading-5 text-slate-300">
                                Our admissions mentor will get in touch with you shortly on your provided phone and email.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                            {/* Row 1: Name & City */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only">Your full name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-medium text-white placeholder-slate-400 outline-none transition-all focus:border-[#ffd629] focus:bg-white/15 focus:ring-1 focus:ring-[#ffd629] sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="sr-only">City, State</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="City, State"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-medium text-white placeholder-slate-400 outline-none transition-all focus:border-[#ffd629] focus:bg-white/15 focus:ring-1 focus:ring-[#ffd629] sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Email & Phone */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only">Email address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-medium text-white placeholder-slate-400 outline-none transition-all focus:border-[#ffd629] focus:bg-white/15 focus:ring-1 focus:ring-[#ffd629] sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="sr-only">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-medium text-white placeholder-slate-400 outline-none transition-all focus:border-[#ffd629] focus:bg-white/15 focus:ring-1 focus:ring-[#ffd629] sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Current Qualification / Degree */}
                            <div>
                                <label className="sr-only">Degree / Qualification</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Bachelor of Design"
                                    value={formData.qualification}
                                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-medium text-white placeholder-slate-400 outline-none transition-all focus:border-[#ffd629] focus:bg-white/15 focus:ring-1 focus:ring-[#ffd629] sm:text-sm"
                                />
                            </div>

                            {/* Row 4: Course Selection Dropdown */}
                            <div>
                                <label htmlFor={courseSelectId} className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 ml-0.5">
                                    Course
                                </label>
                                <select
                                    id={courseSelectId}
                                    value={formData.course}
                                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                    className="w-full rounded-xl border border-white/20 bg-[#092b4d] px-4 py-3 text-xs font-medium text-white outline-none transition-all focus:border-[#ffd629] focus:ring-1 focus:ring-[#ffd629] sm:text-sm cursor-pointer"
                                >
                                    {courseOptions.map((course) => (
                                        <option key={course} value={course} className="bg-[#092b4d] text-white py-1">
                                            {course}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ffd629] to-[#ffb629] py-3.5 text-sm font-black text-[#092b4d] shadow-lg shadow-yellow-500/25 transition-all hover:scale-[1.01] hover:bg-[#ffe15c] hover:shadow-yellow-500/35 active:scale-[0.99]"
                            >
                                <span>Submit</span>
                                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>

                            <p className="pt-1 text-center text-[10px] text-slate-400">
                                🔒 Your information is confidential and will only be used for GAA admissions.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
