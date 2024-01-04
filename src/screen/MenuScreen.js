import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuSearch from '../components/MenuSearch'
import Categories from '../components/Categories'
import Product from '../components/Product'
import { useNavigation } from '@react-navigation/native';


const MenuScreen = () => {

  const navigation = useNavigation();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [nameCategory, setNameCategories] = useState('Cà phê');

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {

  }, [])

  const onSetSelectedCategoryIndex = index => {
    setSelectedCategoryIndex(index);
  };

  const onsetNameCategories = index => {
    setNameCategories(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10, marginHorizontal: 16 }}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            flex: 1,
            fontSize: 22,
            fontWeight: "bold"

          }}
        >Hi, Thai</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image source={require('../../assets/images/cart.png')}
            style={{ width: 40, height: 35 }}></Image>
        </TouchableOpacity>

      </View>
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: "row",
          // paddingVertical: 16,
          borderRadius: 30,
          alignItems: 'center',
          paddingHorizontal: 16,
          marginVertical: 16,
          backgroundColor: 'white',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 7,
          elevation: 5,
        }}
      >
        <Image source={require('../../assets/images/search.png')}
          style={{ width: 20, height: 20 }} />
        <TextInput
          onChangeText={setSearchValue}
          placeholder='enter your food'
          style={{
            paddingLeft: 8,
            fontSize: 16,
          }}
        ></TextInput>
      </View>
      <View>
        <Categories selectedCategoryIndex={selectedCategoryIndex} onSetSelectedCategoryIndex={onSetSelectedCategoryIndex} onsetNameCategories={onsetNameCategories} />
      </View>
      <View>
        <Product nameCategory={nameCategory} searchValue={searchValue} />
      </View>

    </SafeAreaView>

  )
}

export default MenuScreen