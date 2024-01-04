import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text, View } from 'react-native';
import Navigation from './src/navigation/index';
import { useEffect } from 'react';
import Tabs from './src/navigation/tabs';
import { useNavigation } from '@react-navigation/native';


const App = () => {
  
    return (
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
    );
  
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
});

export default App;

