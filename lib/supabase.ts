import { AppConstants } from "@/constants/AppConstants";
import { AppUser } from "@/types/AppUser";
import { Card } from "@/types/Card";
import { CardSearchOptions } from "@/types/CardOptions";
import { ImageDB } from "@/types/ImageDB";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { orderCards } from "@/helpers/util";
import { createClient, PostgrestError, Session } from '@supabase/supabase-js'
import { AppState } from "react-native";
import { Prices } from "@/types/Prices";
import { Duelist } from "@/types/Duelist";
import { DuelistOptions } from "@/types/DuelistOptions";
import { TagUser } from "@/types/UserTag";


const supabaseUrl = 'https://mlhjkqlgzlkvtqjngzdr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1saGprcWxnemxrdnRxam5nemRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMTAzMzcsImV4cCI6MjA1NDg4NjMzN30.0V7Ysvy4mroEq4n-4_yOFXJrfgKWhWMKdG4sc_OpL8A"


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

export async function spGetSession(): Promise<Session | null> {
    const {data: {session} } = await supabase.auth.getSession()
    return session
}

export async function spUpdateUserLastLogin(user_id: string) {
    const { error } = await supabase
        .from("users")    
        .update({last_login_at: 'now()'})
        .eq("user_id", user_id)

    if (error) {
        console.log("error spUpdateUserLastLogin", error)
    }
}

export async function spGetUserTags(user_id: string): Promise<TagUser[]> {
    const { data, error } = await supabase
        .from("user_tags")
        .select("tag_id, tags (name, descr)")
        .eq("user_id", user_id)
        
    if (error) {
        console.log("error spGetUserTags", error)
        return []
    }

    return data.map(item => {return {
        name: (item.tags as any).name,
        descr: (item.tags as any).descr,
        tag_id: item.tag_id
    }})
}


export async function spGetUser(user_id: string): Promise<AppUser | null> {
    const { data, error } = await supabase
        .from("users")
        .select("username, bio, image_id, images (image_url), tags (tag_id, name, descr) ")
        .eq("user_id", user_id)
        .single()
    
    if (error) {
        console.log("error spGetUser", error)
        return null
    }

    return {
        username: data.username,
        bio: data.bio, 
        image: data.image_id ? {
            image_id: data.image_id, 
            image_url: (data.images as any).image_url
        } : null,
        tags: data.tags
    }
}


export async function spGetProfileIcons(): Promise<ImageDB[]> {
    const { data, error } = await supabase
        .from("profile_icons")
        .select("image_id, images (image_url)")
        .overrideTypes<ImageDB[]>()

    if (error) {
        console.log("error spGetProfileIcons", error)
        return []
    }

    return data.map(
        img => {
            return {
                image_id: img.image_id, 
                image_url: (img.images as any).image_url
        }
    })
}


export async function spChangeUserProfileIcon(image: ImageDB, user_id: string): Promise<PostgrestError | null> {
    const { error } = await supabase
        .from("users")
        .update({image_id: image.image_id})
        .eq("user_id", user_id)

    if (error) {
        console.log("error spChangeUserProfileIcon", error)
        return error
    }
    return null
}


export async function spGetRandomTrivia(): Promise<string | null> {
    const { data, error } = await supabase
        .rpc("get_random_trivia_descr")
    
    if (error) {
        console.log("error spGetRandomTrivia", error)
        return null
    }

    return data
}


export async function spFetchCards(options: CardSearchOptions) {
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
        const r = options.types.map((item: string) => `card_type.eq.${item}`).join(',')
        query = query.or(r)
    }
        
    query = query.order(
        options.sortBy,
        {ascending: options.sortOrder == 'ASC', nullsFirst: false}
    )

    const {data, error} = await query
        .range(options.page * AppConstants.CARD_FETCH_LIMIT, ((options.page + 1) * AppConstants.CARD_FETCH_LIMIT) - 1)
        .overrideTypes<Card[]>()

    if (error) { 
        console.log("error while fetching cards", options, '\n', error)
    }

    return data ? data : []    
}

export async function supabaseAddCardToUserCollection(
    user_id: string,
    card_id: number, 
    total: number = 1
): Promise<boolean> {

    const { error } = await supabase.rpc('insert_user_card', {
        p_card_id: card_id,
        p_user_id: user_id,
        p_quantity: total
    })

    if (error) {
        console.log(error)
        return false
    }

    return true
}


