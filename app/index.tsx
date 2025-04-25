import { 
    SafeAreaView, 
    AppState, 
    ActivityIndicator, 
    StyleSheet 
} from 'react-native'
import { supabase, spGetSession, spGetUser, spUpdateUserLastLogin } from '@/lib/supabase'
import React, { useEffect } from 'react'
import { AppStyle } from '@/style/AppStyle'
import {
    useFonts,
    LeagueSpartan_100Thin,
    LeagueSpartan_200ExtraLight,
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_900Black,
} from '@expo-google-fonts/league-spartan'
import { router } from 'expo-router'
import { useAuthStore } from '@/store/authStore'



const App = () => {

    const { login, logout } = useAuthStore()

    let [fontsLoaded] = useFonts({
        LeagueSpartan_100Thin,
        LeagueSpartan_200ExtraLight,
        LeagueSpartan_300Light,
        LeagueSpartan_400Regular,
        LeagueSpartan_500Medium,
        LeagueSpartan_600SemiBold,
        LeagueSpartan_700Bold,  
        LeagueSpartan_800ExtraBold,
        LeagueSpartan_900Black,
    })


    const init = async () => {
        const session = await spGetSession()

        if (!session) {
            console.log("no session")
            logout()
            router.replace("/(tabs)/database")
            return
        }

        
        const user = await spGetUser(session?.user.id)

        if (!user) {
            console.log("no user")
            logout()
            await supabase.auth.signOut()
            router.replace("/(tabs)/database")
            return
        }

        console.log("login")
        login(session, user)
        await spUpdateUserLastLogin(session.user.id)
        router.replace("/(tabs)/database")

    }

    useEffect(
        () => {
            if (fontsLoaded) {
                init()
            }
        }, 
        [fontsLoaded]
    )

    return (
        <SafeAreaView  style={[AppStyle.safeArea, {alignItems: "center", justifyContent: "center"}]} >
            <ActivityIndicator size={64} color={'white'}/>
        </SafeAreaView>
    )
}

export default App

const styles = StyleSheet.create({})