import { StyleSheet, View, TextInput, Button } from 'react-native';
 
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import axios from 'axios'; 
import { API_URL } from '../config';

export default function Login({ onLogin }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(){
        axios
            .post(API_URL + '/login.php', {username: username, password: password})
            .then((response) => {
                // l'api risponde con token se il loginè giusto, con error se è sbagliato
                if(response.data.token){
                    onLogin(response.data.token);
                } else{
                    alert(response.data.error);
                }
            })
            .catch((error) => {
                // qui arrivo solo se il server non risponde
                alert('Impossibile contattare il server');
                console.log(error);
            });
    }

    return (
        // onChangeText passa il testo
        // secureTextEntry si usa per nascondere la password
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.username}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.username}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
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