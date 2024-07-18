import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import AgendaScreen from './AgendaScreen';
import MeetingScreen from './MeetingScreen';
import MemberScreen from './MemberScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
        <Stack.Screen name="MeetingScreen" component={MeetingScreen} />
        <Stack.Screen name="MemberScreen" component={MemberScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
