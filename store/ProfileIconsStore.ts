import { DatabaseImage } from "@/types/DatabaseImage";
import { create } from "zustand";


type ProfileIconsStore = {
    icons: DatabaseImage[],
    setIcons: (icons: DatabaseImage[]) => void
}



export const useProfileIconsStore = create<ProfileIconsStore>((set) => ({
    icons: [],
    setIcons: (icons: DatabaseImage[]) => {set((state) => {
        return {...state, icons}
    })}
}))