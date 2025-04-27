import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useCardPriceState } from '@/store/cardPricesStore'
import { Prices } from '@/types/Prices'
import { useCardState } from '@/store/cardState'
import { spFetchCardPrices } from '@/lib/supabase'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'
import { FlatList } from 'react-native'
import CardInfo from './CardInfo'




const CardPrice = () => {

    const { card } = useCardState()
    const { cardPrices, addPrice } = useCardPriceState()
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState<Prices | null>(null)

    const init = async () => {
        if (card && !cardPrices.has(card.card_id)) {
            setLoading(true)
            await spFetchCardPrices(card.card_id)
                .then(price => {
                    if (price) {
                        addPrice(card.card_id, price)
                    }
                    setPrice(price)
                })
            setLoading(false)
        } else {
            const p = cardPrices.get(card?.card_id as any)
            if (p) { setPrice(p) }
        }
    }

    const PRICES = price ? [
        {name: "Amazon", price: `US$${price.amazon}`},
        {name: "Card Market", price: `US$${price.card_market}`},
        {name: "Ebay", price: `US$${price.ebay}`},
        {name: "Tcg Player", price: `US$${price.tcg_player}`}
    ]: []

    useEffect(
        useCallback(() => {
            init()
        }, [card]),
        [card]
    )

    console.log(card?.card_id)
    
    return (
        <View style={{width: '100%'}} >
            {
                price &&
                <>
                    <FlatList
                        data={PRICES}
                        keyExtractor={(item) => item.name}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => <CardInfo title={item.name} value={item.price} />}/>
                </>
            }
        </View>
    )

}

export default CardPrice

const styles = StyleSheet.create({})