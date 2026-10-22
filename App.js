import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import InputAndButton from './ui/InputAndButton';
import Message from './ui/Message';
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios'; // mi permette di chiamare delle api wrappate all'interno di promise

// export posso riusare il componente in diversi contesti
// default possono non usare {} quando lo richiamo
// in React Native utilizzo un'unica code base (diverse build) che permette di trsformare i componenti nel loro codie nativo
export default function App() {
  // useState ci sono delle info che permettono di triggerare la ui dell'app, ridisegna le parti dell'app impattate da quello stato
  // utilizzo una memoria dei componenti, che li rende reattivi ai cambiamenti
  
  // [getter,setter] 
  // getter per leggere lo stato
  // setter per sovrascrivere lo stato
  const [messages, setMessages] = useState([
  {
    id : 1,
    content : 'Messaggio1',
    userName : 'Giorgia',
    date : 1779978453
  },
  {
    id : 2,
    content : 'Messaggio2',
    userName : 'Giorgia',
    date : 1779719253
  },
  {
    id : 3,
    content : 'Messaggio3',
    userName : 'Giorgia',
    date : 1779460053
  },
  {
    id : 4,
    content : 'Messaggio4',
    userName : 'Giorgia',
    date : 1779287253
  }
]);
  // messages legge lo stato 
  // useState restituisce un array, in cui la prima variabile è lo stato attuale e la seconda è il nuovo stato 
  // (che ci consente di ridisegnare l'array)

  function handleDelete(id) {
    // filter crea un nuovo array senza il messaggio con quel determinato id
    setMessages(messages.filter(messages => messages.id !== id));
  }

  const [newContent, setNewContent] = useState('');

    function createMessage(newContent) {
      const newMessage = {
        id: 5, 
        content: newContent,
        userName: 'Giorgia',
        date: 1779287253
      };
      setMessages([...messages, newMessage]); // spread operator permette di espandere un array già esistente con uno nuovo elemento
      setNewContent('');
    }


// chiamata all'api
// non prendo più dati arcodati ma provenienti dall'api
// usare useEffect
  const download = async() => {
    await axios.get(
  "http://localhost:8888/api/messages.php");
};


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

        <InputAndButton 
          buttonLabel='Invia' 
          inputLabel='Scrivi un nuovo messaggio' 
          onCreate={() => createMessage(newContent)}
          value={newContent}
          onChangeText={setNewContent}
        ></InputAndButton>

        
        <Button title='Scarica i messaggi' onPress={download}> </Button>


        <FlatList 
          style={styles.container}
          data={messages.reverse()} // array di dati da mostarre (inizializzato sopra)
          keyExtractor={(item) => item.id} // identificatore univoco per ogni riga
          renderItem={({item}) => ( // il componente da renderizzare per ogni elemento
            <Message
              id={item.id} deleteMessage={handleDelete}
              content={item.content}
              userName={item.userName}
              date={item.date}
              // viene passata la funzione al messaggio 
              // onDelete funzione creata da me per passare la funzione da un componente all'altro
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
