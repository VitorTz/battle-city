import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppStyle } from '@/style/AppStyle'
import { useProfileIconsState } from '@/store/profileIcons'
import { spChangeUserProfileIcon, spGetProfileIcons } from '@/lib/supabase'
import { Colors } from '@/constants/Colors'
import TopBar from '@/components/TopBar'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useAuthStore } from '@/store/authStore'
import { ImageDB } from '@/types/ImageDB'
import Toast from '@/components/Toast'
import { PostgrestError } from '@supabase/supabase-js'


const ChangeProfileIcon = () => {

    const { user, session, setProfileIcon } = useAuthStore()
    const { icons, setIcons } = useProfileIconsState()
    const [currentImage, setCurrentImage] = useState<ImageDB | null | undefined>(user?.image)
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(false)

    const init = async () => {
        if (icons.length == 0) {
            setLoading(true)
            await spGetProfileIcons().then(values => setIcons(values))
            setLoading(false)
        }
    }

    useEffect(
        useCallback(() => {
            init()
        }, []),
        []
    )

    const changeCurrentImage = (image: ImageDB) => {
        setCurrentImage(image)
    }

    const saveChanges = async () => {
        if (!session) {
            Toast.show({title: "Error", message: "You are not logged!", type: "error"})
            return
        }
        setSaving(true)
        const error: PostgrestError | null = await spChangeUserProfileIcon(currentImage!, session.user.id )
        setSaving(false)

        if (error) {
            Toast.show({title: "Error", message: error.message, type: "error"})
        } else {
            Toast.show({title: "Success!", message: '', type: 'success'})
            setProfileIcon(currentImage!)
        }
    }

    return (
        <SafeAreaView style={AppStyle.safeArea} >
            <TopBar 
                title='Profile Icon' 
                onPress={() => router.back()} 
                iconName='return-down-back'/>
            {
                loading ?
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} >
                    <ActivityIndicator size={32} color={Colors.white} />
                </View>
                :
                <View style={{flex: 1, marginTop: 20}} >
                    {
                        currentImage &&
                        <View style={{width: '100%', alignItems: "center", justifyContent: "center"}} >
                            <Image source={currentImage.image_url} style={styles.currentIconImage} />
                            <Pressable onPress={saveChanges} style={styles.button} >
                                {
                                    saving ?
                                    <ActivityIndicator size={20} color={Colors.background} />
                                    :
                                    <Text style={[AppStyle.textRegular, {color: Colors.background}]}>Change</Text>
                                }
                            </Pressable>
                        </View>
                    }
                    <ScrollView style={{flex: 1}} >
                        <View style={styles.grid} >
                            {
                                icons.map((value, index) => 
                                    <Pressable onPress={() => changeCurrentImage(value)} key={index} >
                                        <Image source={value.image_url} style={styles.iconImage} />
                                    </Pressable>
                                )
                            }
                        </View>
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
    )
}


export default ChangeProfileIcon

const styles = StyleSheet.create({
    iconImage: {
        width: 48,
        height: 48,
        borderRadius: 48
    },
    currentIconImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    grid: {
        marginTop: 20,
        width: '100%', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 64,
        height: 42,
        backgroundColor: Colors.white,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    }
})