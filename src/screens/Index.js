import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import MemberScreen from './MemberScreen';
import AgendaScreen from './AgendaScreen';
import MeetingScreen from './MeetingScreen';

const Stack = createStackNavigator();

function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Members" component={MemberScreen} />
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="Meetings" component={MeetingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Index;
