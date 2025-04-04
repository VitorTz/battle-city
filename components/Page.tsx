import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from './TopBar'
import ReturnButton from './ReturnButton'

interface PageProps {
    title: string
    children?: React.JSX.Element
    showReturnButton?: boolean
    returnButtonColor?: string
}

const Page = ({
    title,
    children,
    showReturnButton,
    returnButtonColor
}: PageProps) => {

  return (
    <SafeAreaView style={AppStyle.safeArea} >
        <TopBar title={title}>
            <>
            {showReturnButton && <ReturnButton color={returnButtonColor} />}
            </>
        </TopBar>
        {children}
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({})