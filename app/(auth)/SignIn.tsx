import { SafeAreaView, StyleSheet } from 'react-native'
import SignInForm from '@/components/form/SignInForm'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import { router } from 'expo-router'
import React from 'react'


const SignIn = () => {  

    const signIn = () => {
        router.replace("/(tabs)/database")
    }

    return (
        <SafeAreaView style={[AppStyle.safeArea, {flex: 1}]} >
            <TopBar 
                title='SignIn' 
                onPress={() => router.replace('/(tabs)/database')} 
                iconName='return-down-back'/>        
            <SignInForm onSignIn={signIn} />
        </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})