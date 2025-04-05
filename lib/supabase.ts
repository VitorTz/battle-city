import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    CARD_FETCH_LIMIT, 
    DECK_FETCH_LIMIT 
} from '../constants/AppConstants';
import { createClient, PostgrestError, Session } from '@supabase/supabase-js'
import { orderCards, removeTrailingNewlines, } from '@/helpers/util';
import { DatabaseImage } from '@/types/DatabaseImage';
import { LimitedCards } from '@/types/LimitedCards';
import { DeckComment } from '@/types/DeckComment';
import { AppState } from "react-native";
import { Card } from '@/types/Card';
import { Deck } from '@/types/Deck';
import { User } from '@/types/User';
import Toast from '@/helpers/Toast';
import { CardSearchOptions } from "@/types/CardSearchOptions";
  
  
  
const supabaseUrl = 'https://mlhjkqlgzlkvtqjngzdr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1saGprcWxnemxrdnRxam5nemRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMTAzMzcsImV4cCI6MjA1NDg4NjMzN30.0V7Ysvy4mroEq4n-4_yOFXJrfgKWhWMKdG4sc_OpL8A"

const EQ_COMP = [
    "archetype",
    "attribute",
    "frametype",
    "race",
    "type"
]


export const supabase = createClient(supabaseUrl, supabaseKey as any, {
auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
},
});

AppState.addEventListener(
'change', (state) => {  
    if (state === 'active') {    
    supabase.auth.startAutoRefresh()  
    } else {    
    supabase.auth.stopAutoRefresh()  
    }
}
)

export async function supabaseGetSession(): Promise<Session | null> {
    const {data: {session} } = await supabase.auth.getSession()
    return session
}


export async function supabaseGetUser(user_id: string): Promise<User | null> {

    const { data } = await supabase
    .from("users")
    .select("name, image_id, images (image_url) ")
    .eq("user_id", user_id)
    .single()

    return data ? {
        username: data.name, 
        image: {
            image_id: data.image_id, 
            image_url: (data.images as any).image_url
        }} : null
}

export async function supabaseUpdateUserIcon(image_id: number): Promise<boolean> {
    const session = await supabaseGetSession()

    if (session) {
        const { error } = await supabase
            .from("users")
            .update({"image_id": image_id})
            .eq("user_id", session.user.id)
            return !error
    }

    return false
}

export async function checkIfUsernameExists(username: string): Promise<boolean> {
    username = username.trim()
    const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("name", username)
        .single()

    if (error) {        
        if (error.code == "PGRST116") { return false }
        console.log("error while checking existing username", error)
        return true
    }

    return data.name ? true : false
}


export async function supabaseAddCardToUserCollection(card_id: number, total: number): Promise<boolean> {
    const session = await supabaseGetSession()
    if (!session) { return false }

    const { error } = await supabase.rpc('insert_user_card', {
        p_card_id: card_id,
        p_user_id: session!.user.id,
        p_quantity: total
    })

    if (error) {
        console.log(error)
        return false
    }
    return true
}


export async function supabaseRmvCardFromUserCollection(card_id: number, total: number): Promise<boolean> {
    const session = await supabaseGetSession()
    if (!session) { return false }

    const { error } = await supabase.rpc('remove_user_card', {
        p_card_id: card_id,
        p_user_id: session!.user.id,
        p_quantity: total
    })

    if (error) {
        console.log(error)
        return false
    }
    return true
}


