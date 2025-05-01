import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from '@/constants/Colors';
import React, { useCallback, useEffect, useState } from 'react'
import { useTagState } from '@/store/tagState';
import { spGetTags } from '@/lib/supabase';
import { TagUser } from '@/types/UserTag';
import { AppStyle } from '@/style/AppStyle';
import { Ionicons } from '@expo/vector-icons';
import { wp } from '@/helpers/util';

const TagPicker = ({applyFilter}: {applyFilter: (tags: number[]) => any}) => {

    const { tags, setTags } = useTagState()

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number[]>([])
    const [items, setItems] = useState<{label: string, value: number}[]>([])

    const init = async () => {
        console.log("init")
        if (tags.length == 0) {
            await spGetTags().then(values => {
                setItems(values.map(i => {return {label: i.name, value: i.tag_id}}))
                setTags(values)
            })
        } else {
            setItems(tags.map(i => {return {label: i.name, value: i.tag_id}}))
        }
    }

    useEffect(
        () => {
            init()
        },
        [tags]
    )
    
    const handlePress = (a: number) => {
        applyFilter(value)
    }

    return (
        <DropDownPicker
            open={open}
            style={{backgroundColor: Colors.gray, borderWidth: 0, borderRadius: 4}}
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
            multiple={true}
            mode='BADGE'
            badgeProps={{activeOpacity: 0.5}}            
            placeholder={'Tag'}
            badgeTextStyle={{color: Colors.background}}
            badgeColors={Colors.white} 
            showBadgeDot={false}            
            searchPlaceholderTextColor={Colors.white}
            searchPlaceholder={'search'}            
            CloseIconComponent={() => <Ionicons name='close-circle-outline' size={32} color={Colors.white} />}
            textStyle={AppStyle.textRegular}
            onChangeValue={(value: any) => handlePress(value)}
            dropDownContainerStyle={{backgroundColor: Colors.gray}}/>
    )
}

export default TagPicker

const styles = StyleSheet.create({})