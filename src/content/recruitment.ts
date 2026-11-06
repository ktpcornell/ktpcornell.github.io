/**
 * Everything the Join page shows: copy, form links, the schedule tabs and the countdown's events.
 * Ported verbatim from live `join.html` on `main` (Fall 2026). Update this file each recruitment
 * season; nothing else on the Join page hardcodes dates or links.
 */
import type { CountdownEvent } from '@/lib/countdown'

export interface RecruitmentEvent {
  title: string
  desc: string
  date: string
  time: string
  location: string
}

export interface RecruitmentLink {
  href: string
  label: string
}

/** Intro section (live join.html:103-112). */
export const RECRUITMENT_TITLE = 'Fall 2026 Recruitment'

export const RECRUITMENT_INTRO =
  'Thank you for your interest in becoming a member of Kappa Theta Pi. Applications for Fall 2026 open soon and will close on Wednesday, September 9th @ 11:59pm. You will be notified if you are invited for interviews, which will run September 10th - 13th. If you have any questions, please email ktpcornell@gmail.com. For more updates, follow our instagram @ktpcornell and sign up for our interest form!'

export const INTEREST_FORM: RecruitmentLink = {
  href: 'https://docs.google.com/forms/d/e/1FAIpQLSfSIErM3yo_saP6a2fNRm9Xsv5X0z68F9FOkw-1frAzvC6SyQ/viewform?usp=publish-editor',
  label: 'Interest Form',
}

export const APPLICATION_FORM: RecruitmentLink = {
  href: 'https://docs.google.com/forms/d/e/1FAIpQLSepeA-hVKJVz5MRc5lhtlGFElhjpxLafTTlQziCIWWCP_kejw/viewform',
  label: 'Fall 26 Application',
}

export const COFFEE_CHAT_FORM: RecruitmentLink = {
  href: 'https://docs.google.com/forms/d/e/1FAIpQLSfqwcJ7eLflUvJBxE8E49pHppXRdJcA3TtBmzx1bSQOO_kCLA/viewform?usp=header',
  label: 'Coffee Chat Form',
}

/**
 * The countdown's events (live join.html:129-148), in order. Times are the viewer's local time,
 * exactly as live's `new Date('September 8, 2026 17:00:00')` parses them.
 */
export const COUNTDOWN_EVENTS: CountdownEvent[] = [
  {
    name: 'KTP x WICC x CFT Resume Review',
    location: 'Goldwin Smith Hall G64',
    start: new Date(2026, 8, 8, 17, 0, 0),
    end: new Date(2026, 8, 8, 18, 0, 0),
  },
  {
    name: 'Information Session 2',
    location: 'Caldwell 100',
    start: new Date(2026, 8, 9, 17, 0, 0),
    end: new Date(2026, 8, 9, 18, 0, 0),
  },
  {
    name: 'Applications close',
    location: 'Online',
    start: new Date(2026, 8, 9, 23, 59, 0),
    end: new Date(2026, 8, 9, 23, 59, 0),
    deadline: true,
  },
]

/** Shown once every countdown event has passed (live join.html:179). */
export const COUNTDOWN_CLOSED_MESSAGE = 'Applications for Fall 2026 are now closed.'

/** Events tab (live join.html:233-309). */
export const RECRUITMENT_OPEN_EVENTS: RecruitmentEvent[] = [
  {
    title: 'AppDev x CDS x H4I x DTI x KTP Coffee Chat',
    desc: 'Join KTP alongside AppDev, Cornell Data Science, Hack4Impact, and Digital Tech & Innovation for a casual coffee chat where you can meet members from all five orgs and ask questions in an informal setting!',
    date: 'Friday, August 28th',
    time: '12:00pm',
    location: 'Gates Hall',
  },
  {
    title: 'Information Session 1',
    desc: "Join us for one of our information sessions! First, we'll give a presentation about what it means to be a brother in KTP. Then, we'll break out into open discussion and you'll have a chance to ask our brothers any questions related to application, Kappa Theta Pi, or anything else you may be wondering!",
    date: 'Thursday, September 3rd',
    time: '6:00pm - 7:00pm',
    location: 'Olin 255',
  },
  {
    title: 'Club Fest',
    desc: 'Come stop by Club Fest to talk to members tabling, learn more about the club, and how you could benefit from joining!',
    date: 'Saturday, September 5th',
    time: '12:00pm - 1:30pm',
    location: 'Arts Quad',
  },
  {
    title: 'KTP x WICC x CFT Resume Review',
    desc: 'Join KTP, Women in Computing at Cornell (WICC), and Cornell Fintech (CFT) to hear about what makes a good resume for applying to tech roles and get your resume reviewed by our members!',
    date: 'Tuesday, September 8th',
    time: '5:00pm - 6:00pm',
    location: 'Goldwin Smith Hall G64',
  },
  {
    title: 'Information Session 2',
    desc: "Join us for our last information session! First, we'll give a presentation about what it means to be a brother in KTP. Then, we'll break out into open discussion and you'll have a chance to ask our brothers any questions related to application, Kappa Theta Pi, or anything else you may be wondering!",
    date: 'Wednesday, September 9th',
    time: '5:00pm - 6:00pm',
    location: 'Caldwell 100',
  },
  {
    title: 'Applications Due',
    desc: 'Submit your application with your resume and a few short questions to help us get to know you and your interest in KTP.',
    date: 'Wednesday, September 9th',
    time: '11:59pm',
    location: 'Online',
  },
]

/** Interview Rounds tab (live join.html:317-341). */
export const RECRUITMENT_INTERVIEW_ROUNDS: RecruitmentEvent[] = [
  {
    title: 'Round 1: Round-Robin',
    desc: 'The round robin will consist of timed rounds where potential members will rotate through the tables, lasting 1 hour in total.',
    date: 'September 10th - 13th',
    time: 'Time TBD',
    location: 'Invite Only',
  },
  {
    title: 'Round 2: Final Interview',
    desc: 'The final round will be individual for each applicant where they will be asked questions by 2-3 members for 30-45 minutes.',
    date: 'September 10th - 13th',
    time: 'Time TBD',
    location: 'Invite Only',
  },
]

/** Coffee Chats tab (live join.html:351-356). */
export const COFFEE_CHAT_COPY = {
  heading: 'Get to know our members!',
  body: 'Coffee chats are a great way to get to know our members in an informal setting.',
}

/** Tips + Application tab (live join.html:368-373). "commited" is live's spelling, kept verbatim. */
export const TIPS_COPY = {
  heading: 'Application Tips',
  body: 'We accept students from all different majors who are commited and have a dedicated interest in technology and a desire to be a part of a community which supports them professionally and technically.',
}

/** Tab buttons (live join.html:195-225). */
export const RECRUITMENT_TABS = [
  { id: 'events', label: 'Events', sub: 'Open Events for everyone' },
  { id: 'interviews', label: 'Interview Rounds', sub: 'Invite-only Rounds' },
  { id: 'coffee', label: 'Coffee Chats', sub: 'Get to know our members!' },
  { id: 'tips', label: 'Tips + Application', sub: '' },
] as const

export type RecruitmentTabId = (typeof RECRUITMENT_TABS)[number]['id']
