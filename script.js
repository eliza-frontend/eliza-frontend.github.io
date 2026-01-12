// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // ===== Mobile Menu =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
        
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // ===== Update Copyright Year =====
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // ===== Back to Top Button =====
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // ===== Animate Skill Bars on Scroll =====
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
    
    // ===== Typewriter Effect for Hero =====
    const heroTitle = document.querySelector('.hero-title');
    const originalName = "Eliza";
    let currentIndex = 0;
    
    function typeWriter() {
        if (currentIndex < originalName.length) {
            heroTitle.textContent = originalName.substring(0, currentIndex + 1) + ".";
            currentIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    // Start typewriter effect when hero is in view
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(typeWriter, 500);
            heroObserver.unobserve(entries[0].target);
        }
    });
    
    heroObserver.observe(document.querySelector('.hero'));
    
    // ===== Project Card Hover Effect Enhancement =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                tag.style.transitionDelay = `${index * 0.1}s`;
                tag.style.transform = 'translateY(-2px)';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transitionDelay = '0s';
                tag.style.transform = 'translateY(0)';
            });
        });
    });
});