import { useEffect, useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { MemberClassSection } from '@/components/public/MemberClassSection'
import { fetchMembers } from '@/services/membersService'
import type { MembersData } from '@/types/member'
import { Spinner } from '@/design-system/components/Spinner'
import { AlertBanner } from '@/design-system/components/AlertBanner'

export function MembersPage() {
  const [members, setMembers] = useState<MembersData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMembers()
      .then(setMembers)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-16">
          <AlertBanner variant="error">Failed to load members: {error}</AlertBanner>
        </div>
      </PageWrapper>
    )
  }

  if (!members) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Spinner />
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* E-board */}
        <MemberClassSection
          className="Executive Board"
          semester=""
          classPictureSrc="/images/classpictures/Fall2025Eboard.JPEG"
          members={members.eboard}
        />

        {/* Beta */}
        {members.beta && (
          <MemberClassSection
            className="Beta Class"
            semester="Fall 2025"
            classPictureSrc="/images/classpictures/betaclass.png"
            members={members.beta}
          />
        )}

        {/* Alpha */}
        {members.alpha && (
          <MemberClassSection
            className="Alpha Class"
            semester="Spring 2025"
            classPictureSrc="/images/classpictures/alphaclass.png"
            members={members.alpha}
          />
        )}

        {/* Gamma (future class) */}
        {members.gamma && members.gamma.length > 0 && (
          <MemberClassSection
            className="Gamma Class"
            semester=""
            members={members.gamma}
          />
        )}

        {/* Founders */}
        {members.founders && (
          <MemberClassSection
            className="Founders"
            semester=""
            members={members.founders}
          />
        )}
      </div>
    </PageWrapper>
  )
}
