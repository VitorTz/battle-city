import { StyleSheet } from 'react-native'
import TabBar from '@/components/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'


const TabLayout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{tabBarHideOnKeyboard: true}} >
        <Tabs.Screen name="database" options={{title: "Database", headerShown: false}} />
        <Tabs.Screen name="collection" options={{title: "Collection", headerShown: false}} />
        <Tabs.Screen name="stats" options={{title: "Stats", headerShown: false}} />
        <Tabs.Screen name="news" options={{title: "News", headerShown: false}} />
        <Tabs.Screen name="profile" options={{title: "Profile", headerShown: false}} />
    </Tabs>
  )
}

export default TabLayout
