import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';

import { Text, View } from './Themed';

export default function SignUp({signup}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [officename, setOfficename] = useState("")
  const [address, setAddress] = useState("");
  


  const handleOnSubmit = (e) => {
    
    const userInfo = {email, password, name, address, phone, officename}
    
    let filled = true;

    // for(const key of userInfo){
    //   if(userInfo[key].length == 0 ){
    //     filled = false;
    //   }
    // }


    if(confirmPassword === password){
      if(filled){
        signup(userInfo)
        setEmail("");
        setPassword("")
        setConfirmPassword("");
        setName("");
        setAddress("");
        setPhone("");
        setOfficename("")
      } else {
        alert("Please make sure all fields are filled")
      }
    } else {
        alert("Passwords do not match");
        setConfirmPassword("");
    }
    

  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
        <TextInput value={email} placeholder="Email" style={styles.input} onChangeText={setEmail} />
        <TextInput value={password} placeholder="Password" style={styles.input} onChangeText={setPassword} secureTextEntry={true}  />
        <TextInput value={confirmPassword} placeholder="Confirm Password" style={styles.input} onChangeText={setConfirmPassword} secureTextEntry={true} />
        <TextInput value={name} placeholder="Name" style={styles.input} onChangeText={setName} />
        <TextInput value={phone} placeholder="Phone Number" style={styles.input} onChangeText={setPhone} />
        <TextInput value={officename} placeholder="Office Name" style={styles.input} onChangeText={setOfficename} />
        <TextInput value={address} placeholder="Office Address" style={styles.input} onChangeText={setAddress} />
        <Button title="Register" onPress={handleOnSubmit} />
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
    },
});