export async function supabaseRmvCardFromUserCollection(
    user_id: string,
    card_id: number, 
    total: number = 1
): Promise<boolean> {

    const { error } = await supabase.rpc('remove_user_card', {
        p_card_id: card_id,
        p_user_id: user_id,
        p_quantity: total
    })

    if (error) {
        console.log(error)
        return false
    }

    return true
}

export async function fetchUserCards(user_id: string): Promise<Card[]> {
    const { data, error } = await supabase
        .from("user_cards")
        .select("total, cards (*)")
        .eq("user_id", user_id)

    if (error) { 
        console.log("error fetchUserCards", error)
    }
    
    let cards: Card[] = []
    data?.forEach(item => cards.push({num_copies: item.total, ...item.cards} as any))
    return orderCards(cards)
}


export async function fetchRelatedCards(archetype: string | null): Promise<Card[]> {
    const { data } = await supabase
        .from("cards")
        .select('*')
        .eq("archetype", archetype)
    return data ? orderCards(data as Card[]) : []
}


export async function spFetchCardPrices(card_id: number): Promise<Prices | null> {
    const { data, error } = await supabase
        .from("card_prices")
        .select("card_market, tcg_player, ebay, amazon")
        .eq("card_id", card_id)
        .single()
    
    if (error) {
        console.log("error spFetchCardPrices", card_id, error)
    }

    return data ? data : null
        
}


export async function spCheckIfUsernameExists(username: string): Promise<boolean> {
    const { data, error } = await supabase
        .from("users")    
        .select("username")
        .eq("username", username)
        .single()
        
    if (error) {
        return false
    }

    return true
}


export async function spFetchDuelists(
    except: string | null | undefined, 
    options: DuelistOptions
): Promise<Duelist[]> {
    let query = supabase
        .from("users")
        .select("user_id, username, bio, image_id, images (image_url), countries (country_name), tags (tag_id, name, descr)")
    
    if (except) {
        query = query.neq("user_id", except)
    }

    if (options.country) {
        const country_id: number | null = await spGetCountryId(options.country)
        if (country_id) {
            query = query.eq("country_id", country_id)
        }
    }

    if (options.name) {
        query = query.ilike("username", `%${options.name}%`)
    }
    
    const { data, error } = await query
        .range(options.page * AppConstants.USER_FETCH_LIMIT, ((options.page + 1) * AppConstants.USER_FETCH_LIMIT) - 1)
        .order("username", {ascending: true})
        .overrideTypes<Duelist[]>()

    if (error) {
        console.log("error spFetchDuelists", error)
        return []
    }

    return data.map(
        item => {return {
            username: item.username,
            user_id: item.user_id,
            image: item.image_id ? {
                image_id: item.image_id,
                image_url: (item.images as any).image_url
            } : null,
            country: (item.countries as any).country_name,
            bio: item.bio,
            tags: []
        }}
    )
}

export async function spGetCountryId(country: string): Promise<number | null> {
    const { data, error } = await supabase
        .from("countries")
        .select("country_id")
        .eq("country_name", country)
        .single()
    
    if (error) {
        console.log("error spGetCountryId", error)
        return null
    }

    return data.country_id
}


export async function spGetTags(): Promise<TagUser[]> {
    const { data, error } = await supabase
        .from("tags")
        .select("name, tag_id, descr")
        .overrideTypes<TagUser[]>()

    if (error) {
        console.log("error spGetTags", error)
        return []
    }

    return data
} 


export async function spDeleteUserTags(user_id: string): Promise<boolean> { 
    const { error } = await supabase
        .from("user_tags")
        .delete()
        .eq("user_id", user_id)

    if (error) {
        console.log("spDeleteUserTags error", error)
        return false
    }
    return true
}

export async function spUpsertUserTags(user_id: string, tags_ids: number[]): Promise<boolean> {
    const successDelete = await spDeleteUserTags(user_id)
    if (!successDelete) {
        return false
    }

    const t = tags_ids.map(tag_id => {return {user_id, tag_id}})
    const { error } = await supabase
        .from("user_tags")
        .upsert(t)
    
    if (error) {
        console.log("spUpsertUserTags error", error)
        return false
    }

    return true
}