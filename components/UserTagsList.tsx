import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTagState } from '@/store/tagState'
import { useUserTagState } from '@/store/userTagState'
import { AppStyle } from '@/style/AppStyle'
import { Colors } from '@/constants/Colors'

const UserTagsList = () => {

    const { userTagMap } = useUserTagState()

    return (
        <View style={styles.container} >
            <FlatList
                data={Array.from(userTagMap.values())}
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

export default UserTagsList

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