# Abu Saeed Mohammad Sayem — Developer Portfolio

[![GitHub Repository](https://img.shields.io/badge/GitHub-dev--portfolio-6366f1?style=for-the-badge&logo=github)](https://github.com/abusaeedsayem/dev-portfolio)
[![Version](https://img.shields.io/badge/version-1.0.0-22d3ee?style=for-the-badge)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)

A modern, high-performance personal developer portfolio website designed for **Abu Saeed Mohammad Sayem**, showcasing expertise in **Vibe Coding with Google Antigravity**, **WordPress Plugin Development**, **Desktop Software Engineering**, and **Google Chrome Extensions**.

---

## 🌟 Key Features

- **Aesthetic**: Dark-first palette (`#0a0e1a`) with electric indigo (`#6366f1`), cyan (`#22d3ee`), and purple (`#a855f7`) gradients, frosted glass cards, and glow effects.
- **Interactive Canvas Particles**: Custom particle mesh background for the hero section responding dynamically to mouse movement.
- **Dynamic Typewriter**: Smoothly cycles through builder specializations and roles.
- **Animated Skill Bars & Counters**: Triggered accurately on scroll via `IntersectionObserver`.
- **Filterable Showcase**: Instant category filtering for WordPress Plugins, Chrome Extensions, Desktop Apps, Web Apps, and AI Projects.
- **Theme Switching**: Dark / Light theme toggle with `localStorage` persistence.
- **Accessible & Responsive**: Keyboard-navigable, mobile-friendly navigation drawer, and support for `prefers-reduced-motion`.
- **Zero Heavy Frameworks**: 100% vanilla HTML5, modern modular CSS3, and lightweight ES6+ JavaScript.

---

## 📁 Project Structure

```
dev-portfolio/
├── index.html              # Main semantic HTML5 document
├── CHANGELOG.md            # Detailed release history & updates
├── README.md               # Project documentation
├── package.json            # Vite build & dev server configuration
├── .gitignore              # Ignored files (node_modules, dist)
├── assets/
│   └── favicon.svg         # Gradient code bracket favicon
├── css/
│   ├── variables.css       # Theme tokens, typography, and spacing scales
│   ├── base.css            # Reset, typography, and container layout
│   ├── components.css      # Buttons, cards, chips, tags, and toasts
│   ├── sections.css        # Section layouts (Hero, About, Projects, etc.)
│   └── animations.css      # Keyframes, hover glows, and scroll transitions
└── js/
    ├── particles.js        # Canvas particle background system
    ├── typewriter.js       # Dynamic role typewriter effect
    ├── animations.js       # IntersectionObserver scroll-triggers
    └── main.js             # Nav, theme toggle, project filter, and contact
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/abusaeedsayem/dev-portfolio.git

# 2. Navigate to project directory
cd dev-portfolio

# 3. Install dependencies
npm install

# 4. Start local development server with hot-reloading
npm run dev
```

### Production Build & Preview

```bash
# Build production bundle to /dist
npm run build

# Preview the production build locally
npm run preview
```

### Alternative Static Hosting

You can also open `index.html` directly in any browser or use any static server without build tools:

```bash
# Using Python
python3 -m http.server 3000

# Using npx serve
npx serve .
```

---

## 📜 Changelog

For a complete record of updates and version history, see [CHANGELOG.md](CHANGELOG.md).

---

## 🛠️ Built With

- **Google Antigravity & AI Workflows**
- **HTML5 & CSS3**
- **JavaScript (ES6+)**
- **Vite** (Local Dev & Bundling)
- **Google Fonts** (Space Grotesk, Inter, JetBrains Mono)

---

## 👤 Author

**Abu Saeed Mohammad Sayem**
- Location: Schenectady, NY, USA
- LinkedIn: [@abusaeedsayem](https://www.linkedin.com/in/abusaeedsayem)
- GitHub: [@abusaeedsayem](https://github.com/abusaeedsayem)
- Email: asaeedmsayem@gmail.com
