import { StyleSheet, Text, View, Pressable } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import React from 'react'



interface TopBarInterface {
  title: string
  onPress?: () => any
  iconName?: string
}


const TopBar = ({title, onPress, iconName}: TopBarInterface) => {
  return (
    <View style={{width: '100%', alignItems: "center", flexDirection: 'row', justifyContent: "space-between"}} >
        <Text style={[AppStyle.textRegularLarge, {fontSize: 28}]}>{title}</Text>
        <Pressable onPress={onPress} hitSlop={AppConstants.hitSlopLarge} >
            <Ionicons name={iconName as any} size={32} color={Colors.white} />
        </Pressable>
    </View>
  )
}


export default TopBar


const styles = StyleSheet.create({})