import { StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from '@/constants/Colors'
import { AppStyle } from '@/style/AppStyle'
import { useState } from 'react'
import React from 'react'


const P1 = ['name', 'attack', 'defence', 'level']
const P2 = ['ASC', 'DESC']
let previosValue: string[] = ['name', 'ASC']

interface SortDropDownPickerProps {
    title: string,
    applyPicker: (
        sortBy: "name" | "attack" | "defence" | "level", 
        sortOrder: "ASC" | "DESC"
    ) => Promise<any>,
    zindex: number    
}

const SortDropDownPicker = ({
    title,
    applyPicker,    
    zindex    
}: SortDropDownPickerProps) => {
    const [open, setOpen] = useState(false);        
    const [value, setValue] = useState<string[]>(["name", "ASC"])
    const [items, setItems] = useState([        
        {label: "Sort", value: "sort"},
        {label: "name", value: "name", parent: "sort"},
        {label: "attack", value: "attack", parent: "sort"},
        {label: "defence", value: "defence", parent: "sort"},
        {label: "level", value: "level", parent: "sort"},
        
        {label: "Sort Direction", value: "sortDirection"},
        {label: "ASC", value: "ASC", parent: "sortDirection"},
        {label: "DESC", value: "DESC", parent: "sortDirection"}
    ])

    const applySort = async () => {
        const sortBy = previosValue.filter(item => P1.includes(item))[0] as any
        const sortOrder = previosValue.filter(item => P2.includes(item))[0] as any
        await applyPicker(sortBy, sortOrder)
    }
    
    
    const handlePress = async (v: any) => {
        if (v.length < 2 && previosValue.length == 2) {            
            setValue(previosValue)
            return
        }

        if (v.length == 2) { return } 
        
        const diff = v.filter((item: string) => previosValue.includes(item) == false)[0]    
        if (P1.includes(diff)) {
            previosValue = previosValue.filter(item => !P1.includes(item))
            previosValue.push(diff)            
            setValue(previosValue)
            await applySort()
        } else {
            previosValue = previosValue.filter(item => !P2.includes(item))
            previosValue.push(diff)        
            setValue(previosValue)
            await applySort()
        }
    }

    return (        
        <DropDownPicker
            zIndex={zindex}                
            open={open}
            style={{backgroundColor: Colors.gray, borderWidth: 0, borderRadius: 4}}
            disabledStyle={{opacity: 0.5}}                             
            items={items}
            setOpen={setOpen}
            theme='DARK'
            listMode={'FLATLIST'}            
            value={value}
            setValue={setValue}
            setItems={setItems}
            multiple={true}
            min={2}
            max={3}
            mode='BADGE'            
            badgeProps={{activeOpacity: 0.5}}            
            placeholder={title}
            badgeTextStyle={{color: Colors.background}}
            badgeColors={Colors.white} 
            showBadgeDot={false}           
            textStyle={AppStyle.textRegular}            
            onChangeValue={(value: any) => handlePress(value)}
            dropDownContainerStyle={{backgroundColor: Colors.gray}}/>
    );
}

export default SortDropDownPicker

const styles = StyleSheet.create({})