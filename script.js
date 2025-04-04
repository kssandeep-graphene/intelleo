// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking a nav link on mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'var(--dark-bg)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(26, 38, 56, 0.9)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip for # links
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Animation on scroll (simplified version)
const revealElements = document.querySelectorAll('.service-card, .journey-card, .case-section');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Check on load and scroll
window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal);

// Update copyright year
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = `© ${currentYear} Intelleo. All rights reserved.`;
    }
});

// Typing Animation for Hero Heading
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById('typing-text');
    
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.width = '0';
        
        // Delay before starting the animation
        setTimeout(() => {
            // Reset to allow CSS animation to work properly
            typingText.style.animation = 'none';
            typingText.offsetHeight; // Trigger reflow
            typingText.style.animation = null;
            typingText.textContent = text;
            
            // Ensure the animation completes properly
            setTimeout(() => {
                typingText.style.width = '100%';
                
                // Remove the blinking cursor after typing is done
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 4000);
            }, 3500);
        }, 500);
    }
}); 