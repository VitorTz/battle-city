import { DECK_TYPES} from '@/constants/AppConstants'
import { Colors } from '@/constants/Colors'
import { AppStyle } from '@/style/AppStyle'
import DropDownPicker from 'react-native-dropdown-picker'
import { StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { DeckSearchOptions } from '@/types/DeckOptions'
import { Ionicons } from '@expo/vector-icons'
import { wp } from '@/helpers/util'


interface DeckPickerProps {
    options: DeckSearchOptions
    applyChanges: () => Promise<any>
}

const DeckPicker = ({ options, applyChanges }: DeckPickerProps) => {

    const setDeckType = async (v: string | null) => {
        if (!v) { return  }
        options.deckType = v
        await applyChanges()
    }

    const [open, setOpen] = useState(false);        
    const [value, setValue] = useState<string>('Structure')
    const [items, setItems] = useState(DECK_TYPES.map((v) => {return {label: v, value: v}}))    

    return (        
        <DropDownPicker
            open={open}
            style={{backgroundColor: Colors.gray, borderWidth: 0, borderRadius: 4}}
            disabledStyle={{opacity: 0.5}}                             
            items={items}
            setOpen={setOpen}
            theme='DARK'
            listMode={'FLATLIST'}
            modalContentContainerStyle={{backgroundColor: Colors.background, padding: wp(5)}}            
            modalAnimationType='slide'
            searchable={false}
            value={value}
            setValue={setValue}
            setItems={setItems}
            multiple={false}
            mode='BADGE'
            badgeProps={{activeOpacity: 0.5}}            
            placeholder={"Deck Type"}
            badgeTextStyle={{color: Colors.background}}
            badgeColors={Colors.white} 
            showBadgeDot={false}
            CloseIconComponent={() => <Ionicons name='close-circle-outline' size={32} color={Colors.white} />}
            textStyle={AppStyle.textRegular}
            min={1}
            onChangeValue={setDeckType}
            dropDownContainerStyle={{backgroundColor: Colors.gray}}/>
    );
}

export default DeckPicker

const styles = StyleSheet.create({})