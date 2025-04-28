import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'


interface BaseUserProfileImageProps {
    size?: number
    color?: string
}


const BaseUserProfileImage = ({size = 200, color = Colors.white}: BaseUserProfileImageProps) => {
  return (
    <Ionicons name='person-circle' size={size} color={color} />
  )
}

export default BaseUserProfileImage

const styles = StyleSheet.create({})