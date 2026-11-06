import { useRef, useState, type KeyboardEvent } from 'react'
import { Clock, MapPin } from 'lucide-react'
import {
  APPLICATION_FORM,
  COFFEE_CHAT_COPY,
  COFFEE_CHAT_FORM,
  RECRUITMENT_INTERVIEW_ROUNDS,
  RECRUITMENT_OPEN_EVENTS,
  RECRUITMENT_TABS,
  TIPS_COPY,
  type RecruitmentEvent,
  type RecruitmentTabId,
} from '@/content/recruitment'
import { Button } from '@/design-system/components/Button'
import { Heading } from '@/design-system/components/Typography'

/** One schedule row, matching live join.html:233-309: a left-aligned 8/12 column, black h4 title,
 *  gray paragraph, then date / time / location spaced wide, and a rule under every row. */
function EventRow({ title, desc, date, time, location }: RecruitmentEvent) {
  return (
    <div className="border-b border-ktp-border pb-12 mb-12">
      <div className="w-full lg:w-2/3">
        <Heading level={4} className="mb-2 text-ktp-dark">{title}</Heading>
        <p>{desc}</p>
        <div className="flex flex-wrap items-center gap-y-2 mt-6 text-base text-ktp-text">
          <span className="mx-4 lg:mx-12">{date}</span>
          <span className="mx-4 lg:mx-12 flex items-center gap-2">
            <Clock size={16} aria-hidden="true" />
            {time}
          </span>
          <span className="mx-4 lg:mx-12 flex items-center gap-2">
            <MapPin size={16} aria-hidden="true" />
            {location}
          </span>
        </div>
      </div>
    </div>
  )
}

function FormLink({ href, label }: { href: string; label: string }) {
  return (
    <Button variant="primary" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </Button>
  )
}

const tabId = (id: RecruitmentTabId) => `recruitment-tab-${id}`
const panelId = (id: RecruitmentTabId) => `recruitment-panel-${id}`

export function RecruitmentTabs() {
  const [activeTab, setActiveTab] = useState<RecruitmentTabId>('events')
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = RECRUITMENT_TABS.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    setActiveTab(RECRUITMENT_TABS[next].id)
    buttonRefs.current[next]?.focus()
  }

  return (
    <div>
      {/* Tab buttons: 4 across from 992px (live's breakpoint), 2x2 below it, like live's max-width: 991px rule */}
      <div className="flex flex-wrap border-b-0" role="tablist" aria-label="Recruitment schedule">
        {RECRUITMENT_TABS.map((tab, i) => {
          const selected = activeTab === tab.id
          return (
            // DS-SKIP: <button> — custom tab control with border-l-[3px] left accent and fixed-height layout; cannot be expressed through Button variants without breaking the tab shape
            // DS-SKIP: border-l-[3px] — custom border-left width for the left accent rule; not expressible as a standard Tailwind border-l utility
            <button
              key={tab.id}
              ref={(el) => { buttonRefs.current[i] = el }}
              type="button"
              role="tab"
              id={tabId(tab.id)}
              aria-selected={selected}
              aria-controls={panelId(tab.id)}
              tabIndex={selected ? 0 : -1}
              className={[
                'group border-0 border-l-[3px] p-4 sm:px-[30px] sm:py-5 transition-all cursor-pointer text-left',
                'flex flex-col justify-start bg-white',
                'w-1/2 min-h-[120px] min-[992px]:w-1/4 min-[992px]:h-[150px]',
                'hover:border-l-ktp-accent hover:shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] focus-visible:outline-none focus-visible:border-l-ktp-accent focus-visible:shadow-[0_1rem_3rem_rgba(0,0,0,0.175)]',
                selected
                  ? 'border-l-ktp-accent shadow-[0_1rem_3rem_rgba(0,0,0,0.175)]'
                  : i === 0 ? 'border-l-transparent' : 'border-l-ktp-bg-surface',
              ].join(' ')}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {/* Live keeps every tab title navy (inline style on its h3); the active tab is shown by
                  the cyan left rule and the shadow. */}
              <Heading level={3} className="mb-1 text-ktp-primary max-[480px]:text-2xl">
                {tab.label}
              </Heading>
              {tab.sub && (
                <small className="text-base sm:text-lg font-normal text-ktp-fg-body">{tab.sub}</small>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="mt-12">
        {RECRUITMENT_TABS.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={panelId(tab.id)}
            aria-labelledby={tabId(tab.id)}
            hidden={activeTab !== tab.id}
          >
            {tab.id === 'events' &&
              RECRUITMENT_OPEN_EVENTS.map((event) => <EventRow key={event.title} {...event} />)}

            {tab.id === 'interviews' &&
              RECRUITMENT_INTERVIEW_ROUNDS.map((event) => <EventRow key={event.title} {...event} />)}

            {tab.id === 'coffee' && (
              <div className="w-full lg:w-2/3">
                <Heading level={4} className="mb-2 text-ktp-dark">{COFFEE_CHAT_COPY.heading}</Heading>
                <p className="mb-4">{COFFEE_CHAT_COPY.body}</p>
                <FormLink {...COFFEE_CHAT_FORM} />
              </div>
            )}

            {tab.id === 'tips' && (
              <div className="w-full lg:w-2/3">
                <Heading level={4} className="mb-2 text-ktp-dark">{TIPS_COPY.heading}</Heading>
                <p className="mb-4">{TIPS_COPY.body}</p>
                <FormLink {...APPLICATION_FORM} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
