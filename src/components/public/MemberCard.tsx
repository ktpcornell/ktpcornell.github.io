import { useEffect, useRef, useState } from 'react'
import type { Member } from '@/types/member'

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

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 p-2">
      <div
        ref={cardRef}
        className={`member-card ${flipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
      >
        <div className="card-inner">
          {/* Front */}
          <div className="card-front">
            <img src={`/${member.photo}`} alt={member.name} />
            <div className="member-overlay">
              <div className="member-name">{member.name}</div>
              <div className="member-major">{member.major}</div>
            </div>
          </div>

          {/* Back */}
          <div className="card-back align-items-baseline text-white">
            {member.hometown && (
              <div className="d-flex align-items-center mb-3">
                <span className="text-white me-2 fs-5">🏠</span>
                <p className="mb-0 text-white">{member.hometown}</p>
              </div>
            )}
            {member.linkedin && (
              <div className="d-flex align-items-center mb-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-0 text-info"
                  onClick={(e) => e.stopPropagation()}
                >
                  LinkedIn ↗
                </a>
              </div>
            )}
            {member.email && (
              <div className="d-flex align-items-center mb-3">
                <a
                  href={`mailto:${member.email}`}
                  className="mb-0 text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {member.email}
                </a>
              </div>
            )}
            {member.description && (
              <p className="text-white" style={{ fontSize: '0.85rem' }}>
                {member.description}
              </p>
            )}
          </div>
        </div>
      </div>
      {member.role && (
        <div className="text-center mt-2">
          <h6>{member.role}</h6>
        </div>
      )}
    </div>
  )
}
