import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import MembersList from '../pages/MembersList';


const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <MembersList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
