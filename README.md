# Nishant Sourav — Portfolio

Personal portfolio site for **Nishant Sourav**, a frontend developer based in Bangalore, India. Built with Next.js 15, TypeScript, Tailwind CSS, and Motion — focused on performance, scroll-driven animations, and a polished dark UI.

**Live repo:** [github.com/Remaker00/My_portfolio](https://github.com/Remaker00/My_portfolio)

---

## Features

- **Hero** — Interactive showcase with terminal aesthetic, rotating roles, tech orbit, and command menu
- **About** — Bento-style layout with profile card, focus areas, and glassmorphism panels
- **Skills** — Grouped skill categories with visual hierarchy
- **Projects** — Professional and learning projects with tags and descriptions
- **Experience** — Scroll-animated timeline with progress bar and active connection nodes
- **Contact** — Form powered by [Web3Forms](https://web3forms.com) (free) with Gmail compose fallback
- **Smooth scrolling** — Lenis integration with reduced-motion support
- **SEO** — Metadata, Open Graph, Twitter cards, `robots.txt`, and `sitemap.xml`
- **Performance** — Dynamic imports for below-fold sections, AVIF/WebP images, content-visibility hints

---

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | [Motion](https://motion.dev/) |
| Scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Icons | Lucide React |
| Contact | Web3Forms → Gmail |

---

## Project Structure

```
My_portfolio/
├── frontend/                 # Next.js application
│   ├── public/               # Static assets (images, resume PDF, favicon)
│   ├── src/
│   │   ├── app/              # App Router (layout, page, globals, SEO routes)
│   │   ├── sections/         # Page sections (Hero, About, Skills, …)
│   │   ├── components/       # Reusable UI and feature components
│   │   ├── constants/        # Site copy, projects, experience, skills data
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities (contact form, cn helper)
│   │   ├── animations/       # Motion variants and transitions
│   │   └── types/            # Shared TypeScript types
│   ├── .env.example          # Environment variable template
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.18 or later
- **npm** (or yarn / pnpm)

### Install & run

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

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

Most content is driven from `frontend/src/constants/` — edit these files to update the site without touching components:

| File | Contents |
|------|----------|
| `site.ts` | Name, title, email, location, resume URL |
| `hero.ts` | Hero copy, metrics, tech stack, command menu |
| `about.ts` | About section content and bento cards |
| `skills.ts` | Skill groups |
| `projects.ts` | Project listings |
| `experience.ts` | Work and education timeline |
| `navigation.ts` | Navbar links |
| `social.ts` | GitHub, LinkedIn, email links |

Place your resume at `frontend/public/Nishant_CV.pdf` (or update `resumeUrl` in `site.ts`).

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
