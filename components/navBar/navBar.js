document.querySelectorAll('.opcionesBarra').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Detenemos el salto inmediato en ambos casos
        
        const href = this.getAttribute('href');
        const transition = document.getElementById('coffecup-transition');
        const coffecupContainer = transition.querySelector('.coffecup');

        // 1. Iniciar la animación común
        document.body.style.overflow = 'hidden'; 
        transition.style.display = 'flex';
        
        setTimeout(() => {
            transition.classList.add('launching');
        }, 10);

        // 2. Lógica diferenciada
        if (href.startsWith('#')) {
            // --- CASO A: Scroll interno ---
            const targetSection = document.querySelector(href);
            
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 600);

            setTimeout(() => {
                transition.style.display = 'none';
                transition.classList.remove('launching');
                document.body.style.overflow = 'auto';
            }, 1200); 

        } else {
            // --- CASO B: Ir a otra página .html ---
            // Esperamos a que la mancha cubra la pantalla para cambiar de página
            setTimeout(() => {
                window.location.href = href; 
            }, 900); // Se dispara un poco antes de que termine para que sea fluido
        }
    });
});
