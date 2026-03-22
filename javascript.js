/**
 * Portfólio Victor Lopes - v1.5.1
 * Atualizado: Correção definitiva do Modal de Privacidade
 */

// 1. CONFIGURAÇÕES
const CONFIG = {
    modalId: 'video-modal',
    iframeTargetId: 'modal-iframe-target',
    toastContainerId: 'toast-overlay',
    privacyModalId: 'privacy-modal',
    privacyTargetId: 'privacy-content-target', // ID do container de texto
    scriptURL: 'https://script.google.com/macros/s/AKfycbwOnJ8aLNMfbOss06eRh_glZRNULpJ3j9HqeL7PCGPDfr80_vcCB5-hLEHkDddO-LFrqA/exec'
};

// 2. ANIMAÇÃO DE ESTATÍSTICAS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Procura todas as barras dentro do elemento que entrou na tela
            const fills = entry.target.querySelectorAll('.demo-bar-fill, .bar-fill');
            
            fills.forEach(fill => {
                // Lê o valor diretamente da barra ou do pai (como backup)
                const targetWidth = fill.getAttribute('data-width') || 
                                   fill.parentElement.getAttribute('data-width') || 
                                   "100%";
                
                fill.style.width = targetWidth;
            });
        }
    });
}, { threshold: 0.1 });

// Observa os containers principais
document.querySelectorAll('.stat-card, .demo-box, .demo-bar-item').forEach(el => observer.observe(el));

// 3. SISTEMA DE MODAL DE VÍDEO
function openVideo(videoId) {
    const modal = document.getElementById(CONFIG.modalId);
    const target = document.getElementById(CONFIG.iframeTargetId);
    if (modal && target) {
        target.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeVideo() {
    const modal = document.getElementById(CONFIG.modalId);
    const target = document.getElementById(CONFIG.iframeTargetId);
    if (modal) {
        if (target) target.innerHTML = '';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 4. MODAL DE PRIVACIDADE (CARREGAMENTO DINÂMICO)
async function openPrivacyModal() {
    const modal = document.getElementById(CONFIG.privacyModalId);
    const target = document.getElementById(CONFIG.privacyTargetId);
    
    if (modal && target) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        try {
            // Busca o arquivo limpo (sem estilos inline)
            const response = await fetch('./politica-de-privacidade.html');
            if (!response.ok) throw new Error('Arquivo não encontrado');
            
            const htmlContent = await response.text();
            target.innerHTML = htmlContent; 
        } catch (error) {
            console.error("Erro ao carregar política:", error);
            target.innerHTML = `<h2>Erro</h2><p>Não foi possível carregar o conteúdo. <a href="politica-de-privacidade.html" target="_blank">Clique aqui para abrir.</a></p>`;
        }
    }
}

// Função para abrir Termos de Uso
async function openTermsModal() {
    const modal = document.getElementById(CONFIG.privacyModalId);
    const target = document.getElementById(CONFIG.privacyTargetId);
    
    if (modal && target) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        try {
            const response = await fetch('./termos-de-uso.html');
            if (!response.ok) throw new Error('Arquivo não encontrado');
            
            const htmlContent = await response.text();
            target.innerHTML = htmlContent;
        } catch (error) {
            console.error("Erro ao carregar termos:", error);
            target.innerHTML = `<h2>Erro</h2><p>Não foi possível carregar os termos. <a href="termos-de-uso.html" target="_blank" style="color: var(--primary-purple);">Clique aqui para abrir em uma nova aba.</a></p>`;
        }
    }
}

// FUNÇÃO DE FECHAMENTO DA PRIVACIDADE (Adicionada)
function closePrivacyModal() {
    const modal = document.getElementById(CONFIG.privacyModalId);
    if (modal) {
        modal.classList.remove('active');
        // Usamos um timeout curto para esconder o display só após a transição do CSS
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modal.style.display = 'none';
            }
        }, 300); 
        document.body.style.overflow = '';
    }
}

