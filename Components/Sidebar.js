import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ menuVisible, toggleMenu }) => {
  const navigation = useNavigation();

  return (
    <>
      {menuVisible && (
        <View style={styles.sidebar}>
          <Image
            style={styles.sidebarBackground}
            resizeMode="cover"
            source={require("../assets/rectangle-84.png")}
          />
          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Home'); }}>
            <Image
              style={styles.menuIcon}
              resizeMode="cover"
              source={require("../assets/calendar.png")}
            />
            <Text style={styles.menuText}>الرئيسية</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Member'); }}>
            <Image
              style={styles.menuIcon}
              resizeMode="cover"
              source={require("../assets/users.png")}
            />
            <Text style={styles.menuText}>الاعضاء</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 52,
    right: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#A52A2A',
    zIndex: 1000,
    paddingTop: 100, // Pour éviter le chevauchement avec le header
    alignItems: 'center',
  },
  sidebarBackground: {
    position: 'absolute',
    width: '100%',
    height: 900,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Espacement entre les éléments du menu
  },
  menuIcon: {
    width: 55,
    height: 40,
    marginRight: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 20, // Taille de police ajustée pour s'adapter mieux
  },
});

export default Sidebar;
