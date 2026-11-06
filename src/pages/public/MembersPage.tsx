import { PageWrapper } from '@/components/layout/PageWrapper'
import { MemberClassSection } from '@/components/public/MemberClassSection'
import { getMembers } from '@/data/members'
import { groupMembers } from '@/data/classes'

// Section order, labels and photos come from CLASSES (src/data/classes.ts).
export function MembersPage() {
  const groups = groupMembers(getMembers())

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        {groups.map((group) => (
          <MemberClassSection key={group.config.key} group={group} />
        ))}
      </div>
    </PageWrapper>
  )
}
