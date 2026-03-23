import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
          className={`border border-gray-200 rounded-lg mb-3 overflow-hidden border-l-[3px] ${
            openIndex === i ? 'border-l-ktp-accent' : 'border-l-ktp-primary'
          }`}
        >
          <button
            className={`w-full text-left px-6 py-4 font-semibold flex justify-between items-center text-ktp-primary border-none cursor-pointer transition-colors ${
              openIndex === i ? 'bg-ktp-surface' : 'bg-white'
            }`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 shrink-0 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            />
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
