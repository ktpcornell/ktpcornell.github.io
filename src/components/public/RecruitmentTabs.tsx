import { useState } from 'react'

const TABS = [
  { id: 'events', label: 'Events', sub: 'Open Events for everyone' },
  { id: 'interviews', label: 'Interview Rounds', sub: 'Invite-only Rounds' },
  { id: 'coffee', label: 'Coffee Chats', sub: 'Get to know our members!' },
  { id: 'tips', label: 'Tips + Application', sub: '' },
]

function EventRow({
  title,
  desc,
  date,
  time,
  location,
}: {
  title: string
  desc: string
  date: string
  time: string
  location: string
}) {
  return (
    <div className="border-b pb-8 mb-8">
      <div className="col-lg-8">
        <h4 className="mb-2">{title}</h4>
        <p>{desc}</p>
        <div className="flex flex-wrap items-center gap-6 mt-4 text-sm">
          <span>{date}</span>
          <span>🕐 {time}</span>
          <span>📍 {location}</span>
        </div>
      </div>
    </div>
  )
}

export function RecruitmentTabs() {
  const [activeTab, setActiveTab] = useState('events')

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap schedule-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`schedule-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <h3>{tab.label}</h3>
            {tab.sub && <small>{tab.sub}</small>}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-8">
        {activeTab === 'events' && (
          <div>
            <EventRow
              title="Resume Review & Meet the Brothers"
              desc="Come join us to hear about what makes a good resume for applying to Tech Roles and get your resume reviewed. At the end, we will have a meet and greet where you can get to know the brothers in an informal setting!"
              date="Wednesday, January 28th"
              time="5:00pm - 6:00pm"
              location="MVR 1157"
            />
            <EventRow
              title="Information Session 1"
              desc="Join us for one of our information sessions! First, we'll give a presentation about what it means to be a brother in KTP. Then, we'll break out into open discussion and you'll have a chance to ask our brothers any questions."
              date="Thursday, January 29th"
              time="5:00pm - 6:00pm"
              location="Hollister 110"
            />
            <EventRow
              title="KTP x WICC x CDJ Women in Tech Panel"
              desc="Join KTP, Women in Computing at Cornell (WICC), and Cornell Data Journal (CDJ) for a collaborative Women in Tech Panel featuring guest speakers affiliated with Google, Amazon, and more!"
              date="Monday, February 2nd"
              time="5:00pm - 6:00pm"
              location="Phillips 203"
            />
            <EventRow
              title="Information Session 2"
              desc="A second chance to learn about KTP and ask our brothers questions before the application closes."
              date="Tuesday, February 3rd"
              time="5:00pm - 6:00pm"
              location="Phillips 219"
            />
          </div>
        )}

        {activeTab === 'interviews' && (
          <div>
            <EventRow
              title="Round 1: Resume Drop"
              desc="Submit your application online. You will be notified if you are selected for an interview."
              date="Tuesday, February 3rd"
              time="Due by 11:59pm"
              location="Online"
            />
            <EventRow
              title="Round 2: Round-Robin Interviews"
              desc="Invite-only. Selected applicants will rotate through multiple short conversations with brothers."
              date="Saturday, February 7th"
              time="9:00am - 1:00pm"
              location="Invite Only"
            />
            <EventRow
              title="Round 3: Final Interview"
              desc="Invite-only. Finalists will have a longer, deeper conversation with chapter leadership."
              date="Sunday, February 8th"
              time="9:00am - 1:00pm"
              location="Invite Only"
            />
          </div>
        )}

        {activeTab === 'coffee' && (
          <div className="text-center py-8">
            <h4 className="mb-4" style={{ color: 'var(--navbar-bg-color)' }}>
              Schedule a Coffee Chat
            </h4>
            <p className="mb-6">
              Coffee chats are a great way to get to know our brothers in a low-pressure, one-on-one
              setting. Sign up using the form below!
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSftDj0bPM-wx-5rmwA937VZ9_Xs_tOjQRU82PmoF3tRaHULCg/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn"
            >
              Sign Up for Coffee Chat
            </a>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="py-8">
            <h4 className="mb-4" style={{ color: 'var(--navbar-bg-color)' }}>
              Application Tips
            </h4>
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
                className="custom-btn custom-border-btn"
              >
                Interest Form
              </a>
              <a
                href="https://forms.gle/cNQJKc8drtGXK74j9"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-btn"
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
