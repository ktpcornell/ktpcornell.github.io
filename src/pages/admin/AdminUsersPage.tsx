import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { UserTable } from '@/components/admin/UserTable'

export function AdminUsersPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8" style={{ background: 'var(--section-bg-color)' }}>
        <div className="mb-8">
          <h2 style={{ color: 'var(--navbar-bg-color)' }}>User Management</h2>
          <p>Toggle admin access for registered members. You cannot change your own role.</p>
        </div>

        <div
          className="mb-6 px-4 py-3 rounded-lg text-sm"
          style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', color: '#92400e' }}
        >
          <strong>Bootstrap note:</strong> To create the first admin, set{' '}
          <code>isAdmin: true</code> manually in Firebase Console{' '}
          <em>Firestore &gt; users &gt; {'{'}`uid`{'}'}</em>.
        </div>

        <UserTable />
      </div>
    </div>
  )
}
