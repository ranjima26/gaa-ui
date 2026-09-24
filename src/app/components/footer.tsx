import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer
            id="enroll"
            className="relative isolate overflow-hidden bg-[#041628] pt-20 pb-12 text-white"
        >
            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute left-1/3 top-0 -z-10 h-80 w-80 rounded-full bg-[#087ec5]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 right-10 -z-10 h-80 w-80 rounded-full bg-[#ffd629]/10 blur-3xl" />

            <div className="footer-content mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">

                {/* Footer Main Grid */}
                <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-6">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="relative block h-14 w-48">
                            <Image
                                src="/GAA-WHITE-01.png"
                                alt="Global Academy of Artistry Logo"
                                fill
                                priority
                                sizes="192px"
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="mt-6 max-w-sm text-sm leading-6 text-slate-400">
                            Global Academy of Artistry is a futuristic creative academy from the house of Yellowtooths, shaping tomorrow&apos;s innovators in visual arts and digital culture.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-[#ffd629]">
                                Yellowtooths Creative Enterprise
                            </span>
                        </div>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd629]">
                            Programs
                        </h4>
                        <ul className="mt-5 space-y-3 text-sm text-slate-300">
                            <li><Link href="#courses" className="hover:text-white transition-colors">Graphic Design + UI/UX with AI</Link></li>
                            <li><Link href="#courses" className="hover:text-white transition-colors">Graphic Design + 3D with AI</Link></li>
                            <li><Link href="#courses" className="hover:text-white transition-colors">Film Poster Design</Link></li>
                            <li><Link href="#courses" className="hover:text-white transition-colors">Digital Marketing with AI Tools</Link></li>
                        </ul>
                    </div>

                    {/* Institution */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd629]">
                            Academy
                        </h4>
                        <ul className="mt-5 space-y-3 text-sm text-slate-300">
                            <li><Link href="#about" className="hover:text-white transition-colors">About GAA</Link></li>
                            <li><Link href="#mentorship" className="hover:text-white transition-colors">Agency Mentorship</Link></li>
                            <li><Link href="#gallery" className="hover:text-white transition-colors">Student Showcase</Link></li>
                            <li><Link href="#events" className="hover:text-white transition-colors">Masterclasses & Events</Link></li>
                            <li><Link href="#news" className="hover:text-white transition-colors">Editorial Articles</Link></li>
                        </ul>
                    </div>

                    {/* Locations */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd629]">
                            Locations
                        </h4>
                        <div className="mt-5 grid gap-8 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            <div>
                                <h5 className="text-base font-black text-white">Global Academy of Artistry</h5>
                                <p className="mt-4 flex items-start gap-2.5 leading-6">
                                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#ffd629]" />
                                    <span>Kutty Sahib Layout, Lane no. 1<br />Near Model Engineering College<br />Thrikkakara - 682021</span>
                                </p>
                                <a href="tel:+919995022146" className="mt-2 flex items-center gap-2.5 transition-colors hover:text-white">
                                    <Phone className="h-4 w-4 shrink-0 text-[#ffd629]" />
                                    +91 99950 22146
                                </a>
                                <a href="mailto:info@ytgaa.com" className="mt-2 flex items-center gap-2.5 transition-colors hover:text-white">
                                    <Mail className="h-4 w-4 shrink-0 text-[#ffd629]" />
                                    info@ytgaa.com
                                </a>
                            </div>

                            <div>
                                <h5 className="text-base font-black text-white">Yellowtooths</h5>
                                <p className="mt-4 flex items-start gap-2.5 leading-6">
                                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#ffd629]" />
                                    <span>Kutty Sahib Layout, Lane no. 1<br />Near Model Engineering College<br />Thrikkakara - 682021</span>
                                </p>
                                <a href="tel:+919048326777" className="mt-2 flex items-center gap-2.5 transition-colors hover:text-white">
                                    <Phone className="h-4 w-4 shrink-0 text-[#ffd629]" />
                                    +91 90483 26777
                                </a>
                                <a href="mailto:info@yellowtooths.in" className="mt-2 flex items-center gap-2.5 transition-colors hover:text-white">
                                    <Mail className="h-4 w-4 shrink-0 text-[#ffd629]" />
                                    info@yellowtooths.in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
                    <p>© 2026 Global Academy of Artistry. All rights reserved. A Yellowtooths Initiative.</p>
                    <div className="flex gap-6">
                        <Link href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="#terms" className="hover:text-slate-300 transition-colors">Terms of Enrollment</Link>
                        <Link href="#accessibility" className="hover:text-slate-300 transition-colors">Accessibility</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
