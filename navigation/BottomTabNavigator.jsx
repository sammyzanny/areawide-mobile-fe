// import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({login, signup}) {
  const colorScheme = useColorScheme();


  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint , 
        showIcon: false, 
        labelStyle: {
        textAlignVertical: 'center',
        position: 'absolute',
        top: 20,
        bottom: 0,
        left: 0,
        right: 0,
        }
      }}>
      
      <BottomTab.Screen
        name="Login"
      >{props => <TabOneNavigator login={login} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Sign Up"

        >
        {props => <TabTwoNavigator signup={signup} /> }
        </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}
//   options={{
//  tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
// }}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: { name: string; color: string }) {
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator({login}) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="LoginScreen"
        options={{ headerTitle: 'Login' }}
        >{props => <LoginScreen login={login} />}
        </TabOneStack.Screen>
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator({signup}) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="SignUpScreen"
        options={{ headerTitle: 'Sign Up' }}
      >
        {props => <SignUpScreen signup={signup} />}
      </TabTwoStack.Screen>
    </TabTwoStack.Navigator>
  );
}
