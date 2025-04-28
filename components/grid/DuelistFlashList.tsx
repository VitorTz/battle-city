import { StyleSheet, View } from 'react-native'
import CustomGridFooter from './CustomGridFooter'
import { FlashList } from '@shopify/flash-list'
import { Duelist } from '@/types/Duelist'
import DuelistCard from './DuelistCard'
import React from 'react'


interface CardFlashListProps {
    duelists: Duelist[]
    loading: boolean
    hasResults: boolean
    onEndReached: () => void
}


const DuelistFlashList = ({
    duelists,    
    onEndReached,
    loading,
    hasResults
}: CardFlashListProps) => {    
    
    return (
        <View style={{width: '100%', flex: 1}} >
            <FlashList                
                data={duelists}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps={"handled"}
                keyExtractor={(card, index) => index.toString()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                estimatedItemSize={200}
                ListFooterComponent={<CustomGridFooter loading={loading} hasResults={hasResults}/>}
                renderItem={({ item }) => <DuelistCard duelist={item} />}
            />
        </View>
    )
}

export default DuelistFlashList

const styles = StyleSheet.create({})