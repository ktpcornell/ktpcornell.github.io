import { useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { RECRUITMENT_OPEN_EVENTS, RECRUITMENT_INTERVIEW_ROUNDS, type RecruitmentEvent } from '@/lib/constants'
import { Button } from '@/design-system/components/Button'

const TABS = [
  { id: 'events', label: 'Events', sub: 'Open Events for everyone' },
  { id: 'interviews', label: 'Interview Rounds', sub: 'Invite-only Rounds' },
  { id: 'coffee', label: 'Coffee Chats', sub: 'Get to know our members!' },
  { id: 'tips', label: 'Tips + Application', sub: '' },
]

function EventRow({ title, desc, date, time, location }: RecruitmentEvent) {
  return (
    <div className="border-b pb-8 mb-8 max-w-3xl mx-auto">
      <h4 className="mb-2">{title}</h4>
      <p>{desc}</p>
      <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-ktp-muted">
        <span>{date}</span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {time}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {location}
        </span>
      </div>
    </div>
  )
}

export function RecruitmentTabs() {
  const [activeTab, setActiveTab] = useState('events')

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap border-b-0">
        {TABS.map((tab, i) => (
          // DS-SKIP: <button> — custom tab control with border-l-[3px] left accent and fixed h-[150px] layout; cannot be expressed through Button variants without breaking the tab shape
          // DS-SKIP: border-l-[3px] — custom border-left width for the left accent rule; not expressible as a standard Tailwind border-l utility
          <button
            key={tab.id}
            className={[
              'border-0 border-l-[3px] px-6 py-5 transition-all w-1/4 cursor-pointer text-left h-[150px] flex flex-col justify-start bg-white',
              activeTab === tab.id
                ? 'border-l-ktp-accent shadow-lg'
                : i === 0 ? 'border-l-transparent' : 'border-l-ktp-surface',
            ].join(' ')}
            onClick={() => setActiveTab(tab.id)}
          >
            <h3
              className={`text-xl mb-1 font-bold ${
                activeTab === tab.id ? 'text-ktp-accent' : 'text-ktp-primary'
              }`}
            >
              {tab.label}
            </h3>
            {tab.sub && <small className="text-sm font-normal text-ktp-muted">{tab.sub}</small>}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-8">
        {activeTab === 'events' && (
          <div>
            {RECRUITMENT_OPEN_EVENTS.map((event) => (
              <EventRow key={event.title} {...event} />
            ))}
          </div>
        )}

        {activeTab === 'interviews' && (
          <div>
            {RECRUITMENT_INTERVIEW_ROUNDS.map((event) => (
              <EventRow key={event.title} {...event} />
            ))}
          </div>
        )}

        {activeTab === 'coffee' && (
          <div className="text-center py-8 max-w-3xl mx-auto">
            <h4 className="mb-4 text-ktp-primary">Schedule a Coffee Chat</h4>
            <p className="mb-6">
              Coffee chats are a great way to get to know our brothers in a low-pressure, one-on-one
              setting. Sign up using the form below!
            </p>
            <Button variant="primary" asChild>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSftDj0bPM-wx-5rmwA937VZ9_Xs_tOjQRU82PmoF3tRaHULCg/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign Up for Coffee Chat
              </a>
            </Button>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="py-8 max-w-3xl mx-auto">
            <h4 className="mb-4 text-ktp-primary">Application Tips</h4>
            <ul className="list-disc pl-6 space-y-3">
              <li><p>Attend at least one info session or open event before applying.</p></li>
              <li><p>Be genuine — we value authenticity and passion for technology over GPA or prestige.</p></li>
              <li><p>Show curiosity: tell us what excites you in tech, even if you're just starting out.</p></li>
              <li><p>Come prepared with questions — our brothers love talking about their experiences.</p></li>
              <li><p>Anyone is allowed to join — we gladly accept potential new members from all disciplines!</p></li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <a
                  href="https://forms.gle/AbQNh6rqBK94MRH18"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Interest Form
                </a>
              </Button>
              <Button variant="primary" asChild>
                <a
                  href="https://forms.gle/cNQJKc8drtGXK74j9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spring 26 Application
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
