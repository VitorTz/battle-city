import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { AppStyle } from '@/style/AppStyle'
import { Ionicons } from '@expo/vector-icons'
import { supabaseAddCardToUserCollection, supabaseRmvCardFromUserCollection } from '@/lib/supabase'
import { Card } from '@/types/Card'
import Toast from './Toast'
import { useUserCardStore } from '@/store/userCardState'
import { useAuthStore } from '@/store/authStore'



const AddCardToUserCollection = ({card}: {card: Card}) => {
    
    const { session } = useAuthStore()
    const { cards, addCard, deleteCard } = useUserCardStore()
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const card_id: number = parseInt(card.card_id as any)
    
    const init = () => {
        const num = cards.get(card_id)?.num_copies
        setTotal(num ? num : 0)
    }

    useEffect(
        () => { init() },
        [card]
    )

    const add = async () => {        
        if (!session) {
            Toast.show({title: "Error", message: "You are not logged!", type: "error"})
            return
        }
        setLoading(true)
        await supabaseAddCardToUserCollection(session.user.id, card.card_id)
            .then(success => {
                if (success) {
                    const newTotal = total + 1
                    const c: Card = {...card, num_copies: newTotal }
                    addCard(c)
                    setTotal(newTotal)
                }})
        setLoading(false)
    }

    const rmv = async () => {
        const num_copies = cards.get(card.card_id) ? cards.get(card.card_id)!.num_copies : 0
        if (!session) {
            Toast.show({title: "Error", message: "You are not logged!", type: "error"})
            return
        }        
        if (num_copies == 0) {
            Toast.show({title: "Warning", message: "You dont have this card in your collection", type: "info"})
            return
        }
        setLoading(true)
        await supabaseRmvCardFromUserCollection(session.user.id, card.card_id)
            .then(success => {
                if (success) {
                    if (num_copies == 1) {
                        deleteCard(card)
                    } else {
                        card.num_copies = num_copies - 1
                        deleteCard(card)
                    }
                    setTotal(num_copies - 1)
                }}
            )
        setLoading(false)
    }
  
        
    return (
        <View style={{width: '100%'}}>
            <Text style={[AppStyle.textRegularLarge, {fontSize: 24, color: Colors.cardsColor}]} >
                Copies: {total}
            </Text>            
            <View style={styles.container} >
                {
                    loading ? 
                    <ActivityIndicator size={32} color={Colors.cardsColor} /> :
                    <View style={{width: '100%', flexDirection: 'row', gap: 10}} >
                        <Pressable onPress={rmv} style={styles.button} >
                            <Ionicons name='remove-outline' size={32} color={Colors.white} />
                        </Pressable>
                        <Pressable onPress={add} style={styles.button} >
                            <Ionicons name='add-outline' size={32} color={Colors.white} />
                        </Pressable>
                    </View>
                }
            </View>
        </View>
    )
}

export default AddCardToUserCollection

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        marginTop: 10, 
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: "center", 
        height: 50,
        gap: 10
    },
    button: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center", 
        height: 50, 
        backgroundColor: Colors.cardsColor, 
        borderRadius: 4
    },
    buttonContainer: {
        flex: 1, 
        height: 50, 
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: "center"
    },
    input: {
        flex: 0.3, 
        color: Colors.white, 
        fontFamily: "LeagueSpartan_400Regular", 
        fontSize: 16, 
        paddingLeft: 10, 
        backgroundColor: Colors.background, 
        borderRadius: 4, 
        height: 50
    }
})