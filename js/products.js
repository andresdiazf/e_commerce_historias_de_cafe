function initProductLogic() {
    console.log("Iniciando lógica del formulario de productos...");
    
    const form = document.getElementById('form-producto');

    if (!form) {
        console.error("No se encontró el formulario #form-producto");
        return;
    }

    form.addEventListener('submit', (e) => {
        // 1. Prevenir que la página se recargue
        e.preventDefault();

        // 2. Capturar los valores de los inputs
        const imagenInput = document.getElementById('imagen');
        
        const producto = {
            nombre: document.getElementById('nombre').value,
            origen: document.getElementById('origen').value,
            tostado: document.getElementById('tostado').value,
            estado: document.getElementById('estado').value,
            stock: parseInt(document.getElementById('stock').value),
            precio: parseFloat(document.getElementById('precio').value),
            descripcion: document.getElementById('descripcion').value,
            imagen: imagenInput.files[0] ? imagenInput.files[0].name : 'No seleccionada'
        };

        // 3. Convertir a JSON y mostrar en consola
        console.log("Objeto JavaScript capturado:", producto);
        const productoJSON = JSON.stringify(producto, null, 2);
        console.log("JSON resultante:\n", productoJSON);

        // Opcional: Limpiar el formulario
        form.reset();
        
        alert('Producto guardado con éxito. Revisa la consola.');
    });
}