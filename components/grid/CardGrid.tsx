import { StyleSheet, Text, View } from 'react-native'
import { getItemGridDimensions, hp } from '@/helpers/util'
import {FlashList} from '@shopify/flash-list'
import { Card } from '@/types/Card'
import React from 'react'
import { API_CARD_HEIGHT, API_CARD_WIDTH } from '@/constants/AppConstants';
import CardItem from './CardItem';
import { Colors } from '@/constants/Colors';
import { AppStyle } from '@/style/AppStyle';



interface CardGridProps {
    title: string
    height?: number | string
    cards: Card[]
    numColumns?: number,
    color?: string,
    children?: React.JSX.Element
}


const CardGrid = ({
    title,
    cards, 
    height = hp(50),
    numColumns = 2,
    color = Colors.cardsColor,
    children
}: CardGridProps) => {

    const {width: cardWidth, height: cardHeight} = getItemGridDimensions(
        10,
        20,
        numColumns,
        API_CARD_WIDTH,
        API_CARD_HEIGHT
    )

    return (
        <View style={[styles.container, {height: height as any, borderColor: color, }]} >
            <View style={[styles.header, {backgroundColor: color}]} >
                <Text style={[AppStyle.textRegular, {fontSize: 18}]}>{title}</Text>
                {children}
            </View>
            <FlashList
                contentContainerStyle={{paddingLeft: 5}}
                nestedScrollEnabled={true}
                data={cards}
                numColumns={numColumns}
                estimatedItemSize={cardHeight * 2}
                keyExtractor={(item) => item.card_id.toString()}
                drawDistance={hp(100)}
                renderItem={({item}) => <CardItem  card={item} width={cardWidth} height={cardHeight} />}
            />
        </View>
    )
}

export default CardGrid

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1, 
        borderRadius: 6,
        borderCurve: 'continuous'
    },
    header: {
        width: '100%', 
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderTopLeftRadius: 4, 
        borderTopRightRadius: 4, 
        marginBottom: 10, 
        paddingHorizontal: 10
    }
})