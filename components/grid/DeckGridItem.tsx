import { StyleSheet, Pressable, View, Text } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'
import { Deck } from '@/types/Deck'
import { Image } from 'expo-image'
import React from 'react'
import { useDeckStore } from '@/store/DeckStore'
import { router } from 'expo-router'


interface DeckCardProps {
    deck: Deck
    index: number
    columns: number
    width: number
    height: number    
    onDeckPress?: (deck: Deck) => void
}


const DeckGridItem = ({
    deck, 
    index, 
    columns, 
    width, 
    height, 
    onDeckPress
}: DeckCardProps) => {

    const { setDeck } = useDeckStore()

    const onPress = onDeckPress ? onDeckPress : (deck: Deck) => {
        setDeck(deck)
        router.navigate("/DeckPage")
    }

    return (
        <Pressable onPress={() => onPress(deck)} style={[styles.button, {marginTop: index >= columns ? 10 : 0}]}>
            <Image contentFit='cover' style={{width, height}} source={deck.image_url}/>
            <View style={[styles.container, {width: width}]} >
                <Text style={[AppStyle.textRegular, {color: Colors.white}]}>{deck.name}</Text>                
                <Text style={AppStyle.textRegular}>{deck.type}</Text>
                <Text style={AppStyle.textRegular}>{deck.num_cards} cards</Text>                
            </View>
        </Pressable>
    )
}

export default DeckGridItem

const styles = StyleSheet.create({
    container: {
        padding: 10, 
        backgroundColor: Colors.gray,
        borderTopWidth: 4, 
        borderColor: Colors.background,
        gap: 6,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
    },    
    button: {
        flex: 1,
        alignItems: "center"        
    }
})