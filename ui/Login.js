import { StyleSheet, View, TextInput, Button } from 'react-native';
 
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import axios from 'axios';
 
export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(){
        axios
            .post('http://10.10.52.156:8888/api/login.php', {username: username, password: password})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                console.log("Request completed");
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.username}
                placeholder="Username"
                keyboardType="username"
                value={username}
                onChange={setUsername}
            />
            <TextInput
                style={styles.username}
                placeholder="Password"
                keyboardType="password"
                value={password}
                onChange={setPassword}
            />
            <View style={styles.buttonView}>
                <Button onPress={handleLogin} style={styles.button} title='Login'></Button>
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
    username:{
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