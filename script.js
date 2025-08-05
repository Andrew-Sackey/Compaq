// Enhanced scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Add cursor pointer
    scrollIndicator.style.cursor = 'pointer';
}// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const slideTexts = document.querySelectorAll('.slide-text');
const slideDescs = document.querySelectorAll('.slide-desc');
const slideImages = document.querySelectorAll('.slide-image');
const indicators = document.querySelectorAll('.indicator');
const heroStats = document.querySelectorAll('.stat h3');

// Global Variables
let currentSlide = 0;
let slideInterval;
const totalSlides = slideTexts.length;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
initializeNavigation();
initializeSlideshow();
initializeScrollEffects();
initializeCounterAnimation();
initializeHoverEffects();
});

// Navigation Functions
function initializeNavigation() {
// Hamburger menu toggle
hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', handleNavbarScroll);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
});
}

function toggleMobileMenu() {
navMenu.classList.toggle('active');
hamburger.classList.toggle('active');
}

function handleNavbarScroll() {
if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
} else {
    navbar.classList.remove('scrolled');
}
}

function handleSmoothScroll(e) {
const href = this.getAttribute('href');
if (href.startsWith('#')) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}
}

// Slideshow Functions
function initializeSlideshow() {
// Set first slide as active
updateSlide(0);

// Add click handlers to indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateSlide(currentSlide);
        resetSlideInterval();
    });
});

// Start automatic slideshow
startSlideshow();

// Pause slideshow on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', pauseSlideshow);
heroSection.addEventListener('mouseleave', startSlideshow);
}

function updateSlide(index) {
// Update text slides
slideTexts.forEach((text, i) => {
    text.classList.toggle('active', i === index);
});

// Update description slides
slideDescs.forEach((desc, i) => {
    desc.classList.toggle('active', i === index);
});

// Update image slides
slideImages.forEach((image, i) => {
    image.classList.toggle('active', i === index);
});

// Update indicators
indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
});
}

function nextSlide() {
currentSlide = (currentSlide + 1) % totalSlides;
updateSlide(currentSlide);
}

function startSlideshow() {
slideInterval = setInterval(nextSlide, 6000); // Increased from 4000ms to 6000ms (6 seconds)
}

function pauseSlideshow() {
clearInterval(slideInterval);
}

function resetSlideInterval() {
clearInterval(slideInterval);
startSlideshow();
}

// Scroll Effects
function initializeScrollEffects() {
// Create intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll('.hero-badge, .hero-buttons, .hero-stats');
animatedElements.forEach(el => observer.observe(el));

// Parallax effect for background
window.addEventListener('scroll', handleParallaxEffect);
}

function handleParallaxEffect() {
const scrolled = window.pageYOffset;
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
}
}

// Counter Animation
function initializeCounterAnimation() {
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroStats.forEach(stat => counterObserver.observe(stat));
}

function animateCounter(element) {
const target = element.textContent;
const isPercentage = target.includes('%');
const hasPlus = target.includes('+');
const numericValue = parseInt(target.replace(/\D/g, ''));

let suffix = '';
if (isPercentage) suffix = '%';
else if (hasPlus) suffix = '+';

let current = 0;
const increment = numericValue / 80; // 80 frames for smoother animation
const duration = 2000; // 2 seconds
const frameRate = 16; // ~60fps

element.textContent = '0' + suffix;

const timer = setInterval(() => {
    current += increment;
    if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
}, frameRate);
}

// Hover Effects
function initializeHoverEffects() {
// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Navigation link hover effects
navLinks.forEach(link => {
    if (!link.classList.contains('cta-nav')) {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'var(--text-secondary)';
        });
    }
});

// Enhanced scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Add cursor pointer
    scrollIndicator.style.cursor = 'pointer';
}
}

