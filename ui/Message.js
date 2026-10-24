import { StyleSheet, View, Text, Button} from 'react-native';

export default function Message({content, date}) {

    return (
        <View style={message.boxMessage}>
            <Text>{content}</Text>
            <Text>{date}</Text>
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