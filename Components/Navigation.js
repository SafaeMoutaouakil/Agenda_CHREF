import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Image } from 'react-native';
import BackgroundImage from '../Components/BackgroundImage'; // Import du composant BackgroundImage


import Home from '../src/screens/Home';
import Agenda from '../src/screens/Agenda';
import Meeting from '../src/screens/Meeting';
import Member from '../src/screens/Member';

const Stack = createStackNavigator();

const HeaderBackground = () => (
  <View style={styles.headerBackgroundContainer}>
    <Image
      source={require('../assets/home.png')} // Votre image de fond
      style={styles.headerBackground}
      resizeMode="cover" // Ajuste l'image pour couvrir l'arrière-plan
    />
    <Image
      style={styles.lineImage}
      resizeMode="cover"
      source={require('../assets/line-2.png')}
    />
  </View>
);
const HeaderRight = () => (
  <Image
    source={require('../assets/image-101.png')} // Utilisation de l'image
    style={styles.headerImage}
    resizeMode="contain" // Ajuste l'image pour qu'elle s'adapte au conteneur
  />
);

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center', // Centre le titre de l'en-tête
        headerRight: () => (
          <View style={styles.headerRight}>
            <HeaderRight />
          </View>
        ),        headerTitleStyle: {
          color: 'black', // Couleur du texte de l'en-tête
          fontWeight: 'bold',
        },
        headerTintColor: 'black', // Couleur des éléments interactifs (comme les boutons)
        headerBackground: () => <HeaderBackground />, // Ajoute l'image de fond
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'Home' }}
      />
      <Stack.Screen
        name="Agenda"
        component={Agenda}
        options={{ headerTitle: ' اجندةالمجلس' }}
      />
      <Stack.Screen
        name="Meeting"
        component={Meeting}
        options={{ headerTitle: 'الاجتماعات المبرمجة' }}
      />
      <Stack.Screen
        name="Member"
        component={Member}
        options={{ headerTitle: 'اعضاء المجلس' }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 10, // Ajuste l'espacement à droite
  },
  headerImage: {
    width: 120, // Ajuste la largeur de l'image
    height: 50, // Ajuste la hauteur de l'image
  },
  headerBackgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Aligne la ligne en bas
  },
  headerBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  lineImage: {
    width: '100%', // Ajuste la largeur pour couvrir toute la largeur
    height: 5, // Ajuste la hauteur de l'image de la ligne
    
  },
});
