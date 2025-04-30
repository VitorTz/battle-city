import { StyleSheet, SafeAreaView, Text, View, Pressable, ScrollView, Linking, ActivityIndicator } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Link, router } from 'expo-router'
import { hp, wp } from '@/helpers/util'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { AppConstants } from '@/constants/AppConstants'
import RandomTrivia from '@/components/RandomTrivia'
import BaseUserProfileImage from '@/components/BaseUserProfileImage'
import { useUserCardStore } from '@/store/userCardState'
import { supabase } from '@/lib/supabase'
import Toast from '@/components/Toast'
import UserTagsList from '@/components/UserTagsList'
import TopBar from '@/components/TopBar'
import { useUserTagState } from '@/store/userTagState'


interface OptionProps {
  title: string
  message?: string
  iconName: string
  onPress: () => any
}

const Option = ({title, message, iconName, onPress}: OptionProps) => {

  const [loading, setLoading] = useState(false)

  const handlePress = async () => {
    setLoading(true)
    await onPress()
    setLoading(false)
  }

  return (
    <Pressable onPress={handlePress} style={styles.optionContainer} >
      <View style={{flexDirection: 'row', alignItems: "center", gap: 20}} >
        <Ionicons name={iconName as any} size={32} color={Colors.white} />
        <View>
          <Text style={AppStyle.textRegular} >{title}</Text>
          {message && <Text numberOfLines={1} style={AppStyle.textRegular} >{message}</Text>}          
        </View>
      </View>
      {
        loading ?
          <ActivityIndicator size={32} color={Colors.white} /> :
          <Ionicons name='chevron-forward-outline' size={32} color={Colors.white} />
      }
    </Pressable>
  )
}

const LoadingProfilePage = () => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} >      
      <ActivityIndicator size={'large'} color={Colors.white} />
    </View>
  )
}



const Profile = () => {

  const { user, session, logout, userLoading } = useAuthStore()
  const { setCards } = useUserCardStore()
  const { setUserTagMap } = useUserTagState()


  useEffect(
    () => {
      if (!userLoading && !session) {
        router.replace("/SignIn")
      }
    },
    [userLoading]
  )

  const handleLogout = async () => {
    logout()
    setCards([])
    setUserTagMap(new Map())
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error handleLogout", error)
    } else {
      Toast.show({title: "Success!", message: '', type: 'success'})
    }
    router.replace("/database")
  }
  

  return (
    <SafeAreaView style={AppStyle.safeArea}>
      {
        userLoading ?
        <LoadingProfilePage/> :
        <>
        {
          user &&
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} >
              <View style={{flex: 1, marginTop: 10, gap: 20, marginBottom: 20}} >
                <View style={styles.profileIconContainer} >
                  <View>
                    {
                      user.image ?
                      <Image source={user.image.image_url} style={styles.image} /> :
                      <BaseUserProfileImage/>
                    }
                    <Pressable 
                        style={styles.brush}
                        onPress={() => router.navigate("/(pages)/ChangeProfileIcon")} 
                        hitSlop={AppConstants.hitSlopLarge} >
                      <Ionicons name='brush-outline' size={20} color={Colors.white} />
                    </Pressable>
                  </View>
                  <Text style={AppStyle.textRegularLarge}>{user.username}</Text>
                  <UserTagsList/>
                </View>
                  <View style={styles.optionsContainer} >
                      <Option 
                        title='Profile' 
                        message='username, email, password, bio...' 
                        iconName='person-circle-outline' 
                        onPress={() => router.navigate("/(pages)/ChangeProfileInfo")} />

                      <Option 
                        title='Settings' 
                        message='color theme' 
                        iconName='settings-outline' 
                        onPress={() => router.navigate("/(pages)/Settings")} />

                      <Option 
                        title='Github'
                        message='source code' 
                        iconName='logo-github' 
                        onPress={() => Linking.openURL(AppConstants.githubUrl)} />

                      <Option 
                        title='Logout'
                        iconName='log-out-outline' 
                        onPress={handleLogout} />
                  </View>

                  <RandomTrivia/>

                </View>
              </ScrollView>
        }
        </>
      }
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  profileIconContainer: {
    width: '100%', 
    gap: 10, 
    alignItems: 'center', 
    justifyContent: "center"
  },
  optionsContainer: {
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200
  },
  brush: {
    position: 'absolute',
    padding: 8,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 32,
    right: 0,
    bottom: 0
  },
  optionContainer: {
    width: '100%',
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: 'row',
  }
})