import { UserTable } from '@/components/admin/UserTable'
import { AlertBanner } from '@/design-system/components/AlertBanner'

export function AdminUsersPage() {
  return (
    <div className="p-8 bg-ktp-bg-surface min-h-full">
        <div className="mb-8">
          <h2 className="text-ktp-primary">User Management</h2>
          <p>Toggle admin access for registered members. You cannot change your own role.</p>
        </div>

        <AlertBanner variant="warning" className="mb-6">
          <strong>Bootstrap note:</strong> To create the first admin, set{' '}
          <code className="font-mono text-xs">isAdmin: true</code> manually in Firebase Console{' '}
          <em>Firestore &gt; users &gt; {'{'}`uid`{'}'}</em>.
        </AlertBanner>

        <UserTable />
    </div>
  )
}