// Advanced Animation Functions
function createParticleEffect() {
const particleContainer = document.createElement('div');
particleContainer.className = 'particle-container';
particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 1;
`;

document.querySelector('.hero-background').appendChild(particleContainer);

// Create floating particles
for (let i = 0; i < 20; i++) {
    setTimeout(() => createParticle(particleContainer), i * 200);
}
}

function createParticle(container) {
const particle = document.createElement('div');
particle.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.8) 0%, transparent 70%);
    border-radius: 50%;
    left: ${Math.random() * 100}%;
    top: 100%;
    animation: floatUp ${15 + Math.random() * 10}s linear infinite;
`;

container.appendChild(particle);

// Remove particle after animation
setTimeout(() => {
    if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
    }
}, 25000);
}

// Add particle animation CSS
function addParticleStyles() {
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0px) translateX(0px) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: scale(1);
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
}

// Enhanced Scroll Animations
function initializeAdvancedScrollEffects() {
// Create timeline for scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate scroll progress
    const scrollProgress = scrolled / (documentHeight - viewportHeight);
    
    // Update scroll indicator
    updateScrollIndicator(scrollProgress);
    
    // Advanced parallax for different elements
    applyAdvancedParallax(scrolled);
});
}

function updateScrollIndicator(progress) {
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
    const opacity = Math.max(0, 1 - progress * 3);
    scrollArrow.style.opacity = opacity;
    scrollArrow.style.transform = `translateY(${progress * 20}px)`;
}
}

function applyAdvancedParallax(scrolled) {
const heroOverlay = document.querySelector('.hero-overlay');
const floatingCards = document.querySelectorAll('.card');

if (heroOverlay) {
    heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
}

floatingCards.forEach((card, index) => {
    const speed = 0.1 + (index * 0.05);
    card.style.transform += ` translateY(${scrolled * speed}px)`;
});
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            if (e.target.closest('.hero')) {
                e.preventDefault();
                currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
                updateSlide(currentSlide);
                resetSlideInterval();
            }
            break;
        case 'ArrowRight':
            if (e.target.closest('.hero')) {
                e.preventDefault();
                nextSlide();
                resetSlideInterval();
            }
            break;
        case ' ':
            if (e.target.closest('.hero')) {
                e.preventDefault();
                if (slideInterval) {
                    pauseSlideshow();
                } else {
                    startSlideshow();
                }
            }
            break;
    }
});
}

// Touch/Swipe Support
function initializeTouchSupport() {
let startX = 0;
let startY = 0;
const heroSection = document.querySelector('.hero');

heroSection.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

heroSection.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Only process horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
            updateSlide(currentSlide);
        }
        resetSlideInterval();
    }
});
}

// Performance Optimization
function optimizePerformance() {
// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    clearInterval(slideInterval);
}

// Lazy load images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.loading = 'lazy';
});

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        handleAdvancedScrollEffects();
    }, 16); // ~60fps
});
}

function handleAdvancedScrollEffects() {
const scrolled = window.pageYOffset;
requestAnimationFrame(() => {
    applyAdvancedParallax(scrolled);
});
}

// Initialize all enhanced features
function initializeEnhancedFeatures() {
addParticleStyles();
createParticleEffect();
initializeAdvancedScrollEffects();
initializeKeyboardNavigation();
initializeTouchSupport();
optimizePerformance();
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
// Call original initialization functions
initializeNavigation();
initializeSlideshow();
initializeScrollEffects();
initializeCounterAnimation();
initializeHoverEffects();

// Initialize enhanced features
setTimeout(initializeEnhancedFeatures, 1000);
});

// Window resize handler
window.addEventListener('resize', () => {
// Recalculate animations on resize
if (window.innerWidth <= 968) {
    // Mobile optimizations
    pauseSlideshow();
    setTimeout(startSlideshow, 500);
}
});

// Visibility change handler
document.addEventListener('visibilitychange', () => {
if (document.hidden) {
    pauseSlideshow();
} else {
    startSlideshow();
}
});




// Video Background About Section JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoSection();
    initializeTypewriter();
});

