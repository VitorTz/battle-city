import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Page from '@/components/Page'
import { router } from 'expo-router'
import { AppStyle } from '@/style/AppStyle'

const Login = () => {
  return (
    <Page title='Login' showReturnButton={true} returnButtonOnPress={() => router.replace("/database")} >
      <View>
        <Text style={AppStyle.textRegularLarge}>131s2</Text>
      </View>
    </Page>
  )
}

export default Login

const styles = StyleSheet.create({})