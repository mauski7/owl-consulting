/* ===== OWL CONSULTING WEBSITE JAVASCRIPT ===== */
/* A clean, organized JavaScript file for easy maintenance */

// ===== DOM READY EVENT LISTENER =====
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality when the page loads
  initializeJourneyCarousel();
  initializeMobileMenu();
  initializeContactForm();
});

// ===== JOURNEY CAROUSEL FUNCTIONALITY =====
function initializeJourneyCarousel() {
  const grid = document.querySelector('.journey-grid');
  if (!grid) return;

  // Find a journey card to get its width
  const card = grid.querySelector('.journey-step, .journey-card');
  if (!card) return;

  const leftArrow = document.querySelector('.journey-arrow.left');
  const rightArrow = document.querySelector('.journey-arrow.right');

  // Calculate scroll amount based on card width and gap
  function getCardScrollAmount() {
    const style = window.getComputedStyle(grid);
    const gap = parseInt(style.gap) || 0;
    return card.offsetWidth + gap;
  }

  // Add click event listeners for navigation arrows
  if (leftArrow) {
    leftArrow.addEventListener('click', function() {
      grid.scrollBy({ 
        left: -getCardScrollAmount(), 
        behavior: 'smooth' 
      });
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', function() {
      grid.scrollBy({ 
        left: getCardScrollAmount(), 
        behavior: 'smooth' 
      });
    });
  }
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileMenuToggle || !navLinks) return;

  // Toggle mobile menu visibility
  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    
    // Update accessibility attributes
    const isExpanded = navLinks.classList.contains('open');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Change hamburger icon to close icon
    mobileMenuToggle.textContent = isExpanded ? '✕' : '☰';
  });

  // Close mobile menu when clicking on navigation links
  const navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on window resize (if screen becomes larger)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }
  });

  // Helper function to close mobile menu
  function closeMobileMenu() {
    navLinks.classList.remove('open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.textContent = '☰';
  }
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
  const customForm = document.getElementById('customContactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (!customForm) return;

  // Handle form submission
  customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmission();
  });
  
  // Add focus styles for form inputs
  addFormInputStyles();
}

// Handle the actual form submission process
function handleFormSubmission() {
  const customForm = document.getElementById('customContactForm');
  const formSuccess = document.getElementById('formSuccess');
  
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
  submitToGoogleForm(googleFormData, submitButton, originalText, customForm, formSuccess);
}

// Submit form data to Google Forms
function submitToGoogleForm(formData, submitButton, originalText, customForm, formSuccess) {
  fetch('https://docs.google.com/forms/d/e/1FAIpQLSelXwC5qeAUJKbPqRX4dn7CbAO5NfkF28HTLTXteTdgpsCMzg/formResponse', {
    method: 'POST',
    mode: 'no-cors', // Required for Google Forms
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData)
  })
  .then(() => {
    // Show success message
    showFormSuccess(customForm, formSuccess);
    
    // Reset form
    customForm.reset();
  })
  .catch((error) => {
    console.error('Error submitting form:', error);
    
    // Show success message anyway (Google Forms don't return responses)
    showFormSuccess(customForm, formSuccess);
    
    // Reset form
    customForm.reset();
  })
  .finally(() => {
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  });
}

// Display form success message
function showFormSuccess(customForm, formSuccess) {
  formSuccess.style.display = 'block';
  customForm.style.display = 'none';
}

// Add focus and blur styles to form inputs
function addFormInputStyles() {
  const customForm = document.getElementById('customContactForm');
  const formInputs = customForm.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.borderColor = 'var(--clr-blue)';
    });
    
    input.addEventListener('blur', function() {
      this.style.borderColor = 'var(--clr-gray)';
    });
  });
}
