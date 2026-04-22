const listaProductos = [];

function initProductLogic() {
    const form = document.getElementById('form-producto');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Limpiar errores anteriores
        document.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
        document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

        let isValid = true;

        // Validaciones de formulario productos

        // Validacion de input nombre
        const nombreInput = document.getElementById('nombre');
        if (nombreInput.value.trim() === '' || nombreInput.value.trim().length < 3) {
            mostrarError(nombreInput, 'El nombre es obligatorio y debe tener al menos 3 caracteres');
            isValid = false;
        }

        // Validacion de input origen
        const origenInput = document.getElementById('origen');
        if (origenInput.value.trim() === '' || origenInput.value.trim().length < 3) {
            mostrarError(origenInput, 'El origen es obligatorio y debe tener al menos 3 caracteres');
            isValid = false;
        }

        //  validacion de select tostado
        const tostadoInput = document.getElementById('tostado');
        if (tostadoInput.value === '' ) {
            mostrarError(tostadoInput, 'Selecciona un tipo de tostión');
            isValid = false;
        }

        // validacion de select estado
        const estadoInput = document.getElementById('estado');
        if (estadoInput.value === '') {
            mostrarError(estadoInput, 'Selecciona el estado');
            isValid = false;
        }

        // Validaion de input imagen
        const imagenInput = document.getElementById('imagen');
        if (!imagenInput.files[0]) {
            mostrarError(imagenInput, 'Debes cargar una imagen');
            isValid = false;
        }

        // validacion de input stock que no sea negativo
        const stockInput = document.getElementById('stock');
        if (stockInput.value === '' || parseInt(stockInput.value) < 0) {
            mostrarError(stockInput, 'Ingresa un stock válido (mínimo 0)');
            isValid = false;
        }

        // valacion de input precio que no sea negativo o cero
        const precioInput = document.getElementById('precio');
        if (precioInput.value === '' || parseFloat(precioInput.value) <= 0) {
            mostrarError(precioInput, 'El precio debe ser mayor a 0');
            isValid = false;
        }

        // validacion de textarea descripcion que tenga al menos 10 caracteres
        const descInput = document.getElementById('descripcion');
        if (descInput.value.trim().length < 10) {
            mostrarError(descInput, 'La descripción debe tener al menos 10 caracteres');
            isValid = false;
        }

        // --- SI TODO ES VÁLIDO ---
        if (isValid) {
            const producto = {
                id: Date.now(),
                nombre: nombreInput.value.trim(),
                origen: origenInput.value.trim(),
                tostado: tostadoInput.value,
                estado: estadoInput.value,
                stock: parseInt(stockInput.value),
                precio: parseFloat(precioInput.value),
                descripcion: descInput.value.trim(),
                imagen: imagenInput.files[0].name
            };

            listaProductos.push(producto);

            console.log("Lista de productos actualizada:");
            console.log(JSON.stringify(listaProductos, null, 2));
            

            form.reset();
            alert('Producto agregado con éxito al catálogo');
        }
    });
}

// Función auxiliar para mostrar errores (mantiene tu estilo)
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

// Inicializar la lógica
initProductLogic();