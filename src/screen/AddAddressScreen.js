import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../ipconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';

const AddAddressScreen = ({ navigation }) => {

    const Navigation = useNavigation();

    const [fullName, setFullName] = useState("");

    const [address, setAddress] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [id, setId] = useState(0);

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('loginInfor');
            return token ? JSON.parse(token) : "";
        } catch (error) {
            console.log(error)
        }

    };

    const addAdressUser = async () => {
        try {
            token = await getToken();
            const response = await axios.post(`${BASE_URL}/api/user/addUserLocation`, {
                fullName,
                address,
                phoneNumber
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
            if (response.status >= 200 && response.status < 300) {
                console.log("add address success");
                console.log(response.data);
                setId(response.data.id);
            }
        } catch (error) {
            console.log(error)
        }
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
                }}>Add Address</Text>

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
                    }}>FullName</Text>
                    <View style={{
                        width: '95%',
                        marginLeft: 10,
                        paddingLeft: 10
                    }}>
                        <CustomInput placeholder='Full name'
                            setValue={setFullName}

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
                    }}>Address</Text>
                    <View style={{
                        width: '95%',
                        marginLeft: 10,
                        paddingLeft: 10
                    }}>
                        <CustomInput placeholder='Address'
                            setValue={setAddress}

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
                    }}>Phone Number</Text>
                    <View style={{
                        width: '95%',
                        marginLeft: 10,
                        paddingLeft: 10
                    }}>
                        <CustomInput placeholder='Phone number'
                            setValue={setPhoneNumber}

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
                    onPress={async () => {
                        if(address.length==0 || fullName.length ==0 || phoneNumber.length == 0){
                            Alert.alert("Please fill all out");
                        }
                        else {
                            await addAdressUser();
                            Navigation.navigate('Address', { id });
                        }
                        
                    }}
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

                    }}>
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

export default AddAddressScreen