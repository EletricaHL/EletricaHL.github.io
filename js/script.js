// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Manipulação do formulário de contato
document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obter valores do formulário
    const nome = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const telefone = this.querySelector('input[type="tel"]').value;
    const mensagem = this.querySelector('textarea').value;
    
    // Criar corpo do e-mail
    const assunto = encodeURIComponent('Novo Orçamento - ElétricaPro');
    const corpo = encodeURIComponent(
        `Nome: ${nome}\n` +
        `E-mail: ${email}\n` +
        `Telefone/WhatsApp: ${telefone}\n\n` +
        `Mensagem:\n${mensagem}`
    );
    
    // Redirecionar para mailto
    window.location.href = `mailto:hugo.xlr@hotmail.com?subject=${assunto}&body=${corpo}`;
    
    // Limpar formulário
    this.reset();
    
    // Mostrar mensagem de sucesso
    alert('Obrigado! Sua mensagem foi preparada. Clique em "Enviar" no seu cliente de e-mail para completar o envio.');
});

// Adicionar classe ativa ao link de navegação quando a seção está visível
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Adicionar efeito de fade-in aos elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards de serviços e diferenciais
document.querySelectorAll('.servico-card, .diferencial-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
