# Changelog

All notable changes to the **Abu Saeed Mohammad Sayem Developer Portfolio** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-09-05

### Changed
- **Branding**: Header + footer logo `Abu Saeed.dev` → `Abu Saeed . Sayem` (`index.html:30`, `index.html:661`).
- **Hero — Badge Cleanup**: Removed `🚀 Open for Opportunities` pill (`index.html:74`) + orphaned `.hero-badge` CSS (`css/sections.css:149-159`) — full `Option B` cleanup (HTML+CSS).
- **Hero — Dynamic Floating Badges**: `WordPress`/`Desktop`/`Antigravity`/`Chrome`/`AI` words now float + wave all around hero and are draggable anywhere in hero. Implemented `js/floatingBadges.js` (277 LOC) with per-badge `x,y,vx,vy` + sine wave (`waveFreq 0.0006-0.001`) + bounce + `pointerdown/move/up` capture, `translate3d` GPU, `resize` clamp, `visibilitychange` pause, `prefers-reduced-motion` guard. Moved `floating-badges` outside `hero-content` to cover full `hero-section` `inset:0`, `pointer-events:none` wrapper / `auto` badges, `cursor:grab/grabbing`, `will-change:transform`, mobile enabled (`≤768` smaller pills). Wired via `index.html:708`.
- **About**: Removed placeholder `Download Resume` (`index.html:108` `href="#"`) — no PDF existed — replaced with engaging primary CTA `Let's Collaborate →` (`href="#contact"`).
- **Skills — Languages**: `C# 75%` → `Java 93%` (`index.html:177-180`) and reordered by proficiency: `HTML5 & CSS3 95%` → `Java 93%` → `JavaScript 92%` → `PHP 88%` → `TypeScript 85%` → `Python 80%` (`index.html:165-211`).
- **Skills — Frontend**: Added `Stitch 70%` as 4th item appended after `WordPress Theme Dev` (`index.html:237-243`).
- **Skills — AI & Vibe Coding**: Added `Muse 88%` then renamed to `Pomelli 88%` as 5th item (`index.html:346-352`), preserving `88%`/`data-level 88`.
- **Projects — Premium Branding & Banding**: Replaced emoji headers with real assets: `Smart Affiliate Link Cloaker` → `assets/Smart Affiliate Link Cloaker icon.svg` (76×76), `VibePress Studio` → `assets/VibePress Studio logo.svg` (220×49 wide), `ShelfMaster` → `assets/ShelfMaster icon-1024.png` (84×84 square). Added premature `assets/VibePress Studio logo-dark.svg` for future dark variant. Restructured `project-header` `180→220px` (195px mobile), `isolation:isolate` + radial highlights `::before` + shine sweep `::after` (`left -75%→128%`), `project-logo-wrap` grid, `project-logo--square` 82×82 / `elevated` 88×88 white pill + `box-shadow`, `project-logo--wide` 232px white pill. Card hover `translateY -6px` + `scale 1.05` on logo, `prefers-reduced-motion` safe. Assets handled by Vite (SVGs inlined as `data:image/svg+xml`, PNG hashed `dist/assets/ShelfMaster icon-1024-CX0M8jc0.png 49.68kB`).
- **Contact — Icon Fix**: `Connect` block icon was duplicate LinkedIn `M16 8...` (`index.html:627` header == LinkedIn button `636`); replaced with `Share-2` network `circle18/5 r3 + 6/12 r3 + 18/19 r3 + lines` (`index.html:633`) — universally “connect/social”, distinct from GitHub/Location/Email.
- **Contact — Premium Reshape**: Full section elevate: `alt-bg` gradient + dual radial overlay, `contact-form-container` glass `blur20` + `padding-xl` + hover glow, `info-icon` 44×44 circle `bg rgba99,102,241,0.12`, `info-card` hover lift `-3px`, `social-links a` 40×40 circles with glow, `form-note` muted center, `.field-error` red ring, `.hp-field` honeypot off-screen, `toast .error/.success` variants + `btn:disabled`.
- **Contact — Delivery & Copy**: Switched from fake mock (`js/main.js` toast only) to automatic server delivery to `abusaeedsayem@proton.me` via `https://formsubmit.co/ajax/abusaeedsayem@proton.me` (`js/main.js:154`, `FormData` + `_captcha false` + `_template table`). **Zero `mailto:` fallback** — removed all 3 `window.location.href='mailto:...'` branches (`main.js:244,266,271` → 0). Success toast now exactly `Message has been sent and thanks for using our communication system. ✨` (`main.js:259`). Form note replaced `Secure delivery … 24h` → `Usually I’ll reply within 48 business hours. If it is a weekend, then it might take 72 hours.` (`index.html:606`). Honeypot static, `Send Message →` button disabled `Sending…` state, error toasts no desktop open.
- **Contact — Email Display**: `asaeedmsayem@gmail.com` → `abusaeedsayem@proton.me` in info card `index.html:617` + footer `678` + `README.md:119`.

