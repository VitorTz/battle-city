import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'
import { TagUser } from '@/types/UserTag'



const DuelistTagList = ({tags}: {tags: TagUser[]}) => {

    console.log(tags)
    return (
        <View style={styles.container} >
            <FlatList
                data={tags}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                renderItem={({item}) => 
                    <View style={styles.tag} >
                        <Text style={AppStyle.textRegular}>{item.name}</Text>
                    </View> 
                }
            />
        </View>
    )

}

export default DuelistTagList

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: Colors.orange,
        borderRadius: 4,
        marginRight: 10
    }
})