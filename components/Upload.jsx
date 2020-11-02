import * as ImagePicker from 'expo-image-picker'
import React, { useState, useEffect} from 'react';
import { StyleSheet, TextInput, Button, Image, Platform } from 'react-native';

import { Text, View } from './Themed';
import Urls from '../constants/Urls';

export default function Upload({user}) {

    const [images, setImages] = useState([]);
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
                images,
                message
            })
        }

        fetch(Urls.API+'/upload', reqObj)
        .then(resp => resp.json())
        .then(data => {
            alert(data.message)
            setImages([])
            setMessage("");
        })
        

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        if (!result.cancelled) {
            const pics = Object.assign([], images)
            pics.push(result.uri)
            setImages(pics);
        }
    };

    const renderImages = () => {
        return images.map(image => {
                return (<Image
                source={{ uri: image }}
                style={{ width: 50, height: 50}}
            />)})
    }
  

    return (
        <View >
            <Text style={styles.title}>Upload multiple images/videos</Text>
            {renderImages()}
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
            <Button title="Choose Image" onPress={pickImage} />
            <Button title="Submit" onPress={handleOnSubmit} />
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
