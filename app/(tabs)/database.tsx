import { LinkContainerData } from '@/types/LinkContainerData'
import { StyleSheet, View } from 'react-native'
import LinkList from '@/components/LinkList'
import { Colors } from '@/constants/Colors'
import TabPage from '@/components/TabPage'
import { Linking } from 'react-native'
import { router } from 'expo-router'
import { wp } from '@/helpers/util'
import React from 'react'


const DATA: LinkContainerData[] = [
  {
    onPress: () => router.navigate("/DeckDatabase"),
    color: Colors.deckColor,
    title: "Decks",
    imageKey: "DeckMonsterView"
  },
  {
    onPress: () => router.navigate("/CardDatabase"),
    color: Colors.cardColor,
    title: "Cards",
    imageKey: "CardMonsterView",
    imageWidth: '80%',
    horizontalOffset: wp(-20)
  },
  {
    onPress: () => {},
    color: Colors.packColor,
    title: "Packs",
    imageKey: "PackMonsterView"
  },
  {
    onPress: () => router.navigate("/LimitedCardsPage"),
    color: Colors.limitedColor,
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
    onPress: () => Linking.openURL("https://www.yugioh-card.com/en/downloads/rulebook/SD_RuleBook_EN_10.pdf"),
    color: Colors.neonRed,
    title: "Rules",
    imageKey: "Rule"
  }
]

const Database = () => {


    return (
      <TabPage title='Database'>
        <View style={{flex: 1, alignItems: "center"}} >
          <LinkList data={DATA}/>
        </View>
      </TabPage>
    )
}

export default Database

const styles = StyleSheet.create({})