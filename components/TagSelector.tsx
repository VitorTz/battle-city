import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTagState } from '@/store/tagState'
import { spGetTags, spUpsertUserTags } from '@/lib/supabase'
import { TagUser } from '@/types/UserTag'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'
import { useUserTagState } from '@/store/userTagState'
import { useAuthStore } from '@/store/authStore'
import Toast from './Toast'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'


const TagItem = ({tag, isSelected, selectTag}: {tag: TagUser, isSelected: boolean, selectTag: (tag: TagUser) => void}) => {
    
    const onPress = () => {
        selectTag(tag)
    }

    return (
        <Pressable 
            onPress={onPress}
            style={{
                marginRight: 10, 
                padding: 10,
                borderRadius: 4, 
                backgroundColor: isSelected ? Colors.orange : Colors.background
            }} >
            <Text style={AppStyle.textRegularLarge}>{tag.name}</Text>
            <Text style={AppStyle.textRegular}>{tag.descr}</Text>
        </Pressable>
    )
}

const TagSelector = () => {
    
    const { session } = useAuthStore()
    const { tags, setTags  } = useTagState()
    const { userTagMap, setUserTagMap } = useUserTagState()
    
    const [loading, setLoading] = useState(false)
    const [tmpTags, setTmpTags] = useState<Map<number, TagUser>>(new Map())
    
    const init = useCallback(async () => {
        if (tags.length == 0) {
            await spGetTags().then(values => setTags(values))
        }
        setTmpTags(new Map(userTagMap))
    }, [])

    useEffect(
        () => {
            init()
        },
        []
    )

    const saveTags = async () => {
        if (!session) {
            Toast.show({title: "Error", message: "You are not logged!", type: "error"})
            return
        }
        setLoading(true)
        const tagsIds: number[] = Array.from(tmpTags.values()).map(item => item.tag_id)
        const success = await spUpsertUserTags(session.user.id, tagsIds)        
        if (success) { 
            setUserTagMap(tmpTags) 
            Toast.show({title: "Success!", message: "", type: "success"})
        }
        setLoading(false)
    }

    const selectTag = (tag: TagUser) => {
        setTmpTags(
            prev => {
                const n = new Map(prev)
                n.has(tag.tag_id) ?
                    n.delete(tag.tag_id) :
                    n.set(tag.tag_id, tag)
                return n
            }
        )
    }

    const clearUserTags = () => {
        setTmpTags(new Map())
    }

    return (
        <View style={styles.container} >
                <Text style={[AppStyle.textRegularLarge, {color: Colors.orange, fontSize: 30}]}>All Tags</Text>
                <FlatList
                    data={tags}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    renderItem={({item, index}) => <TagItem isSelected={tmpTags.has(item.tag_id)} tag={item} selectTag={selectTag}/>
                    }/>
                <View style={{width: '100%', alignItems: "center", justifyContent: "space-between", flexDirection: 'row'}} >
                    <Text style={[AppStyle.textRegularLarge, {color: Colors.orange, fontSize: 30}]}>My Tags</Text>
                    <Pressable 
                        onPress={clearUserTags}
                        style={styles.clearButton} 
                        hitSlop={AppConstants.hitSlop}>
                        <Text style={AppStyle.textRegular}>clear</Text>
                    </Pressable>
                    
                </View>
                {
                    tmpTags.size == 0 ?
                    <Text style={AppStyle.errorMsg}>* select a tag</Text> :
                    <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}} >
                        {
                            Array.from(tmpTags.values()).map((item, index) => 
                                <View key={index} style={{paddingVertical: 8, paddingHorizontal: 10, borderRadius: 4, backgroundColor: Colors.orange}} >
                                    <Text style={AppStyle.textRegular}>{item.name}</Text>
                                </View>
                            )
                        }
                    </View>
                }
            <Pressable onPress={saveTags} style={AppStyle.formButton} >
                {
                    loading ?
                    <ActivityIndicator size={32} color={Colors.white} /> :
                    <Text style={AppStyle.formButtonText}>Update</Text>
                }
            </Pressable>
        </View>
    )
}

export default TagSelector

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        gap: 20,
        padding: 12,
        backgroundColor: Colors.gray,
        borderRadius: 4
    },
    tagsContainer: {
        padding: 10,
        gap: 10,
        backgroundColor: Colors.gray,
        borderRadius: 4
    },
    clearButton: {
        paddingHorizontal: 10, 
        paddingVertical: 8, 
        backgroundColor: Colors.orange, 
        borderRadius: 4
    }
})