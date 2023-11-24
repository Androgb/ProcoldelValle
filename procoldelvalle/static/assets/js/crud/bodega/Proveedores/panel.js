window.addEventListener('load', function() {
    // Verifica si hay parámetro
    if (match) {
        const numero = match[1]; // Obtiene el número capturado por el patrón
		edit(null, numero)
    } else {
        return
    }
    // Aquí va el código que quieres ejecutar después de que se hayan cargado todas las funciones
});
const sectionDescription = document.querySelectorAll('.section__description');
const firstDescription = document.getElementById('first__description');
const submitButton = document.getElementById('submit');
const form = document.getElementById('form');
const containerMessage = document.querySelector(".message");
const infoPassword = document.querySelector(".info-button");
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
const url = window.location.pathname;
const editButtons = document.querySelectorAll('.edit');
const match = url.match(/\/(\d+)\/?$/); // busca un número de una o más cifras seguido opcionalmente por una barra final

// Fields
const primaryKey = document.getElementById('primaryKey');
const nombreProveedor = document.getElementById('nombreProveedor');
const telefono = document.getElementById('telefono');
const direccion = document.getElementById('direccion');
const email = document.getElementById('email');
const ultima = document.getElementById('ultimaEntrega');

// Función que carga todos los eventos de la web
function loadAddEventListeners() {
    
    sectionDescription.forEach(section => {
        section.addEventListener('click', toogleSection);
    });

    editButtons.forEach(button => {
        button.addEventListener('click', edit);
    });

    form.addEventListener("submit", validateForm);
}

loadAddEventListeners();

// Mostrar o Cerrar Sección
function toogleSection(e) {
    e.preventDefault();

    if (e.target.nodeName !== "A") {
        e.preventDefault();

        const parentContainer = e.target.parentElement.parentElement.nextElementSibling;
        const containerSection = e.target.parentElement.parentElement.nextElementSibling.parentElement;

        parentContainer.classList.toggle("close");
        containerSection.style.rowGap = "0px";
    }
}

// Cambia la apariencia del formulario cuando se desea editar
function edit(e = null, codigo = null){
	primaryKey.value = codigo;

	firstDescription.textContent = "Editar Proveedor";
	form.setAttribute("aria-action","edit")


	primaryKey.setAttribute("readonly","")
	primaryKey.classList.add('disabled')
	submitButton.textContent = "Editar Proveedor"

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

	codigoEdit = null;

	//Si se esta editando desde el listado se obtiene lo de la url

	if (e === null) {
		codigoEdit = primaryKey.value;
	}else{
		if (e.target.nodeName === "A") {
			codigoEdit = e.target.id;
		}else{
			codigoEdit = e.target.parentNode.id;
		}
	}

	form.setAttribute("action","/editarProveedor/" + codigoEdit)

	mostrarFormulario(codigo)
}

// Restablece el formulario a su estado inicial
function resetForm(e) {
    if (match) {
		//Recarga la pagina
		window.location.href = "/Proveedores/"
  	} else {
		clearFields();
	
		firstDescription.textContent = "Agregar Proveedor";
        form.setAttribute("aria-action", "add");

        primaryKey.removeAttribute("readonly");
        primaryKey.classList.remove('disabled');
        submitButton.textContent = "Agregar Proveedor";


		e.target.parentNode.removeChild(e.target)

		form.setAttribute("action","/registrarProveedor/")
    }
    
}

function clearFields() {
    primaryKey.value = "";
	nombreProveedor.value = "";
    telefono.value = "";
    direccion.value = "";
    email.value = "";
    ultima.value = "";
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

function mostrarFormulario(codigo) {
    // Hacer una solicitud AJAX para obtener los datos del registro de proveedor
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/obtener_proveedor/${codigo}`, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.onreadystatechange = function() {
		// Verificar si la solicitud ha sido completada
        if (xhr.readyState === XMLHttpRequest.DONE) {
			// Verificar si la respuesta fue exitosa
            if (xhr.status === 200) {
				// Llenar los campos del formulario con los datos del registro de proveedor
                const registro = JSON.parse(xhr.responseText).data;
                primaryKey.value = codigo;
                nombreProveedor.value = registro.nombreProveedor;
                telefono.value = registro.telefono;
                direccion.value = registro.direccion;
                email.value = registro.email;
				ultima.value = registro.ultimaEntrega;

            } else {
				// Si la respuesta no fue exitosa, mostrar un mensaje de error al usuario
				Swal.fire({
					icon: 'error',
					title: '¡Ops! Hubo un error al obtener los datos del registro de proveedor.',
				});
            }
        }
    };
	// Enviar la solicitud AJAX al servidor
    xhr.send();
}



function validateForm(e) {

	e.preventDefault()

	if (primaryKey.value === "") {
		showMessageError("emptyField","Codigo")
	}else if (nombreProveedor.value === "") {
		showMessageError("emptyField","Nombre Proveedor")
	}else if (telefono.value === "") {
		showMessageError("emptyField","telefono")
	}else if (direccion.value === "") {
		showMessageError("emptyField","direccion")
	}else if (email.value === "") {
		showMessageError("emptyField","email")
	}else if (ultima.value === "") {
			showMessageError("emptyField","Ultima Entrega")
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
			  // Mandamos el mensaje a partir de aria-action
			  if (form.getAttribute("aria-action") === "add"){
				Swal.fire({
					icon: 'success',
					title: '!Proveedor Añadido Correctamente!',
					allowOutsideClick: false,
				  }).then((result) => {
					if (result.isConfirmed) {
						window.location.href = data.url;
					}
				  });
			  }else if(form.getAttribute("aria-action") === "edit"){
				Swal.fire({
					icon: 'success',
					title: '¡Proveedor Editado Correctamente!',
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