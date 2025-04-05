import { DeckType } from "./Deck"


export type DeckSearchOptions = {
    name: string | null
    archetypes: string[]
    attributes: string[]
    frametypes: string[]
    races: string[]
    types: string[]
    deckType: DeckType[]
    page: number
}