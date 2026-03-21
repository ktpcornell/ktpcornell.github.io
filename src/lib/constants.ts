export const placements = [
  { name: 'Google', file: 'google.png' },
  { name: 'Microsoft', file: 'microsoft.png' },
  { name: 'Meta', file: 'meta.png' },
  { name: 'Amazon', file: 'amazon.png' },
  { name: 'Apple', file: 'apple.png' },
  { name: 'UBS', file: 'UBS.png' },
  { name: 'Wells Fargo', file: 'wells_fargo.png' },
  { name: 'Deutsche', file: 'deutsche.png' },
  { name: 'Datadog', file: 'datadog.png' },
  { name: 'Stripe', file: 'stripe.png' },
  { name: 'IBM', file: 'ibm.png' },
  { name: 'Protiviti', file: 'protiviti.png' },
  { name: 'Uber', file: 'uber.png' },
  { name: 'Duolingo', file: 'duolingo.png' },
  { name: 'Linkedin', file: 'linkedin.png' },
  { name: 'Doordash', file: 'doordash.png' },
  { name: 'PwC', file: 'pwc.png' },
  { name: 'Barclays', file: 'barclays.png' },
  { name: 'Medtronic', file: 'medtronic.png' },
  { name: 'Echo3D', file: 'echo3D.png' },
  { name: 'SLAC', file: 'SLAC.png' },
  { name: 'Jahnel Group', file: 'jahnel_group.png' },
  { name: 'Harvard Medical', file: 'harvard_medical.png' },
  { name: 'RTX', file: 'RTX.png' },
  { name: 'Regeneron', file: 'regeneron.png' },
  { name: 'CVTE', file: 'CVTE.png' },
  { name: 'Verizon', file: 'verizon.png' },
  { name: 'Goldman Sachs', file: 'goldman_sachs.png' },
  { name: 'Capital One', file: 'capital_one.png' },
  { name: 'EY', file: 'ey.png' },
  { name: 'Chicago Trading Company', file: 'chicago_trading.png' },
]

export const campusClubs = [
  { name: 'ACSU', file: 'acsu.png' },
  { name: 'ALFA', file: 'alfa.png' },
  { name: 'AppDev', file: 'appdev.png' },
  { name: 'Armada', file: 'armada.png' },
  { name: 'AUV', file: 'auv.png' },
  { name: 'Blockchain', file: 'blockchain.png' },
  { name: 'CDJ', file: 'cdj.png' },
  { name: 'CIBC', file: 'cibc.png' },
  { name: 'CDS', file: 'cds.png' },
  { name: 'CEV', file: 'cev.png' },
  { name: 'CHS', file: 'chs.png' },
  { name: 'CMR', file: 'cmr.png' },
  { name: 'CREDIT', file: 'credit.png' },
  { name: 'CTC', file: 'ctc.png' },
  { name: 'CUxD', file: 'cuxd.png' },
  { name: 'Cyber', file: 'cyber.png' },
  { name: 'DataStrat', file: 'datastrat.png' },
  { name: 'DCC', file: 'dcc.png' },
  { name: 'DTI', file: 'dti.png' },
  { name: 'Eship', file: 'eship.png' },
  { name: 'EWB', file: 'ewb.png' },
  { name: 'FinTech', file: 'fintech.png' },
  { name: 'Hack4Impact', file: 'hack4impact.png' },
  { name: 'IBC', file: 'ibc.png' },
  { name: 'IEEE', file: 'ieee.png' },
  { name: 'ISA', file: 'isa.png' },
  { name: 'Nexus', file: 'nexus.png' },
  { name: 'SWE', file: 'swe.png' },
  { name: 'Thread', file: 'thread.png' },
  { name: 'WebDev', file: 'webdev.png' },
  { name: 'WICC', file: 'wicc.png' },
]

export const galleryImages = [
  'images/gallery/2025PledgesKTP.JPEG',
  'images/gallery/IshaKatelyn.JPEG',
  'images/gallery/WonjinAmishiKatelyn.jpeg',
  'images/gallery/SaeshaLexi.JPEG',
  'images/gallery/gabesalanformal.JPEG',
  'images/gallery/biglilgirls.jpeg',
  'images/gallery/ktpdummies.jpeg',
  'images/gallery/founderHeart.JPEG',
  'images/gallery/2025dinner.jpeg',
  'images/gallery/cruisegroup.jpeg',
  'images/gallery/deeshlin.png',
  'images/gallery/betaaccept.png',
  'images/gallery/ktpmen.png',
  'images/gallery/jbhousewarming.png',
  'images/gallery/DeeshLexiHomecoming.JPEG',
  'images/gallery/deeshlils.png',
  'images/classpictures/2025eboard.JPG',
  'images/gallery/ktpatties.jpg',
]

export const KTP_CLASSES = ['Founders', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta']

export interface RecruitmentEvent {
  title: string
  desc: string
  date: string
  time: string
  location: string
}

export const RECRUITMENT_OPEN_EVENTS: RecruitmentEvent[] = [
  {
    title: 'Resume Review & Meet the Brothers',
    desc: 'Come join us to hear about what makes a good resume for applying to Tech Roles and get your resume reviewed. At the end, we will have a meet and greet where you can get to know the brothers in an informal setting!',
    date: 'Wednesday, January 28th',
    time: '5:00pm - 6:00pm',
    location: 'MVR 1157',
  },
  {
    title: 'Information Session 1',
    desc: "Join us for one of our information sessions! First, we'll give a presentation about what it means to be a brother in KTP. Then, we'll break out into open discussion and you'll have a chance to ask our brothers any questions.",
    date: 'Thursday, January 29th',
    time: '5:00pm - 6:00pm',
    location: 'Hollister 110',
  },
  {
    title: 'KTP x WICC x CDJ Women in Tech Panel',
    desc: 'Join KTP, Women in Computing at Cornell (WICC), and Cornell Data Journal (CDJ) for a collaborative Women in Tech Panel featuring guest speakers affiliated with Google, Amazon, and more!',
    date: 'Monday, February 2nd',
    time: '5:00pm - 6:00pm',
    location: 'Phillips 203',
  },
  {
    title: 'Information Session 2',
    desc: 'A second chance to learn about KTP and ask our brothers questions before the application closes.',
    date: 'Tuesday, February 3rd',
    time: '5:00pm - 6:00pm',
    location: 'Phillips 219',
  },
]

export const RECRUITMENT_INTERVIEW_ROUNDS: RecruitmentEvent[] = [
  {
    title: 'Round 1: Resume Drop',
    desc: 'Submit your application online. You will be notified if you are selected for an interview.',
    date: 'Tuesday, February 3rd',
    time: 'Due by 11:59pm',
    location: 'Online',
  },
  {
    title: 'Round 2: Round-Robin Interviews',
    desc: 'Invite-only. Selected applicants will rotate through multiple short conversations with brothers.',
    date: 'Saturday, February 7th',
    time: '9:00am - 1:00pm',
    location: 'Invite Only',
  },
  {
    title: 'Round 3: Final Interview',
    desc: 'Invite-only. Finalists will have a longer, deeper conversation with chapter leadership.',
    date: 'Sunday, February 8th',
    time: '9:00am - 1:00pm',
    location: 'Invite Only',
  },
]