export async function supabaseCreateDeck(
    name: string, 
    description: string, 
    isPublic: boolean, 
    cards: Card[]
) {
    const session = await supabaseGetSession()

    if (!session) {
        console.log("user has no session")
        return false
    }

    const descr = removeTrailingNewlines(description.trim())
    const archetypes = new Set<string>()
    const attributes = new Set<string>()
    const frametypes = new Set<string>()
    const races = new Set<string>()
    const types = new Set<string>()  

    let cardMap = new Map<number, number>()
    let attack = 0
    let image_url = cards[0].cropped_image_url

    cards.forEach(item => {
        if (item.attack && item.attack > attack) {
        image_url = item.cropped_image_url
        }
        if (item.archetype) {
        archetypes.add(item.archetype)
        }

        if (item.attribute) {
        attributes.add(item.attribute)
        }

        if (item.frametype) {
        frametypes.add(item.frametype)
        }

        if (item.race) {
        races.add(item.race)
        }

        if (item.type) {
        types.add(item.type)
        }

        if (cardMap.has(item.card_id)) {
        cardMap.set(item.card_id, cardMap.get(item.card_id)! + 1)
        } else {
        cardMap.set(item.card_id, 1)
        }
    })  

    const { data, error } = await supabase
        .from("decks")
        .insert(
        [
        {
            name: name.trim(), 
            descr: descr != '' ? descr : null,
            type: "Community",
            num_cards: cards.length,
            is_public: isPublic,
            created_by: session.user.id,
            owner: session.user.id,
            image_url: image_url,
            archetypes: Array.from(archetypes),
            attributes: Array.from(attributes),
            frametypes: Array.from(frametypes),
            races: Array.from(races),
            types: Array.from(types)
        }
        ])
        .select("deck_id").single()

    if (error) {
        console.log(error)
        return false
    }

    const deck_id = data.deck_id
    const cardsToAdd: {deck_id: number, card_id: number, num_cards: number}[] = []

    cardMap.forEach((value, key) => {
        cardsToAdd.push({deck_id: deck_id, card_id: key, num_cards: value})
    })

    const {error: e1} = await supabase
        .from("deck_cards")
        .insert(cardsToAdd)

    if (e1) {
        await supabase
        .from("decks")
        .delete()
        .eq("deck_id", deck_id)
        return false
    }

    return true
}

export async function supabaseDeleteDeck(deck_id: number): Promise<boolean> {
    const { error } = await supabase
        .from("decks")
        .delete()
        .eq("deck_id", deck_id)

    if (error) {
        console.log(error)
        return false
    }

    return true
}


export async function supabaseUpdateDeck(
    deck_id: number, 
    deckName: string, 
    deckDescr: string | null, 
    isPublic: boolean,
    cards: Card[]
): Promise<boolean> {

    const descr = deckDescr ? removeTrailingNewlines(deckDescr) : null
    const archetypes = new Set<string>()
    const attributes = new Set<string>()
    const frametypes = new Set<string>()
    const races = new Set<string>()
    const types = new Set<string>()  

    let cardMap = new Map<number, number>()  

    cards.forEach(item => {    
        if (item.archetype) {
        archetypes.add(item.archetype)
        }

        if (item.attribute) {
        attributes.add(item.attribute)
        }

        if (item.frametype) {
        frametypes.add(item.frametype)
        }

        if (item.race) {
        races.add(item.race)
        }

        if (item.type) {
        types.add(item.type)
        }

        if (cardMap.has(item.card_id)) {
        cardMap.set(item.card_id, cardMap.get(item.card_id)! + 1)
        } else {
        cardMap.set(item.card_id, 1)
        }
    })  

    const { error } = await supabase
        .from("decks")
        .update(    
        {
            name: deckName.trim(), 
            descr: descr != '' ? descr : null,
            type: "Community",
            num_cards: cards.length,
            is_public: isPublic,        
            archetypes: Array.from(archetypes),
            attributes: Array.from(attributes),
            frametypes: Array.from(frametypes),
            races: Array.from(races),
            types: Array.from(types)
        }    
        ).eq('deck_id', deck_id)

    if (error) {
        console.log("could not update deck", error.message)    
        return false
    }

    const cardsToAdd: {deck_id: number, card_id: number, num_cards: number}[] = []

    cardMap.forEach((value, key) => {
        cardsToAdd.push({deck_id: deck_id, card_id: key, num_cards: value})
    })

    const {error: e1} = await supabase
        .from("deck_cards")
        .upsert(cardsToAdd, {ignoreDuplicates: true})

    if (e1) {
        console.log("Error", e1)
        return false
    }

    return true
}

