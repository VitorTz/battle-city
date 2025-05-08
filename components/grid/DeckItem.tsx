import { Pressable, StyleSheet, View, Text } from 'react-native'
import { useDeckState } from '@/store/deckState'
import { router } from 'expo-router'
import { Deck } from '@/types/Deck'
import { Image } from 'expo-image'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'


interface DeckItemProps {
    deck: Deck
    width: number
    height: number
    onPress?: (deck: Deck) => any    
}


const DeckItem = ({
    deck,
    width,
    height,
    onPress    
}: DeckItemProps) => {

    const { setDeck } = useDeckState()

    const goToDeckPage = () => {
        setDeck(deck)
        router.navigate("/(pages)/Deck")
    }

    const p = onPress ? onPress : goToDeckPage

    return (
        <Pressable onPress={() => p(deck)} style={{marginBottom: 10}} >
            <Image source={deck.image_url} style={{width, height}} />
            <View style={{width: '95%', height: 2, backgroundColor: Colors.orange}} />
            <View style={{padding: 8}} >
                <Text style={[AppStyle.textRegular, {fontSize: 18}]}>{deck.name}</Text>
            </View>
        </Pressable>
    )
}

export default DeckItem

const styles = StyleSheet.create({
    
})