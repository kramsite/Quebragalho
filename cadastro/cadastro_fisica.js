/* ================================================================
   LÓGICA DE CADASTRO COMPLETA - QUEBRAGALHO (SIMULAÇÃO JSON)
   ================================================================ */

const multiStepForm = document.getElementById('multi-step-form');
const inputCPF = document.getElementById('cpf');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-message');

// Chave única para simular o banco de dados
const DB_PATH = '../json/freelancers.json';

function showToast(mensagem) {
    if (!toast || !toastMsg) return;
    toastMsg.innerText = mensagem;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function nextStep(step) {
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

    document.querySelectorAll('.form-step').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });

    const nextStepEl = document.getElementById('step-' + step);
    if (nextStepEl) {
        nextStepEl.style.display = 'block';
        nextStepEl.classList.add('active');
        window.scrollTo(0, 0);
    }
}

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

inputCPF.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, ""); 
    if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    e.target.value = v.substring(0, 14);
});

/**
 * SUBMIT FINAL: Salvando com lógica de "Banco de Dados"
 */
multiStepForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirma = document.getElementById('confirma-senha').value;

    if (senha.length < 6) {
        showToast("A senha deve ter no mínimo 6 dígitos.");
        return;
    }

    if (senha !== confirma) {
        showToast("As senhas não coincidem!");
        return;
    }

    // Estrutura profissional do objeto
    const novoFreelancer = {
        id: `free_${Date.now()}`, 
        nome,
        cpf,
        email,
        senha, 
        tipo: "PF",
        status: "ativo",
        criadoEm: new Date().toISOString()
    };

    try {
        // 1. Obtém os dados da "tabela" freelancers
        // Usamos a string do caminho como chave para organização mental
        let db = JSON.parse(localStorage.getItem(DB_PATH)) || [];
        
        // 2. Verifica duplicidade (Email ou CPF)
        if (db.some(u => u.email === email || u.cpf === cpf)) {
            showToast("Este usuário já consta no nosso sistema.");
            return;
        }

        // 3. Adiciona e salva no LocalStorage
        db.push(novoFreelancer);
        localStorage.setItem(DB_PATH, JSON.stringify(db));

        // 4. Log para facilitar o "copy-paste" para o arquivo físico se desejar
        console.log(`Dados salvos em simulador de ${DB_PATH}:`, db);

        showToast("✅ Cadastro realizado com sucesso!");

        setTimeout(() => {
            window.location.href = "../index/index.html";
        }, 2000);

    } catch (error) {
        showToast("Erro ao processar banco de dados local.");
        console.error(error);
    }
});