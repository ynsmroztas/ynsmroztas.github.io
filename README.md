# ynsmroztas.github.io — v2.0

Security researcher portfolio built with **Astro** — deployed on GitHub Pages via GitHub Actions.

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/ynsmroztas/ynsmroztas.github.io.git
cd ynsmroztas.github.io

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── pages/
│   │   └── index.astro              # Main page
│   ├── components/
│   │   ├── Hero.astro               # Hero / intro section
│   │   ├── HallOfFame.astro         # Achievements & stats
│   │   ├── Tools.astro              # Open source tools
│   │   ├── Skills.astro             # Skills & toolbox
│   │   ├── Blog.astro               # Writeups section
│   │   └── Connect.astro            # Contact & socials
│   ├── layouts/
│   │   └── Base.astro               # Nav + footer layout
│   ├── content/
│   │   └── blog/                    # Markdown writeups
│   └── styles/
│       └── global.css               # Global styles
├── public/                          # Static assets
├── astro.config.mjs                 # Astro configuration
├── .github/workflows/deploy.yml     # Auto-deploy workflow
└── package.json
```

## 📝 Adding Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Writeup Title"
date: 2026-03-25
tags: ["XSS", "SSRF"]
excerpt: "Short description of the writeup."
---

# Your content here...
```

## 🔧 Deploy

Deployment is automatic via GitHub Actions. Every push to `main` triggers:

1. `npm install`
2. `npm run build`
3. Deploy `dist/` to GitHub Pages

### First-time setup:

1. Go to repo **Settings → Pages**
2. Source: **GitHub Actions**
3. Push to `main` — done!

## 🎨 Customization

- **Colors & fonts**: Edit `src/styles/global.css` (CSS variables at `:root`)
- **Content**: Edit component files in `src/components/`
- **Blog**: Add Markdown files to `src/content/blog/`
- **Meta tags**: Edit `src/layouts/Base.astro`

## ⚡ Tech Stack

- [Astro](https://astro.build) — Static site generator
- Vanilla CSS — No framework dependency
- GitHub Actions — CI/CD
- GitHub Pages — Hosting

---

Built by [@ynsmroztas](https://twitter.com/ynsmroztas) / mitsec
