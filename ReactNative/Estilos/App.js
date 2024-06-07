import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>EJEMPLO MARGIN</Text>
      <TextInput
        style={styles.caja}
        value={nombre}
        onChangeText={setNombre}
        placeholder='Ingrese su nombre'
      />
      <TextInput
        style={styles.caja}
        value={apellido}
        onChangeText={setApellido}
        placeholder='Ingrese su Apellido'
      />
      <Button
        title='OK'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:"column",//eje principal
    justifyContent:"center",//verical
    alignItems:"stretch",//horizontal
    paddingHorizontal:10
  },
  caja:{
    borderColor:"gray",
    borderWidth:1,
    paddingTop:5,
    paddingHorizontal:10,
    marginBottom:10
  },
  titulo:{
    fontSize:14,
    marginBottom:10,
    fontWeight:"bold",
  }
});
