function initCart() {
  // VARIABLES
  let cantidadItems = 0;
  let totalAcumulado = 0;

  // REFERENCIAS
  const carritoLateral = document.querySelector('#carrito-lateral');
  const carritoOverlay = document.querySelector('#carrito-overlay');
  const carritoItems = document.querySelector('#carrito-items');
  const subtotalValor = document.querySelector('#subtotal-valor');
  const conteoProductos = document.querySelector('.conteo-productos');

  if (carritoItems) carritoItems.innerHTML = '';

  // ABRIR / CERRAR
  window.toggleCarrito = function() {
    carritoLateral.classList.toggle('abierto');
    carritoOverlay.classList.toggle('activo');
  };

  function adjuntarBotonesCarrito() {
    document.querySelectorAll('.btn-cart').forEach(function(boton) {
      if (boton.dataset.cartReady) return;
      boton.dataset.cartReady = 'true';
      boton.addEventListener('click', function() {
        const card = boton.closest('.card');
        const nombre = card.querySelector('h3').textContent.trim();
        const imgSrc = card.querySelector('img')?.src || '';
        const precioTexto = card.querySelector('.price').textContent
          .replace('$', '').replace(/\./g, '').trim();
        const precio = parseFloat(precioTexto);
        agregarAlCarrito(nombre, precio, imgSrc);
        if (!carritoLateral.classList.contains('abierto')) toggleCarrito();
      });
    });
  }

  adjuntarBotonesCarrito();
  document.addEventListener('catalogoListo', adjuntarBotonesCarrito);

  function agregarAlCarrito(nombre, precio, imgSrc) {
    const itemExistente = carritoItems.querySelector(`[data-nombre="${nombre}"]`);
    if (itemExistente) {
      const nuevaCantidad = parseInt(itemExistente.dataset.cantidad) + 1;
      actualizarCantidadItem(itemExistente, nuevaCantidad);
      cantidadItems += 1;
      totalAcumulado += precio;
      updateConteo();
      updateSubtotal();
      return;
    }

    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.dataset.nombre = nombre;
    div.dataset.precio = precio;
    div.dataset.cantidad = 1;
    div.innerHTML = `
      <div class="prod-info">
        <div class="prod-img-placeholder"><img src="${imgSrc}" style="width:100%; height:100%; object-fit:cover;"></div>
        <div class="prod-detalles"><p>${nombre}</p><button class="btn-eliminar">🗑️</button></div>
      </div>
      <div class="prod-precio">$${precio.toLocaleString('es-CO')}</div>
      <div class="prod-cantidad">
        <div class="control-cantidad">
          <button class="btn-restar-item">−</button>
          <span class="item-cantidad">1</span>
          <button class="btn-sumar-item">+</button>
        </div>
      </div>
      <div class="prod-total item-subtotal">$${precio.toLocaleString('es-CO')}</div>`;

    carritoItems.appendChild(div);
    div.querySelector('.btn-sumar-item').addEventListener('click', () => {
      actualizarCantidadItem(div, parseInt(div.dataset.cantidad) + 1);
      cantidadItems += 1; totalAcumulado += precio; updateConteo(); updateSubtotal();
    });
    div.querySelector('.btn-restar-item').addEventListener('click', () => {
      const nueva = parseInt(div.dataset.cantidad) - 1;
      if (nueva < 1) return;
      actualizarCantidadItem(div, nueva);
      cantidadItems -= 1; totalAcumulado -= precio; updateConteo(); updateSubtotal();
    });
    div.querySelector('.btn-eliminar').addEventListener('click', () => eliminarItem(div));

    cantidadItems += 1;
    totalAcumulado += precio;
    updateConteo();
    updateSubtotal();
  }

  function actualizarCantidadItem(div, nuevaCantidad) {
    const precio = parseFloat(div.dataset.precio);
    div.dataset.cantidad = nuevaCantidad;
    div.querySelector('.item-cantidad').textContent = nuevaCantidad;
    div.querySelector('.item-subtotal').textContent = '$' + (precio * nuevaCantidad).toLocaleString('es-CO');
  }

  function eliminarItem(div) {
    cantidadItems -= parseInt(div.dataset.cantidad);
    totalAcumulado -= parseFloat(div.dataset.precio) * parseInt(div.dataset.cantidad);
    div.remove();
    updateConteo();
    updateSubtotal();
  }

  function updateConteo() { conteoProductos.textContent = `${cantidadItems} productos`; }
  function updateSubtotal() { subtotalValor.textContent = '$' + totalAcumulado.toLocaleString('es-CO'); }

 const checkoutButton = document.getElementById("btn-pagar");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", async () => {
      
      const items = [];
      document.querySelectorAll('.carrito-item').forEach(div => {
        items.push({
          title: div.dataset.nombre,
          unit_price: Number(div.dataset.precio),
          quantity: Number(div.dataset.cantidad),
          currency_id: 'COP'
        });
      });

      if (items.length === 0) return alert("Tu carretilla está vacía");

      try {
        checkoutButton.textContent = "Cargando pago...";
        checkoutButton.disabled = true;

        const response = await fetch("http://localhost:3000/create_preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items })
        });

        const data = await response.json();

        if (data.init_point) {
          // REDIRECCIÓN DIRECTA: Esto ignora el error del SDK
          window.location.href = data.init_point;
        } else {
          throw new Error("No se pudo obtener el link de pago");
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor de pagos");
        checkoutButton.textContent = "Ir a pagar";
        checkoutButton.disabled = false;
      }
    });
  }
}