// 5. PROCESSAMENTO DO FORMULÁRIO
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const humanCheck = document.getElementById('human-check');
        if (!humanCheck || !humanCheck.checked) {
            alert("Por favor, confirme que você não é um robô.");
            return;
        }

        const nome = contactForm.querySelector('input[name="nome"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const mensagem = contactForm.querySelector('textarea[name="mensagem"]').value;

        const assunto = encodeURIComponent(`Contato via Site - ${nome}`);
        const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`);
        const mailtoLink = `mailto:vitaotub@gmail.com?subject=${assunto}&body=${corpo}`;

        window.location.href = mailtoLink;

        const toast = document.getElementById(CONFIG.toastContainerId);
        if (toast) {
            toast.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        contactForm.reset();
    });
}

// 6. FUNÇÕES DE FECHAMENTO (TOAST E GERAL)
function closeToast() {
    const toast = document.getElementById(CONFIG.toastContainerId);
    if (toast) {
        toast.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Atalho Tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideo();
        closeToast();
        closePrivacyModal();
    }
});

// Cliques no Fundo Escuro ou Botões de Fechar
document.addEventListener('click', function(e) {
    // Fecha Modal de Vídeo
    if (e.target.id === CONFIG.modalId || e.target.classList.contains('modal-overlay')) {
        closeVideo();
    }
    
    // Fecha Toast/Sucesso
    if (e.target.id === CONFIG.toastContainerId || e.target.classList.contains('toast-close-btn')) {
        closeToast();
    }
    
    // Fecha Modal de Privacidade
    if (e.target.id === CONFIG.privacyModalId || 
        e.target.classList.contains('modal-overlay') || 
        e.target.classList.contains('modal-close') ||
        e.target.innerText === '×') {
        closePrivacyModal();
    }
});

// 7. VOLTAR AO TOPO
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 8. BANNER LGPD
function initCookieBanner() {
    const banner = document.getElementById("lgpd-banner");
    const btnAccept = document.getElementById("lgpd-accept");
    const btnReject = document.getElementById("lgpd-reject");

    // Verifica se o banner existe na página atual
    if (!banner) return;

    // Se não houver a marcação no navegador, mostra o banner após 1 segundo
    if (!localStorage.getItem("vitaotub_cookies_accepted")) {
        setTimeout(() => {
            banner.classList.add("show");
        }, 1000);
    }

    // Ação de Aceitar (Salva a preferência e fecha)
    if (btnAccept) {
        btnAccept.onclick = function() {
            localStorage.setItem("vitaotub_cookies_accepted", "true");
            banner.classList.remove("show");
        };
    }

    // Ação de Recusar (Apenas fecha o banner)
    if (btnReject) {
        btnReject.onclick = function() {
            banner.classList.remove("show");
        };
    }
}


// CRIAR ARTIGOS NO BLOG.HTML DINAMICAMENTE A PARTIR DE UM ARQUIVO JSON
async function carregarArtigos() {
    const container = document.getElementById('lista-artigos');
    
    try {
        const resposta = await fetch('artigos.json');
        const artigos = await resposta.json();

        container.innerHTML = artigos.map(artigo => `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${artigo.imagem}" alt="${artigo.titulo}">
                </div>
                <div class="blog-content">
                    <div class="blog-text-wrapper">
                        <h3>${artigo.titulo}</h3>
                        <p>${artigo.resumo}</p>
                    </div>
                    <a href="${artigo.link}" class="btn-read-more">Ler Artigo Completo</a>
                </div>
            </article>
        `).join('');

    } catch (erro) {
        console.error("Erro ao carregar artigos:", erro);
        container.innerHTML = "<p>Erro ao carregar os artigos. Tente novamente mais tarde.</p>";
    }
}

// Executa a função assim que a página carrega
document.addEventListener('DOMContentLoaded', carregarArtigos);


// Inicializa quando o HTML terminar de carregar
document.addEventListener("DOMContentLoaded", initCookieBanner);

// Se tiver outras funções de inicialização no futuro, coloque-as aqui.