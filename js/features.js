/**
 * ZenByte Advanced Features
 * Shared functionality across all pages
 */

// ===== PAGE LOADER =====
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor || window.innerWidth < 768) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .anim-card, .faq-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ===== ANIMATED NUMBER COUNTERS =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter-value');
    if (!counters.length) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    const isDecimal = element.dataset.decimal === 'true';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = easeOutQuart * target;

        if (isDecimal) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
        }
    }

    requestAnimationFrame(update);
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== COOKIE CONSENT =====
function initCookieConsent() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (!cookieBanner) return;

    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 2000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.classList.remove('visible');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.classList.remove('visible');
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    if (!themeToggle && !mobileThemeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    const handleThemeToggle = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    };

    themeToggle?.addEventListener('click', handleThemeToggle);
    mobileThemeToggle?.addEventListener('click', handleThemeToggle);
}

function updateThemeIcons(theme) {
    const themeIcons = document.querySelectorAll('.theme-icon-sun, .theme-icon-moon');
    
    themeIcons.forEach(icon => {
        if (theme === 'dark') {
            if (icon.classList.contains('theme-icon-sun')) icon.classList.remove('hidden');
            if (icon.classList.contains('theme-icon-moon')) icon.classList.add('hidden');
        } else {
            if (icon.classList.contains('theme-icon-sun')) icon.classList.add('hidden');
            if (icon.classList.contains('theme-icon-moon')) icon.classList.remove('hidden');
        }
    });
}


// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;

    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])');

    links.forEach(link => {
        // Only apply to internal links
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.href;

                transition.classList.add('active');

                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        }
    });

    // Handle page entry animation
    window.addEventListener('pageshow', () => {
        transition.classList.remove('active');
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 800) {
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===== SKELETON LOADER FOR IMAGES =====
function initSkeletonLoaders() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
        // Create skeleton placeholder
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton';
        skeleton.style.width = img.width + 'px';
        skeleton.style.height = img.height + 'px';

        img.parentNode.insertBefore(skeleton, img);
        img.style.display = 'none';

        // Load image
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = img.dataset.src;
            img.style.display = '';
            skeleton.remove();
        };
        tempImg.src = img.dataset.src;
    });
}

// ===== GSAP ANIMATIONS =====
function initGsapAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Fade Up Animation
    const fadeElements = document.querySelectorAll(".gsap-fade-up");
    fadeElements.forEach((el, index) => {
        gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );
    });
}

// ===== SHARED UI INJECTION =====
function injectSharedUI() {
    // Scroll Progress
    if (!document.getElementById('scrollProgress')) {
        const bar = document.createElement('div');
        bar.id = 'scrollProgress';
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);
    }

    // Back to Top
    if (!document.getElementById('backToTop')) {
        const btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.className = 'back-to-top flex items-center justify-center';
        btn.innerHTML = '<i data-lucide="arrow-up" class="w-5 h-5"></i>';
        document.body.appendChild(btn);
    }

    // Page Transition Overlay
    if (!document.getElementById('pageTransition')) {
        const div = document.createElement('div');
        div.id = 'pageTransition';
        div.className = 'page-transition';
        document.body.appendChild(div);
    }
}

// ===== MOBILE MENU LOGIC =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const menu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !menu) return;

    const toggle = () => {
        menu.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden');
    };

    menuBtn.addEventListener('click', toggle);
    closeBtn?.addEventListener('click', toggle);
    
    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggle);
    });
}

// ===== FAQ LOGIC =====
function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    
    // Close other FAQs
    document.querySelectorAll('.faq-content').forEach(el => {
        if (el !== content) el.classList.remove('open');
    });
    
    document.querySelectorAll('.faq-btn i, .faq-item button i').forEach(el => {
        if (el !== icon) el.style.transform = 'rotate(0deg)';
    });

    content.classList.toggle('open');
    if (icon) {
        icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

// Make toggleFaq global for inline onclick handlers
window.toggleFaq = toggleFaq;

// ===== INITIALIZE ALL FEATURES =====
function initAdvancedFeatures() {
    injectSharedUI();
    initPageLoader();
    initCustomCursor();
    initCounterAnimation();
    initScrollProgress();
    initBackToTop();
    initCookieConsent();
    initThemeToggle();
    initPageTransitions();
    initParallax();
    initSkeletonLoaders();
    initMobileMenu();
    initGsapAnimations();
}


// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initAdvancedFeatures();
    // Re-initialize Lucide icons after dynamic content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

