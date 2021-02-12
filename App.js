import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage, Alert, ActivityIndicator} from 'react-native'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/index';
import Urls from './constants/Urls';
import AppLoading from 'expo-app-loading';
import Layout from './constants/Layout'


export default function App() {
  // const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isReady, setReady]= useState(false)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const _retrieveToken =  async () => {
      try {
        const tk = await AsyncStorage.getItem("token")
    
        
        if (tk !== null) {
          setToken(tk)
          const reqObj = {
           method: "GET",
           headers: {
             "Authorization": `Bearer ${tk}`
           }
         }
       
         fetch(Urls.API + '/login', reqObj)
           .then(response => response.json())
           .then(data =>  {
             if (data.message) {
               Alert.alert("AutoLogin Failed", data.message)
             } else {
               setUser(data.user)
             }
             setReady(true)
            });
            
        } else {
          setReady(true)
        }
      } catch (e) {
        Alert.alert("Error", "A login error occurred")
      }
        
    }
      
  _retrieveToken()
}, [])

  
  
  const _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem(
        'token',
        token
      );
      
    } catch (error) {
      Alert.alert("Error:", 'Failed to store data from storage')
    }
  };

  const _removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token")
    } catch (error) {
      Alert.alert("Error:", "Failed to remove data from storage")
    }
  }

  const logout = () => {
    _removeToken()
    setUser(null)
  }

  const login = (userInfo) =>{
    setLoading(true)
    const reqObj = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          user: userInfo
      })
    }

    fetch(Urls.API + "/auth", reqObj)
      .then(response => response.json())
      .then(data =>  {
        if (data.message) {
          Alert.alert("Status:", data.message)
        } else {
          _storeToken(data.jwt)
          setToken(data.jwt)
          setUser(data.user)
        }
        setLoading(false)
          
      });

    
  }

  const signup = (userInfo) => {
    setLoading(true)
    const reqObj = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
       user: userInfo
      })
  }

    fetch(Urls.API + "/users", reqObj)
    .then(resp => resp.json())
    .then(data => {
      if (data.error){
        Alert.alert("Error", data.error)
      } else {
        _storeToken(data.jwt)
        setUser(data.user)
      }
      setLoading(false)
    })
  }


  if (!isReady) {
    return <AppLoading />;
  } else if(isLoading){
    return  <ActivityIndicator size="large" color='#999999' marginTop={Layout.window.height/2} />
  }
  else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} user={user} login={login} logout={logout} signup={signup} token={token} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
