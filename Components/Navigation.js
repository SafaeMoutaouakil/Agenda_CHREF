import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Image } from 'react-native';

import Home from '../src/screens/Home';
import Agenda from '../src/screens/Agenda';
import Meeting from '../src/screens/Meeting';
import Member from '../src/screens/Member';
import SearchResults from '../src/screens/SearchResults';
import Header from '../Components/Header'; // Importation du composant Header

const Stack = createStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center', // Centre le titre de l'en-tête
        headerRight: () => (
          <View style={styles.headerRight}>
            <Image
              source={require('../assets/image-101.png')} // Utilisation de l'image
              style={styles.headerImage}
              resizeMode="contain" // Ajuste l'image pour qu'elle s'adapte au conteneur
            />
          </View>
        ),
        headerTitleStyle: {
          color: 'black', // Couleur du texte de l'en-tête
          fontWeight: 'bold',
        },
        headerTintColor: 'black', // Couleur des éléments interactifs (comme les boutons)
      }}
    >
      <Stack.Screen
        name="اعضاء المجلس"
        component={Home}
        options={{
          header: () => <Header title="اعضاء المجلس" />, // Utilisation du composant Header
        }}
      />
      <Stack.Screen
        name="اجندة"
        component={Agenda}
        options={{
          header: () => <Header title="اجندة" />, // Utilisation du composant Header
        }}
      />
      <Stack.Screen
        name="الاجتماعات المبرمجة"
        component={Meeting}
        options={{
          header: () => <Header title="الاجتماعات المبرمجة" />, // Utilisation du composant Header
        }}
      />
      <Stack.Screen
        name="Member"
        component={Member}
        options={{
           title:"اعضاء" // Utilisation du composant Header
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          header: () => <Header title="Search Results" />, // Utilisation du composant Header
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;

const styles = StyleSheet.create({
  homeIcon: {
    flex: 1,
    resizeMode: 'cover',
  },
});
