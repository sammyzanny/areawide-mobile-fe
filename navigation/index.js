import { NavigationContainer, DefaultTheme, DarkTheme, useLinking } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import * as Linking from 'expo-linking'
import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import BottomTabNavigatorLI from './BottomTabNavigatorLI';
// import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

const prefix = Linking.makeUrl("/");

export default function Navigation({ colorScheme, user, logout, login, signup, token}) {
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      ResetPassword: "resetPassword/:email/:code"
    }
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }


  return (
    <NavigationContainer
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    initialState={initialState}  
    ref={ref}
    >
      {user ? LoggedInNavigator({user, logout, token}) : RootNavigator({login, signup})}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();


        

function LoggedInNavigator({user, token, logout}) {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: 'transparent'}}} >
  <Stack.Screen name="Root" >{props => <BottomTabNavigatorLI user={user} token={token} logout={logout} />}</Stack.Screen>
  <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function RootNavigator({login, signup}) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Root"  >{props => <BottomTabNavigator login={login} signup={signup} />}</Stack.Screen>
    <Stack.Screen name="ResetPassword" >{props => <ResetPassword />}</Stack.Screen>
    <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
