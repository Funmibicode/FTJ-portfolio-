// ========================================
// MOBILE NAVIGATION
// ========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('fixed');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('fixed');
    });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.pageYOffset > 300);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// INTERSECTION OBSERVERS
// ========================================

// Consolidated fade-in animation observer
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Apply fade-in to all elements with fade-in class
document.querySelectorAll('.fade-in, .core-skills, .frameworks-section, .hobby-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(el);
});

// Skill progress bar animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 200);
            
            skillObserver.unobserve(progressBar);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// ========================================
// PARALLAX EFFECTS (OPTIMIZED)
// ========================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.bg-decoration');
            
            parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// ========================================
// CARD HOVER EFFECTS
// ========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s ease';
    });
});

document.querySelectorAll('.framework-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// HOBBY SECTION SPARKLE EFFECT
// ========================================
const hobbyIcon = document.querySelector('.hobby-icon');
let sparkleInterval;

if (hobbyIcon) {
    hobbyIcon.addEventListener('mouseenter', () => {
        sparkleInterval = setInterval(createSparkle, 200);
    });

    hobbyIcon.addEventListener('mouseleave', () => {
        clearInterval(sparkleInterval);
    });
}

function createSparkle() {
    const sparkle = document.createElement('div');
    const iconWrapper = document.querySelector('.hobby-icon-wrapper');
    
    if (!iconWrapper) return;
    
    sparkle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: #00ff9d;
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 10px #00ff9d;
        z-index: 10;
    `;
    
    const animation = sparkle.animate([
        { transform: 'scale(0) translateY(0)', opacity: 1 },
        { transform: 'scale(1.5) translateY(-15px)', opacity: 1 },
        { transform: 'scale(0) translateY(-30px)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    iconWrapper.appendChild(sparkle);
    animation.onfinish = () => sparkle.remove();
}

// ========================================
// TYPING EFFECT (OPTIONAL)
// ========================================
const subtitle = document.querySelector('.section-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// ========================================
// PROJECT SECTION ANIMATIONS
// ========================================

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    const features = card.querySelectorAll('.feature');
    
    card.addEventListener('mouseenter', () => {
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateX(5px)';
                feature.style.transition = 'transform 0.3s ease';
            }, index * 100);
        });
    });
    
    card.addEventListener('mouseleave', () => {
        features.forEach(feature => {
            feature.style.transform = 'translateX(0)';
        });
    });
});

// Project number animation
function animateProjectNumbers() {
    document.querySelectorAll('.project-number').forEach(number => {
        const finalValue = parseInt(number.textContent);
        let currentValue = 0;
        const duration = 1000;
        const increment = finalValue / (duration / 16);
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                number.textContent = String(finalValue).padStart(2, '0');
                clearInterval(counter);
            } else {
                number.textContent = String(Math.floor(currentValue)).padStart(2, '0');
            }
        }, 16);
    });
}

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProjectNumbers();
            numberObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const firstCard = document.querySelector('.project-card');
if (firstCard) {
    numberObserver.observe(firstCard);
}

// Status badge pulse effect
document.querySelectorAll('.status-badge.live').forEach(badge => {
    setInterval(() => {
        badge.style.boxShadow = '0 0 20px rgba(0, 255, 157, 0.6)';
        setTimeout(() => {
            badge.style.boxShadow = '';
        }, 500);
    }, 3000);
});

// Keyboard navigation for accessibility
document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const liveDemo = card.querySelector('.live-demo');
            if (liveDemo) liveDemo.click();
        }
    });
});

// Focus styles for accessibility
document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('focus', function() {
        this.style.outline = '3px solid rgba(0, 255, 157, 0.5)';
        this.style.outlineOffset = '3px';
    });
    
    btn.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// Featured project animation
const featuredCard = document.querySelector('.project-card.featured');
if (featuredCard) {
    setInterval(() => {
        featuredCard.style.boxShadow = '0 15px 50px rgba(0, 255, 157, 0.4)';
        setTimeout(() => {
            featuredCard.style.boxShadow = '0 10px 40px rgba(0, 255, 157, 0.2)';
        }, 1000);
    }, 4000);
}

// Tech stack icon rotation
document.querySelectorAll('.tech-tag i').forEach(icon => {
    icon.parentElement.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    icon.parentElement.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotate(0deg)';
    });
});

// Project links animation
document.querySelectorAll('.project-links').forEach(links => {
    const buttons = links.querySelectorAll('.project-btn');
    
    links.addEventListener('mouseenter', () => {
        buttons.forEach((btn, index) => {
            setTimeout(() => {
                btn.style.transform = 'translateY(-3px)';
            }, index * 100);
        });
    });
    
    links.addEventListener('mouseleave', () => {
        buttons.forEach(btn => {
            btn.style.transform = '';
        });
    });
});

// Featured badge sparkle effect
const featuredBadge = document.querySelector('.featured-badge');
if (featuredBadge) {
    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
        `;
        featuredBadge.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }, 2000);
}

// ========================================
// CSS ANIMATIONS (INJECTED)
// ========================================
const styles = document.createElement('style');
styles.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styles);

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully! ✨');
});
