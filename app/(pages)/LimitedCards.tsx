import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'

const LimitedCards = () => {
  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 0}]} >
        <TopBar title='Limited Cards' />
    </SafeAreaView>
  )
}

export default LimitedCards

const styles = StyleSheet.create({})