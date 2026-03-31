// src/components/TestimonialsSection.js
'use client'

import { poppins } from '../fonts/poppins'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

const testimonials = [
  {
    quote: 'GAA transformed my design skills! The hands-on projects and expert feedback made all the difference.',
    name: 'Anjali Nair',
    role: 'UI/UX Designer',
    avatar: '/images/testimonials/anjali.jpg',
  },
  {
    quote: 'The instructors at GAA are industry pros. I landed a job within weeks of completing the course!',
    name: 'Rahul Menon',
    role: 'Graphic Designer',
    avatar: '/images/testimonials/rahul.jpg',
  },
  {
    quote: 'Yellowtooths delivered an incredible learning experience—interactive, engaging, and practical!',
    name: 'Meera Thomas',
    role: 'Motion Graphics Artist',
    avatar: '/images/testimonials/meera.jpg',
  },
  {
    quote: 'Yellowtooths delivered an incredible learning experience—interactive, engaging, and practical!',
    name: 'Meera Thomas',
    role: 'Motion Graphics Artist',
    avatar: '/images/testimonials/meera.jpg',
  },
]

export default function TestimonialsSection() {
  return (
    <section className={`${poppins.className} bg-gray-50 py-16`}>      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          What Our Students Say
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ quote, name, role, avatar }, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg">
              <FaQuoteLeft className="text-green-600 text-2xl mb-4" />
              <p className="italic text-gray-700 mb-6">“{quote}”</p>

              <div className="flex items-center">
                <img
                  src={avatar}
                  alt={name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{name}</h4>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </div>

              <FaQuoteRight className="text-green-600 text-2xl mt-4 ml-auto block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
