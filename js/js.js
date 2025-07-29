// Journey carousel arrow scroll functionality
// Scrolls one card at a time when arrow is clicked

document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.journey-grid');
  if (!grid) return;

  // Find a journey card to get its width
  const card = grid.querySelector('.journey-step, .journey-card');
  if (!card) return;

  const leftArrow = document.querySelector('.journey-arrow.left');
  const rightArrow = document.querySelector('.journey-arrow.right');

  function getCardScrollAmount() {
    // Use card's offsetWidth plus gap
    const style = window.getComputedStyle(grid);
    const gap = parseInt(style.gap) || 0;
    return card.offsetWidth + gap;
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', function() {
      grid.scrollBy({ left: -getCardScrollAmount(), behavior: 'smooth' });
    });
  }
  if (rightArrow) {
    rightArrow.addEventListener('click', function() {
      grid.scrollBy({ left: getCardScrollAmount(), behavior: 'smooth' });
    });
  }
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileMenuToggle || !navLinks) return;

  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    
    // Update aria-expanded for accessibility
    const isExpanded = navLinks.classList.contains('open');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Change hamburger icon
    mobileMenuToggle.textContent = isExpanded ? '✕' : '☰';
  });

  // Close mobile menu when clicking on a link
  const navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.textContent = '☰';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
      navLinks.classList.remove('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.textContent = '☰';
    }
  });

  // Close mobile menu on window resize (if screen becomes larger)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      navLinks.classList.remove('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.textContent = '☰';
    }
  });
});

// Custom contact form submission
document.addEventListener('DOMContentLoaded', function() {
  const customForm = document.getElementById('customContactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (!customForm) return;

  customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(customForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = customForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Prepare data for Google Form submission
    const googleFormData = {
      'entry.770071106': data.firstName,
      'entry.1332182972': data.lastName,
      'entry.689026779': data.email,
      'entry.814775098': data.companyName,
      'entry.1154035067': data.companyWebsite,
      'entry.695444491': data.message
    };
    
    // Submit to Google Form via fetch
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSelXwC5qeAUJKbPqRX4dn7CbAO5NfkF28HTLTXteTdgpsCMzg/formResponse', {
      method: 'POST',
      mode: 'no-cors', // Required for Google Forms
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(googleFormData)
    })
    .then(() => {
      // Show success message
      formSuccess.style.display = 'block';
      customForm.style.display = 'none';
      
      // Reset form
      customForm.reset();
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      
      // Show success message anyway (Google Forms don't return responses)
      formSuccess.style.display = 'block';
      customForm.style.display = 'none';
      
      // Reset form
      customForm.reset();
    })
    .finally(() => {
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
  });
  
  // Add focus styles for form inputs
  const formInputs = customForm.querySelectorAll('input, select');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.borderColor = 'var(--clr-blue)';
    });
    
    input.addEventListener('blur', function() {
      this.style.borderColor = 'var(--clr-gray)';
    });
  });
});
