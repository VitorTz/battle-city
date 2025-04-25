import DialogMessage from '@/components/DialogMessage'
import { View, StatusBar } from 'react-native'
import { Colors } from '../constants/Colors'
import Toast from '@/components/Toast'
import { Stack } from 'expo-router'
import React from 'react'


const _layout = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}} >
        <StatusBar barStyle={'light-content'} backgroundColor={Colors.background} />
        <Stack>
            <Stack.Screen name='index' options={{headerShown: false}} />
            <Stack.Screen name='(tabs)' options={{headerShown: false}} />
            <Stack.Screen name='(auth)/SignIn' options={{headerShown: false}} />
            <Stack.Screen name='(auth)/SignUp' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/ChangeProfileIcon' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/ChangeProfileInfo' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/Settings' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/DeckDatabase' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/CardDatabase' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/LimitedCards' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/MatchHistory' options={{headerShown: false}} />
            <Stack.Screen name='(pages)/FindUsers' options={{headerShown: false}} />
        </Stack>
        <Toast.Component/>
        <DialogMessage.Component/>
      </View>
  )
}


export default _layout