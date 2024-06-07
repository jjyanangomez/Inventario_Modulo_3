import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable,Modal,StyleSheet, Text, View,FlatList,Button,TextInput,Alert,ScrollView,TouchableOpacity  } from 'react-native';
let productos=[
  {nombre:"Doritos",categoria:"Snacks",precioCompra:0.40,precioVenta:0.45,id:100},
  {nombre:"Manicho",categoria:"Golosinas",precioCompra:0.20,precioVenta:0.25,id:101},
  {nombre:"Papas Ruffles",categoria:"Snacks",precioCompra:0.50,precioVenta:0.60,id:102},
  {nombre:"Galac",categoria:"Golosinas",precioCompra:0.20,precioVenta:0.25,id:103},
  {nombre:"Lays",categoria:"Snacks",precioCompra:0.40,precioVenta:0.45,id:104},
  
]; 
let esNuevo=true;
let indiceSeleccionado = -1;
export default function App() {
  const [txtCodigo,setTxtCodigo] =useState();
  const [txtNombre,setTxtNombre] =useState();
  const [txtCategoria,setTxtCategoria] =useState();
  const [txtPrecioCompra,setTxtPrecioCompra] =useState();
  const [txtPrecioVenta,setTxtPrecioVenta] =useState();
  const [numeElementos,setNumeElementos] =useState(productos.length);

  const [modalVisible, setModalVisible] = useState(false);

  let ItemProductos=({indice,item})=>{
    return(<View style={styles.itemsProductos}>
      <View style={styles.itemIndice}>
        <Text >{ item.id}</Text>
      </View>
      <View style={styles.itemContenido}>
        <Text style={styles.textoPrincipal}>{ item.nombre}</Text>
        <Text style={styles.textoSubPrincipal}>{ item.categoria}</Text>
      </View>
      <View style={styles.itemPrecio}>
        <Text style={styles.textoSecundario}>{ item.precioVenta}</Text>
      </View>
      <View style={styles.itemBotones}> 
        <TouchableOpacity style={styles.button} onPress={()=>{
            setTxtCodigo( item.id.toString());
            setTxtNombre( item.nombre);
            setTxtCategoria( item.categoria);
            setTxtPrecioCompra( item.precioCompra.toString());
            setTxtPrecioVenta( item.precioVenta.toString());
            esNuevo=false;
            indiceSeleccionado =  indice;
          }}>
          <Text style={styles.textoButton}> E </Text>
        </TouchableOpacity>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() =>{setModalVisible(true);indiceSeleccionado =  indice;}}>
          <Text style={styles.textStyle}> X </Text>
        </Pressable>
      </View>
    </View>);
  }

  let limpiar=()=>{
    setTxtCodigo(null);
    setTxtCategoria(null);
    setTxtNombre(null);
    setTxtPrecioCompra(null);
    setTxtPrecioCompra(null);
    setTxtPrecioVenta(null);
    esNuevo=true;
  }
  let existeProducto=()=>{
    for(let i=0;i<productos.length;i++){
      if(productos[i].id == txtCodigo){
        return true;
      }
    }
    return false;
  }
  let guardarProducto=()=>{
    if(esNuevo){
      if(txtCodigo==null || txtNombre==null || txtCategoria==null 
        || txtPrecioCompra==null || txtPrecioVenta==null){
        Alert.alert("INFO.","Los campos que desea ingresar estan en blanco");
        return;
      }else{
        if(existeProducto()){
          Alert.alert("INFO.","Ya existe un producto con ese código "+txtCodigo);
          return;
        }else{
          let producto={nombre:txtNombre,categoria:txtCategoria,
            precioCompra:parseFloat(txtPrecioCompra),precioVenta:parseFloat(txtPrecioVenta),id:parseInt(txtCodigo)};
          productos.push(producto);
        }
      }      
    }else{
      productos[indiceSeleccionado].nombre=txtNombre;
      productos[indiceSeleccionado].categoria=txtCategoria;
      productos[indiceSeleccionado].precioCompra=parseFloat(txtPrecioCompra);
      productos[indiceSeleccionado].precioVenta=parseFloat(txtPrecioVenta);
    }
    limpiar();
    setNumeElementos(productos.length);
  }
  return (
    <View style={styles.container}>
      <View style={styles.areaCabecera}>
        <ScrollView>
          <Text style={styles.textoInicio}>Productos</Text>
          <TextInput
            style={styles.txt}
            value={txtCodigo}
            placeholder='Código'
            onChangeText={setTxtCodigo}
            keyboardType='numeric'
            editable={esNuevo}
          />
          <TextInput
            style={styles.txt}
            value={txtNombre}
            placeholder='Nombre'
            onChangeText={setTxtNombre}
          />
          <TextInput
            style={styles.txt}
            value={txtCategoria}
            placeholder='Categoria'
            onChangeText={setTxtCategoria}
          />
          <TextInput
            style={styles.txt}
            value={txtPrecioCompra}
            placeholder='Precio de compra'
            onChangeText={(aux)=>{
              setTxtPrecioCompra(aux);
              let compra = parseFloat(aux);
              let valor = compra*0.2;
              let result = compra+valor;
              setTxtPrecioVenta(result.toFixed(2).toString());
            } }
            keyboardType='numeric'
          />
          <TextInput
            style={styles.txt}
            value={txtPrecioVenta}
            placeholder='Precio de venta'
            keyboardType='numeric'
            editable={false}
          />
          <View style={styles.areaBotones}>
            <Button
              title='Nuevo'
              onPress={()=>{
                limpiar();
              }}
            />  
            <Button
              title='Guardar'
              onPress={guardarProducto}
            />
            <Text>Elementos: {numeElementos}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.areaContenido}>
        <FlatList style={styles.lista}
          data={productos}
          renderItem={(obj)=>{
            return  <ItemProductos indice={obj.index} item={obj.item}/>;
          }}
          keyExtractor={(item)=>{
            return item.id
          }}
        />
      </View>
      <View style={styles.areaPie}>
        <Text>Autor: Juan Yanangomez</Text>
      </View>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Está seguro que quiere eliminar</Text>
            <View style={styles.areaModalBotones}>
              <Button
                color="red"
                title=' Aceptar '
                onPress={() =>{
                  productos.splice(indiceSeleccionado,1);
                  setNumeElementos(productos.length);
                  limpiar();
                  setModalVisible(!modalVisible)
                }}
              />
              <Button
                style={styles.buttonClose}
                title=' Cancelar '
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems:"stretch",
    paddingTop:50,
    paddingHorizontal:10
  },
  itemsProductos:{
    backgroundColor:"lightgreen",
    marginBottom:10,
    padding:5,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection:"row"
  },
  itemIndice:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  itemContenido:{
    flex:6,
    paddingLeft:5
  },
  itemPrecio:{
    flex:2,
    justifyContent:"center",
    alignItems:"center"
  },
  itemBotones:{
    flex:2,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  textoPrincipal:{
    fontSize:20,
    fontWeight: 'bold'
  },
  textoSubPrincipal:{
    fontSize:20,
  },
  textoSecundario:{
    fontStyle:"italic",
    fontSize:20,
    fontWeight: 'bold'
  },
  textoInicio:{
    fontSize:20,
    paddingHorizontal:10,
    fontWeight: 'bold',
    paddingBottom:10
  },
  areaCabecera:{
    flex:4,
    justifyContent:"center"
  },
  areaContenido:{
    flex:5,
  },
  areaPie:{
    flex:1,
    justifyContent:"center",
    alignItems:"flex-end"
  },
  areaBotones:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    padding:10
  },
  txt:{
    borderWidth:1,
    borderColor:"gray",
    paddingTop:3,
    paddingHorizontal:5,
    backgroundColor:"#fff",
    marginBottom:5,
    borderRadius: 10,
    borderWidth: 2,
  },
  button:{
    padding:8,
    backgroundColor:"blue",
  },
  textoButton:{
    color:"#fff",
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  areaModalBotones:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  }
});
