import { 
    SafeAreaView, 
    AppState, 
    ActivityIndicator, 
    StyleSheet 
} from 'react-native'
import { supabase, spGetSession } from '@/lib/supabase'
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


AppState.addEventListener(
    'change', (state) => {  
        if (state === 'active') {    
            supabase.auth.startAutoRefresh()  
        } else {    
            supabase.auth.stopAutoRefresh()  
        }
    }
)


const App = () => {

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

        if (session) {

        }

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