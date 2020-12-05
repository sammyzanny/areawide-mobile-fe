import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

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
    function hasNumber(myString) {
      return /\d/.test(myString);
    }

    if(password.length < 8 || !hasNumber(password)){
      alert("Password must be at least 8 characters long and have at least one number")
      return
    } 


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
        <TextInput value={email} placeholder="Email" style={styles.input} onChangeText={e => setEmail(e.toLowerCase())} />
        <TextInput value={password} placeholder="Password" style={styles.input} onChangeText={setPassword} secureTextEntry={true}  />
        <TextInput value={confirmPassword} placeholder="Confirm Password" style={styles.input} onChangeText={setConfirmPassword} secureTextEntry={true} />
        <TextInput value={name} placeholder="Name" style={styles.input} onChangeText={setName} />
        <TextInput value={phone} placeholder="Phone Number" style={styles.input} onChangeText={setPhone} />
        <TextInput value={officename} placeholder="Office Name" style={styles.input} onChangeText={setOfficename} />
        <TextInput value={address} placeholder="Office Address" style={styles.input} onChangeText={setAddress} />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleOnSubmit}
          underlayColor='#fff'>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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
    registerButton:{
      marginRight:40,
      marginLeft:40,
      marginTop:10,
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
      paddingLeft : 10,
      paddingRight : 10
  },
});
