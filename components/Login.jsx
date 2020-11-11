import React, { useState } from 'react';
import { StyleSheet, Button, TextInput } from 'react-native';

import { Text, View} from './Themed';

export default function Login({login}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = () => {

    login({email, password})
    
    setEmail("");
    setPassword("");
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
        <TextInput placeholder="Email" value={email} style={styles.input} onChangeText={setEmail} ></TextInput>
        <TextInput placeholder="Password" value={password} style={styles.input} onChangeText={setPassword}></TextInput>
        <Button title="submit" onPress={handleOnSubmit}>Login</Button>
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
