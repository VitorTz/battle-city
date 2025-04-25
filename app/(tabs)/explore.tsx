import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import LinkList, { LinkContainerData } from '@/components/LinkList'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'


const DATA: LinkContainerData[] = [
  {
    onPress: () => router.navigate("/(pages)/FindUsers"),
    color: Colors.white,
    title: "Duelists",
    imageKey: "Kaiba",
    textColor: Colors.background
  },
  
]


const Explore = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea} >
        <TopBar title='Explore' showButton={false} />
        <View style={{flex: 1, alignItems: "center"}} >
          <LinkList data={DATA}/>
        </View>
    </SafeAreaView>
  )
}

export default Explore

const styles = StyleSheet.create({})