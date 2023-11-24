const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const infoPassword = document.querySelector(".info-button");
const registerForm = document.querySelector(".sign-up-form")
const loginForm = document.querySelector(".sign-in-form")
const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const regExpEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
const uploadButton = document.getElementById('upload-button')
const choosenImage = document.getElementById('choosen-image')
const checkboxLogin = document.getElementById("cbx")
const forgetPassword = document.querySelector(".forget-password")

//Modal
function getCSRFToken() {
	const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
	return cookieValue ? cookieValue[1] : '';
}

// Asignar el token CSRF a una variable JavaScript después de que se cargue la página
window.addEventListener('DOMContentLoaded', function() {
	const csrfToken = getCSRFToken();

	const htmlModalPassword = `
	<center>
  		<div class="modalGroup">
			<form action="/sendEmail/" method="POST" class="formReset">
				<i class="fa-solid fa-address-card"></i>
				<input placeholder="Cedula" type="number" class="input" name="cedulaVerification" style="margin-bottom: 10px">
				
				<br>

				<i class="fa-solid fa-envelope emailIcon"></i>
				<input placeholder="Email de Restablecimiento" type="email" class="input emailVerification" name="emailVerification">
				<input type="hidden" name="csrfmiddlewaretoken" value="${csrfToken}">
			</form>
  		</div>
	</center>
	`

	//Olvide mi contraseña - Evento una vez se obtenga el csrf
	forgetPassword.addEventListener("click", function(){
		Swal.fire({
			title: 'Recupera tu Contraseña',
			icon: "info",
			html: htmlModalPassword,
			showCloseButton: true,
			confirmButtonText: 'Enviar Verificación'
	  	}).then((result) => {
			if (result.isConfirmed) {
				const email = document.querySelector(".emailVerification").value;
				const formReset = document.querySelector(".formReset")
				//Verificacion de que lo ingresado sea un correo
				if (regExpEmail.test(email)) {
					// Crear un nuevo objeto FormData y agregar los campos del formulario
					let formData = new FormData(formReset);

					// Crear una nueva petición Fetch para enviar los datos del formulario
					fetch(formReset.action, {
						method: "POST",
						body: formData,
					})
					.then((data) => {
						window.location.href = data.url;
					})
				.catch((error) => {
					// Manejar el error de la petición Fetch
					Swal.fire({
						icon: 'error',
						title: '¡Ops! Ocurrió un error',
					  })
	  
					//Espera 2 segundos y recarga la pagina
	  
					setTimeout(() => {
						location.reload()
					  }, 2000);
				});
			}else{
				//Mostramos alerta
				Swal.fire({
					icon: 'error',
					title: 'Email Invalido',
					text: 'El email ingresado no tiene un formato valido'
				})
			}
		}
	  })
})
})


//Obtenemos los campo del formulario de registro
const imageInputRegister = document.getElementById('imageInput')
const cedulaInputRegister = document.getElementById("cedula-register")
const nombreInputRegister = document.getElementById("nombre-register")
const direccionInputRegister = document.getElementById("direccion-register")
const emailInputRegister = document.getElementById("email-register")
const telefonoInputRegister = document.getElementById("telefono-register")
const passwordInputRegister = document.getElementById("password-register")

//Obtenemos los campo del formulario de inicio de sesion
const cedulaInputLogin = document.getElementById("cedula-login")
const passwordInputLogin = document.getElementById("password-login")

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

infoPassword.addEventListener("click", function(){
  Swal.fire({
		title: 'Características Contraseña',
		icon: 'info',
		html:
		  '<ul style="list-style:inside"><li>Debe contener mínimo 8 caracteres</	li><li>Debe contener una letra mayúscula, una letra minúscula y un número</li><li>Puede contener un carácter especial (mayor seguridad)</li></ul>',
		showCloseButton: true,
		confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entendido!',
	  })
})

//Imagen de Perfil

uploadButton.addEventListener("change", function(e){
  //Obtenemos la url de la imagen
	let image = URL.createObjectURL(e.target.files[0])
	choosenImage.setAttribute("src", image)
})

//Checkbox de Login
checkboxLogin.addEventListener("change", function(e){
	if (e.target.checked) {
		loginForm.setAttribute("action", "/iniciarSesionTrabajador/")
	}else{
		loginForm.setAttribute("action", "/iniciarSesion/")
	}
})

//Registrarse

registerForm.addEventListener("submit", function(e){
  e.preventDefault()

  if (cedulaInputRegister.value === "" || nombreInputRegister.value === "" || direccionInputRegister.value === "" || emailInputRegister.value === "" || telefonoInputRegister.value === "" || passwordInputRegister.value === "") {
    //Mostramos alerta
    Swal.fire({
      icon: 'error',
      title: 'Error al Registrarse',
      text: 'Asegurate de rellenar todos los datos de registro'
    })
  }else{
    //Validamos los parametros de la contraseña
    if(regExpPassword.test(passwordInputRegister.value)){
      //Inicia sesion
		
		  // Crear un nuevo objeto FormData y agregar los campos del formulario
		  let formData = new FormData(registerForm);

		  // Crear una nueva petición Fetch para enviar los datos del formulario
		  fetch(registerForm.action, {
			  method: "POST",
			  body: formData,
		  })
			.then((data) => {
			  Swal.fire({
				  icon: 'success',
				  title: '¡Bienvenido a Procol!',
          text: 'Has creado tu cuenta correctamente'
				})

				//Espera 2 segundos y recarga la pagina

				setTimeout(() => {
				  window.location.href = data.url;
				}, 2000);
			})
			.catch((error) => {
			  // Manejar el error de la petición Fetch
			  Swal.fire({
				  icon: 'error',
				  title: '¡Ops! Ocurrió un error',
				})

			  //Espera 2 segundos y recarga la pagina

			  setTimeout(() => {
				  location.reload()
				}, 2000);
			});
    }else{
      //Mostramos alerta
      Swal.fire({
        icon: 'error',
        title: 'Contraseña Incorrecta',
        text: 'Asegurate de que la contraseña cumpla con los parametros establecidos'
      })
    }
  }
})

//Verifica el Login

loginForm.addEventListener("submit", function(e){
  e.preventDefault()

  if (cedulaInputLogin.value === "" || passwordInputLogin.value === "") {
    //Mostramos alerta
    Swal.fire({
      icon: 'error',
      title: 'Error al Iniciar Sesión',
      text: 'Asegurate de rellenar todos los datos'
    })
  }else{
      //Inicia sesion
		
		  // Crear un nuevo objeto FormData y agregar los campos del formulario
		  let formData = new FormData(loginForm);

		  // Crear una nueva petición Fetch para enviar los datos del formulario
		  fetch(loginForm.action, {
			  method: "POST",
			  body: formData,
		  })
			.then((data) => {
				  window.location.href = data.url;
			})
			.catch((error) => {
			  // Manejar el error de la petición Fetch
			  Swal.fire({
				  icon: 'error',
				  title: '¡Ops! Ocurrió un error',
				})

			  //Espera 2 segundos y recarga la pagina

			  setTimeout(() => {
				  location.reload()
				}, 2000);
			});
  }
})

