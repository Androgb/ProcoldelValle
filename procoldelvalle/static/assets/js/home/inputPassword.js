//Funcion para mostrar la contraseña
const iconPassword = document.querySelectorAll(".show-password");

iconPassword.forEach(icon => {
    icon.addEventListener("click", function(e){
      input = e.target.previousElementSibling;
  
      if (input.type === "password") {
        input.type = "text";
        e.target.classList.remove("fa-eye")
        e.target.classList.add("fa-eye-slash")
      }else if (input.type === "text") {
        input.type = "password";
        e.target.classList.remove("fa-eye-slash")
        e.target.classList.add("fa-eye")
      }    
    })
  });