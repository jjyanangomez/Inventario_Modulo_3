
import { Button, StyleSheet, Text, View, } from 'react-native';

export const ContenidoA=({navigation})=>{
    return <View style={styles.container}>
        <Text>Contenido A</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:"stretch",
      justifyContent:"center"
    },
  });