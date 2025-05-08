import { create } from "zustand";
import { Card } from "@/types/Card";
import { Deck } from "@/types/Deck";


type DeckState = {
    deck: Deck | null,
    setDeck: (deck: Deck) => void
}


export const useDeckState = create<DeckState>(
    (set) => ({
        deck: null,
        setDeck: (deck: Deck) => {set((state) => {
            return {...state, deck}
        })}
    })
)