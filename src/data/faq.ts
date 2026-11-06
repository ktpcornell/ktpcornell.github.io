/**
 * The Join page's FAQ, read from the repo's `data/faq.json` (`{ "faqs": [...] }`).
 * Bundled at build time, like members.
 */
import raw from '../../data/faq.json'

export interface FaqItem {
  question: string
  answer: string
}

export function getFaq(): FaqItem[] {
  return (raw as { faqs: FaqItem[] }).faqs ?? []
}
