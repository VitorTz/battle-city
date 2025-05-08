import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'
import { AppStyle } from '@/style/AppStyle'
import { useAuthStore } from '@/store/authStore'
import Toast from './Toast'
import { spCopyDeck } from '@/lib/supabase'

interface CopyDeckProps {
    deck_id: number
}


const CopyDeck = ({deck_id}: CopyDeckProps) => {

    const { session } = useAuthStore()
    const [loading, setLoading] = useState(false)

    const onPress = async () => {
        if (!session) {
            Toast.show({title: "Error", message: "You are not logged!", type: "error"})
            return
        }
        setLoading(true)
        await spCopyDeck(deck_id, session.user.id)
        setLoading(false)
    }

  
    return (
        <Pressable onPress={onPress} style={styles.container} >
            {
                loading ?
                <ActivityIndicator size={32} color={Colors.white} /> :
                <Text style={AppStyle.textRegular}>Copy</Text>
            }
        </Pressable>
    )

}

export default CopyDeck

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: 52, 
        borderRadius: 4,
        backgroundColor: Colors.orange,
        alignItems: "center",
        justifyContent: "center"
    }
})