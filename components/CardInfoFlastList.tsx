import { StyleSheet, FlatList, Text, View } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import { Card } from '@/types/Card'
import CardInfo from './CardInfo'
import React from 'react'
import { Colors } from '@/constants/Colors'


interface CardInfoFlatListProps {
    card: Card
}


const CardInfoFlatList = ({card}: CardInfoFlatListProps) => {
    
    const data = [
        {value: card.attack, title: 'Attack'},
        {value: card.defence, title: 'Defence'},
        {value: card.level, title: 'Level'},
        {value: card.attribute, title: 'Attribute'},
        {value: card.archetype, title: 'Archetype'},
        {value: card.frametype, title: 'Frametype'},
        {value: card.race, title: 'Race'},
        {value: card.card_type, title: 'Type'}
    ]

    return (
        <View style={{gap: 10, width: '100%'}} >
            <FlatList
                data={data}
                keyExtractor={(item) => item.title}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CardInfo title={item.title} value={item.value} />}/>
            <View>
            <Text style={[AppStyle.textHeader, {color: Colors.cardsColor}]} >{card.name}</Text>
                <Text style={[AppStyle.textRegular, {fontSize: 18}]} >{card.descr}</Text>
            </View>
        </View>
    )
}

export default CardInfoFlatList

const styles = StyleSheet.create({})