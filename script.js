// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(18, 18, 18, 0.98)';
    } else {
        navbar.style.background = 'rgba(18, 18, 18, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.menu-item, .feature, .donut-card').forEach(el => {
    observer.observe(el);
});

// Order button functionality
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Order')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('🍩 Order system coming soon! Call (555) 123-DONUT to place your order.');
        });
    }
});

// Add some interactive hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Special offers countdown and animations
function updateOffers() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    const offerCards = document.querySelectorAll('.offer-card');
    
    offerCards.forEach(card => {
        const badge = card.querySelector('.offer-badge');
        
        // Highlight active offers
        if (badge.textContent === 'MONDAY' && day === 1) {
            card.style.borderColor = '#ff5252';
            card.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.5)';
            if (hour >= 6 && hour < 14) {
                badge.style.animation = 'pulse 2s infinite';
            }
        } else if (badge.textContent === 'FRIDAY' && day === 5) {
            card.style.borderColor = '#ff5252';
            card.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.5)';
            badge.style.animation = 'pulse 2s infinite';
        } else {
            card.style.borderColor = '#ff6b6b';
            card.style.boxShadow = 'none';
            badge.style.animation = 'none';
        }
    });
}

// CSS for pulse animation (added via JS)
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Update offers on load and every minute
updateOffers();
setInterval(updateOffers, 60000);

// Fun donut rain effect (subtle)
function createDonut() {
    const donut = document.createElement('div');
    donut.innerHTML = '🍩';
    donut.style.position = 'fixed';
    donut.style.left = Math.random() * 100 + 'vw';
    donut.style.top = '-50px';
    donut.style.fontSize = '20px';
    donut.style.zIndex = '-1';
    donut.style.opacity = '0.3';
    donut.style.pointerEvents = 'none';
    donut.style.transition = 'all 5s linear';
    
    document.body.appendChild(donut);
    
    setTimeout(() => {
        donut.style.top = '100vh';
        donut.style.transform = 'rotate(360deg)';
    }, 100);
    
    setTimeout(() => {
        donut.remove();
    }, 5000);
}

// Trigger donut rain occasionally
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 3 seconds
        createDonut();
    }
}, 3000);

// Welcome message with dark theme styling
console.log('%c🍩 Welcome to Sweet Rings Donut Co! 🍩', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
console.log('%cThanks for visiting our dark-themed bakery website!', 'color: #e0e0e0; background: #1a1a1a; padding: 4px;');
console.log('%cFresh artisan donuts crafted daily!', 'color: #ff6b6b;');

// Simple analytics tracking
let pageViews = localStorage.getItem('donut-page-views') || 0;
pageViews++;
localStorage.setItem('donut-page-views', pageViews);

if (pageViews === 1) {
    setTimeout(() => {
        if (confirm('🍩 Welcome to Sweet Rings! Would you like to sign up for our newsletter for special offers?')) {
            alert('Thanks! Newsletter signup coming soon. Follow us on social media for updates!');
        }
    }, 5000);
}