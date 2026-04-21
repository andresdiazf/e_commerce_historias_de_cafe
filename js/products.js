// Donde se guardan todos los productos
let listaParaRenderizar = [];

/**
 * Formulario (Captura de datos)
 */
function initProductLogic() {
  console.log("Iniciando lógica del formulario de productos...");
  const form = document.getElementById("form-producto");

  if (!form) {
    console.error("No se encontró el formulario #form-producto");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const imagenInput = document.getElementById("imagen");

    const producto = {
      nombre: document.getElementById("nombre").value,
      origen: document.getElementById("origen").value,
      tostado: document.getElementById("tostado").value,
      estado: document.getElementById("estado").value,
      stock: parseInt(document.getElementById("stock").value),
      precio: parseFloat(document.getElementById("precio").value),
      descripcion: document.getElementById("descripcion").value,
      imagen: imagenInput.files[0]
        ? imagenInput.files[0].name
        : "No seleccionada",
    };

    // Guardar en la lista y actualizar la vista
    listaParaRenderizar.push(producto);
    renderizarTablaPlus();

    // Limpieza y Cierre automático del panel
    form.reset();
    cerrarPanelFormulario();

    alert("¡Producto añadido exitosamente!");
  });
}

/**
 * Función para dibujar la tabla con soporte para múltiples filas y colores
 */
function renderizarTablaPlus() {
  const contenedorTabla = document.getElementById("contenedor-lista-dinamica");
  const tbody = document.getElementById("cuerpo-tabla");

  if (!tbody) return;

  if (listaParaRenderizar.length === 0) {
    if (contenedorTabla) contenedorTabla.style.display = "none";
    return;
  } else {
    if (contenedorTabla) contenedorTabla.style.display = "block";
  }

  tbody.innerHTML = "";

  listaParaRenderizar.forEach((item, index) => {
    const esDisponible = item.estado.toLowerCase() === "disponible";
    const colorFondo = esDisponible ? "#28a745" : "#dc3545";

    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio.toLocaleString()}</td>
            <td>${item.stock}</td>
            <td>
                <span style="background-color: ${colorFondo}; color: white; padding: 4px 12px; border-radius: 50px; font-size: 0.85rem; font-weight: 500;">
                    ${item.estado}
                </span>
            </td>
            <td>
                <button class="btn-delete" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
    tbody.appendChild(fila);
  });
}

/**
 * Función Global para eliminar (Necesita 'window' para el onclick)
 */
window.eliminarProducto = function (index) {
  console.log("Eliminando producto en índice:", index);
  listaParaRenderizar.splice(index, 1);
  renderizarTablaPlus();
};

/**
 * Lógica para abrir/cerrar el formulario (Toggle)
 */
function configurarDespliegueFormulario() {
  const btnAdd = document.querySelector(".btn-add");
  const container = document.getElementById("productform-container");

  if (btnAdd && container) {
    container.style.display = "none";

    btnAdd.addEventListener("click", () => {
      if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "block";
        btnAdd.textContent = "Cerrar formulario";
        btnAdd.style.backgroundColor = "#6c757d";
      } else {
        cerrarPanelFormulario();
      }
    });
  }
}

function cerrarPanelFormulario() {
  const container = document.getElementById("productform-container");
  const btnAdd = document.querySelector(".btn-add");

  if (container) container.style.display = "none";
  if (btnAdd) {
    btnAdd.textContent = "Añadir productos";
    btnAdd.style.backgroundColor = "";
  }
}

// EJECUCIÓN INICIAL
configurarDespliegueFormulario();
initProductLogic();