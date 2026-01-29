// Mohaa Finest Curtains - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Hero carousel functionality
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }

    // Auto-advance carousel every 5 seconds
    if (carouselSlides.length > 1) {
        setInterval(nextSlide, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all main sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // WhatsApp button click tracking (for analytics if needed)
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            // Could add analytics tracking here
            console.log('WhatsApp link clicked:', this.href);
        });
    });

    // WhatsApp Popup Functionality
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const popupClose = document.querySelector('.popup-close');
    let popupShown = false;

    // Show popup after 5 seconds
    setTimeout(function() {
        if (!popupShown && !sessionStorage.getItem('whatsappPopupShown')) {
            whatsappPopup.style.display = 'block';
            popupShown = true;
            sessionStorage.setItem('whatsappPopupShown', 'true');
        }
    }, 5000); // 5 seconds

    // Close popup when clicking the X
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            whatsappPopup.style.display = 'none';
        });
    }

    // Close popup when clicking outside the content
    if (whatsappPopup) {
        whatsappPopup.addEventListener('click', function(e) {
            if (e.target === whatsappPopup) {
                whatsappPopup.style.display = 'none';
            }
        });
    }

    // Close popup when clicking WhatsApp button (to avoid double popup)
    document.querySelectorAll('.whatsapp-popup-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            whatsappPopup.style.display = 'none';
        });
    });

    // Form validation for any forms (if added later)
    function validatePhoneNumber(phone) {
        const phoneRegex = /^(\+254|254|0)[17]\d{8}$/;
        return phoneRegex.test(phone);
    }

    // Lazy loading for images (performance optimization)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
