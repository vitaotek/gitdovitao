/**
 * Portfólio Victor Lopes - v3.6
 * Ajuste: Envio imediato e exibição da Popup após 3 segundos
 */

// 1. CONFIGURAÇÕES
const CONFIG = {
    modalId: 'video-modal',
    iframeTargetId: 'modal-iframe-target',
    toastContainerId: 'toast-container',
    scriptURL: 'https://script.google.com/macros/s/AKfycbwOnJ8aLNMfbOss06eRh_glZRNULpJ3j9HqeL7PCGPDfr80_vcCB5-hLEHkDddO-LFrqA/exec'
};

const state = {
    isOpen: false
};

// 2. ANIMAÇÃO DE ESTATÍSTICAS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.bar-fill, .demo-bar-fill');
            if (fill) {
                fill.style.width = fill.parentElement.dataset.width || fill.style.width;
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card, .demo-bar-item').forEach(card => observer.observe(card));

// 3. SISTEMA DE MODAL DE VÍDEO
function openVideo(videoId) {
    const modal = document.getElementById(CONFIG.modalId);
    const target = document.getElementById(CONFIG.iframeTargetId);
    if (modal && target) {
        target.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        state.isOpen = true;
    }
}

function closeVideo() {
    const modal = document.getElementById(CONFIG.modalId);
    const target = document.getElementById(CONFIG.iframeTargetId);
    if (modal && target) {
        target.innerHTML = '';
        modal.classList.remove('active');
        document.body.style.overflow = '';
        state.isOpen = false;
    }
}

// 4. PROCESSAMENTO DO FORMULÁRIO (Versão Mailto - Sem Google Script)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Impedimos o envio padrão do formulário para tratar os dados
        e.preventDefault();
        
        const humanCheck = document.getElementById('human-check');

        // Verificação do Bot (Opcional, mas bom manter)
        if (!humanCheck || !humanCheck.checked) {
            alert("Por favor, marque a caixa 'Eu não sou um robô'.");
            return;
        }

        // Coleta dos dados digitados
        const nome = contactForm.querySelector('input[name="nome"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const mensagem = contactForm.querySelector('textarea[name="mensagem"]').value;

        // Formatação do link Mailto
        // O encodeURIComponent garante que espaços e acentos não quebrem o link
        const assunto = encodeURIComponent(`Contato via Site - ${nome}`);
        const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`);
        
        // Monta o link final
        const mailtoLink = `mailto:vitaotub@gmail.com?subject=${assunto}&body=${corpo}`;

        // DISPARO: Abre o cliente de e-mail do visitante
        window.location.href = mailtoLink;

        // EXIBIÇÃO DA POPUP DE SUCESSO
        // Como o mailto abre uma janela externa, podemos mostrar o Toast imediatamente
        const toast = document.getElementById(CONFIG.toastContainerId);
        if (toast) {
            toast.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        // Reseta o formulário para ficar limpo
        contactForm.reset();
    });
}

// 5. FUNÇÕES DA POPUP
function closeToast() {
    const toast = document.getElementById(CONFIG.toastContainerId);
    if (toast) {
        toast.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Fechar com teclado (Esc) ou cliques extras
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideo();
        closeToast();
    }
});

// Listener específico para o botão de fechar da popup
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('toast-close-btn')) {
        closeToast();
    }
});


// 6. FUNCIONALIDADE VOLTAR AO TOPO (ROLA SUAveMENTE)
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            // Previne o comportamento padrão do link de "pular" para a âncora
            e.preventDefault();
            
            // Rola suavemente até o elemento com ID "home"
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
