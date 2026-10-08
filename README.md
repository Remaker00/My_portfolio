# Nishant Sourav — Portfolio

Personal portfolio site for **Nishant Sourav**, a frontend developer based in Bangalore, India. Built with Next.js 16, TypeScript, Tailwind CSS 4 and Motion, designed as a "ship log" that proves its own quality.

**Live repo:** [github.com/Remaker00/My_portfolio](https://github.com/Remaker00/My_portfolio)

---

## Concept: Ship Log

The portfolio is presented like a release dashboard rather than a template landing page:

- **Status bar** — sticky header with section links and the CV.
- **Releases** — three client projects as expandable release notes: what was built, how it was verified, stack and live link. Keyboard navigable with `j` / `k`.
- **Audit this page** — 17 live Core Web Vitals, accessibility and SEO checks run in the visitor's browser against the page itself (`src/features/audit/checks.ts`).
- **Career log** — `git log`-style timeline with measured impact.
- **Toolchain** — skills as physics balls you can push, grab and throw (dependency-free engine in `src/features/skills/physics.ts`).
- **Contact** — Web3Forms → Gmail, with a Gmail-compose fallback.

---

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 (CSS-first config in `src/app/globals.css`) |
| Animation | Motion 14 (respects `prefers-reduced-motion`) |
| Icons | Lucide React (brand icons inlined) |
| Testing | Playwright (desktop + mobile) |
| Linting | ESLint 10 flat config (`eslint.config.mjs`) |

---

## Project Structure

```
frontend/
├── e2e/                  # Playwright specs
├── scripts/build-info.mjs# Writes src/generated/build-info.json (gitignored)
├── public/               # Photo, CV, favicon
└── src/
    ├── app/              # Layout, page, SEO routes, generated icons & OG image
    ├── content/          # All copy: profile, releases, career, stack
    ├── features/         # One folder per page section (UI + its logic)
    ├── components/       # Shared primitives (Section, icons, MotionProvider)
    └── lib/              # cn(), site URL, build info
```

---

## Getting Started

Requires Node.js 20.9+.

```bash
cd frontend
npm install
npx playwright install chromium   # first time only, for e2e tests
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Playwright suite (builds and serves on :3100) |
| `npm run check` | All of the above |

---

## Environment Variables

The contact form uses **Web3Forms** to deliver messages directly to Gmail. Without a key, submissions fall back to opening Gmail with a pre-filled compose window.

1. Go to [web3forms.com](https://web3forms.com) and register with your Gmail address
2. Copy the access key from the confirmation email
3. Create `frontend/.env.local`:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

4. Restart the dev server

See `frontend/.env.example` for the template.

---

## Customization

All content lives in `frontend/src/content/` — edit these files to update the site without touching components:

| File | Contents |
|------|----------|
| `profile.ts` | Name, headline, summary, email, links, CV path |
| `releases.ts` | Project case studies |
| `career.ts` | Work and education log |
| `stack.ts` | Toolchain groups |

Place your resume PDF in `frontend/public/` and set `resumeUrl` in `src/content/profile.ts`.

---

## Deployment

The app lives in the `frontend/` directory. Deploy that folder to [Vercel](https://vercel.com), Netlify, or any Node.js host that supports Next.js.

**Vercel (recommended):**

1. Import the repository
2. Set the **Root Directory** to `frontend`
3. Add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in project environment variables
4. Deploy

Build command: `npm run build`  
Output: Next.js default (`.next`)

---

## Contact

- **Email:** [nishant.sharma8507966@gmail.com](mailto:nishant.sharma8507966@gmail.com)
- **GitHub:** [@Remaker00](https://github.com/Remaker00)
- **LinkedIn:** [nishant-sourav](https://www.linkedin.com/in/nishant-sourav-bb5b02269/)

---

## License

Private portfolio project. All rights reserved unless otherwise noted.
