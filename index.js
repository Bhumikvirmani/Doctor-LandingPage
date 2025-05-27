document.addEventListener('DOMContentLoaded', function() {
    // --- Testimonial Slider Carousel ---
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let testimonialSlideInterval;
    const testimonialSlideDelay = 3000;

    function getTestimonialItems() {
        return testimonialsGrid.querySelectorAll('.testimonial-item');
    }

    function moveTestimonialNext() {
        const first = testimonialsGrid.firstElementChild;
        testimonialsGrid.appendChild(first);
    }

    function moveTestimonialPrev() {
        const last = testimonialsGrid.lastElementChild;
        testimonialsGrid.insertBefore(last, testimonialsGrid.firstElementChild);
    }

    function startTestimonialAutoSlide() {
        testimonialSlideInterval = setInterval(moveTestimonialNext, testimonialSlideDelay);
    }

    function stopTestimonialAutoSlide() {
        clearInterval(testimonialSlideInterval);
    }

    testimonialNext.addEventListener('click', () => {
        stopTestimonialAutoSlide();
        moveTestimonialNext();
        startTestimonialAutoSlide();
    });
    testimonialPrev.addEventListener('click', () => {
        stopTestimonialAutoSlide();
        moveTestimonialPrev();
        startTestimonialAutoSlide();
    });
    testimonialsGrid.addEventListener('mouseenter', stopTestimonialAutoSlide);
    testimonialsGrid.addEventListener('mouseleave', startTestimonialAutoSlide);
    startTestimonialAutoSlide();

    // --- Patient Reviews Slider Carousel ---
    const reviewsGrid = document.querySelector('.reviews-grid');
    const reviewsPrev = document.querySelector('.reviews-prev');
    const reviewsNext = document.querySelector('.reviews-next');
    let reviewSlideInterval;
    const reviewSlideDelay = 3000;

    function moveReviewNext() {
        const first = reviewsGrid.firstElementChild;
        reviewsGrid.appendChild(first);
    }

    function moveReviewPrev() {
        const last = reviewsGrid.lastElementChild;
        reviewsGrid.insertBefore(last, reviewsGrid.firstElementChild);
    }

    function startReviewAutoSlide() {
        reviewSlideInterval = setInterval(moveReviewNext, reviewSlideDelay);
    }

    function stopReviewAutoSlide() {
        clearInterval(reviewSlideInterval);
    }

    reviewsNext.addEventListener('click', () => {
        stopReviewAutoSlide();
        moveReviewNext();
        startReviewAutoSlide();
    });
    reviewsPrev.addEventListener('click', () => {
        stopReviewAutoSlide();
        moveReviewPrev();
        startReviewAutoSlide();
    });
    reviewsGrid.addEventListener('mouseenter', stopReviewAutoSlide);
    reviewsGrid.addEventListener('mouseleave', startReviewAutoSlide);
    startReviewAutoSlide();

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

    // Responsive: Clone service icons for mobile and desktop
    function setupServiceIcons() {
        var desktopSection = document.querySelector('.services-icons-desktop');
        var mobileSection = document.querySelector('.services-icons-mobile');
        if (!desktopSection || !mobileSection) return;
        var statsBar = desktopSection.querySelector('.stats-bar');
        if (!mobileSection.querySelector('.stats-bar')) {
            // Clone the stats-bar for mobile
            var statsBarClone = statsBar.cloneNode(true);
            mobileSection.appendChild(statsBarClone);
        }
        // Always show/hide via CSS only
        mobileSection.style.display = '';
        desktopSection.style.display = '';
    }
    setupServiceIcons();
}); 