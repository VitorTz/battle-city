import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Page from '@/components/Page'
import { useAuthStore } from '@/store/AuthStore'
import { Image } from 'expo-image'
import { useProfileIconsStore } from '@/store/ProfileIconsStore'
import { DatabaseImage } from '@/types/DatabaseImage'
import { AppConstants } from '@/constants/AppConstants'
import { supabaseUpdateUserIcon } from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { AppStyle } from '@/style/AppStyle'
import { router } from 'expo-router'


const SIZE = 128


const ChangeProfileIconPage = () => {

    const { user, setProfileIcon } = useAuthStore()
    const { icons } = useProfileIconsStore()
    
    const [tempIcon, setTempIcon] = useState<DatabaseImage>(user!.image)
    const [loading, setLoading] = useState(false)

    const changeIcon = (image: DatabaseImage) => {
        setTempIcon(image)
    }

    const saveIcon = async () => {
        setLoading(true)
        await supabaseUpdateUserIcon(tempIcon.image_id)
            .then(success => {
                if (success) { 
                    setProfileIcon(tempIcon);
                    router.back()
            }})
        setLoading(false)
    }

    return (
        <Page title='Profile Icon' showReturnButton={true} >
            <>
            <View style={{width: '100%', alignItems: "center", justifyContent: "center", marginBottom: 20}} >
                <Image 
                    source={tempIcon.image_url} 
                    style={{width: SIZE, height: SIZE, borderRadius: SIZE}}/>
                <Pressable onPress={saveIcon} style={styles.saveButton} hitSlop={AppConstants.hitSlopLarge} >
                    {
                        loading ?
                        <ActivityIndicator size={26} color={Colors.background} /> :
                        <Ionicons name='checkmark-circle' size={26} color={Colors.background} />
                    }                    
                </Pressable>
            </View>
            <ScrollView style={{flex: 1}}>
                <View style={styles.container} >
                    {icons.map((item, index) => 
                        <Pressable onPress={() => changeIcon(item)} key={index} >
                            <Image source={item.image_url} style={{width: SIZE / 2, height: SIZE / 2, borderRadius: SIZE/ 2}} />
                        </Pressable>
                    )}
                </View>
            </ScrollView>
            </>
        </Page>
    )
}

export default ChangeProfileIconPage

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: 'row', 
        gap: 4, 
        flexWrap: 'wrap'
    },
    saveButton: {
        position: 'absolute', 
        right: 10, 
        padding: 6,
        backgroundColor: Colors.white, 
        borderRadius: 32, 
        alignItems: "center", 
        justifyContent: "center", 
        bottom: 0, 
        flexDirection: 'row', 
        gap: 10
    }
})