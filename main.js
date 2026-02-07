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

// Console message for developers
console.log('%c👋 Hey there, Developer! ', 'background: linear-gradient(90deg, #00ff9d, #00d4ff); color: #0a0e1a; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cLooking to collaborate? Let\'s build something amazing together! 🚀', 'color: #00ff9d; font-size: 14px;');
