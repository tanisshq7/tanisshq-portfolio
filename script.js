/**
 * Tanisshq M - Portfolio Interactive JavaScript
 * Data Analyst & AI Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Animated Typewriter Effect
    initTypewriter();

    // 2. Sticky Navbar & Scrollspy
    initNavigation();

    // 3. Certificate Filter System
    initCertFilters();

    // 4. Contact Form Handler (Formspree AJAX)
    initContactForm();

    // 5. Animated Counter Stats
    initStatsCounter();

    // 6. Global Tech Trends Animated Carousel
    initTrendsCarousel();
});

/* ==========================================================================
   1. Typewriter Animation
   ========================================================================== */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const roles = [
        'Data Analyst',
        'AI Engineer',
        'Python & GenAI Developer',
        'SQL & Data Specialist'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 110;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause before starting deletion
            isDeleting = true;
            typingSpeed = 2200;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 450;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   2. Sticky Navbar, Scrollspy & Mobile Navigation
   ========================================================================== */
function initNavigation() {
    const navbarWrapper = document.getElementById('navbarWrapper');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar Scroll class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbarWrapper?.classList.add('scrolled');
        } else {
            navbarWrapper?.classList.remove('scrolled');
        }

        // Active link scrollspy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
        });

        // Close on link click
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
            }
        });
    }
}

/* ==========================================================================
   3. Certificate Filter & Lightbox Modal
   ========================================================================== */
function initCertFilters() {
    const filterButtons = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            certCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Global modal functions
function openCertModal(imageSrc, title, issuer, date, certId, tagsString) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalCertImg');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalOrg = document.getElementById('modalCertOrg');
    const modalDate = document.getElementById('modalCertDate');
    const modalId = document.getElementById('modalCertId');
    const modalTags = document.getElementById('modalCertTags');
    const modalLink = document.getElementById('modalCertFullLink');

    if (!modal) return;

    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    modalOrg.textContent = issuer;
    modalDate.innerHTML = `<i class="fas fa-calendar-alt"></i> ${date}`;
    modalId.textContent = certId;
    modalLink.href = imageSrc;

    // Render tag chips
    modalTags.innerHTML = '';
    if (tagsString) {
        tagsString.split(',').forEach(tag => {
            const span = document.createElement('span');
            span.className = 'pill-tag';
            span.innerHTML = `<i class="fas fa-tag"></i> ${tag.trim()}`;
            modalTags.appendChild(span);
        });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal(event) {
    const modal = document.getElementById('certModal');
    if (modal && event.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeCertModalDirect() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModalDirect();
    }
});

/* ==========================================================================
   4. Contact Form Handler (Formspree AJAX)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('portfolioContactForm');
    const statusMsg = document.getElementById('contactFormStatus');

    if (!form || !statusMsg) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        statusMsg.className = 'form-status-msg';
        statusMsg.textContent = '';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                statusMsg.className = 'form-status-msg success';
                statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                form.reset();
            } else {
                const data = await response.json();
                statusMsg.className = 'form-status-msg error';
                statusMsg.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${data.errors?.map(err => err.message).join(', ') || 'Something went wrong. Please try emailing directly.'}`;
            }
        } catch (error) {
            statusMsg.className = 'form-status-msg error';
            statusMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Network error. Please email me directly at mtanisshq7@gmail.com';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
        }
    });
}

/* ==========================================================================
   5. Animated Stats Counter
   ========================================================================== */
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    function animateCounters() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0 && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 1600;
                const increment = target / (duration / 25);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, 25);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check on load
}

/* ==========================================================================
   6. Global Tech Trends Animated Carousel
   ========================================================================== */
let trendAutoPlayTimer = null;

function initTrendsCarousel() {
    const track = document.getElementById('trendCarouselTrack');
    const container = document.getElementById('carouselContainer');
    const prevBtn = document.getElementById('prevTrendBtn');
    const nextBtn = document.getElementById('nextTrendBtn');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Button controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Dot indicators
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-index'));
            goToSlide(idx);
            resetAutoPlay();
        });
    });

    // Auto Play
    function startAutoPlay() {
        stopAutoPlay();
        trendAutoPlayTimer = setInterval(nextSlide, 4800);
    }

    function stopAutoPlay() {
        if (trendAutoPlayTimer) {
            clearInterval(trendAutoPlayTimer);
            trendAutoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pause on hover
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);

        // Mobile touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance < 0) {
                    nextSlide(); // Swiped left -> next
                } else {
                    prevSlide(); // Swiped right -> prev
                }
                resetAutoPlay();
            }
        }
    }

    startAutoPlay();
}

/* ==========================================================================
   7. Newsletter Subscription Handler
   ========================================================================== */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const msgBox = document.getElementById('newsletterMsg');
    const submitBtn = e.target.querySelector('button[type="submit"]');

    if (!emailInput || !emailInput.value) return;

    const email = emailInput.value.trim();

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    }

    setTimeout(() => {
        if (msgBox) {
            msgBox.className = 'subscribe-status-msg success';
            msgBox.innerHTML = `<i class="fas fa-check-circle"></i> Awesome! <strong>${email}</strong> has been added to Tanisshq's Tech Digest.`;
        }
        emailInput.value = '';
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Subscribe</span>';
        }
    }, 600);
}
