import { create } from "zustand";
import { Card } from "@/types/Card";
import { Duelist } from "@/types/Duelist";


type DuelistState = {
    duelist: Duelist | null,
    setDuelist: (duelist: Duelist) => void
}


export const useDuelistState = create<DuelistState>(
    (set) => ({
        duelist: null,
        setDuelist: (duelist: Duelist) => {set((state) => {
            return {...state, duelist}
        })}
    })
)