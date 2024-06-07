import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';

export default function App() {
  const[valor1, setValor1]=useState("Ingrese el valor en dolares");
  const[valorConvertido, setValorConvertido]=useState(0.0);
  const[valorMuerto, setMuerto]=useState("");

  const convertirEnPesosMx = ()=>{
    let pesosMexicanos;
    pesosMexicanos = parseFloat(valor1) * 16.98;
    setValorConvertido(pesosMexicanos);
    setMuerto("Pesos mexicanos")
  }

  const convertirEnPesosColombianos = ()=>{
    let pesosColombianos;
    pesosColombianos = parseFloat(valor1) * 3914.00;
    setValorConvertido(pesosColombianos);
    setMuerto("Pesos colombianos")
  }
  const convertirEnEuros = ()=>{
    let euros;
    euros = parseFloat(valor1) * 0.93;
    setValorConvertido(euros);
    setMuerto("Euros")
  }
  return (
    <View style={styles.container}>
      <Text>Convertidor</Text>
      <TextInput 
        style={styles.cajaTexto}
        value={valor1}
        onChangeText={(txt)=>{
          setValor1(txt);
        }}
      />
      <Text>Equivalente: {valorConvertido} {valorMuerto}</Text>
      <Button
        title='PESOS MEXICANOS'
        onPress={convertirEnPesosMx}
      />
      <Button
        title='PESOS COLOMBIANOS'
        onPress={convertirEnPesosColombianos}
      />
      <Button
        title='EUROS'
        onPress={convertirEnEuros}
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
  },
});
