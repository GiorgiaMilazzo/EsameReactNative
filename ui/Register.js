import { StyleSheet, View, TextInput, Button } from 'react-native';
 
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context';
 
export default function Register() {
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.email}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.email}
                placeholder="Password"
                keyboardType="email-address"
            />
            <View style={styles.buttonView}>
                <Button style={styles.button} title='Register'></Button>
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