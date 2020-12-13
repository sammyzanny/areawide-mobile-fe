import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage, ImageBackground } from 'react-native'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/index';
import Urls from './constants/Urls';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isReady, setReady]= useState(false)

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
               alert(data.message)
             } else {
               setUser(data.user)
             }
             setReady(true)
          });
          
        }
      } catch (e) {
        alert('Failed to fetch the data from storage')
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
    _removeToken()
    setUser(null)
  }

  const login = (userInfo) =>{
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
              alert(data.message)
              } else {
                _storeToken(data.jwt)
                setToken(data.jwt)
                setUser(data.user)
              }
          
      });

    
  }

  const signup = (userInfo) => {
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
            alert(data.error)
        } else {
          _storeToken(data.jwt)
          setUser(data.user)
        }
    })
  }


  if (!isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} user={user} login={login} logout={logout} signup={signup} token={token} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
