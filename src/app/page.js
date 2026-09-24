import Header from './components/header'
import Hero from './components/hero'
import About from './components/about'
import OurCourse from './components/ourCourse'
import CreativeCta from './components/creativeCta'
import Footer from './components/footer'
import Preloader from './components/preloader'

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="relative min-h-screen bg-[#034b86]">
        <Header />
        <Hero />
        <About />
        <OurCourse />
        <CreativeCta />
        <Footer />
      </main>
    </>
  )
}
