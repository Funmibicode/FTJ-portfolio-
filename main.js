console.log('Hello World!');
        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            document.body.classList.toggle("fixed");
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Scroll to Top Button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth Scrolling for Navigation Links
       /* document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
        });*/

        // Intersection Observer for Fade-in Animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });

        // Parallax Effect for Background Decorations
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.bg-decoration');
            
            parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add hover effect to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.4s ease';
            });
        });
        
        
        
// Animate skill bars when they come into view
const observerOption = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            
            // Animate the skill bar
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 200);
            
            // Unobserve after animation
            skillObserver.unobserve(progressBar);
        }
    });
}, observerOption);

// Observe all skill progress bars
document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// Fade in animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Observe sections for fade-in animation
document.querySelectorAll('.core-skills, .frameworks-section, .hobby-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Add hover effect for framework cards
document.querySelectorAll('.framework-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/*
// Add click animation to tags
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px)';
        }, 100);
    });
});

// Parallax effect for background circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.bg-decoration');
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.3;
        circle.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed}px)`;
    });
});*/

// Add sparkle effect to hobby icon
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
    
    sparkle.style.position = 'absolute';
    sparkle.style.width = '5px';
    sparkle.style.height = '5px';
    sparkle.style.background = '#00ff9d';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.left = (Math.random() * 100) + '%';
    sparkle.style.top = (Math.random() * 100) + '%';
    sparkle.style.boxShadow = '0 0 10px #00ff9d';
    sparkle.style.zIndex = '10';
    
    // Create keyframe animation
    const animation = sparkle.animate([
        { 
            transform: 'scale(0) translateY(0)',
            opacity: 1
        },
        { 
            transform: 'scale(1.5) translateY(-15px)',
            opacity: 1
        },
        { 
            transform: 'scale(0) translateY(-30px)',
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    iconWrapper.appendChild(sparkle);
    
    animation.onfinish = () => sparkle.remove();
}


// Add typing effect to section subtitle (optional)
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
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
}

// Add counter animation for skill percentages
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate percentages when they come into view
const percentageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const finalValue = parseInt(element.textContent);
            animateValue(element, 0, finalValue, 1500);
            percentageObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.skill-percentage').forEach(percentage => {
    percentageObserver.observe(percentage);
});




// Form Elements
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];

    // Validate name
    if (formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    // Validate email
    if (!validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    // Validate subject
    if (formData.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }

    // Validate message
    if (formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
}

// Handle Form Submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate form
    const errors = validateForm(formData);

    if (errors.length > 0) {
        // Show error message
        showMessage('error', errors.join('. '));
        return;
    }

    // Disable submit button
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.style.cursor = 'not-allowed';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Here you would normally send the data to your backend
        // For example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         showMessage('success');
        //         contactForm.reset();
        //     } else {
        //         showMessage('error');
        //     }
        // })

        // For demo purposes, we'll just show success
        showMessage('success');
        contactForm.reset();

        // Re-enable submit button
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }, 2000);
});

// Show Message Function
function showMessage(type, customMessage = null) {
    // Hide both messages first
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');

    // Show appropriate message
    if (type === 'success') {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    } else if (type === 'error') {
        if (customMessage) {
            errorMessage.querySelector('p').textContent = customMessage;
        }
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

// Input animations - add glow effect when typing
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(5px)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateX(0)';
    });

    // Real-time validation feedback
    input.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            this.style.borderColor = 'rgba(0, 255, 157, 0.5)';
        } else {
            this.style.borderColor = 'rgba(0, 255, 157, 0.2)';
        }
    });
});

// Email validation on blur
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = 'rgba(255, 68, 68, 0.5)';
        this.style.boxShadow = '0 0 15px rgba(255, 68, 68, 0.3)';
    } else if (this.value) {
        this.style.borderColor = 'rgba(0, 255, 157, 0.5)';
        this.style.boxShadow = '0 0 20px rgba(0, 255, 157, 0.2)';
    }
});

// Animate contact cards on scroll
const obseverOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, obseverOptions);

// Observe contact cards
document.querySelectorAll('.contact-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    cardObserver.observe(card);
});

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) rotate(5deg)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Parallax effect for background circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.bg-decoration');
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.3;
        circle.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed}px)`;
    });
});

// Copy email/phone to clipboard on click
document.querySelectorAll('.contact-card a').forEach(link => {
    link.addEventListener('click', function(e) {
        const text = this.textContent;
        
        // Copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                // Show copied feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#00ff9d';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        }
    });
});

// Typing indicator for textarea
const messageTextarea = document.getElementById('message');
let typingTimer;
const typingIndicator = document.createElement('div');
typingIndicator.style.cssText = `
    font-size: 12px;
    color: #00ff9d;
    margin-top: 5px;
    opacity: 0;
    transition: opacity 0.3s ease;
`;
typingIndicator.textContent = 'Writing message...';

if (messageTextarea) {
    messageTextarea.parentElement.appendChild(typingIndicator);
    
    messageTextarea.addEventListener('input', function() {
        clearTimeout(typingTimer);
        typingIndicator.style.opacity = '1';
        
        typingTimer = setTimeout(() => {
            typingIndicator.style.opacity = '0';
        }, 1000);
    });
}

// Character counter for textarea
const charCounter = document.createElement('div');
charCounter.style.cssText = `
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    text-align: right;
    margin-top: 5px;
`;

if (messageTextarea) {
    messageTextarea.parentElement.appendChild(charCounter);
    
    messageTextarea.addEventListener('input', function() {
        const count = this.value.length;
        charCounter.textContent = `${count} characters`;
        
        if (count >= 10) {
            charCounter.style.color = '#00ff9d';
        } else {
            charCounter.style.color = 'rgba(255, 255, 255, 0.5)';
        }
    });
}

