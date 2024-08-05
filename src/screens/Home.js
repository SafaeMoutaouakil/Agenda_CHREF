import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { initializeDatabase } from '../../Data/dataSQLite';

const Home = () => {
  
  const navigation = useNavigation();

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initializeDatabase();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Error initializing database:', error.message);
        Alert.alert('Database Error', 'There was an error initializing the database.');
      }
    };

    setupDatabase();
  }, []);

 

  return (
    <ImageBackground
      style={styles.homeIcon}
      resizeMode="cover"
      source={require("../../assets/home.png")}
    >
      

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
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0, // Position the sidebar to the right
    width: 200,
    height: '100%',
    backgroundColor: Color.colorFirebrick,
    zIndex: 1000,
  },
  sidebarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  menuIcon: {
    top:65,
    width: 55,
    height: 40,
    marginRight: 10,
    left : 140,
  },
  menuText: {
    color: '#fff',
    fontSize: 30,
    top:30,
    left :-75,
  },
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
    top: 100,
    position: "absolute",
  },
  homeLayout: {
    height: 2,
    width: 60,
    borderTopWidth: 2,
    borderColor: Color.colorOrangered,
    borderStyle: "solid",
    top: 135,
    position: "absolute",
  },
  lineIconLayout: {
    height: 50,
    width: 5,
    top: 100,
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
    top: 250,
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
    left: 180,
  },
  homeChild: {
    left: 330,
  },
  homeItem: {
    left: 225,
  },
  homeInner: {
    left: 310,
  },
  lineIcon: {
    left: 210,
  },
  text2: {
    top: 450,
    left: -230,
    width: 492,
    height: 85,
    position: "absolute",
  },
  alignJustifyIcon: {
    top: 445,
    left: 299,
    width: 56,
  },
  text3: {
    top: 350,
    left: -150,
    width: 405,
    height: 84,
    position: "absolute",
  },
  calendarIcon: {
    top: 345,
    left: 290,
    width: 70,
  },
  text4: {
    left: -150,
    width: 406,
    height: 74,
    lineHeight: 44,
    fontSize: FontSize.m3DisplaySmall_size,
    textAlign: "right",
    color: Color.colorBlack,
    fontFamily: FontFamily.m3DisplaySmall,
  },
  usersIcon: {
    left: 295,
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
  menuToggle: {
    position: 'absolute',
    top: 40,
    right: 20, // Position the toggle button to the right
  },
  menuToggleIcon: {
    width: 30,
    height: 30,
    top :-35,
    left:-200,
  },
});

export default Home;
