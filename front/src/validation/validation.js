const passwordRegex = /^(?=.*\d).{4,10}$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const userregex = /^[a-zA-Z0-9]{6,13}$/;

    export function validation(data) {
        let error = {};

        if(data.email){
            if (!data.email || data.email.length === 0) {
            error.email = 'El nombre de usuario no puede estar vacío.';
            }

            if (data.email.length > 35) {
            error.email = 'El nombre de usuario no puede tener más de 35 caracteres.';
            }
        
            if (!emailRegex.test(data.email)) {
            error.email = 'El email debe ser una dirección de correo electrónico válida.';
            }
        }

        if(!userregex.test(data.username)){
          error.username = 'debe contener de 8 a 13 caracter, solo letras y numeros'
        }
        if (!passwordRegex.test(data.password)) {
          error.password = 'La contraseña debe tener al menos un número y tener una longitud entre 6 y 10 caracteres.';
        }
        if(data.password && data.confirmPassword){
          data.password !== data.confirmPassword && (error.confirmPassword = 'La confirmacion es diferente a la contraseña');
        }
        return error;
      }