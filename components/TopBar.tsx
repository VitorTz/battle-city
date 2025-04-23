import { View, Text, StyleSheet } from "react-native"
import { AppStyle } from "@/style/AppStyle"
import { Colors } from "@/constants/Colors"


interface TopBarProps {
  title: string
  textColor?: string
  children?: React.JSX.Element
  marginBottom?: number
}


const TopBar = ({
    title, 
    textColor = Colors.white, 
    children,
    marginBottom = 10
  }: TopBarProps) => {    
    return (
      <View style={[styles.container, {marginBottom}]} >
        <Text
          style={[AppStyle.textRegular, {color: textColor, fontSize: 32}]}>{title}
        </Text>
        <View>
          {children}
        </View>
      </View>
    )
  }


export default TopBar


const styles = StyleSheet.create({
    container: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: "space-between"
    }   
})