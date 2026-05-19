const items = [
  'Handmade in Quetta',
  'Khamak Embroidery',
  'Free UK & Australia Shipping',
  'Hazargi Heritage',
  '100% Artisan Crafted',
  'Women-Led Cooperative',
  'Traditional Patterns',
  'Sustainable Fashion',
]

const doubled = [...items, ...items]

export default function Ticker() {
  return (
    <div className="overflow-hidden py-3" style={{ background: '#4B5E3A', borderTop: '2px solid #C4922A' }}>
      <div className="flex whitespace-nowrap animate-ticker">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-sans text-[0.68rem] tracking-[0.18em] uppercase px-10"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {item}
            <span className="mx-4" style={{ color: '#C4922A' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
