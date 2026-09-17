document.addEventListener("DOMContentLoaded", () => {
    const placeHolder = document.getElementById("navbar-placeholder");
    if (!placeHolder) return;

    fetch('components/navbar.html')
        .then((response) => response.text())
        .then((html) => {
            placeHolder.innerHTML = html;
        })
        .catch((error) => console.error("Failed to load navbar:", error));
});