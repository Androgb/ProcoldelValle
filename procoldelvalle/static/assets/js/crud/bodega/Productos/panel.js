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
const infoDescription = document.querySelector(".info-description").value
const containerMessage = document.querySelector(".message");
const infoPassword = document.querySelector(".info-button");
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
const url = window.location.pathname;
const editButtons = document.querySelectorAll('.edit');
const match = url.match(/\/(\d+)\/?$/); // busca un número de una o más cifras seguido opcionalmente por una barra final

// Fields
const imageInput = document.getElementById('imageInput');
const primaryKey = document.getElementById('primaryKey');
const nombreProducto = document.getElementById('nombreProducto');
const descripcion = document.getElementById('descripcionProducto');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
const proveedores = document.getElementById('proveedor');
const categorias = document.getElementById('categoria');

// Función que carga todos los eventos de la web
function loadAddEventListeners() {
    uploadButton.addEventListener('change', uploadImage);
    
    sectionDescription.forEach(section => {
        section.addEventListener('click', toogleSection);
    });

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

	firstDescription.textContent = "Editar Producto";
	form.setAttribute("aria-action","edit")


	primaryKey.setAttribute("readonly","")
	primaryKey.classList.add('disabled')
	submitButton.textContent = "Editar Producto"

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

	form.setAttribute("action","/editarProducto/" + codigoEdit)

	mostrarFormulario(codigoEdit)
}

// Restablece el formulario a su estado inicial
function resetForm(e) {


    if (match) {
		//Recarga la pagina
		window.location.href = "/Productos/"
  	} else {
		clearFields();
	
		firstDescription.textContent = "Agregar Producto";
        form.setAttribute("aria-action", "add");

        primaryKey.removeAttribute("readonly");
        primaryKey.classList.remove('disabled');
        submitButton.textContent = "Agregar Producto";


		e.target.parentNode.removeChild(e.target)

		form.setAttribute("action","/registrarProductos/")
    }
    
}

function clearFields() {
	choosenImage.setAttribute("src","/static/assets/images/Product Photo Default.png")
	fileName.textContent = "";
    primaryKey.value = "";
	nombreProducto.value = "";
    descripcion.value = "";
    precio.value = "";
    stock.value = "";
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
    // Hacer una solicitud AJAX para obtener los datos del registro de producto
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/obtener_producto/${codigo}`, true);
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
                nombreProducto.value = registro.nombreProducto;
                descripcionProducto.value = registro.descripcionProducto;
                precio.value = registro.precioUnidad;
                stock.value = registro.stock;
                // Aquí puedes manejar la carga de la imagen si es necesario
                if (registro.imagen !== null) {
					choosenImage.src = registro.imagen;	
				}else{
					choosenImage.src = "http://127.0.0.1:8000/static/assets/images/Product%20Photo%20Default.png"
				}
                //Seleccionamos el proveedor
				for (var i = 0; i < proveedores.length; i++) {
					if (proveedores[i].textContent === registro.proveedor) {
						proveedores[i].selected = true;
					  break;
					}
				  }

				//Seleccionamos la categoria
				for (var i = 0; i < categorias.length; i++) {
					if (categorias[i].textContent === registro.categoria) {
						categorias[i].selected = true;
					  break;
					}
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
	}else if (nombreProducto.value === "") {
		showMessageError("emptyField","Nombre Producto")
	}else if (descripcion.value === "") {
		showMessageError("emptyField","Descripcion")
	}else if (precio.value === "") {
		showMessageError("emptyField","Precio")
	}else if (stock.value === "") {
		showMessageError("emptyField","Stock")
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
					title: '¡Producto Añadido Correctamente!',
					allowOutsideClick: false,
				  }).then((result) => {
					if (result.isConfirmed) {
						window.location.href = data.url;
					}
				  });
			  }else if(form.getAttribute("aria-action") === "edit"){
				Swal.fire({
					icon: 'success',
					title: '¡Producto Editado Correctamente!',
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
		title: 'Descripcion',
		html: '<p>' + infoDescription + '</p>',
	  })
}