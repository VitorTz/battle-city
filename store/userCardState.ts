import { create } from "zustand";
import { Card } from "@/types/Card";


type UserCardStore = {
    cards: Map<number, Card>
    addCard: (card: Card) => void
    deleteCard: (cards: Card) => void
    setCards: (cards: Card[]) => void
}


export const useUserCardStore = create<UserCardStore>((set) => ({
    cards: new Map(),
    addCard: (card: Card) => {set((state) => {
        const r = new Map(state.cards)
        r.set(card.card_id, card)
        return {...state, cards: r}
    })},
    deleteCard: (card: Card) => {set((state) => {
        const r = new Map(state.cards)
        r.delete(card.card_id)
        return {...state, cards: r}
    })},
    setCards: (cards: Card[]) => {set((state) => {
        const r = new Map()
        cards.forEach(item => r.set(item.card_id, item))
        return {...state, cards: r}
    })}
}))