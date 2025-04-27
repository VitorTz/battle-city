import { Pressable, Animated } from 'react-native'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import { useRef, useState } from 'react'
import React from 'react'


interface RotatingButtonProps {
    onPress: () => any
    iconName: string
    iconColor: string
    iconSize?: number
}


const RotatingButton = ({onPress, iconName, iconColor, iconSize = 32}: RotatingButtonProps) => {
    const [state, setState] = useState(false)
    const rotationAnim = useRef(new Animated.Value(0)).current

    const rotateIcon = () => {
        onPress()
        Animated.timing(rotationAnim, {
          toValue: state ? 0 : 1,
          duration: 400,
          useNativeDriver: true
        }).start(() => {
            setState(prev => !prev)
        })
      }

    const rotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    return (
        <Pressable
            onPress={rotateIcon}
            hitSlop={AppConstants.hitSlopLarge}>
            <Animated.View style={{transform: [{rotate: rotation}]}}>
                <Ionicons name={iconName as any} size={iconSize} color={iconColor} />
            </Animated.View>
        </Pressable>
    )
}

export default RotatingButton
