// --- MÁSCARAS DE INPUT ---
const inputCNPJ = document.getElementById('cnpj');
const inputCEP = document.getElementById('cep');

// Máscara CNPJ (00.000.000/0000-00)
inputCNPJ.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    if (v.length > 5) v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    if (v.length > 8) v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    if (v.length > 12) v = v.replace(/(\d{4})(\d)/, "$1-$2");
    e.target.value = v.substring(0, 18);
});

// Máscara CEP (00000-000)
inputCEP.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    e.target.value = v.substring(0, 9);
});

// --- NOTIFICAÇÃO TOAST ---
function showToast(mensagem) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.innerText = mensagem;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// --- VER/ESCONDER SENHA ---
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

// --- NAVEGAÇÃO DOS PASSOS ---
function nextStep(step) {
    if (step === 2) {
        // Validação Passo 1
        const razao = document.getElementById('razao-social').value.trim();
        const cnpj = document.getElementById('cnpj').value.trim();
        if (razao === "" || cnpj.length < 18) {
            showToast("Dados da empresa incompletos!");
            return;
        }
    } else if (step === 3) {
        // Validação Passo 2
        const resp = document.getElementById('responsavel').value.trim();
        const email = document.getElementById('email').value.trim();
        const cep = document.getElementById('cep').value.trim();
        if (resp === "" || !email.includes("@") || cep.length < 9) {
            showToast("Verifique o contato e o endereço!");
            return;
        }
    }

    // Troca de Passo
    document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
    document.getElementById('step-' + step).style.display = 'block';
}

// --- ENVIO DO FORMULÁRIO ---
document.getElementById('multi-step-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const senha = document.getElementById('senha').value;
    const confirma = document.getElementById('confirma-senha').value;

    if (senha.length < 6) {
        showToast("A senha deve ter pelo menos 6 dígitos.");
        return;
    }
    if (senha !== confirma) {
        showToast("As senhas não coincidem!");
        return;
    }

    showToast("Empresa cadastrada com sucesso!");
    setTimeout(() => { window.location.href = "../index/index.html"; }, 1500);
});