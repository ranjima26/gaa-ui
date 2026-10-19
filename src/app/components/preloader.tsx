"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

declare global {
    interface Window {
        __gaaSiteReady?: boolean;
    }
}

export default function Preloader() {
    const [visible, setVisible] = useState(true);
    const [leaving, setLeaving] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Lock scroll while preloader is active to prevent awkward scroll jumps
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion) {
            window.__gaaSiteReady = true;
            window.dispatchEvent(new CustomEvent("gaa-site-ready"));
            document.body.style.overflow = originalOverflow;
            setVisible(false);
            return;
        }

        // Smooth simulated progress that completes gracefully
        let currentProgress = 0;
        let animationFrameId: number;
        let isComplete = false;

        const handleLoad = () => {
            isComplete = true;
        };

        if (document.readyState === "complete") {
            isComplete = true;
        } else {
            window.addEventListener("load", handleLoad);
        }

        const startTime = performance.now();
        const minDuration = 800; // minimum duration in ms for a smooth, premium feel

        const step = (time: number) => {
            const elapsed = time - startTime;
            const timeProgress = Math.min(elapsed / minDuration, 1);

            if (isComplete && elapsed >= minDuration) {
                currentProgress = 100;
            } else {
                // Ease progress up to ~92% while waiting for completion
                const target = isComplete ? 100 : 92;
                currentProgress += (target - currentProgress) * 0.12;
                if (currentProgress < timeProgress * 80) {
                    currentProgress = timeProgress * 80;
                }
            }

            setProgress(Math.min(Math.round(currentProgress), 100));

            if (currentProgress >= 99.5 && elapsed >= minDuration) {
                setProgress(100);
                // Signal hero and header to begin synchronized entrance right as the curtain lifts
                window.__gaaSiteReady = true;
                window.dispatchEvent(new CustomEvent("gaa-site-ready"));

                // Brief pause at 100% before smooth curtain lift
                setTimeout(() => {
                    setLeaving(true);
                    document.body.style.overflow = originalOverflow;

                    // Remove from DOM after curtain animation completes
                    setTimeout(() => {
                        setVisible(false);
                    }, 750);
                }, 100);
                return;
            }

            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("load", handleLoad);
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    if (!visible) return null;

    return (
        <aside
            role="status"
            aria-live="polite"
            aria-label="Loading Global Academy of Artistry"
            className={`gaa-preloader fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden bg-[#021324] text-white select-none ${
                leaving ? "gaa-preloader-exit" : ""
            }`}
        >
            {/* Ambient Background Glows */}
            <div className="gaa-preloader-glow pointer-events-none absolute h-[28rem] w-[28rem] rounded-full bg-[#087ec5]/25 blur-[120px]" />
            <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#ffd629]/10 blur-[90px]" />

            <div className="relative z-10 flex flex-col items-center px-6 text-center">
                {/* Logo with smooth entrance */}
                <div className="gaa-preloader-logo relative h-24 w-56 sm:h-32 sm:w-72">
                    <Image
                        src="/gaa_logo.webp"
                        alt="Global Academy of Artistry"
                        fill
                        priority
                        sizes="(max-width: 640px) 224px, 288px"
                        className="object-contain"
                    />
                </div>

                {/* Refined Smooth Progress Bar */}
                <div className="mt-8 flex w-44 sm:w-52 flex-col items-center gap-2">
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10 p-[0.5px]">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#ffd629] via-[#ffe15c] to-[#ffd629] shadow-[0_0_12px_rgba(255,214,41,0.6)] transition-[width] duration-150 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex w-full justify-between items-center text-[10px] font-mono tracking-widest text-slate-400">
                        <span>LOADING</span>
                        <span className="font-bold text-[#ffd629]">{progress}%</span>
                    </div>
                </div>

                {/* Subtitle */}
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#c5d9e9]/90 sm:text-xs">
                    Where creativity builds your future
                </p>
            </div>
        </aside>
    );
}
