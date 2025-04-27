import { 
    ARCHETYPES, 
    ATTRIBUTES, 
    FRAMETYPES, 
    RACES, 
    CARD_TYPES 
} from '@/constants/AppConstants'
import { CardSearchOptions } from '@/types/CardOptions'
import CustomDropDownPicker from './CustomDropDownPicker'
import { StyleSheet, View } from 'react-native'
import SortDropDownPicker from './SortPicker'
import React from 'react'


interface CardPickerProps {
    options: CardSearchOptions
    applyChanges: () => Promise<any>
}

const CardPicker = ({ options, applyChanges }: CardPickerProps) => {

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


    const setSort = async (sortBy: "name" | "attack" | "defence" | "level", sortOrder: "ASC" | "DESC") => {
        options.sortBy = sortBy
        options.sortOrder = sortOrder
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
                        title='Type' 
                        applyPicker={setTypes}
                        searchable={true}
                        allowEmptyValues={true} 
                        zindex={2}/>
                </View>
                <View style={{flex: 1}} >
                    <SortDropDownPicker
                        title='Sort'
                        applyPicker={setSort}
                        zindex={1}/>                
                </View>
            </View>
        </View>
    )
}

export default CardPicker

const styles = StyleSheet.create({})