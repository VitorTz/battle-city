import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Page from '@/components/Page'
import { router } from 'expo-router'
import { AppStyle } from '@/style/AppStyle'

const SignUp = () => {
  return (
    <Page title='Login' showReturnButton={true} returnButtonOnPress={() => router.replace("/database")} >
      <View>
        <Text style={AppStyle.textRegularLarge}>131s2</Text>
      </View>
    </Page>
  )
}

export default SignUp

const styles = StyleSheet.create({})