import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'

const CardCollection = () => {
  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 10}]} >
        <TopBar title='Card Collection' />
    </SafeAreaView>
  )
}

export default CardCollection

const styles = StyleSheet.create({})