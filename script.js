
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada correctamente.");

    // Cargar proyectos desde JSON
    fetch('data/data.json')
        .then(res => res.json())
        .then(proyectos => {
            const contenedor = document.getElementById('projects-container');
            contenedor.innerHTML = proyectos.map(p => `
                <div class="card">
                    <img src="${p.imagen}" alt="${p.nombre}">
                    <h3>${p.nombre}</h3>
                </div>
            `).join('');
        });

    // Notificación de bienvenida
    if (Notification.permission === 'granted') {
        new Notification("¡Bienvenido a mi portafolio!");
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification("¡Gracias por activar las notificaciones!");
            }
        });
    }
});
