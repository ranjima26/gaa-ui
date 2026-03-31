'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { poppins } from '../fonts/poppins'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ open: false, message: '' })

  useEffect(() => {
    if (!toast.open) return
    const timer = setTimeout(() => setToast({ ...toast, open: false }), 3000)
    return () => clearTimeout(timer)
  }, [toast.open])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    setLoading(true)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_ENROLL_API 
      const endpoint = `${baseUrl.replace(/\/$/, '')}/api/subscribe`

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: trimmed }),
      })

      const payload = await res.json()
      if (!res.ok) throw new Error(payload.message || 'Subscription failed')

      setToast({ open: true, message: payload.message || 'Thanks for subscribing!' })
      setEmail('')
    } catch (err) {
      console.error('Subscribe failed:', err)
      setToast({ open: true, message: 'Error: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <footer className={`${poppins.className} bg-gray-900 text-gray-200 pt-16 pb-8 relative`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            
            {/* Logo & Info */}
            <div className="flex flex-col items-start">
              <Link href="/" className="mb-4">
                <Image
                  src="/images/gaa_logo.webp"
                  alt="GAA Logo"
                  width={192}
                  height={80}
                  quality={100}
                  priority
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-white text-sm leading-snug mb-6">
                Global Academy of Artistry empowers creatives with industry-led courses,
                hands-on projects, and expert mentorship.
              </p>
              <div className="flex space-x-6 mt-2">
                <a href="https://www.facebook.com/globalacademyofartistry" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 text-2xl" aria-label="Facebook"><FaFacebookF /></a>
                <a href="https://www.instagram.com/globalacademyofartistry/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 text-2xl" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://www.youtube.com/@Globalacademyofartistry" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 text-2xl" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>

            {/* GAA Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Global Academy of Artistry</h4>
              <ul className="text-white text-sm leading-snug space-y-1">
                <li>Kutty Sahib Layout, Lane no. 1</li>
                <li>Near Model Engineering College</li>
                <li>Thrikkakara - 682021</li>
                <li><a href="tel:+919995022146" className="hover:text-white">+91 99950 22146</a></li>
                <li><a href="mailto:info@ytgaa.com" className="hover:text-white">info@ytgaa.com</a></li>
              </ul>
            </div>

            {/* Yellowtooths Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Yellowtooths</h4>
              <ul className="text-white text-sm leading-snug space-y-1">
                <li>Kutty Sahib Layout, Lane no. 1</li>
                <li>Near Model Engineering College</li>
                <li>Thrikkakara - 682021</li>
                <li><a href="tel:+919048326777" className="hover:text-white">+91 90483 26777</a></li>
                <li><a href="mailto:info@yellowtooths.in" className="hover:text-white">info@yellowtooths.in</a></li>
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Stay Updated</h4>
              <p className="text-white text-sm leading-snug mb-4">
                Join our mailing list for course updates, events, and more.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm text-gray-200 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition disabled:opacity-50 text-sm"
                >
                  {loading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
            © 2026 <Link href="/" className="hover:underline text-gray-500">Global Academy of Artistry</Link>. All rights reserved.
          </div>
          <div className="mt-2 text-center text-gray-500 text-xs">
            Developed and Designed by{' '}
            <a href="https://www.yellowtooths.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-500">
              Yellowtooths
            </a>
          </div>
        </div>

        {/* Toast */}
        {toast.open && (
          <div className="fixed bottom-4 right-4 bg-white text-gray-900 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in">
            <span>{toast.message}</span>
          </div>
        )}
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
