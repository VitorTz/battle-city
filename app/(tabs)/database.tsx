import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import React from 'react'
import TopBar from '@/components/TopBar'

const Database = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <TopBar title='Database' showButton={false} />
    </SafeAreaView>
  )
}

export default Database

const styles = StyleSheet.create({})