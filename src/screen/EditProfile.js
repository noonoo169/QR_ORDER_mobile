import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../ipconfig';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const EditProfile = ({ navigation, route }) => {

    const [fullName, setFullname] = useState('');
    const [dateOfBirth, setDateOfbirth] = useState('');
    const [email, setEmail] = useState('');

    const Navigation = useNavigation();

    const { userInfor } = route.params;

    useEffect(() => {
        if(userInfor.fullName !== null && userInfor.dateOfBirth !== null ) {
            setFullname(userInfor.fullName);
            setDateOfbirth(userInfor.dateOfBirth);
        }
        
        setEmail(userInfor.email);
    },[])

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('loginInfor');
            return token ? JSON.parse(token) : "";
        } catch (error) {
            console.log(error)
        }

    };

    const updateProfile = async () => {
        try {
            


            const token = await getToken();
            console.log(fullName, dateOfBirth, email)
            const response = await axios.put(`${BASE_URL}/api/user/updateUserInformation`,
                {
                    fullName,
                    email,
                    dateOfBirth
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
            if (response.status >= 200 && response.status < 300) {
                Navigation.navigate('Account', { id: Math.floor(Math.random() * 100) + 1 } );
            }



        } catch (error) {
            console.log(error);
        }
    }

    function isValidDateFormat(inputString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
      
        if (!regex.test(inputString)) {
          return false;
        }
      
        const [year, day, month] = inputString.split('-');
      
        // Chuyển đổi thành số và kiểm tra giá trị hợp lệ
        const numericYear = parseInt(year, 10);
        const numericMonth = parseInt(month, 10);
        const numericDay = parseInt(day, 10);

      
        // Kiểm tra tháng và ngày có hợp lệ hay không
        if (numericYear <= 0 || numericYear > 2023 ||numericMonth < 1 || numericMonth > 12 || numericDay < 1 || numericDay > 31) {
          return false;
        }
      
        return true;
      }

    return (
        <View style={{
            flex: 1,

        }}>
            <View style={{
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,

            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute',
                        left: 10,
                        top: 5
                    }}
                >
                    <Image source={require('../../assets/images/back.png')}
                        style={{
                            width: 35,
                            height: 35,

                        }} />
                </TouchableOpacity>

                <Text style={{
                    marginTop: 8,
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: 'black'
                }}>Edit Profile</Text>

            </View>
            <View style={{
                alignItems: 'center',
                marginVertical: 15
            }}>
                <Image source={require('../../assets/images/avatar.jpg')}
                    style={{
                        height: 170,
                        width: 170,
                        borderRadius: 85,
                        borderWidth: 2,
                        borderColor: 'black'
                    }} />
            </View>
            <View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'column',
                    marginBottom: 6,
                }}>
                    <Text style={{
                        marginLeft: 20,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Full Name</Text>
                    <View style={{
                        backgroundColor: 'white',
                        width: '95%',
                        marginLeft: 10,
                        borderColor: '#e8e8e8',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginVertical: 5,
                        paddingLeft: 10
                    }}>
                        <TextInput
                            placeholder='full name'
                            value={fullName}
                            onChangeText={setFullname}
                            editable={true}
                            style={{ paddingLeft: 10,
                                marginVertical: 10,
                            }}
                        />
                    </View>

                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'column',
                    marginBottom: 6,
                }}>
                    <Text style={{
                        marginLeft: 20,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Date Of Birth</Text>
                    <View style={{
                        backgroundColor: 'white',
                        width: '95%',
                        marginLeft: 10,
                        borderColor: '#e8e8e8',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginVertical: 5,
                        paddingLeft: 10
                    }}>
                        <TextInput
                            placeholder='date of birth'
                            value={dateOfBirth}
                            onChangeText={setDateOfbirth}
                            editable={true}
                            style={{ paddingLeft: 10,
                                marginVertical: 10,
                            }}
                        />
                    </View>

                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'column',
                    marginBottom: 6,
                }}>
                    <Text style={{
                        marginLeft: 20,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Email</Text>
                    <View style={{
                        backgroundColor: 'white',
                        width: '95%',
                        marginLeft: 10,
                        borderColor: '#e8e8e8',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginVertical: 5,
                        paddingLeft: 10
                    }}>
                        <TextInput
                            placeholder='email'
                            value={email}
                            onChangeText={setEmail}
                            editable={true}
                            style={{ paddingLeft: 10,
                                marginVertical: 10,
                            }}
                        />
                    </View>

                </View>
               
            </View>

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
            }}>
            <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#d2b48c',
                        width: '70%',
                        padding: 15,
                        borderRadius: 30,
                        shadowOpacity: 80,
                        elevation: 15,
                        marginHorizontal: 10,
                        marginBottom: 10,
                    }}
                    onPress={() => {
                        if(email.length == 0 || fullName.length == 0 || dateOfBirth.length == 0) {
                            Alert.alert("Please fill all out");
                          } else {
                            if(!email.endsWith("@gmail.com")){
                              Alert.alert("Email must be in the format @gmail.com");
                            }
                            else {
                              if(isValidDateFormat(dateOfBirth)){
                                updateProfile();
                              } else {
                                Alert.alert('Invalid Date Format', 'Please enter a valid date in the format "yyyy-dd-mm".');
                              }
                            }
                            
                            
                          }
                    }}
                    >
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#fff'
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile