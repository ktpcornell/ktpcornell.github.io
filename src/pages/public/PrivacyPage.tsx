import { PageWrapper } from '@/components/layout/PageWrapper'

/**
 * The privacy notice for KTP Manager's Google sign-in. Google requires a privacy policy
 * link before the sign-in screen can be published to every Cornell account. Deliberately
 * not linked from the navbar or footer: it exists for the Google consent screen.
 */
export function PrivacyPage() {
  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="container mx-auto max-w-2xl px-4">
          <h1 className="mb-6 text-3xl font-bold text-ktp-dark">Privacy</h1>
          <p className="mb-4 text-base text-ktp-text">
            KTP Manager is the internal tool Kappa Theta Pi&apos;s Cornell chapter uses for points, events, coffee chats
            and member profiles. You sign in with your Cornell Google account. We receive only your name, email address
            and profile picture from Google, and use them only to run the chapter.
          </p>
          <p className="mb-4 text-base text-ktp-text">
            Your member profile (name, major, class year, hometown, LinkedIn, Cornell email, bio and headshot) is shown
            publicly on ktpcornell.com. The eboard can hide a profile on request.
          </p>
          <p className="mb-4 text-base text-ktp-text">
            We don&apos;t sell or share your information, and we don&apos;t use it for advertising. Data is stored with
            Supabase and the app is hosted on Vercel.
          </p>
          <p className="text-base text-ktp-text">
            To have your data changed or removed, email{' '}
            <a href="mailto:ktpcornell@gmail.com" className="font-semibold text-ktp-primary underline">
              ktpcornell@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </PageWrapper>
  )
}
