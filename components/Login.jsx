import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import Urls from '../constants/Urls';

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

  fetch(Urls.API + '/forgotpassword', reqObj)
  .then(resp => resp.json())
  .then(data => {
      alert(data.message)
      setEmail("")
  })
  

  }

  

  return (
    <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.separator} />
        <TextInput placeholder="Email" value={email} style={styles.input} onChangeText={e => setEmail(e.toLowerCase())} ></TextInput>
        <TextInput placeholder="Password" value={password} style={styles.input} onChangeText={setPassword}></TextInput>
        <View style={styles.separator} />
        <TouchableOpacity
          title="Submit"
          style={styles.submitButton}
          onPress={handleOnSubmit}
          underlayColor='#fff'>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    margin: 15,
    fontSize: 18,
    textAlign: 'left',
    width: 250,
    height: 50,
    },
    submitButton:{
      marginRight:40,
      marginLeft:40,
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor:'green',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    buttonText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft: 10,
      paddingRight: 10,
  },
});
