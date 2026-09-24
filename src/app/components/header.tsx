"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Courses", href: "#courses" },
    { name: "Gallery", href: "#gallery" },
    { name: "Videos", href: "#videos" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 28);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`fixed z-[100] transition-all duration-300 ${mobileMenuOpen ? "inset-x-3 top-3 rounded-2xl bg-[#034b86]/95 shadow-2xl shadow-slate-950/25 backdrop-blur-xl" : scrolled ? "inset-x-3 top-3 rounded-full bg-[#034b86]/95 shadow-2xl shadow-slate-950/25 backdrop-blur-xl sm:inset-x-6 lg:inset-x-10" : "inset-x-0 top-0 bg-transparent"}`}>
            <div className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-all duration-300 sm:px-8 lg:px-12 xl:px-16 ${scrolled ? "h-16 sm:h-[4.5rem]" : "h-20 sm:h-24"}`}>
                <Link
                    href="/"
                    aria-label="Global Academy of Artistry home"
                    className={`relative block shrink-0 transition-all duration-300 ${scrolled ? "h-10 w-36 sm:h-11 sm:w-40" : "h-12 w-44 sm:h-14 sm:w-48"}`}
                >
                    <Image src="/gaa_logo.webp" alt="Global Academy of Artistry by Yellowtooths" fill priority className="object-contain object-left" />
                </Link>

                <nav aria-label="Main navigation" className="hidden items-stretch self-stretch md:flex md:gap-7 lg:gap-10 xl:gap-12">
                    {navLinks.map((link) => {
                        const active = activeTab === link.name;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setActiveTab(link.name)}
                                aria-current={active ? "page" : undefined}
                                className={`group relative flex items-center text-[15px] font-semibold transition-colors lg:text-base ${active ? "text-white" : "text-white/85 hover:text-white"}`}
                            >
                                {link.name}
                                <span className={`absolute bottom-5 left-0 h-[3px] rounded-full bg-[#ffd629] transition-all ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="#enroll"
                        onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent("open-enroll-modal"));
                        }}
                        className="group hidden items-center gap-2 rounded-full bg-[#ffd629] px-6 py-3 text-sm font-extrabold text-[#142238] shadow-lg shadow-yellow-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#ffe15c] sm:flex"
                    >
                        Enroll Now
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <button
                        type="button"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md md:hidden"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <nav aria-label="Mobile navigation" className="px-5 pb-6 pt-3 md:hidden">
                    <div className="mx-auto flex max-w-lg flex-col gap-1">
                        {navLinks.map((link) => {
                            const active = activeTab === link.name;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => {
                                        setActiveTab(link.name);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`rounded-xl px-4 py-3 font-bold ${active ? "bg-white text-[#075892]" : "text-white hover:bg-white/10"}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <Link
                            href="#enroll"
                            onClick={(e) => {
                                e.preventDefault();
                                setMobileMenuOpen(false);
                                window.dispatchEvent(new CustomEvent("open-enroll-modal"));
                            }}
                            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#ffd629] px-5 py-3 font-extrabold text-[#142238] sm:hidden"
                        >
                            Enroll Now <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}
