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

btnOpen.addEventListener('click', toggleMenu);
btnClose.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// --- 3. BANCO DE DADOS DE VAGAS (ARRAY DE OBJETOS) ---
const vagasExemplo = [
    {
        titulo: "Garçom para Casamento",
        empresa: "Buffet Real",
        valor: "R$ 180,00",
        tipo: "Diária",
        local: "Cuiabá - Santa Rosa",
        cor: "#FF8C00"
    },
    {
        titulo: "Montador de Móveis",
        empresa: "Particular",
        valor: "R$ 250,00",
        tipo: "Serviço",
        local: "Várzea Grande - Centro",
        cor: "#2ecc71"
    },
    {
        titulo: "Promotor de Vendas",
        empresa: "Agência Top",
        valor: "R$ 120,00",
        tipo: "Meio Período",
        local: "Shopping Pantanal",
        cor: "#3498db"
    },
    {
        titulo: "Diarista Residencial",
        empresa: "Família Silva",
        valor: "R$ 220,00",
        tipo: "Diária",
        local: "Cuiabá - Jd. Américas",
        cor: "#9b59b6"
    },
    {
        titulo: "Segurança para Evento",
        empresa: "Forte Guardas",
        valor: "R$ 200,00",
        tipo: "Noturno",
        local: "Distrito Industrial",
        cor: "#e74c3c"
    },
    {
        titulo: "Entregador (Bike)",
        empresa: "Flash Entregas",
        valor: "R$ 15,00/hr",
        tipo: "Flexível",
        local: "Centro Norte",
        cor: "#f1c40f"
    },
    {
        titulo: "Auxiliar de Cozinha",
        empresa: "Restaurante Sabor",
        valor: "R$ 100,00",
        tipo: "Diária",
        local: "Cuiabá - Boa Esperança",
        cor: "#1abc9c"
    },
    {
        titulo: "Pintor de Parede",
        empresa: "Reforma Express",
        valor: "R$ 350,00",
        tipo: "Serviço",
        local: "Duque de Caxias",
        cor: "#34495e"
    },
    {
        titulo: "Recepcionista",
        empresa: "Expo Cuiabá",
        valor: "R$ 140,00",
        tipo: "Diária",
        local: "Centro de Eventos",
        cor: "#e67e22"
    },
    {
        titulo: "Babá (Sábado)",
        empresa: "Particular",
        valor: "R$ 160,00",
        tipo: "Meio Período",
        local: "Jardim Itália",
        cor: "#FF1493"
    }
];

// --- 4. FUNÇÃO DE RENDERIZAÇÃO DAS VAGAS ---
function renderizarVagas() {
    // Caso o container não exista, evita erro
    if (!containerVagas) return;

    // Limpa o conteúdo (remove o "Carregando...")
    containerVagas.innerHTML = "";

    vagasExemplo.forEach(vaga => {
        // Cria o elemento do card
        const card = document.createElement('div');
        card.className = 'vaga-card';
        
        // Define o conteúdo HTML interno do card
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
            <button class="btn-candidatar" onclick="candidatar('${vaga.titulo}')">Tenho Interesse</button>
        `;
        
        // Adiciona o card ao container da página
        containerVagas.appendChild(card);
    });
}

// --- 5. FUNÇÃO DE INTERAÇÃO (AO CLICAR NO BOTÃO) ---
function candidatar(vagaNome) {
    alert(`Legal! Registramos seu interesse na vaga: ${vagaNome}. Boa sorte!`);
}

// --- 6. INICIALIZAÇÃO ---
// Espera o DOM carregar totalmente para rodar a função
document.addEventListener('DOMContentLoaded', () => {
    // Simula um tempo de carregamento para ficar mais realista
    setTimeout(renderizarVagas, 500);
});