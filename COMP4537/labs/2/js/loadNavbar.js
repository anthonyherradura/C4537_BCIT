/**
 * Made with assistance of Claude AI agent.
 */
document.addEventListener("DOMContentLoaded", () => {
    const placeHolder = document.getElementById("navbar-placeholder");
    if (!placeHolder) return;

    fetch('components/navbar.html')
        .then((response) => response.text())
        .then((html) => {
            placeHolder.innerHTML = html;
            populateNavBar();
            setActiveNavLink();
        })
        .catch((error) => console.error("Failed to load navbar:", error));
});

function populateNavBar() {
    document.getElementById("navBrand").textContent = STRINGS.nav.brandLabel;
    document.getElementById("navHomeLink").textContent = STRINGS.nav.homeLabel;
    document.getElementById("navWriterLink").textContent = STRINGS.nav.writerLabel;
    document.getElementById("navReaderLink").textContent = STRINGS.nav.readerLabel;
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("#navbarNav .nav-link");

    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });
}