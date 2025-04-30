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
import { supabase } from '@/lib/supabase';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Colors } from '../../constants/Colors';
import Toast from '../Toast';
import { useState } from 'react'
import * as yup from 'yup';
import React from 'react'
import { useAuthStore } from '@/store/authStore';
import { AppStyle } from '@/style/AppStyle';
import { hp } from '@/helpers/util';


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
    bio: yup
        .string()
        .max(1024, "Max 1024 characters")

});

interface FormData {
    name: string
    email: string
    bio: string | null
}


const ChangeProfileInfoForm = () => {

    const { session, user, setUsername } = useAuthStore()
    const [isLoading, setLoading] = useState(false)

    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema as any),
        defaultValues: {
            email: session && session.user.email ? session.user.email : '',
            name: user ? user.username : '',
            bio: user ? user.bio : null
        },
    });
    
    const onSubmit = async (form_data: FormData) => {
        if (!session || !user) {
            Toast.show({title: "Error", message: "You are not logged!", type: "error"})
            return
        }

        const newUsername = form_data.name.trim()
        const bio: string | null = form_data.bio ? 
            form_data.bio.trim() == '' ?
                null :
                form_data.bio.trim()
            :
            null

        setLoading(true)

        const { error } = await supabase
            .from("users")
            .update({"username": newUsername, "bio":  bio})
            .eq("user_id", session.user.id)

        setLoading(false)

        if (error) {
            switch (error.code) {
                case "23505":
                    Toast.show({title: "Error", message: "Username already exists!", type: "error"})
                    break
                default:
                    Toast.show({title: "Error", message: error.message, type: "error"})
            }
            console.log(error)
        } else {
            setUsername(newUsername)
            Toast.show({title: "Success!", message: '', type: "success"})
        }
        
    };

  return (
        <View style={styles.container} >
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

        {/* Bio */}
        <Text style={styles.inputHeaderText}>Bio</Text>
        <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={[styles.input, {height: hp(20), paddingVertical: 10}]}
                multiline={true}
                textAlignVertical='top'
                autoCapitalize='words'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ? value : ''}/>
            )}
        />
        {errors.bio && (<Text style={styles.error}>{errors.bio.message}</Text>)}

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
        
        {/* Login Button */}
        <Pressable onPress={handleSubmit(onSubmit)} style={AppStyle.formButton} >
            {
                isLoading ? 
                <ActivityIndicator size={32} color={Colors.white} /> :
                <Text style={AppStyle.formButtonText} >Update</Text>
            }
        </Pressable>
    </View>    
  )
}

export default ChangeProfileInfoForm

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 12, 
        backgroundColor: Colors.gray, 
        borderRadius: 4
    },
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
    }    
})