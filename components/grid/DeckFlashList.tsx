import { API_CARD_CROPPED_HEIGHT, API_CARD_CROPPED_WIDTH, API_CARD_HEIGHT, API_CARD_WIDTH } from '@/constants/AppConstants'
import { getItemGridDimensions } from '@/helpers/util'
import { StyleSheet, Text, View } from 'react-native'
import CustomGridFooter from './CustomGridFooter'
import { FlashList } from '@shopify/flash-list'
import { Deck } from '@/types/Deck'
import DeckItem from './DeckItem'
import React from 'react'


interface DeckFlashListProps {
    decks: Deck[]
    numColumns: number
    loading: boolean
    hasResults: boolean
    padding?: number
    gap?: number
    onEndReached?: () => void
    onDeckPress?: (deck: Deck) => void
    paddingLeft?: number
}


const DeckFlashList = ({
    decks, 
    numColumns,     
    onEndReached,
    loading,
    hasResults,
    padding = 10,
    gap = 10,
    paddingLeft = 5,
    onDeckPress    
}: DeckFlashListProps) => {
    
    const {width, height} = getItemGridDimensions(
        padding,
        gap, 
        numColumns, 
        API_CARD_CROPPED_WIDTH, 
        API_CARD_CROPPED_HEIGHT
    )
    
    return (
        <View style={{width: '100%', flex: 1}} >
            <FlashList                
                data={decks}
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
                        <DeckItem
                            onPress={onDeckPress}
                            deck={item}
                            width={width} 
                            height={height}/>
                }
            />
        </View>
    )
}

export default DeckFlashList

const styles = StyleSheet.create({})