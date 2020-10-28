import * as ImagePicker from 'expo-image-picker'
import React, { useState, useEffect} from 'react';
import { StyleSheet, TextInput, Button, Image, Platform } from 'react-native';

import { Text, View } from './Themed';

export default function Upload({user}) {

    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const handleOnSubmit = () => {

        const reqObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user,
                message
            })
        }
        
        setImage(null)
        setMessage("");

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);
        if (!result.cancelled) {
        setImage(result.uri);
        }
    };
  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
            />
            <TextInput 
                placeholder="Message" 
                multiline = {true}
                numberOfLines = {4} 
                style={{backgroundColor: "#fff", margin: 24,
                fontSize: 18,
                textAlign: 'center',
                width: 250,
                height: 100}}
                value={message} 
                onChangeText={setMessage} />
                {image ? <Button title="Submit" onPress={handleOnSubmit} /> :
             <Button title="Choose Image" onPress={pickImage} />}
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
