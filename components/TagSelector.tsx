import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTagState } from '@/store/tagState'
import { spGetTags, spGetUserTags } from '@/lib/supabase'
import { TagUser } from '@/types/UserTag'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'
import { useUserTagState } from '@/store/userTagState'
import { useAuthStore } from '@/store/authStore'


const TagItem = ({tag}: {tag: TagUser}) => {
    const [selected, setSelected] = useState(false)
    
    const { addOrRemoveTag } = useUserTagState()

    const onPress = () => {
        setSelected(prev => !prev)
        addOrRemoveTag(tag.name)
    }

    return (
        <Pressable 
            onPress={onPress}
            style={{
                marginRight: 10, 
                padding: 10,
                borderRadius: 4, 
                backgroundColor: selected ? Colors.orange : Colors.background
            }} >
            <Text style={AppStyle.textRegularLarge}>{tag.name}</Text>
            <Text style={AppStyle.textRegular}>{tag.descr}</Text>
        </Pressable>
    )
}

const TagSelector = () => {
    
    const { tags, setTags  } = useTagState()
    const { userTags, setUserTags } = useUserTagState()
    const { session } = useAuthStore()

    const init = async () => {
        if (tags.length == 0) {
            await spGetTags().then(values => setTags(values))
        }
        if (session) {
            await spGetUserTags(session.user.id)
                .then(values => setUserTags(new Set(values.map(item => item.name))))
        }
    }
    
    useEffect(
        useCallback(() => {
            init()
        }, []),
        []
    )
  
    return (
        <View style={{width: '100%', gap: 20, backgroundColor: Colors.gray, borderRadius: 4, padding: 10}} >
                <Text style={[AppStyle.textRegularLarge, {color: Colors.orange, fontSize: 30}]}>All Tags</Text>
                <FlatList
                    contentOffset={{x: -120, y: 0}}
                    data={tags}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    renderItem={({item, index}) => <TagItem tag={item}/>}
                    />
            <Text style={[AppStyle.textRegularLarge, {color: Colors.orange, fontSize: 30}]}>My Tags</Text>
            {
                userTags.size == 0 ?
                <Text style={AppStyle.errorMsg}>select a tag</Text> :
                <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}} >
                    {
                        Array.from(userTags).map((item, index) => 
                            <View key={index} style={{paddingVertical: 8, paddingHorizontal: 10, borderRadius: 4, backgroundColor: Colors.orange}} >
                                <Text style={AppStyle.textRegular}>{item}</Text>
                            </View>
                        )
                    }
                </View>
            }
        </View>
    )
}

export default TagSelector

const styles = StyleSheet.create({})