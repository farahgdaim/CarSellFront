// Fonction pour détecter si l'élément est visible
console.log("hello animation.js")

function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.8; // Déclenche quand 80% de l'élément est visible
}

// Applique l'animation sur le scroll
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => {
        if (isVisible(el)) {
            el.classList.add('active');
        }
    });
}

// Détecte le défilement
window.addEventListener('scroll', handleScroll);

// Pour déclencher l'animation au chargement si déjà visible
document.addEventListener('DOMContentLoaded', handleScroll);
