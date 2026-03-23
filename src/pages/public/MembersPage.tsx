import { useEffect, useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { MemberClassSection } from '@/components/public/MemberClassSection'
import { fetchMembers } from '@/services/membersService'
import type { MembersData } from '@/types/member'

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
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-500">Failed to load members: {error}</p>
        </div>
      </PageWrapper>
    )
  }

  if (!members) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-8 h-8 border-4 border-ktp-accent border-t-transparent rounded-full animate-spin mx-auto" />
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
