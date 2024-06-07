import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Alert } from 'react-native';

import { Button,Icon,Input,ListItem,Avatar } from '@rneui/themed';
import { useState } from 'react';

export default function App() {
  const [txtNombre,setTxtNombre] =useState();
  return (
    <View style={styles.container}>
      <Text>Hello Word
      </Text>
      <Input
        value={txtNombre}
        placeholder='Ingrese su Nombre'
        onChangeText={setTxtNombre}
      />
      <Text>{txtNombre}</Text>
      <Button color="error"
        icon={{
          name: 'heartbeat',
          type: 'font-awesome',
          size: 15,
          color: 'white',
        }}
      >Error</Button>
      <Button
        title="Ok"
        icon={{
          name: 'email',
          type: 'Fontisto',
          size: 15,
          color: 'white',
        }}
        onPress={()=>{
          Alert.alert("Info:", "Su nombre es "+txtNombre);
        }}
      />
      <Icon name="user" type='font-awesome' size={25} color="#000000" />
      <ListItem bottomDivider>
    <Avatar
      rounded
      source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
    />
    <ListItem.Content>
      <ListItem.Title>John Doe</ListItem.Title>
      <ListItem.Subtitle>President</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
