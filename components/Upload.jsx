import * as ImagePicker from 'expo-image-picker'
import React, { useState, useEffect} from 'react';
import { StyleSheet, TextInput, Image, Platform, TouchableOpacity, CheckBox, Switch} from 'react-native';
import vidpic from '../assets/film.png'
import { Text, View } from './Themed';
import Urls from '../constants/Urls';

export default function Upload({token}) {

    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");
    const [address, setAddress] = useState("");
    const [billing, setBilling] = useState("");
    const [contact, setContact] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [isUploading, setUploading] = useState(false);



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
        if(isSelected){
            setBilling(address)
        }

        const formData = new FormData();
        
        images.forEach(image => {
            const uri = image.uri;
            const uriParts = uri.split('.');
            const fileType = uriParts[uriParts.length - 1];

            formData.append("post[images][]", {uri, name: `upload.${fileType}`, type: image.type + '/' + fileType } )
        })

       
        formData.append("post[message]", message)
        formData.append("post[contact]", contact)
        formData.append("post[billing]", billing)
        formData.append("post[address]", address)


        const reqObj = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }



        fetch(Urls.API + '/posts', reqObj)
        .then(resp => resp.json())
        .then(data => {
            alert(data.message)
            setImages([])
            setMessage("");
            setAddress("");
            setBilling("");
            setContact("");
        })
        

    }

    const pickImage = async () => {
        if(images.length === 12){
            alert("Only 12 images max")
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        videoMaxDuration: 30
        });
        if (!result.cancelled) {
            const imgs = [].concat(images)
            imgs.push(result)
            setImages(imgs);
        }
    };

    const renderImages = () => {
        return images.map(image => {
            if (image.type == 'video'){
                return (<Image
                    key={image.uri}
                    source={vidpic}
                    style={{ width: 70, height: 70, marginLeft: 10, marginBottom: 10}}
                />)
            }
                return (<Image
                key={image.uri}
                source={{ uri: image.uri}}
                style={{ width: 70, height: 70, marginLeft: 10, marginBottom: 10}}
            />)})
    }

    const clearImages = () => {
        setImages([])
    }

    if(isUploading){
        return (<Text style={styles.title} >Loading...</Text>)

    }
  

    return (
        <View style={styles.container} >
            <View style={styles.imgcont}>
                {renderImages()}
            </View>
            <TouchableOpacity
                style={styles.clearButton}
                onPress={clearImages}
                underlayColor='#fff'>
                <Text style={styles.uploadText}>Clear Images/Videos</Text>
             </TouchableOpacity>
            <TextInput 
                placeholder="Message" 
                style={styles.submission}
                value={message} 
                onChangeText={setMessage} />
            <TextInput 
                placeholder="Client Contact Info" 
                style={styles.submission}
                value={contact} 
                onChangeText={setContact} />
            <TextInput 
                placeholder="Client Address" 
                style={styles.submission}
                value={address} 
                onChangeText={setAddress} />
                {isSelected ? null : 
            <TextInput 
                placeholder="Client Billing Address" 
                style={styles.submission}
                value={billing} 
                onChangeText={setBilling} />}
            <View style={styles.checkboxContainer}>
            <Switch
                trackColor={{ false: "#767577", true: "#05759e" }}
                thumbColor={isSelected ? "#173F5F" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setSelection}
                value={isSelected}
            />
                {/* Android <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                /> */}
                <Text style={styles.label}>Same address?</Text>
            </View>
            <TouchableOpacity
                style={styles.chooseImageButton}
                onPress={pickImage}
                underlayColor='#fff'>
                <Text style={styles.uploadText}>Choose Images/Videos</Text>
             </TouchableOpacity>
             <TouchableOpacity
                title="Submit"
                style={styles.submitButton}
                onPress={handleOnSubmit}
                underlayColor='#fff'>
                <Text style={styles.uploadText}>Submit</Text>
             </TouchableOpacity>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
    backgroundColor: 'transparent'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  submission: {
      backgroundColor: "#fff", 
       margin: 15,
      fontSize: 18,
      textAlign: 'left',
      width: 250,
      height: 50,
    },
    chooseImageButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#05759e',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
    submitButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#173F5F',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      uploadText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
      },
      imgcont: {
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent'
      },
      clearButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:10,
        backgroundColor:'red',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
        height: 30,
        width: 30,
        borderColor: 'white'
      },
      label: {
        margin: 8,
      },
});
// multiline = {true}
// numberOfLines = {4} 