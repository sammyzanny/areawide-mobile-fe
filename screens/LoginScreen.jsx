import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import awpic from '../assets/AreaWide.jpg'
import Login from '../components/Login';
import { Text, View } from '../components/Themed';

export default function LoginScreen({login}) {

  return (
    <View style={styles.container}>
      <ImageBackground source={awpic} style={styles.image} >
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
    height: '50%',
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
