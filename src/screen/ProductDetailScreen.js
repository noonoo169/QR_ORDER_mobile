import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../Constant';
import axios from 'axios';
import { BASE_URL } from '../../ipconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ navigation, route }) => {

    const { item } = route.params;
    const [token, setToken] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('loginInfor').then(result => {
            setToken(result);
        })
    }, [])

    const addToCart = async (productId, quantity) => {
        try {
            console.log(`${BASE_URL}/api/cart/add`);
            console.log("productId ", productId);
            console.log("quantity ", quantity);
            const response = await axios.post( `${BASE_URL}/api/cart/add`, {
                    productId,
                    quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json', 
                    }
                });
            if (response.status >= 200 && response.status < 300){
                console.log(token);
            } 

        } catch (error) {
            console.log(error);
        }


    }

 

    const [size, setSize] = useState('small')
    return (
        <View style={{ backgroundColor: '#808080', flex: 1 }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    marginLeft: 10, marginTop: 10,
                    width: 40
                }}>
                <Image source={require('../../assets/images/back.png')}
                    style={{
                        height: 40,
                        width: 40,
                        tintColor: 'white'
                    }} />
            </TouchableOpacity>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fffaf0',
                    marginTop: 180,
                    borderTopLeftRadius: 56,
                    borderTopRightRadius: 56,
                    alignItems: 'center',
                    paddingHorizontal: 16
                }}>
                <View
                    style={{

                        height: 250,
                        width: 250,
                        position: 'absolute',
                        top: -150
                    }}>
                    <Image source={{ uri: item.images[0].imageUrl }}
                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </View>

                <View style={{
                    marginTop: 120,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{ flex: 1, fontSize: 28, fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.price}</Text>
                </View>

                <Text style={{ fontSize: 20, marginVertical: 20 }}>{item.description}</Text>

                
                
                <TouchableOpacity
                onPress={() => {
                    addToCart(item.id, 1);
                    navigation.goBack();
                }}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#d2b48c',
                    padding: 15,
                    borderRadius: 10,
                    shadowOpacity: 80,
                    elevation: 15,
                    marginHorizontal: 10,
                    marginBottom: 10,
                    width: '80%'
                }}>
                <View>
                    
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#fff'
                        }}>Add to cart</Text>
                    
                </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ProductDetailScreen