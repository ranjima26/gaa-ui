'use client'

import { useEffect, useState, useReducer, useRef } from 'react'
import Image from 'next/image'
import { poppins } from '../fonts/poppins'

export default function HeroSection() {
  const initialState = {
    name: '',
    place: '',
    email: '',
    phone: '',
    qualification: '',
    course: '',
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value }
      case 'RESET':
        return { ...initialState, course: action.defaultCourse || '' }
      default:
        return state
    }
  }

  const [form, dispatch] = useReducer(reducer, initialState)
  const [courseOptions, setCourseOptions] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState({ open: false, title: '', message: '' })
  const submitButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [imageVisible, setImageVisible] = useState(false)

  const showModal = (title, message) => setModal({ open: true, title, message })
  const handleClose = () => setModal((m) => ({ ...m, open: false }))

  // Fetch courses from API
  useEffect(() => {
    let mounted = true
    const controller = new AbortController()

    const fetchCourses = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_ENROLL_API || ''
        const url = base.replace(/\/$/, '') + '/api/courses/active'
        const res = await fetch(url, { signal: controller.signal })
        let json = null
        try {
          json = await res.json()
        } catch (e) {
          json = null
        }
        if (!mounted) return
        if (res.ok && Array.isArray(json?.data)) {
          setCourseOptions(json.data)
          if (json.data.length > 0) dispatch({ type: 'SET_FIELD', field: 'course', value: json.data[0].title })
        } else {
          setCourseOptions([])
        }
        if (mounted) setCoursesLoading(false)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('Error fetching courses:', err)
        if (mounted) {
          setCourseOptions([])
          setCoursesLoading(false)
        }
      }
    }

    fetchCourses()

    return () => {
      mounted = false
      controller.abort()
    }
  }, [])

  // Softly reveal hero image on mount, respect prefers-reduced-motion
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mq.matches) {
        setImageVisible(true)
        return
      }
    } catch (e) {
      // ignore
    }
    const id = setTimeout(() => setImageVisible(true), 50)
    return () => clearTimeout(id)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.place,
      qualification: form.qualification,
      course: form.course,
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_ENROLL_API || ''
      const endpoint = `${baseUrl.replace(/\/$/, '')}/api/enroll`

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let json = null
      try {
        json = await res.json()
      } catch (e) {
        json = null
      }

      if (!res.ok) throw new Error((json && json.message) || res.statusText)

      const notifyPayload = {
        type: 'enroll',
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        qualification: payload.qualification,
        course: payload.course,
      }

      // Fire-and-forget notify; if server route fails, attempt webhook fallback
      fetch('/api/discord-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifyPayload),
      })
        .then((r) => {
          if (!r.ok) {
            const webhook = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK
            if (webhook) {
              fetch(webhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `New enrollment: ${payload.name} (${payload.email})` }),
              }).catch(() => {})
            }
          }
        })
        .catch(() => {
          const webhook = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK
          if (webhook) {
            fetch(webhook, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: `New enrollment: ${payload.name} (${payload.email})` }),
            }).catch(() => {})
          }
        })

      showModal('Success', 'Enrollment submitted successfully!')
      dispatch({ type: 'RESET', defaultCourse: courseOptions.length > 0 ? courseOptions[0].title : '' })
    } catch (err) {
      console.error(err)
      showModal('Error', 'Submission failed: ' + (err.message || 'Unknown'))
    } finally {
      setLoading(false)
      submitButtonRef.current?.focus()
    }
  }

  return (
    <>
      <section
        id="hero"
        className={`${poppins.className} pt-4 sm:pt-8 md:pt-12 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="hidden md:block relative w-full h-[50vh] lg:h-[60vh] xl:h-[70vh] rounded-2xl overflow-hidden">
              <div className={`relative w-full h-full transition-transform duration-700 ease-out ${imageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <Image
                  src="/images/level-up/LEVELUP TYPO-01.png"
                  alt="Course Preview"
                  fill
                  className="object-contain"
                  style={{ transformOrigin: 'center' }}
                />
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl max-w-md sm:max-w-lg mx-auto mt-6 mb-10 md:mt-0 md:mb-0">
              <h2 className="text-3xl text-black font-bold text-center mb-4">Quick Enroll</h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-white rounded-lg p-2 sm:p-3 shadow-md"
              >
                <input
                  value={form.name}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                  type="text"
                  required
                  placeholder="Your full name"
                  className="md:col-span-1 w-full p-2 border rounded-lg text-black"
                />
                <input
                  value={form.place}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'place', value: e.target.value })}
                  type="text"
                  required
                  placeholder="City, State"
                  className="md:col-span-1 w-full p-2 border rounded-lg text-black"
                />
                <input
                  value={form.email}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="md:col-span-1 w-full p-2 border rounded-lg text-black"
                />
                <input
                  value={form.phone}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'phone', value: e.target.value })}
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="md:col-span-1 w-full p-2 border rounded-lg text-black"
                />
                <input
                  value={form.qualification}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'qualification', value: e.target.value })}
                  type="text"
                  required
                  placeholder="e.g. Bachelor of Design"
                  className="md:col-span-2 w-full p-2 border rounded-lg text-black"
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-black">Course</label>
                  <select
                    value={form.course}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'course', value: e.target.value })}
                    required
                    className="w-full p-2 border rounded-lg text-black"
                  >
                    {courseOptions.length > 0 ? (
                      courseOptions.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))
                    ) : (
                      <option value="">Loading courses...</option>
                    )}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    disabled={loading || coursesLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 rounded-full hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? 'Submitting…' : coursesLoading ? 'Loading courses…' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div role="dialog" aria-modal="true" aria-labelledby="enroll-modal-title" className="bg-white rounded-lg shadow-lg max-w-sm p-6 text-center">
            <h3 id="enroll-modal-title" className="text-xl font-semibold mb-4">{modal.title}</h3>
            <p className="mb-6">{modal.message}</p>
            <button
              ref={closeButtonRef}
              onClick={() => {
                handleClose()
                submitButtonRef.current?.focus()
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
