import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

import Home from '../src/screens/Home';
import Agenda from '../src/screens/Agenda';
import Meeting from '../src/screens/Meeting';
import Member from '../src/screens/Member';
import SearchResults from '../src/screens/SearchResults';
import Header from '../Components/Header'; // Importation du composant Header


const Stack = createStackNavigator();

function Navigation() {
  return (
    <ImageBackground
    style={styles.homeIcon}
    resizeMode="cover"
    source={require("../assets/home.png")}
  >
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="اعضاء المجلس"
        component={Home}
        options={{
         title:"اعضاء المجلس" ,
        }}
      />
      <Stack.Screen
        name="اجندة"
        component={Agenda}
        options={{
          title:" اجندة" ,   
             }}
      />
      <Stack.Screen
        name="الاجتماعات المبرمجة"
        component={Meeting}
        options={{
         }}
      />
      <Stack.Screen
        name="Member"
        component={Member}
        options={{
          title:" اجندة" ,   
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
         }}
      />
    </Stack.Navigator>
    </ImageBackground>
  );
}


export default Navigation;

const styles = StyleSheet.create({
  homeIcon: {
    flex: 1,
    resizeMode: 'cover',
  },
  
});