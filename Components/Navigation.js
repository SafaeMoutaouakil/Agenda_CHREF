import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/screens/Home';
import AgendaScreen from '../src/screens/AgendaScreen';
import MeetingScreen from '../src/screens/MeetingScreen';
import MemberScreen from '../src/screens/MemberScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
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
  );
}

export default Navigation;
