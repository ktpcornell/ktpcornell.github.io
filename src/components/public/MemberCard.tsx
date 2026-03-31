import { useEffect, useRef, useState } from 'react'
import type { Member } from '@/types/member'
import { Heading } from '@/design-system/components/Typography'

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  const [flipped, setFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setFlipped(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFlipped((f) => !f)
  }

  const photoSrc = member.photo.startsWith('http') ? member.photo : `/${member.photo}`

  return (
    <div>
      <div
        ref={cardRef}
        className={`member-card ${flipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
      >
        <div className="card-inner">
          {/* Front */}
          <div className="card-front">
            <img src={photoSrc} alt={member.name} />
            <div className="member-overlay">
              <div className="member-name">{member.name}</div>
              <div className="member-major">{member.major}</div>
            </div>
          </div>

          {/* Back */}
          <div className="card-back text-white">
            {member.hometown && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🏠</span>
                <p className="mb-0 text-white">{member.hometown}</p>
              </div>
            )}
            {member.linkedin && (
              <div className="mb-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ktp-accent"
                  onClick={(e) => e.stopPropagation()}
                >
                  LinkedIn ↗
                </a>
              </div>
            )}
            {member.email && (
              <div className="mb-3">
                <a
                  href={`mailto:${member.email}`}
                  className="text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {member.email}
                </a>
              </div>
            )}
            {member.description && (
              <p className="text-white text-sm">{member.description}</p>
            )}
          </div>
        </div>
      </div>
      {member.role && (
        <div className="text-center mt-2">
          <Heading level={6}>{member.role}</Heading>
        </div>
      )}
    </div>
  )
}
