'use client'
import { useState, useRef } from 'react'

const LENS = 150   // lens circle diameter in px
const ZOOM = 2.8   // how much to magnify

interface Props {
  src: string
  alt: string
}

export default function ProductMagnifier({ src, alt }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  const bgW = ref.current ? ref.current.clientWidth * ZOOM : 0
  const bgH = ref.current ? ref.current.clientHeight * ZOOM : 0
  const bgX = pos ? -(pos.x * ZOOM - LENS / 2) : 0
  const bgY = pos ? -(pos.y * ZOOM - LENS / 2) : 0

  return (
    <div
      ref={ref}
      className="absolute inset-0 cursor-crosshair"
      onMouseMove={onMove}
      onMouseLeave={() => setPos(null)}
    >
      {/* Base product image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover" />

      {/* Magnifier lens — follows cursor, shows zoomed portion */}
      {pos && ref.current && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: LENS,
            height: LENS,
            left: pos.x - LENS / 2,
            top: pos.y - LENS / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${bgW}px ${bgH}px`,
            backgroundPosition: `${bgX}px ${bgY}px`,
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.85), 0 6px 24px rgba(0,0,0,0.35)',
            zIndex: 15,
          }}
        />
      )}
    </div>
  )
}
