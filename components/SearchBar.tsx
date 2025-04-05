import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import React, { useState, useCallback } from 'react'
import { debounce } from 'lodash'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'


interface SearchBarProps {
    placeholder?: string
    toggleMenu?: () => void
    onChangeValue: (text: string) => any
}

const SearchBar = ({
    placeholder = 'search',
    onChangeValue,
    toggleMenu
}: SearchBarProps) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const debounceSearch = useCallback(
        debounce(onChangeValue, 400),
        []
    )

    const toggle = () => {
        setMenuOpen(prev => !prev)
        toggleMenu ? toggleMenu() : null
    }

    const iconName = menuOpen ? "arrow-up-circle" : "arrow-down-circle"

    return (
        <View>
            <TextInput
                style={styles.input}        
                placeholderTextColor={'white'}
                placeholder={placeholder}
                onChangeText={debounceSearch}
            />
            <Pressable
                onPress={toggle}
                style={{position: 'absolute', right: 10, top: 0, bottom: 0, justifyContent: "center"}}
                hitSlop={AppConstants.hitSlopLarge}>
                <Ionicons name={iconName} size={28} color={'white'} />
            </Pressable>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    input: {
        width: '100%', 
        height: 50, 
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4, 
        color: 'white',
        fontFamily: "LeagueSpartan_400Regular",
        backgroundColor: Colors.background
    }
})