// src/app/layout.js
import './globals.css'
import VisitorTracker from './visitorTracker'
import { poppins } from '../fonts/poppins'
import QuickEnrollModal from './components/quickEnrollModal'
import Script from 'next/script' // ✅ import Script

export const metadata = {
  title: 'GAA Yellowtooths',
  description: 'Empowering creatives with industry-led courses, hands-on projects, and expert mentorship.',
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        {/* ✅ Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17367053346"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17367053346');
          `}
        </Script>
      </head>
      <body>
        {/* global tracker */}
        <VisitorTracker />

        {/* your page content */}
        {children}

        {/* Quick Enroll Modal */}
        <QuickEnrollModal />
      </body>
    </html>
  )
}
