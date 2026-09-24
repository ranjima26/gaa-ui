"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
    const [visible, setVisible] = useState(true);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const start = window.setTimeout(() => setLeaving(true), reducedMotion ? 0 : 1300);
        const finish = window.setTimeout(() => setVisible(false), reducedMotion ? 0 : 1850);

        return () => {
            window.clearTimeout(start);
            window.clearTimeout(finish);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            role="status"
            aria-label="Loading Global Academy of Artistry"
            className={`gaa-preloader fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[#031b33] text-white ${leaving ? "gaa-preloader-exit" : ""}`}
        >
            <div className="gaa-preloader-glow pointer-events-none absolute h-[25rem] w-[25rem] rounded-full bg-[#087ec5]/30 blur-[100px]" />
            <div className="relative flex flex-col items-center px-6 text-center">
                <div className="gaa-preloader-logo relative h-28 w-64 sm:h-36 sm:w-80">
                    <Image src="/gaa_logo.webp" alt="Global Academy of Artistry" fill priority sizes="(max-width: 640px) 256px, 320px" className="object-contain" />
                </div>
                <div className="mt-7 h-0.5 w-36 overflow-hidden rounded-full bg-white/15 sm:w-44">
                    <span className="gaa-preloader-progress block h-full rounded-full bg-[#ffd629]" />
                </div>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5d9e9] sm:text-xs">Where creativity builds your future</p>
            </div>
        </div>
    );
}
