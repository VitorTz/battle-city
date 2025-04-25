import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'

const Settings = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea} >
        <TopBar title='Settings'/>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({})