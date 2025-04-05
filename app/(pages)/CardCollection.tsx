import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Page from '@/components/Page'
import { Colors } from '@/constants/Colors'
import CardGrid from '@/components/CardGrid'
import { useUserCardStore } from '@/store/UserCardsStore'
import { hp } from '@/helpers/util'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'
import { router } from 'expo-router'

const CardCollection = () => {

    const { cards } = useUserCardStore()

    return (
        <Page title='Card Collection' showReturnButton={true} returnButtonColor={Colors.cardColor} >
            <CardGrid cards={cards} numColumns={3} title='Cards' color={Colors.cardColor} height={hp(100)} >
                <Pressable onPress={() => router.navigate("/CardDatabase")} hitSlop={AppConstants.hitSlopLarge} >
                    <Ionicons name='add' size={32} color={Colors.white} />
                </Pressable>
            </CardGrid>
        </Page>
    )
}

export default CardCollection

const styles = StyleSheet.create({})