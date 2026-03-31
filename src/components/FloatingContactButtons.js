// src/components/FloatingContactButtons.js
'use client'

import Link from 'next/link'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
      {/* WhatsApp */}
      <Link
        href="https://wa.me/919995022146"
        target="_blank"
        rel="noopener noreferrer"
        className="
          bg-green-500
          hover:bg-green-600
          text-white
          p-4
          rounded-full
          shadow-lg
          transition
          flex items-center justify-center
        "
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </Link>

      {/* Telephone */}
      <Link
        href="tel:+919995022146"
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          p-4
          rounded-full
          shadow-lg
          transition
          flex items-center justify-center
        "
        aria-label="Call us"
      >
        <FaPhoneAlt size={24} />
      </Link>
    </div>
  )
}
