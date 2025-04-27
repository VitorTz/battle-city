import { create } from "zustand"
import { Card } from "@/types/Card"


type RelatedCardsState = {
    relatedCards: Map<string, Card[]>
    addRelatedCards: (key: string, cards: Card[]) => void
}


export const useRelatedCardsState = create<RelatedCardsState>((set) => ({
    relatedCards: new Map(),
    addRelatedCards: (key: string, cards: Card[]) => {set((state) => {
        const r = new Map(state.relatedCards)
        r.set(key, cards)
        return {...state, cards: r}
    })}
}))