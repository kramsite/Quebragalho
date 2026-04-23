/* ================================================================
   CONTROLE DE DADOS E PUBLICAÇÃO
   ================================================================ */

let userType = null;
let userData = null;
let currentSkills = [];
let selectedType = 'job';

// 1. Carregar dados do usuário logado
function loadUserData() {
    const companyData = localStorage.getItem('companyProfile');
    const freelancerData = localStorage.getItem('freelancerProfile');
    
    // Pegamos a imagem do header para mostrar que o usuário está logado
    const profileImg = document.querySelector('.profile-pic');

    if (companyData) {
        userType = 'company';
        userData = JSON.parse(companyData);
    } else if (freelancerData) {
        userType = 'freelancer';
        userData = JSON.parse(freelancerData);
    }
}

// 2. Alternar entre Job (Vaga) e Service (Serviço)
function selectType(type) {
    selectedType = type;
    document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('selected'));
    
    const activeBtn = document.querySelector(`.type-btn[data-type="${type}"]`);
    if(activeBtn) activeBtn.classList.add('selected');
    
    document.getElementById('opportunityType').value = type;
    
    // Ajuste dinâmico de textos
    if (type === 'job') {
        document.getElementById('titleLabel').textContent = 'Título da Vaga *';
        document.getElementById('valueLabel').textContent = 'Valor Oferecido *';
        document.querySelector('.form-title').textContent = '📢 Publicar Vaga';
    } else {
        document.getElementById('titleLabel').textContent = 'Título do Serviço *';
        document.getElementById('valueLabel').textContent = 'Valor do Serviço *';
        document.querySelector('.form-title').textContent = '💼 Oferecer Serviço';
    }
}

// 3. Gerenciamento de Habilidades (Tags)
const skillInput = document.getElementById('skillInput');
const skillsList = document.getElementById('skillsList');

if (skillInput) {
    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const skill = skillInput.value.trim();
            if (skill && !currentSkills.includes(skill)) {
                currentSkills.push(skill);
                renderSkills();
                skillInput.value = '';
            }
        }
    });
}

function renderSkills() {
    skillsList.innerHTML = currentSkills.map((skill, index) => `
        <div class="skill-tag">
            ${skill}
            <button type="button" onclick="removeSkill(${index})">×</button>
        </div>
    `).join('');
}

function removeSkill(index) {
    currentSkills.splice(index, 1);
    renderSkills();
}

// 4. Lógica ÚNICA do Envio do Formulário
document.getElementById('opportunityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Iniciando publicação...");

    try {
        const novaOportunidade = {
            id: 'opp_' + Date.now(),
            type: selectedType,
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            value: document.getElementById('value').value,
            deadline: document.getElementById('deadline').value,
            modality: document.getElementById('modality').value,
            description: document.getElementById('description').value,
            benefits: document.getElementById('benefits').value,
            skills: currentSkills,
            createdAt: new Date().toISOString(),
            author: {
                name: userType === 'company' ? (userData?.companyName || "Empresa") : (userData?.fullName || "Usuário"),
                type: userType || 'visitante',
                avatar: document.querySelector('.profile-pic')?.src || '../img/Icon.jpg'
            }
        };

        // Salvar no LocalStorage
        let listaGlobal = JSON.parse(localStorage.getItem('allOpportunities') || '[]');
        listaGlobal.unshift(novaOportunidade);
        localStorage.setItem('allOpportunities', JSON.stringify(listaGlobal));

        showToast("✅ Publicado com sucesso!");

        // Redirecionar para a Home
        setTimeout(() => {
            window.location.href = "../home/home.html";
        }, 1500);

    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Ocorreu um erro ao publicar a vaga.");
    }
});

// Funções de Suporte (Sidebar e Toast)
function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
        background: #2ecc71; color: white; padding: 15px 30px; 
        border-radius: 50px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        z-index: 10000; font-weight: bold; font-family: sans-serif;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// Controle Sidebar
const btnOpen = document.getElementById('open-menu');
const btnClose = document.getElementById('close-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if(btnOpen) btnOpen.onclick = () => { sidebar.classList.add('active'); overlay.classList.add('active'); };
if(btnClose) btnClose.onclick = () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); };
if(overlay) overlay.onclick = () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); };

// Iniciar página
loadUserData();