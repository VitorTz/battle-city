import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'
import { wp } from '@/helpers/util'


export const AppStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        gap: 10,
        backgroundColor: Colors.background,
        padding: wp(5)
    },
    textRegular: {
        fontFamily: "LeagueSpartan_400Regular",
        color: Colors.white,
        fontSize: 16
    },
    textButton: {
        fontFamily: "LeagueSpartan_400Regular",
        color: Colors.white,
        fontSize: 20
    },
    textRegularLarge: {
        fontFamily: "LeagueSpartan_400Regular",
        color: Colors.white,
        fontSize: 24
    },
    textHeader: {
        fontFamily: "LeagueSpartan_600SemiBold",
        color: Colors.orange,
        fontSize: 26
    },
    errorMsg: {
        color: Colors.red,
        fontFamily: "LeagueSpartan_300Light"
    }
})
