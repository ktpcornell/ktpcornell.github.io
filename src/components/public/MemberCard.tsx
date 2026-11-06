import { useCallback, useSyncExternalStore, type KeyboardEvent, type MouseEvent } from 'react'
import { House, Linkedin, Mail } from 'lucide-react'
import { Img } from '@/components/media/Img'
import { safeHttpUrl } from '@/lib/safeUrl'
import type { Member } from '@/types/member'
import { Heading } from '@/design-system/components/Typography'

/*
 * Flip state for every card on the page, in one tiny store with ONE document listener
 * (it used to be one listener per card, ~45 on Members).
 *
 * Behavior matches live members.html:171-244: a click on a card flips it; a click anywhere
 * that isn't on a card unflips them all; clicking another card leaves the first one flipped
 * (live's per-card stopPropagation keeps document listeners from seeing card clicks). Links
 * on the back open without flipping the card.
 */
const flipped = new Set<string>()
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function onDocumentClick(e: Event) {
  if (flipped.size === 0) return
  if (e.target instanceof Element && e.target.closest('.member-card')) return
  flipped.clear()
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) document.addEventListener('click', onDocumentClick)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      document.removeEventListener('click', onDocumentClick)
      flipped.clear()
    }
  }
}

function toggle(id: string) {
  if (flipped.has(id)) flipped.delete(id)
  else flipped.add(id)
  emit()
}

const stop = (e: MouseEvent) => e.stopPropagation()


interface MemberCardProps {
  member: Member
  /** Unique on the page. An eboard member also appears in their class, so include the section. */
  cardId: string
}

export function MemberCard({ member, cardId }: MemberCardProps) {
  const isFlipped = useSyncExternalStore(
    subscribe,
    useCallback(() => flipped.has(cardId), [cardId]),
    () => false,
  )

  // Profile-sync data: only render the link if it's a real http(s) URL.
  const linkedin = safeHttpUrl(member.linkedin)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(cardId)
    }
  }

  return (
    <div>
      <div
        className={`member-card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => toggle(cardId)}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label={`${member.name}: show ${isFlipped ? 'photo' : 'details'}`}
      >
        <div className="card-inner">
          {/* Front */}
          <div className="card-front">
            <Img src={member.photo} alt={member.name} />
            <div className="member-overlay">
              <div className="member-name">{member.name}</div>
              <div className="member-major">{member.major}</div>
            </div>
          </div>

          {/* Back */}
          <div className="card-back text-white">
            {member.hometown && (
              <div className="flex items-center gap-2 mb-3">
                <House size={20} aria-hidden="true" />
                <p className="mb-0 text-white">{member.hometown}</p>
              </div>
            )}
            {linkedin && (
              <div className="flex items-center gap-2 mb-3">
                <Linkedin size={20} aria-hidden="true" />
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ktp-accent"
                  onClick={stop}
                  tabIndex={isFlipped ? 0 : -1}
                >
                  LinkedIn
                </a>
              </div>
            )}
            {member.email && (
              <div className="flex items-center gap-2 mb-3 max-w-full">
                <Mail size={20} aria-hidden="true" className="shrink-0" />
                <a
                  href={`mailto:${member.email}`}
                  className="text-white break-all"
                  onClick={stop}
                  tabIndex={isFlipped ? 0 : -1}
                >
                  {member.email}
                </a>
              </div>
            )}
            {member.description && (
              <p className="text-white text-sm">{member.description}</p>
            )}
          </div>
        </div>
      </div>
      {member.role && (
        <div className="text-center mt-2">
          <Heading level={6}>{member.role}</Heading>
        </div>
      )}
    </div>
  )
}
