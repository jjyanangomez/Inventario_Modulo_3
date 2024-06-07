
import { Button, StyleSheet, Text, View, } from 'react-native';

export const Contacts=({navigation})=>{
    return <View style={styles.container}>
        <Text>Estoy en Contacts</Text>
            <Button
                title='Ir a Home'
                onPress={()=>{
                    navigation.navigate("HomeNav");
                }}
            />
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });