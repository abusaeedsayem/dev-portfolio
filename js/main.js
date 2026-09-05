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

    // Contact Form — Automatic Server Delivery to abusaeedsayem@proton.me (no desktop mail app)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      // ✅ Live endpoint via FormSubmit Ajax — no account needed, delivers directly to Proton via their servers
      // FormSubmit activates on first submit: you will receive a confirmation email at abusaeedsayem@proton.me — click "Activate" once, then all future messages arrive automatically.
      const FORMSPREE_ENDPOINT = 'https://formsubmit.co/ajax/abusaeedsayem@proton.me';
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      function showToast(message, type = 'success') {
        let toast = document.querySelector('.toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.className = 'toast';
          toast.id = 'toast';
          toast.setAttribute('role', 'alert');
          toast.setAttribute('aria-live', 'polite');
          document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => {
          toast.classList.remove('show', 'success', 'error');
        }, 5000);
      }

      function setFieldError(el, hasError) {
        if (!el) return;
        if (hasError) el.classList.add('field-error');
        else el.classList.remove('field-error');
      }

      function clearFieldErrors() {
        contactForm.querySelectorAll('.field-error').forEach((el) => el.classList.remove('field-error'));
      }

      // Live clear error on input
      contactForm.querySelectorAll('input, textarea').forEach((el) => {
        el.addEventListener('input', () => el.classList.remove('field-error'));
      });

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearFieldErrors();

        // Honeypot — bots fill hidden field
        const honey = contactForm.querySelector('input[name="_gotcha"]');
        if (honey && honey.value.trim() !== '') return;

        const nameEl = contactForm.querySelector('input[name="name"]');
        const emailEl = contactForm.querySelector('input[name="email"]');
        const subjectEl = contactForm.querySelector('input[name="subject"]');
        const messageEl = contactForm.querySelector('textarea[name="message"]');

        if (!nameEl || !emailEl || !messageEl) return;

        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const subject = subjectEl ? subjectEl.value.trim() : '';
        const message = messageEl.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let hasError = false;

        if (name === '') { setFieldError(nameEl, true); hasError = true; }
        if (!emailRegex.test(email)) { setFieldError(emailEl, true); hasError = true; }
        if (message === '') { setFieldError(messageEl, true); hasError = true; }

        if (hasError) {
          showToast('Please fill name, valid email, and message.', 'error');
          return;
        }

        const originalBtnText = submitBtn ? submitBtn.textContent : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        try {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('subject', subject ? `[Portfolio] ${subject} from ${name}` : `[Portfolio] New message from ${name}`);
          formData.append('message', message);
          formData.append('_captcha', 'false');
          formData.append('_template', 'table');

          const res = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData,
          });

          const data = await res.json().catch(() => ({}));

          if (res.ok) {
            showToast('Message has been sent and thanks for using our communication system. ✨', 'success');
            contactForm.reset();
          } else {
            const msg = data.message || 'Delivery failed — please try again.';
            showToast(msg, 'error');
          }
        } catch (err) {
          showToast('Unable to send — please try again or email abusaeedsayem@proton.me directly.', 'error');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
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
