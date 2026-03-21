const pillars = [
  {
    icon: 'bi bi-briefcase fs-3',
    bg: 'bg-pink',
    title: 'Professional Development',
    body: 'Through events like NYC Trek to visit companies, interview training, resume building, one-on-one mentorship, recruitment help, and more, Kappa Theta Pi Professional Development aims to prepare members for success in any technology-related career.',
  },
  {
    icon: 'bi bi-globe fs-3',
    bg: 'bg-warning',
    title: 'Alumni Connections',
    body: 'Our alumni are spread out across the world and work on cutting-edge technologies at companies like Microsoft, Amazon, Apple, and Google, to startups, consulting firms, financial technology firms, and more!',
  },
  {
    icon: 'bi bi-people fs-3',
    bg: 'bg-info',
    title: 'Social Growth',
    body: 'The people you meet in Kappa Theta Pi will go on to be some of your closest friends throughout college and beyond. We host a variety of exclusive social events including formals, retreats, big/lil, apple picking, and casual hangouts.',
  },
  {
    icon: 'bi bi-cpu fs-3',
    bg: 'bg-success',
    title: 'Technical Advancement',
    body: 'Kappa Theta Pi provides members numerous opportunities to enhance their current technical skills, as well as learn new ones. NME covers Tech Consulting, Data Science, Machine Learning, Frontend, Backend, and Project Management.',
  },
  {
    icon: 'bi bi-mortarboard fs-3',
    bg: 'bg-primary',
    title: 'Academic Support',
    body: 'Kappa Theta Pi brothers strive to foster academic growth and excellence for each other. We host weekly study sessions and provide a supportive network filled with some of the brightest tech minds at the university.',
  },
]

export function ValuesSection() {
  return (
    <section className="section-padding" style={{ background: 'var(--section-bg-color)' }} id="pillars">
      <div className="container mx-auto px-4 text-center">
        <h2 className="fw-bold mb-5" style={{ color: 'var(--navbar-bg-color)' }}>
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {pillars.map((p) => (
            <div key={p.title} className="card h-100 shadow-sm p-4 border-0 values-card">
              <div className={`icon-box mb-3 ${p.bg} text-white rounded-full mx-auto`}>
                <i className={p.icon} />
              </div>
              <h5 className="fw-bold">{p.title}</h5>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
