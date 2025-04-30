import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserCardStore } from '@/store/userCardState'
import { Colors } from '@/constants/Colors'
import { AppStyle } from '@/style/AppStyle'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'
import { router } from 'expo-router'
import { Card } from '@/types/Card'
import CardFlashList from './CardFlashList'

const CardCollectionGrid = () => {

    const { cards } = useUserCardStore()

    let total = 0
    const cardList: Card[] = []
    cards.forEach((value, key) => {total += value.num_copies; cardList.push(value)})

    return (
        <View style={styles.container} >
            <View style={styles.innerContainer} >
                <Text style={AppStyle.textRegularLarge}>Num copies: {total}</Text>
                <Pressable onPress={() => router.navigate("/(pages)/CardDatabase")} hitSlop={AppConstants.hitSlopLarge} >
                    <Ionicons name='add' size={32} color={Colors.white} />
                </Pressable>
            </View>
            <CardFlashList 
                cards={cardList} 
                hasResults={true} 
                loading={false} 
                numColumns={3} 
                gap={20}
                paddingLeft={2}
                showCardNumCopies={true}
            />
        </View>
    )

}

export default CardCollectionGrid

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 4,
        flex: 1,
        gap: 10
    },
    innerContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: Colors.cardsColor,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row'
    }
})