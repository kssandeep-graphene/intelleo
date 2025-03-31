document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
        
        // Close menu when clicking on overlay
        menuOverlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            this.classList.remove('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations - WITHOUT counter animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const intersectionCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
                
                // No animation for percentages - just add class
                if (entry.target.querySelector('strong')) {
                    // Just mark as visible but don't animate numbers
                    entry.target.classList.add('visible');
                }
            }
        });
    };
    
    const observer = new IntersectionObserver(intersectionCallback, observerOptions);
    
    // Observe elements for scroll animations - EXCLUDING results-list items with percentages
    document.querySelectorAll('.capability-card, .service-card, .case-study, .journey-step').forEach(item => {
        observer.observe(item);
    });
    
    // Force any result item to be visible immediately without animation
    document.querySelectorAll('.results-list li').forEach(item => {
        item.classList.add('visible', 'animated');
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.3;
                const heroContent = heroSection.querySelector('.hero-content');
                const heroOverlay = heroSection.querySelector('.hero-overlay');
                
                if (heroContent) {
                    heroContent.style.transform = `translateY(${translateY}px)`;
                }
                
                if (heroOverlay) {
                    heroOverlay.style.opacity = 0.1 + (scrollPosition / window.innerHeight * 0.3);
                }
            }
        });
    }
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Initialize
    highlightActiveSection();
}); 