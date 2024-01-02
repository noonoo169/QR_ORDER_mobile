import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../ipconfig';
import axios from 'axios';

const ComboDetailScreen = ({ navigation, route }) => {

    const { item } = route.params;

    const [token, setToken] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('loginInfor').then(result => {
            setToken(result);
        })
    }, [])

    const addToCart = async (comboId, quantity) => {
        try {
            console.log(`${BASE_URL}/api/cart/add`);
            console.log("token ", token);
            console.log("comboId ", comboId);
            console.log("quantity ", quantity);
            const response = await axios.post(`${BASE_URL}/api/cart/add`, {
                    comboId,
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

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                // paddingBottom: 250,
                marginTop: 20
            }}>

                <ScrollView>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            marginLeft: 10,
                            width: 40
                        }}>
                        <Image source={require('../../assets/images/back.png')}
                            style={{
                                height: 40,
                                width: 40,
                                tintColor: 'black'
                            }} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'black',
                            marginBottom: 10,
                        }}>{item.name}</Text>

                    </View>
                    </View>
                    


                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        data={item.detailsProducts}
                        renderItem={({ item }) =>
                            <View style={{
                                height: 100,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 7,
                                elevation: 15,
                                borderRadius: 10,
                                backgroundColor: colors.COLOR_LIGHT,
                                marginVertical: 10,
                                marginHorizontal: 20,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>


                                <Image source={{ uri: item.product.images[0].imageUrl }}
                                    style={{
                                        height: 75,
                                        width: 75
                                    }}
                                />
                                <View
                                    style={{
                                        height: 100,
                                        marginLeft: 10,
                                        paddingVertical: 20,
                                        flex: 1,
                                    }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>{item.product.name}</Text>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        marginTop: 5,
                                        color: 'black'
                                    }}>{item.product.price}</Text>
                                </View>
                                <View style={{
                                    marginRight: 20, alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        color: 'black',
                                    }}>{item.quantity}</Text>


                                </View>
                            </View>
                        }
                    />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 0,
                        paddingHorizontal: 20
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>Total Price</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>{item.price}</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginVertical: 20, color: 'black' }}>{item.description}</Text>
                    </View>

                </ScrollView>
                             
            </View>

            <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
            <TouchableOpacity
                    onPress={() => {
                        addToCart(item.id, 1);
                        navigation.goBack();
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
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

export default ComboDetailScreen