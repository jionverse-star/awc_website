// Comparison Card Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const cards = document.querySelectorAll('.comparison-card');
    const dots = document.querySelectorAll('.slider-pagination .dot');
    const prevBtn = document.getElementById('compPrevBtn');
    const nextBtn = document.getElementById('compNextBtn');
    let autoSlideInterval;

    function showSlide(index) {
        if (cards.length === 0) return;

        // Boundary check
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;

        currentSlideIndex = index;

        // Update cards
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Reset auto-slide timer whenever user interacts
        resetAutoSlide();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            showSlide(currentSlideIndex + 1);
        }, 4000); // 4 seconds
    }

    // Button click handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(currentSlideIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(currentSlideIndex + 1);
        });
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const section = document.getElementById('ai-comparison');
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom >= 0;

        if (inView) {
            if (e.key === 'ArrowLeft') {
                showSlide(currentSlideIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(currentSlideIndex + 1);
            }
        }
    });

    // Initialize
    showSlide(0);
    resetAutoSlide();
});
