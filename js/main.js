function loadComponent(containerId, path, callback) {
  const container = document.getElementById(containerId);
  if (!container) return; // ✅ Si el contenedor no existe en esta página, no hace nada

  fetch(path)
    .then(res => res.text())
    .then(data => {
      container.innerHTML = data;
      if (callback) callback();
    })
    .catch(err => console.error("Error cargando componente:", path, err));
}

//  Navbar logic
function initNavbar() {
  const links = document.querySelectorAll('.opcionesBarra');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (window.location.pathname === new URL(href, window.location.origin).pathname) {
        return;
      }

      e.preventDefault();

      const transition = document.getElementById('coffecup-transition');
      if (!transition) {
        window.location.href = href;
        return;
      }

      sessionStorage.setItem("coffeeAnimation", "played");
      document.body.style.overflow = 'hidden';
      transition.style.display = 'flex';
      transition.classList.add('launching');

      setTimeout(() => {
        window.location.href = href;
      }, 900);
    });
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const menuCollapse = document.getElementById('navbarMenu');

  navLinks.forEach(l => {
    l.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        const bsCollapse = new bootstrap.Collapse(menuCollapse);
        bsCollapse.hide();
      }
    });
  });
}

//  CONTROL DE ANIMACIÓN
function handlePageAnimation() {
  const transition = document.getElementById('coffecup-transition');
  const played = sessionStorage.getItem("coffeeAnimation");

  if (!transition) return;

  if (played === "played") {
    transition.style.display = "none";
    sessionStorage.removeItem("coffeeAnimation");
  } else {
    transition.style.display = "none";
  }
}

// UN SOLO DOMContentLoaded — aquí va TODO
document.addEventListener("DOMContentLoaded", () => {

  handlePageAnimation();

  loadComponent("navbar-container",     "/components/navBar/navBar.html",       initNavbar);
  loadComponent("footer-container",     "/components/footer/footer.html");
  loadComponent("carrito-container",    "/components/cart/cart.html",            initCart);  //  carrito
  loadComponent("productform-container","/components/product/productForm.html",  initProductLogic);

  // Validación del formulario — solo si existe en esta página
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      document.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
      document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

      let isValid = true;

      const nombreInput = document.getElementById('name');
      const nombreRegex = /^[a-zA-Z\s]+$/;
      if (nombreInput.value.trim() === '') {
        mostrarError(nombreInput, 'Ingresa tu nombre');
        isValid = false;
      } else if (nombreInput.value.trim().length < 3) {
        mostrarError(nombreInput, 'El nombre debe tener al menos 3 caracteres');
        isValid = false;
      } else if (!nombreRegex.test(nombreInput.value.trim())) {
        mostrarError(nombreInput, 'El nombre solo puede contener letras y espacios');
        isValid = false;
      }

      const emailInput = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() === '') {
        mostrarError(emailInput, 'Ingresa tu correo electrónico');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        mostrarError(emailInput, 'Por favor, ingresa un correo electrónico válido');
        isValid = false;
      }

      const telefonoInput = document.getElementById('number');
      const telefonoRegex = /^[0-9+\s]+$/;
      if (telefonoInput.value.trim() === '') {
        mostrarError(telefonoInput, 'Ingresa tu número de teléfono');
        isValid = false;
      } else if (!telefonoRegex.test(telefonoInput.value.trim())) {
        mostrarError(telefonoInput, 'Por favor, ingresa un número de teléfono válido');
        isValid = false;
      } else if (telefonoInput.value.trim().length < 10) {
        mostrarError(telefonoInput, 'El número de teléfono debe tener al menos 10 dígitos');
        isValid = false;
      }

      const mensajeInput = document.getElementById('message');
      if (mensajeInput.value.trim() === '') {
        mostrarError(mensajeInput, 'Ingresa un mensaje');
        isValid = false;
      } else if (mensajeInput.value.trim().length < 10) {
        mostrarError(mensajeInput, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
      }

      if (isValid) {
        console.log("Formulario válido, enviando...");
        form.submit();
      }
    });
  }
});

function mostrarError(input, mensaje) {
  input.classList.add('is-invalid');
  const error = document.createElement('div');
  error.className = 'invalid-feedback';
  error.textContent = mensaje;
  input.parentElement.appendChild(error);

  input.addEventListener('input', function() {
    if (input.value.trim() !== '') {
      input.classList.remove('is-invalid');
      error.remove();
    }
  });
}

