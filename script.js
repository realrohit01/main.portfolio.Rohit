/*==============================================
  ROHIT KUMAR GUPTA - PORTFOLIO JAVASCRIPT
  Modern Interactive Features
==============================================*/

(function() {
  'use strict';

  // ============ PRELOADER ============
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1000);
  });

  // ============ CUSTOM CURSOR ============
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');
  
  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    window.addEventListener('mousemove', function(e) {
      const posX = e.clientX;
      const posY = e.clientY;
      
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .filter-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '32px';
        cursorDot.style.height = '32px';
        cursorOutline.style.width = '64px';
        cursorOutline.style.height = '64px';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '32px';
        cursorOutline.style.height = '32px';
      });
    });
  }

  // ============ SCROLL PROGRESS BAR ============
  const scrollProgress = document.getElementById('scrollProgress');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
      scrollProgress.style.width = progress + '%';
    }
  });

  // ============ NAVBAR SCROLL EFFECT ============
  const navbar = document.getElementById('navbar-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ============ ACTIVE NAV LINK ON SCROLL ============
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', activateNavLink);

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  // ============ CIRCULAR PROGRESS ANIMATION ============
  function animateProgress() {
    const progressData = {
      'html-progress': 70,    // C Language
      'javascript-progress': 20, // C++
      'php-progress': 70,     // HTML
      'reactjs-progress': 50  // CSS
    };

    const progressCircles = document.querySelectorAll('.circular-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressValue = entry.target.querySelector('.progress-value');
          const className = progressValue.className.split(' ').find(c => c.endsWith('-progress'));
          const finalValue = progressData[className] || 0;
          let currentValue = 0;
          
          const interval = setInterval(() => {
            currentValue++;
            progressValue.textContent = currentValue + '%';
            
            if (currentValue === finalValue) {
              clearInterval(interval);
            }
          }, 20);
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    progressCircles.forEach(circle => {
      observer.observe(circle);
    });
  }

  // Initialize progress animation
  animateProgress();

  // ============ FILTER FUNCTIONALITY ============
  const filterButtons = document.querySelectorAll('.filter-item');
  const portfolioItems = document.querySelectorAll('.post');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter items
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.classList.remove('hide');
          setTimeout(() => {
            item.style.display = 'block';
          }, 10);
        } else {
          item.classList.add('hide');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ============ CONTACT FORM HANDLER ============
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (name && email && phone && message) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.send("service_xxxxxxx", "template_xxxxxxx", {
          from_name: name,
          from_email: email,
          phone: phone,
          message: message,
          to_email: "rohit9693gupta@gmail.com"
        })
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          
          // Show success message
          alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }, function(error) {
          console.log('FAILED...', error);
          
          // Show error message
          alert('Oops! Something went wrong. Please try again or email directly to rohit9693gupta@gmail.com');
          
          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        });
      } else {
        alert('Please fill in all fields.');
      }
    });
  }

  // ============ BACK TO TOP BUTTON ============
  const backToTopBtn = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============ AOS INITIALIZATION ============
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
  }

  // ============ TYPING EFFECT ============
  const typingText = document.querySelector('.typing-effect');
  if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    // Start typing effect after page load
    setTimeout(typeWriter, 500);
  }

  // ============ PARALLAX EFFECT FOR SHAPES ============
  const shapes = document.querySelectorAll('.shape');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    shapes.forEach((shape, index) => {
      const speed = 0.1 + (index * 0.05);
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ============ IMAGE LAZY LOADING ============
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ============ CARD TILT EFFECT ============
  const cards = document.querySelectorAll('.card, .service-card, .progress-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ============ ANIMATE ON SCROLL COUNTER ============
  // Note: Stat items in hero section are kept static (no animation)
  // Only used for other numerical counters if needed

  // ============ SOCIAL BUTTON RIPPLE EFFECT ============
  const socialButtons = document.querySelectorAll('.social-btn');
  
  socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation CSS
  const style = document.createElement('style');
  style.textContent = `
    .social-btn {
      position: relative;
      overflow: hidden;
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ============ REVEAL ANIMATION ON SCROLL ============
  const revealElements = document.querySelectorAll('.service-card, .progress-card, .testimonial-card');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'all 0.8s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ============ NAVBAR MOBILE MENU CLOSE ON CLICK OUTSIDE ============
  document.addEventListener('click', function(event) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarToggler) {
      const isClickInsideNav = navbarCollapse.contains(event.target);
      const isClickOnToggler = navbarToggler.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });

  // ============ PREVENT HORIZONTAL SCROLL ============
  function preventHorizontalScroll() {
    const body = document.body;
    const scrollWidth = body.scrollWidth;
    const clientWidth = body.clientWidth;
    
    if (scrollWidth > clientWidth) {
      body.style.overflowX = 'hidden';
    }
  }

  window.addEventListener('load', preventHorizontalScroll);
  window.addEventListener('resize', preventHorizontalScroll);

  // ============ PERFORMANCE OPTIMIZATION ============
  // Debounce function for scroll events
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

  // Apply debounce to scroll-heavy functions
  window.addEventListener('scroll', debounce(function() {
    activateNavLink();
  }, 10));

  // ============ LOG INITIALIZATION ============
  console.log('%c Portfolio Loaded Successfully! 🚀', 'color: #6366f1; font-size: 20px; font-weight: bold;');
  console.log('%c Developed by Rohit Kumar Gupta', 'color: #667eea; font-size: 14px;');

})();
