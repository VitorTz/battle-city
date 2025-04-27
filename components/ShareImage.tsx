import { StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';
import { downloadImage } from '@/helpers/util'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'


interface ShareImageProps {
    image_url: string
    color?: string
}

const ShareImage = ({image_url, color = Colors.orange}: ShareImageProps) => {

    const [isLoading, setIsLoading] = useState(false)    

    const handleShare = async () => {
        setIsLoading(true)
        const {success, status, path}  = await downloadImage("ygotempimage.jpg", image_url)
        setIsLoading(false)
        if (success) {
            await Sharing.shareAsync(path)
            await FileSystem.deleteAsync(path)
        }
    }

    return (
        <Pressable onPress={handleShare} hitSlop={AppConstants.hitSlopLarge} >
            {
                isLoading ?
                <ActivityIndicator size={AppConstants.icon.size} color={color} /> :
                <Ionicons name='share-social-outline' size={AppConstants.icon.size} color={color} />
            }
        </Pressable>
    )
}

export default ShareImage

const styles = StyleSheet.create({})