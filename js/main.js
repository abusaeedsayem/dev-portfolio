(function() {
  document.addEventListener('DOMContentLoaded', initMain);

  function initMain() {
    // Navigation
    const header = document.querySelector('header');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    function handleScroll() {
      const scrollY = window.scrollY;
      
      // Header glass effect
      if (header) {
        if (scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Active section detection
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });

      // Scroll to top button visibility
      const scrollTopBtn = document.getElementById('scroll-top');
      if (scrollTopBtn) {
        if (scrollY > 500) {
          scrollTopBtn.classList.add('visible');
          scrollTopBtn.style.display = 'flex';
        } else {
          scrollTopBtn.classList.remove('visible');
          scrollTopBtn.style.display = 'none';
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init on load

    // Smooth scroll
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
          }
          
          window.scrollTo({
            top: targetEl.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Mobile Menu Toggle
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });
    }

    // Close mobile menu on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
      }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    if (themeToggle) {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      html.setAttribute('data-theme', savedTheme);
      themeToggle.innerHTML = savedTheme === 'dark' ? moonIcon : sunIcon;

      themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? moonIcon : sunIcon;
      });
    }

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active button
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filterValue = btn.getAttribute('data-filter');

          projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
              card.classList.remove('hidden');
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 50);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              setTimeout(() => {
                card.classList.add('hidden');
              }, 300);
            }
          });
        });
      });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const message = contactForm.querySelector('textarea[name="message"]');
        
        if (!name || !email || !message) return;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (name.value.trim() !== '' && emailRegex.test(email.value) && message.value.trim() !== '') {
          // Show toast notification
          let toast = document.querySelector('.toast');
          if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = 'Message sent successfully!';
            document.body.appendChild(toast);
          }
          
          toast.classList.add('show');
          contactForm.reset();
          
          setTimeout(() => {
            toast.classList.remove('show');
          }, 4000);
        }
      });
    }

    // Scroll to Top action
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Set Current Year in Footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }
  }
})();
