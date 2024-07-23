/*import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Home({ navigation }) {
  const [activePage, setActivePage] = useState('Home');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/image-101.png")}
          style={styles.logo}
        />
      </View>

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
          onPress={() => { setActivePage('Member'); navigation.navigate('Member'); }}
        >
          <Text style={[styles.navText, activePage === 'Member' && styles.activeNavText]}>
            الأعضاء
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Member')}>
          <Text style={styles.buttonText}>اعضاء المجلس</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agenda')}>
          <Text style={styles.buttonText}>اجندة المجلس</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Meeting')}>
          <Text style={styles.buttonText}>الاجتماعات المبرمجة</Text>
        </TouchableOpacity>
      </View>

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

export default Home;
*/

import * as React from "react";
import { StyleSheet, View, Image, Text, ImageBackground,TouchableOpacity } from "react-native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.homeIcon}
      resizeMode="cover"
      source={require("../../assets/home.png")}
    >
      <View style={styles.component2}>
        <View style={styles.component2Child} />
        <View style={styles.component2Child} />
        <View style={styles.component2Child} />
        <Image
          style={styles.image101Icon}
          resizeMode="cover"
          source={require("../../assets/image-101.png")}
        />
      </View>
      <Text style={[styles.text, styles.textTypo1]}>الرئيسية</Text>
      <Text style={[styles.text1, styles.textTypo1]}>الاعضاء</Text>
      <View style={[styles.homeChild, styles.homeLayout]} />
      <View style={[styles.homeItem, styles.homeLayout]} />
      <Image
        style={[styles.homeInner, styles.lineIconLayout]}
        resizeMode="cover"
        source={require("../../assets/line-3.png")}
      />
      <Image
        style={[styles.lineIcon, styles.lineIconLayout]}
        resizeMode="cover"
        source={require("../../assets/line-4.png")}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Meeting')}>
        <Text style={[styles.text2, styles.textTypo]}>الاجتماعات المبرمجة</Text>
        <Image
          style={[styles.alignJustifyIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../assets/align-justify.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Agenda')}>
        <Text style={[styles.text3, styles.textTypo]}>اجندة المجلس</Text>
        <Image
          style={[styles.calendarIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../assets/calendar.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Member')}>
        <Text style={[styles.text4, styles.text4Position]}>اعضاء المجلس</Text>
        <Image
          style={[styles.usersIcon, styles.text4Position]}
          resizeMode="cover"
          source={require("../../assets/users.png")}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textTypo1: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    height: 63,
    width: 105,
    textAlign: "right",
    color: Color.colorBlack,
    fontFamily: FontFamily.m3DisplaySmall,
    lineHeight: 32,
    fontSize: FontSize.m3HeadlineSmall_size,
    top: 165,
    position: "absolute",
  },
  homeLayout: {
    height: 2,
    width: 82,
    borderTopWidth: 2,
    borderColor: Color.colorOrangered,
    borderStyle: "solid",
    top: 208,
    position: "absolute",
  },
  lineIconLayout: {
    height: 90,
    width: 1,
    top: 138,
    position: "absolute",
  },
  textTypo: {
    lineHeight: 44,
    fontSize: FontSize.m3DisplaySmall_size,
    textAlign: "right",
    color: Color.colorBlack,
    fontFamily: FontFamily.m3DisplaySmall,
  },
  iconLayout: {
    height: 49,
    position: "absolute",
    overflow: "hidden",
  },
  text4Position: {
    top: 349,
    position: "absolute",
  },
  component2Child: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.colorFirebrick,
    position: "absolute",
    width: "100%",
  },
  image101Icon: {
    width: 165,
    height: 50,
    alignSelf: 'center',
    marginTop: 15,
  },
  component2: {
    top: 0,
    left: 0,
    width: 430,
    height: 88,
    position: "absolute",
  },
  text: {
    left: 284,
  },
  text1: {
    left: 108,
  },
  homeChild: {
    left: 308,
  },
  homeItem: {
    left: 132,
  },
  homeInner: {
    left: 260,
  },
  lineIcon: {
    left: 74,
  },
  text2: {
    top: 539,
    left: -170,
    width: 492,
    height: 85,
    position: "absolute",
  },
  alignJustifyIcon: {
    top: 533,
    left: 348,
    width: 56,
  },
  text3: {
    top: 442,
    left: -90,
    width: 405,
    height: 84,
    position: "absolute",
  },
  calendarIcon: {
    top: 432,
    left: 335,
    width: 70,
  },
  text4: {
    left: -107,
    width: 406,
    height: 74,
    lineHeight: 44,
    fontSize: FontSize.m3DisplaySmall_size,
    textAlign: "right",
    color: Color.colorBlack,
    fontFamily: FontFamily.m3DisplaySmall,
  },
  usersIcon: {
    left: 342,
    width: 64,
    height: 45,
    overflow: "hidden",
  },
  homeIcon: {
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default Home;