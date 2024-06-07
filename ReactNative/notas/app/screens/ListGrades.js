
import { StyleSheet, Text, View,FlatList,TouchableHighlight } from 'react-native';
import {GetGrades} from '../services/GradeServices';
import {FAB,ListItem,Avatar } from '@rneui/base';
import React,{ useState,useEffect  } from 'react';
//import { useFocusEffect } from '@react-navigation/native';

export const ListGrades=({navigation})=> {
  const [grades, setGrades] = useState([]);
  const [time, setTime] = useState([]);
  const refreshList=()=>{
    setTime(new Date().getTime());
  }
  /*useFocusEffect(
        React.useCallback(() => {
            // Función para cargar los grados
            const loadGrades = async () => {
                const gradesData = await GetGrades();
                setGrades(gradesData);
            };

            loadGrades();

            return () => setGrades([]);
        }, [])
    );*/
    const ItemGrades=({nota})=>{
        return <TouchableHighlight 
          onPress={()=>{
            navigation.navigate("GradeFromNav",{notita:nota,fnRefresh:refreshList});
          }}>
          <ListItem bottomDivider>
              <Avatar
              title={nota.subject.substring(0,1)}
                rounded
                containerStyle={{backgroundColor:"green"}}
              />
              <ListItem.Content>
                <ListItem.Title>{nota.subject}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <ListItem.Subtitle>{nota.grade}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="green" />
          </ListItem >
        </TouchableHighlight>
    }
  return (
    <View style={styles.container}>
        <FlatList
            data={GetGrades()}
            renderItem={({item})=>{
                return <ItemGrades nota={item}/>
            }}
            keyExtractor={(item)=>{return item.subject}}
            extraData={time}
        />
        <FAB
            title="+"
            placement='right'
            onPress={()=>{
                navigation.navigate("GradeFromNav",{notita:null,fnRefresh:refreshList});
            }}
        
        /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});