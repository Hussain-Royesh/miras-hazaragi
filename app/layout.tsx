import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Vazirmatn } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { NavProvider } from '@/context/NavContext'
import { LanguageProvider } from '@/context/LanguageContext'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: 'MIRAS — Her Art, Her Power.',
  description:
    'Handcrafted Hazargi clothing celebrating Afghan heritage. Khamak embroidery, handmade in Quetta, Pakistan.',
  keywords: ['Hazargi', 'Khamak', 'Afghan clothing', 'embroidery', 'handmade'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${vazirmatn.variable}`}>
      <body>
        <LanguageProvider>
          <NavProvider>
            <CartProvider>{children}</CartProvider>
          </NavProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
