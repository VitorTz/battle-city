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
import DuelistTagList from '../DuelistTagList'


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

    console.log(duelist.tags)
    return (
      <Pressable onPress={onPress} style={styles.duelistContainer} >
        <View style={{flexDirection: 'row', width: '100%', gap: 20}} >
          <View style={{alignItems: "center", justifyContent: "center"}} >
            <DuelistImage duelist={duelist} />
          </View>
          <View style={{flex: 1, gap: 10}}>
              <Text numberOfLines={1} style={AppStyle.textRegularLarge}>{duelist.username}</Text>
              <Text style={AppStyle.textRegular}>{duelist.country}</Text>          
          </View>
        </View>
        {
          duelist.tags.length > 0 &&
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}} >
            {
              duelist.tags.map((item, index) => 
                <View key={index} style={styles.tag} >
                  <Text style={AppStyle.textRegular}>{item.name}</Text>
                </View> 
              )
            }
          </View>
        }
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
      },
      tag: {
        backgroundColor: Colors.background,
        padding: 10,
        borderRadius: 4
      }
})