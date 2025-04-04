import { 
    View, 
    Text, 
    StyleSheet, 
    Pressable, 
    ActivityIndicator 
} from "react-native";
import React, { 
    useState, 
    useRef, 
    forwardRef, 
    useImperativeHandle 
} from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { AppStyle } from "@/style/AppStyle";
import { wp, hp } from "@/helpers/util";


export type DialogMessageTypes = "success" | "info" | "error"


type DialogMessageOptions = {  
  message: string
  type: DialogMessageTypes
  onPress?: () => void
  cancelBtnText?: string
  okBtnText?: string
};

const dialogMessageRef = React.createRef<{ show: (options: DialogMessageOptions) => void }>();

const DialogMessageComponent = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false)  
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<DialogMessageTypes>('info')
  const [cancelBtnText, setCancelBtnText] = useState("Cancel")
  const [okBtnText, setOkBtnText] = useState("OK")
  const [message, setMessage] = useState('')
  const funcRef = useRef<() => void>()

  const iconName = type == "success" ?
    "checkmark-circle-outline" :
    type == "error" ?
    "ban-outline" :
    "alert-circle-outline"

  useImperativeHandle(ref, () => ({
    show: ({ message, type, onPress, cancelBtnText = "Cancel", okBtnText = "OK" }: DialogMessageOptions) => {        
      setMessage(message)
      setVisible(true);
      setType(type)
      setCancelBtnText(cancelBtnText)
      setOkBtnText(okBtnText)
      funcRef.current = onPress ? onPress : () => { }
    },
  }));

  if (!visible) return null;

  const onPress = async () => {
    setLoading(true)
    await funcRef.current!()
    setLoading(false)
    setVisible(false)
  }

  return (    
    <Animated.View style={styles.dialog} entering={FadeInDown.duration(500)} >
        <View style={styles.container} >
          <Ionicons name={iconName} size={64} color={Colors.white} />
          <View style={{width: '100%', alignItems: "center", justifyContent: "center"}} >
            <Text style={[AppStyle.textRegular, {fontSize: 20}]}>{message}</Text>
          </View>
          <View style={{width: '100%', gap: 10, flexDirection: 'row'}} >
            <Pressable onPress={() => setVisible(false)} style={[styles.button, {backgroundColor: Colors.red}]}>
                <Text style={AppStyle.textRegular}>{cancelBtnText}</Text>
            </Pressable>
            <Pressable onPress={onPress} style={[styles.button, {backgroundColor: Colors.deckColor}]}>
              {
                loading ? 
                <ActivityIndicator size={32} color={Colors.white} /> :
                <Text style={AppStyle.textRegular}>{okBtnText}</Text>
              }
            </Pressable>
          </View>
        </View>
    </Animated.View>
  );
});


const DialogMessage = {
  show: (options: DialogMessageOptions) => {
    dialogMessageRef.current?.show(options);
  },
  Component: () => <DialogMessageComponent ref={dialogMessageRef} />,
};

const styles = StyleSheet.create({
  dialog: {
    width: wp(100),
    height: hp(100),   
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: "center",
    justifyContent: "center",
    padding: wp(5)
  },
  container: {
    width: wp(80),    
    backgroundColor: Colors.gray,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 20,
    borderRadius: 12
  },
  button: {
    flex: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 50
  }
});

export default DialogMessage;
