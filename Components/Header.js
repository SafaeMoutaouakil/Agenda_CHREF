import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={require('../assets/image-101.png')} // Assurez-vous que le chemin est correct
        style={styles.image}
        onError={(e) => console.log(e.nativeEvent.error)} // Ajouté pour débogage
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white', // Ajouté pour meilleure visibilité
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Couleur du texte noire
    textAlign: 'center',
    flex: 1,
  },
  image: {
    left:-15,
    width:150,
    height: 50,
  },
    
});

export default Header;
