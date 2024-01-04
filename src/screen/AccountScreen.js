import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../ipconfig';

const AccountScreen = ({ id }) => {
  const navigation = useNavigation();

  const [userInfor, setUserInfor] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [errors, setErrors] = useState(false);

  const removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem("loginInfor");
      return true;
    }
    catch (exception) {
      return false;
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('loginInfor');
      return token ? JSON.parse(token) : "";
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    const getUserInfor = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${BASE_URL}/api/user/userInformation`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
        if (response.status >= 200 && response.status < 300) {
          setUserInfor(response.data);
          console.log("get use infor success");
        }
      } catch (error) {
        console.log(error);
        setErrors(true);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
    getUserInfor();
  },[id])

  
    return (
      <View style={{ backgroundColor: '#f5deb3', flex: 1 }} >
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile', { userInfor: userInfor })}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 40
          }}>
          <Image source={require('../../assets/images/edit.png')}
            style={{
              height: 40,
              width: 40,
              tintColor: '#2f4f4f'
            }} />
        </TouchableOpacity>
  
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 150,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems: 'center',
            paddingHorizontal: 16
          }}>
          <Image source={require('../../assets/images/avatar.png')}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              marginTop: -70
            }} />
          {errors ? (
            <Text>is isLoading</Text>
          ) : (
            isLoading ? (
              <ActivityIndicator style={{
                marginTop: 20,
              }} size="large" color="#999999" />
            ) : (
              <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    padding: 10,
                    color: 'black'
                  }}
                >{userInfor.username}</Text>
                <View style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  width: '95%',
                  padding: 15,
                  borderRadius: 10,
                  shadowOpacity: 80,
                  elevation: 15,
                  marginTop: 20
                }}>
                  <Image source={require('../../assets/images/name.png')}
                    style={{
                      width: 30,
                      height: 30,
                      position: 'absolute',
                      left: 15
                    }} />
                    { userInfor.fullName !== null ? (
                      <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'grey'
                      }}>{userInfor.fullName}</Text>
                    )
                    : (
                      <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'grey'
                      }}>No Information</Text>
                    )}
                  
                </View>
                <View style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  width: '95%',
                  padding: 15,
                  borderRadius: 10,
                  shadowOpacity: 80,
                  elevation: 15,
                  marginTop: 20
                }}>
                  <Image source={require('../../assets/images/birthday.png')}
                    style={{
                      width: 25,
                      height: 25,
                      position: 'absolute',
                      left: 15
                    }} />
                  {userInfor.dateOfBirth !== null ? (
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'grey'
                    }}>{userInfor.dateOfBirth}</Text>
                  ) : (
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'grey'
                    }}>No Information</Text>
                  )}
    
                </View><View style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  width: '95%',
                  padding: 15,
                  borderRadius: 10,
                  shadowOpacity: 80,
                  elevation: 15,
                  marginTop: 20
                }}>
                  <Image source={require('../../assets/images/mail.png')}
                    style={{
                      width: 25,
                      height: 25,
                      position: 'absolute',
                      left: 15
                    }} />
                  <Text style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: 'grey'
                  }}>{userInfor.email}</Text>
                </View><View style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  width: '95%',
                  padding: 15,
                  borderRadius: 10,
                  shadowOpacity: 80,
                  elevation: 15,
                  marginTop: 20
                }}>
                  <Image source={require('../../assets/images/role.jpg')}
                    style={{
                      width: 25,
                      height: 25,
                      position: 'absolute',
                      left: 15
                    }} />
                  <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'grey'
                  }}>{userInfor.roles[0]}</Text>
                </View>
              </View>
    
            )
          )}
            
         
  
          <TouchableOpacity
            onPress={() => {
              removeItemValue();
              navigation.navigate('SignIn')
            }}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#d2b48c',
              width: '95%',
              padding: 15,
              borderRadius: 10,
              shadowOpacity: 80,
              elevation: 15,
              marginBottom: 80
            }}>
            <Text style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#fff'
            }}>Logout</Text>
          </TouchableOpacity>
  
        </View>
      </View>
    )
  }


export default AccountScreen