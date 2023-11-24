const deleteBtn = document.querySelector('.deleteBtn')
const titleReseña = document.querySelector('.titleReseña')
const btnReseña = document.querySelector('.btnReseña')
const form = document.querySelector('.formReseña')
const spanRating = document.querySelector('.spanRating')
const ratingInput = document.getElementById('rating');
const ratingSelections = spanRating.getElementsByClassName('ratingSelection');
const reviewTextarea = document.querySelector('#review')
const codigoProductoReseña = document.querySelector('#codigoProductoReseña')

if (document.querySelector('.editBtn')) {
    const editBtn = document.querySelector('.editBtn')

    editBtn.addEventListener('click', function(e){
        e.preventDefault()
    
        titleReseña.textContent = "Edita tu Reseña"
        btnReseña.textContent = "Editar Reseña"
    
        codigoReseña = e.target.id;
    
        form.setAttribute("action","/editarReseña/" + codigoReseña)
    
        mostrarFormulario(codigoReseña)
    })
}

if (document.querySelector('.deleteBtn')) {
    const deleteBtn = document.querySelector('.deleteBtn')

    deleteBtn.addEventListener("click", function(e){
        e.preventDefault()
        //Mostramos la alerta
        Swal.fire({
            title: '¿Desea eliminar la Reseña?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
            customClass: {
                title: 'titleSwal',
              },
          }).then((result) => {
            //Verifica la respuesta
            if (result.isConfirmed) {
              
                //Elimina el trabajador
                Swal.fire({
                    icon: 'success',
                    title: 'Reseña Eliminada Correctamente!',
                    allowOutsideClick: false,
                  }).then((resulta) => {
                    if (resulta.isConfirmed) {
                        window.location.href = link;
                    }
                  });
    
                let codigo = e.target.id;
    
                //Obtenemos el nombre del archivo HTML
                const pathArray = window.location.pathname.split('/');
                const url = pathArray[1]
    
                //Mandamos el nombre por la url
    
                let link = null;
    
                link = '/eliminarReseña/' + codigo + '/' + url + '/' + codigoProductoReseña.value;
            }
          })
    })
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
function mostrarFormulario(codigoReseña) {
    // hacer una solicitud AJAX para obtener los datos del trabajador
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/obtener_reseña/${codigoReseña}`, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.onreadystatechange = function() {
		// Se verifica si la solicitud ha sido completada
        if (xhr.readyState === XMLHttpRequest.DONE) {
			// Se verifica si la respuesta fue exitosa
            if (xhr.status === 200) {
				// llenar los campos del formulario con los datos del trabajador
                const reseña = JSON.parse(xhr.responseText).data;
                let ratingValoration = parseInt(reseña.rating);

                // Seleccionar las estrellas correspondientes
                for (let i = 0; i < ratingSelections.length; i++) {
                    const ratingValue = parseInt(ratingSelections[i].getAttribute('data-rating'));
                    if (ratingValue <= ratingValoration) {
                        ratingSelections[i].classList.remove('zmdi-star-outline');
                        ratingSelections[i].classList.add('zmdi-star');
                    } else {
                        ratingSelections[i].classList.remove('zmdi-star');
                        ratingSelections[i].classList.add('zmdi-star-outline');
                    }
                }

                ratingInput.value = ratingValoration

                reviewTextarea.value = reseña.reseña;
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