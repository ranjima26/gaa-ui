'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { poppins } from '../fonts/poppins'

export default function PosterGallerySection() {
  const [posters, setPosters] = useState([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const rafId = useRef(0)
  const isPaused = useRef(false)
  const pauseTimeout = useRef(0)

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ENROLL_API}api/posters/active`)
        const data = await res.json()
        setPosters(data)
      } catch (err) {
        console.error('Failed to fetch posters', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosters()
  }, [])

  useEffect(() => {
    const c = containerRef.current
    if (!c) return

    const speed = 0.5
    const step = () => {
      if (!isPaused.current) {
        c.scrollLeft += speed
        if (c.scrollLeft >= c.scrollWidth - c.clientWidth) {
          c.scrollLeft = 0
        }
      }
      rafId.current = requestAnimationFrame(step)
    }

    rafId.current = requestAnimationFrame(step)

    const onEnter = () => { isPaused.current = true }
    const onLeave = () => { isPaused.current = false }

    c.addEventListener('mouseenter', onEnter)
    c.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(rafId.current)
      c.removeEventListener('mouseenter', onEnter)
      c.removeEventListener('mouseleave', onLeave)
      clearTimeout(pauseTimeout.current)
    }
  }, [])

  const pauseAuto = () => {
    isPaused.current = true
    clearTimeout(pauseTimeout.current)
    pauseTimeout.current = setTimeout(() => {
      isPaused.current = false
    }, 3000)
  }

  const scrollPrev = () => {
    pauseAuto()
    containerRef.current?.scrollBy({
      left: -containerRef.current.clientWidth,
      behavior: 'smooth',
    })
  }

  const scrollNext = () => {
    pauseAuto()
    containerRef.current?.scrollBy({
      left: containerRef.current.clientWidth,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="gallery"
      className={`${poppins.className} py-16 bg-gray-50 relative overflow-hidden`}
    >
      <h2 className="text-3xl sm:text-4xl text-center mb-12 font-bold text-black">
        Our Works
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading posters...</div>
      ) : (
        <div className="relative">
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar p-0 m-0"
          >
            {posters.map(({ id, image, title }, idx) => (
              <div
                key={id}
                className="snap-start flex-shrink-0 w-[80%] sm:w-1/2 md:w-1/4 lg:w-1/5 px-2"
              >
                <div className="relative w-full aspect-[2/3] flex items-center justify-center">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-contain"
                      priority={idx < 3}
                    />
                  ) : (
                    <div className="text-center text-gray-400 text-sm">No Image</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-3xl p-2 rounded-full shadow z-10"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-3xl p-2 rounded-full shadow z-10"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
