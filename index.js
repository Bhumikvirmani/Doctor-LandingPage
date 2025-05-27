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
}); 