import { create } from "zustand";
import { Card } from "@/types/Card";
import { TagUser } from "@/types/UserTag";


type TagState = {
    tags: TagUser[],
    setTags: (tags: TagUser[]) => void
}


export const useTagState = create<TagState>(
    (set) => ({
        tags: [],
        setTags: (tags: TagUser[]) => {set((state) => {
            return {...state, tags}
        })}
    })
)