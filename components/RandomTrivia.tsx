import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'
import { spGetRandomTrivia } from '@/lib/supabase'


const RandomTrivia = () => {

    const [trivia, setTrivia] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const updateTrivia = async () => {
        setLoading(true)
        await spGetRandomTrivia().then(value => setTrivia(value))
        setLoading(false)
    }    

    useEffect(
        () => {
            updateTrivia()
        },
        []
    )

    return (
        <>
            {
                trivia && 
                <>
                {
                loading ?
                    <ActivityIndicator size={32} color={Colors.white} /> :
                    <Pressable onPress={updateTrivia} style={styles.container} >  
                        <Text style={[AppStyle.textRegularLarge, {color: Colors.orange}]}>Did you know?</Text>
                        <Text style={AppStyle.textRegular}>{trivia}</Text>
                    </Pressable>
                }
                </>
            }
        </>
    )

}

export default RandomTrivia

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 10,
        alignItems: "flex-start"        
    }
})