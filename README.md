# Rahul Shaw — Portfolio

A single-page developer portfolio for **Rahul Prasad Shaw** (AI Backend Engineer). The site presents experience, projects, and technical focus areas through a dark, glassmorphism UI, scroll-driven storytelling, and selective **Three.js** scenes—not a generic template, but a cohesive product-style experience.

**Repository:** [github.com/rjrahul08/rahul-shaw-portfolio](https://github.com/rjrahul08/rahul-shaw-portfolio)

---

## Highlights

- **Hero** — Animated type cycle, neural-field **React Three Fiber** background, CTAs and social links  
- **About** — Bio, stat cards with **react-countup**, floating **torus knot** 3D accent  
- **Skills** — Grouped stacks, marquee, animated proficiency bars (**Framer Motion**)  
- **Experience** — Timeline layout with role details and tags  
- **Projects** — Featured work cards with tech stacks  
- **RAG pipeline** — Step-by-step diagram plus illustrative Python snippet (copy-to-clipboard)  
- **Interactive terminal** — Command palette (`help`, `skills`, `projects`, `rag`, `hire`, etc.) with history and tab completion  
- **Metrics** — Impact numbers and proficiency visualization  
- **Constellation** — 3D “lanes” (AI/ML → Cloud → Backend → Frontend) with hover labels and **OrbitControls**  
- **Ask My AI** — Lightweight, keyword-matched Q&A demo over static copy (no external API)  
- **3D timeline** — Career milestones on a helix-style scene  
- **GitHub** — Profile-style grid and repository cards (content from data)  
- **Now** — Current focus and availability  
- **Contact** — Form UI (client-side only; wire to your backend or form service for production)

Global UX: **Lenis** smooth scrolling, custom cursor, entry **loader** (once per session via `sessionStorage`), scroll progress bar, and a **navbar** with scroll-spy active states.

---

## Tech stack

| Area | Technology |
|------|------------|
| Runtime | React 19, TypeScript |
| Build | Vite 7, `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), CSS variables for theme tokens |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei` |
| Motion | Framer Motion |
| Scroll | Lenis |
| Icons | Lucide React |
| Other UI | `react-type-animation`, `react-countup` |

Additional dependencies in `package.json` (e.g. GSAP, React Router) are available for extension; the current UI is implemented primarily with the packages above.

---

## Requirements

- **Node.js** 20+ (or current LTS recommended)
- **npm** (or use `pnpm` / `yarn` with equivalent commands)

---

## Getting started

```bash
git clone https://github.com/rjrahul08/rahul-shaw-portfolio.git
cd rahul-shaw-portfolio
npm install
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`).

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Run TypeScript project build, then production Vite build → `dist/` |
| `npm run preview` | Serve the `dist` output locally |
| `npm run lint` | Run ESLint across the project |

---

## Project structure

```
├── public/           # Static assets (favicon, OG image, resume PDF, sitemap)
├── src/
│   ├── App.tsx       # Page composition: sections, 3D scenes, layout
│   ├── main.tsx      # React root
│   ├── index.css     # Global styles and design tokens
│   ├── components/   # Navbar, Loader, CustomCursor, GlowButton, SectionWrapper
│   └── lib/
│       ├── constants.ts   # Copy, nav, projects, skills, metrics, AI answers, etc.
│       └── utils.ts       # className helper, smooth scroll, mobile check
├── index.html        # Document metadata (title, description, Open Graph)
├── vite.config.ts    # Plugins; Rollup `manualChunks` for vendor / R3F / Three.js splits
└── package.json
```

---

## Customization

1. **Content and links** — Edit `src/lib/constants.ts` (`personalInfo`, `navLinks`, `projects`, `experience`, `metrics`, `aiAnswers`, etc.).  
2. **Section copy and layout** — Adjust sections in `src/App.tsx`.  
3. **SEO / sharing** — Update `index.html` meta tags and files under `public/` (e.g. `og-image.svg`, `sitemap.xml`).  
4. **Resume** — Replace `public/resume.pdf` and keep the hero button path in sync if you change the filename.

The contact form is presentational only until you connect it to an API, serverless function, or third-party form endpoint.

---

## Build and deployment

```bash
npm run build
```

Deploy the **`dist`** directory to any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, etc.). Configure the host’s SPA fallback if you later add client-side routes.

---

## Build optimization

`vite.config.ts` splits heavy libraries into separate chunks (e.g. React, `react-dom`, Three.js, React Three Fiber, Drei, Framer Motion, Lenis) to improve caching and parallel loading on first visit.

---

## License

Personal portfolio project. All rights reserved unless you add an explicit open-source license.

---

*Built with React, Three.js, motion, and attention to detail.*
