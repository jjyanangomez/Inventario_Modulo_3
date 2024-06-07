sumar=(sum1,sum2)=>{
    let resultado;
    resultado = sum1+sum2;
    return resultado
}
////Funciones para restar
restar=(res1,res2)=>{
    let resultado;
    resultado = res1-res2;
    return resultado
}
ejecutarOperacion=(operar)=>{
    let valor1 =recuperarEntero("txtValor1");
    let valor2 =recuperarEntero("txtValor2");
    let resultado;
    resultado = operar(valor1,valor2);
    console.log(resultado);
}

ejecutar =(fn)=>{
    console.log("Estoy ejecutando funciones");
    fn();
}

imprimir=()=>{
    console.log("Estoy imprimiendo");
}

saludar=()=>{
    alert("aprendiendo programación funcional");
}

testEjecutar=()=>{
    ejecutar(imprimir);
    ejecutar(()=>{
        alert("soy una función anonima(sin nombre)");
    });
}

