import { View, Image, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors, recipeList } from '../Constant'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { BASE_URL } from '../../ipconfig';


const Product = ({ nameCategory, searchValue }) => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [products, setProduct] = useState([]);
  // const [choosedCategory, setChoosedCategory] = useState("ALL");
  const [isCombo, setIsCombo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        let endpoint = ''
        let response;
        if (nameCategory === 'Combo') {
          console.log("set iscombo true");
          setIsLoading(true);
          setIsCombo(true);
          endpoint = `${BASE_URL}/api/combo/`;
          // response = await axios.get(endpoint);
        }
        else {
          console.log("set iscombo false");
          setIsCombo(false);
          setIsLoading(true);
          endpoint = `${BASE_URL}/api/product/?categoryName=${nameCategory}`;
        }

        response = await axios.get(endpoint);
        if (response.status >= 200 && response.status < 300) {
          const data = response.data
          setProduct(data);
          setError('');
          if(searchValue !== ''){
            setProduct([]);
            searchValue = searchValue.toLowerCase();
            for(const value of response.data){
              
              if(value.name.toLowerCase().includes(searchValue)){
                setProduct((products) => [...products, value]);
              }
            }
          }
        } else {
          setError(response.status);
        }
      } catch (error) {
        if (error.response) {
          // Server trả về lỗi status code khác 2xx
          console.error('Lỗi từ server:', error.response.data);
        } else if (error.request) {
          // Không nhận được phản hồi từ server
          console.error('Không nhận được phản hồi từ server:', error.request);
        } else {
          // Có lỗi xảy ra khi thiết lập yêu cầu
          console.error('Lỗi khi thiết lập yêu cầu:', error.message);
        }
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    // getData().catch(error => console.error(error));
    getData();
  }, [nameCategory, searchValue]);



  if (error) {
    // Rendering when there is an error
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }



  else {
    return (

      <View style={{ marginVertical: 5, paddingBottom: 250 }}>
        {isLoading ? (
        <ActivityIndicator style={{
          marginTop: 20,
        }} size="large" color="#999999"/>
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={
                  () => {
                    if (isCombo) {
                      navigation.navigate('ComboDetail', { item });
                    } else {
                      navigation.navigate('ProductDetail', { item });
                    }

                  }}>
                <View key={item.id} style={{
                  backgroundColor: colors.COLOR_LIGHT,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 7,
                  elevation: 5,
                  marginVertical: 15,
                  borderRadius: 15,
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 20,

                }}>
                  {isCombo ? (

                    item.detailsProducts &&
                      item.detailsProducts.length > 0 &&
                      item.detailsProducts[0].product.images &&
                      item.detailsProducts[0].product.images.length > 0 ? (
                      <Image
                        source={{
                          uri: item.detailsProducts[0].product.images[0].imageUrl,
                        }}
                        style={{ width: 150, height: 150, resizeMode: "center" }}
                      />
                    ) : (
                      <Text>No image available</Text>
                    )
                  ) : (
                    item.images && item.images.length > 0 ? (
                      <Image
                        source={{ uri: item.images[0].imageUrl }}
                        style={{ width: 150, height: 150, resizeMode: "center" }}
                      />
                    ) : (
                      <Text>No image available</Text>
                    )
                  )}

                  <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                  <View
                    style={{
                      marginHorizontal: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>

                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold'
                    }}>{item.price}</Text>


                    <View style={{
                      position: 'absolute',
                      left: 60,
                      height: 23,
                      width: 23,
                      borderRadius: 20,
                      backgroundColor: '#bc8f8f',
                      justifyContent: "center",
                      alignItems: "center",

                    }}>
                      <Image source={require('../../assets/images/add.png')}
                        style={{ width: 21, height: 21 }}></Image>
                    </View>
                  </View>

                </View>
              </TouchableOpacity>


            )}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            showsVerticalScrollIndicator={false}
          />
        )}


      </View>
    )
  }


}

export default Product