/**
 * Form Validation Script
 * Handles client-side form validation for portfolio application
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap form validation
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Add fade-in animation to elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document.querySelectorAll('section, .card, .timeline-panel').forEach(el => {
    observer.observe(el);
  });

  // Navbar active link highlighting
  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav);

  // Navbar collapse on link click
  const navbarCollapse = document.querySelector('.navbar-collapse');
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    });
  });

  // Add scroll animation to navbar
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.2)';
    } else {
      navbar.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
  });
});

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

/**
 * Form submission handler with validation
 */
function submitContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Validate email
  const email = formData.get('email');
  if (!isValidEmail(email)) {
    showAlert('Please enter a valid email address', 'danger');
    return;
  }
  
  // Validate message
  const message = formData.get('message');
  if (message.trim().length < 10) {
    showAlert('Message must be at least 10 characters long', 'danger');
    return;
  }
  
  // Show success message
  showAlert('Message sent successfully! We will get back to you soon.', 'success');
  form.reset();
  
  // Here you would typically send the form data to a backend service
  // Example:
  // fetch('/api/contact', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(Object.fromEntries(formData))
  // })
  // .then(response => response.json())
  // .then(data => console.log('Success:', data))
  // .catch((error) => console.error('Error:', error));
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  const container = document.querySelector('main') || document.body;
  container.insertBefore(alertDiv, container.firstChild);
  
  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

/**
 * API helper for making HTTP requests
 */
const API = {
  baseURL: '/api',
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },
  
  get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  },
  
  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  },
  
  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  },
  
  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API, isValidEmail, showAlert };
}
