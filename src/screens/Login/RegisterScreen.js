import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from "react";;
import { KeyboardAvoidingView,View,TextInput,Text,TouchableOpacity, Platform } from "react-native";
import { auth } from "../../../firebase";
import styles from "./styles";


const RegisterScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setCp] = useState('')
    const navigation = useNavigation()

    const validPassword = () => {
        if (confirmPassword === password)
            handleSignUp()
        else
            alert('Not match')
    }
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Register with:',user.email)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            })
            .catch(err => alert(err.message))
    }
    
    return (
    <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding':'height'}>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder = 'Email'
                    value = {email}
                    onChangeText={text => setEmail(text)}
                    style = {styles.input}
                />
                <TextInput
                    placeholder = 'Password'
                    value = {password}
                    onChangeText={text => setPassword(text)}
                    style = {styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder = 'Confirm Password'
                    value = {confirmPassword}
                    onChangeText={text => setCp(text)}
                    style = {styles.input}
                    secureTextEntry
                />
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={validPassword} 
                    style={[styles.button]}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen