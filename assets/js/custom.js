document.addEventListener("DOMContentLoaded", function() {
    const filterBtns = document.querySelectorAll('.filter-options li');
    const galleryItems = document.querySelectorAll('.picture-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-group');

            galleryItems.forEach(item => {
                const groups = JSON.parse(item.getAttribute('data-groups') || '[]');
                if (groups.includes(filter)) {
                    item.classList.remove('d-none');
                } else {
                    item.classList.add('d-none');
                }
            });
        });
    });

    // Counter Animation
    const animateCounter = (el) => {
        const target = parseInt(el.innerText, 10);
        const duration = 1000; // 1 seconds
        const step = target / (duration / 16);
        let current = 0;
        
        // Start from 0 initially
        el.innerText = '0'; 

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target;
            }
        };
        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countElements = entry.target.querySelectorAll('.count');
                countElements.forEach(el => animateCounter(el));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const counterSection = document.querySelector('.counter-bgimage');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    // Testimonial Swiper
    const testimonialSwiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                slidesPerGroup: 1,
            }
        }
    });
});