export async function supabaseGetRandomTrivia(): Promise<string | null> {  
    const { data, error } = await supabase.rpc('get_random_trivia_descr')
    if (error) {
        console.error('Erro ao obter trivia:', error);
        return '';
    }
    return data;
}


export async function supabaseGetProfileIcons(): Promise<DatabaseImage[]> {
    const { data } = await supabase
        .from("profile_icons")
        .select("image_id, images (image_url)")
    const r: DatabaseImage[] = data ? data.map(
        item => {
        return {
            image_id: item.image_id, 
            image_url: (item.images as any).image_url
        }
        }
    ) : []
    return r
}


export async function supabaseGetDeck(deck_id: number | string): Promise<Deck | null> {
    const {data, error} = await supabase
        .from("decks")
        .select(`
        deck_id,
        name,
        type,
        descr,
        image_url,    
        num_cards,    
        archetypes,
        attributes,
        frametypes,
        races,
        types,
        is_public,
        created_by,
        owner
        `)
        .eq("deck_id", deck_id)
        .single()
        .overrideTypes<Deck>()

    if (error) {
        console.log(error)
        return null
    }
    return data as Deck
}


export async function supabaseGetDeckCards(deck_id: number | string): Promise<Card[]> {
    const { data } = await supabase
        .from("deck_cards")
        .select(`
        num_cards,
        cards (
            card_id,
            name,
            descr,    
            attack,
            defence,
            level,
            attribute,
            archetype,
            frametype,
            race,
            type,
            image_url,
            cropped_image_url
        )`
        )
        .eq("deck_id", deck_id)

    let r: Card[] = []
    data?.forEach(card => {
        for (let i = 0; i < card.num_cards; i++) {
        r.push(card.cards as any)
        }
    })

    r = orderCards(r)
    return r
}


export async function fetchUserCards(user_id: string): Promise<Card[]> {
    const { data, error } = await supabase
        .from("user_cards")
        .select(` 
            total,
            cards (
                card_id,
                name,
                descr,    
                attack,
                defence,
                level,
                attribute,
                archetype,
                frametype,
                race,
                type,
                image_url,
                cropped_image_url
        )`).eq("user_id", user_id)

    if (error) { 
        console.log(error) 
    }
    
    let cards: Card[] = []
    data?.forEach(item => cards.push({num_copies: item.total, ...item.cards} as any))
    return orderCards(cards)
}

export async function fetchUserDecks(): Promise<Deck[]> {
    const session = await supabaseGetSession()
    if (!session) { return []}

    const { data } = await supabase
        .from("decks")
        .select(`
            deck_id,
            name,
            type,
            descr,
            image_url,    
            num_cards,    
            archetypes,
            attributes,
            frametypes,
            races,
            is_public,
            types,
            created_by      
        `)
        .eq("created_by", session?.user.id)
        .order("updated_at", {ascending: false})    
    return data ? data as Deck[] : []
}

export async function fetchCards(options: CardSearchOptions): Promise<Card[]> {  
    let query = supabase
        .from('cards')
        .select('*')        

    if (options.name && options.name != '') {
        query = query.ilike("name", `%${options.name}%`)
    }
    
    if (options.archetypes.length > 0) {
        const r = options.archetypes.map((item: string) => `archetype.eq.${item}`).join(',')
        query = query.or(r)
    }

    if (options.attributes.length > 0) {
        const r = options.attributes.map((item: string) => `attribute.eq.${item}`).join(',')
        query = query.or(r)
    }

    if (options.frametypes.length > 0) {
        const r = options.frametypes.map((item: string) => `frametype.eq.${item}`).join(',')
        query = query.or(r)
    }

    if (options.races.length > 0) {
        const r = options.races.map((item: string) => `race.eq.${item}`).join(',')
        query = query.or(r)
    }

    if (options.types.length > 0) {
        const r = options.types.map((item: string) => `type.eq.${item}`).join(',')
        query = query.or(r)
    }
        
    query = query.order(
        options.sortBy,
        {ascending: options.sortOrder == 'ASC', nullsFirst: false}
    )

    const {data, error} = await query
        .range(options.page * CARD_FETCH_LIMIT, ((options.page + 1) * CARD_FETCH_LIMIT) - 1)
        .overrideTypes<Card[]>()

    if (error) { 
        console.log("error while fetching cards", options, '\n', error)
    }

    return data ? data : []
}


