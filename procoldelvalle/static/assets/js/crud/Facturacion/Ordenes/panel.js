const submitButton = document.getElementById('submit')
const excelBtn = document.querySelector(".excelBtn")
const pdfBtn = document.querySelector(".pdfBtn")
const form = document.getElementById('form')
const containerMessage = document.querySelector(".message")
const editButtons = document.querySelectorAll('.edit')

//Fields
const primaryKey = document.getElementById('primaryKey')
const estado = document.getElementById('estado')

let table = new DataTable('#tablaOrdenes', {
    language: {
		"pageLength": 5,
		"searchPlaceholder": 'Buscar...',
		"processing": "Procesando...",
		"lengthMenu": "Mostrar _MENU_ registros",
		"zeroRecords": "No se encontraron resultados",
		"emptyTable": "Ningún dato disponible en esta tabla",
		"infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
		"infoFiltered": "(filtrado de un total de _MAX_ registros)",
		"search": "",
		"infoThousands": ",",
		"loadingRecords": "Cargando...",
		"paginate": {
			"first": "Primero",
			"last": "Último",
			"next": "<i class='bi bi-arrow-right-short'></i>",
			"previous": "<i class='bi bi-arrow-left-short'></i>"
		},
		"aria": {
			"sortAscending": ": Activar para ordenar la columna de manera ascendente",
			"sortDescending": ": Activar para ordenar la columna de manera descendente"
		},
		"info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
	},
});

const htmlModalExport = `
<center>
  <div class="modalGroup">
	<i class="fa-solid fa-file-export"></i>
	<input placeholder="Nombre Archivo" type="text" class="input">
  </div>
  <br>
  <div class="radio-inputs">
  <label>
	  <input class="radio-input" type="radio" name="directory" value="Desktop">
		  <span class="radio-tile">
			  <span class="radio-icon">
			  <i class="fa-solid fa-desktop" style="font-size:25px"></i>
			  </span>
			  <span class="radio-label">Escritorio</span>
		  </span>
  </label>
  <label>
	  <input checked="" class="radio-input" type="radio" name="directory" value="Downloads">
	  <span class="radio-tile">
		  <span class="radio-icon">
			  <i class="fa-solid fa-download" style="font-size:25px"></i>
		  </span>
		  <span class="radio-label">Descargas</span>
	  </span>
  </label>
  <label>
	  <input class="radio-input" type="radio" name="directory" value="Documents">
	  <span class="radio-tile">
		  <span class="radio-icon">
			  <i class="fa-solid fa-file" style="font-size:25px"></i>
		  </span>
		  <span class="radio-label">Documentos</span>
	  </span>
  </label>
</div>
</center>
`

//Funcion que carga todos los eventos de la web

function loadAddEventListeners(){

	editButtons.forEach(button => {
		button.addEventListener('click', edit)
	});

	excelBtn.addEventListener("click", exportExcel)
	pdfBtn.addEventListener("click", exportPdf)
}

loadAddEventListeners();

//Cambia la apariencia del formulario cuando se desea editar

function edit(e = null){
	form.setAttribute("aria-action","edit")

	primaryKey.setAttribute("readonly","")
	primaryKey.classList.add('disabled')
	submitButton.value = "Editar Orden"

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

	if (e.target.nodeName === "A") {
		codigoEdit = e.target.id;
	}else{
		codigoEdit = e.target.parentNode.id;
	}

	estado.removeAttribute("disabled")

	form.setAttribute("action","/editarOrden/" + codigoEdit)

	mostrarFormulario(codigoEdit)
}

//Resetea el formulario despues de cerrar la sesion de editar

function resetForm(e){
	//Si la url tiene la codigo, deberia de cargar de nuevo la pagina
		clearFields();
}

//Limpia el formulario completo
function clearFields() {
	primaryKey.value = "";
	primaryKey.setAttribute("disabled","")
	estado.setAttribute("disabled","")
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
    xhr.open("GET", `/obtener_orden/${codigo}`, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.onreadystatechange = function() {
		// Se verifica si la solicitud ha sido completada
        if (xhr.readyState === XMLHttpRequest.DONE) {
			// Se verifica si la respuesta fue exitosa
            if (xhr.status === 200) {
				// llenar los campos del formulario con los datos del trabajador
                const registro = JSON.parse(xhr.responseText).data;
                primaryKey.value = codigo;
				//Seleccionamos el estado
				for (var i = 0; i < estado.length; i++) {
					if (estado[i].value === registro.Estado) {
						estado[i].selected = true;
					  break;
					}
				  }
            } else {
				// Si la respuesta no fue exitosa, se muestra un mensaje de error al usuario
				Swal.fire({
					icon: 'error',
					title: '¡Ops! Hubo un error al obtener los datos del registro de bodega.',
				  })
            }
        }
    };
	// Se envía la solicitud AJAX al servidor
    xhr.send();
}

function exportExcel(e) {
	e.preventDefault();
  
	Swal.fire({
	  title: 'Exportar Excel',
	  icon: "info",
	  html: htmlModalExport,
	  showCloseButton: true,
	  confirmButtonText: 'Descargar'
	}).then((result) => {
	  if (result.isConfirmed) {
		const fileName = document.querySelector('.modalGroup input').value;

		//Validamos si se introdujo el fileName
		if (fileName === "") {
			Swal.fire('¡Olvidaste ingresar el nombre del Archivo!', '', 'error')
		}else{
				//Direccion Seleccionada
				const checkedInput = document.querySelector('input[name="directory"]:checked');
				const directorySelected = checkedInput.value;

				Swal.fire('¡Excel Creado Correctamente!', '', 'success')
				//Asigna el valor del enlace
				let link = '/ordenesExcel/' + fileName + '/' + directorySelected + "/";

				setTimeout(() => {
					//Envía el enlace
					window.location.href = link;
			  	}, 2000);
		}
	  }
	})
  }

function openDirectories(e){
	document.getElementById('fileInput').click();
}

function exportPdf(e) {
	e.preventDefault();
  
	Swal.fire({
	  title: 'Exportar PDF',
	  icon: "info",
	  html: htmlModalExport,
	  showCloseButton: true,
	  confirmButtonText: 'Descargar'
	}).then((result) => {
	  if (result.isConfirmed) {
		const fileName = document.querySelector('.modalGroup input').value;

		//Validamos si se introdujo el fileName
		if (fileName === "") {
			Swal.fire('¡Olvidaste ingresar el nombre del Archivo!', '', 'error')
		}else{
				//Direccion Seleccionada
				const checkedInput = document.querySelector('input[name="directory"]:checked');
				const directorySelected = checkedInput.value;

				Swal.fire('PDF Creado Correctamente!', '', 'success')
				//Asigna el valor del enlace
				let link = '/ordenesPdf/' + fileName + '/' + directorySelected + "/";

				//Espera 2 segundos y crea el archivo

				setTimeout(() => {
					//Envía el enlace
					window.location.href = link;
			  	}, 2000);
		}
	  }
	})
}