function initializeVideoSection() {
    initializeScrollAnimations();
    initializeVideoControls();
    initializeVideoFallback();
    initializeHoverEffects();
    initializeParallaxEffects();
    optimizeVideoPerformance();
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (!typewriterElement) return;
    
    const text = "For over 15 years, COMPAQ BUILDERS has been Ghana's trusted partner in construction excellence. From residential masterpieces to commercial landmarks, roads that connect communities to pools that create memories – we build more than structures, we build dreams.";
    
    let index = 0;
    const speed = 50; // Typing speed in milliseconds
    
    function typeText() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, speed);
        } else {
            // Remove blinking cursor after typing is complete
            setTimeout(() => {
                typewriterElement.style.borderRight = 'none';
            }, 2000);
        }
    }
    
    // Start typewriter effect when element comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeText, 800); // Delay start
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(typewriterElement.parentElement);
}

// Scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('aos-animate');
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// Counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on target value
        if (target >= 100) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 25); // Smooth animation
}

// Video controls
function initializeVideoControls() {
    const video = document.querySelector('.background-video');
    const videoToggle = document.querySelector('.video-toggle');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (!video || !videoToggle) return;
    
    // Initial state - video is playing
    let isPlaying = true;
    
    videoToggle.addEventListener('click', () => {
        toggleVideo();
    });
    
    // Handle video events
    video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
    });
    
    video.addEventListener('error', (e) => {
        console.log('Video failed to load, using fallback');
        handleVideoError();
    });
}

function toggleVideo() {
    const video = document.querySelector('.background-video');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (!video) return;
    
    if (video.paused) {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        video.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Video fallback handling
function initializeVideoFallback() {
    const video = document.querySelector('.background-video');
    if (!video) return;
    
    // Set timeout for video loading
    setTimeout(() => {
        if (video.readyState === 0) {
            handleVideoError();
        }
    }, 5000);
    
    // Handle video load errors
    video.addEventListener('error', handleVideoError);
    video.addEventListener('stalled', handleVideoError);
}

function handleVideoError() {
    const videoBackground = document.querySelector('.video-background');
    const video = document.querySelector('.background-video');
    
    if (videoBackground && video) {
        // Hide video and show fallback background
        video.style.display = 'none';
        videoBackground.style.background = `
            linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.7)),
            url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&crop=center') center/cover
        `;
        
        // Hide video controls
        const videoControls = document.querySelector('.video-controls');
        if (videoControls) {
            videoControls.style.display = 'none';
        }
    }
}

// Enhanced hover effects
function initializeHoverEffects() {
    // Highlight items hover effects
    const highlightItems = document.querySelectorAll('.highlight-item');
    
    highlightItems.forEach(item => {
        const icon = item.querySelector('.highlight-icon');
        
        item.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
                icon.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.3)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '';
            }
        });
    });
    
    // Stat boxes hover effects
    const statBoxes = document.querySelectorAll('.stat-box');
    
    statBoxes.forEach(box => {
        const statNumber = box.querySelector('.stat-number');
        
        box.addEventListener('mouseenter', function() {
            if (statNumber) {
                statNumber.style.transform = 'scale(1.1)';
                statNumber.style.textShadow = '0 5px 15px rgba(255, 107, 53, 0.5)';
            }
        });
        
        box.addEventListener('mouseleave', function() {
            if (statNumber) {
                statNumber.style.transform = 'scale(1)';
                statNumber.style.textShadow = '';
            }
        });
    });
    
    // CTA button enhanced effects
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%)';
            this.style.backgroundSize = '200% 100%';
            this.style.animation = 'gradientShift 2s ease infinite';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.background = 'var(--gradient-primary)';
            this.style.backgroundSize = '100% 100%';
            this.style.animation = '';
        });
    }
}

