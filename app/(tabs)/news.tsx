import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import React from 'react'
import TopBar from '@/components/TopBar'


const News = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <TopBar title='News' showButton={false} />
    </SafeAreaView>
  )
}

export default News

const styles = StyleSheet.create({})