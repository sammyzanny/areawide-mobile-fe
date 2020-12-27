import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';

import { Text, View } from './Themed';

export default function Logout({logout}) {



  

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Out</Text>
        <Button title="Sign Out" onPress={logout}></Button>
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
