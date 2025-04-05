import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Page from '@/components/Page'
import { router } from 'expo-router'
import { AppStyle } from '@/style/AppStyle'
import SignUpForm from '@/components/forms/SignUpForm'


const SignUp = () => {
  return (
    <Page 
      title='SignUp' 
      showReturnButton={true} 
      returnButtonOnPress={() => router.replace("/database")}>
      <SignUpForm/>
    </Page>
  )
}

export default SignUp

const styles = StyleSheet.create({})