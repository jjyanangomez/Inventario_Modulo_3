import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, SetResultado] = useState(0.0);
  const [mensaje, setMensaje] = useState("");
  const calcular=()=>{
    let estaturaMetros = parseInt(estatura)/100;
    let pesoF = parseFloat(peso);
    let resultadoIMC = pesoF/(estaturaMetros*estaturaMetros);
    SetResultado(resultadoIMC);
    if(resultadoIMC<18.5){
      setMensaje("Con Peso inferior al normal");
    }else if(resultadoIMC>=18.5 && resultadoIMC<=24.9){
      setMensaje("Con Peso normal");
    }else if(resultadoIMC>=25.0 && resultadoIMC<=29.9){
      setMensaje("Con Peso superior al normal");
    }else{
      setMensaje("Con Obesidad");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>
      <TextInput
        style={styles.caja}
        value={estatura}
        onChangeText={setEstatura}
        placeholder='Ingrese su estatura(cm)'
      />
      <TextInput
        style={styles.caja}
        value={peso}
        onChangeText={setPeso}
        placeholder='Ingrese su peso(Kg)'
      />
      <Button
        title='OK'
        onPress={calcular}
      />
      <Text>Resultado:{resultado.toFixed(2)} {mensaje}</Text>
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
    paddingHorizontal:150
  }
});

