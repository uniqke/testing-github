// ====== MOBILE MENU FUNCTIONALITY ====== 
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.style.display = 'none';
        });
    });
});

// ====== SMOOTH SCROLL BEHAVIOR ====== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ====== SCROLL ANIMATIONS ====== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, feature items, and testimonial cards
document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ====== BUTTON CLICK HANDLERS ====== 
document.querySelectorAll('.btn-primary, .btn-large').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.position = 'absolute';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====== NAVBAR SCROLL EFFECT ====== 
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScrollTop = scrollTop;
});

// ====== COUNTER ANIMATION FOR STATS ====== 
function animateCounters() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('★');
        const isCurrency = target.includes('B+');
        
        let finalValue = parseFloat(target);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const counter = setInterval(() => {
            if (currentValue < finalValue) {
                currentValue += increment;
                
                if (isPercentage) {
                    stat.textContent = currentValue.toFixed(1) + '★';
                } else if (isCurrency) {
                    stat.textContent = '$' + currentValue.toFixed(1) + 'B+';
                } else if (target.includes('K+')) {
                    stat.textContent = (currentValue / 1000).toFixed(0) + 'K+';
                } else if (target.includes('Min')) {
                    stat.textContent = Math.round(currentValue) + ' Min';
                }
            } else {
                stat.textContent = target;
                clearInterval(counter);
            }
        }, 30);
    });
}

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ====== RESPONSIVE MENU TOGGLE ====== 
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = 'flex';
    } else {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = 'none';
    }
});

// ====== PAGE LOAD ANIMATION ====== 
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0.9';
