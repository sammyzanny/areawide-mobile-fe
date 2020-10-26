import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';

import { Text, View } from '../components/Themed';

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = () => {

    const reqObj = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username,
            password
        })
    }
    
    
    setUsername("");
    setPassword("");
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} ></TextInput>
        <TextInput placeholder="Password" value={password} onChangeText={setPassword}></TextInput>
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
});
