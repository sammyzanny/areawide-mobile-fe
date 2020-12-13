import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import image from '../assets/house-underwater-lg.jpg'
import Profile from '../components/Profile';
import { View } from '../components/Themed';

export default function ProfileScreen({user, logout, token}) {


  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={image} >
        <Profile logout={logout} user={user} token={token} />
      </ImageBackground>
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
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
