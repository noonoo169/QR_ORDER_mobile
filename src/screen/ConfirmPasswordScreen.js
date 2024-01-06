import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CustomBackButton from '../components/CustomBackButton';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { BASE_URL } from '../../ipconfig';

const ConfirmPasswordScreen = ({route}) => {

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const { yourEmail } = route.params;

  const onBackPressed = () => {
    navigation.navigate('ForgotPassword');
  }

  const confirmPassword = async () => {
    try {
      setIsLoading(true);
      console.log(yourEmail, code, newPassword );
      const response = await axios.post(`${BASE_URL}/api/auth/forget-password`, {
        email: yourEmail,
        resetPasswordCode: code,
        newPassword: newPassword
      })

      if (response.status >= 200 && response.status < 300) {
          setIsLoading(false);
          Alert.alert("Your password is updated");
          navigation.navigate("SignIn")

      } else {
        Alert.alert("Please check your code number");
      }

    }
    catch (er) {
      Alert.alert("Please check your code number");
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
        <Text style={styles.title}>Reset your password</Text>
      </View>
      {isLoading ? (<ActivityIndicator style={{
        marginTop: 20,
      }} size="large" color="#999999" />
      ) : (
        <View style={{ width: "100%" }}>
          <CustomInput placeholder='code' value={code} setValue={setCode} secureTextEntry={false} />
          <CustomInput placeholder='New Password' value={newPassword} setValue={setNewPassword} secureTextEntry={true} />
          <CustomInput placeholder='Confirm New Password' value={confirmNewPassword} setValue={setConfirmNewPassword} secureTextEntry={true} />
          <CustomButton text="Send" onPress={() => {
            if(newPassword === confirmNewPassword){
              confirmPassword();
            } else {
              Alert.alert("password and confirm password should be the same");
            }
          }} />
        </View>
      )}
    </View>
  )
};

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

export default ConfirmPasswordScreen