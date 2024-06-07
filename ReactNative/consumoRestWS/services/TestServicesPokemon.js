/// Servicios usando Pokeapi para sacar los pokemons
export const getAllPostsPokemons = () =>{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=5','GET')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(err => {
      console.err("Esto es un error"+err);
    });
}

//servicio para crear nuevo Producto en fakestoreapi
export const createPostProducto = () =>{
    const config={
        method:"POST",
        body:JSON.stringify({
            title: 'test product - Cell',
            price: 250.5,
            description: 'lorem ipsum set',
            image: 'https://dilipa.com.ec/4706-large_default/celular-infinix-note30-pro-8256-gb-dorado.jpg',
            category: 'electronic'
        }),
        headers:{
            'Content-type':'application/json'
        }
    }
    fetch('https://fakestoreapi.com/products',config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(err => {
      console.err("Esto es un error"+err);
    });
}
export const updatePostProducto = () =>{
    const config={
        method:"PUT",
        body:JSON.stringify({
            title: 'test product - Cell update',
            price: 250.5,
            description: 'lorem ipsum set',
            image: 'https://dilipa.com.ec/4706-large_default/celular-infinix-note30-pro-8256-gb-dorado.jpg',
            category: 'electronic'
        }),
        headers:{
            'Content-type':'application/json'
        }
    }
    fetch('https://fakestoreapi.com/products/21',config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(err => {
      console.err("Esto es un error"+err);
    });
}