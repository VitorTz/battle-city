import DialogMessage from '@/helpers/DialogMessage'
import { View, StatusBar } from 'react-native'
import { Colors } from '../constants/Colors'
import Toast from '@/helpers/Toast'
import { Stack } from 'expo-router'
import React from 'react'


const _layout = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}} >
        <StatusBar barStyle={'light-content'} backgroundColor={Colors.background} />
        <Stack>
            <Stack.Screen name='index' options={{headerShown: false}} />
            <Stack.Screen name='(auth)/signUp' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/changeProfileIconPage' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/CardCollection' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/CardPage' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/CardDatabase' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/DeckDatabase' options={{headerShown: false}} />
            <Stack.Screen name='(tabs)' options={{headerShown: false}} />
        </Stack>
        <Toast.Component/>
        <DialogMessage.Component/>
      </View>
  )
}


export default _layout