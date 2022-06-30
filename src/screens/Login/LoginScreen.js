import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from "react";;
import { KeyboardAvoidingView,View,TextInput,Text,TouchableOpacity } from "react-native";
import { auth } from "../../../firebase";
import styles from "./styles";


const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigation = useNavigation()

    // useEffect(()=> {
    //     const unsub = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.replace('Home')
    //         }
    //     })
    //     return unsub
    // },[])

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Login with:', user.email)
                navigation.replace('Home')
            })
            .catch(err => alert(err.message))
    }

    const handleRegister = () => {
        navigation.navigate('Register')
    }
    return (
    <KeyboardAvoidingView
            style={styles.container}
            behavior='height'>
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
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={handleLogin} 
                    style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleRegister} 
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default LoginScreen