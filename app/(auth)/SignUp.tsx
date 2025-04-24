import { SafeAreaView, StyleSheet } from 'react-native'
import SignUpForm from '@/components/form/SignUpForm'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import { router } from 'expo-router'
import React from 'react'


const SignUp = () => {  
    return (
        <SafeAreaView style={AppStyle.safeArea} >
            <TopBar 
                title='SignUp' 
                onPress={() => router.replace('/(tabs)/database')} 
                iconName='return-down-back'/>        
            <SignUpForm/>
        </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})