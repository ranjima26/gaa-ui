'use client'

import { poppins } from '../fonts/poppins'
import Link from 'next/link'

export default function RefundTopperSection() {
  return (
    <section
      id="cta"
      className={`
        ${poppins.className}
        bg-gradient-to-br from-black via-gray-900 to-black
        text-white py-20 px-6 sm:px-10 lg:px-24
      `}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
          <span className="text-white">
            Be the Creative Topper in your batch & Get a&nbsp;
          </span>
          <span className="text-green-400 glow-text">
            100% Refund
          </span>
        </h2>

        <p className="text-lg sm:text-xl mb-6 text-gray-300">
          In every long-term course at <strong>GAA</strong>, one standout student gets a full course fee <span className="text-green-400 font-semibold">refund</span>.
        </p>

        <p className="text-base sm:text-lg mb-6 text-gray-200">
          We’ll evaluate you with:
        </p>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10 text-base sm:text-lg text-gray-300"
        >
          <li className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
            ✅ Live project performance
          </li>
          <li className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
            📈 Consistency & Growth
          </li>
          <li className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
            📅 Attendance & Discipline
          </li>
          <li className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
            💡 Originality & Innovation
          </li>
        </ul>

        <p className="text-lg sm:text-xl font-semibold mb-10">
          Think you’ve got what it takes?
        </p>

        <Link
          href="#enroll"
          className="
            inline-block
            bg-green-500 hover:bg-green-600
            text-white font-bold
            px-10 py-4 text-lg sm:text-xl
            rounded-full transition duration-300
            shadow-lg hover:shadow-xl
          "
        >
          Enroll Now
        </Link>
      </div>

      {/* Subtle glow animation styles */}
      <style jsx>{`
  .glow-text {
    color: #22c55e;
    animation: glowPulse 3s ease-in-out infinite;
    font-weight: 700;
  }

  @keyframes glowPulse {
    0% {
      text-shadow: 0 0 2px #22c55e;
    }
    30% {
      text-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e;
    }
    60% {
      text-shadow: 0 0 2px #22c55e;
    }
    100% {
      text-shadow: 0 0 2px #22c55e;
    }
  }
`}</style>






    </section>
  )
}
