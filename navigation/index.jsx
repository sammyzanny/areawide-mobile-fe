import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import BottomTabNavigatorLI from './BottomTabNavigatorLI';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme, user, logout }: { colorScheme: ColorSchemeName, user: undefined, logout: undefined}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? <LoggedInNavigator user={user} logout={logout} /> : <RootNavigator />}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

// function NavigationChoice() {
//   if(!user){
//     return <RootNavigator />
//   } else if (user.admin){
//     return <AdminNavigator />
//   } else {
//    return <LoggedInNavigator /> 
//   }
// }



function LoggedInNavigator({user, logout}) {
  <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" user={user} logout={logout} component={BottomTabNavigatorLI} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
