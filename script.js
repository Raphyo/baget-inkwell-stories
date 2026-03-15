// Smooth scroll helper function
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add active state to nav links based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards, use cases, testimonials
    document.querySelectorAll(
        '.feature-card, .use-case, .testimonial, .pricing-card'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Handle mobile nav menu toggle
    const navLinks = document.querySelector('.nav-links');
    const logoLink = document.querySelector('.logo');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle CTA button clicks
    const ctaButtons = document.querySelectorAll('[onclick*="scrollToSection"]');
    ctaButtons.forEach(btn => {
        btn.style.cursor = 'pointer';
    });

    // Add click tracking for pricing cards
    const pricingLinks = document.querySelectorAll('.pricing-card a');
    pricingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track which tier was clicked
            const tier = this.closest('.pricing-card').querySelector('h3').textContent;
            console.log('User clicked:', tier);
        });
    });

    // Sticky navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // FAQ toggle functionality
    document.querySelectorAll('.faq-item h4').forEach(item => {
        item.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isVisible = answer.style.maxHeight;
            
            // Close all other answers
            document.querySelectorAll('.faq-item p').forEach(p => {
                p.style.maxHeight = null;
                p.style.opacity = '1';
            });
            
            // Toggle current answer
            if (isVisible) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Analytics tracking (basic)
    window.addEventListener('load', () => {
        console.log('Inkwell Stories landing page loaded');
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Skip to main content with '/' key
    if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('.hero-content').focus();
    }
});

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}