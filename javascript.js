
document.querySelectorAll('.dropdown > a').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('active');
    });
});
let currentSlide = 0;
const slides = document.getElementById('slides');
const totalSlides = document.querySelectorAll('.slide').length;

// Initialize dots
function initDots() {
    const dotsContainer = document.getElementById('slideDots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Move slides
function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateSlider();
}

// Go to specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Update slider position and dots
function updateSlider() {
    const translateX = -currentSlide * 100;
    slides.style.transform = `translateX(${translateX}%)`;
    
    // Update active dot
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Auto-slide (optional)
let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(() => changeSlide(1), 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initDots();
    startAutoSlide();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Touch/swipe support
    let startX = 0;
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) changeSlide(1);  // Swipe left
            else changeSlide(-1);          // Swipe right
        }
    });
});

const chefMedia = document.querySelectorAll('.chef-media');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
}, { threshold: 0.3 });

chefMedia.forEach(el => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let autoSlideInterval;

    function updateSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        updateSlide(next);
    }

    function prevSlide() {
        const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        updateSlide(prev);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlide(index));
    });

    // Auto-slide
    autoSlideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    document.querySelector('.carousel-hero').addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    document.querySelector('.carousel-hero').addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
});








