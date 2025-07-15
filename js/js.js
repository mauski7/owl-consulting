// NAVBAR SCROLL EFFECT: Changes navbar appearance when scrolling
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {              // If scrolled more than 50px
        navbar.classList.add('scrolled');   // Add 'scrolled' class (tighter padding, more opaque)
    } else {
        navbar.classList.remove('scrolled'); // Remove class when at top
    }
});

// SMOOTH SCROLLING: Makes internal links scroll smoothly instead of jumping
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();                  // Prevent default jump behavior
        const target = document.querySelector(this.getAttribute('href')); // Find target section
        if (target) {
            target.scrollIntoView({         // Scroll to target smoothly
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// INTERSECTION OBSERVER: Triggers animations when elements come into view
const observerOptions = {
    threshold: 0.1,                      // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px'     // Trigger 100px before element fully enters view
};

// OBSERVER FUNCTION: Adds 'visible' class when elements enter viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {     // If element is entering viewport
            entry.target.classList.add('visible'); // Add 'visible' class (triggers CSS animation)
            
            // STAGGERED ANIMATION: Service cards animate one after another
            if (entry.target.classList.contains('service-card')) {
                const cards = document.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {   // Delay each card's animation
                        card.classList.add('visible');
                    }, index * 100);    // 100ms delay between each card
                });
            }
        }
    });
}, observerOptions);

// OBSERVE ANIMATED ELEMENTS: Watch all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);               // Start watching each element
});

// FORM HANDLING: Processes contact form submission
document.querySelector('.form-submit').addEventListener('click', (e) => {
    e.preventDefault();                  // Prevent default form submission
    
    // GET FORM VALUES: Extract user input
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // BASIC VALIDATION: Check if all fields are filled
    if (name && email && message) {
        // SUCCESS: Show thank you message (in real site, would send to server)
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // RESET FORM: Clear all fields after submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    } else {
        // ERROR: Show validation message
        alert('Please fill in all fields.');
    }
});

// MOBILE MENU TOGGLE: Shows/hides navigation on mobile devices
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    // TOGGLE MENU: Show or hide navigation links
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    // MOBILE MENU STYLING: Position and style for mobile
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';         // Below navbar
    navLinks.style.left = '0';
    navLinks.style.right = '0';          // Full width
    navLinks.style.background = 'var(--white)'; // White background
    navLinks.style.flexDirection = 'column'; // Vertical layout
    navLinks.style.padding = '20px';
    navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 51, 0.1)'; // Drop shadow
});

// PARALLAX EFFECT: Hero elements move slightly with mouse movement (optional enhancement)
window.addEventListener('mousemove', (e) => {
    const heroShape = document.querySelector('.hero-shape');
    if (heroShape) {                     // Only if hero shape exists
        // CALCULATE MOVEMENT: Based on mouse position relative to screen center
        const x = (e.clientX - window.innerWidth / 2) / 50;  // Horizontal movement
        const y = (e.clientY - window.innerHeight / 2) / 50; // Vertical movement
        heroShape.style.transform = `translate(${x}px, ${y}px)`; // Apply movement
    }
});

// ADDITIONAL FUNCTIONALITY: You can add more features here

// LOADING ANIMATION: Show loading state when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add any loading completion logic here
    console.log('Owl Finance website loaded successfully! 🦉');
});

// SCROLL TO TOP: Add a scroll to top button functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// DYNAMIC YEAR: Update copyright year automatically
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('footer p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
});

// EMAIL VALIDATION: Enhanced email validation for contact form
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ENHANCED FORM VALIDATION: More robust form validation
function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Check if fields are empty
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return false;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Check minimum message length
    if (message.length < 10) {
        alert('Please enter a more detailed message (at least 10 characters).');
        return false;
    }
    
    return true;
}

// PERFORMANCE OPTIMIZATION: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll event
const debouncedScrollHandler = debounce(() => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

// Replace the original scroll event with debounced version
window.removeEventListener('scroll', () => {}); // Remove original if needed
window.addEventListener('scroll', debouncedScrollHandler);

// KEYBOARD ACCESSIBILITY: Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    }
});

// ANALYTICS READY: Placeholder for analytics tracking
function trackEvent(eventName, eventData = {}) {
    // This is where you'd integrate with Google Analytics, Mixpanel, etc.
    console.log(`Event tracked: ${eventName}`, eventData);
    
    // Example for Google Analytics (when implemented):
    // gtag('event', eventName, eventData);
}

// Track button clicks for analytics
document.querySelectorAll('.cta-button, .service-link').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            button_location: e.target.closest('section')?.id || 'unknown'
        });
    });
});

// PERFORMANCE MONITORING: Track page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // Track this for performance monitoring
    trackEvent('page_load', {
        load_time: Math.round(loadTime),
        page_url: window.location.href
    });
});

// CONTACT FORM ENHANCEMENT: Add real-time validation feedback
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    
    // Real-time email validation
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !isValidEmail(email)) {
                emailInput.style.borderColor = '#e74c3c';
                emailInput.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            } else {
                emailInput.style.borderColor = '';
                emailInput.style.backgroundColor = '';
            }
        });
    }
    
    // Character counter for message field
    if (messageInput) {
        const charCounter = document.createElement('div');
        charCounter.style.fontSize = '0.8rem';
        charCounter.style.color = 'rgba(255, 255, 255, 0.6)';
        charCounter.style.textAlign = 'right';
        charCounter.style.marginTop = '5px';
        messageInput.parentNode.appendChild(charCounter);
        
        messageInput.addEventListener('input', () => {
            const remaining = 500 - messageInput.value.length;
            charCounter.textContent = `${messageInput.value.length}/500 characters`;
            charCounter.style.color = remaining < 50 ? '#e74c3c' : 'rgba(255, 255, 255, 0.6)';
        });
    }
});

// LAZY LOADING: Optimize image loading (for when you add images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// THEME DETECTION: Detect user's preferred color scheme
function detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('User prefers dark mode');
        // You could add dark mode functionality here
    }
}

// BROWSER SUPPORT DETECTION: Check for modern browser features
function checkBrowserSupport() {
    const features = {
        grid: CSS.supports('display', 'grid'),
        flexbox: CSS.supports('display', 'flex'),
        customProperties: CSS.supports('--custom-property', 'value'),
        intersectionObserver: 'IntersectionObserver' in window
    };
    
    console.log('Browser support:', features);
    
    // Fallback for older browsers
    if (!features.intersectionObserver) {
        // Add all animation classes immediately for older browsers
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            el.classList.add('visible');
        });
    }
}

// Run browser support check
document.addEventListener('DOMContentLoaded', checkBrowserSupport);

// SERVICE WORKER: Register for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}