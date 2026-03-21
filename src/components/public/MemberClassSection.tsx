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
      <h2 className="font-bold text-center text-ktp-navy mb-1">{className}</h2>
      {semester && <h4 className="text-center mb-4">{semester}</h4>}

      {classPictureSrc && (
        <div className="text-center mb-8">
          <img
            src={classPictureSrc}
            className="max-w-[750px] w-full"
            alt={`${className} group photo`}
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map((member, i) => (
          <MemberCard key={`${member.name}-${i}`} member={member} />
        ))}
      </div>
    </div>
  )
}
