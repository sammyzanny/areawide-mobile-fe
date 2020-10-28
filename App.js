import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import autoLogin from './hooks/autoLogin'
import Urls from './constants/Urls';
import manualLogin from './hooks/manualLogin';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = AsyncStorage.getItem("token");

    if(!!token){
      setUser(autoLogin(token))
    }
  }, [])

  const logout = () => {
    AsyncStorage.removeItem("token")

    setUser(null)
  }

  const login = (userInfo) =>{
    const data = manualLogin(userInfo)
    
    AsyncStorage.setItem("token", data.jwt)
    setUser(data.user)
    
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
