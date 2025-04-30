import { create } from "zustand";
import { TagUser } from "@/types/UserTag";


type UserTagState = {
    userTagMap: Map<number, TagUser>
    setUserTagMap: (tagMap: Map<number, TagUser>) => void
}


export const useUserTagState = create<UserTagState>(
    (set) => ({
        userTagMap: new Map(),
        setUserTagMap: (tagMap: Map<number, TagUser>) => {set((state) => {
            return {...state, userTagMap: tagMap}
        })}
    })
)