import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, Button, TextInput } from 'react-native';
import Contacts from 'react-native-contacts';
import Header from '../Components/Header';

const Profile = (props) => {

    const [allContacts, setAllContacts] = useState([])

    useEffect(() => {
        requestCameraPermission()
    }, [])

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
                Contacts.getAll().then(contacts => {
                    setAllContacts(contacts);
                });
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const [number, setNumber] = useState("")
    const [result, setResult] = useState()

    console.log(number)
    if (number.length === 10) {
        Contacts.getContactsByPhoneNumber(number).then(contact => {
            console.log(contact)
            setResult(contact)
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
            <Header
                headerTitle={"My Trips"}
                navigation={props.navigation}
            />
            <TextInput
                style={{
                    height: 40, backgroundColor: 'white', paddingLeft: 10, fontSize: 16, borderRadius: 6
                }}
                onChangeText={setNumber}
                value={number}
                keyboardType="numeric"
            />
            {contact && number.length === 0 &&
              <View>
                 <Text></Text>
              </View>  
            }
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})