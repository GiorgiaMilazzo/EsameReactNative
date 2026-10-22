import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function InputAndButton({inputLabel, buttonLabel, onCreate, onChangeText}) {
    return (
        <View style={inputAndButton.boxInputAndButton}>
            <TextInput placeholder={inputLabel} style={inputAndButton.input} onChangeText={onChangeText}/>
            <View style={{borderRadius: 10, backgroundColor: 'pink'}}>
                <Button title={buttonLabel} color='white' onPress={onCreate}></Button>
            </View>
            
        </View>
    );
}

const inputAndButton = StyleSheet.create({
  boxInputAndButton: {
    flexDirection: 'column', 
    gap: 6, 
    alignItems: 'center',
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'pink',
    borderRadius: 5,
    padding: 8
  }
});