import { create } from 'zustand'
import { Prices } from '@/types/Prices'


type CardPriceState = {
    cardPrices: Map<number, Prices>
    addPrice: (card_id: number, prices: Prices) => void
}


export const useCardPriceState = create<CardPriceState>((set) => ({
    cardPrices: new Map(),    
    addPrice: (card_id: number, prices: Prices) => (set((state) => {
        const r = new Map(state.cardPrices)
        r.set(card_id, prices)
        return {...state, cardPrices: r}
    }))
}))
