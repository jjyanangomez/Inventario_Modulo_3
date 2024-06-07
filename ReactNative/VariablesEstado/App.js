import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, Alert } from 'react-native';

export default function App() {
  /*const arreglo=useState(0);
  const contadorEstado=arreglo[0];
  const setContadorEstado=arreglo[1];*/

  const[contadorEstado,setContadorEstado]=useState(0);

  const[vidas,setVidas]=useState(5);

  const incrementar =()=>{
    setContadorEstado(contadorEstado+1);
  }
  const decrementar =()=>{
    setContadorEstado(contadorEstado-1);
  }
  const restarVidas =()=>{
    if(vidas>0){
      setVidas(vidas-1);
    }else{
      Alert.alert("ADVERTENCIA","GAME OVER");
    }
  }
  return (
    <View style={styles.container}>
      <Text>Variables de estado</Text>
      <Text>CONTADOR ESTADO: {contadorEstado} </Text>
      <StatusBar style="auto" />
      <Button
        title='Incrementar'
        onPress={incrementar}
      />
      <Button
        title='Decrementar'
        onPress={decrementar}
      />
      <Text>VIDA: {vidas} </Text>
      <Button
        title='PERDER VIDA'
        onPress={restarVidas}
      />
      <Button
        title='PREMIAR'
        onPress={()=>{
          setVidas(vidas+3);
        }}
      />
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
