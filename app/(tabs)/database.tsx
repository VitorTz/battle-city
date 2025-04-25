import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import React from 'react'
import { router } from 'expo-router'
import TopBar from '@/components/TopBar'
import { Colors } from '@/constants/Colors'
import LinkList, { LinkContainerData } from '@/components/LinkList'
import { Linking } from 'react-native'
import { wp } from '@/helpers/util'
import { AppConstants } from '@/constants/AppConstants'


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
  },
  {
    onPress: () => {},
    color: Colors.packsColor,
    title: "Packs",
    imageKey: "PackMonsterView"
  },
  {
    onPress: () => router.navigate("/(pages)/LimitedCards"),
    color: Colors.limitedCardsColor,
    title: "Limited & Forbidden List",
    imageKey: "LimitedMonsterView"
  },
  {
    onPress: () => {},
    color: Colors.mediumGray,
    title: "Manga",
    imageKey: "MangaView"
  },
  {
    onPress: () => Linking.openURL(AppConstants.ygoRuleLink),
    color: Colors.neonRed,
    title: "Rules",
    imageKey: "Rule"
  }
]


const Database = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <TopBar title='Database' showButton={false} />
      <View style={{flex: 1, alignItems: "center"}} >
          <LinkList data={DATA}/>
      </View>
    </SafeAreaView>
  )
}

export default Database

const styles = StyleSheet.create({})