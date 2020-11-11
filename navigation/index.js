import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import BottomTabNavigatorLI from './BottomTabNavigatorLI';
// import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme, user, logout, login, signup, token}) {
  return (
    <NavigationContainer
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      
      {user ? LoggedInNavigator({user, logout, token}) : RootNavigator({login, signup})}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

// function NavigationChoice() {
  //   if(!user){
    //     return <RootNavigator />
    //   } else if (user.admin){
      //     return <AdminNavigator />
      //   } else {
        //    return <LoggedInNavigator /> 
        //   }
        // }
    
        

function LoggedInNavigator({user, token, logout}) {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
<Stack.Screen name="Root" >{props => <BottomTabNavigatorLI token={token} logout={logout} />}</Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function RootNavigator({login, signup}) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Root"  >{props => <BottomTabNavigator login={login} signup={signup} />}</Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
