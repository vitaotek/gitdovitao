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

// 4. PROCESSAMENTO DO FORMULÁRIO
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const humanCheck = document.getElementById('human-check');

        if (!humanCheck || !humanCheck.checked) {
            alert("Por favor, marque a caixa 'Eu não sou um robô'.");
            return;
        }

        const nome = contactForm.querySelector('input[name="nome"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const mensagem = contactForm.querySelector('textarea[name="mensagem"]').value;

        submitBtn.innerText = "Enviando...";
        submitBtn.disabled = true;

        // Formatação para HTTPS / Google Apps Script
        const params = new URLSearchParams();
        params.append('nome', nome);
        params.append('email', email);
        params.append('mensagem', mensagem);

        // Dispara o envio em segundo plano
        fetch(CONFIG.scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        // AGUARDA 3 SEGUNDOS PARA MOSTRAR A POPUP
        setTimeout(() => {
            const toast = document.getElementById(CONFIG.toastContainerId);
            if (toast) {
                toast.classList.add('show');
                document.body.style.overflow = 'hidden';
            }

            // Restaura o botão e limpa o formulário
            contactForm.reset();
            submitBtn.innerText = "Enviar Mensagem";
            submitBtn.disabled = false;
        }, 3000); // 3000 milissegundos = 3 segundos
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