import { SafeAreaView, StyleSheet, ScrollView, Text, View } from 'react-native'
import TopBar from '@/components/TopBar'
import { Image } from 'expo-image'
import { AppStyle } from '@/style/AppStyle'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useDeckState } from '@/store/deckState'
import { wp, getImageHeightCropped } from '@/helpers/util'
import { Card } from '@/types/Card'
import { spFetchDeckCards } from '@/lib/supabase'
import CardGrid from '@/components/grid/CardGrid'
import CopyDeck from '@/components/CopyDeck'

const DECK_WIDTH = wp(80)
const DECK_HEIGHT = getImageHeightCropped(DECK_WIDTH)



const Deck = () => {

    const { deck } = useDeckState()

    const [cards, setCards] = useState<Card[]>([])

    const init = async () => {
        if (cards.length == 0) {
            console.log("fetching deck cards")
            await spFetchDeckCards(deck!.deck_id)
                .then(values => setCards(values))
        }
    }

    useEffect(
        () => {
            init()
        },
        []
    )
    

    return (
        <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 0}]} >
            <TopBar title='Deck' />
            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1, gap: 20, alignItems: "center", justifyContent: "center"}} >
                    <Image source={deck!.image_url} style={styles.image} contentFit='cover' />
                    <Text style={[AppStyle.textRegularLarge, {alignSelf: "flex-start", fontSize: 28, color: Colors.orange}]}>{deck?.name}</Text>
                    {
                        deck && deck.descr &&
                        <Text style={AppStyle.textRegular}>{deck.descr}</Text>
                    }
                    <View style={{gap: 10, width: '100%'}} >
                        <CopyDeck deck_id={deck!.deck_id} />
                        <CardGrid 
                            cards={cards} 
                            title={`Cards: ${deck!.num_cards}`} 
                            numColumns={3}
                            showNumCopies={true}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Deck

const styles = StyleSheet.create({
    image: {
        width: DECK_WIDTH,
        height: DECK_HEIGHT
    }
})