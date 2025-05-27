// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
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
    
    // --- Form Logic for both Hero and Book Appointment Forms ---
    function initializeForm(form) {
        if (!form) return;
        
        const nameInput = form.querySelector('input[placeholder="Name"]');
        const mobileInput = form.querySelector('input[placeholder="Mobile Number"], input[placeholder="Phone"]');
        const captchaInput = form.querySelector('input[placeholder="Captcha"]');
        const captchaBox = form.querySelector('.captcha-box, .book-captcha-box');
        const termsCheckbox = form.querySelector('input[type="checkbox"]');

        // Generate random 4-digit captcha
        function generateCaptcha() {
            return Math.floor(1000 + Math.random() * 9000).toString();
        }

        // Set a new captcha
        function setCaptcha() {
            const newCaptcha = generateCaptcha();
            captchaBox.textContent = newCaptcha;
        }

        // On page load, set captcha
        setCaptcha();

        // Make captcha clickable
        captchaBox.style.cursor = 'pointer';
        captchaBox.title = 'Click to refresh captcha';
        captchaBox.addEventListener('click', setCaptcha);

        // Form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = nameInput.value.trim();
            const mobile = mobileInput.value.trim();
            const captcha = captchaInput.value.trim();
            const captchaValue = captchaBox.textContent.trim();
            const termsChecked = termsCheckbox.checked;

            // Simple validation
            if (!name) {
                alert('Please enter your name.');
                nameInput.focus();
                return;
            }
            if (!/^\d{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number.');
                mobileInput.focus();
                return;
            }
            if (captcha !== captchaValue) {
                alert('Captcha does not match. Please try again.');
                captchaInput.value = '';
                setCaptcha();
                captchaInput.focus();
                return;
            }
            if (!termsChecked) {
                alert('You must agree to the terms and privacy policy.');
                termsCheckbox.focus();
                return;
            }

            // Save to localStorage
            const formData = {
                name,
                mobile,
                timestamp: new Date().toISOString()
            };
            let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('formSubmissions', JSON.stringify(submissions));

            // Success feedback
            alert('Thank you! Your consultation request has been saved.');
            form.reset();
            setCaptcha();
        });
    }

    // Initialize both forms
    const heroForm = document.querySelector('.hero-form-container form');
    const bookAppointmentForm = document.querySelector('.book-appointment-form');

    initializeForm(heroForm);
    initializeForm(bookAppointmentForm);
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.nextElementSibling.style.display = 'none';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            content.style.display = isActive ? 'none' : 'block';
            this.classList.toggle('active');
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Book appointment button clicks
    const bookButtons = document.querySelectorAll('.btn-book, .btn-appointment, .btn-primary, .btn-offer');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.closest('form')) {
                e.preventDefault();
                const appointmentSection = document.querySelector('.appointment-booking');
                if (appointmentSection) {
                    appointmentSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });
    
    // Testimonial slider functionality
    initTestimonialSlider();
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to header
    header.style.transition = 'transform 0.3s ease';
});

// Additional utility functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

// Google Analytics or tracking code would go here
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-appointment, .btn-primary, .btn-book')) {
        trackEvent('Engagement', 'Button Click', e.target.textContent);
    }
});

// Testimonial slider functionality
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    // Only select the first .testimonials-grid inside the slider
    const grid = slider.querySelector('.testimonials-grid');
    const items = grid.querySelectorAll('.testimonial-item');
    const prevBtn = slider.querySelector('.testimonial-prev');
    const nextBtn = slider.querySelector('.testimonial-next');
    let currentIndex = 0;
    const visibleCount = 4;
    let intervalId;

    function updateSlider() {
        items.forEach((item, i) => {
            if (i >= currentIndex && i < currentIndex + visibleCount) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        // Always enable buttons for looping
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }

    function nextSlide() {
        if (items.length <= visibleCount) return;
        if (currentIndex + visibleCount < items.length) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        if (items.length <= visibleCount) return;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, items.length - visibleCount);
        }
        updateSlider();
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    function startInterval() {
        intervalId = setInterval(nextSlide, 3000);
    }
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    updateSlider();
    startInterval();
}
