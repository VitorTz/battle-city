import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import React from 'react'
import LinkList, { LinkContainerData } from '@/components/LinkList'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { wp } from '@/helpers/util'


const DATA: LinkContainerData[] = [
  {
    onPress: () => router.navigate("/(pages)/MatchHistory"),
    color: Colors.purple,
    title: "Match History",
    imageKey: "MatchHistoryMonsterView"
  },
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
  },
]


const Stats = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <TopBar title='Stats' showButton={false} />
      <View style={{flex: 1, alignItems: "center"}} >
          <LinkList data={DATA}/>
      </View>
    </SafeAreaView>
  )
}

export default Stats

const styles = StyleSheet.create({})