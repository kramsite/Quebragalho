// base/base.js
document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.getElementById('open-menu');
    const btnClose = document.getElementById('close-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (btnOpen && btnClose && sidebar && overlay) {
        const toggleMenu = () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        };

        btnOpen.addEventListener('click', toggleMenu);
        btnClose.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }
});