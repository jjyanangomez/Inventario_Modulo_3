import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';

export default function App() {
  const[valor1, setValor1]=useState("Ingrese el valor 1");
  const[valor2, setValor2]=useState("Ingrese el valor 2");
  const[resultado, setResultado]=useState(0);

  const sumar=()=>{
    let result = parseInt(valor1)+parseInt(valor2);
    setResultado(result);
  }
  const restar=()=>{
    let result = parseInt(valor1)-parseInt(valor2);
    setResultado(result);
  }
  const multiplicar=()=>{
    let result = parseInt(valor1)*parseInt(valor2);
    setResultado(result);
  }
  return (
    <View style={styles.container}>
      <Text>Calculadora</Text>

      <TextInput 
        style={styles.cajaTexto}
        value={valor1}
        onChangeText={(txt)=>{
          setValor1(txt);
        }}
      />
      <TextInput 
        style={styles.cajaTexto}
        value={valor2}
        onChangeText={(txt)=>{
          setValor2(txt);
        }}
      />
      <Text>Resultado: {resultado} </Text>
      <Button
        title='SUMAR'
        onPress={sumar}
      />
      <Button
        title='RESTAR'
        onPress={restar}
      />
      <Button
        title='MULTIPLICAR'
        onPress={multiplicar}
      />
      <StatusBar style="auto" />
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
  cajaTexto:{
    borderColor:"black",
    borderWidth:1,
    paddingTop: 5,
    paddingHorizontal:10
  }
});