// Parallax effects
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector('.about-video');
        
        if (aboutSection) {
            const rect = aboutSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                // Parallax effect for video
                const video = document.querySelector('.background-video');
                if (video) {
                    const speed = scrolled * 0.1;
                    video.style.transform = `translateX(-50%) translateY(calc(-50% + ${speed}px))`;
                }
                
                // Parallax effect for floating shapes
                const shapes = document.querySelectorAll('.floating-shape');
                shapes.forEach((shape, index) => {
                    const speed = scrolled * (0.05 + index * 0.02);
                    shape.style.transform = `translateY(${speed}px)`;
                });
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Video performance optimization
function optimizeVideoPerformance() {
    const video = document.querySelector('.background-video');
    if (!video) return;
    
    // Intersection Observer for video performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Video is visible, ensure it's playing
                if (video.paused) {
                    video.play().catch(e => console.log('Video autoplay failed:', e));
                }
            } else {
                // Video is not visible, pause to save resources
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, { threshold: 0.25 });
    
    videoObserver.observe(video);
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            video.pause();
        } else {
            const aboutSection = document.querySelector('.about-video');
            const rect = aboutSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                video.play().catch(e => console.log('Video resume failed:', e));
            }
        }
    });
    
    // Reduce video quality on slower connections
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            handleVideoError(); // Use fallback image instead
        }
    }
}

// Advanced animations
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        z-index: 1;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add dynamic CSS animations
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes gradientShift {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
            }
            50% {
                box-shadow: 0 0 30px rgba(255, 107, 53, 0.6);
            }
        }
        
        /* Enhanced focus states for accessibility */
        .cta-button:focus,
        .video-toggle:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        /* Smooth transitions for reduced motion */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .floating-shape {
                animation: none !important;
            }
            
            .background-video {
                animation: none !important;
            }
        }
        
        /* Loading state */
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid transparent;
            border-top: 2px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced CTA button interactions
function enhanceCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;
    
    // Add ripple effect on click
    ctaButton.addEventListener('click', function(e) {
        createRippleEffect(this, e);
    });
    
    // Add loading state simulation
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        this.classList.add('loading');
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 800);
    });
}

// Smooth page transitions
function initializePageTransitions() {
    // Add fade-in animation to the entire section
    const aboutSection = document.querySelector('.about-video');
    if (aboutSection) {
        aboutSection.style.opacity = '0';
        aboutSection.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
            aboutSection.style.opacity = '1';
        }, 100);
    }
}

// Error handling and fallbacks
function initializeErrorHandling() {
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'VIDEO') {
            console.log('Video error detected, switching to fallback');
            handleVideoError();
        }
    });
    
    // Handle network errors
    window.addEventListener('offline', () => {
        const video = document.querySelector('.background-video');
        if (video) {
            video.pause();
        }
    });
    
    window.addEventListener('online', () => {
        const video = document.querySelector('.background-video');
        if (video && !video.error) {
            video.play().catch(e => console.log('Video resume after reconnect failed:', e));
        }
    });
}

// Mobile-specific optimizations
function initializeMobileOptimizations() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Enable video on mobile but with optimizations
        const video = document.querySelector('.background-video');
        if (video) {
            // Add mobile-specific attributes for better performance
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.muted = true; // Ensure muted for autoplay on mobile
            
            // Reduce video quality on very small screens
            if (window.innerWidth < 480) {
                video.style.filter = 'brightness(0.3) contrast(1.1)'; // Darker for better text readability
            }
        }
        
        // Keep floating elements but reduce animation intensity
        const floatingShapes = document.querySelectorAll('.floating-shape');
        floatingShapes.forEach(shape => {
            shape.style.animationDuration = '12s'; // Slower animation on mobile
        });
        
        // Optimize touch interactions
        const highlightItems = document.querySelectorAll('.highlight-item');
        highlightItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initializeVideoSection();
    
    // Add enhanced features
    addDynamicStyles();
    enhanceCTAButton();
    initializePageTransitions();
    initializeErrorHandling();
    initializeMobileOptimizations();
    
    // Log initialization
    console.log('Video About Section initialized successfully');
});

// Cleanup function for better memory management
window.addEventListener('beforeunload', () => {
    const video = document.querySelector('.background-video');
    if (video) {
        video.pause();
        video.src = '';
        video.load();
    }
});


// Our Services Section

