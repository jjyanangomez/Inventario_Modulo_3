import { Button,StyleSheet, Text, View } from 'react-native';

export const Home=({navigation})=>{
    return <View style={styles.container}>
        <Text>Home</Text>
        <View style={styles.areaBotones}>
        <Button
            title='Ir a Contacts'
            onPress={()=>{
                navigation.navigate("ConstactsNav");
            }}
        />
        <Button
            title='Ir a Login'
            onPress={()=>{
                navigation.navigate("ProductsNav");
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