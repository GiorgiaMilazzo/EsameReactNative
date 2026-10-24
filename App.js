import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import ListOfMessages from './ListOfMessages';
import Login from './ui/Login';
import * as SecureStore from 'expo-secure-store';

export default function App() {

  // se token è null l'utente non è autenticato 
  const [token, setToken] = useState(null);

  async function saveToken(newToken) {
    // salvo il token nella memoria sicura del telefono
    // await vuol dire "aspetta che il salvataggio sia finito, poi vai avanti"
    // Si può usare solo dentro una funzione async
    await SecureStore.setItemAsync('token', newToken);
    console.log('token salvato', newToken);
    setToken(newToken);
  }

  // all'avvio leggo il token salvato (se c'è)
  useEffect(() => {
    SecureStore.getItemAsync('token').then((savedToken) => {
      console.log('token letto', savedToken);
      setToken(savedToken);
    });
  }, []); // [] array vuoto significa "non dipendo da niente, eseguimi solo una volta all'inizio"

  if(token){
    // passp il token alla lista, servirà per chiamare l'API
    return <ListOfMessages token={token} onLogout={logout}/>
  }else{
    // passo al Login la funzione per "avvisare" App che il login è andato bene
    return <Login onLogin={saveToken}></Login>
  }

  
// cancello il token salvato e torno al login
  async function logout() {
    await SecureStore.deleteItemAsync('token');
    setToken(null);
  }
  
}

// cosa succede all'avvio dell'App:
// 1. App parte con token = null, quindi disegna il Login
// 2. Subito dopo useEffect legge la memoria del telefono
// 3. Se trova un token chiama setToken, App si disegna e mostra i messaggi

