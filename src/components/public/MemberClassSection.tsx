import type { ClassGroup } from '@/data/classes'
import { Img } from '@/components/media/Img'
import { MemberCard } from './MemberCard'
import { Heading } from '@/design-system/components/Typography'

/**
 * One Members-page section, as on live members.html:53-107: heading, semester, class photo
 * (max 750px wide), then the cards in `row g-4 justify-content-center` with
 * col-sm-6 col-md-4 col-lg-3: 1/2/3/4 across, a short last row centered.
 */
export function MemberClassSection({ group }: { group: ClassGroup }) {
  const { config, members } = group

  return (
    <section className="mb-12" aria-labelledby={`class-${config.key}`}>
      <Heading
        level={2}
        id={`class-${config.key}`}
        className={`text-center text-ktp-primary ${config.semester ? 'mb-1' : 'mt-4 mb-6'}`}
      >
        {config.label}
      </Heading>
      {config.semester && <Heading level={4} className="text-center mb-6">{config.semester}</Heading>}

      {config.classPhoto && (
        <div className="text-center mb-12">
          <Img
            src={config.classPhoto}
            className="inline-block max-w-[750px] w-full h-auto"
            alt={`${config.label} group photo`}
            sizes="(min-width: 800px) 750px, calc(100vw - 2rem)"
          />
        </div>
      )}

      <div className="flex flex-wrap justify-center -mx-3 gap-y-6">
        {members.map((member, i) => (
          <div
            key={`${member.name}-${i}`}
            className="w-full min-[576px]:w-1/2 md:w-1/3 min-[992px]:w-1/4 px-3"
          >
            <MemberCard member={member} cardId={`${config.key}:${i}`} />
          </div>
        ))}
      </div>
    </section>
  )
}
