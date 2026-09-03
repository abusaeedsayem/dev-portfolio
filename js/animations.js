(function() {
  document.addEventListener('DOMContentLoaded', initAnimations);

  function initAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const counters = document.querySelectorAll('.counter');
    const skillBars = document.querySelectorAll('.skill-fill');
    const staggers = document.querySelectorAll('.stagger-children');
    const parallaxEls = document.querySelectorAll('.parallax');

    if (prefersReducedMotion) {
      // Show all statically if reduced motion is preferred
      animateElements.forEach(el => el.classList.add('is-visible'));
      counters.forEach(el => {
        const target = el.getAttribute('data-target');
        if (target) el.textContent = target;
      });
      skillBars.forEach(el => {
        const level = el.getAttribute('data-level');
        if (level) el.style.width = `${level}%`;
      });
      return;
    }

    // Scroll reveal observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('is-visible');
          
          if (el.classList.contains('counter')) {
            animateCounter(el);
          } else {
            el.querySelectorAll('.counter').forEach(animateCounter);
          }
          
          if (el.classList.contains('skill-fill')) {
            const level = el.getAttribute('data-level');
            if (level) el.style.width = `${level}%`;
          } else {
            el.querySelectorAll('.skill-fill').forEach(sf => {
              const level = sf.getAttribute('data-level');
              if (level) sf.style.width = `${level}%`;
            });
          }
          
          if (el.classList.contains('stagger-children')) {
            Array.from(el.children).forEach((child, index) => {
              child.style.transitionDelay = `${index * 100}ms`;
              child.classList.add('is-visible');
            });
          }

          obs.unobserve(el);
        }
      });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));
    counters.forEach(el => { if (!el.classList.contains('animate-on-scroll')) observer.observe(el); });
    skillBars.forEach(el => { if (!el.classList.contains('animate-on-scroll')) observer.observe(el); });
    staggers.forEach(el => { if (!el.classList.contains('animate-on-scroll')) observer.observe(el); });

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(ease * target);
        
        el.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(updateCounter);
    }

    // Parallax effect
    if (parallaxEls.length > 0) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxEls.forEach(el => {
          const max = parseInt(el.getAttribute('data-parallax-max')) || 30;
          const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
          const offset = Math.min(scrollY * speed, max);
          el.style.transform = `translateY(${offset}px)`;
        });
      }, { passive: true });
    }
  }
})();
