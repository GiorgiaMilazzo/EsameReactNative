import { StyleSheet, View, TextInput, Button } from 'react-native';
 
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
 
export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.email}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChange={setEmail}
            />
            <TextInput
                style={styles.email}
                placeholder="Password"
                keyboardType="email-address"
                value={password}
                onChange={setPassword}
            />
            <View style={styles.buttonView}>
                <Button style={styles.button} title='Login'></Button>
            </View>
            
 
        </SafeAreaView>
    );
}
 
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    email:{
        width: '60%',
        marginBottom: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 6,
        textAlign: 'center',
        padding: 10,
    },
    buttonView:{
        backgroundColor: 'lightblue',
        borderRadius: 10,
        padding: 5,
    },
});