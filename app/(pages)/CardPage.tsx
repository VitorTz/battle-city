
import { 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { useRelatedCardsState } from '@/store/RelatedCards'
import { fetchRelatedCards } from '@/lib/supabase'
import { useCardState } from '@/store/CardState'
import { getImageHeight } from '@/helpers/util'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { wp } from '@/helpers/util'
import { Card } from '@/types/Card'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import CardGrid from '@/components/CardGrid'
import ShareImage from '@/components/ShareImage'
import CopyStringButton from '@/components/CopyStringButton'
import { AppStyle } from '@/style/AppStyle'
import CardInfoFlatList from '@/components/CardInfoFlatList'
import TopBar from '@/components/TopBar'
import ReturnButton from '@/components/ReturnButton'
import AddCardToUserCollection from '@/components/AddCardToUserCollection'


const cardWidth = wp(80)
const cardHeight = getImageHeight(cardWidth)


const CardPage = () => {

    const { card } = useCardState()
    const { relatedCards, addRelatedCards } = useRelatedCardsState()
    const [sameArchetype, setSameArchetype] = useState<Card[]>([])

    const init = async () => {
        if (card?.archetype! && !relatedCards.has(card.archetype)) {
            await fetchRelatedCards(card.archetype)
                .then(values => {
                    setSameArchetype([...values])
                    addRelatedCards(card.archetype!, values)
                })
        }
    }

    useEffect(
        () => { init() },
        []
    )    


    return (
        <SafeAreaView style={AppStyle.safeArea} >
            <View style={styles.topBar} >
                <View style={{flexDirection: 'row', gap: 20}} >                        
                    <ShareImage color={Colors.cardColor} image_url={card!.image_url} />
                    <CopyStringButton color={Colors.cardColor} text={card!.name} />
                </View>
                <ReturnButton color={Colors.cardColor} />
            </View>
            <ScrollView>
                <Image source={card!.image_url} style={styles.image} contentFit='cover' />
                <View style={styles.container} >
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