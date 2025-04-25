import { 
    ActivityIndicator,
    StyleSheet, 
    TextInput, 
    Platform, 
    ScrollView, 
    Pressable, 
    KeyboardAvoidingView,
    Text, 
    View 
} from 'react-native'
import { supabase, spGetSession, spGetUser } from '@/lib/supabase';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Colors } from '../../constants/Colors';
import Toast from '../Toast';
import { useState } from 'react'
import * as yup from 'yup';
import { router } from 'expo-router';
import React from 'react'
import { useAuthStore } from '@/store/authStore';
import { AppUser } from '@/types/AppUser';


const schema = yup.object().shape({  
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(3, 'Password must be at least 3 characters')
        .required('Password is required'),  
});

interface FormData {
    email: string
    password: string
}


interface SignInFormProps {
    onSignIn?: () => void
}


const SignInForm = ({onSignIn}: SignInFormProps) => {

    const { login } = useAuthStore()

    const [isLoading, setLoading] = useState(false)

    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {            
            email: '',
            password: '',            
        },
    });
    
    const onSubmit = async (form_data: FormData) => {
        setLoading(true)        
        
        const { error } = await supabase.auth.signInWithPassword({
            email: form_data.email,
            password: form_data.password
        })
        
        setLoading(false)
        
        if (error) {
            Toast.show({title: "Error", message: error.message, type: "error"})
            return
        }
            
        const session = await spGetSession()
        if (session) {     
            const user: AppUser | null = await spGetUser(session.user.id)
            if (user) {
                login(session, user)
                onSignIn ? onSignIn() : null
            } else {
                supabase.auth.signOut()
            }
            
        } else {
            Toast.show({title: "Error", message: "could not retrive login session", type: "error"})
        }        
    };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <ScrollView style={{width: '100%'}} >
            {/* Email */}
            <Text style={styles.inputHeaderText}>Email</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}                    
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete='email'                    
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}/>
                )}
            />
            {errors.email && (<Text style={styles.error}>{errors.email.message}</Text>)}
            
            {/* Password */}
            <Text style={styles.inputHeaderText}>Password</Text>
            <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}                    
                    secureTextEntry
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}/>
                )}
            />
            {errors.password && (<Text style={styles.error}>{errors.password.message}</Text>)}
    
            {/* Login Button */}
            <Pressable onPress={handleSubmit(onSubmit)} style={styles.formButton} >
                {
                    isLoading ? 
                    <ActivityIndicator size={32} color={Colors.white} /> :
                    <Text style={styles.formButtonText} >Login</Text>
                }
            </Pressable>
        <View style={{flexDirection: "row", marginTop: 20, gap: 4}} >
            <Text style={{color: Colors.orange, fontSize: 14}} >Don't Have an Account?</Text> 
            <Pressable onPress={() => router.replace("/(auth)/SignUp")}  hitSlop={{left: 10, top: 10, bottom: 10, right: 10}} >
            <Text style={{textDecorationLine: "underline", fontWeight: "bold", color: Colors.orange, fontSize: 14}} >Sign Up</Text> 
            </Pressable>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignInForm

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.gray1,
        borderRadius: 4,
        height: 50,
        fontSize: 18,
        paddingHorizontal: 10,
        color: Colors.white,
        fontFamily: "LeagueSpartan_400Regular",
        marginBottom: 10
    },
    inputHeaderText: {
        color: Colors.white,
        fontSize: 20,
        fontFamily: "LeagueSpartan_400Regular",
        marginBottom: 10
    },
    error: {
        color: Colors.orange,
        alignSelf: "flex-start",
        fontSize: 14,
        fontFamily: "LeagueSpartan_200ExtraLight"
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