


/*agregar productos desde mockapi*/
  export const agregarProducto = async (producto) => {
    return new Promise(async (res,rej) => {
        
        try {
          const respuesta = await fetch('https://682e9336746f8ca4a47d86df.mockapi.io/Productos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
          });
    
          if (!respuesta.ok) {
            throw new Error('Error al agregar el producto.');
          }
          const data = await respuesta.json();

          //dispararAlerta('Producto agregado correctamente',"", "success", "Ok" );
          res(data);
        } catch (error) {
          console.error(error.message);
        //   alert('Hubo un problema al agregar el producto.');
            rej('Hubo un problema al agregar el producto.');
        }
    })
  };