import {useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Text,TouchableOpacity, View } from "react-native"
import { auth } from '../../../firebase';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from '../User/styles';

const UserScreen = (props) => {
    const navigations = useNavigation()
    const { navigation } = props;
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => <View />,
        });
      }, []);
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigations.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            })
            .catch(err => alert(err.message))
    }
    return (
        <View style = {styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style = {styles.button}>
                <Text style = {styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}
export default UserScreen