/* ===== OWL CONSULTING WEBSITE JAVASCRIPT ===== */
/* A clean, organized JavaScript file for easy maintenance */

// ===== DOM READY EVENT LISTENER =====
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality when the page loads
  initializeJourneyCarousel();
  initializeMobileMenu();
  initializeContactForm();
  initializeMetricsCounters();
  initializeFlipCards();
});

// ===== JOURNEY CAROUSEL FUNCTIONALITY =====
function initializeJourneyCarousel() {
  const grid = document.querySelector('.journey-grid');
  if (!grid) return;

  // Find a journey card to get its width
  const card = grid.querySelector('.journey-step, .journey-card');
  if (!card) return;

  const progressDots = document.querySelectorAll('.progress-dot');

  // Calculate scroll amount based on card width and gap
  function getCardScrollAmount() {
    const style = window.getComputedStyle(grid);
    const gap = parseInt(style.gap) || 0;
    return card.offsetWidth + gap;
  }

  // Update progress dots based on scroll position
  function updateProgressDots() {
    const scrollLeft = grid.scrollLeft;
    const cardWidth = getCardScrollAmount();
    const currentStep = Math.round(scrollLeft / cardWidth);
    
    progressDots.forEach((dot, index) => {
      if (index === currentStep) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Add click event listeners for progress dots
  progressDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      const targetScroll = index * getCardScrollAmount();
      grid.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    });
  });

  // Update dots on scroll
  grid.addEventListener('scroll', updateProgressDots);
  
  // Initial update
  updateProgressDots();
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

    // Validate form before submission
    if (validateForm()) {
      handleFormSubmission();
    }
  });

  // Add focus styles for form inputs
  addFormInputStyles();

  // Clear errors on input
  const formInputs = customForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      clearError(this);
    });
  });
}

// Validate form fields
function validateForm() {
  const customForm = document.getElementById('customContactForm');
  let isValid = true;

  // Clear all previous errors
  customForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  customForm.querySelectorAll('.form-error-message').forEach(el => el.remove());

  // Validate First Name
  const firstName = customForm.querySelector('#firstName');
  if (!firstName.value.trim()) {
    showError(firstName, 'Please enter your first name');
    isValid = false;
  }

  // Validate Last Name
  const lastName = customForm.querySelector('#lastName');
  if (!lastName.value.trim()) {
    showError(lastName, 'Please enter your last name');
    isValid = false;
  }

  // Validate Email
  const email = customForm.querySelector('#email');
  if (!email.value.trim()) {
    showError(email, 'Please enter your email address');
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate Message
  const message = customForm.querySelector('#message');
  if (!message.value.trim()) {
    showError(message, 'Please tell us how we can help you');
    isValid = false;
  }

  return isValid;
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show error message for a field
function showError(field, message) {
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error-message show';
  errorDiv.textContent = message;

  field.parentElement.appendChild(errorDiv);

  // Focus on first error field
  if (!document.querySelector('.error:focus')) {
    field.focus();
  }
}

// Clear error for a field
function clearError(field) {
  field.classList.remove('error');
  field.setAttribute('aria-invalid', 'false');
  const errorMsg = field.parentElement.querySelector('.form-error-message');
  if (errorMsg) {
    errorMsg.remove();
  }
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

// Display form success message with animation
function showFormSuccess(customForm, formSuccess) {
  customForm.style.display = 'none';
  formSuccess.style.display = 'block';

  // Trigger animation after a brief delay to ensure display: block is applied
  setTimeout(() => {
    formSuccess.classList.add('show');
  }, 10);
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

// ===== ANIMATED METRICS COUNTERS =====
function initializeMetricsCounters() {
  const metricsSection = document.querySelector('.metrics-row');
  if (!metricsSection) return;

  const counters = metricsSection.querySelectorAll('.metrics-value');
  if (!counters.length) return;

  let hasAnimated = false;

  // Extract number from text (e.g., "Up to 70%" -> 70, "$150K-$300K" -> skip, "10+ Years" -> 10)
  function extractNumber(text) {
    // For ranges like "$150K-$300K", return null (we'll skip animation)
    if (text.includes('-')) return null;

    // Extract first number found
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  }

  // Animate a single counter
  function animateCounter(element, target, suffix) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, stepDuration);
  }

  // Parse and animate each metric
  function animateMetrics() {
    if (hasAnimated) return;
    hasAnimated = true;

    counters.forEach(counter => {
      const originalText = counter.textContent.trim();
      const number = extractNumber(originalText);

      if (number === null) return; // Skip non-numeric or range values

      // Determine the suffix (everything after the number)
      let suffix = '';
      if (originalText.includes('%')) suffix = '%';
      else if (originalText.toLowerCase().includes('years')) suffix = '+ Years';
      else if (originalText.toLowerCase().includes('areas')) suffix = ' Core Areas';

      // Start animation
      animateCounter(counter, number, suffix);
    });
  }

  // Use Intersection Observer for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateMetrics();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricsSection);
}

// ===== FLIP CARDS FUNCTIONALITY (Mobile Tap Support) =====
function initializeFlipCards() {
  const flipCards = document.querySelectorAll('.flip-card');

  if (!flipCards.length) return;

  flipCards.forEach(card => {
    // Add click handler to the card
    card.addEventListener('click', function(e) {
      // If clicking on a link, let it navigate
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }

      // Stop event from bubbling to document
      e.stopPropagation();

      // Toggle this card
      toggleFlipCard(this, flipCards);
    });

    // Add keyboard handler for Enter and Space keys
    card.addEventListener('keydown', function(e) {
      // If pressing on a link, let it navigate
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }

      // Check for Enter or Space key
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        toggleFlipCard(this, flipCards);
      }
    });
  });

  // Helper function to toggle flip card state
  function toggleFlipCard(card, allCards) {
    const isCurrentlyFlipped = card.classList.contains('flipped');

    // Close all other cards first
    allCards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('flipped');
        otherCard.setAttribute('aria-pressed', 'false');
      }
    });

    // Toggle this card
    if (!isCurrentlyFlipped) {
      card.classList.add('flipped');
      card.setAttribute('aria-pressed', 'true');
    } else {
      card.classList.remove('flipped');
      card.setAttribute('aria-pressed', 'false');
    }
  }

  // Close all flipped cards when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.flip-card')) {
      flipCards.forEach(card => {
        card.classList.remove('flipped');
      });
    }
  });
}
