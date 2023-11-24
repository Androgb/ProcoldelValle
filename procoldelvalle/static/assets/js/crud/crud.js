const deleteButtons = document.querySelectorAll('.delete')

deleteButtons.forEach(btn => {
    btn.addEventListener('click', deleteUser)
});

//Funcion que muestra el mensaje de eliminar el usuario

function deleteUser(e) {
	//Mostramos la alerta
	Swal.fire({
		title: '¿Desea eliminar el Registro de ' + pagina + '?',
		showDenyButton: true,
		confirmButtonText: 'Eliminar',
		denyButtonText: `Cancelar`,
	  }).then((result) => {
		//Verifica la respuesta
		if (result.isConfirmed) {
		  
			//Elimina el trabajador
			Swal.fire({
				icon: 'success',
				title: 'Registro Eliminado Correctamente!',
				allowOutsideClick: false,
			  }).then((resulta) => {
				if (resulta.isConfirmed) {
					window.location.href = link;
				}
			  });

            let codigo;

			if (e.target.nodeName === "A") {
				codigo = e.target.id;
			}else{
				codigo = e.target.parentNode.id;
			}

			//Obtenemos el nombre del archivo HTML
			const pathArray = window.location.pathname.split('/');
			const url = pathArray[1]

			//Mandamos el nombre por la url

			let link = null;
			
			//Asigna el valor del enlace
			if (pagina === "Bodega") {
				link = '/eliminarBodega/' + codigo + '/' + url;
			}else if (pagina === "Trabajadores") {
				link = '/eliminarTrabajador/' + codigo + '/' + url;
			}else if (pagina === "Productos") {
				link = '/eliminarProducto/' + codigo + '/' + url;
			}else if (pagina === "Proveedores") {
				link = '/eliminarProveedor/' + codigo + '/' + url;
			}else if (pagina === "Categorias") {
				link = '/eliminarCategoria/' + codigo + '/' + url;
			}else if (pagina === "Ventas") {
				link = '/eliminarVenta/' + codigo + '/' + url;
			}else if (pagina === "Cajas") {
				link = '/eliminarCaja/' + codigo + '/' + url;
			}else if (pagina === "Compras") {
				link = '/eliminarCompra/' + codigo + '/' + url;
			}else if (pagina === "Movimientos") {
				link = '/eliminarMovimientos/' + codigo + '/' + url;
			}

		}
	  })
}