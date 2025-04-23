import { AppUser } from "@/types/AppUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, PostgrestError, Session } from '@supabase/supabase-js'


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