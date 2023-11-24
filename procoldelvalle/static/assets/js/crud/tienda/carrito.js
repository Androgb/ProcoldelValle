if (document.querySelector('.deleteCarrito')) {
   //Añadimos el addEventListener
   const deleteBtns = document.querySelectorAll(".deleteCarrito")

   deleteBtns.forEach(btn => {
        btn.addEventListener("click", function(e){
            e.preventDefault()

            //Mostramos la alerta
            Swal.fire({
                title: '¿Desea eliminar el Producto del Carrito?',
                showDenyButton: true,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
                customClass: {
    				title: 'titleSwal',
  				},
            }).then((result) => {
                //Verifica la respuesta
                if (result.isConfirmed) {
              
                    //Elimina el trabajador
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto del Carrito Eliminado Correctamente!',
                        allowOutsideClick: false,
                    }).then((resulta) => {
                        if (resulta.isConfirmed) {
                            window.location.href = link;
                        }
                    });

                    let codigo;

                    if (e.target.nodeName === "DIV") {
                        codigo = e.target.parentNode.id;
                    }else{
                        codigo = e.target.id;
                    }
    
                    //Obtenemos el nombre del archivo HTML
                    const pathArray = window.location.pathname.split('/');
                    const url = pathArray[1]
    
                    //Mandamos el nombre por la url
    
                    let link = null;
    
                    link = '/eliminarCarrito/' + codigo + '/' + url;
                }
            })
        })
   });
}