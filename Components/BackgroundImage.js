import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const BackgroundImage = ({ children, style, source }) => {
  return (
    <ImageBackground source={require('../assets/home.png')} style={styles.homeIcon}>

      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default BackgroundImage;
