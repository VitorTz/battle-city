import { create } from 'zustand'
import { ImageDB } from '@/types/ImageDB'


type ProfileIconsState = {
    icons: ImageDB[]
    setIcons: (icons: ImageDB[]) => void
}


export const useProfileIconsState = create<ProfileIconsState>((set) => ({
    icons: [],    
    setIcons: (icons: ImageDB[]) => (set((state) => {
        return {...state, icons}
    }))
}))
