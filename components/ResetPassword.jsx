import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Urls from '../constants/Urls';

import { View, TextInput } from './Themed';

export default function ResetPassword({navigation, route}) {
  
  const {token, email} = route.params;
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("");
  
    const handleOnSubmit = () => {

      function hasNumber(myString) {
        return /\d/.test(myString);
      }
  
      if(password.length < 8 || !hasNumber(password)){
        alert("Password must be at least 8 characters long and have at least one number")
        return
      } 

      if(password !== confirmPassword){
        alert("Passwords do not match")
        return
      }
      
      const reqObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
           token,
           password
        })
      }
    
      fetch(Urls.API + '/resetpassword', reqObj)
      .then(resp => resp.json())
      .then(data => {
        alert(data.message);
        navigation.navigate('Root');
      })
    }
  
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title} >Reset Password</Text> 
        <View style={styles.separator} />
        <TextInput placeholder="New Password" value={password} style={styles.input} onChangeText={setPassword}></TextInput>
        <TextInput placeholder="Confirm New Password" value={confirmPassword} style={styles.input} onChangeText={setConfirmPassword} ></TextInput>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TouchableOpacity
          title="Submit"
          style={styles.submitButton}
          onPress={handleOnSubmit}
          underlayColor='#fff'>
          <Text style={styles.buttonText}>Submit</Text>
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
      color: 'white'
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
        backgroundColor:'red',
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
  