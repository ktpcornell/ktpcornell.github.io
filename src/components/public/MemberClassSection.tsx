import type { Member } from '@/types/member'
import { MemberCard } from './MemberCard'

interface MemberClassSectionProps {
  className: string
  semester: string
  classPictureSrc?: string
  members: Member[]
}

export function MemberClassSection({
  className,
  semester,
  classPictureSrc,
  members,
}: MemberClassSectionProps) {
  return (
    <div className="mb-12">
      <h2
        className="fw-bold text-center mb-1"
        style={{ color: 'var(--navbar-bg-color)' }}
      >
        {className}
      </h2>
      {semester && <h4 className="text-center mb-4">{semester}</h4>}

      {classPictureSrc && (
        <div className="text-center mb-8">
          <img
            src={classPictureSrc}
            className="img-fluid"
            style={{ maxWidth: 750, width: '100%' }}
            alt={`${className} group photo`}
          />
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {members.map((member, i) => (
          <MemberCard key={`${member.name}-${i}`} member={member} />
        ))}
      </div>
    </div>
  )
}
