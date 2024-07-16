import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

const menuItems = [
  { name: 'Home', icon: require('../../assets/images/home.png') },
  { name: 'Profile', icon: require('../../assets/images/home.png') },
  { name: 'Settings', icon: require('../../assets/images/home.png') },
  { name: 'Notifications', icon: require('../../assets/images/home.png') },
  { name: 'Help', icon: require('../../assets/images/home.png') },
];

const index = () => {
  return (
    <View style={styles.container}>
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
  menuContainer: {
    paddingVertical: 10,
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
    width: 40,
    height: 40,
  },
  menuText: {
    marginTop: 5,
    fontSize: 14,
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

export default index;
