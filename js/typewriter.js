(function() {
  document.addEventListener('DOMContentLoaded', initTypewriter);

  function initTypewriter() {
    const el = document.querySelector('.typewriter-text');
    if (!el) return;

    const phrases = [
      'Vibe Coder with Google Antigravity',
      'WordPress Plugin Developer',
      'Chrome Extension Builder',
      'Desktop Software Engineer',
      'AI-Powered Builder'
    ];
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        el.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      timeout = setTimeout(type, typeSpeed);
    }

    type();
  }
})();
