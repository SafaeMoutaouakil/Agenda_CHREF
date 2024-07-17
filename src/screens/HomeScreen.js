// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HomeScreen({ navigation }) {
  const [activePage, setActivePage] = useState('Home');

  return (
    <View style={styles.container}>
      {/* Bandeau supérieur */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/image-101.png")}
          style={styles.logo}
        />
      </View>

      {/* Barre de navigation supérieure */}
      <View style={styles.topNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActivePage('Home')}
        >
          <Text style={[styles.navText, activePage === 'Home' && styles.activeNavText]}>
            الرئيسية
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => { setActivePage('Members'); navigation.navigate('Members'); }}
        >
          <Text style={[styles.navText, activePage === 'Members' && styles.activeNavText]}>
            الأعضاء
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Members')}>
          <Text style={styles.buttonText}>اعضاء المجلس</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agenda')}>
          <Text style={styles.buttonText}>اجندة المجلس</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Meetings')}>
          <Text style={styles.buttonText}>الاجتماعات المبرمجة</Text>
        </TouchableOpacity>
      </View>

      {/* Barre de navigation inférieure */}
      <View style={styles.bottomNav}>
        <Icon name="apps" size={30} color="#000" />
        <Icon name="home" size={30} color="#000" />
        <Icon name="play-arrow" size={30} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    color: 'white',
    marginLeft: 10,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navItem: {
    padding: 10,
  },
  navText: {
    color: 'green',
  },
  activeNavText: {
    color: 'black',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
    padding: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default HomeScreen;
