import Animated, { 
    interpolate, 
    useAnimatedStyle, 
    useSharedValue, 
    withSpring 
} from 'react-native-reanimated'
import { AppConstants } from '@/constants/AppConstants'
import { StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { icons } from '@/helpers/icons'
  
  
const TabBarButton = (props: any) => { 
    const {isFocused, label, routeName, color} = props
  
    const scale = useSharedValue(0)
  
    useEffect(
      () => {
        scale.value = withSpring(
          typeof isFocused === 'boolean' ?
            (isFocused ? 1 : 0) : isFocused,
            {duration: 500}
        )
      },
      [scale, isFocused]
    )
  
    const animatedIconStyle = useAnimatedStyle(
      () => {
  
        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1.4]
        )
        
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 10]
        ) 
  
        return {
          transform: [{scale: scaleValue}],
          top: top
        }
      }
    )
  
    const animatedTextStyle = useAnimatedStyle(
      () => {
        
        const opacity = interpolate(
            scale.value,
            [0, 1],
            [1, 0]
        ) 
  
        return {
          opacity
        }
      }
    )
  
    return (
      <Pressable {...props} style={styles.container} hitSlop={AppConstants.hitSlop} >
        <Animated.View style={animatedIconStyle} >
          <Ionicons 
            name={icons[routeName as "database" | "stats" | "news" | "collection" | "profile"] as any} 
            size={20} 
            color={color} />
        </Animated.View>
        <Animated.Text style={[styles.text, {color: color}, animatedTextStyle]}>
          {label}
        </Animated.Text>
      </Pressable>
    )
  }
  
  export default TabBarButton
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 5
    },
    text: {
      fontFamily: "LeagueSpartan_400Regular",
      fontSize: 14    
    }
  })