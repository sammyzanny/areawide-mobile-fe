import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import Login from '../components/Login';
import crackpic from '../assets/crack.jpg'
import Layout from '../constants/Layout'

export default function LoginScreen({login}) {

  return (
    <View style={styles.container}>
      <ImageBackground source={crackpic} style={styles.image} >
        <View style={styles.separator} />
      <Login login={login} />
      </ ImageBackground>
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
    marginVertical: 140,
    height: 1,
    width: '80%',
  },
  image: {
    height: Layout.window.height*2,
    width: Layout.window.width,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
