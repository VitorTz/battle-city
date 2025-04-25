import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'

const CardDatabase = () => {
  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 0}]} >
        <TopBar title='Card Database' />
    </SafeAreaView>
  )
}

export default CardDatabase

const styles = StyleSheet.create({})