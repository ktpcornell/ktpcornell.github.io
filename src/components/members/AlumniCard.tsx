import type { AlumniEntry } from '@/types/alumni'
import { Card, CardHeader, CardBody } from '@/design-system/components/Card'
import { Badge } from '@/design-system/components/Badge'
import { Heading, Body, Caption } from '@/design-system/components/Typography'

interface AlumniCardProps {
  alumni: AlumniEntry
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div>
          <Heading level={6} color="white" className="mb-0">{alumni.name}</Heading>
          <Caption className="text-ktp-fg-subtle">{alumni.graduationYear}</Caption>
        </div>
        <Badge variant="cyan">{alumni.ktpClass}</Badge>
      </CardHeader>
      <CardBody>
        <Body className="font-semibold mb-1 text-ktp-primary">
          {alumni.currentRole}
        </Body>
        <Caption className="mb-2">{alumni.currentCompany}</Caption>
        <Caption className="mb-3">{alumni.major}</Caption>
        {alumni.linkedin && (
          // DS-SKIP: no DS Link component; using raw <a> with ktp-* hover tokens
          <a
            href={alumni.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ktp-primary hover:text-ktp-accent transition-colors no-underline"
          >
            LinkedIn ↗
          </a>
        )}
      </CardBody>
    </Card>
  )
}
