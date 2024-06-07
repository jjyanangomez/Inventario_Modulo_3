import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.contenedor2}>
      </View>
      <View style={styles.contenedor3}>
        <View style={styles.subcontenedor1}>
        </View>
        <View style={styles.subcontenedor2}>
          <View style={styles.contenedor4}>
          </View>
          <View style={styles.contenedor5}>
              <Button title='btn 1'/>
              <Button title='btn 2'/>
              <Button title='btn 3'/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    flexDirection:"column"
  },
  contenedor2:{
    flex:1,
    backgroundColor:"blue",
    flexDirection:"column"
  },
  contenedor3:{
    flex:3,
    backgroundColor:"green",
    flexDirection:"column"
  },
  subcontenedor1:{
    flex:1,
    backgroundColor:"yellow",
    flexDirection:"column"
  },
  subcontenedor2:{
    flex:1,
    backgroundColor:"white",
    flexDirection:"row"
  },
  contenedor4:{
    flex:1,
    backgroundColor:"pink",
    flexDirection:"column"
  },
  contenedor5:{
    flex:2,
    backgroundColor:"purple",
    flexDirection:"column",//eje principal(vertical)
    justifyContent:"space-around",//centrado vertical (eje principal)
    alignItems:"center" //ocupa todo el espacio horizontal (eje secundario)
  },
});
