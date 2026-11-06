import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/data/faq'

interface FaqAccordionProps {
  items: FaqItem[]
}

/**
 * Single-open accordion matching live join.html:384-519 (Bootstrap `accordion-flush`): full
 * container width, white rows separated by a bottom rule, bold 16px question, chevron on the
 * right, plain 16px answer. The open highlight is bound to `openIndex`, so it can't stick the
 * way live's focus-based highlight did. Answers are plain text (no live answer has links).
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  return (
    <div className="w-full mt-6">
      {items.map((item, i) => {
        const open = openIndex === i
        const buttonId = `${baseId}-q${i}`
        const panelId = `${baseId}-a${i}`
        return (
          <div key={item.question} className="mb-3 border-b border-ktp-border">
            <h3 className="m-0 text-base">
              {/* DS-SKIP: <button> — accordion trigger; Button variants are pill-shaped CTAs */}
              <button
                type="button"
                id={buttonId}
                className={`w-full text-left px-5 py-4 text-base font-bold flex justify-between items-center gap-4 border-none cursor-pointer transition-colors ${
                  open ? 'bg-ktp-bg-surface text-ktp-primary' : 'bg-white text-ktp-text'
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
              className="px-5 py-4 text-base text-ktp-text"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
