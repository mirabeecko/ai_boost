// ========================================
// AI Boost - Interactive JavaScript
// ========================================

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip empty hash
      if (href === '#') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.remove('active');
      }
    });
  });
});

// ========================================
// Mobile Navigation Toggle
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
}

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinksForActive = document.querySelectorAll('.nav-link[href^="#"]');

const observerOptions = {
  root: null,
  rootMargin: '-100px 0px -66%',
  threshold: 0
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id');

      navLinksForActive.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// ========================================
// FAQ Accordion
// ========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    const answer = this.nextElementSibling;

    // Close all other FAQs
    faqQuestions.forEach(q => {
      if (q !== this) {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.style.maxHeight = null;
      }
    });

    // Toggle current FAQ
    if (isExpanded) {
      this.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = null;
    } else {
      this.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ========================================
// Pricing Plan Selection
// ========================================
const pricingButtons = document.querySelectorAll('[data-plan]');
const planSelect = document.getElementById('plan');
const contactSection = document.getElementById('kontakt');

pricingButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const planName = this.getAttribute('data-plan');

    if (planSelect) {
      planSelect.value = planName;
    }

    // Scroll to contact form
    if (contactSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = contactSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Focus first input after scroll
      setTimeout(() => {
        document.getElementById('name').focus();
      }, 600);
    }
  });
});

// ========================================
// GDPR Modal
// ========================================
const gdprModal = document.getElementById('gdprModal');
const openGdprButtons = [
  document.getElementById('openGdpr'),
  document.getElementById('footerGdpr')
];
const closeGdprButton = document.getElementById('closeGdpr');
const gdprOverlay = document.getElementById('gdprOverlay');

function openGdprModal() {
  gdprModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  closeGdprButton.focus();
}

function closeGdprModal() {
  gdprModal.classList.remove('active');
  document.body.style.overflow = '';
}

openGdprButtons.forEach(button => {
  if (button) {
    button.addEventListener('click', openGdprModal);
  }
});

if (closeGdprButton) {
  closeGdprButton.addEventListener('click', closeGdprModal);
}

if (gdprOverlay) {
  gdprOverlay.addEventListener('click', closeGdprModal);
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && gdprModal.classList.contains('active')) {
    closeGdprModal();
  }
});

// ========================================
// Cookie Banner
// ========================================
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesButton = document.getElementById('acceptCookies');

// Check if user has already accepted cookies
if (!localStorage.getItem('cookiesAccepted')) {
  cookieBanner.classList.add('visible');
}

if (acceptCookiesButton) {
  acceptCookiesButton.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('visible');
  });
}

// ========================================
// Form Validation & Submission
// ========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate single field
function validateField(field) {
  const fieldGroup = field.closest('.form-group');
  const errorElement = fieldGroup.querySelector('.form-error');
  let error = '';

  // Remove previous error state
  fieldGroup.classList.remove('has-error');

  // Check if field is required and empty
  if (field.hasAttribute('required') && !field.value.trim()) {
    error = 'Toto pole je povinné.';
  }

  // Validate email format
  if (field.type === 'email' && field.value.trim() && !emailRegex.test(field.value.trim())) {
    error = 'Zadejte platnou e-mailovou adresu.';
  }

  // Validate checkbox
  if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
    error = 'Souhlas je vyžadován.';
  }

  // Display error
  if (error) {
    errorElement.textContent = error;
    fieldGroup.classList.add('has-error');
    return false;
  } else {
    errorElement.textContent = '';
    return true;
  }
}

// Add real-time validation
if (contactForm) {
  const formFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');

  formFields.forEach(field => {
    // Validate on blur
    field.addEventListener('blur', function() {
      if (this.value.trim() || this.type === 'checkbox') {
        validateField(this);
      }
    });

    // Clear error on input
    field.addEventListener('input', function() {
      const fieldGroup = this.closest('.form-group');
      if (fieldGroup.classList.contains('has-error')) {
        validateField(this);
      }
    });
  });
}

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Hide previous message
    formMessage.classList.remove('visible', 'success', 'error');
    formMessage.textContent = '';

    // Validate all fields
    const requiredFields = this.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      formMessage.textContent = 'Prosím, opravte chyby ve formuláři.';
      formMessage.classList.add('visible', 'error');
      return;
    }

    // Check honeypot
    const honeypot = this.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      // Bot detected, silently fail
      formMessage.textContent = 'Děkujeme za váš zájem. Brzy se vám ozveme.';
      formMessage.classList.add('visible', 'success');
      this.reset();
      return;
    }

    // Collect form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      if (key !== 'website') { // Exclude honeypot
        data[key] = value;
      }
    });

    // Disable submit button
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Odesílám...';

    try {
      // Send data to PHP backend
      const response = await fetch('send.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.ok) {
        formMessage.textContent = result.message || 'Děkujeme za váš zájem. Brzy se vám ozveme.';
        formMessage.classList.add('visible', 'success');
        this.reset();

        // Optional: Send event to Google Analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            'event_category': 'Contact',
            'event_label': 'AI Boost Contact Form'
          });
        }
      } else {
        formMessage.textContent = result.message || 'Omlouváme se, něco se pokazilo. Zkuste to prosím později nebo nás kontaktujte přímo e-mailem.';
        formMessage.classList.add('visible', 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      formMessage.textContent = 'Omlouváme se, něco se pokazilo. Zkuste to prosím později nebo nás kontaktujte přímo e-mailem.';
      formMessage.classList.add('visible', 'error');
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// ========================================
// Lazy Loading Images (if not natively supported)
// ========================================
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading is supported
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support native lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
  script.onload = function() {
    const observer = lozad();
    observer.observe();
  };
  document.head.appendChild(script);
}

// ========================================
// Performance: Preload critical resources
// ========================================
// This is handled in HTML head, but can be extended here if needed

// ========================================
// Accessibility: Skip to main content
// ========================================
// Add skip link dynamically
const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.textContent = 'Přeskočit na hlavní obsah';
skipLink.className = 'sr-only';
skipLink.style.position = 'absolute';
skipLink.style.top = '10px';
skipLink.style.left = '10px';
skipLink.style.zIndex = '9999';
skipLink.addEventListener('focus', function() {
  this.style.position = 'absolute';
  this.style.width = 'auto';
  this.style.height = 'auto';
  this.style.clip = 'auto';
  this.style.background = 'white';
  this.style.padding = '10px';
  this.style.border = '2px solid';
});
skipLink.addEventListener('blur', function() {
  this.className = 'sr-only';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ========================================
// Console message for developers
// ========================================
console.log('%cAI Boost', 'font-size: 24px; font-weight: bold; color: #2563EB;');
console.log('%cWebová prezentace vytvořena pro lokální AI služby', 'font-size: 12px; color: #6B7280;');
