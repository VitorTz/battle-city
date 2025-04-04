import { 
    ActivityIndicator, 
    SafeAreaView, 
    StyleSheet 
} from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../constants/Colors'
import { 
    fetchUserCards,
    supabaseGetProfileIcons, 
    supabaseGetSession, 
    supabaseGetUser 
} from "../lib/supabase";
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
} from '@expo-google-fonts/league-spartan';
import { router } from 'expo-router';
import { AppStyle } from '@/style/AppStyle';
import { useAuthStore } from '@/store/AuthStore';
import { useUserCardStore } from '@/store/UserCardsStore';
import { useProfileIconsStore } from '@/store/ProfileIconsStore';


const index = () => {
  
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
  });

  const { login, logout } = useAuthStore()
  const { setCards } = useUserCardStore()
  const { icons, setIcons } = useProfileIconsStore()

  const initPage = async () => {
    
    const session = await supabaseGetSession()

    if (icons.length == 0) {
        await supabaseGetProfileIcons()
            .then(icons => setIcons(icons))
    }


    if (session) {
        await supabaseGetUser(session.user.id)
            .then(user => { if (user) { login(session, user) } })
        await fetchUserCards(session.user.id)
            .then(cards => setCards(cards))
        router.replace("/(tabs)/database")
    } else {
        logout()
        setCards([])
        router.replace("/(auth)/login")
    }    

  }

  useEffect(
    () => {
      if (fontsLoaded) { initPage() }
    },
    [fontsLoaded]
  )

  return (
    <SafeAreaView style={[AppStyle.safeArea, {alignItems: "center", justifyContent: "center"}]}>
      <ActivityIndicator size={64} color={Colors.orange}/>
    </SafeAreaView>    
  )
}

export default index;

const styles = StyleSheet.create({})