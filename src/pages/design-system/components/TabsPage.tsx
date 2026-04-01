import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-ktp-muted p-1 text-ktp-muted-fg',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
      'ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-ktp-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-white data-[state=active]:text-ktp-primary data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-ktp-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export function TabsPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Tabs</h1>
        <p className="text-ktp-fg-body">
          Switch between related views on the same page. Built on Radix UI. Exports:{' '}
          <code className="text-sm font-mono">Tabs</code>,{' '}
          <code className="text-sm font-mono">TabsList</code>,{' '}
          <code className="text-sm font-mono">TabsTrigger</code>,{' '}
          <code className="text-sm font-mono">TabsContent</code>.
        </p>
        <p className="text-ktp-fg-body mt-2">
          For complex tab layouts with custom styling (e.g. left-border indicator, rich content),
          prefer a custom implementation — see{' '}
          <code className="text-sm font-mono bg-ktp-bg-surface px-1.5 py-0.5 rounded text-ktp-primary">
            RecruitmentTabs
          </code>{' '}
          as a reference.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-fg-body mb-4">Default (Radix Tabs)</p>
          <div className="border border-ktp-border rounded-xl p-8">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <p className="text-ktp-fg-body text-sm mb-0">
                  KTP is Cornell's first co-ed professional technology fraternity, focused on
                  professional development, technical skills, and community.
                </p>
              </TabsContent>
              <TabsContent value="members" className="mt-4">
                <p className="text-ktp-fg-body text-sm mb-0">
                  Over 100 active members across engineering, computing, and business — united by a
                  passion for technology.
                </p>
              </TabsContent>
              <TabsContent value="events" className="mt-4">
                <p className="text-ktp-fg-body text-sm mb-0">
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
