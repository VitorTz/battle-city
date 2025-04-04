

export type Card = {
    name: string
    card_id: number
    attack: number | null
    defence: number | null
    level: number | null
    archetype: string | null
    attribute: string | null
    frametype: string | null
    race: string | null
    type: string | null
    descr: string
    image_url: string
    cropped_image_url: string
    num_copies: number
}