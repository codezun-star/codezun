@AGENTS.md

# Codezun — codezun.com

Landing page + blog + local-SEO pages for **Codezun**, a software
development company (SaaS, e-commerce, landing pages, sitios web
completos). Fully remote, serves clients worldwide — the blog/city
pages are a content-marketing strategy that starts with Honduras, not
a scope limit (see "Ciudades" below).

- Contact email: `codezun@gmail.com`
- WhatsApp: `+504 3227-9672` — raw number, display string and wa.me
  link all live in `src/lib/site-config.ts` (`WHATSAPP_NUMBER`,
  `WHATSAPP_DISPLAY`, `WHATSAPP_LINK`)
- Domain: `https://codezun.com` (`SITE_URL` in site-config.ts) — the
  live site today is a Vercel preview (`codezun.vercel.app`)
- Deploys from the `main` branch. Push there directly; this repo does
  not use PR review for this project.

## Stack

- Next.js 16 (App Router). **This is a newer/different Next.js than
  your training data — read `node_modules/next/dist/docs/` before
  changing anything metadata/routing/caching-related.** `params` and
  `searchParams` are Promises everywhere.
- Tailwind v4 — no `tailwind.config.js`. Brand colors and fonts are
  tokens in `src/app/globals.css` under `@theme` (`--color-primary`,
  `--color-secondary`, `--color-dark`, `--color-accent`,
  `--color-highlight`). Use the Tailwind utilities they generate
  (`bg-primary`, `text-dark`, etc.), never raw hex codes in components.
- Framer Motion via `motion/react` (not `framer-motion`) for subtle
  fade-ins (`src/components/FadeIn.tsx`) and small interactions.
- `gray-matter` + `marked` for the blog (no MDX, no `@next/mdx`).
- No analytics, no CMS, no backend — everything is static/local data.

## Brand colors

| Token | Hex | Use |
|---|---|---|
| `primary` | `#0091B9` | accents, links, icons |
| `secondary` | `#BAE4F0` | soft backgrounds, badges |
| `dark` | `#004E9B` | headers/footer/strong text |
| `accent` | `#FF6500` | primary CTAs |
| `highlight` | `#FFD500` | small accents |

## Logo

`public/logo/logo.png` is the **real** logo, uploaded by the user. It
has been cropped twice from the original upload:
1. Tight bounding box (removed excess transparent margin).
2. The tagline row ("DESARROLLO DE SOFTWARE") was cropped off
   entirely — illegible at the sizes it's actually rendered at. The
   file now contains only the dog/`</>` mark + "CODEZUN" wordmark.

**If you replace this file**, its intrinsic aspect ratio is baked into
two places as hardcoded `width`/`height` props on `next/image` /
`next/og` — update both or the logo will stretch:
- `src/components/Logo.tsx`
- `src/app/opengraph-image.tsx`

The wordmark's navy tone has poor contrast directly on the dark-blue
footer background — `Footer.tsx` wraps the logo in a white chip rather
than rendering it raw. Don't remove that chip without re-checking
contrast.

`src/app/icon.png` / `apple-icon.png` / `favicon.ico` are a separate,
tighter crop of *just* the icon mark (no wordmark at all — even
"CODEZUN" is unreadable at 16–32px). Regenerate all three together if
the logo changes; the crop coordinates were derived by inspecting the
source PNG's alpha channel (see git history for the exact script if
needed).

## No brand icons in lucide-react

Confirmed by inspecting the installed package: lucide-react ships
**zero** brand/logo icons (no WhatsApp, no LinkedIn, no Instagram,
etc. — only generic UI icons). Do not import a nonexistent brand icon
from it. For WhatsApp, use `src/components/WhatsAppIcon.tsx` (a
hand-drawn SVG of the real glyph). For other social platforms, there's
currently no icon at all in the Footer (removed per user request) —
if reintroduced, either use plain text links or draw a new icon the
same way, don't reach for an unrelated generic lucide icon as a
stand-in (a `Phone` icon does not read as "WhatsApp").

## Content lives in data files, not hardcoded in components

- `src/lib/site-config.ts` — site name, email, WhatsApp, portfolio
  projects (`PORTFOLIO_PROJECTS`), `SITE_URL`, `SITE_CONTENT_DATE`
  (single source of truth for "last updated" on static pages — update
  it when legal/contact/city content actually changes, and it flows
  into both the visible date and `sitemap.xml`).
- `src/lib/blog.ts` — reads/parses `content/blog/*.md`
  (frontmatter: `title`, `description`, `date`, `keywords`). Add a
  post by dropping a new `.md` file there; no code changes needed.
