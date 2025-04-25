import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import React from 'react'
import LinkList, { LinkContainerData }  from '@/components/LinkList'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { wp } from '@/helpers/util'


const DATA: LinkContainerData[] = [
  {
    onPress: () => router.navigate("/(pages)/DeckDatabase"),
    color: Colors.deckColor,
    title: "Decks",
    imageKey: "DeckMonsterView"
  },
  {
    onPress: () => router.navigate("/(pages)/CardDatabase"),
    color: Colors.cardsColor,
    title: "Cards",
    imageKey: "CardMonsterView",
    imageWidth: '80%',
    horizontalOffset: wp(-20)
  }
]


const Collection = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <TopBar title='Collection' showButton={false} />
      <View style={{flex: 1, alignItems: "center"}} >
          <LinkList data={DATA}/>
      </View>
    </SafeAreaView>
  )
}

export default Collection

const styles = StyleSheet.create({})