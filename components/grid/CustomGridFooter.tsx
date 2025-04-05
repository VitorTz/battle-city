import { ActivityIndicator, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'


interface CustomFooterProps {
    hasResults: boolean
    loading: boolean
    color?: string
}


const CustomGridFooter = ({hasResults, loading, color = Colors.white}: CustomFooterProps) => {
    const showFooter = hasResults && loading
    return (
        <>
        {
            showFooter &&
            <View style={{width: '100%', alignItems: "center", marginTop: 10}} >
                <ActivityIndicator size={32} color={color} />
            </View>
        }
        </>
    )
}


export default CustomGridFooter