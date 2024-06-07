import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.contenedor2}>
        <Button title='X'/>
        <Button title='Y'/>
        <Button title='Z'/>
      </View>
      <View style={styles.contenedor3}>
        <View style={styles.SubContenedor31}>
          <View style={styles.SubContenedor311}>
            <Button title='BOTON 1'/>
            <Button title='BOTON 2'/>
          </View>
          <View style={styles.SubContenedor312}>
            <Button title='OPERACION 1'/>
            <Button title='OPERACION 2'/>
            <Button title='OPERACION 3'/>
          </View>
        </View>
        <View style={styles.SubContenedor32}>
        <Button title='ACCION 1'/>
        <Button title='ACCION 2'/>
        </View>
      </View>
      <View style={styles.contenedor4}>
        <Button title='BOTON FINAL'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  contenedor2:{
    flex:1,
    backgroundColor:"#33ffec",
    flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"center"
  },
  contenedor3:{
    flex:6,
    backgroundColor:"green",
    flexDirection:"column"
  },
  contenedor4:{
    flex:1,
    backgroundColor:"orange",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  SubContenedor31:{
    flex:4,
    backgroundColor:"purple",
    flexDirection:"row"
  },
  SubContenedor32:{
    flex:1,
    backgroundColor:"blue",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"flex-end"
  },
  SubContenedor311:{
    flex:1,
    backgroundColor:"yellow",
    flexDirection:"column",
    justifyContent:"space-evenly",
    alignItems:"stretch"
  },
  SubContenedor312:{
    flex:1,
    backgroundColor:"white",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"flex-start"
  },
});
