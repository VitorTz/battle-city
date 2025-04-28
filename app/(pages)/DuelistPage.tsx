import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import { useDuelistState } from '@/store/duelistState'
import { Image } from 'expo-image'
import BaseUserProfileImage from '@/components/BaseUserProfileImage'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'


const DuelistPage = () => {

    const { duelist } = useDuelistState()

    return (
        <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 10}]} >
            <TopBar title='Duelist' />
            <View style={{alignItems: "center", gap: 10, marginTop: 20}} >
                {
                    duelist!.image ?
                    <Image source={duelist!.image.image_url} style={styles.image} /> :
                    <BaseUserProfileImage/>
                }
                <Text style={AppStyle.textRegularLarge}>{duelist!.username}</Text>
                <View style={{flexDirection: 'row', gap: 4, alignItems: "center", justifyContent: "center"}} >
                    <Ionicons name='location-outline' size={20} color={Colors.white} />
                    <Text style={AppStyle.textRegular}>{duelist!.country}</Text>
                </View>                
            </View>
            
            {
                duelist!.bio &&
                <View style={{width: '100%'}} >
                    <Text style={AppStyle.textRegularLarge}>Bio</Text>
                </View>
            }
            
        </SafeAreaView>
    )

}

export default DuelistPage

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 200
    }
})