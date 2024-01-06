
import { ActivityIndicator, Alert, StyleSheet, Text, View, useWindowDimensions, } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomBackButton from '../components/CustomBackButton';
import { useNavigation } from '@react-navigation/native'
import { BASE_URL } from '../../ipconfig';
import axios from 'axios';
import { useState } from 'react';


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);


  const onBackPressed = () => {
    navigation.navigate('SignIn');
  }

  const getCode = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/api/auth/send-email-forget-password`, {
        email
      })
      
      if (response.status >= 200 && response.status < 300) {
        if (response.data === "User not found") {
          setIsLoading(false);
          Alert.alert("Email not found");
        }
        else {
          setIsLoading(false);
          navigation.navigate("ConfirmPassword", { yourEmail: email })
        }

      } else {
        Alert.alert("Email not found");
      }

    }
    catch (er) {
      Alert.alert("Email not found");
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
        <Text style={styles.title}>Enter your email</Text>

      </View>
      {isLoading ? (
        <ActivityIndicator style={{
          marginTop: 20,
        }} size="large" color="#999999" />
      ) : (
        <View style={{ width: "100%" }}>
          <CustomInput placeholder='Email' value={email} setValue={setEmail} secureTextEntry={false} />
          <CustomButton text="Send" onPress={getCode} />
        </View>
      )}





    </View>
  );
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

export default ForgotPasswordScreen;
