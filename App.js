import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import ListOfMessages from './ListOfMessages';
import Login from './ui/Login';

const auth = false;

export default function App() {

  if(auth){
    <ListOfMessages></ListOfMessages>
  }else{
    <Login></Login>
  }
  
}


