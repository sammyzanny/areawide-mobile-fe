import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import Logout from './Logout';
import { View, TextInput } from './Themed';

export const ResetPassword = ({navigation, route}) => {


    const {token, email} = route.params;
    const [newPassword, setNewPassword]
    const [confirmPassward, setConfirmPassword] = React.useState("");
  
    const handleOnSubmit = () => {
      
      const reqObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
           token
        })
      }
    
      fetch('https://b0a2aeac3053.ngrok.io/resetpassword', reqObj)
      .then(resp => resp.json())
      .then(data => {
        alert(data.message);
        navigation.navigate('Home');
      })
    }
  
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
          <TextInput placeholder="Email" value={email} style={styles.input} onChangeText={setEmail} ></TextInput>
          <TextInput placeholder="Password" value={password} style={styles.input} onChangeText={setPassword}></TextInput>
          <Button title="Set New" onPress={handleOnSubmit}></Button>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    input: {
      backgroundColor: "#fff", 
      margin: 5,           
      fontSize: 18,                
      textAlign: 'center',          
      }
  });
  