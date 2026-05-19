'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  const { t } = useLanguage()
  if (!visible) return null

  return (
    <div className="relative text-center py-2 px-10 font-sans text-[0.68rem] tracking-[0.16em] uppercase text-white" style={{ background: '#C4922A' }}>
      {t.announcement}
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-white cursor-pointer text-sm leading-none"
      >
        ✕
      </button>
    </div>
  )
}
