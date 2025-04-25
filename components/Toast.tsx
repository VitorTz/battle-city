import { Colors } from "@/constants/Colors";
import { AppStyle } from "@/style/AppStyle";
import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";


export type ToastType = "success" | "info" | "error"

type ToastOptions = {
  title: string
  message: string
  type: ToastType
  duration?: number
};

const toastRef = React.createRef<{ show: (options: ToastOptions) => void }>();

const ToastComponent = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState("")
  const [type, setType] = useState<ToastType>('info')
  const [message, setMessage] = useState('')
  const fadeAnim = useRef(new Animated.Value(0)).current  

  const color = type == "success" ? Colors.green : type == "error" ? Colors.red : Colors.yellow

  useImperativeHandle(ref, () => ({    
    show: ({ title, message: subtitle, type, duration = 2500 }: ToastOptions) => {
        if (visible) {
            console.log("nao")
            return
        }
        setTitle(title);
        setMessage(subtitle)
        setVisible(true);
        setType(type)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            }).start(() => setVisible(false));
        }, duration);
    },
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>        
        <View style={{marginLeft: 20, paddingVertical: 10}} >
            <Text numberOfLines={1} style={[AppStyle.textRegular, {fontSize: 16, color: Colors.background}]} >
                {title}
            </Text>
            {message && 
              <Text style={[AppStyle.textRegular, {fontSize: 14, color: Colors.background}]}>
                {message}
              </Text>
            }            
        </View>
        <View style={[styles.leftBar, {backgroundColor: color}]}/>
    </Animated.View>
  );
});


const Toast = {
  show: (options: ToastOptions) => {
    toastRef.current?.show(options);
  },
  Component: () => <ToastComponent ref={toastRef} />,
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    height: 60,
    bottom: 50,
    left: "5%",
    right: "5%",       
    justifyContent: "center", 
    backgroundColor: Colors.white,
    borderRadius: 4,
    alignItems: "flex-start"
  },  
  leftBar: {
    width: '2%', 
    height: '100%',    
    position: 'absolute', 
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    left: 0,
    top: 0
  }
});

export default Toast;
