window.addEventListener('load', function () {
	//Verifica si hay parametro
	if (match) {
		const numero = match[1]; // Obtiene el número capturado por el patrón
		edit(null, numero)
	} else {
		return
	}
	// Aquí va el código que quieres ejecutar después de que se hayan cargado todas las funciones
});
const uploadButton = document.getElementById('upload-button');
const choosenImage = document.getElementById('choosen-image');
const fileName = document.getElementById('file-name');
const sectionDescription = document.querySelectorAll('.section__description')
const firstDescription = document.getElementById('first__description')
const submitButton = document.getElementById('submit')
const form = document.getElementById('form')
const containerMessage = document.querySelector(".message")
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
const url = window.location.pathname;
const editButtons = document.querySelectorAll('.edit')
const match = url.match(/\/(\d+)\/?$/); // busca un número de una o más cifras seguido opcionalmente por una barra final

//Fields
const imageInput = document.getElementById('imageInput');
const primaryKey = document.getElementById('primaryKey')
const trabajador = document.getElementById('trabajador')
const servicio = document.getElementById('servicio')
const gasto = document.getElementById('gasto')
const descripcion = document.getElementById('descripcion')

//Funcion que carga todos los eventos de la web

function loadAddEventListeners() {
	uploadButton.addEventListener('change', uploadImage);

	sectionDescription.forEach(section => {
		section.addEventListener('click', toogleSection)
	});

	editButtons.forEach(button => {
		button.addEventListener('click', edit)
	});

	form.addEventListener("submit", validateForm)
}

loadAddEventListeners();

// Subir Imagen a Formulario
function uploadImage(e) {
    // Obtenemos la URL de la imagen
    let image = URL.createObjectURL(e.target.files[0]);
    choosenImage.setAttribute("src", image);
    fileName.textContent = uploadButton.files[0].name;
}

//Mostrar o Cerrar Seccion

function toogleSection(e) {
	e.preventDefault()

	if (e.target.nodeName !== "A") {
		e.preventDefault()

		const parentContainer = e.target.parentElement.parentElement.nextElementSibling;
		const containerSection = e.target.parentElement.parentElement.nextElementSibling.parentElement;

		parentContainer.classList.toggle("close")
		containerSection.style.rowGap = "0px";
	}
}

//Cambia la apariencia del formulario cuando se desea editar

function edit(e = null, codigo = null) {
	primaryKey.value = codigo;

	firstDescription.textContent = "Editar Compra";
	form.setAttribute("aria-action", "edit")

	primaryKey.setAttribute("readonly", "")
	primaryKey.classList.add('disabled')
	submitButton.textContent = "Editar Compra"

	//Eliminamos el icono si existe
	if (document.querySelector('.bi-x-circle')) {
		document.querySelector('.bi-x-circle').remove()
	}

	//Creamos un elemento para cancelar la edicion
	const cancelIcon = document.createElement("i")
	cancelIcon.classList.add("bi", "bi-x-circle", "cursor-pointer")
	const xclass = document.querySelector('.x')
	xclass.appendChild(cancelIcon)

	cancelIcon.addEventListener("click", resetForm)

	codigoEdit = null;

	//Si se esta editando desde el listado se obtiene lo de la url

	if (e === null) {
		codigoEdit = primaryKey.value;
	} else {
		if (e.target.nodeName === "A") {
			codigoEdit = e.target.id;
		} else {
			codigoEdit = e.target.parentNode.id;
		}
	}

	form.setAttribute("action", "/editarCompra/" + codigoEdit)

	mostrarFormulario(codigoEdit)
}

//Resetea el formulario despues de cerrar la sesion de editar

function resetForm(e) {
	//Si la url tiene la codigo, deberia de cargar de nuevo la pagina
	if (match) {
		//Recarga la pagina
		window.location.href = "/Compras/"
	} else {
		clearFields();

		firstDescription.textContent = "Agregar Compra";
		form.setAttribute("aria-action", "add")

		primaryKey.removeAttribute("readonly")
		primaryKey.classList.remove('disabled')
		submitButton.textContent = "Agregar Compra"

		e.target.parentNode.removeChild(e.target)

		form.setAttribute("action", "/registrarCompra/")
	}
}

