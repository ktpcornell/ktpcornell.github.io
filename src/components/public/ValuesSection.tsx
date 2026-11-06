import { Briefcase, Globe, Users, Cpu, GraduationCap } from 'lucide-react'
import { Heading } from '@/design-system/components/Typography'

const pillars = [
  {
    Icon: Briefcase,
    iconBg: 'bg-ktp-accent-pink',
    title: 'Professional Development',
    body: 'Through events like NYC Trek to visit companies, interview training, resume building, one-on-one mentorship, recruitment help, and more, Kappa Theta Pi Professional Development aims to prepare members for success in any technology-related career. We take pride in developing the tech leaders of the future.',
  },
  {
    Icon: Globe,
    // DS-SKIP: bg-amber-400 — decorative pillar icon bg; no ktp-* semantic equivalent; tokenization deferred
    iconBg: 'bg-amber-400',
    title: 'Alumni Connections',
    body: 'Our alumni are spread out across the world and work on cutting-edge technologies. They work at a plethora of companies - from tech companies like Microsoft, Amazon, Apple, and Google, to startups, consulting firms, financial technology firms, and more! Every semester, we host alumni panels to invite alums to come provide insight into their daily lives in tech.',
  },
  {
    Icon: Users,
    iconBg: 'bg-ktp-accent',
    title: 'Social Growth',
    body: 'The people you meet in Kappa Theta Pi will go on to be some of your closest friends throughout college and beyond. We host a variety of exclusive social events throughout the semester through which our members can bond, some of which include formals, retreats, big/lil, apple picking, and casual hangouts.',
  },
  {
    Icon: Cpu,
    // DS-SKIP: bg-green-500 — decorative pillar icon bg; no ktp-* semantic equivalent; tokenization deferred
    iconBg: 'bg-green-500',
    title: 'Technical Advancement',
    body: 'Kappa Theta Pi provides members numerous opportunities to enhance their current technical skills, as well as learn new ones. New Member Education (NME) series covers technical learnings and projects in Tech Consulting, Data Science, Machine Learning, Frontend, Backend, Project Management, etc.',
  },
  {
    Icon: GraduationCap,
    iconBg: 'bg-ktp-primary',
    title: 'Academic Support',
    body: 'Kappa Theta Pi brothers strive to foster academic growth and excellence for each other. We host weekly study sessions and provide a supportive network filled with some of the brightest tech minds at the university that members can always rely on for help in classes and extracurricular activities.',
  },
]

export function ValuesSection() {
  return (
    <section className="section-padding bg-ktp-bg-surface" id="pillars">
      <div className="container mx-auto px-4 text-center">
        <Heading level={2} className="mb-10 text-ktp-primary">Our Values</Heading>
        {/* Live about.html:116: row g-4 justify-content-center, col-md-6 col-lg-4, so the
            last row of two is centered. */}
        <div className="flex flex-wrap justify-center -mx-3 gap-y-6">
          {pillars.map((p) => (
            <div key={p.title} className="w-full md:w-1/2 min-[992px]:w-1/3 px-3">
              <div className="h-full bg-white shadow-sm p-6 border-0 values-card rounded-xl">
                <div className={`icon-box mb-4 ${p.iconBg} text-white rounded-full mx-auto`}>
                  <p.Icon size={24} />
                </div>
                <Heading level={5} className="mb-2">{p.title}</Heading>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
