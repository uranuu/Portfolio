// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header sempre visível (removendo lógica de scroll)
// const header = document.querySelector('header');
// let lastScroll = 0;
// window.addEventListener('scroll', () => {
//     const currentScroll = window.pageYOffset;
//     if (currentScroll <= 0) {
//         header.classList.remove('scroll-up');
//         return;
//     }
//     if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
//         header.classList.remove('scroll-up');
//         header.classList.add('scroll-down');
//     } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
//         header.classList.remove('scroll-down');
//         header.classList.add('scroll-up');
//     }
//     lastScroll = currentScroll;
// });

// Animação de entrada para elementos
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.skill-card, .projects-grid > *, .about p, .contact p').forEach(el => {
    observer.observe(el);
});

// Efeito de parallax no hero
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Animação de digitação no título
const title = document.querySelector('.hero-content h1');
const text = title.textContent;
title.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Iniciar animação de digitação quando a página carregar
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Efeito de hover nos cards de habilidades
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animação suave para o botão de contato
const contactButton = document.querySelector('.contact-button');
contactButton.addEventListener('mouseenter', () => {
    contactButton.style.transform = 'scale(1.05)';
});

contactButton.addEventListener('mouseleave', () => {
    contactButton.style.transform = 'scale(1)';
});

// Inicialização do VANTA.TOPOLOGY para o fundo animado
window.addEventListener('DOMContentLoaded', () => {
    if (window.VANTA && window.VANTA.TOPOLOGY) {
        window.VANTA.TOPOLOGY({
            el: "#hero-bg",
            mouseControls: true,
            touchControls: true,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xffffff,
            backgroundColor: 0x111111,
            points: 12.0,
            maxDistance: 25.0,
            spacing: 20.0
        });
    }
}); 