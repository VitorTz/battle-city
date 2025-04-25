import { AppUser } from "@/types/AppUser";
import { ImageDB } from "@/types/ImageDB";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, PostgrestError, Session } from '@supabase/supabase-js'
import { AppState } from "react-native";


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
    const { data, error } = await supabase
        .from("users")    
        .update({last_login_at: 'now()'})
        .eq("user_id", user_id)

    if (error) {
        console.log("error spUpdateUserLastLogin", error)
    }
}

export async function spGetUser(user_id: string): Promise<AppUser | null> {
    const { data, error } = await supabase
        .from("users")
        .select("username, image_id, images (image_url) ")
        .eq("user_id", user_id)
        .single()

    if (error) {
        console.log("error spGetUser", error)
        return null
    }

    return {
        username: data.username, 
        image: {
            image_id: data.image_id, 
            image_url: (data.images as any).image_url
        }}
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