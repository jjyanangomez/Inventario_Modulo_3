
import { Button, StyleSheet, Text, View, } from 'react-native';

export const Products=({navigation})=>{
    return <View style={styles.container}>
        <Text>Products</Text>
            <Button
                title='Ir a Login'
                onPress={()=>{
                    navigation.navigate("Login");
                }}
            />
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });