import { create } from "zustand";
import { TagUser } from "@/types/UserTag";


type UserTagState = {
    userTags: Set<string>,
    addOrRemoveTag: (tag: string) => void
    setUserTags: (userTags: Set<string>) => void
}


export const useUserTagState = create<UserTagState>(
    (set) => ({
        userTags: new Set(),
        setUserTags: (userTags: Set<string>) => {set((state) => {
            return {...state, userTags}
        })},
        addOrRemoveTag: (tag: string) => {set((state) => {
            const s = new Set(state.userTags)
            state.userTags.has(tag) ?  
                s.delete(tag) :
                s.add(tag)
            return {...state, userTags: s}
        })}
    })
)