import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Home from '../src/screens/Home';
import Agenda from '../src/screens/Agenda';
import Meeting from '../src/screens/Meeting';
import Member from '../src/screens/Member';
import Sidebar from '../Components/Sidebar';

const Stack = createStackNavigator();

const HeaderBackground = () => (
  <View style={styles.headerBackgroundContainer}>
    <Image
      source={require('../assets/home.png')}
      style={styles.headerBackground}
      resizeMode="cover"
    />
    <Image
      style={styles.lineImage}
      resizeMode="cover"
      source={require('../assets/line-2.png')}
    />
  </View>
);

const HeaderRight = ({ toggleMenu }) => (
  <View style={styles.headerRightContainer}>
    <Image
      source={require('../assets/image-101.png')}
      style={styles.headerImage}
      resizeMode="contain"
    />
    <TouchableOpacity onPress={toggleMenu} style={styles.menuToggle}>
      <Image
        source={require('../assets/image-90.png')}
        style={styles.menuToggleIcon}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </View>
);

function Navigation() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'left',
          headerRight: () => <HeaderRight toggleMenu={toggleMenu} />,
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'bold',
          },
          headerTintColor: 'black',
          headerBackground: () => <HeaderBackground />,
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'Home' }} />
        <Stack.Screen name="Agenda" component={Agenda} options={{ headerTitle: 'اجندة المجلس' }} />
        <Stack.Screen name="Meeting" component={Meeting} options={{ headerTitle: 'الاجتماعات المبرمجة' }} />
        <Stack.Screen name="Member" component={Member} options={{ headerTitle: 'اعضاء المجلس' }} />
      </Stack.Navigator>
      <Sidebar menuVisible={menuVisible} toggleMenu={toggleMenu} />
      {menuVisible && (
        <TouchableOpacity onPress={toggleMenu} style={styles.menuToggleOverlay}>
          <Image
            source={require('../assets/image-90.png')}
            style={styles.menuToggleIconOverlay}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </>
  );
}

export default Navigation;

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  headerImage: {
    width: 120,
    height: 50,
  },
  menuToggle: {
    marginLeft: 10,
  },
  menuToggleIcon: {
    width: 30,
    height: 30,
  },
  headerBackgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  headerBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    left: 15,
  },
  lineImage: {
    width: '100%',
    height: 5,
  },
  menuToggleOverlay: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 2000,
    marginLeft: 10,
  },
  menuToggleIconOverlay: {
    width: 30,
    height: 30,
    left:10,
  },
});
