window.addEventListener('load', function() {
    // Verifica si hay parámetro
    if (match) {
        const numero = match[1]; // Obtiene el número capturado por el patrón
		edit(null, numero)
    } else {
        return;
    }
    // Aquí va el código que quieres ejecutar después de que se hayan cargado todas las funciones
});
const uploadButton = document.getElementById('upload-button');
const choosenImage = document.getElementById('choosen-image');
const fileName = document.getElementById('file-name');
const sectionDescription = document.querySelectorAll('.section__description');
const firstDescription = document.getElementById('first__description');
const submitButton = document.getElementById('submit');
const form = document.getElementById('form');
const infoImage = document.querySelector(".info-button")
const containerMessage = document.querySelector(".message");
const url = window.location.pathname;
const editButtons = document.querySelectorAll('.edit');
const match = url.match(/\/(\d+)\/?$/); // busca un número de una o más cifras seguido opcionalmente por una barra final

// Fields
const imageInput = document.getElementById('imageInput');
const primaryKey = document.getElementById('primaryKey');
const nombreCategoria = document.getElementById('nombreCategoria');

// Función que carga todos los eventos de la web
function loadAddEventListeners() {
    uploadButton.addEventListener('change', uploadImage);

    editButtons.forEach(button => {
        button.addEventListener('click', edit);
    });

    form.addEventListener("submit", validateForm);
	infoImage.addEventListener("click", showInformation)
}

loadAddEventListeners();

// Subir Imagen a Formulario
function uploadImage(e) {
    // Obtenemos la URL de la imagen
    let image = URL.createObjectURL(e.target.files[0]);
    choosenImage.setAttribute("src", image);
    fileName.textContent = uploadButton.files[0].name;
}

// Cambia la apariencia del formulario cuando se desea editar
function edit(e = null, codigo = null){
	primaryKey.value = codigo;

	firstDescription.textContent = "Editar Categoria";
	form.setAttribute("aria-action","edit")


	primaryKey.setAttribute("readonly","")
	primaryKey.classList.add('disabled')
	submitButton.textContent = "Editar Categoria"

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

	form.setAttribute("action","/editarCategoria/" + codigoEdit)

	mostrarFormulario(codigoEdit)
}

// Restablece el formulario a su estado inicial
function resetForm(e) {


    if (match) {
		//Recarga la pagina
		window.location.href = "/Categorias/"
  	} else {
		clearFields();
	
		firstDescription.textContent = "Agregar Categoria";
        form.setAttribute("aria-action", "add");

        primaryKey.removeAttribute("readonly");
        primaryKey.classList.remove('disabled');
        submitButton.textContent = "Agregar Categoria";


		e.target.parentNode.removeChild(e.target)

		form.setAttribute("action","/registrarCategoria/")
    }
    
}

function clearFields() {
	choosenImage.setAttribute("src","/static/assets/images/Categorias Photo Default.png")
	fileName.textContent = "";
    primaryKey.value = "";
	nombreCategoria.value = "";
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
	console.log(codigo);
    // Hacer una solicitud AJAX para obtener los datos del registro de producto
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/obtener_categoria/${codigo}`, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.onreadystatechange = function() {
		// Verificar si la solicitud ha sido completada
        if (xhr.readyState === XMLHttpRequest.DONE) {
			// Verificar si la respuesta fue exitosa
            if (xhr.status === 200) {
				// Llenar los campos del formulario con los datos del registro de producto
                const registro = JSON.parse(xhr.responseText).data;
                primaryKey.value = codigo;
                nombreCategoria.value = registro.nombreCategoria;
                // Aquí puedes manejar la carga de la imagen si es necesario
                if (registro.imagen !== null) {
					choosenImage.src = registro.imagen;	
				}else{
					choosenImage.src = "http://127.0.0.1:8000/static/assets/images/Categoria%20Photo%20Default.png"
				}
            } else {
				// Si la respuesta no fue exitosa, mostrar un mensaje de error al producto
				Swal.fire({
					icon: 'error',
					title: '¡Ops! Hubo un error al obtener los datos del registro de producto.',
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
	}else if (nombreCategoria.value === "") {
		showMessageError("emptyField","Nombre Producto")
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
					title: 'Categoria Añadida Correctamente!',
					allowOutsideClick: false,
				  }).then((result) => {
					if (result.isConfirmed) {
						window.location.href = data.url;
					}
				  });
			  }else if(form.getAttribute("aria-action") === "edit"){
				Swal.fire({
					icon: 'success',
					title: 'Categoria Editada Correctamente!',
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
		title: 'Caracteristicas de la Imagen',
		html: '<p>La imagen que sera añadida a continuacion sera aquella que se mostrara en la seccion de "Tienda" para los clientes, para mejorar la estetica y continuar con la linealidad del diseño, esta debe contar con las siguientes caracteristicas:</p><ul style="list-style:inside; font-size: 1rem; padding-left: 0px"><li>Tamaño: 1200x809 px</	li><li>Fondo: Blanco</li><li>Imagen: Lado Derecho (PNG)</li></ul>',
		imageUrl: 'http://127.0.0.1:8000/static/assets/images/Referencia%20Categoria.png',
		imageWidth: 400,
		imageHeight: 200,
		imageAlt: 'Custom image',
	  })
}