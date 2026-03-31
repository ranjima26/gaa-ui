'use client'

import { useEffect, useState } from 'react'
import { poppins } from '../fonts/poppins'

export default function YouTubeShowcase() {
  const [videos, setVideos] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const fetchVideos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ENROLL_API}api/youtube-videos/active`)
        const json = await res.json()
        if (Array.isArray(json.data)) {
          setVideos(json.data)
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error)
      }
    }

    fetchVideos()
  }, [])

  return (
    <section
      id="videos"
      className={`
        ${poppins.className}
        py-16 sm:py-20 bg-white
        transform transition-all duration-700 ease-out
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`
            text-3xl sm:text-4xl text-center mb-10 font-bold text-black
            transform transition-transform duration-700
            ${mounted ? 'scale-100' : 'scale-95'}
          `}
        >
          Watch us on YouTube
        </h2>

        {videos.length === 0 ? (
          <p className="text-center text-gray-500">No videos available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {videos.map((video, idx) => {
              const embedUrl = formatYouTubeEmbed(video.video_url)
              return (
                <div
                  key={video.id}
                  className={`
                    w-full max-w-[400px] aspect-video
                    rounded-2xl overflow-hidden shadow-lg bg-black
                    transform-gpu transition-transform duration-500 hover:scale-[1.03]
                  `}
                >
                  <iframe
                    className="w-full h-full"
                    src={embedUrl}
                    title={`YouTube Video ${idx + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function formatYouTubeEmbed(url) {
  try {
    if (url.includes('youtube.com/embed/')) return url
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/i
    const match = url.match(regExp)
    const id = match && match[1] ? match[1] : ''
    return `https://www.youtube.com/embed/${id}`
  } catch {
    return ''
  }
}
