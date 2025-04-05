import { create } from "zustand"
import { Deck } from "@/types/Deck"


type DeckStore = {
    deck: Deck | null
    setDeck: (deck: Deck) => void
}


export const useDeckStore = create<DeckStore>(
    (set) => ({
        deck:  null,
        setDeck: (deck: Deck) => {set((state) => {            
            return {...state, deck}
        })}
    })
)
