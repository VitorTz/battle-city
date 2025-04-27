import { API_CARD_HEIGHT, API_CARD_WIDTH } from '@/constants/AppConstants'
import { getItemGridDimensions } from '@/helpers/util'
import { StyleSheet, Text, View } from 'react-native'
import CustomGridFooter from './CustomGridFooter'
import { FlashList } from '@shopify/flash-list'
import { Card } from '@/types/Card'
import CardItem from './CardItem'
import React from 'react'


interface CardFlashListProps {
    cards: any[]
    numColumns: number
    loading: boolean
    hasResults: boolean
    padding?: number
    gap?: number
    onEndReached?: () => void
    onCardPress?: (card: Card) => void
}


const CardFlashList = ({
    cards, 
    numColumns,     
    onEndReached,
    loading,
    hasResults,
    padding = 10,
    gap = 10,
    onCardPress
}: CardFlashListProps) => {
    
    const {width, height} = getItemGridDimensions(
        padding,
        gap, 
        numColumns, 
        API_CARD_WIDTH, 
        API_CARD_HEIGHT
    )
    
    return (
        <View style={{width: '100%', flex: 1, paddingLeft: 5}} >
            <FlashList                
                data={cards}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps={"handled"}
                numColumns={numColumns}
                keyExtractor={(card, index) => index.toString()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}                
                estimatedItemSize={height}
                ListFooterComponent={<CustomGridFooter loading={loading} hasResults={hasResults}/>}
                renderItem={
                    ({ item }) => 
                        <CardItem 
                            onPress={onCardPress}
                            card={item}                         
                            width={width} 
                            height={height}/>
                }
            />
        </View>
    )
}

export default CardFlashList

const styles = StyleSheet.create({})