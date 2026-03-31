'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { poppins } from '../fonts/poppins'
import { ChevronDown } from 'lucide-react'

export default function CoursesChatSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [qualification, setQualification] = useState('')
  const [course, setCourse] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [openDetails, setOpenDetails] = useState(null)

  const courseList = [
    'GRAPHIC DESIGN + UI/UX With AI - Integration',
    'GRAPHIC DESIGN + 3D With AI - Integration',
    'Film Poster Design',
    'Digital Marketing with AI Tools',
  ]

  const courseDescriptions = {
    'GRAPHIC DESIGN + UI/UX With AI - Integration': {
      intro: '8 Months of Training + 2 - Month Internship at Yellowtooths',
      details: `<strong>AI - Integration</strong><br/>
• AI Prompt Generation (Graphic & UI/UX)<br/>
• Content Creation with AI Software<br/><br/>

<strong>Graphic Design</strong><br/>
• Photo Manipulation<br/>
• Typography<br/>
• Grading & Retouching<br/>
• Film Poster Design<br/>
• Branding (Corporate, FMCG, Print & more)<br/>
• Magazine & Newspaper Layouts<br/>
• Photography Creative Direction<br/><br/>

<strong>UI/UX Design</strong><br/>
• Website UI Design<br/>
• Mobile Interfaces<br/>
• User Experience Workflows<br/><br/>

<strong>Digital Marketing</strong><br/>
• Social Media Marketing<br/>
• Strategy Building<br/>
• Meta & Google Ads<br/>
• SEO & Website Basics<br/>
• AI Tools<br/><br/>

<strong>Program Highlights</strong><br/>
• Live Projects<br/>
• Industry Expert Sessions<br/>
• Yellowtooths In-house Production Support<br/>
• Studio Floor Exposure<br/>`,
    },
    'GRAPHIC DESIGN + 3D With AI - Integration': {
      intro: '8 Months of Training + 2 - Month Internship at Yellowtooths',
      details: `<strong>AI - Integration</strong><br/>
• AI Prompt Generation (Graphic & 3D)<br/>
• Content Creation with AI Software<br/><br/>

<strong>Graphic Design</strong><br/>
• Photo Manipulation<br/>
• Typography<br/>
• Grading & Retouching<br/>
• Film Poster Design<br/>
• Branding (Corporate, FMCG, Print & more)<br/>
• Magazine & Newspaper Layouts<br/>
• Photography Creative Direction<br/><br/>

<strong>3D & Motion</strong><br/>
• 3D Modelling<br/>
• Texturing<br/>
• Rigging<br/>
• Lighting<br/>
• Motion Graphics Animation<br/>
• VFX<br/><br/>

<strong>Program Highlights</strong><br/>
• Live Projects<br/>
• Industry Expert Sessions<br/>
• Yellowtooths In-house Production Support<br/>
• Studio Floor Exposure<br/>`,
    },
    'Film Poster Design': {
      intro: 'Crash Course: 3 Months',
      details: `<strong>Publicity Design Oriented:</strong><br/>
• Typography<br/>
• Cinematic Lighting<br/>
• Grading<br/>
• High-end Retouching<br/>
• Colour Correction<br/>
• Photo Manipulation<br/>
• AI-Integrated<br/>`,
    },
    'Digital Marketing with AI Tools': {
      intro: 'Crash Course: 3 Months',
      details: `• AI in Digital Marketing<br/>
• SEO & Website Basics<br/>
• AI for SEO & Keyword Research<br/>
• Social Media Marketing (SMM)<br/>
• Meta & Google Ads<br/>
• AI in Ad Campaign Optimization<br/>
• Strategy Building<br/>
• AI Tools for Content Creation<br/>
• AI-Powered Design & Video Tools<br/>
• AI in Social Media Automation<br/> 
• AI for SEO & Keyword Research<br/> 
• AI-Based Data Analysis & Reporting<br/>`,
    },
  }

  const openModal = (selectedCourse) => {
    setCourse(selectedCourse)
    setModalOpen(true)
    setMessage(null)
  }

  const closeModal = () => setModalOpen(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const payload = { name, email, phone, city: place, qualification, course }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENROLL_API}api/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || res.statusText)

      setMessage({ type: 'success', text: 'Enrollment submitted successfully!' })
      setName('')
      setPlace('')
      setEmail('')
      setPhone('')
      setQualification('')
    } catch (err) {
      setMessage({ type: 'error', text: 'Submission failed: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  const whatsappUrl = (courseName) => {
    const base = 'https://wa.me/919995022146'
    const text = `I'm interested in ${courseName}`
    return `${base}?text=${encodeURIComponent(text)}`
  }

  return (
    <>
      <section id="courses-chat" className={`${poppins.className} py-16 bg-white`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center mb-12 font-bold text-gray-800">
            Our Courses &amp; Chat on WhatsApp
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {courseList.map((c) => (
                <div
                  key={c}
                  className="p-6 rounded-2xl shadow transition transform hover:shadow-xl hover:-translate-y-1 bg-gray-100 hover:bg-white hover:ring-1 hover:ring-indigo-300"
                >
                  <h3 className="text-xl mb-2 font-bold text-gray-700">{c}</h3>
                  <p className="mb-2 text-gray-600">{courseDescriptions[c]?.intro}</p>

                  <button
                    onClick={() => setOpenDetails(openDetails === c ? null : c)}
                    className="flex items-center text-indigo-600 font-medium mb-2 hover:underline"
                  >
                    <ChevronDown
                      className={`w-4 h-4 mr-1 transition-transform duration-300 ${
                        openDetails === c ? 'rotate-180' : ''
                      }`}
                    />
                    {openDetails === c ? 'Hide Details' : 'What You’ll Learn'}
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openDetails === c ? 'max-h-[1000px] mt-2' : 'max-h-0'
                    }`}
                  >
                    <div
  className="text-gray-700 text-sm bg-white p-4 rounded-lg border border-gray-300 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: courseDescriptions[c].details }}
></div>
                  </div>

                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => openModal(c)}
                      className="text-green-500 hover:underline"
                    >
                      Enroll Now →
                    </button>
                    <Link
                      href={whatsappUrl(c)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 transition"
                    >
                      <FaWhatsapp className="mr-2" /> Chat WhatsApp
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-500 text-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
              <FaWhatsapp size={32} className="mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Chat with us on WhatsApp</h3>
              <p className="mb-6">Have general questions? We’re here 24/7.</p>
              <Link
                href="https://wa.me/919995022146"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white text-green-600 py-3 px-6 rounded-full hover:bg-gray-100 transition"
              >
                <FaWhatsapp className="mr-2" /> Start Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Quick Enroll: {course}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  placeholder="City, State"
                  required
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </div>
              <input
                type="text"
                placeholder="e.g. Bachelor of Design"
                required
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-full font-semibold transition ${
                  loading ? 'opacity-50' : ''
                }`}
              >
                {loading ? 'Submitting…' : 'Submit'}
              </button>
            </form>
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
