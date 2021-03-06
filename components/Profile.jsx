import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import Urls from '../constants/Urls'
import { View } from './Themed';
import Layout from '../constants/Layout'

export default function Profile({user, logout, token}) {

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [officename, setOfficename] = useState(user.officename)
  const [address, setAddress] = useState(user.address);

  const updateProfile = () => {
    const reqObj = {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       user: {
         name,
         phone,
         officename,
         address
       }
      })
    }

    fetch(Urls.API + `/users/${user.id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
        if (data.error){
            Alert.alert("Login Error:", data.error)
        } else {
          Alert.alert("Login Status", data.message)
          setName(data.user.name);
          setAddress(data.user.address);
          setPhone(data.user.phone);
          setOfficename(data.user.officename)
        }
    })
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.separator} />
      <Text style={styles.label} >Name:</Text>
      <TextInput value={name} placeholder="Name" style={styles.input} onChangeText={setName} />
      <Text style={styles.label} >Phone Number:</Text>
      <TextInput value={phone} placeholder="Phone Number" style={styles.input} onChangeText={setPhone} />
      <Text style={styles.label} >Office Name:</Text>
      <TextInput value={officename} placeholder="Office Name" style={styles.input} onChangeText={setOfficename} />
      <Text style={styles.label} >Office Address:</Text>
      <TextInput value={address} placeholder="Office Address" style={styles.input} onChangeText={setAddress} />
      <TouchableOpacity
        style={styles.updateButton}
        onPress={updateProfile}
        underlayColor='#fff'>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
        underlayColor='#fff'>
        <Text style={styles.buttonText}>Sign Out</Text>
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
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  input: {
    backgroundColor: "#fff", 
    margin: 15,
    fontSize: 18,
    textAlign: 'left',
    width: 250,
    height: Layout.window.height/16,
    },
    buttonText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },
  updateButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#05759e',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  logoutButton:{
      marginRight:40,
      marginLeft:40,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'red',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    label: {
      color: 'white'
    }
});
