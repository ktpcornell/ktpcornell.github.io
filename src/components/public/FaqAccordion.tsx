import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-lg mb-3 overflow-hidden"
          style={{ borderLeft: '3px solid var(--primary-color)' }}
        >
          <button
            className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center"
            style={{
              color: 'var(--navbar-bg-color)',
              background: openIndex === i ? 'var(--section-bg-color)' : 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <span
              className="transition-transform duration-200"
              style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ▼
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 py-4 bg-white">
              <p className="mb-0">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
