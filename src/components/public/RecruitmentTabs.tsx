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

function EventRow({ title, desc, date, time, location }: RecruitmentEvent) {
  return (
    <div className="border-b pb-8 mb-8 max-w-3xl mx-auto last:border-b-0">
      <Heading level={4} className="mb-2">{title}</Heading>
      <p>{desc}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-ktp-fg-body">
        <span>{date}</span>
        <span className="flex items-center gap-1">
          <Clock size={14} aria-hidden="true" />
          {time}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} aria-hidden="true" />
          {location}
        </span>
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
                'w-1/2 min-h-[110px] min-[992px]:w-1/4 min-[992px]:h-[150px]',
                'hover:border-l-ktp-accent hover:shadow-lg focus-visible:outline-none focus-visible:border-l-ktp-accent focus-visible:shadow-lg',
                selected
                  ? 'border-l-ktp-accent shadow-lg'
                  : i === 0 ? 'border-l-transparent' : 'border-l-ktp-bg-surface',
              ].join(' ')}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <Heading
                level={3}
                className={`text-lg sm:text-xl mb-1 tracking-normal group-hover:text-ktp-accent group-focus-visible:text-ktp-accent ${
                  selected ? 'text-ktp-accent' : 'text-ktp-primary'
                }`}
              >
                {tab.label}
              </Heading>
              {tab.sub && (
                <small className="text-sm sm:text-base font-normal text-ktp-fg-body">{tab.sub}</small>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="mt-8">
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
              <div className="max-w-3xl mx-auto">
                <Heading level={4} className="mb-2">{COFFEE_CHAT_COPY.heading}</Heading>
                <p className="mb-6">{COFFEE_CHAT_COPY.body}</p>
                <FormLink {...COFFEE_CHAT_FORM} />
              </div>
            )}

            {tab.id === 'tips' && (
              <div className="max-w-3xl mx-auto">
                <Heading level={4} className="mb-2">{TIPS_COPY.heading}</Heading>
                <p className="mb-6">{TIPS_COPY.body}</p>
                <FormLink {...APPLICATION_FORM} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
