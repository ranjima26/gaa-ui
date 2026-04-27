import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import CTASection from '../components/CTASection'
import RefundTopperSection from '../components/RefundTopperSection'

const CoursesChatSection = dynamic(() => import('../components/CoursesChatSection'), { suspense: true })
const PosterGallerySection = dynamic(() => import('../components/PosterGallerySection'), { suspense: true })
const YouTubeShowcase = dynamic(() => import('../components/YouTubeShowcase'), { suspense: true })
const SecondaryEnrollSection = dynamic(() => import('../components/SecondaryEnrollSection'), { suspense: true })

export default function Page() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      {/* <RefundTopperSection /> */}
      <Suspense fallback={<div /> }>
        <CoursesChatSection />
      </Suspense>
      <CTASection />
      <Suspense fallback={<div /> }>
        <PosterGallerySection />
      </Suspense>
      <Suspense fallback={<div /> }>
        <YouTubeShowcase />
      </Suspense>
      {/* <TestimonialsSection /> */}
      <Suspense fallback={<div /> }>
        <SecondaryEnrollSection />
      </Suspense>
      <Footer />
      {/* …other sections… */}
    </>
  )
}
