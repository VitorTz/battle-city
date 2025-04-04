import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import TabPage from '@/components/TabPage'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/AuthStore'
import { AppStyle } from '@/style/AppStyle'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient';
import SignInForm from '@/components/forms/LoginForm'
import { Colors } from '@/constants/Colors'
import { hp, wp } from '@/helpers/util'


const LoggedComponent = () => {

    const { user } = useAuthStore()

    return (
        <View style={{width: '100%', gap: 20, alignItems: "center", justifyContent: "center"}} >
            <View style={{gap: 10, alignItems: "center"}} >
                <Image source={user?.image.image_url} style={{backgroundColor: Colors.gray, width: 128, height: 128, borderRadius: 128}} />
                <Text style={[AppStyle.textRegular, {fontSize: 20}]}>{user ? user.username : ''}</Text>
            </View>
        </View>
    )
}


const Profile = () => {
    
    const { session } = useAuthStore()

    return (
        <TabPage title=''>
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