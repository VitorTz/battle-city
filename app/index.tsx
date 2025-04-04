import { 
    ActivityIndicator, 
    SafeAreaView, 
    StyleSheet 
} from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { AppStyle } from '@/style/AppStyle'
import { 
  fetchUserCards,
  supabaseGetProfileIcons, 
  supabaseGetSession, 
  supabaseGetUser 
} from '../lib/supabase'
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
import { useAuthStore } from '@/store/AuthStore'
import { useUserCardStore } from '@/store/UserCardsStore'
import { useProfileIconsStore } from '@/store/ProfileIconsStore'


const App = () => {

    const { login, logout } = useAuthStore()
    const { setCards } = useUserCardStore()
    const { icons, setIcons } = useProfileIconsStore()

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

    const initApp = async () => {
        const session = await supabaseGetSession()

        if (icons.length === 0) {
            const iconsData = await supabaseGetProfileIcons()
            setIcons(iconsData)
        }

        if (session) {
            const user = await supabaseGetUser(session.user.id)
            if (user) {
                login(session, user)
                await fetchUserCards(session.user.id)
                    .then(cards => setCards(cards))
                router.replace("/database")
                return
            }
        } 
        logout()
        setCards([])
        router.replace("/login")
    }

    useEffect(() => {
        if (fontsLoaded) {
            initApp()
        }
    }, [fontsLoaded])

    return (
        <SafeAreaView  style={[AppStyle.safeArea, {alignItems: "center", justifyContent: "center"}]} >
            <ActivityIndicator size={64} color={'white'}/>
        </SafeAreaView>
    )


}

export default App

const styles = StyleSheet.create({})