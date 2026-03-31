// src/components/AboutSection.js
"use client"

import Image from 'next/image'
import { poppins } from '../fonts/poppins'

export default function AboutSection() {
  return (
    <section
      id="about"
      className={`
        ${poppins.className}
        relative py-8 sm:py-12 md:py-16
        bg-gradient-to-r from-blue-50 to-green-50
        overflow-hidden
      `}
    >
      {/* Background floating circles (decorative) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="absolute top-10 left-10 w-24 h-24 bg-blue-200 opacity-50 rounded-full animate-float" />
        <span className="absolute bottom-20 right-20 w-32 h-32 bg-green-200 opacity-40 rounded-full animate-float delay-2000" />
        <span className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-200 opacity-30 rounded-full animate-float delay-4000" />
      </div>

      {/* Main content (above the shapes) */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
        
        {/* Text Column */}
          <div>
            <h2 className="text-base sm:text-xl lg:text-3xl mb-3 text-black">
              About Global Academy of Artistry
            </h2>
          {/* <p className="text-gray-700 mb-6 font-[Helvetica,Arial,sans-serif]"> */}
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            Global Academy of Artistry (GAA) is a futuristic academy from the house of Yellowtooths, a creative agency with 15+ years of experience in film poster design, branding, digital marketing and more. Our teaching philosophy blends hands-on learning, mentorship from well-known creative personalities and exposure to live projects. We shape creative leaders rather than regular employees through our well-researched course offerings.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start">
              <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#FFC132] text-white flex items-center justify-center rounded-full">
                <span aria-hidden="true">✓</span>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm sm:text-base text-black">Future-ready curriculum</h3>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#6EBF64] text-white flex items-center justify-center rounded-full">
                <span aria-hidden="true">✓</span>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm sm:text-base text-black">Industry Expert Sessions</h3>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#0895d3] text-white flex items-center justify-center rounded-full">
                <span aria-hidden="true">✓</span>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm sm:text-base text-black">Exposure to live projects</h3>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-6 w-6 sm:h-7 sm:w-7 bg-[#FFC132] text-white flex items-center justify-center rounded-full">
                <span aria-hidden="true">✓</span>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm sm:text-base text-black">Creative Thinking Guidance</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative w-full h-32 sm:h-64 md:h-[420px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/GAA-LOGO-01.png"
            alt="GAA Logo"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            loading="lazy"
          />
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
          will-change: transform;
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-float { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
