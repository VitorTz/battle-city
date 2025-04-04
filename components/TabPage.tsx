import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from './TopBar'
import ReturnButton from './ReturnButton'


interface TabPageProps {
    title: string
    children?: React.JSX.Element
    showReturnButton?: boolean
    returnButtonColor?: string
    returnButtonOnPress?: () => void
}


const TabPage = ({
    title,
    children,
    returnButtonOnPress,
    showReturnButton = false,
    returnButtonColor = 'white'
}: TabPageProps) => {

  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 80}]} >
        <TopBar title={title}>
            <>{showReturnButton && <ReturnButton color={returnButtonColor} onPress={returnButtonOnPress} />}</>
        </TopBar>
        {children}
    </SafeAreaView>
  )
}

export default TabPage

const styles = StyleSheet.create({})