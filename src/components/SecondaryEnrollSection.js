'use client'

import { useState, useEffect } from 'react'
import { poppins } from '../fonts/poppins'
import { motion } from 'framer-motion'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function SecondaryEnrollSection() {
  const [mounted, setMounted] = useState(false)
  const [courseList, setCourseList] = useState([])
  const [course, setCourse] = useState('')

  useEffect(() => {
    setMounted(true)
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENROLL_API}api/courses/active`)
      const data = await res.json()
      if (res.ok && Array.isArray(data.data)) {
        setCourseList(data.data)
        setCourse(data.data[0]?.title || '')
      } else {
        throw new Error('Failed to load course list.')
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
    }
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [qualification, setQualification] = useState('')
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState({ open: false, title: '', message: '' })

  const showModal = (title, message) => setModal({ open: true, title, message })
  const closeModal = () => setModal({ ...modal, open: false })

  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase()).replace(/\B\w/g, (char) => char.toLowerCase())

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !phone || !city || !qualification || !course) {
      showModal('Form Incomplete', 'Please fill in all fields before submitting.')
      return
    }

    setLoading(true)
    try {
      const payload = { name, email, phone, city, qualification, course }
      const apiBase = process.env.NEXT_PUBLIC_ENROLL_API
      const endpoint = `${apiBase.replace(/\/$/, '')}/api/enroll`

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.message || res.statusText)

      showModal('Success', 'Your request has been submitted! We’ll be in touch within 24 hours.')

      setName('')
      setEmail('')
      setCity('')
      setPhone('')
      setQualification('')
      setCourse(courseList[0]?.title || '')

      // Notify Discord about the enrollment (server-side endpoint preferred)
      const notifyPayload = {
        type: 'enroll',
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        qualification: payload.qualification,
        course: payload.course,
      }

      fetch('/api/discord-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifyPayload),
      }).then((r) => {
        if (r.status === 404) {
          const webhook = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK
          if (webhook) {
            fetch(webhook, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: `New enrollment: ${payload.name} (${payload.email})` }),
            }).catch(() => {})
          }
        }
      }).catch(() => {
        const webhook = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK
        if (webhook) {
          fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: `New enrollment: ${payload.name} (${payload.email})` }),
          }).catch(() => {})
        }
      })
    } catch (err) {
      console.error(err)
      showModal('Error', 'Submission failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.section
        id="secondary-enroll"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`
          ${poppins.className}
          py-16 bg-gradient-to-r from-purple-600 to-pink-500
          transform transition-all duration-700 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Animated Text */}
          <motion.div variants={itemVariants} className="text-white space-y-4">
            <motion.h2
              className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-tight"
              variants={itemVariants}
            >
              Great Things
            </motion.h2>
            <motion.h2
              className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-tight"
              variants={itemVariants}
            >
              Start Small
            </motion.h2>

            <motion.h2 className="text-3xl sm:text-4xl font-semibold" variants={itemVariants}>
              Yours <span className="underline decoration-pink-300">start with this form</span>
            </motion.h2>
            <motion.p className="text-lg text-gray-100 max-w-md" variants={itemVariants}>
              Fill out this quick form and our program advisors will reach out within{' '}
              <span className="font-semibold text-white">24 hours</span>.
            </motion.p>
          </motion.div>

          {/* Animated Form */}
          <motion.div
            id="enroll"
            variants={itemVariants}
            className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="sec-name" className="block text-sm font-medium text-black">Full Name</label>
                  <input
                    id="sec-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(capitalizeWords(e.target.value))}
                    className="mt-1 text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="sec-phone" className="text-black block text-sm font-medium">Phone Number</label>
                  <input
                    id="sec-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sec-email" className="block text-black text-sm font-medium">Email Address</label>
                <input
                  id="sec-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label htmlFor="sec-city" className="block text-sm font-medium text-black">Place</label>
                <input
                  id="sec-city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(capitalizeWords(e.target.value))}
                  className="mt-1 text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label htmlFor="sec-qualification" className="text-black block text-sm font-medium">Education Qualification</label>
                <input
                  id="sec-qualification"
                  type="text"
                  required
                  placeholder="e.g. M.Com"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="mt-1 w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label htmlFor="sec-course" className="text-black block text-sm font-medium">Interested Course</label>
                <select
                  id="sec-course"
                  required
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="text-black mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                >
                  {courseList.length > 0 ? (
                    courseList.map((c) => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))
                  ) : (
                    <option>Loading courses...</option>
                  )}
                </select>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-700 hover:bg-pink-600 text-white font-bold py-3 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Requesting…' : 'Request Info'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center border-t-4 border-purple-600">
            <h3 className="text-2xl font-bold mb-3 text-purple-700">{modal.title}</h3>
            <p className="text-gray-700 mb-6">{modal.message}</p>
            <button
              onClick={closeModal}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
