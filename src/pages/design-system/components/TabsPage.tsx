import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export function TabsPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-gray-200">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Tabs</h1>
        <p className="text-ktp-muted">
          Switch between related views on the same page. Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/components/ui/tabs
          </code>
          . Built on Radix UI. Exports:{' '}
          <code className="text-sm font-mono">Tabs</code>,{' '}
          <code className="text-sm font-mono">TabsList</code>,{' '}
          <code className="text-sm font-mono">TabsTrigger</code>,{' '}
          <code className="text-sm font-mono">TabsContent</code>.
        </p>
        <p className="text-ktp-muted mt-2">
          For complex tab layouts with custom styling (e.g. left-border indicator, rich content),
          prefer a custom implementation — see{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            RecruitmentTabs
          </code>{' '}
          as a reference.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-muted mb-4">Default (ShadCN Tabs)</p>
          <div className="border border-gray-200 rounded-xl p-8">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <p className="text-ktp-muted text-sm mb-0">
                  KTP is Cornell's first co-ed professional technology fraternity, focused on
                  professional development, technical skills, and community.
                </p>
              </TabsContent>
              <TabsContent value="members" className="mt-4">
                <p className="text-ktp-muted text-sm mb-0">
                  Over 100 active members across engineering, computing, and business — united by a
                  passion for technology.
                </p>
              </TabsContent>
              <TabsContent value="events" className="mt-4">
                <p className="text-ktp-muted text-sm mb-0">
                  We host workshops, tech talks, company visits, and social events each semester.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  )
}
