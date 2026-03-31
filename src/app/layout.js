// src/app/layout.js
import './globals.css'
import VisitorTracker from '../components/VisitorTracker'
import { poppins } from '../fonts/poppins'
import Preloader from '../components/Preloader'
import FloatingContactButtons from '../components/FloatingContactButtons'
import Script from 'next/script' // ✅ import Script

export const metadata = {
  title: 'Global Academy of Artistry',
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
        {/* global trackers / preloaders */}
        <VisitorTracker />
        {/* <Preloader /> */}

        {/* your page content */}
        {children}

        {/* floating buttons (whatsapp / phone) */}
        <FloatingContactButtons />
      </body>
    </html>
  )
}
