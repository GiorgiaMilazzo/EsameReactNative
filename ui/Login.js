import { StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { TextInput, Button } from 'react-native';

export default function Login() {
    return (
        <View>
            <TextInput style={login.input}
                title='Inserisci la tua email'>
                
            </TextInput>
            <TextInput style={login.input}
                title='Inserisci la tua password'>

            </TextInput>
            <View>
                <Button title='Login'> </Button>
            </View>
            
        </View>
            
    );
}

const login = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'pink',
    borderRadius: 5,
    padding: 8
  }
});