//Campos formulario de actualizar datos
const formUpdate = document.getElementById("form")

const nombreCompleto = document.getElementById('nombreCompleto')
const telefono = document.getElementById('telefono')
const direccion = document.getElementById('direccion')
const email = document.getElementById('email')

//Actualizar foto
const formPhoto = document.querySelector("#formPhoto")
const uploadButton = document.querySelector("#upload-button")

formUpdate.addEventListener("submit", validateFormUpdate)
uploadButton.addEventListener("change", changeImage)

function validateFormUpdate(e) {

	e.preventDefault()

	if (nombreCompleto.value === "") {
		Swal.fire({
			icon: 'error',
			title: 'Ingrese su nombre completo',
		})
	}else if (telefono.value === "") {
		Swal.fire({
			icon: 'error',
			title: 'Ingrese su telefono',
		})
	}else if (direccion.value === "") {
		Swal.fire({
			icon: 'error',
			title: 'Ingrese su direccion',
		})
	}else if (email.value === "") {
		Swal.fire({
			icon: 'error',
			title: 'Ingrese su email',
		})
	}else{
		//Actualizamos la informacion del trabajador
		
		// Crear un nuevo objeto FormData y agregar los campos del formulario
		let formData = new FormData(formUpdate);

		// Crear una nueva petición Fetch para enviar los datos del formulario
		fetch(formUpdate.action, {
			method: "POST",
			body: formData,
		  })
			.then((data) => {
			  Swal.fire({
				icon: 'success',
				title: 'Datos actualizados correctamente!',
				allowOutsideClick: false,
			  }).then((result) => {
				if (result.isConfirmed) {
					window.location.href = data.url;
				}
			  });
			})
			.catch((error) => {
			  // Manejar el error de la petición Fetch
			  Swal.fire({
				  icon: 'error',
				  title: '¡Ops! Ocurrió un error',
				})
			});
	}
}

function changeImage(e) {
	//Envia el formulario
	let formData = new FormData(formPhoto);

		// Crear una nueva petición Fetch para enviar los datos del formulario
		fetch(formPhoto.action, {
			method: "POST",
			body: formData,
		  })
			.then((data) => {
			  Swal.fire({
				icon: 'success',
				title: 'Foto Actualizada Correctamente!',
				allowOutsideClick: false,
			  }).then((result) => {
				if (result.isConfirmed) {
					window.location.href = data.url;
				}
			  });
			})
			.catch((error) => {
			  // Manejar el error de la petición Fetch
			  Swal.fire({
				  icon: 'error',
				  title: '¡Ops! Ocurrió un error',
				})
			});
}