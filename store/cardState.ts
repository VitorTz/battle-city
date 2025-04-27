import { create } from "zustand";
import { Card } from "@/types/Card";


type CardState = {
    card: Card | null,
    setCard: (card: Card) => void
}


export const useCardState = create<CardState>(
    (set) => ({
        card: null,
        setCard: (card: Card) => {set((state) => {
            return {...state, card}
        })}
    })
)