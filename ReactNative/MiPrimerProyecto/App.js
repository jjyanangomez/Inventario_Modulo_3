import { StatusBar } from 'expo-status-bar';
import { Alert, Button,StyleSheet, Text, View } from 'react-native';

export default function App() {
  const despedirse=()=>{
    Alert.alert("Mensaje","Adiosito");
  }
  return (
    <View style={styles.container}>
      <Text>Hola mundo:!</Text>
      <Text>Soy:Juan José Yanangomez Salinas</Text>
      <StatusBar style="auto" />
      <Button 
        title="OK"
        onPress={()=>{
          Alert.alert("Mensaje","Hola desde el botón");
        }}
      />
      <Button
        title="ADIOS"
        onPress={despedirse}
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
