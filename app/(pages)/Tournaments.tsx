import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'

const Tournaments = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea} >
        <TopBar title='Tournaments' />
    </SafeAreaView>
  )
}

export default Tournaments

const styles = StyleSheet.create({})