### Added
- `assets/Smart Affiliate Link Cloaker icon.svg` (2.5k), `assets/ShelfMaster icon-1024.png` (1024×1024, 49k), `assets/VibePress Studio logo.svg` / `logo-dark.svg` (1.0k/1.1k).
- `js/floatingBadges.js` — autonomous drift + wave + draggable hero system.

### Removed
- `🚀 Open for Opportunities` hero badge and its `.hero-badge` CSS.
- `Download Resume` placeholder button (no PDF existed).

### Technical
- `Vite build` remains green: `dist/assets/index-*.js 15.24k gz4.5→5.16`, `index-*.css 31.62k gz5.97→33.93k` (+premium + form states), favicon hashed. SVGs inlined, PNG hashed, all `grep` verifications pass. `node --check` syntax OK.

---

## [1.0.0] - 2026-09-03

### Added
- **Developer Identity Pivot**: Complete redesign repositioning Abu Saeed Mohammad Sayem as a Full-Stack Developer & AI Solutions Builder.
- **Vibe Coding Focus**: Highlighting expertise in Google Antigravity, AI-assisted development workflows, and prompt engineering.
- **Hero Section**:
  - Interactive HTML5 Canvas particle system (`js/particles.js`) with responsive cursor repulsion and edge linking.
  - Dynamic typewriter effect (`js/typewriter.js`) cycling through developer roles and specializations.
  - Floating tech badges representing key competencies (⚡ Antigravity, 🔌 WordPress, 🧩 Chrome, 🖥️ Desktop, 🤖 AI).
- **Core Showcase Sections**:
  - **About Me**: Professional biography combining tech literacy with MBA background, accompanied by 4 animated stat counters.
  - **What I Do**: 4 service cards showcasing Google Antigravity Vibe Coding, WordPress Plugins, Desktop Software, and Chrome Extensions.
  - **Skills & Technologies**: Categorized skill progress bars with animated fill on viewport intersection.
  - **Featured Projects**: Filterable project gallery (WordPress, Chrome, Desktop, Web, AI) with tag chips, custom gradient headers, and direct links.
  - **Experience & Education**: Interactive vertical timeline tracking US career journey and academic credentials.
  - **Contact & Availability**: Modern contact form with validation, status indicator, and direct communication channels.
- **Modern Design System**:
  - Dark-first aesthetic (`#0a0e1a`) with electric indigo (`#6366f1`), cyan (`#22d3ee`), and purple (`#a855f7`) accents.
  - Glassmorphism cards with `backdrop-filter: blur(20px)` and subtle glow shadows.
  - Seamless Dark / Light theme toggle with `localStorage` persistence.
  - Accessibility support with semantic HTML5, ARIA labels, and `prefers-reduced-motion` compliance.
- **Tooling & Build System**:
  - Configured Vite development server (`npm run dev`) with instant Hot Module Replacement (HMR).
  - Production build pipeline (`npm run build`) and preview script (`npm run preview`).
  - Added `.gitignore` and developer-themed SVG favicon (`assets/favicon.svg`).
