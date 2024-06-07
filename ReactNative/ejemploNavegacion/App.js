import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {Home} from "./app/screens/HomeScreen"
import {Contacts} from "./app/screens/ContactsScreen"
import {Products} from "./app/screens/ProductsScreen"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeNav" component={Home} />
        <Stack.Screen name="ConstactsNav" component={Contacts} />
        <Stack.Screen name="ProductsNav" component={Products} />
      </Stack.Navigator>
    </NavigationContainer>
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