// Smooth scroll for CTA button
document.querySelector('.cta-button')?.addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.querySelector('.contact-form-wrapper');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus on first input after scroll
        setTimeout(() => {
            document.getElementById('name').focus();
        }, 500);
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    `;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple to submit button
document.querySelector('.submit-btn')?.addEventListener('click', createRipple);

// Auto-resize textarea
if (messageTextarea) {
    messageTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

// Form field completion animation
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim().length > 0) {
            this.classList.add('completed');
            
            // Add checkmark animation
            const checkmark = document.createElement('span');
            checkmark.textContent = '✓';
            checkmark.style.cssText = `
                position: absolute;
                right: 55px;
                top: 50%;
                transform: translateY(-50%);
                color: #00ff9d;
                font-size: 20px;
                animation: checkmarkPop 0.3s ease;
            `;
            
            if (this.tagName === 'TEXTAREA') {
                checkmark.style.top = '60px';
                checkmark.style.transform = 'translateY(0)';
            }
            
            // Remove old checkmark if exists
            const oldCheckmark = this.parentElement.querySelector('span:not(.input-icon)');
            if (oldCheckmark) oldCheckmark.remove();
            
            this.parentElement.appendChild(checkmark);
        }
    });
});

// Add checkmark animation style
const checkmarkStyle = document.createElement('style');
checkmarkStyle.textContent = `
    @keyframes checkmarkPop {
        0% {
            transform: translateY(-50%) scale(0);
        }
        50% {
            transform: translateY(-50%) scale(1.3);
        }
        100% {
            transform: translateY(-50%) scale(1);
        }
    }
`;
document.head.appendChild(checkmarkStyle);

// Console message for developers
console.log('%c📬 Contact Form Ready! ', 'background: linear-gradient(90deg, #00ff9d, #00d4ff); color: #0a0e1a; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cFeel free to reach out - I\'d love to hear from you! 🚀', 'color: #00ff9d; font-size: 14px;');

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        document.querySelector('.contact-form-wrapper')?.classList.add('loaded');
        document.querySelector('.contact-info')?.classList.add('loaded');
    }, 300);
});



// Animate projects on scroll
const observeOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            projectObserver.unobserve(entry.target);
        }
    });
}, observeOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    projectObserver.observe(card);
});

// Add tilt effect on mouse move for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Animate tech tags on hover
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to project buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    `;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Apply ripple to all project buttons
document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Add ripple animation style
const styles = document.createElement('style');
styles.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for background circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.bg-decoration');
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.3;
        circle.style.transform = `translate(${scrolled * speed * 0.15}px, ${scrolled * speed}px)`;
    });
});

// Add click tracking for project links (optional analytics)
document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const projectCard = this.closest('.project-card');
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        const linkType = this.classList.contains('live-demo') ? 'Live Demo' : 'GitHub';
        
        console.log(`Project Link Clicked: ${projectTitle} - ${linkType}`);
        
        // You can send this to your analytics service
        // Example: gtag('event', 'project_click', { project: projectTitle, type: linkType });
    });
});

// Animate project features on card hover
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

// Add counter animation for project numbers
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

// Trigger number animation when in view
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

// Image placeholder icon animation
document.querySelectorAll('.image-placeholder i').forEach(icon => {
    // Random float animation
    setInterval(() => {
        const randomX = (Math.random() - 0.5) * 10;
        const randomY = (Math.random() - 0.5) * 10;
        icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 2000);
});

// Status badge pulse enhancement
document.querySelectorAll('.status-badge.live').forEach(badge => {
    setInterval(() => {
        badge.style.boxShadow = '0 0 20px rgba(0, 255, 157, 0.6)';
        setTimeout(() => {
            badge.style.boxShadow = '';
        }, 500);
    }, 3000);
});

// Smooth scroll for "View All Projects" button
document.querySelector('.view-all-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    // Scroll to top or specific section
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add loading skeleton effect (optional)
function addSkeletonLoading() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.animation = 'skeleton-loading 1.5s ease-in-out infinite';
    });
}

// Keyboard navigation for project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const liveDemo = card.querySelector('.live-demo');
            if (liveDemo) {
                liveDemo.click();
            }
        }
    });
});

// Add focus styles for accessibility
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

// Featured project special animation
const featuredCard = document.querySelector('.project-card.featured');
if (featuredCard) {
    setInterval(() => {
        featuredCard.style.boxShadow = '0 15px 50px rgba(0, 255, 157, 0.4)';
        setTimeout(() => {
            featuredCard.style.boxShadow = '0 10px 40px rgba(0, 255, 157, 0.2)';
        }, 1000);
    }, 4000);
}

// Tech stack icon rotation on hover
document.querySelectorAll('.tech-tag i').forEach(icon => {
    icon.parentElement.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    icon.parentElement.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotate(0deg)';
    });
});

// Project links animation on hover
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

// Add sparkle effect to featured badge
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

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
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
document.head.appendChild(sparkleStyle);

// Console message for developers
console.log('%c🚀 Projects Section Loaded! ', 'background: linear-gradient(90deg, #00ff9d, #00d4ff); color: #0a0e1a; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cCheck out my work and let\'s build something amazing together! 💻', 'color: #00ff9d; font-size: 14px;');

// Initialize all animations on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Projects section initialized successfully! ✨');
});






// Console message for developers
console.log('%c👋 Hey there, Developer! ', 'background: linear-gradient(90deg, #00ff9d, #00d4ff); color: #0a0e1a; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cLooking to collaborate? Let\'s build something amazing together! 🚀', 'color: #00ff9d; font-size: 14px;');
