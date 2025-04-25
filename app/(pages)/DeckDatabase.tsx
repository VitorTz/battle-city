import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'

const DeckDatabase = () => {
  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 0}]} >
        <TopBar title='Deck Database'/>
    </SafeAreaView>
  )
}

export default DeckDatabase

const styles = StyleSheet.create({})