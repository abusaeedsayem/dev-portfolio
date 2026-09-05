# Changelog

All notable changes to the **Abu Saeed Mohammad Sayem Developer Portfolio** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2026-09-05

### Changed
- **Experience & Education — Non-Timeline Premium Redesign:** Replaced previous **timeline style** (`timeline timeline--premium` with vertical gradient line `css/sections.css:966-981`, `timeline-dot` `12px` + `pulseGreenDot`, `timeline-item` left padding) with premium **non-timeline** layout — **Hero + Bento + Info-Stack** (`index.html:507-699`, `css/sections.css:895-1058`).
  - **Hero Featured Card** `experience-hero` (`index.html:514-540`): Glass `blur20` `border` `radius-lg` `padding-xl` + top `4px` accent bar `linear 90deg primary→tertiary→secondary`, `experience-hero-top` flex badge `Current` `pulsing-dot` + duration `Jul 2026 – Present · 3 mos`, 3 highlights (VibePress, Cloaker, ShelfMaster) + chips `Next.js/TypeScript/Tauri/WordPress/Vercel`, hover `translateY -3px` + `shadow 14px 36px + glow`.
  - **Bento Grid** `experience-bento` (`index.html:542-575`): `1fr → 2 cols @768` `gap lg` of `feature-card experience-bento-card` — `✍️ Blogger` `Jun 2024 2y4m` + `🌐 Freelance Web Dev` `Apr 2009 2y` each with `bento-icon` `44px circle rgba99,102,241 0.12`, badge/duration/title/meta/desc + condensed highlights + chips. Reuses `feature-card` premium (`components.css:feature-card`).
  - **Info Stack** `info-stack` (`index.html:577-607`): Vertical flex `gap lg` of `info-card` horizontal (`info-icon 44px circle` + `info-body` flex) — `QA Engineer` `Feb–Apr 2022 3m` + `Senior Instructor NYDTC` `Aug 2002–Mar 2009 6y8m`; retains `timeline-header/badge/duration/highlights` but without timeline line. Non-IT collapsible `details.other-experience` kept as `info-card--muted` dashed glass (`index.html:609-664`).
  - **Education Sticky** `edu-column` `647` unchanged (2 degrees + note `9+ Years`). Overall `experience-grid` `1fr → 1.65fr/0.95fr @992` with dual radial overlay intact.
  - **Styling:** Removed `timeline`, `timeline::before`, `timeline-dot`, `dot--current/muted`, `@keyframes pulseGreenDot` from `css/sections.css`; added `featured-column`, `experience-hero`, `experience-hero-accent/top`, `experience-bento`, `bento-icon`, `info-stack`, `info-body`, `info-card--muted` (+ `info-icon--muted`) — all `glass` + `prefers-reduced-motion` safe.
  - Content preserved: Same 5 IT roles (Freelance Developer, Blogger, Freelance Web Dev, QA, Senior Instructor), same collapsible non-IT 3 roles, same 2 degrees, same `9+ years` filtered total and `Jun 2024 – Present · 2 yrs 4 mos` date style; purely visual architecture change from vertical timeline to modular card system.

### Technical
- `css/sections.css` net `+~30` lines (removed `~60` timeline lines, added `~90` hero/bento/stack). `Vite build` green: `dist/index.html 50.65k gz11.12`, `index-*.css 39.32k gz7.12`, `js 14.70k`; `grep timeline::before 0` in built CSS, `grep timeline-item dist 0` vs `3` before, `experience-hero/bento` present.

---

## [1.2.0] - 2026-09-05

