import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import DropDownPicker from 'react-native-dropdown-picker'
import { wp } from '@/helpers/util'
import { Ionicons } from '@expo/vector-icons'
import { AppStyle } from '@/style/AppStyle'
import CustomDropDownPicker from './CustomDropDownPicker'
import { AppConstants, COUNTRIES } from '@/constants/AppConstants'


interface CountryPickerProps {
    setCountry: React.Dispatch<React.SetStateAction<string | null>>
    backgroundColor?: string
    allowAnyCountry?: boolean
}


const CountryPicker = ({setCountry, backgroundColor = Colors.gray1, allowAnyCountry = false}: CountryPickerProps) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>()
    const [items, setItems] = useState(
        allowAnyCountry ? [...['Any'], ...COUNTRIES].map((v) => {return {label: v, value: v}}) : COUNTRIES.map((v) => {return {label: v, value: v}})
    )

    const handlePress = (value: string) => {
        setCountry(value)
    }

    return (
        <DropDownPicker
            open={open}
            style={{backgroundColor, borderWidth: 0, borderRadius: 4}}
            disabledStyle={{opacity: 0.5}}                             
            items={items}
            setOpen={setOpen}
            theme='DARK'
            listMode={'MODAL'}
            modalContentContainerStyle={{backgroundColor: Colors.background, padding: wp(5)}}
            modalAnimationType='slide'
            searchable={true}
            value={value}
            setValue={setValue}
            setItems={setItems}
            multiple={false}
            mode='BADGE'
            badgeProps={{activeOpacity: 0.5}}            
            placeholder={'Country'}
            badgeTextStyle={{color: Colors.background}}
            badgeColors={Colors.white} 
            showBadgeDot={false}            
            searchPlaceholderTextColor={Colors.white}
            searchPlaceholder={'search'}            
            CloseIconComponent={() => <Ionicons name='close-circle-outline' size={32} color={Colors.white} />}
            textStyle={AppStyle.textRegular}
            max={1}
            onChangeValue={(value: any) => handlePress(value)}
            dropDownContainerStyle={{backgroundColor: Colors.gray}}/>
    )
}

export default CountryPicker

const styles = StyleSheet.create({})