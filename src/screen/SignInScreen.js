import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';

import Logo from '../../assets/images/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../ipconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSocialLoginUrl } from '../helper/Helpers';


const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const onSignInPressed = async (username, password) => {

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password
      })
      if (response.status >= 200 && response.status < 300) {
        let userInfo = response.data;
        await AsyncStorage.setItem('loginInfor', JSON.stringify(userInfo.accessToken));
        // AsyncStorage 
        navigation.navigate('Tabs');
      } else {
        console.warn(`sai tài khoản hoặc mật khẩu`);
        Alert.alert("sai tài khoản hoặc mật khẩu");
      }

    }
    catch (er) {
      Alert.alert("sai tài khoản hoặc mật khẩu");
      console.log(er);
    }
    // 
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  }
  const onSignInFacebook = () => {

  }
  const onSignInGoogle = () => {
    console.log(getSocialLoginUrl('google'));
    navigation.navigate("WebView", { url: getSocialLoginUrl('google') });
  }

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  }

  const { height } = useWindowDimensions();
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.root}>

            <Image
              source={Logo}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode='contain'
            />

            <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />

            <CustomButton text="Sign in" onPress={() => onSignInPressed(username, password)} />

            <CustomButton text="forgot password" onPress={onForgotPasswordPressed} type="TERTIARY" />

            <CustomButton
              text="Sign In With Facebook"
              onPress={onSignInFacebook}
              bgColor="#E7EAF4"
              fgColor="#4765A9" />

            <CustomButton
              text="Sign In With Google"
              onPress={onSignInGoogle}
              bgColor="#FAE9EA"
              fgColor="#DD4D44" />

            <CustomButton
              text="Don't have an account? Create one"
              onPress={onSignUpPress}
              type='TERTIARY' />

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
