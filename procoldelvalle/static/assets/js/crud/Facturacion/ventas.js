window.addEventListener('load', function () {
	// Verifica si hay parámetro
	if (match) {
		const numero = match[1]; // Obtiene el número capturado por el patrón
		edit(numero)
	} else {
		return;
	}
	// Aquí va el código que quieres ejecutar después de que se hayan cargado todas las funciones
});

const url = window.location.pathname;
const match = url.match(/\/(\d+)\/?$/); // busca un número de una o más cifras seguido opcionalmente por una barra final
const cajas = document.getElementById("caja")
const clientes = document.getElementById("Cliente")
const metodoPago = document.getElementsByName('metodo_pago')

let table = new DataTable('#tablaProductos', {
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
			"next": ".",
			"previous": "."
		},
		"aria": {
			"sortAscending": ": Activar para ordenar la columna de manera ascendente",
			"sortDescending": ": Activar para ordenar la columna de manera descendente"
		},
		"info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
	},
});

hideButton = document.querySelectorAll('#Hide')
table = document.querySelector('.tabla')
cardBody = document.querySelector('.card-body')
hideBtn = document.getElementById('Hide')
var btnimp = document.getElementById('Imprimir')
//Funcion que carga todos los eventos de la web
function loadAddEventListeners() {

	hideButton.forEach(button => {
		button.addEventListener("click", hide)
	});
}

loadAddEventListeners();

//Editar usuario
function hide(e) {
	e.preventDefault();

	cardBody.classList.toggle("py-4");
	table.classList.toggle("d-none"); // Toggle entre mostrar y ocultar el botón "Cerrar"
	hideBtn.classList.toggle('bg-gradient-danger');
	hideBtn.classList.toggle('bg-gradient-success');
	hideBtn.innerHTML = hideBtn.classList.contains("bg-gradient-success") ? 'Mostrar Productos' : 'Esconder Productos';
}

// Cambia la apariencia del formulario cuando se desea editar
function edit(codigo = null) {
	mostrarFormulario(codigo)
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
	xhr.open("GET", `/obtener_venta/${codigo}`, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
	xhr.onreadystatechange = function () {
		// Verificar si la solicitud ha sido completada
		if (xhr.readyState === XMLHttpRequest.DONE) {
			// Verificar si la respuesta fue exitosa
			if (xhr.status === 200) {
				// Llenar los campos del formulario con los datos del registro de producto
				const registro = JSON.parse(xhr.responseText).data;
				
				if (typeof registro.Caja !== 'undefined' && typeof registro.Cliente !== 'undefined' && typeof registro.MetodoPago !== 'undefined') {
					// Seleccionamos la caja
					for (var i = 0; i < cajas.length; i++) {
						if (caja[i].value === String(registro.Caja)) {
							caja[i].selected = true;
							break;
						}
					}
				//Seleccionamos el movimiento
					for (var i = 0; i < clientes.length; i++) {
						if (parseInt(clientes[i].value) === registro.Cliente) {
							clientes[i].selected = true;
							break;
						
						}
					}
				//Seleccionamos el radio button
					for (var i = 0; i < metodoPago.length; i++) {
						if (metodoPago[i].value === String(registro.MetodoPago)) {
							metodoPago[i].checked = true;
							break;
						}
					}

				}
			} else {
				// Si la respuesta no fue exitosa, mostrar un mensaje de error al producto
				Swal.fire({
					icon: 'error',
					title: '¡Ops! Hubo un error al obtener los datos del registro de la Venta.',
				});
			}
		}
	};
	// Enviar la solicitud AJAX al servidor
	xhr.send();
}