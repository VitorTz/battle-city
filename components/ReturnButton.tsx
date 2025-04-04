import { StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'
import { router } from 'expo-router'
import React from 'react'


interface ReturnButtonProps {
    color?: string
    onPress?: () => void
}

const ReturnButton = ({color = 'white', onPress}: ReturnButtonProps) => {

    const p = onPress ? onPress : () => router.back()
  
    return (
        <Pressable onPress={p} hitSlop={AppConstants.hitSlopLarge} >
            <Ionicons name='return-down-back-outline' size={40} color={color} />
        </Pressable>
    )
}

export default ReturnButton

const styles = StyleSheet.create({})