import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge has to be told about the custom `text-heading-1…6` font sizes from
 * tailwind.config.ts. Without this it files them under text COLOR, so a Heading given a color
 * (`text-white`) silently dropped its size: the home hero title rendered at 16px instead of 62px.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
