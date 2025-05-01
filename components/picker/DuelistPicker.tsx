

import { Pressable, Text, StyleSheet, View } from 'react-native'
import SortDropDownPicker from './SortPicker'
import React from 'react'
import { DuelistOptions } from '@/types/DuelistOptions'
import CountryPicker from './CountryPicker'
import { Colors } from '@/constants/Colors'
import { AppStyle } from '@/style/AppStyle'
import TagPicker from './TagPicker'


interface DuelistPickerProps {
    options: DuelistOptions
    applyChanges: () => Promise<any>
}

const DuelistPicker = ({ options, applyChanges }: DuelistPickerProps) => {

    const setCountry = async (country: string) => {
        options.country = country
        await applyChanges()
    }

    const filterTag = async (tags_ids: number[]) => {
        options.tags = tags_ids
        await applyChanges()
    }

    return (
        <View style={{width: '100%', rowGap: 10}} >
            <TagPicker applyFilter={filterTag} />
            <CountryPicker 
                allowAnyCountry={true} 
                backgroundColor={Colors.gray} 
                setCountry={setCountry as any}/>
        </View>
    )
}

export default DuelistPicker

const styles = StyleSheet.create({
    reset: {
        width: '100%', 
        height: 50, 
        backgroundColor: Colors.orange,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4
    }
})