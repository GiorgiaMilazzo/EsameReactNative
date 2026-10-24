import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import InputAndButton from './ui/InputAndButton';
import Message from './ui/Message';
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios'; // mi permette di chiamare delle api wrappate all'interno di promise
import { API_URL } from './config';

// export posso riusare il componente in diversi contesti
// default possono non usare {} quando lo richiamo
// in React Native utilizzo un'unica code base (diverse build) che permette di trsformare i componenti nel loro codie nativo
export default function ListOfMessages({ token, onLogout }) {
  // useState ci sono delle info che permettono di triggerare la ui dell'app, ridisegna le parti dell'app impattate da quello stato
  // utilizzo una memoria dei componenti, che li rende reattivi ai cambiamenti
  
  // [getter,setter] 
  // getter per leggere lo stato
  // setter per sovrascrivere lo stato
  const [messages, setMessages] = useState([]);
  // messages legge lo stato 
  // useState restituisce un array, in cui la prima variabile è lo stato attuale e la seconda è il nuovo stato 
  // (che ci consente di ridisegnare l'array)

  function handleDelete(id) {
    // filter crea un nuovo array senza il messaggio con quel determinato id
    setMessages(messages.filter(messages => messages.id !== id));
  }

  const [newContent, setNewContent] = useState('');

    function createMessage() {
      axios.post(
        API_URL + '/createPost.php', // url 
        { content: newContent }, // body il testo del messaggio
        { headers: { Authorization: 'Bearer ' + token}} // header con il token
      )
      .then((response) => {
        if(response.data.success) {
          // messaggio creato: svuoto l'input e ricarico la lista
          setNewContent('');
          download();
        }else{
          Alert.alert('Error', response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }


// chiamata all'api
// non prendo più dati arcodati ma provenienti dall'api
// usare useEffect
  function download() {
    axios
      .get(API_URL + '/messages.php', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        if(response.data.error) {
          // token scaduto o non valido allora torno al login
          onLogout();
        }else{
          setMessages(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      })
  }

  // all'avvio scarico subito i messaggi
  useEffect(() => {
    download();
  }, []);

  // cancello il token salvato e torno al login
  async function logout() {
    await SecureStore.deleteItemAsync('token');
    setToken(null);
  }


// es. di oggi finire l'app, login, mandare l'utente alla lista dei messaggi e poter cancellare i messaggi
// navigazione/routing dei massaggi senza expo router 

// pagina di login, fatto, pagina dei messaggi (se sono già autenticato devo andare direttamente alla pagina dei messaggi)
// in base a quale è la pagina attiva, capisco quale pagina disegnare

// 1. login (salvataggio del token nello store, usando secure store)
// 2. redirect alla pagina dei messaggi (mostrarli grazie al token di autenticazione)


  return (
      <View style={styles.container}>
        <Text style={{color: 'pink', fontSize: 20, marginTop: 60, textAlign: 'center'}}>Social Network</Text>
        <Text style={{color: 'pink', fontSize: 10, textAlign: 'center'}}>Powered by Giorgia</Text>

        <Button title='Logout' onPress={onLogout} />

        <InputAndButton 
          buttonLabel='Invia' 
          inputLabel='Scrivi un nuovo messaggio' 
          onCreate={createMessage}
          value={newContent}
          onChangeText={setNewContent}
        ></InputAndButton>


        <FlatList 
          style={styles.container}
          data={messages} // array di dati da mostarre (inizializzato sopra)
          keyExtractor={(item, index) => index.toString()} // usare la posizione nella lista, l'index
          renderItem={({item}) => ( // il componente da renderizzare per ogni elemento
            <Message
              content={item.content}
              date={item.creation_date}
            />
          )}
        />

        <StatusBar style="auto" />
      </View>
    
  );
}

// flex box = un contenitore che pilota gli elementi figli
// main axis = row, allineamento orizzontale
// main axis = colomn, allineamento verticale 
// gli elementi si comportano in base alla view del componente principale
// justify-content ci permette di decidere come sistemare i componenti
// align-items lavora sull'asse trasversale (asse delle ordinate)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  textContainer: {
    color: 'red'
  }
});
