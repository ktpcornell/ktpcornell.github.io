import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/data/faq'

interface FaqAccordionProps {
  items: FaqItem[]
}

/**
 * Single-open accordion (live's data-bs-parent behavior). The highlight is bound to `openIndex`,
 * so it can't stick the way live's focus-based highlight did.
 * Answers are plain text: none of the live answers contain links or markup.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.map((item, i) => {
        const open = openIndex === i
        const buttonId = `${baseId}-q${i}`
        const panelId = `${baseId}-a${i}`
        return (
          // DS-SKIP: border-l-[3px] — custom border-left width for the left accent rule; not expressible as a standard Tailwind border-l utility
          <div
            key={item.question}
            className={`border border-ktp-border rounded-lg mb-3 overflow-hidden border-l-[3px] ${
              open ? 'border-l-ktp-accent' : 'border-l-ktp-primary'
            }`}
          >
            <h3 className="m-0 text-base">
              {/* DS-SKIP: <button> — accessibility-required pattern; Radix Accordion would change the animation/behavior contract for this existing implementation */}
              <button
                type="button"
                id={buttonId}
                className={`w-full text-left px-6 py-4 font-semibold flex justify-between items-center gap-4 text-ktp-primary border-none cursor-pointer transition-colors ${
                  open ? 'bg-ktp-bg-surface' : 'bg-white'
                }`}
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-6 py-4 bg-white"
            >
              <p className="mb-0">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
