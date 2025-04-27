import { StyleSheet, Pressable, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'
import { Colors } from '@/constants/Colors'
import { debounce } from 'lodash'
import React, { useCallback } from 'react'


interface SearchInputProps {
    onChangeValue: (s: string) => any
    placeholder?: string
    placeholderTextColor?: string
}

const SearchInput = ({onChangeValue, placeholderTextColor, placeholder}: SearchInputProps) => {

    const debounceSearch = useCallback(
        debounce(onChangeValue, 400),
        []
    )
    
    return (
        <TextInput
            style={styles.input}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            onChangeText={debounceSearch}
        />
    )

}

export default SearchInput

const styles = StyleSheet.create({
    input: {
        width: '100%', 
        height: 50, 
        borderRadius: 4, 
        backgroundColor: Colors.gray,
        paddingHorizontal: 10,
        paddingRight: 52,
        color: Colors.white,
        fontSize: 18,
        fontFamily: "LeagueSpartan_400Regular"
    }
})