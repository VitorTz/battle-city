import { Animated, Pressable, StyleSheet, TextInput, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import React, { useState, useRef, useCallback } from 'react'
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
    
    const rotationAnim = useRef(new Animated.Value(0)).current

    const debounceSearch = useCallback(
        debounce(onChangeValue, 400),
        []
    )
    
    const rotateIcon = () => {
        Animated.timing(rotationAnim, {
          toValue: menuOpen ? 0 : 1,  // Alterna entre 0 e 1
          duration: 600,           // Duração da animação em milissegundos
          useNativeDriver: true    // Utiliza o driver nativo para melhor performance
        }).start(() => {
            setMenuOpen(!menuOpen)
        })
      }

    const rotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })
    

    const toggle = () => {
        rotateIcon()
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
                <Animated.View style={{transform: [{rotate: rotation}]}}>
                    <Ionicons name={'arrow-up-circle'} size={24} color={Colors.white} />
                </Animated.View>
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
        borderRadius: 4, 
        color: 'white',
        fontFamily: "LeagueSpartan_400Regular",
        backgroundColor: Colors.gray
    }
})