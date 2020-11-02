import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/index';
import autoLogin from './hooks/autoLogin'
import Urls from './constants/Urls';
import manualLogin from './hooks/manualLogin';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(true);

  useEffect(() => {
   _retrieveToken()
  }, [])

  const _retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
  
      if (token !== null) {
        setUser(autoLogin(token))
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  const _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem(
        'token',
        token
      );
    } catch (error) {
      alert('Failed to store data from storage')
    }
  };

  const _removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token")
    } catch (error) {
      alert("Failed to remove data from storage")
    }
  }

  const logout = () => {
    console.log("wired Up!")
    _removeToken()
    setUser(null)
  }

  const login = (userInfo) =>{
    const data = manualLogin(userInfo)

    _storeToken(data.jwt)
    setUser(data.user)
    
  }

  const signUp = (userInfo) => {
    const data = register(userInfo)

    
  }


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} user={user} login={login} logout={logout} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
