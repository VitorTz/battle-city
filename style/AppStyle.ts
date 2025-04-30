import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'
import { wp } from '@/helpers/util'


export const AppStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        gap: 10,
        backgroundColor: Colors.background,
        padding: wp(5),
        paddingBottom: 80
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
    },
    formButton: {
        width: '100%',
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 4,
        backgroundColor: Colors.orange
    },
    formButtonText: {
        color: Colors.white,
        fontSize: 22,
        fontFamily: "LeagueSpartan_400Regular",
    }
})
