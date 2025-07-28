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

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const companyName = document.getElementById('companyName').value;
    const companyWebsite = document.getElementById('companyWebsite').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create email subject and body
    const subject = encodeURIComponent('New Contact Form Submission - Owl Consulting');
    const body = encodeURIComponent(
      `New contact form submission from your website:\n\n` +
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Company: ${companyName || 'Not provided'}\n` +
      `Website: ${companyWebsite || 'Not provided'}\n\n` +
      `Message:\n${message}\n\n` +
      `---\nThis message was sent from your website contact form.`
    );
    
    // Create mailto link
    const mailtoLink = `mailto:mau@owl-consulting.co?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = '✅ Thank you! Your email client should open with a pre-filled message. If it doesn\'t, please email us directly at <a href="mailto:mau@owl-consulting.co">mau@owl-consulting.co</a>';
    successMessage.style.marginTop = '1rem';
    successMessage.style.padding = '1rem';
    successMessage.style.backgroundColor = 'rgba(0,128,0,0.1)';
    successMessage.style.borderRadius = '8px';
    successMessage.style.color = '#006400';
    successMessage.style.textAlign = 'center';
    
    // Insert success message after the form
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
    
    // Clear the form
    contactForm.reset();
    
    // Remove success message after 10 seconds
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.parentNode.removeChild(successMessage);
      }
    }, 10000);
  });
});
