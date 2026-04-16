/* ================================================================
   LÓGICA DE CADASTRO COMPLETA - QUEBRAGALHO
   ================================================================ */

// --- CONFIGURAÇÕES INICIAIS ---
const multiStepForm = document.getElementById('multi-step-form');
const inputCPF = document.getElementById('cpf');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-message');

/**
 * Exibe uma notificação elegante (Toast)
 */
function showToast(mensagem) {
    if (!toast || !toastMsg) return;
    toastMsg.innerText = mensagem;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Alterna entre os passos do formulário (Mobile Friendly)
 */
function nextStep(step) {
    // Validação ao tentar ir para o passo 2
    if (step === 2) {
        const nome = document.getElementById('nome').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!nome || !cpf || !email) {
            showToast("Preencha todos os campos para continuar.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Insira um e-mail válido.");
            return;
        }

        if (cpf.length < 14) {
            showToast("CPF incompleto.");
            return;
        }
    }

    // Transição de telas
    document.querySelectorAll('.form-step').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });

    const nextStepEl = document.getElementById('step-' + step);
    if (nextStepEl) {
        nextStepEl.style.display = 'block';
        nextStepEl.classList.add('active');
        window.scrollTo(0, 0); // Volta ao topo no mobile
    }
}

/**
 * Alterna a visibilidade da senha
 */
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

/**
 * Máscara de CPF Automática (000.000.000-00)
 */
inputCPF.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    e.target.value = v.substring(0, 14);
});

/**
 * SUBMIT FINAL: Salvando em JSON
 */
multiStepForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirma = document.getElementById('confirma-senha').value;

    // Validação de senha
    if (senha.length < 6) {
        showToast("A senha deve ter no mínimo 6 dígitos.");
        return;
    }

    if (senha !== confirma) {
        showToast("As senhas não coincidem!");
        return;
    }

    // --- CRIAÇÃO DO OBJETO JSON ---
    const novoUsuario = {
        id: Date.now(), // Gera um ID único simples
        nome,
        cpf,
        email,
        senha, // Nota: Em produção, senhas devem ser criptografadas no servidor
        tipo: "PF",
        criadoEm: new Date().toLocaleString('pt-BR')
    };

    try {
        // Busca lista existente ou cria nova
        let db = JSON.parse(localStorage.getItem('../json/freelancers.json')) || [];
        
        // Verifica se e-mail já existe
        if (db.some(u => u.email === email)) {
            showToast("Este e-mail já está cadastrado.");
            return;
        }

        // Adiciona e salva
        db.push(novoUsuario);
        localStorage.setItem('usuarios_quebragalho', JSON.stringify(db));

        showToast("✅ Cadastro realizado com sucesso!");
        console.log("JSON Salvo:", novoUsuario);

        // Redireciona após sucesso
        setTimeout(() => {
            window.location.href = "../index/index.html";
        }, 2000);

    } catch (error) {
        showToast("Erro ao salvar dados.");
        console.error(error);
    }
});