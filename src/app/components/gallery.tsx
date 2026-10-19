"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Eye, Images } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type GalleryCategory = "All" | "Design" | "3D & Motion" | "Campus";

interface GalleryItem {
  src: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  className: string;
}

const FILTERS: GalleryCategory[] = ["All", "Design", "3D & Motion", "Campus"];

const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/mentor-graphic-design.png", title: "Visual Language", category: "Design", className: "aspect-[4/5]" },
  { src: "/images/journey/journey_3d_design.jpg", title: "Future Forms", category: "3D & Motion", className: "aspect-square" },
  { src: "/mentorship-studio.jpg", title: "Studio Sessions", category: "Campus", className: "aspect-[4/3]" },
  { src: "/mentor-film-poster-woman.png", title: "Cinematic Stories", category: "Design", className: "aspect-[4/5]" },
  { src: "/gallery-showcase.jpg", title: "Student Showcase", category: "Campus", className: "aspect-[4/3]" },
  { src: "/mentor-3d-motion.png", title: "Motion Experiments", category: "3D & Motion", className: "aspect-[4/5]" },
  { src: "/images/journey/journey_uiux_3d.jpg", title: "Digital Experiences", category: "Design", className: "aspect-square" },
  { src: "/yellowtooths-building.jpg", title: "Where Ideas Begin", category: "Campus", className: "aspect-[4/3]" },
  { src: "/images/journey/journey_film_poster.jpg", title: "Key Art Studies", category: "Design", className: "aspect-square" },
  { src: "/mentor-motion-design-woman.png", title: "Frames in Motion", category: "3D & Motion", className: "aspect-[4/5]" },
  { src: "/about-students.png", title: "Creative Community", category: "Campus", className: "aspect-[3/2]" },
  { src: "/images/journey/journey_digital_marketing.jpg", title: "Campaign Thinking", category: "Design", className: "aspect-square" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");

  const visibleItems = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section
      id="gallery"
      className="font-editorial relative overflow-hidden py-20 sm:py-28"
      style={{
        background: "linear-gradient(180deg, #edf3fa 0%, #f6f9fc 45%, #ffffff 80%, #f2f7fc 100%)",
      }}
    >
      {/* Subtle dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#0284C7 1.5px, transparent 1.5px), radial-gradient(#F59E0B 1.5px, transparent 1.5px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />
      {/* Ambient glow spots */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-[#ffd629]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[#087ec5]/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/60 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col gap-8 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#0284c7]"
            >
              <Images className="h-4 w-4" />
              GAA Student Showcase
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-5xl font-black uppercase leading-[0.86] tracking-[-0.055em] text-[#092b4d] sm:text-7xl lg:text-[7.5rem]"
            >
              Creative <span className="text-[#ffd629]">Gallery</span>
            </motion.h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              A glimpse into the ideas, experiments and visual stories created across our academy.
            </p>
          </div>

          <a
            href="#courses"
            className="group inline-flex w-fit items-center gap-3 rounded-full border-2 border-[#092b4d]/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#092b4d] transition-all hover:border-[#0284c7] hover:bg-[#0284c7] hover:text-white"
          >
            Explore our courses
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2 py-8" aria-label="Gallery filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-all ${
                activeFilter === filter
                  ? "border-[#092b4d] bg-[#092b4d] text-white shadow-[3px_3px_0px_#0284C7] scale-105"
                  : "border-slate-200 bg-white/90 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
              }`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.article
                layout
                key={item.src}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: index * 0.035 }}
                className="group mb-4 break-inside-avoid"
              >
                <div className={`relative overflow-hidden rounded-[1.25rem] bg-slate-100 border-2 border-slate-200/80 shadow-[0_4px_18px_rgba(9,43,77,0.10)] transition-shadow duration-300 group-hover:border-[#0284c7]/40 group-hover:shadow-[0_8px_28px_rgba(9,43,77,0.16)] ${item.className}`}>
                  <Image
                    src={item.src}
                    alt={`${item.title} — ${item.category} work at GAA`}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-75"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#092b4d]/90 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd629]">{item.category}</p>
                      <h3 className="mt-1 text-lg font-bold tracking-tight">{item.title}</h3>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ffd629] text-[#092b4d]">
                      <Eye className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  <span>GAA / {String(index + 1).padStart(2, "0")}</span>
                  <span className="flex items-center gap-1.5"><ArrowDownToLine className="h-3 w-3" /> Showcase</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
