function loadComponent(containerId, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => console.error("Error cargando componente:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar-container", "../../components/navBar/navBar.html");
  loadComponent("footer-container", "/components/footer/footer.html");
});
