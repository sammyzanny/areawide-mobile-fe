import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import fetchLogin from './hooks/fetchLogin'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(true)

  useEffect(() => {
    const token = AsyncStorage.getItem("token");

    if(!!token){
      setUser(fetchLogin(token))
    }
  }, [])

  const logout = () => {
    AsyncStorage.removeItem("token")

    setUser(null)
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} user={user} logout={logout} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
