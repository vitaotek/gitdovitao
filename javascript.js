/**
 * Portfólio Victor Lopes - Script Otimizado v3.0
 * Inclui: Modal de Vídeo, Animação de Stats, Google Apps Script com Validação Humana (Checkbox)
 */

// 1. CONFIGURAÇÕES E ESTADO
const CONFIG = {
    modalId: 'video-modal',
    iframeTargetId: 'modal-iframe-target',
    toastContainerId: 'toast-container',
    // URL do seu Google Apps Script (Certifique-se de usar a URL da versão mais recente)
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
function openVideo(videoId) {
    const modal = document.getElementById(CONFIG.modalId);
    const target = document.getElementById(CONFIG.iframeTargetId);
    
    if (modal && target) {
        target.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>`;
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

// Fechar modal com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isOpen) closeVideo();
});


// 4. PROCESSAMENTO DO FORMULÁRIO DE CONTACTO
const contactForm = document.getElementById('contact-form');
const toastContainer = document.getElementById(CONFIG.toastContainerId);

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // 1. Validação Humana (Checkbox)
        const humanCheck = document.getElementById('human-check');
        if (!humanCheck || !humanCheck.checked) {
            alert("Por favor, marque a caixa 'Eu não sou um robô' para confirmar o envio.");
            return;
        }

        // 2. Captura e Validação dos Dados
        const nome = contactForm.querySelector('input[name="nome"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const mensagem = contactForm.querySelector('textarea[name="mensagem"]').value.trim();

        if (nome.length < 3) {
            alert("Por favor, insira o seu nome completo.");
            return;
        }

        if (mensagem.length < 10) {
            alert("A mensagem é muito curta. Por favor, detalhe um pouco mais o seu contacto.");
            return;
        }

        const formData = { nome, email, mensagem };

        // 3. Envio para o Google Apps Script
        submitBtn.innerText = "A enviar...";
        submitBtn.disabled = true;

        // ... dentro do contactForm.addEventListener ...
        try {
            // 1. Envia os dados para o Google
            fetch(CONFIG.scriptURL, {
                method: 'POST',
                mode: 'no-cors', 
                body: JSON.stringify(formData)
            });

            // 2. MOSTRAR POPUP (Forçamos a exibição aqui)
            const toast = document.getElementById('toast-container');
            if (toast) {
                toast.classList.add('show');
                document.body.style.overflow = 'hidden'; // Trava o scroll
            }

            contactForm.reset(); // Limpa o formulário e o checkbox

        } catch (error) {
            console.error('Erro:', error);
            alert('Houve um problema no envio.');
        } finally {
            submitBtn.innerText = "Enviar Mensagem";
            submitBtn.disabled = false;
        }
    });
}

// 3. FUNÇÃO DE FECHAR (Certifique-se que está fora do EventListener)
function closeToast() {
    const toast = document.getElementById('toast-container');
    if (toast) {
        toast.classList.remove('show');
        document.body.style.overflow = ''; // Destrava o scroll
    }
}