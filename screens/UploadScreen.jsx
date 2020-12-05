import * as React from 'react';
import { StyleSheet, Button, ImageBackground } from 'react-native';
import image from '../assets/house-underwater-lg.jpg'
import Upload from '../components/Upload';
import { Text, View } from '../components/Themed';

export default function TabOneScreen({token}) {


  return (
    
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image} >
      <Upload token={token}/>
      </ ImageBackground >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
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
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
