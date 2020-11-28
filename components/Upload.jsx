import * as ImagePicker from 'expo-image-picker'
import React, { useState, useEffect} from 'react';
import { StyleSheet, TextInput, Button, Image, Platform } from 'react-native';
import { Text, View } from './Themed';

export default function Upload({token}) {

    const [images, setImages] = useState([]);
    const [uris, setUris] = useState([])
    const [message, setMessage] = useState("");
    const [address, setAddress] = useState("");
    const [billing, setBilling] = useState("");
    const [contact, setContact] = useState("");



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

        // const formData = new FormData();
        
        // images.forEach(image => {
        //     formData.append("post[images[]]", images)
        // })

        // formData.append("post[message]", message)
        // formData.append("[contact]", contact)
        // formData.append("[billing]", billing)
        // formData.append("[address]", address)


        const reqObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    images,
                    message,
                    contact,
                    billing,
                    address
                }
            })
        }

        fetch('https://b0a2aeac3053.ngrok.io/posts', reqObj)
        .then(resp => resp.json())
        .then(data => {
            alert(data.message)
            setImages([])
            setUris([])
            setMessage("");
        })
        

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
        quality: 1,
        });
        if (!result.cancelled) {
            const imgs = [].concat(images)
            imgs.push(result.base64)
            setImages(imgs);
      
            const pics = [].concat(uris)
            pics.push(result.uri)
            setUris(pics);
        }
    };

    const renderImages = () => {
        return uris.map(uri => {
                return (<Image
                key={uri}
                source={{ uri: uri}}
                style={{ width: 50, height: 50}}
            />)})
    }
  

    return (
        <View >
            <Text style={styles.title}>Upload multiple images/videos</Text>
            {renderImages()}
            <TextInput 
                placeholder="Message" 
                style={styles.submission}
                
                value={message} 
                onChangeText={setMessage} />
            <TextInput 
                placeholder="Client Address" 
                style={styles.submission}
                value={address} 
                onChangeText={setAddress} />
            <TextInput 
                placeholder="Client Billing Address" 
                style={styles.submission}
                value={billing} 
                onChangeText={setBilling} />
            <TextInput 
                placeholder="Client Contact Info" 
                style={styles.submission}
                value={contact} 
                onChangeText={setContact} />
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
  submission: {
      backgroundColor: "#fff", 
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
      width: 250,
      height: 50
    }
});
// multiline = {true}
// numberOfLines = {4} 