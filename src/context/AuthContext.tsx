import { createContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import type { AppUser } from '@/types/user'

interface AuthContextValue {
  currentUser: User | null
  appUser: AppUser | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  appUser: null,
  loading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      if (user) {
        const userRef = doc(db, 'users', user.uid)
        const snap = await getDoc(userRef)

        if (snap.exists()) {
          setAppUser(snap.data() as AppUser)
        } else {
          // First login — create user document
          const newUser: Omit<AppUser, 'createdAt'> & { createdAt: ReturnType<typeof serverTimestamp> } = {
            uid: user.uid,
            email: user.email ?? '',
            displayName: user.displayName ?? undefined,
            isAdmin: false,
            createdAt: serverTimestamp(),
          }
          await setDoc(userRef, newUser)
          // Re-read to get server timestamp
          const newSnap = await getDoc(userRef)
          setAppUser(newSnap.data() as AppUser)
        }
      } else {
        setAppUser(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, appUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
