import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AgendaScreen from './AgendaScreen';
import MeetingScreen from './MeetingScreen';
import MemberScreen from './MemberScreen';

const Stack = createStackNavigator();

function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="Meeting" component={MeetingScreen} />
        <Stack.Screen name="Member" component={MemberScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Index;
