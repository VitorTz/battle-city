import { StyleSheet, Text, View, Pressable } from 'react-native'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import React from 'react'
import { Colors } from '@/constants/Colors';
import Toast from './Toast';


const CopyStringButton = ({text, color = Colors.white}: { text:string, color?: string }) => {
        
    const handleShare = async () => {        
        await Clipboard.setStringAsync(text)
        Toast.show({title: "Copied!", message: '', type: 'success', duration: 1000})
    }

    return (        
        <Pressable onPress={handleShare} hitSlop={AppConstants.hitSlopLarge} >
            <Ionicons name='copy-outline' size={AppConstants.icon.size} color={color} />
        </Pressable>                    
    )
}

export default CopyStringButton

const styles = StyleSheet.create({})