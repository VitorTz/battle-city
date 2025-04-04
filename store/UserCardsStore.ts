import { create } from "zustand";
import { Card } from "@/types/Card";


type UserCardStore = {
    cards: Card[]
    setCards: (cards: Card[]) => void
}


export const useUserCardStore = create<UserCardStore>((set) => ({
    cards: [],
    setCards: (cards: Card[]) => {set((state) => {
        return {...state, cards}
    })}
}))