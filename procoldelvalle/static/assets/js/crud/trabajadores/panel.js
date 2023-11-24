window.addEventListener('load', function() {
	//Verifica si hay parametro
	if (match) {
		edit()
  	} else {
		return
  	}
	// Aquí va el código que quieres ejecutar después de que se hayan cargado todas las funciones
}); 

const pagina = "Trabajadores"

const uploadButton = document.getElementById('upload-button')
const choosenImage = document.getElementById('choosen-image')
const fileName = document.getElementById('file-name')
const sectionDescription = document.querySelectorAll('.section__description')
const firstDescription = document.getElementById('first__description')
const submitButton = document.getElementById('submit')
const form = document.getElementById('form')
const checkboxPassword = document.getElementById('checkPassword')
const containerMessage = document.querySelector(".message")
const infoPassword = document.querySelector(".info-button")
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
const url = window.location.pathname;
const editButtons = document.querySelectorAll('.edit')
const match = url.match(/\/(\d+)\/?$/); // busca un número de una o más cifras seguido opcionalmente por una barra final

//Fields
const imageInput = document.getElementById('imageInput')
const primaryKey = document.getElementById('primaryKey')
const nombreCompleto = document.getElementById('nombreCompleto')
const cargo = document.getElementById('cargo')
const telefono = document.getElementById('telefono')
const direccion = document.getElementById('direccion')
const email = document.getElementById('email')
const contraseña = document.getElementById('contraseña')
const confirmarContraseña = document.getElementById('confirmarContraseña')

//Funcion que carga todos los eventos de la web

function loadAddEventListeners(){

	uploadButton.addEventListener('change', uploadImage)
	
	sectionDescription.forEach(section => {
		section.addEventListener('click', toogleSection)
	});

	editButtons.forEach(button => {
		button.addEventListener('click', edit)
	});

	checkboxPassword.addEventListener("change", showPasswords)
	form.addEventListener("submit", validateForm)
	infoPassword.addEventListener("click", showInformation)
}

loadAddEventListeners();

//Subir Imagen a Formulario

function uploadImage(e){
	//Obtenemos la url de la imagen
	let image = URL.createObjectURL(e.target.files[0])
	choosenImage.setAttribute("src", image)
	fileName.textContent= uploadButton.files[0].name;
}

//Mostrar o Cerrar Seccion

function toogleSection(e){
	e.preventDefault()

	if(e.target.nodeName !== "A"){
		e.preventDefault()

		const parentContainer = e.target.parentElement.parentElement.nextElementSibling;
		const containerSection = e.target.parentElement.parentElement.nextElementSibling.parentElement;

		parentContainer.classList.toggle("close")
		containerSection.style.rowGap = "0px";
	}
}

//Cambia la apariencia del formulario cuando se desea editar

function edit(e = null){
	firstDescription.textContent = "Editar Usuario";
	form.setAttribute("aria-action","edit")


	primaryKey.setAttribute("readonly","")
	primaryKey.classList.add('disabled')
	submitButton.textContent = "Editar Usuario"

	//Eliminamos el icono si existe
	if (document.querySelector('.bi-x-circle')) {
		document.querySelector('.bi-x-circle').remove()
	}

	//Creamos un elemento para cancelar la edicion
	const cancelIcon = document.createElement("i")
	cancelIcon.classList.add("bi", "bi-x-circle")
	const xclass = document.querySelector('.x')
	xclass.appendChild(cancelIcon)

	cancelIcon.addEventListener("click", resetForm)

	cedula = null;

	//Si se esta editando desde el listado se obtiene lo de la url

	if (e === null) {
		cedula = primaryKey.value;
	}else{
		if (e.target.nodeName === "A") {
			cedula = e.target.id;
		}else{
			cedula = e.target.parentNode.id;
		}
	}

	form.setAttribute("action","/editarTrabajador/" + cedula)

	mostrarFormulario(cedula)
}

//Resetea el formulario despues de cerrar la sesion de editar

function resetForm(e){
	//Si la url tiene la cedula, deberia de cargar de nuevo la pagina
	if (match) {
		//Recarga la pagina
		window.location.href = "/trabajadores/"
  	} else {
		clearFields();
	
		firstDescription.textContent = "Agregar Usuario";
		form.setAttribute("aria-action","add")

		primaryKey.removeAttribute("readonly")
		primaryKey.classList.remove('disabled')
		submitButton.value = "Agregar Usuario"

		e.target.parentNode.removeChild(e.target)

		form.setAttribute("action","/registrarTrabajador/")
  	}
}

