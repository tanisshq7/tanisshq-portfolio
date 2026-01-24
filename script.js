// Main JavaScript for Portfolio Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio website loaded');

    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initScrollEffects();
    initCertificateCategories();
    // initCertificateModal(); // Removed
    init3DAnimations();
    initScrollReveal();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            formMessage.textContent = 'Sending your message...';
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
            formMessage.style.color = '#2196F3';

            try {
                const formData = new FormData(contactForm);

                // Add hidden fields for better email formatting
                formData.append('_subject', 'New message from portfolio website');
                formData.append('_replyto', formData.get('email'));

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success message
                    formMessage.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
                    formMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                    formMessage.style.color = '#4CAF50';

                    // Reset form
                    contactForm.reset();

                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error message
                formMessage.textContent = '❌ Oops! Something went wrong. Please try again or email me directly.';
                formMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                formMessage.style.color = '#F44336';

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);

                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(18, 18, 31, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = '';
                navbar.style.backdropFilter = '';
            }
        }
    });
}

// Certificate Categories
function initCertificateCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categorySections = document.querySelectorAll('.category-section');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get category
            const category = this.getAttribute('data-category');

            // Show/hide sections
            categorySections.forEach(section => {
                if (category === 'all' || section.id === `${category}-section`) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Smooth scroll to certificates section
            document.querySelector('#certificates').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Certificate Modal Removed as per user request for direct links
// function initCertificateModal() { ... }

// 3D Animations
function init3DAnimations() {
    // Add floating animation to all floating cards
    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effect to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.05) rotateY(10deg)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // Add parallax effect to background elements on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        const bgCube = document.querySelector('.bg-cube');
        const bgPyramid = document.querySelector('.bg-pyramid');
        const bgSphere = document.querySelector('.bg-sphere');

        if (bgCube) bgCube.style.transform = `translateY(${rate * 0.3}px) rotate(${rate * 0.1}deg)`;
        if (bgPyramid) bgPyramid.style.transform = `translateY(${rate * 0.2}px) rotate(${rate * 0.05}deg)`;
        if (bgSphere) bgSphere.style.transform = `translateY(${rate * 0.4}px)`;
    });

    // Initialize typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        // Reset animation for repeat
        heroSubtitle.style.animation = 'none';
        setTimeout(() => {
            heroSubtitle.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }, 100);
    }

    // Add interactive 3D rotation to project cards on mouse move
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;

            this.querySelector('.card-3d').style.transform =
                `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.card-3d').style.transform = '';
        });
    });
}

// Handle image loading errors
document.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('certificate-preview')) {
        console.error('Certificate image failed to load:', e.target.src);

        // Create a placeholder with certificate info
        const parent = e.target.parentElement;
        const info = parent.nextElementSibling;

        if (info) {
            const title = info.querySelector('h4').textContent;
            const org = info.querySelector('.certificate-org').textContent;

            // Create SVG placeholder
            const placeholderSVG = `
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="300" fill="#1a1a2e"/>
                    <text x="200" y="120" text-anchor="middle" fill="#00d4ff" font-family="Arial" font-size="18">${title}</text>
                    <text x="200" y="150" text-anchor="middle" fill="#b0b0c0" font-family="Arial" font-size="14">${org}</text>
                    <text x="200" y="180" text-anchor="middle" fill="#666" font-family="Arial" font-size="12">Certificate Preview</text>
                    <rect x="50" y="200" width="300" height="2" fill="#00d4ff"/>
                </svg>
            `;

            e.target.src = 'data:image/svg+xml;base64,' + btoa(placeholderSVG);
        }

        e.target.src = 'data:image/svg+xml;base64,' + btoa(placeholderSVG);
    }
}, true);

// ScrollReveal Animations
function initScrollReveal() {
    // Check if ScrollReveal is loaded
    if (typeof ScrollReveal === 'undefined') return;

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: false // Animations run only once
    });

    // Hero Section
    sr.reveal('.hero-title', { delay: 200, origin: 'left' });
    sr.reveal('.hero-subtitle', { delay: 400, origin: 'left' });
    sr.reveal('.hero-description', { delay: 600, origin: 'left' });
    sr.reveal('.hero-buttons', { delay: 800, origin: 'left' });
    sr.reveal('.hero-image', { delay: 600, origin: 'right' });

    // Section Titles
    sr.reveal('.section-title', { delay: 200, origin: 'top' });
    sr.reveal('.section-subtitle', { delay: 400, origin: 'top' });

    // About Section
    sr.reveal('.about-card', { delay: 500, origin: 'bottom' });

    // Certificates
    sr.reveal('.category-nav', { delay: 300, origin: 'bottom' });
    sr.reveal('.certificate-card', {
        interval: 200, // Stagger animations
        origin: 'bottom'
    });

    // Projects
    sr.reveal('.project-card', {
        interval: 200,
        origin: 'bottom'
    });

    // Contact
    sr.reveal('.contact-info', { delay: 300, origin: 'left' });
    sr.reveal('.contact-form', { delay: 500, origin: 'right' });
}