//Limpia el formulario completo
function clearFields() {
	choosenImage.setAttribute("src","/static/assets/images/Product Photo Default.png")
	fileName.textContent = "";
	primaryKey.value = "";
	trabajador.value = ""
	servicio.value = ""
	gasto.value = ""
	descripcion.value = ""
}

//Muestra los mensajes de error en la web
function showMessageError(type, field) {
	clearMessage();

	containerMessage.classList.add("messageError")

	const text = document.createElement("p")

	if (type === "emptyField") {
		text.textContent = "¡Por favor ingresa el/la " + field + "!"
	}

	containerMessage.appendChild(text)

	setTimeout(clearMessage, "3000");
}

//Limpia los mensajes de error

function clearMessage() {
	if (document.querySelector(".messageError")) {
		let messageError = document.querySelector(".messageError");
		messageError.classList.remove("messageError")
		messageError.removeChild(messageError.firstElementChild)
	}
}

// Función para obtener el token CSRF de la cookie
function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Nombre del token CSRF en Django es "csrftoken"
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

// función para obtener los datos del trabajador y mostrarlos en el formulario de edición
function mostrarFormulario(codigo) {
	// hacer una solicitud AJAX para obtener los datos del trabajador
	const xhr = new XMLHttpRequest();
	xhr.open("GET", `/obtener_compra/${codigo}`, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
	xhr.onreadystatechange = function () {
		// Se verifica si la solicitud ha sido completada
		if (xhr.readyState === XMLHttpRequest.DONE) {
			// Se verifica si la respuesta fue exitosa
			if (xhr.status === 200) {
				// llenar los campos del formulario con los datos del trabajador
				const registro = JSON.parse(xhr.responseText).data;
				primaryKey.value = codigo;

				if (registro.comprobante !== null) {
					choosenImage.src = registro.comprobante;	
				}else{
					choosenImage.src = "http://127.0.0.1:8000/static/assets/images/Product%20Photo%20Default.png"
				}

				//Seleccionamos el trabajador
				for (var i = 0; i < trabajador.length; i++) {
					if (parseInt(trabajador[i].value) === registro.trabajador) {
						trabajador[i].selected = true;
						break;
					}
				}
				//Seleccionamos el servicio
				for (var i = 0; i < servicio.length; i++) {
					if (servicio[i].value === registro.servicio) {
						servicio[i].selected = true;
						break;
					}
				}
				gasto.value = registro.gasto;
				descripcion.value = registro.descripcion;
			} else {
				// Si la respuesta no fue exitosa, se muestra un mensaje de error al usuario
				Swal.fire({
					icon: 'error',
					title: '¡Ops! Hubo un error al obtener los datos de la compra.',
				})
			}
		}
	};
	// Se envía la solicitud AJAX al servidor
	xhr.send();
}

//Valida que el formulario este completo y valido y añade el trabajador o lo edita

function validateForm(e) {

	e.preventDefault()

	if (primaryKey.value === "") {
		showMessageError("emptyField", "Codigo de la Entrega")
	}else if (gasto.value === "") {
		showMessageError("emptyField", "gasto")
	}else if (descripcion.value === "") {
		showMessageError("emptyField", "descripcion")
	}else {
		//Añadimos o editamos el trabajador

		// Crear un nuevo objeto FormData y agregar los campos del formulario
		let formData = new FormData(form);

		// Crear una nueva petición Fetch para enviar los datos del formulario
		fetch(form.action, {
			method: "POST",
			body: formData,
		})
			.then((data) => {
				// Mandamos el mensaje a partir de aria-action
				if (form.getAttribute("aria-action") === "add") {
					Swal.fire({
						icon: 'success',
						title: 'Registro Añadido Correctamente!',
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isConfirmed) {
							window.location.href = data.url;
						}
					});
				} else if (form.getAttribute("aria-action") === "edit") {
					Swal.fire({
						icon: 'success',
						title: 'Registro Editado Correctamente!',
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isConfirmed) {
							window.location.href = data.url;
						}
					});
				}
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