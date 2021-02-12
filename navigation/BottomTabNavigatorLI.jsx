import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import UploadScreen from '../screens/UploadScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigatorLI({user, token, logout}) {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint,
        showIcon: false, 
        labelStyle: {
        textAlignVertical: 'center',
        position: 'absolute',
        top: 20,
        bottom: 0,
        left: 0,
        right: 0,
        }
       }}
      cardStyle={{backgroundColor: 'transperent'}}>
      <BottomTab.Screen
        name="Upload" 
        >{props => <TabOneNavigator token={token}/>}
        </BottomTab.Screen>
      <BottomTab.Screen
        name="Profile"
        >{props => <TabTwoNavigator user={user} logout={logout} token={token}/>}
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

function TabOneNavigator({token}) {

  return (
    <TabOneStack.Navigator screenOptions={{cardStyle: {backgroundColor: 'transparent'}}}>
      <TabOneStack.Screen
        name="UploadScreen"
        options={{ headerTitle: 'Upload Media' }}
        >{props => <UploadScreen token={token} />}
        </TabOneStack.Screen>
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator({user, logout, token}) {

  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ProfileScreen"
        options={{ headerTitle: 'Profile' }}
        >{props => <ProfileScreen user={user} logout={logout} token={token}/>}
        </TabTwoStack.Screen>
    </TabTwoStack.Navigator>
  );
}
