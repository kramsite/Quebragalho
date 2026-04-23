/* ================================================================
   LÓGICA DA HOME - QUEBRAGALHO
   ================================================================ */

// --- 1. SELEÇÃO DE ELEMENTOS DO DOM ---
const btnOpen = document.getElementById('open-menu');
const btnClose = document.getElementById('close-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const containerVagas = document.getElementById('container-vagas');

// --- 2. CONTROLE DO MENU LATERAL (SIDEBAR) ---
function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Bloqueia o scroll do fundo quando o menu está aberto
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

if (btnOpen) btnOpen.addEventListener('click', toggleMenu);
if (btnClose) btnClose.addEventListener('click', toggleMenu);
if (overlay) overlay.addEventListener('click', toggleMenu);

// --- 3. BANCO DE DADOS DE VAGAS ---
const vagasExemplo = [
    { titulo: "Garçom para Casamento", empresa: "Buffet Real", valor: "R$ 180,00", tipo: "Diária", local: "Cuiabá - Santa Rosa", cor: "#FF8C00" },
    { titulo: "Montador de Móveis", empresa: "Particular", valor: "R$ 250,00", tipo: "Serviço", local: "Várzea Grande - Centro", cor: "#2ecc71" },
    { titulo: "Promotor de Vendas", empresa: "Agência Top", valor: "R$ 120,00", tipo: "Meio Período", local: "Shopping Pantanal", cor: "#3498db" },
    { titulo: "Diarista Residencial", empresa: "Família Silva", valor: "R$ 220,00", tipo: "Diária", local: "Cuiabá - Jd. Américas", cor: "#9b59b6" },
    { titulo: "Segurança para Evento", empresa: "Forte Guardas", valor: "R$ 200,00", tipo: "Noturno", local: "Distrito Industrial", cor: "#e74c3c" },
    { titulo: "Entregador (Bike)", empresa: "Flash Entregas", valor: "R$ 15,00/hr", tipo: "Flexível", local: "Centro Norte", cor: "#f1c40f" },
    { titulo: "Auxiliar de Cozinha", empresa: "Restaurante Sabor", valor: "R$ 100,00", tipo: "Diária", local: "Cuiabá - Boa Esperança", cor: "#1abc9c" },
    { titulo: "Pintor de Parede", empresa: "Reforma Express", valor: "R$ 350,00", tipo: "Serviço", local: "Duque de Caxias", cor: "#34495e" },
    { titulo: "Recepcionista", empresa: "Expo Cuiabá", valor: "R$ 140,00", tipo: "Diária", local: "Centro de Eventos", cor: "#e67e22" },
    { titulo: "Babá (Sábado)", empresa: "Particular", valor: "R$ 160,00", tipo: "Meio Período", local: "Jardim Itália", cor: "#FF1493" }
];

// --- 4. FUNÇÃO DE RENDERIZAÇÃO DAS VAGAS ---
function renderizarVagas() {
    if (!containerVagas) return;
    containerVagas.innerHTML = "";

    vagasExemplo.forEach(vaga => {
        const card = document.createElement('div');
        card.className = 'vaga-card';
        
        card.innerHTML = `
            <div class="vaga-info">
                <div class="vaga-header">
                    <span class="vaga-tag" style="background-color: ${vaga.cor}">${vaga.tipo}</span>
                    <span class="vaga-valor">${vaga.valor}</span>
                </div>
                <h4 class="vaga-titulo">${vaga.titulo}</h4>
                <div class="vaga-detalhes">
                    <p><i class="fa-solid fa-building"></i> ${vaga.empresa}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${vaga.local}</p>
                </div>
            </div>
            <button class="btn-candidatar" onclick="candidatar('${vaga.titulo.replace(/'/g, "\\'")}')">Tenho Interesse</button>
        `;
        containerVagas.appendChild(card);
    });
}

// --- 5. FUNÇÃO DE INTERAÇÃO (MENSAGEM BONITINHA) ---
function candidatar(vagaNome) {
    // Remove qualquer toast anterior para não empilhar
    const toastAntigo = document.querySelector('.toast-success');
    if (toastAntigo) toastAntigo.remove();

    // 1. Cria o elemento do Toast
    const toast = document.createElement('div');
    toast.className = 'toast-success';
    
    // 2. Define o conteúdo
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <div class="toast-content">
            <b>Candidatura enviada!</b>
            <span>Boa sorte em "${vagaNome}"</span>
        </div>
    `;

    document.body.appendChild(toast);

    // 3. Animação de entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // 4. Remove o toast após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}

// --- 6. INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(renderizarVagas, 500);
});