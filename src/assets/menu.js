console.log("Starting");

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menuToggle");
    const fullscreenMenu = document.getElementById("fullscreenMenu");
    const closeMenu = document.getElementById("closeMenu");

    menuToggle.onclick = function() {
        if (fullscreenMenu.style.display === "flex") {
            fullscreenMenu.style.display = "none";
            menuToggle.textContent = "☰";
        } else {
            fullscreenMenu.style.display = "flex";
            menuToggle.textContent = "X";
        }
    };

    closeMenu.onclick = function() {
        fullscreenMenu.style.display = "none";
        menuToggle.textContent = "☰";
    };
});
