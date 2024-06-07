
import { Button, StyleSheet, Text, View, } from 'react-native';

export const Login=({navigation})=>{
    return <View style={styles.container}>
        <Text>Estoy en el Login</Text>
        <View style={styles.areaBotones}>
            <Button
                title='Ir a Home'
                onPress={()=>{
                    navigation.navigate("HomeNav");
                }}
            />
            <Button
                title='Ir a Products'
                onPress={()=>{
                    navigation.navigate("ProductsNavTab");
                }}
            />
        </View>
            
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    areaBotones:{
        flexDirection:"row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20
    }
  });