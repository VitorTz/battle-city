import { StyleSheet, Text, View } from 'react-native'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'
import React from 'react'


const CardInfo = ({title, value}: {title: string, value: any}) => {
    return (
        <>
            {
                value &&                 
                <View style={styles.container} >
                    <Text style={[AppStyle.textHeader, {color: Colors.white, fontSize: 20}]} >{title}</Text>
                    <Text style={[AppStyle.textRegular, {color: Colors.cardsColor}]} >{value}</Text>
                </View>                
            }
        </>
    )
}

export default CardInfo

const styles = StyleSheet.create({
    container: {        
        marginRight: 10        
    }
})