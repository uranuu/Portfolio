// Sistema de partículas interativas
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 60 + 300}, 70%, 60%)`,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('resize', () => {
            this.particles.forEach(particle => {
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y > window.innerHeight) particle.y = 0;
            });
        });
    }

    animate() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        document.body.appendChild(canvas);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.particles.forEach((particle, index) => {
                // Atualizar posição
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Borda
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Interação com mouse
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.vx += dx * force * 0.01;
                    particle.vy += dy * force * 0.01;
                }

                // Desenhar partícula
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();

                // Conectar partículas próximas
                this.particles.forEach((otherParticle, otherIndex) => {
                    if (index !== otherIndex) {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.strokeStyle = particle.color;
                            ctx.globalAlpha = (100 - distance) / 100 * 0.3;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                });
            });

            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Efeitos 3D para cards
class Card3DEffect {
    constructor() {
        this.cards = document.querySelectorAll('.skill-card, .project-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(20px)
            scale(1.05)
        `;
    }

    handleMouseLeave(e, card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    }
}

// Animação de texto com efeito de máquina de escrever avançado
class TypewriterEffect {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.options = {
            speed: options.speed || 80,
            delay: options.delay || 500,
            cursor: options.cursor || '|',
            ...options
        };
        this.currentIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.element.textContent = '';
        this.element.style.borderRight = `2px solid ${this.options.cursorColor || '#ff006e'}`;
        setTimeout(() => this.type(), this.options.delay);
    }

    type() {
        const currentText = this.text.substring(0, this.currentIndex);
        this.element.textContent = currentText;

        if (!this.isDeleting && this.currentIndex < this.text.length) {
            this.currentIndex++;
            setTimeout(() => this.type(), this.options.speed);
        } else if (this.isDeleting && this.currentIndex > 0) {
            this.currentIndex--;
            setTimeout(() => this.type(), this.options.speed / 2);
        } else {
            this.isDeleting = !this.isDeleting;
            setTimeout(() => this.type(), this.options.speed * 3);
        }
    }
}

// Efeito de parallax avançado
class ParallaxEffect {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            this.sections.forEach((section, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                section.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Sistema de animações de entrada
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.skill-card, .project-card, .about, .contact');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        this.addStaggerEffect(entry.target, index);
                        this.animateProgressBars(entry.target);
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }

    addStaggerEffect(element, index) {
        element.style.animationDelay = `${index * 0.1}s`;
        element.style.animation = 'slideInFromBottom 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    }

    animateProgressBars(element) {
        const progressBars = element.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 500);
        });
    }
}

// Efeitos de hover avançados
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        // Efeito de brilho nos botões
        document.querySelectorAll('.contact-button, .project-link, .cta-primary, .cta-secondary').forEach(button => {
            button.addEventListener('mouseenter', this.createRippleEffect.bind(this));
            button.addEventListener('mousemove', this.followMouse.bind(this));
        });

        // Efeito de magnetismo nos cards
        document.querySelectorAll('.skill-card, .project-card').forEach(card => {
            card.addEventListener('mousemove', this.magneticEffect.bind(this));
        });
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    followMouse(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.background = `
            radial-gradient(circle at ${x}px ${y}px, 
                rgba(255, 0, 110, 0.8) 0%, 
                rgba(131, 56, 236, 0.6) 50%, 
                rgba(58, 134, 255, 0.4) 100%)
        `;
    }

    magneticEffect(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = 0.1;
        card.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
}

// Smooth scroll avançado
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const targetPosition = target.offsetTop - 100;
                    this.scrollTo(targetPosition);
                }
            });
        });
    }

    scrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = currentTime => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Efeito de cursor personalizado
class CustomCursor {
    constructor() {
        this.init();
    }

    init() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #ff006e, #8338ec);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease;
        `;
        document.body.appendChild(cursorDot);

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
        });

        // Efeito hover
        document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(2)';
                cursorDot.style.transform += ' scale(0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
                cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0.5)', '');
            });
        });
    }
}

// Loading Screen
class LoadingScreen {
    constructor() {
        this.init();
    }

    init() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        }
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (this.button) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    this.button.classList.add('visible');
                } else {
                    this.button.classList.remove('visible');
                }
            });

            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Animações de contador
class CounterAnimations {
    constructor() {
        this.init();
    }

    init() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideInFromBottom {
            from {
                opacity: 0;
                transform: translateY(100px) scale(0.8) rotateX(20deg);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1) rotateX(0deg);
            }
        }
        
        .skill-card, .project-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .contact-button, .project-link {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        header {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-content h1 {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Inicializar todos os sistemas
    new LoadingScreen();
    new ParticleSystem();
    new Card3DEffect();
    new ParallaxEffect();
    new ScrollAnimations();
    new HoverEffects();
    new SmoothScroll();
    new CustomCursor();
    new BackToTop();
    new CounterAnimations();

    // Animação de digitação no título
    const title = document.querySelector('.hero-content h1');
    if (title) {
        new TypewriterEffect(title, title.textContent, {
            speed: 100,
            delay: 1000,
            cursorColor: '#ff006e'
        });
    }

    // Efeito de loading da página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Header que esconde/mostra
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}); 