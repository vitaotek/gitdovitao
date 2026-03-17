/**
 * Portfólio Victor Lopes - Script Otimizado v2.7
 * Inclui: Modal de Vídeo, Animação de Stats, Google Apps Script e Central Card Popup
 */

// 1. CONFIGURAÇÕES E ESTADO
const CONFIG = {
    modalId: 'video-modal',
    iframeTargetId: 'modal-iframe-target',
    toastContainerId: 'toast-container',
    // URL do seu Google Apps Script
    scriptURL: 'https://script.google.com/macros/s/AKfycbxigP8Uoc8evq7x6JqREKNoOInZvM7wNgcmPbQs0FynIOFjRKEP-3EgIOtxdtm__G2Bog/exec'
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
const modalEl = document.getElementById(CONFIG.modalId);
const iframeTarget = document.getElementById(CONFIG.iframeTargetId);

const openVideo = (videoId) => {
    if (!modalEl || !iframeTarget) return;

    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    
    iframeTarget.innerHTML = `
        <iframe 
            src="${videoUrl}" 
            title="YouTube video player"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>`;

    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden'; 
    state.isOpen = true;
};

const closeVideo = () => {
    if (!modalEl) return;

    modalEl.classList.remove('open');
    document.body.style.overflow = ''; 
    
    setTimeout(() => {
        iframeTarget.innerHTML = '';
        state.isOpen = false;
    }, 300);
};


// 4. INICIALIZAÇÃO E EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    
    const contactForm = document.getElementById('contact-form');
    const toastContainer = document.getElementById(CONFIG.toastContainerId);
    const closeToastBtn = document.querySelector('.toast-close-btn');

    // Função para fechar a popup
    const closeToast = () => {
        if (toastContainer) {
            toastContainer.classList.remove('show');
            document.body.style.overflow = ''; 
        }
    };

    if (closeToastBtn) closeToastBtn.addEventListener('click', closeToast);
    
    if (toastContainer) {
        toastContainer.addEventListener('click', (e) => {
            if (e.target === toastContainer) closeToast();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideo();
            closeToast();
        }
    });

    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

// Lógica do Formulário de Contato com Validação e Anti-Spam
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button');
        const originalBtnText = submitBtn.innerText;
        
        // 1. Verificação de Honeypot (Anti-Spam)
        const honey = document.getElementById('honeypot').value;
        if (honey) {
            console.warn("Spam detectado.");
            return; // Interrompe o envio silenciosamente
        }

        // 2. Captura e Validação dos Dados
        const nome = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const mensagem = contactForm.querySelector('textarea').value.trim();

        if (nome.length < 3) {
            alert("Por favor, insira seu nome completo.");
            return;
        }

        if (mensagem.length < 10) {
            alert("A mensagem está muito curta. Poderia detalhar um pouco mais?");
            return;
        }

        const formData = { nome, email, mensagem };

        // 3. Envio
        submitBtn.innerText = "Enviando...";
        submitBtn.disabled = true;

        try {
            await fetch(CONFIG.scriptURL, {
                method: 'POST',
                mode: 'no-cors', 
                body: JSON.stringify(formData)
            });

            if (toastContainer) {
                toastContainer.classList.add('show');
                document.body.style.overflow = 'hidden';
            }

            contactForm.reset();

        } catch (error) {
            console.error('Erro:', error);
            alert('Houve um problema no envio. Verifique sua conexão.');
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}