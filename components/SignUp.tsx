import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';

import { Text, View } from '../components/Themed';

export default function SignUp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");




  const handleOnSubmit = () => {
    const reqObj = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username,
            password,
            name,
            email,
            city,
            phone
        })
    }

    if(confirmPassword === password){
        //fetch()
        setUsername("");
        setConfirmPassword("");
        setName("");
        setEmail("");
        setCity("");
        setPhone("");
    } else {
        alert("Passwords do not match");
        setConfirmPassword("");
    }
    

  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
        <TextInput value={username} placeholder="Username" style={styles.input} onChangeText={setUsername} ></TextInput>
        <TextInput value={password} placeholder="Password" style={styles.input} onChangeText={setPassword} secureTextEntry={true} ></TextInput>
        <TextInput value={confirmPassword} placeholder="Confirm Password" style={styles.input} onChangeText={setConfirmPassword} secureTextEntry={true}></TextInput>
        <TextInput value={name} placeholder="Name" style={styles.input} onChangeText={setName}></TextInput>
        <TextInput value={email} placeholder="Email" style={styles.input} onChangeText={setEmail}></TextInput>
        <TextInput value={city} placeholder="City" style={styles.input} onChangeText={setCity}></TextInput>
        <TextInput value={phone} placeholder="Phone Number" style={styles.input} onChangeText={setPhone}></TextInput>
        <Button title="Register" onPress={handleOnSubmit}></Button>
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
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
    },
});
