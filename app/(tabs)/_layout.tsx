import { StatusBar, View } from 'react-native'
import TabBar from '@/components/tab/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { Colors } from '@/constants/Colors'


const TabLayout = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}} >
      <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{tabBarHideOnKeyboard: true}} >
          <Tabs.Screen name="database" options={{title: "Database", headerShown: false}} />
          <Tabs.Screen name="collection" options={{title: "Collection", headerShown: false}} />
          <Tabs.Screen name="stats" options={{title: "Stats", headerShown: false}} />
          <Tabs.Screen name="news" options={{title: "News", headerShown: false}} />
          <Tabs.Screen name="explore" options={{title: "Explore", headerShown: false}} />
          <Tabs.Screen name="profile" options={{title: "Profile", headerShown: false}} />
      </Tabs>
    </View>
  )
}

export default TabLayout
