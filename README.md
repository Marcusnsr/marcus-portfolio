# Marcus Rasmussen — Portfolio

A dark-fantasy / arcane portfolio site for an MSc Computer Science graduate, built with
**Vite + React + TypeScript** and **Framer Motion**. The machine-learning focus is framed as
a D&D "summoning circle," with a neural-network loading screen, a custom arcane cursor, and a
rollable d20 easter egg.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

Tip: open `http://localhost:5173/?skipintro` to bypass the loading animation while developing.

## Build & preview

```bash
npm run build
npm run preview
```

## Images

Web-optimized, uniformly-sized assets are committed under `public/images/` (and
`public/videos/`) and referenced from `src/data/`. The original source images and the
`sharp`-based optimization script are kept outside this repo; restore them if you need to
regenerate or add assets.

## Content

All text/content is data-driven and lives in `src/data/`:

| File | Section |
|------|---------|
| `profile.ts` | Hero / identity |
| `timeline.ts` | Milestones (dated items) |
| `jobs.ts` | Job experience bubbles |
| `education.ts` | Theses, degrees, coursework |
| `projects.ts` | Projects (TrafficPulse, Hector, Orion) |
| `hobbies.ts` | About Me prose, images, character sheet |

Edit those files to update the site — no component changes needed.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Vite (build `vite build`, output `dist`).
   `vercel.json` adds the SPA rewrite.
3. Add your custom domain in Vercel → Settings → Domains once purchased.

## Domain ideas (verify availability before buying)

- **marcusnsr.dev** — matches the GitHub handle; cheap, HTTPS-enforced. *(recommended)*
- **marcusnsr.ai** — ML-flavored alternative.
- marcusrasmussen.dev · marcusrasmussen.ai · mnsr.ai · marcus.engineering
