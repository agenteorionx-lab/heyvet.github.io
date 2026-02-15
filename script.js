// ========================================
// HE VET - Interactive JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive features
    initNavbar();
    initFAQ();
    init3DCards();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initChatAnimation();
    initHeroParallax();
    initHeroScrollSequence();
});

// ========================================
// Hero Parallax Effect (Immersive 3D)
// ========================================
function initHeroParallax() {
    const hero = document.querySelector('.hero-immersive');
    if (!hero) return;

    const floatingElements = hero.querySelectorAll('.float-element');
    const bgSeamless = hero.querySelector('.hero-bg-seamless');

    hero.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to center (range -1 to 1)
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        // Parallax for floating veterinary icons
        floatingElements.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 20;

            // Calculate movement based on speed factor
            const moveX = x * speed * -1;
            const moveY = y * speed * -1;
            const rotate = x * 5;

            // Apply 3D transform with smooth transition
            item.style.transform = `
                translate(${moveX}px, ${moveY}px) 
                rotate(${rotate}deg) 
                scale(1.05)
            `;
        });

        // Background Image remains static (Parallax removed)
    });

    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        floatingElements.forEach(item => {
            item.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        });
        // Background reset removed since movement was removed
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// FAQ Accordion
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('[data-faq]');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ========================================
// 3D Card Tilt Effect
// ========================================
function init3DCards() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Animate children with delay
                const children = entry.target.querySelectorAll('.benefit-card, .pricing-card, .advantage-item, .impact-item, .comparison-card');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-ready');
        observer.observe(section);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .benefit-card.animate-ready,
        .pricing-card.animate-ready,
        .advantage-item.animate-ready,
        .impact-item.animate-ready,
        .comparison-card.animate-ready {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .benefit-card.animate-in,
        .pricing-card.animate-in,
        .advantage-item.animate-in,
        .impact-item.animate-in,
        .comparison-card.animate-in {
            animation: fadeInUp 0.5s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Hero section should be visible immediately */
        .hero.animate-ready {
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (!menuBtn) return;

    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            ${navLinks ? navLinks.innerHTML : ''}
            <a href="#planos" class="btn btn-primary mobile-cta">Assinar Agora</a>
        </div>
    `;

    document.body.appendChild(mobileMenu);

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.98);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s ease;
        }
        
        .mobile-menu.active {
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            gap: 30px;
        }
        
        .mobile-menu-content a {
            color: white;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: 600;
            transition: 0.3s ease;
        }
        
        .mobile-menu-content a:hover {
            color: #10b981;
        }
        
        .mobile-cta {
            margin-top: 20px;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);

    // Toggle menu
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Parallax Effect for Floating Elements
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for floating shapes
    document.querySelectorAll('.floating-shape').forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Parallax for floating paws
    document.querySelectorAll('.floating-paw').forEach((paw, index) => {
        const speed = 0.05 + (index * 0.03);
        paw.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
    });
});

// ========================================
// Scrolling Questions Animation
// ========================================
function initChatAnimation() {
    const questionText = document.getElementById('questionText');

    if (!questionText) return;

    // List of questions that will rotate
    const questions = [
        "Posso dar essa fruta pro meu cachorro?",
        "Meu gato está vomitando, é grave?",
        "Que remédio posso dar para dor?",
        "Meu cachorro comeu chocolate!",
        "É normal ele respirar assim?",
        "Preciso levar ao veterinário agora?",
        "Meu pet não quer comer, o que faço?",
        "Apareceu uma mancha na pele dele",
        "Ele está mancando, o que pode ser?"
    ];

    let currentIndex = 0;
    let isTyping = false;

    async function typeQuestion(text) {
        isTyping = true;
        questionText.textContent = '';

        // Type each character
        for (let i = 0; i < text.length; i++) {
            questionText.textContent += text[i];
            await new Promise(r => setTimeout(r, 50 + Math.random() * 30));
        }

        isTyping = false;
    }

    async function eraseQuestion() {
        const text = questionText.textContent;

        // Erase each character
        for (let i = text.length; i >= 0; i--) {
            questionText.textContent = text.substring(0, i);
            await new Promise(r => setTimeout(r, 25));
        }
    }

    async function runQuestionLoop() {
        while (true) {
            // Type current question
            await typeQuestion(questions[currentIndex]);

            // Wait 3 seconds before erasing
            await new Promise(r => setTimeout(r, 3000));

            // Erase question
            await eraseQuestion();

            // Move to next question
            currentIndex = (currentIndex + 1) % questions.length;

            // Small pause before typing next
            await new Promise(r => setTimeout(r, 500));
        }
    }

    // Start the loop when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping) {
                runQuestionLoop();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const section = document.querySelector('.how-it-works');
    if (section) {
        observer.observe(section);
    }
}

// ========================================
// Button Ripple Effect
// ========================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();

        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// Counter Animation (for stats)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);

        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

console.log('🐾 He Vet website loaded successfully!');
// ========================================
// Scroll-Driven Hero Animation
// ========================================
function initHeroScrollSequence() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const basePath = 'images/hero/Hero/';

    // Generate filenames for the high-quality PNG sequence (001 to 050)
    const frameFiles = [];
    for (let i = 1; i <= 50; i++) {
        frameFiles.push(`ezgif-frame-${i.toString().padStart(3, '0')}.png`);
    }

    const images = [];
    let imagesLoaded = 0;

    // Preload images
    frameFiles.forEach(file => {
        const img = new Image();
        img.src = basePath + file;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) {
                // Draw first frame immediately when ready
                render(0);
                canvas.style.opacity = '1';
            }
        };
        images.push(img);
    });

    function render(index) {
        if (!images[index] || !images[index].complete) return;

        const img = images[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scrolled = window.scrollY;

        // Use the same logic as scroll listener to determine frame
        const heroSection = document.querySelector('.hero-immersive');
        const scrollHeight = heroSection ? heroSection.offsetHeight : 1000;
        const scrollFraction = Math.min(1, Math.max(0, scrolled / scrollHeight));

        const frameIndex = Math.min(
            frameFiles.length - 1,
            Math.floor(scrollFraction * (frameFiles.length - 1))
        );

        if (images[frameIndex] && images[frameIndex].complete) {
            render(frameIndex);
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Scroll listener
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroSection = document.querySelector('.hero-immersive');

        // If hero section is missing, fallback to sensible default or return
        if (!heroSection) return;

        // Calculate scroll progress relative to the hero section's height
        // We want the animation to be 0% at top and 100% when hero is fully scrolled out
        const scrollHeight = heroSection.offsetHeight;

        const scrollFraction = Math.min(1, Math.max(0, scrolled / scrollHeight));

        const frameIndex = Math.min(
            frameFiles.length - 1,
            Math.floor(scrollFraction * (frameFiles.length - 1))
        );

        requestAnimationFrame(() => render(frameIndex));
    });
}
