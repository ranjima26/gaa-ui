'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { poppins } from '../fonts/poppins'

export default function Header() {
  const [show, setShow] = useState(true)
  const lastYRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        const prevY = lastYRef.current
        const nextShow = currentY < prevY || currentY < 50
        setShow((prev) => (nextShow !== prev ? nextShow : prev))
        lastYRef.current = currentY
        rafRef.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
    // empty deps: we intentionally read/set refs and state updater
  }, [])

  return (
    <header
      className={`${poppins.className} fixed inset-x-0 top-0 z-50 backdrop-blur-lg bg-white/30 shadow-md transform transition-transform duration-400 ease-in-out ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/GAA-WHITE-02.png"
            alt="GAA Logo"
            width={384}
            height={96}
            priority
            className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto object-contain"
          />
        </Link>

        {/* CTA Button */}
        <Link
          href="#enroll"
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-green-700 transition"
        >
          Enroll Now
        </Link>
      </div>
    </header>
  )
}
