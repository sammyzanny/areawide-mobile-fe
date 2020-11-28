import React, { useState } from 'react';
import { StyleSheet, Button, TextInput } from 'react-native';

import { Text, View} from './Themed';

export default function Login({login}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = () => {
    if(email.length == 0 || password.length == 0){
      alert("Make sure all fields are filled")
      return
    }

    login({email, password})
    
    setEmail("");
    setPassword("");
  }

  const forgotPassword = () => {
    if(email.length == 0){
      alert("Please fill out the email field")
      return
    }
    
  const reqObj = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       email
    })
  }

  fetch('https://b0a2aeac3053.ngrok.io/forgotpassword', reqObj)
  .then(resp => resp.json())
  .then(data => {
      alert(data.message)
      setEmail("")
  })
  

  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
        <TextInput placeholder="Email" value={email} style={styles.input} onChangeText={setEmail} ></TextInput>
        <TextInput placeholder="Password" value={password} style={styles.input} onChangeText={setPassword}></TextInput>
        <Button title="Submit" onPress={handleOnSubmit}>Login</Button>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Forgot Password?" onPress={forgotPassword} />
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
