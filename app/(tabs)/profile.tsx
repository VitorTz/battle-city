import { Pressable, ActivityIndicator, StyleSheet, Text, View, Linking } from 'react-native'
import TabPage from '@/components/TabPage'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/AuthStore'
import { AppStyle } from '@/style/AppStyle'
import { Image } from 'expo-image'
import SignInForm from '@/components/forms/LoginForm'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import RandomTrivia from '@/components/RandomTrivia'
import { useUserCardStore } from '@/store/UserCardsStore'
import { supabase } from '@/lib/supabase'
import { AppConstants } from '@/constants/AppConstants'
import { router } from 'expo-router'


interface OptionProps {
    title: string
    subTitle?: string
    iconName: string
    onPress?: () => void
}

const Option = ({title, subTitle, iconName, onPress}: OptionProps) => {

    const [isLoading, setIsLoading] = useState(false)

    const handlePress = async () => {
        setIsLoading(true)
        onPress ? await onPress() : null
        setIsLoading(false)
    }

    return (
        <Pressable onPress={handlePress} style={{width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}} >
            <View style={{flexDirection: 'row', gap: 20, alignItems: "center", justifyContent: "center"}} >
                <Ionicons name={iconName as any} size={32} color={Colors.white} />
                <View style={{alignItems: "flex-start", justifyContent: "center"}} >
                    <Text style={[AppStyle.textHeader, {color: Colors.white, fontSize: 20}]}>{title}</Text>
                    <Text style={[AppStyle.textRegular, {fontSize: 14}]}>{subTitle}</Text>
                </View>
            </View>
            {
                isLoading ? 
                <ActivityIndicator size={32} color={Colors.white} /> :
                <Ionicons name='chevron-forward-outline' size={32} color={Colors.white} />
            }
        </Pressable>
    )
}

const ProfileIcon = () => {
    
    const { user } = useAuthStore()

    const onPress = () => {
        router.navigate("/changeProfileIconPage")
    }

    return (
        <View style={{gap: 10, alignItems: "center"}} >
            <View style={{gap: 10, alignItems: "center"}} >
                <Image 
                    source={user?.image.image_url} 
                    style={{backgroundColor: Colors.gray, width: 128, height: 128, borderRadius: 128}}/>
                <Pressable 
                    onPress={onPress}
                    style={{position: 'absolute', bottom: 0, right: 10, padding: 8, borderRadius: 32, backgroundColor: Colors.white}} 
                    hitSlop={AppConstants.hitSlopLarge} >
                    <Ionicons name='brush' color={Colors.background} size={16} />
                </Pressable>
            </View>
            <Text style={[AppStyle.textRegular, {fontSize: 20}]}>{user ? user.username : ''}</Text>
        </View>
    )
}

const LoggedComponent = () => {

    const { logout } = useAuthStore()

    const { setCards } = useUserCardStore()

    const changeProfileInfo = () => {

    }

    const openGithubPage = () => {
        Linking.openURL("https://github.com/VitorTz/battle-city")
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        logout()
        setCards([])
    }

    return (
        <View style={{width: '100%', gap: 20, alignItems: "center", justifyContent: "center"}} >
            <ProfileIcon/>
            <View style={{width: '100%', gap: 20, paddingHorizontal: 20}} >
                <Option title='Profile' subTitle='name, email, password...' iconName='person-circle-outline' onPress={changeProfileInfo} />
                <Option title='Settings' subTitle='color theme' iconName='settings-outline' onPress={() => console.log("settings")} />
                <Option title='Github' subTitle='source code' iconName='logo-github' onPress={openGithubPage} />
                <Option title='Logout' subTitle='' iconName='log-out-outline' onPress={handleLogout} />
                <RandomTrivia/>
            </View>
        </View>
    )
}


const Profile = () => {
    
    const { session } = useAuthStore()

    const pageName = session ? '' : 'Login'

    return (
        <TabPage title={pageName}>
            {
                session ?
                <LoggedComponent/> :
                <SignInForm/>
            }
        </TabPage>
    )
}

export default Profile

const styles = StyleSheet.create({})