import { Pressable, StyleSheet, View, Text } from 'react-native'
import { Card } from '@/types/Card'
import React from 'react'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { useCardState } from '@/store/cardState'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'


interface CardItemProps {
    card: Card
    width: number
    height: number
    onPress?: (card: Card) => any
    showNumCopies?: boolean
}


const CardItem = ({
    card,
    width,
    height,
    onPress,
    showNumCopies = false
}: CardItemProps) => {

    const { setCard } = useCardState()

    const goToCardPage = () => {
        setCard(card)
        router.navigate("/(pages)/Card")
    }

    const p = onPress ? onPress : goToCardPage

    return (
        <Pressable onPress={() => p(card)} style={{marginBottom: 10}} >
            <Image source={card.image_url} style={{width, height}} />
            {
                showNumCopies &&
                <View style={styles.numCopies} >
                    <Text style={[AppStyle.textRegular, {fontSize: 10}]} >{card.num_copies}</Text>
                </View>
            }
        </Pressable>
    )
}

export default CardItem

const styles = StyleSheet.create({
    numCopies: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background,
        borderRadius: 64
    }
})