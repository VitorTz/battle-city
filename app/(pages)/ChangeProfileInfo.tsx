import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import ChangeProfileInfoForm from '@/components/form/ChangeProfileInfoForm'
import Line from '@/components/Line'
import TagSelector from '@/components/TagSelector'


const ChangeProfileInfo = () => {
  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 10}]} >
      <TopBar title='Profile' />
        <KeyboardAvoidingView 
          style={{flex: 1}} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <ScrollView style={{flex: 1}} >
          <View style={{gap: 20}} >
            <ChangeProfileInfoForm/>
              <Line/>
            <TagSelector/>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


export default ChangeProfileInfo

const styles = StyleSheet.create({})