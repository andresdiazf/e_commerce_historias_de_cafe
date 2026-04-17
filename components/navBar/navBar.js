document.querySelectorAll('.opcionesBarra').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        const transition = document.getElementById('coffecup-transition');
        const coffecupContainer = transition.querySelector('.coffecup');

        document.body.style.overflow = 'hidden'; 
        transition.style.display = 'flex';
        
        setTimeout(() => {
            transition.classList.add('launching');
        }, 10);

        if (href.startsWith('#')) {
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

            setTimeout(() => {
                window.location.href = href; 
            }, 900);
        }
    });
});
