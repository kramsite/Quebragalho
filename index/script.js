/* === Lógica do Menu Sidebar === */
const btnOpen = document.getElementById('open-menu');
const btnClose = document.getElementById('close-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    if(sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

if(btnOpen) btnOpen.addEventListener('click', toggleMenu);
if(btnClose) btnClose.addEventListener('click', toggleMenu);
if(overlay) overlay.addEventListener('click', toggleMenu);


/* === Lógica do Olhinho (Ver Senha) === */
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}


/* === Redirecionamento de Login === */
document.getElementById('form-login')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página
    
    // Redireciona direto para a página principal
    // Certifique-se de que o caminho abaixo está correto para a sua pasta home
    window.location.href = "../home/home.html"; 
});