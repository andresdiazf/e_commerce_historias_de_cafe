document.addEventListener("DOMContentLoaded", () => {

    const menuItems = document.querySelectorAll(".sidebar ul li");
    const title = document.querySelector(".top-bar span");
    const mainContent = document.querySelector(".content-padding");

    const views = {
        "Dashboard": "<h2>Dashboard</h2>",
        "Productos": "<h2>Productos</h2><div id='productform-container'></div>",
        "Ordenes": "<h2>Órdenes</h2>",
        "Usuarios": "<h2>Usuarios</h2>",
        "Configuración": "<h2>Configuración</h2>"
    };

    menuItems.forEach(item => {
        item.addEventListener("click", () => {

            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const view = item.dataset.view;

            // Animación tipo SPA
            mainContent.classList.add("fade-out");

            setTimeout(() => {
                title.textContent = view;
                mainContent.innerHTML = views[view] || "<h2>Vista</h2>";

                mainContent.classList.remove("fade-out");
                mainContent.classList.add("fade-in");

                setTimeout(() => {
                    mainContent.classList.remove("fade-in");
                }, 300);

            }, 200);
        });
    });

    // Toggle sidebar
    const sidebar = document.querySelector(".sidebar");

    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "<i class='bi bi-list'></i>";
    toggleBtn.classList.add("toggle-btn");

    document.querySelector(".top-bar").prepend(toggleBtn);

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });

});

document.getElementById("openModal").onclick = () => {
    document.getElementById("modal-producto").style.display = "flex";
};