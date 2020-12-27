import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import Logout from '../components/Logout';
import { View } from '../components/Themed';

export default function LogoutScreen({logout}) {


  return (
    <View style={styles.container}>
      <Logout logout={logout} />
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
});
