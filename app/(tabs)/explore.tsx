import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import LinkList, { LinkContainerData } from '@/components/LinkList'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'


const DATA: LinkContainerData[] = [
  {
    onPress: () => router.navigate("/(pages)/Duelists"),
    color: Colors.white,
    title: "Duelists",
    imageKey: "Kaiba",
    textColor: Colors.background
  },
  {
    onPress: () => router.navigate("/(pages)/News"),
    color: Colors.white,
    title: "News",
    imageKey: "News",
    textColor: Colors.background
  },
  {
    onPress: () => router.navigate("/(pages)/Tournaments"),
    color: Colors.white,
    title: "Tournaments",
    imageKey: "MilleniumPuzzle",
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