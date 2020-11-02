import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import BottomTabNavigatorLI from './BottomTabNavigatorLI';
// import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme, user, logout, login, signUp}) {
  return (
    <NavigationContainer
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      {user ? LoggedInNavigator({user, logout}) : RootNavigator({login, signUp})}
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
    
        

function LoggedInNavigator({user, logout}) {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
<Stack.Screen name="Root" >{props => <BottomTabNavigatorLI user={user} logout={logout} />}</Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function RootNavigator({login, signUp}) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Root"  >{props => <BottomTabNavigator login={login} signUp={signUp} />}</Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
