function renderizarProductosStorage() {
    const contenedor = document.getElementById('catalogo-container');
    const productosStorage = localStorage.getItem('productos');


    if (productosStorage) {
        const listaProductos = JSON.parse(productosStorage);

        listaProductos.forEach(prod => {

            const cardHTML = `
                <article class="card">
                    <div class="image-placeholder">
                        <img src="${prod.imagen}" onerror="this.src='https://placeholder.com'" alt="${prod.nombre}"
                        style="width: auto; height: 100%; object-fit: contain;">
                    </div>
                    <div class="card-content">
                        <h3>${prod.nombre}</h3>
                        <p class="finca">${prod.origen}</p>
                        <div class="stars">★★★★★</div>
                        <p class="description">${prod.descripcion}</p>
                        <p class="price">$${prod.precio.toLocaleString()}</p>
                        <div class="card-buttons">
                            <button class="btn-cart">AÑADIR AL CARRITO</button>
                            <button class="btn-detail">👁️ MOSTRAR DETALLE</button>
                        </div>
                    </div>
                </article>
            `;
            
            contenedor.innerHTML += cardHTML;
        });
    }
}

document.addEventListener('DOMContentLoaded', renderizarProductosStorage);
