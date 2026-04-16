// --- CONTROLE DA SIDEBAR (Com verificação de existência) ---
const btnMenu = document.getElementById('open-menu');
const btnClose = document.getElementById('close-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

if (btnMenu) btnMenu.addEventListener('click', toggleSidebar);
if (btnClose) btnClose.addEventListener('click', toggleSidebar);
if (overlay) overlay.addEventListener('click', toggleSidebar);

// --- LÓGICA DE EDIÇÃO UNIVERSAL ---
const editBtn = document.getElementById('edit-btn');
const saveArea = document.getElementById('save-area');

if (editBtn) {
    editBtn.addEventListener('click', () => {
        // Verifica se já está editando pelo texto do botão ou classe
        const isEditing = editBtn.classList.contains('editing');

        if (!isEditing) {
            enterEditMode();
        } else {
            location.reload(); // Cancela resetando a página
        }
    });
}

function enterEditMode() {
    editBtn.innerText = "Cancelar";
    editBtn.classList.add('editing');
    if (saveArea) saveArea.style.display = "flex";

    // Lista de todos os possíveis campos (Freelancer + Empresa)
    const possibleFields = ['nome', 'profissao', 'email', 'site', 'tel'];
    
    possibleFields.forEach(id => {
        const p = document.getElementById(`p-${id}`);
        if (p) { // Só transforma se o elemento existir na página atual
            const val = p.innerText;
            p.innerHTML = `<input type="text" id="input-${id}" class="edit-input" value="${val}">`;
        }
    });

    // Bio/Descrição (Trata tanto a bio do free quanto a descrição da empresa)
    const bioP = document.getElementById('p-bio');
    if (bioP) {
        const bioVal = bioP.innerText;
        bioP.innerHTML = `<textarea id="input-bio" class="edit-textarea">${bioVal}</textarea>`;
    }
}

// --- BOTÃO SALVAR ---
const saveBtn = document.getElementById('save-btn');
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        // Tenta pegar o nome de qualquer um dos perfis
        const inputNome = document.getElementById('input-nome');
        const nomeFinal = inputNome ? inputNome.value : "Perfil";

        alert(`✅ ${nomeFinal} atualizado com sucesso!`);
        
        // Aqui você faria a chamada para salvar no banco de dados
        location.reload();
    });
}