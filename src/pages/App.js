import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

const menuItems = [
  { name: 'Home', icon: require('../../assets/images/home.png') },
  { name: 'Profile', icon: require('../../assets/images/home.png') },
  { name: 'Settings', icon: require('../../assets/images/home.png') },
  { name: 'Notifications', icon: require('../../assets/images/home.png') },
  { name: 'Help', icon: require('../../assets/images/home.png') },
];

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <ScrollView horizontal={true} style={styles.menuContainer} showsHorizontalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Image source={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to the Home Page!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    height: '15%',   
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '90%',
    height: '70%',
  },
  menuContainer: { 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  menuIcon: {
    width: 30,
    height: 30,  // Reduced size for the icons
  },
  menuText: {
    marginTop: 2,
    fontSize: 12,  // Reduced font size
    color: '#333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
