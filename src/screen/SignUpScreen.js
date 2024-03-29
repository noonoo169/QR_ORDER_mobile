import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomBackButton from '../components/CustomBackButton';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { BASE_URL } from '../../ipconfig';
import Toast from 'react-native-toast-message';
import { text } from '@fortawesome/fontawesome-svg-core';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const onRegisterPressed = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        email,
        username,
        password
      });
      if (response.status >= 200 && response.status < 300) {
        console.log("Đang ký thành công")
        Alert.alert('Register success');
        navigation.navigate('SignIn');
        // Alert.alert("sai tài khoản hoặc mật khẩu");

      }

    } catch (error) {
      Alert.alert("Đã có lỗi");

      console.warn(error)
    }
  }

  const onBackPressed = () => {
    navigation.navigate('SignIn');
  }




  const { height } = useWindowDimensions();
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
        <Text style={styles.title}>Create an account</Text>
      </View>

      <CustomInput placeholder='Email' value={email} setValue={setEmail} secureTextEntry={false} />
      <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />

      <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
      <CustomInput placeholder='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true} />

      <CustomButton text="Register" onPress={() => {
        if(email.length == 0 || username.length == 0 || password.length == 0) {
          Alert.alert("Please fill all out");
        } else {
          if(!email.endsWith("@gmail.com")){
            Alert.alert("Email must be in the format @gmail.com");
          }
          else {
            if(password === confirmPassword){
              onRegisterPressed();
            } else {
              Alert.alert("password and confirm password should be the same");
            }
          }
          
          
        }
        
      }} />



    </View>
  );
};

const styles = StyleSheet.create({
  root: {
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

export default SignUpScreen;
