import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Collections from '@/components/Collections'
import Story from '@/components/Story'
import Products from '@/components/Products'
import Craft from '@/components/Craft'
import Artisans from '@/components/Artisans'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import MobileMenu from '@/components/MobileMenu'

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <MobileMenu />
      <main>
        <Hero />
        <Ticker />
        <Collections />
        <Story />
        <Products />
        <Craft />
        <Artisans />
        <Testimonials />
        <Gallery />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