- `src/lib/cities.ts` — `COUNTRIES: Country[]`, each with nested
  `cities: City[]`. **Only Honduras exists today.** To add a country,
  append to `COUNTRIES` — the routes under `/ciudades` are fully
  data-driven via `generateStaticParams` and need no code changes.
  Only Honduras's 4 largest/most economically relevant cities are
  covered (Tegucigalpa, San Pedro Sula, La Ceiba, Choloma); each city
  has a hand-written multi-paragraph intro grounded in real, public
  economic context (industry, tourism, etc.) — **never claim Codezun
  already has clients in a city it doesn't**; phrase new cities the
  same honest way ("podemos ayudar a negocios en X", not "trabajamos
  con negocios en X").

## Routes

```
/                                        home (Hero/About/Services/Portfolio/Contact)
/contacto                                same Contact section as a standalone page
/blog                                    paginated list (?page=N, 5/page)
/blog/[slug]                             post (markdown -> HTML via Prose)
/ciudades                                countries index
/ciudades/[pais]                         cities in that country
/ciudades/[pais]/[ciudad]                city page (reuses <Services/> + <Contact/>)
/terminos-y-condiciones
/politica-de-privacidad
/aviso-legal
```

`Services` and `Contact` are shared components reused as-is on city
pages (same `id="servicios"`/`id="contacto"` anchors — harmless, each
page is independent).

`Prose.tsx` is the shared typography wrapper for long-form content —
used by both `LegalLayout` (JSX children) and blog posts (`html` prop
with the markdown-rendered string). Extend its class string, don't
duplicate it, if a new tag needs styling.

## SEO

- Root layout (`src/app/layout.tsx`) sets `metadataBase`, a title
  template (`%s | Codezun`), OpenGraph/Twitter defaults, and a
  sitewide `Organization` JSON-LD script.
- **Every page needs its own `title` (no hardcoded "— Codezun" suffix
  — the template adds it), `description`, and `alternates.canonical`.**
  Forgetting `canonical` on a new top-level page means it silently
  inherits the homepage's canonical (a real bug fixed once already:
  `/blog` and `/ciudades` both did this).
- `src/app/sitemap.ts` / `robots.ts` are code-generated
  (`MetadataRoute.Sitemap` / `.Robots`), not static files. New routes
  must be added here manually (blog posts and cities are already
  derived automatically from `lib/blog.ts` / `lib/cities.ts`).
- `src/app/opengraph-image.tsx` (sitewide) and
  `src/app/blog/[slug]/opengraph-image.tsx` (per-post, needs its own
  `generateStaticParams` — it does not inherit the page's) generate
  branded PNG cards via `next/og`'s `ImageResponse`, embedding the
  real logo as base64.
- JSON-LD patterns already in place: `Organization` (sitewide),
  `Article` (blog posts), `BreadcrumbList` (blog posts + city pages),
  `Service` (city pages — **not** `LocalBusiness`: Codezun is fully
  remote with no physical office per city, and `LocalBusiness` implies
  a real address, which would be dishonest here. Keep using `Service`
  + `areaServed` for any new local page).
- Blog listing pagination is a dynamic route (`ƒ` in the build output,
  due to `searchParams`) with per-page `title`/`canonical` via
  `generateMetadata` — don't revert it to a static `metadata` export.

## Content policy (carried over from the original brief, still applies)

- No fabricated stats, client counts, testimonials, or claims of
  existing clients/work in a specific city — the company is young and
  the copy should stay honest. When in doubt, phrase things as
  capability/offer ("podemos ayudar a...") rather than a claim of past
  work.
- No custom-drawn icons for things a standard library already covers
  — but WhatsApp is the confirmed exception (see above) since no
  library has it.
- Don't invent pricing figures anywhere (see the blog's pricing-guide
  article: it discusses *factors* affecting price, never a number).

## Known environment gotchas (from building this project)

- **No outbound network access to arbitrary external hosts** in this
  sandbox (confirmed via the agent-proxy status endpoint — every
  external domain tested came back policy-denied). This means: you
  cannot fetch a live site's favicon/logo, cannot verify a hand-drawn
  icon against the "real" original asset, and cannot npm-install from
  anywhere but the allowlisted registries. When the user wants an
  external asset (a logo, a photo), ask them to upload it to the repo
  (they've done this twice via GitHub's web UI, landing on `main`
  directly) rather than trying to fetch it yourself.
- **Negative `z-index` inside an element that has its own background
  paints *behind* that background**, not in front of it, in this
  browser/renderer — this bit us twice (the Hero's decorative glow,
  the WhatsApp button's ping ring). If a decorative absolutely-
  positioned child seems to render as invisible, check for this before
  assuming it's an opacity/color issue: give the content sibling an
  explicit `z-10`+`relative` and the decorative element `z-0`, don't
  rely on negative z-index against a parent that has `bg-*`.
- Playwright full-page screenshots (`fullPage: true`) taken while
  `FadeIn`'s `whileInView` animations are in play can show blank gaps
  where content hasn't faded in yet — this is a screenshot-timing
  artifact, not a real bug. Verify with real incremental scrolling
  (`window.scrollTo` + wait) before concluding content is missing.
- Stale `next dev`/`next start` processes on port 3100 from earlier
  verification passes are a recurring source of confusing 500s/stale
  responses in this session — check `ss -ltnp | grep 3100` (or
  `fuser 3100/tcp`) for a leftover PID before assuming a code change
  broke something.
- `playwright` is installed with `--no-save` for one-off visual
  verification and uninstalled again afterward — it's not a project
  dependency, don't leave it in `package.json`.
