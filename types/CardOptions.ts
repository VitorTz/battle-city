

export type CardSearchOptions = {
    name: string | null
    attributes: string[]
    archetypes: string[]
    frametypes: string[]
    races: string[]
    types: string[]
    page: number
    sortBy: "name" | "attack" | "defence" | "level"
    sortOrder: "ASC" | "DESC"
}