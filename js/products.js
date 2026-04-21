// 1. Declaramos la lista (array) fuera para que sea global a la lógica
const listaProductos = []; 

function initProductLogic() {
    console.log("Iniciando lógica del formulario de productos...");
    
    const form = document.getElementById('form-producto');

    if (!form) {
        console.error("No se encontró el formulario #form-producto");
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const imagenInput = document.getElementById('imagen');
        
        // 2. Creamos el objeto del producto actual
        const producto = {
            id: Date.now(), //TODO: aun no implementado , pendiente de organizar con db.
            nombre: document.getElementById('nombre').value,
            origen: document.getElementById('origen').value,
            tostado: document.getElementById('tostado').value,
            estado: document.getElementById('estado').value,
            stock: parseInt(document.getElementById('stock').value),
            precio: parseFloat(document.getElementById('precio').value),
            descripcion: document.getElementById('descripcion').value,
            imagen: imagenInput.files[0] ? imagenInput.files[0].name : 'No seleccionada'
        };

        listaProductos.push(producto);
        console.log("Lista de productos actualizada:");
        console.log(JSON.stringify(listaProductos, null, 2));

        form.reset();
        alert('Producto agregado a la lista');
    });
}