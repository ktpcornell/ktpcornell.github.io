import type { Member } from '@/types/member'
import { MemberCard } from './MemberCard'
import { Heading } from '@/design-system/components/Typography'

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
      <Heading level={2} className="text-center text-ktp-primary mb-1">{className}</Heading>
      {semester && <Heading level={4} className="text-center mb-4">{semester}</Heading>}

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
