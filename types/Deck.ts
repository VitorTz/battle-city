

export type DeckType = "Structure" | "Community" | "Starter" | "Any" | "TCG"

export interface Deck {
    owner_name: string | null
    owner_image_url: string | null
    name: string
    deck_id: number
    descr: string | null
    num_cards: number
    image_url: string | null
    type: DeckType
    archetypes: string[]
    attributes: string[]
    frametypes: string[]
    races: string[]
    types: string[]
    is_public: boolean
    created_by: string
    owner: string
    userIsOwner: boolean
}