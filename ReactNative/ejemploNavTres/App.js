import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import {Home} from "./app/screens/HomeScreen"
import {Contacts} from "./app/screens/ContactsScreen"
import {Products} from "./app/screens/ProductsScreen"
import {ContenidoA} from "./app/screens/ContenidoA"
import {ContenidoB} from "./app/screens/ContenidoB"
import { Login } from './app/screens/Login';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNav=()=>{
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="HomeNav" component={Home} options={{title:"Home"}}/>
      <Drawer.Screen name="ConstactsNav" component={TabNav} options={{title:"Contacts"}}/>
      <Drawer.Screen name="ProductsNav" component={StackNav} options={{title:"Login",headerShown:false}}/>
    </Drawer.Navigator>
  )
}
const StackNav =()=>{
  return(
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ConstactsNavTab" component={Contacts}/>
        <Stack.Screen name="ProductsNavTab" component={Products} />
    </Stack.Navigator>
  )
}
const TabNav=()=>{
  return(
    <Tab.Navigator>
      <Tab.Screen name="TabContenidoA" component={ContenidoA} 
      options={{
        headerShown:false,
        tabBarLabel:"Configuracion",
        tabBarIcon:()=>{
          return  <Icon name='tool' type='ant-design' color='blue'size={24} />
        }
        }}/>
      <Tab.Screen name="TabContenidoB" component={ContenidoB} 
      options={{
        headerShown:false,
        tabBarLabel:"Configuracion",
        tabBarIcon:()=>{
          return  <Icon name='mail' type='ant-design' color='blue'size={24} />
        }
      }}
        
      />
    </Tab.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <DrawerNav/>
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
