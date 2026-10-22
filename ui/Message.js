import { StyleSheet, View, Text, Button} from 'react-native';

export default function Message({id, deleteMessage, content, userName, date, onDelete}) {

  const dateReadable = new Date(date * 1000).toLocaleDateString('it-IT');
    return (
        <View style={message.boxMessage}>
            <Text style={{fontWeight: 'bold'}}>{userName}</Text>
            <Text>{content}</Text>
            <Text>{dateReadable}</Text>
            <Button title='Elimina' onPress={() => deleteMessage(id)}> </Button>
        </View>
    );
}

const message = StyleSheet.create({
  boxMessage: {
    flexDirection: 'colomn', 
    gap: 6, 
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'pink',
    padding: 10
  },
});