/*recuperarTexto=function(idComponente){
    let cmpTexto;
    let valor;
    cmpTexto=document.getElementById(idComponente);
    valor=cmpTexto.value;
    return valor;
}*/
recuperarTexto=(idComponente)=>{
    let cmpTexto;
    let valor;
    cmpTexto=document.getElementById(idComponente);
    valor=cmpTexto.value;
    return valor;
}
recuperarEntero=(idComponente)=>{
    let valor;
    let valorEntero;
    valor=recuperarTexto(idComponente);
    valorEntero=parseInt(valor);
    return valorEntero;
}
////Funcion para recuperar y transformar a float
recuperarFloat=(idComponente)=>{
    let valor;
    let valorFloat;
    valor=recuperarTexto(idComponente);
    valorFloat=parseFloat(valor);
    return valorFloat;
}