import { StyleSheet, Text, View, Pressable } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { router } from 'expo-router'



interface TopBarInterface {
  title: string
  onPress?: () => any
  iconName?: string
  showButton?: boolean
}


const TopBar = ({title, showButton = true, onPress = () => router.back(), iconName = 'return-down-back'}: TopBarInterface) => {
  return (
    <View style={{width: '100%', alignItems: "center", flexDirection: 'row', justifyContent: "space-between"}} >
        <Text style={[AppStyle.textRegularLarge, {fontSize: 28}]}>{title}</Text>
        {
          showButton &&
          <Pressable onPress={onPress} hitSlop={AppConstants.hitSlopLarge} >
              <Ionicons name={iconName as any} size={32} color={Colors.white} />
          </Pressable>
        }
    </View>
  )
}

export default TopBar


const styles = StyleSheet.create({})