//Limpia el formulario completo
function clearFields() {
	choosenImage.setAttribute("src","/static/assets/images/User Photo Default.png")
	fileName.textContent = "";
	primaryKey.value = "";
	nombreCompleto.value = ""
	cargo.value = ""
	telefono.value = ""
	direccion.value = ""
	email.value = ""
	contraseña.value = ""
	confirmarContraseña.value = ""
}

//Funcion para mostrar las contraseñas
function showPasswords() {
	if (checkboxPassword.checked) {
		contraseña.setAttribute("type", "text")
		confirmarContraseña.setAttribute("type", "text")
	}else{
		contraseña.setAttribute("type", "password")
		confirmarContraseña.setAttribute("type", "password")
	}
}

//Muestra los mensajes de error en la web
function showMessageError(type, field) {
	clearMessage();
	
	containerMessage.classList.add("messageError")

	const text = document.createElement("p")

	if (type === "emptyField") {
		text.textContent = "¡Por favor ingresa el/la " + field + "!"
	}else if(type === "password"){
		text.textContent = "¡Las contraseñas no coinciden!"
	}else if(type === "parameters"){
		text.textContent = "La contraseña no cumple con los parámetros estipulados"
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
function mostrarFormulario(cedula) {
    // hacer una solicitud AJAX para obtener los datos del trabajador
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/obtener_trabajador/${cedula}`, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.onreadystatechange = function() {
		// Se verifica si la solicitud ha sido completada
        if (xhr.readyState === XMLHttpRequest.DONE) {
			// Se verifica si la respuesta fue exitosa
            if (xhr.status === 200) {
				// llenar los campos del formulario con los datos del trabajador
                const trabajador = JSON.parse(xhr.responseText).data;
                primaryKey.value = cedula;
                nombreCompleto.value = trabajador.nombreCompleto;
                cargo.value = trabajador.cargo;
                telefono.value = trabajador.telefono;
                direccion.value = trabajador.direccion;
                email.value = trabajador.email;
                contraseña.value = trabajador.contraseña;
				confirmarContraseña.value = trabajador.contraseña;

				if (trabajador.fotoPerfil !== null) {
					choosenImage.src = trabajador.fotoPerfil;	
				}else{
					choosenImage.src = "http://127.0.0.1:8000/static/assets/images/User%20Photo%20Default.png"
				}
            } else {
				// Si la respuesta no fue exitosa, se muestra un mensaje de error al usuario
				Swal.fire({
					icon: 'error',
					title: '¡Ops! Hubo un error al obtener los datos del trabajador.',
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
		showMessageError("emptyField","Cédula")
	}else if (nombreCompleto.value === "") {
		showMessageError("emptyField","Nombre Completo")
	}else if (cargo.value === "") {
		showMessageError("emptyField","Cargo")
	}else if (telefono.value === "") {
		showMessageError("emptyField","Teléfono")
	}else if (direccion.value === "") {
		showMessageError("emptyField","Dirección")
	}else if (email.value === "") {
		showMessageError("emptyField","Email")
	}else if (contraseña.value === "") {
		showMessageError("emptyField","Contraseña")
	}else if (confirmarContraseña.value === "") {
		showMessageError("emptyField","Confirmación de la contraseña")
	}else if (contraseña.value !== confirmarContraseña.value) {
		showMessageError("password","")
	}else if (!regExpPassword.test(contraseña.value)) {
		showMessageError("parameters","")
	}else{
		//Añadimos o editamos el trabajador
		
		// Crear un nuevo objeto FormData y agregar los campos del formulario
		let formData = new FormData(form);

		// Crear una nueva petición Fetch para enviar los datos del formulario
		fetch(form.action, {
			method: "POST",
			body: formData,
		  })
			.then((data) => {
				console.log(data)
			  // Mandamos el mensaje a partir de aria-action
			  if (form.getAttribute("aria-action") === "add"){
				Swal.fire({
					icon: 'success',
					title: '¡Trabajador Añadido Correctamente!',
					allowOutsideClick: false,
				  }).then((result) => {
					if (result.isConfirmed) {
						window.location.href = data.url;
					}
				  });
			  }else if(form.getAttribute("aria-action") === "edit"){
				Swal.fire({
					icon: 'success',
					title: '¡Trabajador Editado Correctamente!',
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
				  allowOutsideClick: false,
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.href = data.url;
					}
				  });

			});
	}
}


function showInformation() {
	Swal.fire({
		title: 'Características Contraseña',
		icon: 'info',
		html:
		  '<ul style="list-style:inside"><li>Debe contener mínimo 8 caracteres</	li><li>Debe contener una letra mayúscula, una letra minúscula y un número</li><li>Puede contener un carácter especial (mayor seguridad)</li></ul>',
		showCloseButton: true,
		confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entendido!',
	  })
}