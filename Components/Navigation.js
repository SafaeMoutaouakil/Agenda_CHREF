import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/screens/Home';
import Agenda from '../src/screens/Agenda';
import Meeting from '../src/screens/Meeting';
import Member from '../src/screens/Member';
import SearchResults from '../src/screens/SearchResults';


const Stack = createStackNavigator();

function Navigation() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Agenda" component={Agenda} options={{ headerShown: false }}  />
        <Stack.Screen name="Meeting" component={Meeting} />
        <Stack.Screen name="Member" component={Member} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
      </Stack.Navigator>
  );
}

export default Navigation;
