function loadComponent(containerId, path, callback) {
  fetch(path)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(containerId).innerHTML = data;
      if (callback) callback();
    });
}

// 🔥 Navbar logic PRO
function initNavbar() {
  const links = document.querySelectorAll(".opcionesBarra");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (
        window.location.pathname ===
        new URL(href, window.location.origin).pathname
      ) {
        return;
      }

      e.preventDefault();
      const transition = document.getElementById("coffecup-transition");

      if (!transition) {
        window.location.href = href;
        return;
      }

      sessionStorage.setItem("coffeeAnimation", "played");
      document.body.style.overflow = "hidden";
      transition.style.display = "flex";
      transition.classList.add("launching");

      setTimeout(() => {
        window.location.href = href;
      }, 900);
    });
  });

  const navLinks = document.querySelectorAll(".nav-link");
  const menuCollapse = document.getElementById("navbarMenu");

  navLinks.forEach((l) => {
    l.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        const bsCollapse = new bootstrap.Collapse(menuCollapse);
        bsCollapse.hide();
      }
    });
  });
}

function handlePageAnimation() {
  const transition = document.getElementById("coffecup-transition");
  const played = sessionStorage.getItem("coffeeAnimation");

  if (!transition) return;

  if (played === "played") {
    transition.style.display = "none";
    sessionStorage.removeItem("coffeeAnimation");
  } else {
    transition.style.display = "none";
  }
}

// 🚀 INIT
document.addEventListener("DOMContentLoaded", () => {
  handlePageAnimation();

  loadComponent(
    "navbar-container",
    "../../components/navBar/navBar.html",
    
  );
 loadComponent(
    "productform-container",
    "../../components/product/productForm.html",
    initProductLogic
  );
});
