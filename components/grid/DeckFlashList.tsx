import {
    API_CARD_CROPPED_WIDTH, 
    API_CARD_CROPPED_HEIGHT 
} from '@/constants/AppConstants'
import { getItemGridDimensions } from '@/helpers/util'
import { MasonryFlashList } from '@shopify/flash-list'
import CustomGridFooter from './CustomGridFooter'
import { StyleSheet, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import DeckGridItem from './DeckGridItem'
import { Deck } from '@/types/Deck'
import React from 'react'



interface DeckFlashListProps {
    decks: Deck[]
    onEndReached?: () => void
    columns: number    
    hasResult: boolean
    loading: boolean
    padding?: number
    gap?: number
    allowEdit?: boolean
    onDeckPress?: (deck: Deck) => void
}

const DeckFlashList = ({
  decks, 
  onEndReached, 
  columns, 
  hasResult, 
  loading, 
  padding = 10, 
  gap = 10,
  onDeckPress 
}: DeckFlashListProps) => {

  const {width, height} = getItemGridDimensions(
      padding,
      gap, 
      columns, 
      API_CARD_CROPPED_WIDTH, 
      API_CARD_CROPPED_HEIGHT
  )
  
  return (        
    <View style={styles.container}>
        <MasonryFlashList          
          data={decks}          
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
          numColumns={columns}
          estimatedItemSize={80}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<CustomGridFooter color={Colors.deckColor} hasResults={hasResult} loading={loading}/>}
          renderItem={
              ({item, index}) => {
                return (
                  <DeckGridItem 
                    columns={columns} 
                    width={width} 
                    height={height} 
                    key={index} 
                    index={index} 
                    deck={item}
                    onDeckPress={onDeckPress}/>
                )
            }
          }
        />        
    </View>
  )
}

export default DeckFlashList

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    flex: 1,    
  }  
})