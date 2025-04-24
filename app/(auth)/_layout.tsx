import { View, StatusBar } from 'react-native'
import { Colors } from '@/constants/Colors'
import { Stack } from 'expo-router'
import React from 'react'


const _layout = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}} >
      <Stack>
          <Stack.Screen name='SignIn' options={{headerShown: false}} />
          <Stack.Screen name='SignUp' options={{headerShown: false}} />
      </Stack>
    </View>
  )
}


export default _layout