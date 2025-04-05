import { create } from 'zustand'
import { User } from '@/types/User'
import { Session } from '@supabase/supabase-js'
import { DatabaseImage } from '@/types/DatabaseImage'

type AuthStore = {
    user: User | null
    session: Session | null
    login: (session: Session, user: User) => void
    logout: () => void
    setProfileIcon: (image: DatabaseImage) => void
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    session: null,
    login: (session: Session, user: User) => (set((state) => {
        return {...state, session, user}
    })),
    logout: () => (set((state) => {
        return {...state, session: null, user: null}
    })),
    setProfileIcon: (image: DatabaseImage) => (set((state) => {
        return {...state, user: {...state.user!, image: image}}
    }))
}))
