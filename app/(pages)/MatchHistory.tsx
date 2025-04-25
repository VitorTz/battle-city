import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'

const MatchHistory = () => {
  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 0}]} >
        <TopBar title='Match History' />
    </SafeAreaView>
  )
}

export default MatchHistory

const styles = StyleSheet.create({})