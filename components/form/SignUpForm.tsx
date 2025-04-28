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
import { supabase, spGetSession, spGetUser, spCheckIfUsernameExists, spGetCountryId } from '@/lib/supabase';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';
import Toast from '../Toast';
import { useState } from 'react'
import * as yup from 'yup';
import React from 'react'
import { hp, sleep } from '@/helpers/util';
import { useAuthStore } from '@/store/authStore';
import { AppUser } from '@/types/AppUser';
import CountryPicker from '../picker/CountryPicker';
import { AppStyle } from '@/style/AppStyle';


const schema = yup.object().shape({  
    name: yup
        .string()
        .min(3, 'Username must be at least 3 characters')        
        .max(42, 'Max 42 characters')
        .required('Username is required'),
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(3, 'Password must be at least 3 characters')
        .required('Password is required'),  
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Password must be the same')
        .required('Password is required'),
    bio: yup
        .string()
        .max(1024, "Max 1024 characters")
});

interface FormData {
    name: string
    email: string
    password: string
    confirmPassword: string
    bio: string
}



const SignUpForm = () => {

    const { login, logout } = useAuthStore()
    const [isLoading, setLoading] = useState(false)
    const [country, setCountry] = useState<string | null>(null)
    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema as any),
        defaultValues: {            
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            bio: ''
        },
    });
    
    const onSubmit = async (form_data: FormData) => {

        if (!country) {
            Toast.show({title: "Warning!", message: "Pick a country", type: "info"})
            return
        }
        
        setLoading(true)
        
        const country_id: number | null = await spGetCountryId(country)
        const bio = form_data.bio.trim()

        if (!country_id) {
            Toast.show({title: "Error", message: "You cannot pick this country", type: "error"})
            setLoading(false)
            return
        }

        const username = form_data.name.trim()

        const { data, error } = await supabase.auth.signUp({
            email: form_data.email.trimEnd(),
            password: form_data.password,
            options: {
                data: { username, country_id, bio: bio != '' ? bio : null }
            }
        })

        if (error) {
            console.log(error)
            Toast.show({title: "Error", message: "username or email already taken", type: "error"})
            setLoading(false)
            return
        }

        if (!data.session) {
            Toast.show({title: "Error", message: "could not retrive login session", type: "error"})
            setLoading(false)
            logout()
            await supabase.auth.signOut()
            return
        }
        
        const user = await spGetUser(data.session.user.id)

        if (!user) {
            Toast.show({title: "Error", message: '', type: "error"})
            setLoading(false)
            return 
        }
            
        setLoading(false)
        login(data.session, user)
        Toast.show({title: `Welcome, ${username} 👋`, message: 'Account created', type: 'success'})
        router.replace("/(tabs)/database")    
    };

  return (
    <KeyboardAvoidingView style={{width: '100%', gap: 20}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <ScrollView style={{width: '100%'}} >
            {/* Name */}
            <Text style={styles.inputHeaderText}>Username</Text>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    autoComplete='name'
                    autoCapitalize='none'                    
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}/>
                )}
            />
            {errors.name && (<Text style={styles.error}>{errors.name.message}</Text>)}
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

            {/* Confirm Password */}
            <Text style={styles.inputHeaderText}>Confirm password</Text>
            <Controller
                name="confirmPassword"
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
            {errors.confirmPassword && (<Text style={styles.error}>{errors.confirmPassword.message}</Text>)}

            {/* Bio */}
            <View style={{flexDirection: 'row', gap: 10, alignItems: "center"}} >
                <Text style={styles.inputHeaderText}>Bio</Text>
                <Text style={[AppStyle.errorMsg, {alignSelf: "flex-start"}]}>optional</Text>
            </View>
            <Controller
                name="bio"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={[styles.input, {height: hp(20), paddingTop: 10}]}
                    autoCapitalize="sentences"
                    enterKeyHint='done'
                    onBlur={onBlur}
                    textAlignVertical='top'
                    multiline={true}
                    maxLength={1024}
                    onChangeText={onChange}
                    value={value}/>
                )}
            />
            {errors.bio && (<Text style={styles.error}>{errors.bio.message}</Text>)}


            <Text style={styles.inputHeaderText}>Country</Text>
            <CountryPicker setCountry={setCountry} />

            {/* Login Button */}
            <Pressable onPress={handleSubmit(onSubmit)} style={styles.formButton} >
                {
                    isLoading ? 
                    <ActivityIndicator size={32} color={Colors.white} /> :
                    <Text style={styles.formButtonText} >Register</Text>
                }
            </Pressable>

        <View style={{flexDirection: "row", marginTop: 20, gap: 4}} >
            <Text style={{color: Colors.orange, fontSize: 14}} >Already Have an Account?</Text> 
            <Pressable onPress={() => router.replace("/(tabs)/profile")}  hitSlop={{left: 10, top: 10, bottom: 10, right: 10}} >
                <Text style={{textDecorationLine: "underline", fontWeight: "bold", color: Colors.orange, fontSize: 14}} >
                    Sign In
                </Text> 
            </Pressable>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpForm

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