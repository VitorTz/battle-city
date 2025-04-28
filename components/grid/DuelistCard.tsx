import { StyleSheet, Pressable, Text, View } from 'react-native'
import { Duelist } from '@/types/Duelist'
import { Image } from 'expo-image'
import { AppStyle } from '@/style/AppStyle'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import BaseUserProfileImage from '../BaseUserProfileImage'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { useDuelistState } from '@/store/duelistState'
import { router } from 'expo-router'


const DuelistImage = ({duelist}: {duelist: Duelist}) => {
    return (
      <View>
        {
          duelist.image ? 
          <Image source={duelist.image.image_url} style={styles.duelistProfileIcon} /> :
          <BaseUserProfileImage size={128} />
        }
      </View>
    )
  }
  
  const DuelistCard = ({duelist}: {duelist: Duelist}) => {
  
    const { setDuelist } = useDuelistState()

    const onPress = () => {
        setDuelist(duelist)
        router.navigate("/DuelistPage")
    }

    return (
      <Pressable onPress={onPress} style={styles.duelistContainer} >
        <DuelistImage duelist={duelist} />
        <View style={{flex: 1}}>
            <Text numberOfLines={1} style={AppStyle.textRegularLarge}>{duelist.username}</Text>
            <Text style={AppStyle.textRegular}>{duelist.country}</Text>          
        </View>
        <Pressable style={styles.sendButton} hitSlop={AppConstants.hitSlopLarge} >
            <Ionicons name='send' size={22} color={Colors.white} />
        </Pressable>
      </Pressable>
    )
  }

export default DuelistCard

const styles = StyleSheet.create({
    duelistProfileIcon: {
        width: 96,
        height: 96,
        borderRadius: 4
      },
      duelistContainer: {
        flexDirection: 'row', 
        gap: 20,
        borderRadius: 4,
        padding: 12,
        backgroundColor: Colors.gray,
        marginBottom: 10
      },
      sendButton: {
        position: 'absolute', 
        right: 16, 
        bottom: 16
      }
})