export const fetchDecks = async (
    searchTxt: string | null,
    options: Map<any, any>, 
    page: number
): Promise<Deck[]> => {
    let query = supabase.from("decks").select(`
        users (
        name,
        images (
            image_url
        )
        ),
        deck_id,
        name,
        type,
        descr,
        image_url,    
        num_cards,    
        archetypes,
        attributes,
        frametypes,
        races,
        types,
        is_public,
        created_by    
    `)

    query = query.eq("is_public", true)  

    if (searchTxt) {
        query = query.ilike("name", `%${searchTxt}%`)
    }

    if (options.has('archetypes')) {
        options.get('archetypes').forEach(
        (value: string) => {
            query = query.contains('archetypes', [value])
        }
        )
    }

    if (options.has('attributes')) {
        options.get('attributes').forEach(
        (value: string) => {
            query = query.contains('attributes', [value])
        }
        )
    }

    if (options.has('frametypes')) {
        options.get('frametypes').forEach(
        (value: string) => {
            query = query.contains('frametypes', [value])
        }
        )
    }

    if (options.has('races')) {
        options.get('races').forEach(
        (value: string) => {        
            query = query.contains('races', [value])
        }
        )
    }

    if (options.has('types')) {
        options.get('types').forEach(
        (value: string) => {
            query = query.contains('types', [value])
        }
        )
    }

    if (options.has('deckType') && !options.get('deckType').includes("Any")) {    
        const s = options.get('deckType').map((item: string) => `type.eq.${item}`).join(',')
        if (s) {      
        query = query.or(s)
        }    
    }


    const {data, error} = await query
        .order('name', {ascending: true})
        .range(page * DECK_FETCH_LIMIT, (page * DECK_FETCH_LIMIT) + DECK_FETCH_LIMIT - 1)
        .overrideTypes<Deck[]>()

    if (error) { console.log(error) }

    data?.forEach(
        item => {      
        item.owner_name = item.users ? (item.users as any).name : null
        item.owner_image_url = item.users ? (item.users as any).images.image_url : null
        }
    )
    return data ? data as Deck[] : []
}


export async function fetchRelatedCards(archetype: string | null): Promise<Card[]> {
    const { data } = await supabase
        .from("cards")
        .select(`
        card_id,
        name,
        descr,      
        attack,
        defence,
        level,
        attribute,
        archetype,
        frametype,
        race,
        type,
        image_url,
        cropped_image_url
        `)
        .eq("archetype", archetype)
    return data ? orderCards(data as Card[]) : []
}

export async function fetchLimitedCards(date: string): Promise<LimitedCards> {
    const { data } = await supabase
        .from("limited_cards")
        .select(`
        num_cards,
        cards (
            card_id,
            name,
            descr,      
            attack,
            defence,
            level,
            attribute,
            archetype,
            frametype,
            race,
            type,
            image_url,
            cropped_image_url
        )`
        )
        .eq("date", date)

        const r: LimitedCards = {
        forbidden: [],
        limitedOne: [],
        limitedTwo: []
    }
    data?.forEach(
        item => {
        switch (item.num_cards) {
            case 0:
            r.forbidden.push(item.cards as any)
            break
            case 1:
            r.limitedOne.push(item.cards as any)
            break
            case 2:
            r.limitedTwo.push(item.cards as any)
            break
        }
        }
    )
    r.forbidden = orderCards(r.forbidden)
    r.limitedOne = orderCards(r.limitedOne)
    r.limitedTwo = orderCards(r.limitedTwo)
    return r
    }

    export async function fetchLimitedCardsDates(): Promise<string[]> {
    const { data, error } = await supabase.rpc('get_distinct_dates')
    return data ? data.map((c: {distinct_date: string}) => c['distinct_date']) : []
}

