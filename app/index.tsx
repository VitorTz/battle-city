import { 
    SafeAreaView,
    ActivityIndicator, 
    StyleSheet 
} from 'react-native'
import { 
    supabase, 
    spGetSession, 
    spGetUser, 
    spUpdateUserLastLogin, 
    fetchUserCards,
    spGetUserTags
} from '@/lib/supabase'
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
import { useUserCardStore } from '@/store/userCardState'
import { useUserTagState } from '@/store/userTagState'



const App = () => {

    const { login, logout, setUserLoading } = useAuthStore()
    const { setUserTagMap: setUserTags } = useUserTagState()
    const { setCards } = useUserCardStore()

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

    const loginUser = async () => {
        console.log("start login attempt")
        setUserLoading(true)
        const session = await spGetSession()

        if (!session) {
            console.log("no session")
            logout()
            setUserLoading(false)
            return
        }
        
        const user = await spGetUser(session.user.id)
        console.log(user)
        if (!user) {
            console.log("no user")
            logout()
            setUserLoading(false)
            await supabase.auth.signOut()
            return
        }

        login(session, user)
        await fetchUserCards(session.user.id).then(values => setCards(values))
        await spGetUserTags(session.user.id).then(
            values => setUserTags(new Map(values.map(item => [item.tag_id, item])))
        )
        setUserLoading(false)
        spUpdateUserLastLogin(session.user.id)
        console.log("user logged")
    }

    useEffect(
        () => {
            if (fontsLoaded) {
                loginUser()
                router.replace("/(tabs)/database")
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