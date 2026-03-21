# Admin Guide

## Granting the First Admin

There is no admin user by default. The first admin must be created manually:

1. Have the person create an account by logging in at `/login` (this creates their `users/{uid}` document with `isAdmin: false`)
2. Go to [Firebase Console](https://console.firebase.google.com/) → Project `ktpcornell-app` → Firestore Database → `users` collection
3. Find the document with the person's UID (visible in the document list or via Auth → Users)
4. Click the document, then click the `isAdmin` field and set it to `true`
5. The user must sign out and sign back in for the change to take effect in their session

## Granting / Revoking Admin (After First Admin Exists)

1. Log in as an existing admin
2. Go to `/admin/users`
3. Find the user in the table and click the toggle switch in the Admin column
4. The change is immediate — the user's next session will reflect the new role

You cannot change your own admin status from the dashboard (the toggle is disabled for the currently signed-in user).

---

## Creating Announcements

1. Log in as admin → navigate to `/admin/announcements`
2. Click **+ New Announcement**
3. Fill in:
   - **Title** — short subject line
   - **Body** — full announcement text
   - **Pinned** — check this to pin it to the top of the portal feed
4. Click **Save**

The announcement appears immediately in the members portal at `/portal`.

To edit or delete, use the Edit/Delete buttons on each row in the announcements table.

---

## Managing Alumni Database

1. Log in as admin → navigate to `/admin/alumni`
2. Click **+ Add Alumni** to create a new entry
3. Required fields: Name, KTP Class, Graduation Year, Major, Current Company, Current Role
4. Optional: LinkedIn URL, email, internal notes

To search, type in the search bar — it filters by name or company in real time.

To edit or delete an entry, use the buttons on the right side of each row.

Members can view the alumni database (read-only) at `/portal/alumni`.

---

## Admin Dashboard Overview

`/admin` shows counts for:
- Total announcements in Firestore
- Total alumni entries in Firestore
- Total registered users in Firestore

These counts are live — they update when you navigate to the page.

Quick links on the dashboard navigate directly to each management section.

---

## Security Notes

- Only users with `isAdmin: true` in their Firestore `users/{uid}` document can access `/admin` routes or write to Firestore
- Firestore rules enforce this server-side — a non-admin cannot bypass the UI to write data
- Admin access is scoped to the chapter's Firebase project; no access to GitHub or DNS is granted by being an admin on the site
