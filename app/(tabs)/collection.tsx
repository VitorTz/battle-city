import { StyleSheet, Pressable } from 'react-native'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import TabPage from '@/components/TabPage'
import React from 'react'
import CardGrid from '@/components/CardGrid'
import { useUserCardStore } from '@/store/UserCardsStore'


const Collection = () => {

    const { cards } = useUserCardStore()
    
    const cardList = Array.from(cards.values())

    return (
        <TabPage title='Collection'>
            <CardGrid title='Cards' cards={cardList} numColumns={4}>
                <Pressable>
                    <Ionicons name='add' size={20} color={Colors.white} />
                </Pressable>
            </CardGrid>
        </TabPage>
    )
}

export default Collection

const styles = StyleSheet.create({})