### Changed
- **Experience & Education — Premium Split Redesign (LinkedIn Source: `assets/Updated Profile.pdf`):** Replaced single `max-width 800px` timeline (`index.html:507-574`, `css/sections.css:898-972`) with `experience-grid` `1fr` → `1.65fr 0.95fr @992` (`sections.css:905-972`) — **Work (left)** `timeline--premium` + **Education (right sticky)** `edu-column` `position:sticky top:96px`. Section now has dual radial overlay `rgba99,102,241,0.08` + `168,85,247,0.07`, `subsection-title` with `subsection-dot/count` pills.
- **Work Experience — Information Sync from LinkedIn PDF (5 IT roles, 9+ years):**
  - `Freelance Developer` · `Self Employed` · `United States` · `Jul 2026 – Present · 3 mos` · Present — production-grade privacy-first software; highlights: *VibePress Studio Hub (Live)* Next.js 16/TS/Tailwind v4/shadcn/ui 17 pages WCAG AAA, *Smart Affiliate Link Cloaker* 24-feature WordPress plugin (cloaking/geo/A-B/GA analytics/Stripe), *ShelfMaster* Tauri 2.0/Rust/React/SQLite 9 modules (`index.html:517-548`).
  - `Self-Employed Blogger & Writer` · `Schenectady, NY` · `Jun 2024 – Present · 2 yrs 4 mos` · bilingual English & Bengali publishing across PassiveWriting/Medium/Facebook/Wattpad + SEO (`index.html:550-572`).
  - `Freelance Web Developer` · `United States` · `Apr 2009 – Mar 2011 · 2 yrs` · WordPress themes for cleaning/affiliate/technical/language schools, plugin/menus/widgets, responsive SEO (`index.html:574-593`) — **newly surfaced from PDF (was missing in cache)**.
  - `Quality Assurance Engineer` · `CLEER Security, LLC` · `Miami, FL` · `Feb 2022 – Apr 2022 · 3 mos` · web app testing, bug tracking, organized records (`index.html:595-612`).
  - `Senior Training Instructor` · `NYDTC` · `Rajshahi, Bangladesh` · `Aug 2002 – Mar 2009 · 6 yrs 8 mos` · taught Microsoft Office & computing fundamentals, prepared course materials & attendance (`index.html:614-631`) — **included per Filter scope confirmation** (Computer/IT).
  - Timeline cards premium: `glass-bg blur20` + hover `translateY -2` + `border accent 22%` + `glow`, `timeline-header` flex with `timeline-duration` mono pill `bg-tertiary`, `timeline-highlights` ✦ list, `timeline-chips` chips row, `dot--current` pulsing green `pulseGreenDot 2s` for current role.
- **Other Experience (Non-IT Operations) — Collapsible:** Moved 3 non-IT roles to `<details class="other-experience">` (`index.html:633-664`, `css: other-experience` dashed `glass-bg`, `summary-chevron` rotate): `PSE Mail Processing Clerk` `Sep 2022–Jul 2024 · 1 yr 11 mos` `USPS Albany`, `Mail Handler Assistant` `Aug–Sep 2022 · 2 mos` `USPS`, `Production Technician` `Mar 2021–Jan 2022 · 11 mos` `Plug Power Latham` — hidden by default, preserves history without diluting dev narrative.
- **Education — Sticky Premium:** `edu-column` `edu-stack` `edu-card` flex `glass-bg` + `edu-icon` 44px circle `bg accent 12%`, `MBA Finance` `Asian University Bangladesh Apr 2007–Mar 2009` + `International Diploma Computer Studies NCC UK Jan 2000–Feb 2002` (`index.html:666-706`); added `edu-note` `rgba99,102,241,0.07` explaining *9+ Years IT Experience incl. Senior Training Instructor Aug 2002–Mar 2009*.
- **Date Style:** `Jun 2024 – Present · 2 yrs 4 mos` per recommendation (short month, en-dash, `·`, abbreviated years/months) applied consistently to all 8 durations (including `Jul 2026 – Present · 3 mos`, `Apr 2009 – Mar 2011 · 2 yrs`, etc.).
- **About Stats Sync:** `Years Experience` counter `index.html:110` `data-target="5"→"9"` to reflect filtered IT total **9** (6y8m NYDTC + 2y Freelance Web Dev + 3m QA + 2y4m Blogger = 11y3m distinct, displayed as **9+** per your `B) 9` selection). Other stats `Projects Built 20+ / Technologies 10+ / Specializations 4+` left unchanged.

### Technical
- `css/sections.css` premium block expanded `895-1130` (+~180 lines) with `experience-grid`, `subsection-*`, `timeline--premium`, `other-experience`, `edu-*`, `prefers-reduced-motion` guard. `Vite build` green: `dist/index.html 52.61k gz11.39`, `index-*.css 39.04k gz7.07` (was 33.93k), `js` unchanged `14.70k`. `node --check` OK.

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
