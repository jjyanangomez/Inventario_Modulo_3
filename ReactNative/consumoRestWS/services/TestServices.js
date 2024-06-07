export const getAllPostsService = () =>{
    fetch('https://jsonplaceholder.typicode.com/posts','GET')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(err => {
      console.error("Esto es un error"+err);
    });
}
    
export const createPostService = (post,fnExito) =>{
    const config={
        method:"POST",
        body:JSON.stringify({
            userId: 1,
            title: post.title,
            body: post.body
        }),
        headers:{
            'Content-type':'application/json'
        }
    }
    fetch('https://jsonplaceholder.typicode.com/posts',config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      fnExito();
    })
    .catch(err => {
      console.error("Esto es un error"+err);
    });
}
export const updatePostService = () =>{
    const config={
        method:"PUT",
        body:JSON.stringify({
            id:1,
            userId: 1,
            title: "Mensaje Final",
            body: "Hasta la vista baby"
        }),
        headers:{
            'Content-type':'application/json'
        }
    }
    fetch('https://jsonplaceholder.typicode.com/posts/1',config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(err => {
      console.error("Esto es un error"+err);
    });
}

export const getByUserIdService = () =>{
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1','GET')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(err => {
      console.error("Esto es un error"+err);
    });
}
export const getDocumentTypes = () =>{
  fetch('http://192.168.3.5:8080/inventarios-1.0.0/rest/tipodocumentos/recuperar','GET')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
  })
  .catch(err => {
    console.error("Esto es un error"+err);
  });
}
export const createDocumentType = (post,fnExito) =>{
  const config={
      method:"POST",
      body:JSON.stringify({
        codigoDoc: post.title,
        descripcion: post.body
      }),
      headers:{
          'Content-type':'application/json'
      }
  }
  fetch('http://192.168.3.5:8080/inventarios-1.0.0/rest/tipodocumentos/crear',config)
  .then(response => {response.json()
    /*if(response.body!=null){
      response.json()
    }else{
      response.body;
    }*/
  })
  .then(data => {
    console.log({status:true, message:"Tipo de dato registrado"});
    fnExito();
  })
  .catch(err => {
    console.error("Esto es un error "+err);
  });
}