import type { AlumniEntry } from '@/types/alumni'
import { Card, CardHeader, CardBody } from '@/design-system/components/Card'
import { Badge } from '@/design-system/components/Badge'
import { Caption } from '@/design-system/components/Typography'

interface AlumniCardProps {
  alumni: AlumniEntry
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div>
          <h6 className="text-white font-bold mb-0">{alumni.name}</h6>
          <span className="text-white/70 text-xs">
            {alumni.graduationYear}
          </span>
        </div>
        <Badge variant="cyan">{alumni.ktpClass}</Badge>
      </CardHeader>
      <CardBody>
        <p className="font-semibold mb-1 text-ktp-navy">
          {alumni.currentRole}
        </p>
        <Caption className="mb-2">{alumni.currentCompany}</Caption>
        <Caption className="mb-3">{alumni.major}</Caption>
        {alumni.linkedin && (
          <a
            href={alumni.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ktp-navy hover:text-ktp-cyan transition-colors no-underline"
          >
            LinkedIn ↗
          </a>
        )}
      </CardBody>
    </Card>
  )
}
