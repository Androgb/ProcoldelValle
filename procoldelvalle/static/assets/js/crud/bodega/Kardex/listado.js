const excelBtn = document.querySelector(".excelBtn")
const pdfBtn = document.querySelector(".pdfBtn")
const editButtons = document.querySelectorAll('.edit')
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

let table = new DataTable('#tablaBodega', {
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

//Funcion que carga todos los eventos de la web

function loadAddEventListeners(){

	editButtons.forEach(editBtn => {
		editBtn.addEventListener("click", editarUsuarioListado)
	});

	excelBtn.addEventListener("click", exportExcel)
	pdfBtn.addEventListener("click", exportPdf)
}

loadAddEventListeners();

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
				let link = '/bodegaExcel/' + fileName + '/' + directorySelected + "/";

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
				let link = '/bodegaPdf/' + fileName + '/' + directorySelected + "/";

				//Espera 2 segundos y crea el archivo

				setTimeout(() => {
					//Envía el enlace
					window.location.href = link;
			  	}, 2000);
		}
	  }
	})
}

//Editar usuario
function editarUsuarioListado(e) {
	e.preventDefault();
	
	codigo = e.target.id;

	//En caso de que se le de al icono

	if (e.target.nodeName === "I") {
		codigo = e.target.parentNode.id;
	}

	//Vamos a panel y pasamos por la url el codigo
	let link = '/bodega/' + codigo;
	console.log(codigo)
	window.location.href = link;
}