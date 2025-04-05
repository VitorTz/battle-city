import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from '@/types/Card'
import { useCardState } from '@/store/CardState'
import { router } from 'expo-router'
import { Image } from 'expo-image'

interface CardItemProps {
    card: Card
    width: number
    height: number
    onPress?: (card: Card) => any
}

const CardItem = ({
    card,
    width,
    height,
    onPress
}: CardItemProps) => {

    const { setCard } = useCardState()

    const goToCardPage = () => {
        setCard(card)
        router.navigate("/(pages)/CardPage")
    }

    const p = onPress ? onPress : goToCardPage

    return (
        <Pressable onPress={() => p(card)} style={{marginBottom: 10}} >
            <Image source={card.image_url} style={{width, height}} />
        </Pressable>
    )
}

export default CardItem

const styles = StyleSheet.create({})