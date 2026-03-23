import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { UserTable } from '@/components/admin/UserTable'
import { AlertBanner } from '@/design-system/components/AlertBanner'

export function AdminUsersPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8 bg-ktp-surface">
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
    </div>
  )
}