// Services Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation of service cards
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Set background images dynamically
    serviceCards.forEach(card => {
        const bgImage = card.getAttribute('data-bg');
        if (bgImage) {
            card.style.backgroundImage = `url('${bgImage}')`;
        }
    });
    
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Enhanced hover effects for service cards
    serviceCards.forEach(card => {
        const overlay = card.querySelector('.service-overlay');
        const icon = card.querySelector('.service-icon');
        const background = card.querySelector('.service-background img');

        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            // Add ripple effect to icon
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }

            // Enhance image zoom
            if (background) {
                background.style.transform = 'scale(1.15)';
            }

            // Add floating animation to card
            card.style.animation = 'float 3s ease-in-out infinite';
        });

        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            // Reset icon
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }

            // Reset image
            if (background) {
                background.style.transform = 'scale(1)';
            }

            // Remove floating animation
            card.style.animation = 'none';
        });

        // Click tracking for analytics (optional)
        card.addEventListener('click', function() {
            const category = card.getAttribute('data-category');
            console.log(`Service card clicked: ${category}`);
            
            // Add click ripple effect
            createRipple(card, event);
        });
    });

    // Create ripple effect function
    function createRipple(element, event) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 215, 0, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Create button ripple effect
    function createButtonRipple(button, event) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 0, 0, 0.2)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'buttonRipple 0.4s linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 400);
    }

    // Parallax effect for service section background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const servicesSection = document.querySelector('.services-section');
        
        if (servicesSection) {
            const rect = servicesSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const rate = scrolled * 0.1;
                servicesSection.style.backgroundPositionY = `${rate}px`;
            }
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Throttled scroll listener for parallax
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

    // Lazy loading for service images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all service images for lazy loading
    const serviceImages = document.querySelectorAll('.service-background img[data-src]');
    serviceImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Keyboard navigation support
    serviceCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextCard = serviceCards[index + 1] || serviceCards[0];
                nextCard.focus();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevCard = serviceCards[index - 1] || serviceCards[serviceCards.length - 1];
                prevCard.focus();
            }
        });
    });

    // Performance optimization: Pause animations when not visible
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const servicesSection = entry.target;
            if (entry.isIntersecting) {
                // Resume animations when section is visible
                servicesSection.style.animationPlayState = 'running';
            } else {
                // Pause animations when section is not visible
                servicesSection.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });

    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        performanceObserver.observe(servicesSection);
    }

    // Touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;

    serviceCards.forEach(card => {
        // Touch start
        card.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
            card.classList.add('touch-active');
        }, { passive: true });

        // Touch end
        card.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            card.classList.remove('touch-active');
            
            // If it's a tap (not a scroll), trigger the hover effect briefly
            if (Math.abs(touchEndY - touchStartY) < 10) {
                card.classList.add('touch-hover');
                setTimeout(() => {
                    card.classList.remove('touch-hover');
                }, 2000);
            }
        }, { passive: true });
    });

    // Service card filtering (if needed for future enhancements)
    function filterServices(category) {
        serviceCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('animate');
                }, 100);
            } else {
                card.classList.remove('animate');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Preload images for better performance
    function preloadImages() {
        const imageUrls = [
            'images/S1.jpeg',
            'images/s2.jpeg',
            'images/S3.jpeg',
            'images/S4.jpeg',
            'images/S5.jpeg',
            'images/S6.jpeg',
            'images/c1.jpeg',
            'images/S8.jpeg'
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Start preloading images after a short delay
    // setTimeout(preloadImages, 1000);

    // Export functions for external use (if needed)
    window.servicesModule = {
        filterServices,
        createRipple,
        updateParallax: requestParallaxUpdate
    };
});

// CSS animations for ripple effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(-10px);
        }
        50% {
            transform: translateY(-15px);
        }
    }

    .service-card.touch-active {
        transform: scale(0.98);
    }

    .service-card.touch-hover .service-details {
        opacity: 1;
        transform: translateY(0);
    }

    .service-card.touch-hover .service-content {
        opacity: 0;
        transform: translateY(-20px);
    }

    .service-background img.loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }

    .service-background img:not(.loaded) {
        opacity: 0;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .service-card,
        .service-icon,
        .service-background img,
        .service-details,
        .service-content {
            transition: none !important;
            animation: none !important;
        }
    }

    /* Focus styles for accessibility */
    .service-card:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
    }
