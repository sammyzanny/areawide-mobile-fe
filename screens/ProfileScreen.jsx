import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import Profile from '../components/Profile';
import { View } from '../components/Themed';

export default function ProfileScreen({user, logout, token}) {


  return (
    <View style={styles.container}>
      <Profile logout={logout} user={user} token={token} />
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
});
