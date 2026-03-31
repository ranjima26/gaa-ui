// src/components/CTASection.js
'use client'

import { poppins } from '../fonts/poppins'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section
      id="cta"
      className={`
        ${poppins.className}
        bg-black text-white py-16
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Elevate Your Creativity?
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          Join Global Academy of Artistry today and start building your dream portfolio.
        </p>
        <Link
          href="#enroll"
          className="
            inline-block
            bg-green-500 hover:bg-green-600
            text-white font-semibold
            px-6 py-3 rounded-full
            transition
          "
        >
          Get Started Now
        </Link>
      </div>
    </section>
  )
}
