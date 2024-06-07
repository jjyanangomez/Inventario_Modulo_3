import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title='Comp 1'
      />
      <Button
        title='Comp 2' color="green"
      />
      <Button
        title='Comp3'
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:"column",
    justifyContent:"space-between",// eje principal
    alignItems:"stretch"//eje secundario
  },
});
