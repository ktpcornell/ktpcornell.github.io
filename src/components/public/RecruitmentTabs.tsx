import { useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { RECRUITMENT_OPEN_EVENTS, RECRUITMENT_INTERVIEW_ROUNDS, type RecruitmentEvent } from '@/lib/constants'

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
      <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-ktp-text">
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

const btnBase =
  'border-0 border-l-[3px] px-6 py-5 transition-all w-1/4 cursor-pointer text-left h-[150px] flex flex-col justify-start bg-white'
const btnInactive = 'border-l-ktp-section-bg'
const btnActive = 'border-l-ktp-cyan shadow-lg'

const outlineBtn =
  'inline-block px-6 py-2.5 rounded-full border-2 border-ktp-navy text-ktp-navy text-sm font-bold hover:bg-ktp-navy hover:text-white transition-colors no-underline'
const solidBtn =
  'inline-block px-6 py-2.5 rounded-full bg-ktp-navy text-white text-sm font-bold hover:bg-ktp-cyan hover:text-ktp-navy transition-colors no-underline'

export function RecruitmentTabs() {
  const [activeTab, setActiveTab] = useState('events')

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap border-b-0">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            className={`${btnBase} ${activeTab === tab.id ? btnActive : btnInactive} ${i === 0 ? 'border-l-transparent' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <h3
              className={`text-xl mb-1 font-bold ${
                activeTab === tab.id ? 'text-ktp-cyan' : 'text-ktp-navy'
              }`}
            >
              {tab.label}
            </h3>
            {tab.sub && <small className="text-sm font-normal text-ktp-text">{tab.sub}</small>}
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
            <h4 className="mb-4 text-ktp-navy">Schedule a Coffee Chat</h4>
            <p className="mb-6">
              Coffee chats are a great way to get to know our brothers in a low-pressure, one-on-one
              setting. Sign up using the form below!
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSftDj0bPM-wx-5rmwA937VZ9_Xs_tOjQRU82PmoF3tRaHULCg/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className={solidBtn}
            >
              Sign Up for Coffee Chat
            </a>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="py-8 max-w-3xl mx-auto">
            <h4 className="mb-4 text-ktp-navy">Application Tips</h4>
            <ul className="list-disc pl-6 space-y-3">
              <li><p>Attend at least one info session or open event before applying.</p></li>
              <li><p>Be genuine — we value authenticity and passion for technology over GPA or prestige.</p></li>
              <li><p>Show curiosity: tell us what excites you in tech, even if you're just starting out.</p></li>
              <li><p>Come prepared with questions — our brothers love talking about their experiences.</p></li>
              <li><p>Anyone is allowed to join — we gladly accept potential new members from all disciplines!</p></li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://forms.gle/AbQNh6rqBK94MRH18"
                target="_blank"
                rel="noopener noreferrer"
                className={outlineBtn}
              >
                Interest Form
              </a>
              <a
                href="https://forms.gle/cNQJKc8drtGXK74j9"
                target="_blank"
                rel="noopener noreferrer"
                className={solidBtn}
              >
                Spring 26 Application
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
