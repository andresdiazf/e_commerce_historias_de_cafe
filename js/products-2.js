document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-producto');
 
    form.addEventListener('submit', (e) => {
        // 1. Prevenir que la página se recargue
        e.preventDefault();
 
        // 2. Capturar los valores de los inputs
        // Para la imagen, capturamos el nombre del archivo o el objeto del archivo
        const imagenInput = document.getElementById('imagen');
        const producto = {
            nombre: document.getElementById('nombre').value,
            origen: document.getElementById('origen').value,
            tostado: document.getElementById('tostado').value,
            estado: document.getElementById('estado').value,
            stock: parseInt(document.getElementById('stock').value),
            precio: parseFloat(document.getElementById('precio').value),
            descripcion: document.getElementById('descripcion').value,
            // Aquí guardamos solo el nombre del archivo para el ejemplo
            imagen: imagenInput.files[0] ? imagenInput.files[0].name : 'No seleccionada'
        };
 
        // 3. Convertir a JSON y mostrar en consola
        console.log("Objeto JavaScript capturado:", producto);
        const productoJSON = JSON.stringify(producto, null, 2); // El '2' es para que se vea bonito (indentado)
        console.log("JSON resultante:\n", productoJSON);
 
        // Opcional: Limpiar el formulario después de enviar
        // form.reset();
        alert('Producto capturado con éxito. Revisa la consola (F12).');
    });
});







