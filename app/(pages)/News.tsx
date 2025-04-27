import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'


const News = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea} >
        <TopBar title='News' />
    </SafeAreaView>
  )
}

export default News

const styles = StyleSheet.create({})