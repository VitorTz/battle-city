import { SafeAreaView, StyleSheet, ScrollView, Text, View } from 'react-native'
import { Image } from 'expo-image'
import React, { useState, useEffect, useCallback } from 'react'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'
import { useCardState } from '@/store/cardState'
import CardInfoFlatList from '@/components/CardInfoFlastList'
import AddCardToUserCollection from '@/components/AddCardToUserCollection'
import { Card } from '@/types/Card'
import CardGrid from '@/components/grid/CardGrid'
import { wp, getImageHeight } from '@/helpers/util'
import ReturnButton from '@/components/ReturningButton'
import ShareImage from '@/components/ShareImage'
import CopyStringButton from '@/components/CopyStringButton'
import { fetchRelatedCards } from '@/lib/supabase'
import { useRelatedCardsState } from '@/store/relatedCards'
import CardPrice from '@/components/CardPrice'


const cardWidth = wp(80)
const cardHeight = getImageHeight(cardWidth)


const CardPage = () => {

    const { card } = useCardState()
    const [sameArchetype, setSameArchetype] = useState<Card[]>([])
    const { relatedCards, addRelatedCards } = useRelatedCardsState()

    const init = async () => {
        if (
            sameArchetype.length == 0 && 
            card?.archetype! && 
            !relatedCards.has(card.archetype)
        ) {
            await fetchRelatedCards(card.archetype)
                .then(values => {
                    setSameArchetype([...values])
                    addRelatedCards(card.archetype!, values)
            })
        }
    }

    useEffect(
        useCallback(() => {
            init()
        }, []),
        []
    )

    return (
        <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 10}]} >
            <View style={styles.topBar} >
                <View style={{flexDirection: 'row', gap: 20}} >                        
                    <ShareImage color={Colors.cardsColor} image_url={card!.image_url} />
                    <CopyStringButton color={Colors.cardsColor} text={card!.name} />
                </View>
                <ReturnButton color={Colors.cardsColor} />
            </View>
            <ScrollView>
                <Image source={card!.image_url} style={styles.image} contentFit='cover' />
                <View style={styles.container} >
                    <CardPrice/>
                    <CardInfoFlatList card={card!} />
                    <AddCardToUserCollection card={card!} />
                </View>
                {
                    sameArchetype.length > 0 &&
                    <CardGrid cards={sameArchetype} title={card!.archetype!} numColumns={4} />
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default CardPage

const styles = StyleSheet.create({
    container: {
        width: '100%',        
        flex: 1,        
        gap: 10,
        marginBottom: 10
    },
    topBar: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: "space-between",
        marginBottom: 10
    },
    image: {
        alignSelf: "center", 
        width: cardWidth, 
        height: cardHeight, 
        marginVertical: 20
    }
})