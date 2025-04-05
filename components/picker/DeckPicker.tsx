import { 
    ARCHETYPES, 
    ATTRIBUTES, 
    FRAMETYPES, 
    RACES, 
    CARD_TYPES, 
    DECK_TYPES
} from '@/constants/AppConstants'
import CustomDropDownPicker from './DropDownPicker'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { DeckSearchOptions } from '@/types/DeckSearchOptions'
import { DeckType } from '@/types/Deck'


interface DeckPickerProps {
    options: DeckSearchOptions
    applyChanges: () => Promise<any>
}

const DeckPicker = ({
    options,
    applyChanges
}: DeckPickerProps) => {

    const setArchetypes = async (v: string[]) => {
        options.archetypes = v
        await applyChanges()
    }

    const setAttributes = async (v: string[]) => {
        options.attributes = v
        await applyChanges()
    }

    const setFrametypes = async (v: string[]) => {
        options.frametypes = v
        await applyChanges()
    }

    const setRaces = async (v: string[]) => {
        options.races = v
        await applyChanges()
    }

    const setTypes = async (v: string[]) => {
        options.types = v
        await applyChanges()
    }

    const setDeckType = async (v: string[]) => {
        options.deckType = v as DeckType[]
        await applyChanges()
    }    

    return (
        <View style={{width: '100%', rowGap: 10, marginBottom: 10}} >
            <View style={{width: '100%', flexDirection: 'row', gap: 10}} >
                <View style={{flex: 1}} >
                    <CustomDropDownPicker 
                        data={ARCHETYPES}
                        title='Archetype' 
                        applyPicker={setArchetypes}
                        searchable={true} 
                        allowEmptyValues={true} 
                        zindex={6}/>
                </View>
                <View style={{flex: 1}} >
                    <CustomDropDownPicker 
                        data={ATTRIBUTES}
                        title='Attribute'
                        applyPicker={setAttributes}
                        searchable={false} 
                        allowEmptyValues={true} 
                        zindex={5}/>
                </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', gap: 10}} >
                <View style={{flex: 1}} >
                    <CustomDropDownPicker 
                        data={FRAMETYPES}
                        title='Frametype' 
                        applyPicker={setFrametypes}
                        searchable={true} 
                        allowEmptyValues={true} 
                        zindex={4}/>
                </View>
                <View style={{flex: 1}} >
                    <CustomDropDownPicker 
                        data={RACES}
                        title='Race'
                        applyPicker={setRaces}
                        searchable={true} 
                        allowEmptyValues={true} 
                        zindex={3}/>
                </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', gap: 10}} >
                <View style={{flex: 1}} >
                    <CustomDropDownPicker 
                        data={CARD_TYPES}
                        title='Card Types' 
                        applyPicker={setTypes}
                        searchable={true}
                        allowEmptyValues={true} 
                        zindex={2}/>
                </View>
                <View style={{flex: 1}} >
                    <CustomDropDownPicker 
                        data={DECK_TYPES}
                        title='Deck Type' 
                        applyPicker={setDeckType}
                        searchable={true}
                        allowEmptyValues={true} 
                        zindex={2}/>
                </View>
            </View>
        </View>
    )
}

export default DeckPicker

const styles = StyleSheet.create({})