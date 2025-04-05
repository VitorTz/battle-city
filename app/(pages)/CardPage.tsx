import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Page from '@/components/Page'
import { useCardState } from '@/store/CardState'

const CardPage = () => {

    const { card } = useCardState()

    return (
        <Page title={card!.name} showReturnButton={true}>
            
        </Page>
    )
}

export default CardPage

const styles = StyleSheet.create({})