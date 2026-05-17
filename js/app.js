// ================= BOTÓN HERO =================

const explorarBtn = document.getElementById('explorarBtn');

explorarBtn.addEventListener('click', () => {

    // Scroll suave hacia productos
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });

});