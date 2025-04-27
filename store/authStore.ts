import { create } from 'zustand'
import { AppUser } from '@/types/AppUser'
import { Session } from '@supabase/supabase-js'
import { ImageDB } from '@/types/ImageDB'

type AuthStore = {
    user: AppUser | null
    session: Session | null
    userLoading: boolean
    setUsername: (username: string) => void
    setUserLoading: (loading: boolean) => void
    login: (session: Session, user: AppUser) => void
    setProfileIcon: (image: ImageDB) => void
    logout: () => void
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    session: null,
    userLoading: false,
    setUsername: (username: string) => (set((state) => {
        if (!state.user) {
            return {...state}
        }
        return {...state, user: {...state.user, username}}
    })),
    setUserLoading: (loading: boolean) => (set((state) => {
        return {...state, userLoading: loading}
    })),
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
