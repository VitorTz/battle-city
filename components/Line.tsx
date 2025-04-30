import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'


const Line = () => {
  return (
    <View style={styles.container} >
        <View style={styles.line} />
    </View>
  )
}

export default Line

const styles = StyleSheet.create({
    line: {
        width: '100%',
        height: 2, 
        backgroundColor: Colors.orange,
        borderRadius: 4
    },
    container: {
        width: '100%'
    }
})