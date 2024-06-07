import { StyleSheet, Text, View } from 'react-native';
import { Button,Icon,Input } from '@rneui/base';
import { useState } from 'react';
import {saveGrade,updateGrade } from '../services/GradeServices'

export const GradeFrom=({navigation,route})=> {
    let isNew = true;
    let subjectR;
    let gradeR;
    if(route.params.notita!=null){
        isNew=false;
    }
    if(!isNew){
        subjectR=route.params.notita.subject;
        gradeR=route.params.notita.grade;
    }
    const [subject,setSubject] =useState(subjectR);
    const [grade,setGrade] =useState(gradeR==null?null:gradeR+"");
    const [errorSubject,setErrorSubject] =useState();
    const [errorGrade,setErrorGrade] =useState();
    let hasError = false;
    

    
    const save =()=>{
        setErrorSubject(null);
        setErrorGrade(null);
        validate();
        if(!hasError){
            if(isNew){
                saveGrade({subject:subject,grade:parseFloat(grade)});
            }else{
                updateGrade({subject:subject,grade:parseFloat(grade)});
            }
            navigation.goBack();
            route.params.fnRefresh();
        }
    }
    const validate=()=>{
        if(subject==null || subject==""){
            setErrorSubject("Debe ingresar una materia");
            hasError=true;
        }
        let gradeFloat = parseFloat(grade);
        if(gradeFloat==null || isNaN(gradeFloat) || gradeFloat<0 || gradeFloat>10){
            setErrorGrade("Debe ingresar una nota entre 0 y 10")
            hasError=true;
        }
    }
    return (
        <View style={styles.container}>
            <Text>Formulario de notas</Text>
            <Input
                value={subject}
                placeholder='Ejemplo: Matemática'
                label="Materia"
                onChangeText={setSubject}
                errorMessage={errorSubject}
                disabled={!isNew}
            />
            <Input
                value={grade}
                placeholder='0 - 10'
                label="Nota"
                onChangeText={setGrade}
                errorMessage={errorGrade}
            />
            <Button
                title="Guardar"
                icon={{
                    name: 'save',
                    type: 'entypo',
                    size: 15,
                    color: 'white',
                }}
                onPress={save}
                buttonStyle={styles.saveButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton:{
    backgroundColor:"green"
  }
});