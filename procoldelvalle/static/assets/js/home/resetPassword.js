const resetForm = document.querySelector(".reset-form")
const passwordReset = document.querySelector("#password-reset")
const passwordResetRepeat = document.querySelector("#password-reset-repeat")
const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const infoPassword = document.querySelector(".info-button");

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

resetForm.addEventListener("submit", function(e){
    e.preventDefault()
  
    if (passwordReset.value === "" || passwordResetRepeat.value === "") {
      //Mostramos alerta
      Swal.fire({
        icon: 'error',
        title: 'Error al Restablecer la Contraseña',
        text: 'Asegurate de rellenar todos los datos de registro'
      })
    }
    else if (passwordReset.value !== passwordResetRepeat.value) {
        //Mostramos alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al Restablecer la Contraseña',
          text: 'Las contraseñas ingresadas no coinciden entre sí'
      })
    }else{
        //Validamos los parametros de la contraseña
        if (regExpPassword.test(passwordReset.value)) {
          // Crear un nuevo objeto FormData y agregar los campos del formulario
          let formData = new FormData(resetForm);
  
          // Crear una nueva petición Fetch para enviar los datos del formulario
          fetch(resetForm.action, {
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
          title: 'Contraseña Incorrecta',
          text: 'Asegurate de que la contraseña cumpla con los parametros establecidos'
        })
      }   
  }  
})