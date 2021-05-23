import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import SignUp from '../components/SignUp';
import { Text, View } from '../components/Themed';
import crackpic from '../assets/crack.jpg'
import Layout from '../constants/Layout'

export default function TabTwoScreen({signup}) {
  return (
    <View style={styles.container}>
      {/* <ImageBackground style={styles.image} source={crackpic}> */}
        <SignUp signup={signup} />
      {/* </ImageBackground> */}
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
  image: {
    height: Layout.window.height*2,
    width: Layout.window.width,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
