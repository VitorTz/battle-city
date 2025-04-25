import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import React from 'react'


const Stats = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <TopBar title='Stats' showButton={false} />
    </SafeAreaView>
  )
}

export default Stats

const styles = StyleSheet.create({})