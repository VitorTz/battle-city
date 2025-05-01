import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import { useDuelistState } from '@/store/duelistState'
import { Image } from 'expo-image'
import BaseUserProfileImage from '@/components/BaseUserProfileImage'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { TagUser } from '@/types/UserTag'
import { spGetUserTags } from '@/lib/supabase'
import UserTagsList from '@/components/UserTagsList'
import DuelistTagList from '@/components/DuelistTagList'
import { AppConstants } from '@/constants/AppConstants'


const DuelistPage = () => {

    const { duelist } = useDuelistState()

    return (
        <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 10, gap: 20}]} >
            <TopBar title='Duelist' />
            <View style={{alignItems: "center", gap: 10, marginTop: 20}} >
                <View>
                    {
                        duelist!.image ?
                        <Image source={duelist!.image.image_url} style={styles.image} /> :
                        <BaseUserProfileImage/>
                    }
                    <Pressable style={styles.sendButton} hitSlop={AppConstants.hitSlopLarge} >
                        <Ionicons name='send' size={24} color={Colors.white} />
                    </Pressable>
                </View>
                <Text style={AppStyle.textRegularLarge}>{duelist!.username}</Text>
                <View style={{flexDirection: 'row', gap: 4, alignItems: "center", justifyContent: "center"}} >
                    <Ionicons name='location-outline' size={20} color={Colors.white} />
                    <Text style={AppStyle.textRegular}>{duelist!.country}</Text>
                </View>
                <DuelistTagList tags={duelist ? duelist.tags : []} />
            </View>

            {
                duelist?.bio &&
                <View style={{width: '100%'}} >
                    <Text style={AppStyle.textRegular}>{duelist.bio}</Text>
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
    },
    sendButton: {
        padding: 10,
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 42,
        position: 'absolute',
        alignItems: "center",
        justifyContent: "center",
        bottom: 0,
        right: 0
    }
})