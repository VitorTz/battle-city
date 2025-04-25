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
          {message && <Text style={AppStyle.textRegular} >{message}</Text>}          
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

const Profile = () => {

  const { user, session } = useAuthStore()


  useEffect(
    () => {
      if (!session) {
        router.navigate("/SignIn")
      }
    },
    [session]
  )
  

  return (
    <SafeAreaView style={AppStyle.safeArea}>
      {
        user &&
        <View style={{flex: 1, marginTop: hp(5), gap: 20}} >          
          <View style={styles.profileIconContainer} >
            <View>
              <Image source={user.image.image_url} style={styles.image} />
              <Pressable 
                  style={styles.brush}
                  onPress={() => router.navigate("/(pages)/ChangeProfileIcon")} 
                  hitSlop={AppConstants.hitSlopLarge} >
                <Ionicons name='brush-outline' size={20} color={Colors.white} />
              </Pressable>
            </View>
            <Text style={AppStyle.textRegularLarge}>{user.username}</Text>
          </View>

          <ScrollView style={{flex: 1}} >
            <View style={styles.optionsContainer} >
                <Option 
                  title='Profile' 
                  message='username, email, password...' 
                  iconName='person-circle-outline' 
                  onPress={() => router.navigate("/(pages)/ChangeProfileInfo")} />

                <Option 
                  title='Settings' 
                  message='color theme...' 
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
                  onPress={() => router.navigate("/(pages)/ChangeProfileInfo")} />
            </View>

            <RandomTrivia/>

          </ScrollView>

        </View>
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
    gap: 22,
    marginBottom: 20
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 128    
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