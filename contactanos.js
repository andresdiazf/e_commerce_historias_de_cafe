const form = document.querySelector('form');

form.addEventListener('submit', function (event) {

    //Prevenimos el envio automatico del formulario
    event.preventDefault();
    //Limpiamos los errores anteriores
    document.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
    document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

    let isValid = true;

    //Realizo validaciones para cada input de form
    //Validacion de input nombre
    const nombreInput = document.getElementById('name');
    const nombreRegex = /^[a-zA-Z\s]+$/; //Solo letras y espacios 
    //Validamos que el campo no este vacio
    if (nombreInput.value.trim() === '') {
        mostrarError(nombreInput, 'Ingresa tu nombre');
        isValid = false;
    } else if (nombreInput.value.trim().length < 3) {
        mostrarError(nombreInput, 'El nombre debe tener al menos 3 caracteres');
        isValid = false;
    }else if (!nombreRegex.test(nombreInput.value.trim())) {
        mostrarError(nombreInput, 'El nombre solo puede contener letras y espacios');
        isValid = false;
    }
    //Validacion de input email
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        mostrarError(emailInput, 'Ingresa tu correo electrónico');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        mostrarError(emailInput, 'Por favor, ingresa un correo electrónico válido');
        isValid = false;
    }
    //Valicion de input telefono
    const telefonoInput = document.getElementById('number');
    const telefonoRegex = /^[0-9+\s]+$/;
    if (telefonoInput.value.trim() === '') {
        mostrarError(telefonoInput, 'Ingresa tu número de teléfono');
        isValid = false;
    } else if (!telefonoRegex.test(telefonoInput.value.trim())) {
        mostrarError(telefonoInput, 'Por favor, ingresa un número de teléfono válido');
        isValid = false;
    }else if (telefonoInput.value.trim().length < 10) {
        mostrarError(telefonoInput, 'El número de teléfono debe tener al menos 10 dígitos');
        isValid = false;
    }
    // Validacion de textarea mensaje
    const mensajeInput = document.getElementById('message');
    if (mensajeInput.value.trim() === '') {
        mostrarError(mensajeInput, 'Ingresa un mensaje');
        isValid = false;
    } else if (mensajeInput.value.trim().length < 10) {
        mostrarError(mensajeInput, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    //Si el formulario es valido, se puede enviar
    if (isValid) {
        console.log("Formulario valido, enviando...");
        form.submit();
    }

});
function mostrarError(input, mensaje) {
    //Mostrar mensaje de error debajo del input
    input.classList.add('is-invalid'); //Esta clave es de boostrap que permite poner el borde rojo al input
    const error = document.createElement('div');
    error.className = 'invalid-feedback'; //Esta clase es de boostrap que permite mostrar el mensaje de error debajo del input https://getbootstrap.com/docs/5.0/forms/validation/
    error.textContent = `${mensaje}`;
    input.parentElement.appendChild(error);

    // Limpiar el rojo cuando el usuario corrige el error
    input.addEventListener('input', function () {
        if (input.value.trim() !== '') {
            input.classList.remove('is-invalid');
            error.remove();
        }
    });

}