`;

document.head.appendChild(style);



// Gallery Card Slider JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Gallery elements
    const tabBtns = document.querySelectorAll('.gallery-tab-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const slider = document.getElementById('gallerySlider');
    const prevBtn = document.querySelector('.gallery-prev-btn');
    const nextBtn = document.querySelector('.gallery-next-btn');
    const progressFill = document.querySelector('.gallery-progress-fill');
    
    // Lightbox elements
    const lightboxModal = document.getElementById('galleryLightboxModal');
    const lightboxImage = document.getElementById('galleryLightboxImage');
    const lightboxClose = document.getElementById('galleryLightboxClose');
    const lightboxPrev = document.getElementById('galleryLightboxPrev');
    const lightboxNext = document.getElementById('galleryLightboxNext');
    
    let currentFilter = 'general-construction';
    let currentSliderPosition = 0;
    let currentImages = [];
    let currentImageIndex = 0;
    
    // Initialize gallery
    function initGallery() {
        showCategory(currentFilter);
        updateCurrentImages();
        updateNavigationButtons();
        updateProgressBar();
    }
    
    // Tab button functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show category with animation
            showCategory(filter);
            currentFilter = filter;
            currentSliderPosition = 0;
            
            // Reset slider position
            if (slider) {
                slider.style.transform = 'translateX(0px)';
            }
            
            updateCurrentImages();
            updateNavigationButtons();
            updateProgressBar();
        });
    });
    
    function showCategory(category) {
        galleryCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (cardCategory === category) {
                // Show with staggered animation
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Slider navigation
    function slideNext() {
        const visibleCards = getVisibleCards();
        const cardWidth = 280 + 24; // card width + gap
        const containerWidth = slider.parentElement.offsetWidth;
        const maxScroll = (visibleCards.length * cardWidth) - containerWidth;
        
        if (currentSliderPosition < maxScroll) {
            currentSliderPosition = Math.min(currentSliderPosition + cardWidth * 2, maxScroll);
            slider.style.transform = `translateX(-${currentSliderPosition}px)`;
            updateNavigationButtons();
            updateProgressBar();
        }
    }
    
    function slidePrev() {
        const cardWidth = 280 + 24; // card width + gap
        
        if (currentSliderPosition > 0) {
            currentSliderPosition = Math.max(currentSliderPosition - cardWidth * 2, 0);
            slider.style.transform = `translateX(-${currentSliderPosition}px)`;
            updateNavigationButtons();
            updateProgressBar();
        }
    }
    
    function getVisibleCards() {
        return Array.from(galleryCards).filter(card => {
            return card.getAttribute('data-category') === currentFilter;
        });
    }
    
    function updateNavigationButtons() {
        const visibleCards = getVisibleCards();
        const cardWidth = 280 + 24;
        const containerWidth = slider.parentElement.offsetWidth;
        const maxScroll = (visibleCards.length * cardWidth) - containerWidth;
        
        if (prevBtn) {
            prevBtn.disabled = currentSliderPosition <= 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentSliderPosition >= maxScroll;
        }
    }
    
    function updateProgressBar() {
        const visibleCards = getVisibleCards();
        const cardWidth = 280 + 24;
        const containerWidth = slider.parentElement.offsetWidth;
        const maxScroll = Math.max((visibleCards.length * cardWidth) - containerWidth, 0);
        
        if (maxScroll > 0) {
            const progress = (currentSliderPosition / maxScroll) * 100;
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        } else {
            if (progressFill) {
                progressFill.style.width = '100%';
            }
        }
    }
    
    // Navigation button events
    if (nextBtn) {
        nextBtn.addEventListener('click', slideNext);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', slidePrev);
    }
    
    // Lightbox functionality
    function updateCurrentImages() {
        currentImages = [];
        getVisibleCards().forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                currentImages.push({
                    src: img.src,
                    alt: img.alt
                });
            }
        });
    }
    
    // Card click events for lightbox
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const visibleCards = getVisibleCards();
                const cardIndex = visibleCards.indexOf(this);
                
                if (cardIndex !== -1) {
                    openLightbox(cardIndex);
                }
            }
        });
    });
    
    function openLightbox(index) {
        if (currentImages.length === 0 || !lightboxModal || !lightboxImage) return;
        
        currentImageIndex = index;
        const imageData = currentImages[currentImageIndex];
        
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.alt;
        lightboxModal.classList.add('active');
        
        document.body.style.overflow = 'hidden';
        lightboxImage.style.animation = 'slideIn 0.4s ease';
    }
    
    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function showNextLightboxImage() {
        if (currentImages.length === 0 || !lightboxImage) return;
        
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        const imageData = currentImages[currentImageIndex];
        
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = imageData.src;
            lightboxImage.alt = imageData.alt;
            lightboxImage.style.opacity = '1';
            lightboxImage.style.animation = 'slideIn 0.3s ease';
        }, 150);
    }
    
    function showPrevLightboxImage() {
        if (currentImages.length === 0 || !lightboxImage) return;
        
        currentImageIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
        const imageData = currentImages[currentImageIndex];
        
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = imageData.src;
            lightboxImage.alt = imageData.alt;
            lightboxImage.style.opacity = '1';
            lightboxImage.style.animation = 'slideIn 0.3s ease';
        }, 150);
    }
    
    // Lightbox event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextLightboxImage);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevLightboxImage);
    }
    
    // Close lightbox when clicking outside
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextLightboxImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevLightboxImage();
            }
        } else {
            // Slider navigation with keyboard
            if (e.key === 'ArrowRight') {
                slideNext();
            } else if (e.key === 'ArrowLeft') {
                slidePrev();
            }
        }
    });
    
    // Touch/swipe support for mobile slider
    let startX = 0;
    let isDragging = false;
    
    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        slider.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            // Add some resistance
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    slideNext();
                } else {
                    slidePrev();
                }
                isDragging = false;
            }
        }, { passive: true });
        
        slider.addEventListener('touchend', function() {
            isDragging = false;
        }, { passive: true });
    }
    
    // Lightbox touch/swipe support
    let lightboxStartX = 0;
    let lightboxEndX = 0;
    
    if (lightboxModal) {
        lightboxModal.addEventListener('touchstart', function(e) {
            lightboxStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        lightboxModal.addEventListener('touchend', function(e) {
            lightboxEndX = e.changedTouches[0].screenX;
            const diff = lightboxStartX - lightboxEndX;
            const swipeThreshold = 50;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    showNextLightboxImage();
                } else {
                    showPrevLightboxImage();
                }
            }
        }, { passive: true });
    }
    
    // Card hover effects
    galleryCards.forEach(card => {
        const expandBtn = card.querySelector('.gallery-expand-btn');
        
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'cardFloat 3s ease-in-out infinite';
            
            if (expandBtn) {
                expandBtn.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
            
            if (expandBtn) {
                expandBtn.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Tab button hover effects
    tabBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Auto-resize handler
    function handleResize() {
        currentSliderPosition = 0;
        if (slider) {
            slider.style.transform = 'translateX(0px)';
        }
        updateNavigationButtons();
        updateProgressBar();
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialize gallery
    initGallery();
    
    console.log('Gallery card slider initialized successfully');
});

// Add CSS animations
const gallerySliderStyle = document.createElement('style');
gallerySliderStyle.textContent = `
    .gallery-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .gallery-card-image img {
        transition: transform 0.4s ease;
    }
    
    .gallery-lightbox-modal.active .gallery-lightbox-content {
        animation: lightboxSlideIn 0.4s ease;
    }
    
    @keyframes lightboxSlideIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes cardFloat {
        0%, 100% {
            transform: translateY(-15px) scale(1.05);
        }
        50% {
            transform: translateY(-20px) scale(1.05);
        }
    }
`;

document.head.appendChild(gallerySliderStyle);