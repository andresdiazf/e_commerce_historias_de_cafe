
// initCart — callback de loadComponent en main.js y Se ejecuta cuando cart.html que ya está en el DOM

function initCart() {

  // VARIABLES
  let cantidadItems  = 0
  let totalAcumulado = 0

  // REFERENCIAS
  const carritoLateral  = document.querySelector('#carrito-lateral')
  const carritoOverlay  = document.querySelector('#carrito-overlay')
  const carritoItems    = document.querySelector('#carrito-items')
  const subtotalValor   = document.querySelector('#subtotal-valor')
  const conteoProductos = document.querySelector('.conteo-productos')

  // Limpia el item de ejemplo hardcodeado en cart.html
  carritoItems.innerHTML = ''

  
  // ABRIR / CERRAR  → window para los onclick del HTML
  
  window.toggleCarrito = function() {
    carritoLateral.classList.toggle('abierto')
    carritoOverlay.classList.toggle('activo')
  }

  // Se llama tanto al init como al recibir 'catalogoListo'
  // para cubrir tarjetas pintadas dinámicamente por catalogo.js
  
  function adjuntarBotonesCarrito() {
    document.querySelectorAll('.btn-cart').forEach(function(boton) {

      // Evita duplicar listeners con la flag data-cart-ready
      if (boton.dataset.cartReady) return
      boton.dataset.cartReady = 'true'

      boton.addEventListener('click', function() {
        const card   = boton.closest('.card')
        const nombre = card.querySelector('h3').textContent.trim()
        const imgSrc = card.querySelector('img')?.src || ''

        const precioTexto = card.querySelector('.price').textContent
          .replace('$', '')
          .replace(/\./g, '')
          .trim()
        const precio = parseFloat(precioTexto)

        agregarAlCarrito(nombre, precio, imgSrc)

        if (!carritoLateral.classList.contains('abierto')) toggleCarrito()
      })
    })
  }

  // Adjunta en tarjetas que ya existen al cargar
  adjuntarBotonesCarrito()

  // Adjunta también en tarjetas que pinte catalogo.js después
  document.addEventListener('catalogoListo', adjuntarBotonesCarrito)

  
  // AGREGAR AL CARRITO
  
  function agregarAlCarrito(nombre, precio, imgSrc) {

    // Si ya existe → solo suma 1
    const itemExistente = carritoItems.querySelector(`[data-nombre="${nombre}"]`)
    if (itemExistente) {
      const nuevaCantidad = parseInt(itemExistente.dataset.cantidad) + 1
      actualizarCantidadItem(itemExistente, nuevaCantidad)
      cantidadItems  += 1
      totalAcumulado += precio
      updateConteo()
      updateSubtotal()
      return
    }

    // Si no existe → crea la fila
    const div = document.createElement('div')
    div.className = 'carrito-item'
    div.dataset.nombre   = nombre
    div.dataset.precio   = precio
    div.dataset.cantidad = 1

    div.innerHTML = `
      <div class="prod-info">
        <div class="prod-img-placeholder">
          <img src="${imgSrc}" alt="${nombre}"
               style="width:100%; height:100%; object-fit:cover; border-radius:4px;">
        </div>
        <div class="prod-detalles">
          <p>${nombre}</p>
          <button class="btn-eliminar">🗑️</button>
        </div>
      </div>

      <div class="prod-precio">
        $${precio.toLocaleString('es-CO')}
      </div>

      <div class="prod-cantidad">
        <div class="control-cantidad">
          <button class="btn-restar-item">−</button>
          <span class="item-cantidad">1</span>
          <button class="btn-sumar-item">+</button>
        </div>
      </div>

      <div class="prod-total item-subtotal">
        $${precio.toLocaleString('es-CO')}
      </div>
    `

    carritoItems.appendChild(div)

    div.querySelector('.btn-sumar-item').addEventListener('click', function() {
      const nueva = parseInt(div.dataset.cantidad) + 1
      if (nueva > 99) return
      actualizarCantidadItem(div, nueva)
      cantidadItems  += 1
      totalAcumulado += parseFloat(div.dataset.precio)
      updateConteo()
      updateSubtotal()
    })

    div.querySelector('.btn-restar-item').addEventListener('click', function() {
      const nueva = parseInt(div.dataset.cantidad) - 1
      if (nueva < 1) return
      actualizarCantidadItem(div, nueva)
      cantidadItems  -= 1
      totalAcumulado -= parseFloat(div.dataset.precio)
      updateConteo()
      updateSubtotal()
    })

    div.querySelector('.btn-eliminar').addEventListener('click', function() {
      eliminarItem(div)
    })

    cantidadItems  += 1
    totalAcumulado += precio
    updateConteo()
    updateSubtotal()
  }

   
  // HELPER: actualiza cantidad y subtotal del item
  
  function actualizarCantidadItem(div, nuevaCantidad) {
    const precio        = parseFloat(div.dataset.precio)
    const nuevoSubtotal = precio * nuevaCantidad

    div.dataset.cantidad = nuevaCantidad
    div.querySelector('.item-cantidad').textContent = nuevaCantidad
    div.querySelector('.item-subtotal').textContent =
      '$' + nuevoSubtotal.toLocaleString('es-CO')
  }

  
  // ELIMINAR ITEM
  
  function eliminarItem(div) {
    const cantidad = parseInt(div.dataset.cantidad)
    const precio   = parseFloat(div.dataset.precio)

    cantidadItems  -= cantidad
    totalAcumulado -= precio * cantidad

    if (cantidadItems  < 0) cantidadItems  = 0
    if (totalAcumulado < 0) totalAcumulado = 0

    div.remove()
    updateConteo()
    updateSubtotal()
  }

  
  // CONTEO y SUBTOTAL
  
  function updateConteo() {
    conteoProductos.textContent =
      cantidadItems === 1 ? '1 producto' : `${cantidadItems} productos`
  }

  function updateSubtotal() {
    subtotalValor.textContent = '$' + totalAcumulado.toLocaleString('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

} 