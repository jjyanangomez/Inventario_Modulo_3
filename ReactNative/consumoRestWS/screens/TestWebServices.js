import { View, StyleSheet } from 'react-native'
import { Button, Text } from '@rneui/base'
import { useEffect, useState } from 'react';
import {getAllPostsService,createPostService,updatePostService,getByUserIdService,getDocumentTypes} from '../services/TestServices'
import {getAllPostsPokemons,createPostProducto,updatePostProducto} from '../services/TestServicesPokemon'

export const TestWebServices = () => {
  const [resultado, SetResultado] = useState([]);
  const getAllPosts=()=>{
    getAllPostsService();
  }
  const createPosts=()=>{
    createPostService();
  }
  const updatePosts=()=>{
    updatePostService();
  }
  const getByUserId=()=>{
    getByUserIdService();
  }
  //NUevo
  const getAllPokemons=()=>{
    getAllPostsPokemons();
  }
  const createProducto=()=>{
    createPostProducto();
  }
  const updateProducto=()=>{
    updatePostProducto();
  }
  //
  const getAllDocument=()=>{
    getDocumentTypes();
  }
  return <View style={styles.container}>
    <Text style={styles.textContainer}>MODULO 3- Juan Yanangomez</Text>
    <View style={styles.buttonContainer}>
      <Button
        title="Recuperar Posts"
        onPress={
          getAllPosts
        }
      />
      <Button
        title="Crear Post"
        onPress={
          createPosts
        }
      />
        <Button
        title="Actualizar Post"
        onPress={
          updatePosts
        }
      />
        <Button
        title="Filtrar"
        onPress={
          getByUserId
        }
      />
          <Button
        title="XXX"
        onPress={
          getAllPokemons
        }
      />

      <Button
        title="YYY"
        onPress={
          createProducto
        }
      />

      <Button
        title="ZZZ"
        onPress={
          updateProducto
        }
      />
      
      <Button
        title="Tipos de Documentos"
        onPress={
          getAllDocument
        }
      />
    </View>
  </View>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10
  },
  buttonContainer: {
    flex: 6,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    marginHorizontal:10

  }
});