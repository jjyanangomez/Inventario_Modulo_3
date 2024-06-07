import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,FlatList,TextInput,Button, Alert } from 'react-native';

let personas=[
  {nombre:"Thor",apellido:"Thillas",cedula:"1106324796"},
  {nombre:"Amber",apellido:"Flores",cedula:"1103534798"},
  {nombre:"Peter",apellido:"Parker",cedula:"1105123468"},
]
//esNuevo indica si se esta creando una nueva persona o se esta modificando una existente
let esNuevo=true;
//almacena el indice del arreglo
let indiceSeleccionado = -1;
export default function App() {
  const [txtCedula,setTxtCedula] =useState();
  const [txtNombre,setTxtNombre] =useState();
  const [txtApellido,setTxtApellido] =useState();
  const [numeElementos,setNumeElementos] =useState();

  let ItemPersona=({indice,persona})=>{
    return(<View style={styles.itemPersona}>
      <View style={styles.itemIndice}>
        <Text>{indice}</Text>
      </View>
      <View style={styles.itemContenido}>
        <Text style={styles.textoPrincipal}>
          {persona.nombre} {persona.apellido}
          </Text>
        <Text style={styles.textoSecundario}>
          {persona.cedula}
          </Text>
      </View>
      <View style={styles.itemBotones}> 
        <Button
          title=' E '
          color="green"
          onPress={()=>{
            setTxtCedula(persona.cedula);
            setTxtNombre(persona.nombre);
            setTxtApellido(persona.apellido);
            esNuevo=false;
            indiceSeleccionado = indice;
          }}
        />
        <Button
          title=' X '
          color="red"
          onPress={()=>{
            indiceSeleccionado = indice;
            personas.splice(indiceSeleccionado,1);
            setNumeElementos(personas.length);
          }}
        />
      </View>
    </View>)
  }

  let limpiar=()=>{
    setTxtCedula(null);
    setTxtApellido(null);
    setTxtNombre(null);
    esNuevo=true;
  }
  let existePersona=()=>{
    for(let i=0;i<personas.length;i++){
      if(personas[i].cedula == txtCedula){
        return true;
      }
    }
    return false;
  }
  let guardarPersona=()=>{
    if(esNuevo){
      if(txtCedula==null || txtNombre==null || txtApellido==null){
        Alert.alert("INFO.","Los campos que desea ingresar estan en blanco");
        return;
      }else{
        if(existePersona()){
          Alert.alert("INFO.","Ya existe una persona con la cedula "+txtCedula);
          return;
        }else{
          let persona={nombre:txtNombre,apellido:txtApellido,cedula:txtCedula};
          personas.push(persona);
        }
      }      
    }else{
      personas[indiceSeleccionado].nombre=txtNombre;
      personas[indiceSeleccionado].apellido=txtApellido;
    }
    limpiar();
    setNumeElementos(personas.length);
  }
  return (
    <View style={styles.container}>
      <View style={styles.areaCabecera}>
        <Text>PERSONAS</Text>
        <TextInput
          style={styles.txt}
          value={txtCedula}
          placeholder='Ingrese su Cedula'
          onChangeText={setTxtCedula}
          keyboardType='numeric'
          editable={esNuevo}
        />
        <TextInput
          style={styles.txt}
          value={txtNombre}
          placeholder='Ingrese su Nombre'
          onChangeText={setTxtNombre}
        />
        <TextInput
          style={styles.txt}
          value={txtApellido}
          placeholder='Ingrese su Apellido'
          onChangeText={setTxtApellido}
        />
        <View style={styles.areaBotones}>  
          <Button
            title='Guardar'
            onPress={guardarPersona}
          />
          <Button
            title='Nuevo'
            onPress={()=>{
              limpiar();
            }}
          />
        </View>
      </View>
      <Text>Elementos: {numeElementos}</Text>
      <View style={styles.areaContenido}>
        <FlatList style={styles.lista}
          data={personas}
          renderItem={({index,item})=>{
            return <ItemPersona indice={index} persona={item}/>;
          }}
          //Destructurin
          /*renderItem={(obj)=>{
            return <ItemPersona indice={obj.index} persona={obj.item}/>;
          }} */
          keyExtractor={item=>item.cedula}
          /* keyExtractor={(item)=>{
            return item.cedula}}*/
        />
      </View>
      <View style={styles.areaPie}>
        <Text>Autor: Juan Yanangomez</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'lightblue',
    flexDirection:"column",//eje principal vertical
    justifyContent: 'flex-start',
    alignItems:"stretch",
    paddingTop:50,
    paddingHorizontal:10
  },
  lista:{
    //backgroundColor:"lightpink"
  },
  itemPersona:{
    backgroundColor:"lemonchiffon",
    marginBottom:10,
    padding:10,
    flexDirection:"row"
  },
  textoPrincipal:{
    fontSize:20
  },
  textoSecundario:{
    fontStyle:"italic"
  },
  areaCabecera:{
    flex:4,
 //   backgroundColor:"chartreuse",
    justifyContent:"center"
  },
  areaContenido:{
    flex:6,
  //  backgroundColor:"coral",
  },
  areaPie:{
    flex:1,
    //backgroundColor:"cornflowerblue",
    justifyContent:"center",
    alignItems:"flex-end"
  },
  itemIndice:{
    //backgroundColor:"darkgray",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  itemContenido:{
    //backgroundColor:"darkorange",
    flex:8,
    paddingLeft:5
  },
  itemBotones:{
    flex:2,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  txt:{
    borderWidth:1,
    borderColor:"gray",
    paddingTop:3,
    paddingHorizontal:5,
    backgroundColor:"#fff",
    marginBottom:5
  },
  areaBotones:{
    flexDirection:"row",
    justifyContent:"space-evenly"
  }
});
