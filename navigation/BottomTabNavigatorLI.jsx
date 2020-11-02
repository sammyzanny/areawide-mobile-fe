import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import UploadScreen from '../screens/UploadScreen';
import LogoutScreen from '../screens/LogoutScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigatorLI({user, logout}) {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Upload" 
        >{props => <TabOneNavigator user={user} />}
        </BottomTab.Screen>
      <BottomTab.Screen
        name="Logout"
        >{props => <TabTwoNavigator logout={logout} />}
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

function TabOneNavigator({user}) {

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="UploadScreen"
        options={{ headerTitle: 'Upload Crack' }}
        >{props => <UploadScreen user={user} />}
        </TabOneStack.Screen>
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator({logout}) {

  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="LogoutScreen"
        options={{ headerTitle: 'Sign Out' }}
        >{props => <LogoutScreen logout={logout} />}
        </TabTwoStack.Screen>
    </TabTwoStack.Navigator>
  );
}
