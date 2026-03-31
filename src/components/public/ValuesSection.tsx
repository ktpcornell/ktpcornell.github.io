import { Briefcase, Globe, Users, Cpu, GraduationCap } from 'lucide-react'

const pillars = [
  {
    Icon: Briefcase,
    iconBg: 'bg-ktp-accent-pink',
    title: 'Professional Development',
    body: 'Through events like NYC Trek to visit companies, interview training, resume building, one-on-one mentorship, recruitment help, and more, Kappa Theta Pi Professional Development aims to prepare members for success in any technology-related career.',
  },
  {
    Icon: Globe,
    // DS-SKIP: bg-amber-400 — decorative pillar icon bg; no ktp-* semantic equivalent; tokenization deferred
    iconBg: 'bg-amber-400',
    title: 'Alumni Connections',
    body: 'Our alumni are spread out across the world and work on cutting-edge technologies at companies like Microsoft, Amazon, Apple, and Google, to startups, consulting firms, financial technology firms, and more!',
  },
  {
    Icon: Users,
    iconBg: 'bg-ktp-accent',
    title: 'Social Growth',
    body: 'The people you meet in Kappa Theta Pi will go on to be some of your closest friends throughout college and beyond. We host a variety of exclusive social events including formals, retreats, big/lil, apple picking, and casual hangouts.',
  },
  {
    Icon: Cpu,
    // DS-SKIP: bg-green-500 — decorative pillar icon bg; no ktp-* semantic equivalent; tokenization deferred
    iconBg: 'bg-green-500',
    title: 'Technical Advancement',
    body: 'Kappa Theta Pi provides members numerous opportunities to enhance their current technical skills, as well as learn new ones. NME covers Tech Consulting, Data Science, Machine Learning, Frontend, Backend, and Project Management.',
  },
  {
    Icon: GraduationCap,
    iconBg: 'bg-ktp-primary',
    title: 'Academic Support',
    body: 'Kappa Theta Pi brothers strive to foster academic growth and excellence for each other. We host weekly study sessions and provide a supportive network filled with some of the brightest tech minds at the university.',
  },
]

export function ValuesSection() {
  return (
    <section className="section-padding bg-ktp-surface" id="pillars">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-bold mb-10 text-ktp-primary">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white shadow-sm p-6 border-0 values-card rounded-xl">
              <div className={`icon-box mb-4 ${p.iconBg} text-white rounded-full mx-auto`}>
                <p.Icon size={24} />
              </div>
              <h5 className="font-bold mb-2">{p.title}</h5>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
