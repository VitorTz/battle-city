import { create } from 'zustand'
import { AppUser } from '@/types/AppUser'
import { Session } from '@supabase/supabase-js'
import { ImageDB } from '@/types/ImageDB'

type AuthStore = {
    user: AppUser | null
    session: Session | null
    login: (session: Session, user: AppUser) => void
    setProfileIcon: (image: ImageDB) => void
    logout: () => void
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    session: null,
    login: (session: Session, user: AppUser) => (set((state) => {
        return {...state, session, user}
    })),
    logout: () => (set((state) => {
        return {...state, session: null, user: null}
    })),
    setProfileIcon: (image: ImageDB) => (set((state) => {
        if (state.user) {
            return {...state, user: {...state.user, image}}
        }
        return {...state}
    }))
}))