export async function fetchCardsFromDeck(deck_id: number): Promise<Card[]> {
    const { data } = await supabase
        .from("deck_cards")
        .select(`
        num_cards,
        cards (
        card_id,
        name,
        descr,      
        attack,
        defence,
        level,
        attribute,
        archetype,
        frametype,
        race,
        type,
        image_url,
        cropped_image_url
        )`)
        .eq("deck_id", deck_id)
        .overrideTypes<Card[]>()

    let cards: Card[] = []

    data?.forEach(item => {
    for (let i = 0; i < item.num_cards; i++) {
        cards.push(item.cards as any)
    }})

    return orderCards(cards)  
    }


    async function updateDeckCopyCounter(deck_id: number): Promise<boolean> {
    const { error } = await supabase.rpc('increment_deck_copy_count', { p_deck_id: deck_id })
    if (error) {
        console.error('Erro ao incrementar copied_counter:', error);
        return false
    }
    return true
    }

    export async function supaAddDeckToCollection(deck_id: number): Promise<boolean> {
    const session = await supabaseGetSession()
    if (!session) { return false }  

    const { data: d1, error: e1 } = await supabase.rpc('copy_deck', {
        original_deck_id: deck_id,
        new_owner: session.user.id
    });

    if (e1) {
        console.log(e1)
        return false
    }

    const newDeckId = d1[0].deck_id;
        
    const { error } = await supabase.rpc('copy_deck_cards', {
        source_deck_id: deck_id,
        target_deck_id: newDeckId
    });

    if (error) {
        console.log(error)
        return false
    }

    await updateDeckCopyCounter(deck_id)
    return true
}


export async function supaRmvDeckFromCollection(deck_id: number) {
    const session = await supabaseGetSession()  
    if (!session) { return false }

    const { error } = await supabase
        .from("decks")
        .delete()
        .match({ deck_id: deck_id, owner: session.user.id });

    if (error) {
        console.error('Erro ao deletar deck:', error);
        return false;
    }

    return true;
}


export async function supabaseUpdateDeckCoverImage(deck_id: number, image_url: string): Promise<{error: PostgrestError | null}> {
    const { error } = await supabase
        .from("decks")
        .update({image_url: image_url})
        .eq("deck_id", deck_id)  
    return { error }
}

export async function fetchDeckComments(deck_id: number, user_id: string | null): Promise<DeckComment[]> {
    const { data, error } = await supabase.rpc('get_deck_comments_with_votes', {
        p_deck_id: deck_id,
        p_user_id: user_id
    });

    if (error) {
        console.log(error)
        return []
    }

    return data
}


export async function voteDeckComment(comment_id: number, user_id: string, vote_delta: 1 | -1 | 0): Promise<boolean> {
    const { error } = await supabase.rpc('update_comment_vote', {
        p_comment_id: comment_id,
        p_user_id: user_id,
        p_vote_delta: vote_delta
    });

    if (error) {
        console.log(error)
        return false
    }
    return true
}


export async function deleteDeckCommentVote(comment_id: number, user_id: string): Promise<boolean> {
    const { error } = await supabase
        .from("deck_comments_votes")
        .delete()
        .eq("comment_id", comment_id)
        .eq("user_id", user_id)
    if (error) {
        console.log(error)
        return false
    }
    return true
}


export async function replyToDeckComment(
    parent_comment_id: number, 
    deck_id: number, 
    user_id: string, 
    comment: string
): Promise<number | null> {
    const { data, error } = await supabase
    .from("deck_comments")
    .insert({parent_comment_id, user_id, comment, deck_id})
    .select("comment_id")
    .single()
    
    if (error) {
    console.log(error)
    return null
    }
    return data.comment_id
}


export async function createDeckComment(deck_id: number, comment: string): Promise<number | null> {
    const session = await supabaseGetSession()
    if (!session) {
    Toast.show({title: "Error", message: "You are not logged", type: "error"})
    return null
    }

    const { data, error } = await supabase
    .from("deck_comments")
    .insert({deck_id, comment, user_id: session.user.id})
    .select("comment_id")
    .single()

    if (error) {
    Toast.show({title: "Error", message: "Could not create your comment", type: "error"})      
    console.log(error)
    return null
    }

    return data.comment_id
}