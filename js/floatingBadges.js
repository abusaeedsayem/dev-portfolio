(function () {
  document.addEventListener('DOMContentLoaded', initFloatingBadges);

  function initFloatingBadges() {
    const hero = document.querySelector('.hero-section');
    const badges = document.querySelectorAll('.floating-badges .float-badge');
    if (!hero || badges.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // State per badge
    const items = [];
    let heroRect = hero.getBoundingClientRect();
    let heroWidth = hero.clientWidth;
    let heroHeight = hero.clientHeight;

    function updateHeroBounds() {
      heroRect = hero.getBoundingClientRect();
      heroWidth = hero.clientWidth;
      heroHeight = hero.clientHeight;
    }

    window.addEventListener('resize', () => {
      updateHeroBounds();
      // clamp existing positions to new bounds
      items.forEach((item) => {
        if (item.isDragging) return;
        const w = item.el.offsetWidth;
        const h = item.el.offsetHeight;
        item.x = Math.max(0, Math.min(item.x, heroWidth - w));
        item.y = Math.max(0, Math.min(item.y, heroHeight - h));
        item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
      });
    });

    // Initialize each badge with random position & velocity
    badges.forEach((el, index) => {
      // Ensure element is measurable (force layout)
      // Start at 0,0 then distribute
      const w = el.offsetWidth || 110;
      const h = el.offsetHeight || 32;

      // Spread initial positions across hero to avoid stacking
      // Use grid-ish distribution with randomness
      const cols = 3;
      const row = Math.floor(index / cols);
      const col = index % cols;
      const baseX = (heroWidth / cols) * col + heroWidth * 0.05;
      const baseY = (heroHeight / 3) * (row % 3) + heroHeight * 0.12;

      let x = baseX + (Math.random() - 0.5) * 80;
      let y = baseY + (Math.random() - 0.5) * 60;

      x = Math.max(4, Math.min(x, heroWidth - w - 4));
      y = Math.max(4, Math.min(y, heroHeight - h - 4));

      let vx = (Math.random() - 0.5) * 0.7;
      let vy = (Math.random() - 0.5) * 0.7;
      // Ensure minimum drift so they don't appear static
      if (Math.abs(vx) < 0.2) vx = vx >= 0 ? 0.2 + Math.random() * 0.2 : -0.2 - Math.random() * 0.2;
      if (Math.abs(vy) < 0.2) vy = vy >= 0 ? 0.2 + Math.random() * 0.2 : -0.2 - Math.random() * 0.2;

      const phaseX = Math.random() * Math.PI * 2;
      const phaseY = Math.random() * Math.PI * 2;
      const waveAmpX = 0.35 + Math.random() * 0.25;
      const waveAmpY = 0.35 + Math.random() * 0.25;
      const waveFreqX = 0.0006 + Math.random() * 0.0004;
      const waveFreqY = 0.0007 + Math.random() * 0.0004;

      const item = {
        el,
        x,
        y,
        vx,
        vy,
        w,
        h,
        phaseX,
        phaseY,
        waveAmpX,
        waveAmpY,
        waveFreqX,
        waveFreqY,
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
        lastX: 0,
        lastY: 0,
        prevX: 0,
        prevY: 0,
        pointerId: null,
      };

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.style.willChange = 'transform';

      // Improve initial visibility without jump
      el.style.opacity = '0';
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.6s ease';
        el.style.opacity = '1';
      });

      setupDrag(item);
      items.push(item);
    });

    function setupDrag(item) {
      const el = item.el;

      el.addEventListener('pointerdown', (e) => {
        // Only left button / primary pointer
        if (e.button !== 0) return;
        e.preventDefault();
        updateHeroBounds();

        item.isDragging = true;
        item.pointerId = e.pointerId;
        item.offsetX = (e.clientX - heroRect.left) - item.x;
        item.offsetY = (e.clientY - heroRect.top) - item.y;
        item.lastX = e.clientX;
        item.lastY = e.clientY;
        item.prevX = e.clientX;
        item.prevY = e.clientY;

        el.classList.add('dragging');
        try {
          el.setPointerCapture(e.pointerId);
        } catch (err) {}

        // Bring to front slightly
        el.style.zIndex = '10';
      });

      el.addEventListener('pointermove', (e) => {
        if (!item.isDragging) return;
        e.preventDefault();

        // Update bounds in case of scroll/resize
        // heroRect is relative to viewport, but transform is relative to hero container (0,0)
        const x = (e.clientX - heroRect.left) - item.offsetX;
        const y = (e.clientY - heroRect.top) - item.offsetY;

        const w = el.offsetWidth;
        const h = el.offsetHeight;

        const clampedX = Math.max(2, Math.min(x, heroWidth - w - 2));
        const clampedY = Math.max(2, Math.min(y, heroHeight - h - 2));

        item.x = clampedX;
        item.y = clampedY;
        el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;

        item.prevX = item.lastX;
        item.prevY = item.lastY;
        item.lastX = e.clientX;
        item.lastY = e.clientY;
      });

      const endDrag = (e) => {
        if (!item.isDragging) return;
        // Allow pointerup from anywhere
        if (item.pointerId !== null && e.pointerId !== undefined && e.pointerId !== item.pointerId) {
          // For pointerup, check if this is the captured pointer
        }
        item.isDragging = false;
        el.classList.remove('dragging');
        el.style.zIndex = '';

        try {
          if (item.pointerId !== null) el.releasePointerCapture(item.pointerId);
        } catch (err) {}
        item.pointerId = null;

        // Calculate inertia from movement delta
        const dx = item.lastX - item.prevX;
        const dy = item.lastY - item.prevY;

        let newVX = dx * 0.14;
        let newVY = dy * 0.14;

        // Clamp inertia
        newVX = Math.max(-1.4, Math.min(1.4, newVX));
        newVY = Math.max(-1.4, Math.min(1.4, newVY));

        // If movement was tiny, keep previous velocity with slight randomness
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
          // keep existing vx/vy but ensure not zero
          if (Math.abs(item.vx) < 0.15) item.vx = (Math.random() - 0.5) * 0.5;
          if (Math.abs(item.vy) < 0.15) item.vy = (Math.random() - 0.5) * 0.5;
        } else {
          // Apply inertia, blend with previous to avoid abrupt direction change
          item.vx = newVX !== 0 ? newVX : item.vx * 0.9;
          item.vy = newVY !== 0 ? newVY : item.vy * 0.9;

          // Ensure minimum drift after drop
          if (Math.abs(item.vx) < 0.18) item.vx = item.vx >= 0 ? 0.18 + Math.random() * 0.2 : -0.18 - Math.random() * 0.2;
          if (Math.abs(item.vy) < 0.18) item.vy = item.vy >= 0 ? 0.18 + Math.random() * 0.2 : -0.18 - Math.random() * 0.2;
        }
      };

      el.addEventListener('pointerup', endDrag);
      el.addEventListener('pointercancel', endDrag);
      // Safety: global pointerup to catch drag released outside badge
      window.addEventListener('pointerup', (e) => {
        if (item.isDragging && item.pointerId === e.pointerId) endDrag(e);
      });
      window.addEventListener('pointercancel', (e) => {
        if (item.isDragging && item.pointerId === e.pointerId) endDrag(e);
      });
    }

    // Animation loop
    if (prefersReducedMotion) {
      // No autonomous drift, but keep drag functional
      // Still need to keep hero bounds update, but no rAF needed
      return;
    }

    let rafId;
    function animate(time) {
      // Wave overlay using time
      items.forEach((item) => {
        if (item.isDragging) return;

        const w = item.el.offsetWidth;
        const h = item.el.offsetHeight;

        // Sine-based wave drift (gentle)
        const waveX = Math.sin(time * item.waveFreqX + item.phaseX) * item.waveAmpX;
        const waveY = Math.cos(time * item.waveFreqY + item.phaseY) * item.waveAmpY;

        item.x += item.vx + waveX * 0.18;
        item.y += item.vy + waveY * 0.18;

        // Bounce off hero edges with slight damping
        if (item.x <= 0) {
          item.x = 0;
          item.vx = Math.abs(item.vx) * 0.95;
        } else if (item.x >= heroWidth - w) {
          item.x = heroWidth - w;
          item.vx = -Math.abs(item.vx) * 0.95;
        }

        if (item.y <= 0) {
          item.y = 0;
          item.vy = Math.abs(item.vy) * 0.95;
        } else if (item.y >= heroHeight - h) {
          item.y = heroHeight - h;
          item.vy = -Math.abs(item.vy) * 0.95;
        }

        // Optional: gentle central pull to keep badges from stagnating at corners
        // Very subtle (0.002) to maintain "all around" while avoiding dead zones
        // No hard pull; just keep velocity alive
        if (Math.abs(item.vx) < 0.05) item.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(item.vy) < 0.05) item.vy += (Math.random() - 0.5) * 0.05;

        item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
      });

      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    // Pause when tab hidden for performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        updateHeroBounds();
        rafId = requestAnimationFrame(animate);
      }
    });
  }
})();
