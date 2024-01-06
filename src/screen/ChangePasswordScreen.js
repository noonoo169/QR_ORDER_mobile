import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomBackButton from '../components/CustomBackButton';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../ipconfig';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = () => {

    const [userName, setUserName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const onBackPressed = () => {
        navigation.navigate('Tabs', { screen: 'Account' });
      }

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('loginInfor');
            return token ? JSON.parse(token) : "";
        } catch (error) {
            console.log(error)
        }

    }

    const editPassword = async () => {
        try {
            setIsLoading(true);
            const token = await getToken();
            console.log(userName, oldPassword, newPassword);
            const response = await axios.post(`${BASE_URL}/api/auth/change-password`, {
                userName,
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })

            if (response.status >= 200 && response.status < 300) {
                setIsLoading(false);
                Alert.alert("Your password is updated");
                navigation.navigate('Tabs', { screen: 'Account' });

            } else {
                Alert.alert("Please check your user name or password");
            }

        }
        catch (er) {
            Alert.alert("Please check your user name or password");
            console.log(er);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.root}>
            <View style={{
                width: '100%',
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <CustomBackButton onPress={onBackPressed} />
                <Text style={styles.title}>Change Password</Text>
            </View>
            {isLoading ? (<ActivityIndicator style={{
                marginTop: 20,
            }} size="large" color="#999999" />
            ) : (
                <View style={{ width: "100%" }}>
                    <CustomInput placeholder='User Name' value={userName} setValue={setUserName} secureTextEntry={false} />
                    <CustomInput placeholder='Old Password' value={oldPassword} setValue={setOldPassword} secureTextEntry={true} />
                    <CustomInput placeholder='New Password' value={newPassword} setValue={setNewPassword} secureTextEntry={true} />
                    <CustomInput placeholder='Confirm New Password' value={confirmNewPassword} setValue={setConfirmNewPassword} secureTextEntry={true} />
                    <CustomButton text="Send" onPress={() => {
                        if (newPassword === confirmNewPassword) {
                            editPassword();
                        } else {
                            Alert.alert("new password and confirm new password should be the same");
                        }
                    }} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    }
});

export default ChangePasswordScreen