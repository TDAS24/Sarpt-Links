// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
});

// Portfolio filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats-grid')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        }
    });
}, observerOptions);

// Add scroll animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // About section elements
    document.querySelector('.about-text')?.classList.add('fade-in-left');
    document.querySelector('.about-visual')?.classList.add('fade-in-right');
    document.querySelector('.stats-grid')?.classList.add('fade-in-up');
    
    observer.observe(document.querySelector('.about-text'));
    observer.observe(document.querySelector('.about-visual'));
    observer.observe(document.querySelector('.stats-grid'));
    
    // Contact section elements
    document.querySelector('.contact-info')?.classList.add('fade-in-left');
    document.querySelector('.contact-form')?.classList.add('fade-in-right');
    
    observer.observe(document.querySelector('.contact-info'));
    observer.observe(document.querySelector('.contact-form'));
});

// Enhanced 3D effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Form handling with enhanced feedback
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission with 3D feedback
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.style.transform = 'translateY(2px) rotateX(-5deg)';
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.transform = '';
    }, 2000);
});

// Enhanced parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-cube, .floating-sphere');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.05}deg)`;
    });
});

// Add 3D cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-3d');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.classList.add('cursor-3d');
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #10b981, #059669);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0.8;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.cursor-3d');
    cursorElement.style.left = e.clientX + 'px';
    cursorElement.style.top = e.clientY + 'px';
});

// Enhanced interactive button effects with 3D transforms
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotateX(10deg) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-2px) rotateX(5deg) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-5px) rotateX(10deg) scale(1.05)';
    });
});

// Add scroll progress indicator with 3D effect
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(135deg, #10b981, #34d399);
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add 3D tilt effect to portfolio items
document.querySelectorAll('.portfolio-3d').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Add typing effect to hero title with 3D enhancement
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            element.style.transform = `translateZ(${Math.sin(i * 0.1) * 5}px)`;
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize enhanced typing effect after page load
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                const text = line.textContent;
                typeWriter(line, text, 80);
            }, index * 800);
        });
    }
}, 2000);

// Add 3D hover effects to stats
document.querySelectorAll('.stat-3d').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateX(15deg) rotateY(15deg) translateZ(20px) scale(1.05)';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    });
});

// Enhanced contact item 3D effects
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(10deg) rotateY(5deg) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});
