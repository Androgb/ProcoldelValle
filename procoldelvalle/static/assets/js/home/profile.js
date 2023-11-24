//Validamos el formulario para actualizar la informacion

const formUpdate = document.getElementById('form')
const formReset = document.getElementById('formReset')
const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

//Campos formulario de actualizar datos

const nombreCompleto = document.getElementById('nombreCompleto')
const telefono = document.getElementById('telefono')
const direccion = document.getElementById('direccion')
const email = document.getElementById('email')

//Campos formulario para actualizar contraseña
const password = document.getElementById('passwordField')
const passwordConfirmation = document.getElementById('passwordConfirmation')

//Actualizar foto
const formPhoto = document.querySelector("#formPhoto")
const uploadButton = document.querySelector("#upload-button")

formUpdate.addEventListener("submit", validateFormUpdate)
formReset.addEventListener("submit", validateFormReset)
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

function validateFormReset(e) {

	e.preventDefault()

	if (password.value === "") {
		Swal.fire({
			icon: 'error',
			title: 'Ingrese la Contraseña',
		})
	}else if (passwordConfirmation.value === "") {
		Swal.fire({
			icon: 'error',
			title: 'Ingrese la Confirmacion de la Contraseña',
		})
	}else if (password.value !== passwordConfirmation.value) {
		Swal.fire({
			icon: 'error',
			title: 'Las contraseñas no coinciden',
		})
	}else if (!regExpPassword.test(password.value)) {
		Swal.fire({
			icon: 'error',
			title: 'La contraseña no cumple con los parametros establecidos',
		})
	}else{
		//Actualizamos la contraseña
		
		// Crear un nuevo objeto FormData y agregar los campos del formulario
		let formData = new FormData(formReset);

		// Crear una nueva petición Fetch para enviar los datos del formulario
		fetch(formReset.action, {
			method: "POST",
			body: formData,
		  })
			.then((data) => {
			  Swal.fire({
				icon: 'success',
				title: 'Contraseña Actualizada Correctamente!',
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