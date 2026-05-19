# Rivpra Formulations — Codebase Reference

> **Last updated:** 2026-05-19  
> **Status:** Running (`npm run dev` — Next.js 16.2.3 dev server)

---

## 1. Project Overview

**Rivpra Formulations** is a single-page corporate website for a pharmaceutical company based in Haridwar, India. The site showcases the company's products, manufacturing capabilities, quality certifications, export reach, and provides a contact form for business inquiries.

- **Type:** Static marketing / corporate website (single page, scroll-based)
- **Industry:** Pharmaceutical — contract manufacturing, formulation development, generic medicines
- **Company tagline:** "A Trusted Pharmaceutical Partner"
- **Established:** 2008 | Location: SIDCUL, Haridwar, Uttarakhand

---

## 2. Tech Stack

| Layer            | Technology                                         |
| ---------------- | -------------------------------------------------- |
| **Framework**    | Next.js `16.2.3` (App Router)                      |
| **Language**     | TypeScript `^5`                                    |
| **React**        | `19.2.4`                                           |
| **Styling**      | Tailwind CSS `v4` (with `@tailwindcss/postcss`)    |
| **Animations**   | Framer Motion `^12.38.0` + GSAP `^3.14.2`         |
| **3D Graphics**  | Three.js `^0.183.2` + React Three Fiber `^9.5.0` + Drei `^10.7.7` |
| **Smooth Scroll**| Lenis `^1.3.21`                                    |
| **Font**         | Inter (Google Fonts, loaded via `next/font`)       |
| **Linting**      | ESLint `^9` with `eslint-config-next`              |
| **Build**        | `next build` → `.next/` output                     |

---

## 3. Project Structure

```
Rivpra/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — Inter font, SmoothScroll wrapper, metadata
│   ├── page.tsx                  # Home page — assembles all section components
│   ├── globals.css               # Tailwind v4 imports, theme tokens, keyframes, Lenis CSS
│   └── favicon.ico
│
├── components/                   # All UI components (client-side, "use client")
│   ├── SmoothScroll.tsx          # Lenis smooth-scroll provider (wraps children in layout)
│   ├── Navbar.tsx                # Fixed top navbar with scroll-hide, mobile menu
│   ├── Hero.tsx                  # Full-screen hero with 3D particle field, cycling words
│   ├── StatsStrip.tsx            # Client logo marquee (infinite scroll carousel)
│   ├── Welcome.tsx               # Intro section with 3D DNA helix + YouTube embed
│   ├── About.tsx                 # Company overview, highlight cards, animated stats
│   ├── Strengths.tsx             # Hexagonal honeycomb grid showcasing 8 strengths
│   ├── Services.tsx              # Product/therapy area cards (8 categories)
│   ├── Manufacturing.tsx         # ⚠️ UNUSED — alternative manufacturing section
│   ├── ManufacturingUnit.tsx     # Facility details, capabilities, image marquee
│   ├── Quality.tsx               # Quality certifications, checklist, visual badge
│   ├── Exports.tsx               # Global reach, accreditation badges marquee
│   ├── Markets.tsx               # Domestic & International market cards
│   ├── Contact.tsx               # Contact form with info cards (client-only, no backend)
│   └── Footer.tsx                # Footer with link columns, branding
│
├── public/                       # Static assets
│   ├── Rivpra Logo.svg           # Company logo (SVG, 34KB)
│   ├── clients/                  # 10 client logo images (client_image_1..10.jpg)
│   ├── exports/                  # 24 accreditation badge images (1-1..1-24.png)
│   ├── Unit/                     # 14 infrastructure photos (infrastructure_1..14.jpg)
│   ├── images1/                  # 8 product/therapy icons (pic-1..8-150x150.png)
│   ├── image_16..19.jpg          # Facility photos used in Strengths hexagons
│   ├── file.svg, globe.svg, window.svg  # Default Next.js SVGs (unused)
│   └── next.svg, vercel.svg      # Default Next.js SVGs (unused)
│
├── .env                          # GitHub repo URL + PAT token
├── next.config.ts                # Empty/default Next.js config
├── tsconfig.json                 # TypeScript config (ES2017, bundler resolution, @/* paths)
├── postcss.config.mjs            # PostCSS config (Tailwind plugin)
├── eslint.config.mjs             # ESLint config
├── AGENTS.md                     # AI agent rules for Next.js
├── CLAUDE.md                     # Minimal AI config
├── package.json                  # Project dependencies & scripts
└── dist/                         # Build output directory
```

---

## 4. Page Layout & Section Order

The entire site is a **single page** (`app/page.tsx`) with sections stacked vertically:

```
┌──────────────────────────────────────────────┐
│  Navbar          (fixed, scroll-hide/show)    │
├──────────────────────────────────────────────┤
│  Hero            (full-screen, 3D particles)  │  id: none
│  StatsStrip      (client logos marquee)        │  id: none
│  Welcome         (intro + DNA helix + video)   │  id: "welcome"
│  About           (company + highlight cards)   │  id: "about"
│  Strengths       (honeycomb hexagon grid)      │  id: "strengths"
│  Services        (product therapy cards)       │  id: "services"
│  ManufacturingUnit (facility + capabilities)  │  id: "manufacturing"
│  Quality         (certifications + checklist)  │  id: "quality"
│  Exports         (accreditations + marquee)    │  id: "exports"
│  Markets         (domestic + international)    │  id: "markets"
│  Contact         (form + info cards)           │  id: "contact"
│  Footer          (links, branding, copyright)  │  id: none
└──────────────────────────────────────────────┘
```

> **Note:** `Manufacturing.tsx` exists as a component file but is **NOT** imported in `page.tsx`. Only `ManufacturingUnit.tsx` is used.

---

## 5. Component Detail Map

### 5.1 SmoothScroll.tsx
- **Purpose:** Wraps the entire app to provide Lenis smooth scrolling
- **Key logic:** Connects Lenis to GSAP ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)`
- **Config:** duration 1.2, smoothWheel enabled, vertical orientation
- **Used in:** `app/layout.tsx` (wraps `{children}`)

### 5.2 Navbar.tsx
- **Purpose:** Fixed top navigation bar
- **Key features:**
  - Scroll-aware: becomes opaque with backdrop blur after 50px scroll
  - Auto-hides on scroll down, reappears on scroll up
  - Framer Motion animated entrance and hamburger ↔ X toggle
  - Mobile drawer with staggered link animations
  - CTA button: "Get In Touch" → scrolls to `#contact`
- **Nav links:** About, Services, Manufacturing, Quality, Markets, Contact
- **Logo:** `/Rivpra%20Logo.svg` via `next/image`

### 5.3 Hero.tsx
- **Purpose:** Full-screen hero banner with immersive 3D background
- **3D element:** `ParticleField` — 3000 colored particles rendered with React Three Fiber
  - Uses seeded random for deterministic particle placement
  - Palette: `#1fb8e5`, `#f6b11b`, `#ddd82a`
  - Slow rotation animation via `useFrame`
- **Text animation:** GSAP timeline — title, subtitle, stats stagger in
- **Word cycling:** Cycles through "Reliable", "Trusted", "Innovative", "ISO-Certified" every 2.2s
- **Stats bar:** 6 stats (13+ years, 800+ SKUs, 100+ clients, 600+ formulations, 15+ accreditations, 20+ markets)
- **CTAs:** "Discover Rivpra" → `#about`, "Partner With Us" → `#contact`

### 5.4 StatsStrip.tsx
- **Purpose:** Infinite horizontal marquee of client logos
- **Data:** 10 client logo images from `/clients/` directory
- **Animation:** Framer Motion `animate={{ x: ["0%", "-50%"] }}` with duplicated track
- **Duration:** 25s per cycle, linear easing
- **Style:** Each logo in a rounded pill with alternating accent border colors

### 5.5 Welcome.tsx
- **Purpose:** Introduction section with 3D DNA helix visualization
- **3D element:** `DNAHelix` — double helix using `@react-three/drei` `Line` component
  - 3 turns, 14 points per turn, radius 1.5
  - Two strands (blue + amber) + rungs (yellow) + atom spheres
  - Slow rotation via `useFrame`
- **Content:** Company description, established 2008, debt-free messaging
- **Media:** YouTube embed (video ID: `AHv8a6qmiz8`)
- **CTA:** "View More" → `#about`
- **Decorative:** Glow blobs, corner accent on video container, ISO badge

### 5.6 About.tsx
- **Purpose:** Detailed company overview
- **Layout:** 2-column — text left, 4 highlight cards right (2×2 grid)
- **Highlight cards:** Generic & Branded Generic, Nutraceutical & Cosmetics, Contract Manufacturing, Licensing & Development
- **Stats row:** 15+ years, WHO cGMP, 100+ products, 2 global markets
- **Badges:** ISO Certified, WHO-cGMP, Debt-Free, Profit-Making
- **Sub-component:** `AnimatedStat` — animated scale-in stat counter

### 5.7 Strengths.tsx
- **Purpose:** Visual honeycomb grid of 8 company strengths
- **Layout (desktop md+):** Hexagonal tessellation with 4 rows + image cells interspersed
  - Uses CSS `clip-path: polygon()` for hex shapes
  - Fixed dimensions: W=182px, H=210px, GAP=4px
  - Rows alternate offset (half-hex) for tessellation
- **Layout (mobile):** Simple 2-column card grid (text-only, no images)
- **Strengths:** Robust Infrastructure, Innovative Drug Delivery, In-House Formulation, Approved Products, WHO-cGMP & ISO 9001:2015, 24×7 Support, In-House Laboratory, Zero Defect
- **Images used:** `image_16.jpg` through `image_19.jpg`
- **Sub-component:** `HexCell` — renders either image or text hex cell

### 5.8 Services.tsx
- **Purpose:** Product/therapy area showcase
- **Layout:** 4-column responsive grid (8 cards)
- **Products:** Nephrology & Transplant, Cardiovascular, Diabetology, Pediatrics, Neurology, General, Dermatology, Urology
- **Each card:** Product image, SVG icon, title, description, "Know more" link
- **Images:** `/images1/pic-1..8-150x150.png`

### 5.9 Manufacturing.tsx ⚠️ (NOT used in page.tsx)
- **Purpose:** Alternative manufacturing section (superseded by ManufacturingUnit.tsx)
- **Features:** GSAP ScrollTrigger animated vertical gradient line, product marquee, facility cards
- **Products listed:** Tablets, Capsules, HPMC Capsules, Syrups, Sachets, Multivitamins, Creams, Ointments, Lotions, Gels

### 5.10 ManufacturingUnit.tsx ✅ (active)
- **Purpose:** Manufacturing facility details and production capabilities
- **Layout:** Header + 2-column (description left, capabilities right) + image marquee
- **Capabilities (per shift per annum):**
  - Tablet: 374.50M | Capsule: 46.80M | Liquid: 15.60M bottles
  - Sachet: 3.12M | DPS: 4.68M bottles | Tubes: 5.0M | Lotion: 1.0M bottles
- **Image marquee:** 14 infrastructure photos from `/Unit/` directory, 40s loop
- **Badges:** WHO-cGMP, GMP Certified, ISO 9001:2015, SIDCUL Haridwar, In-House Testing

### 5.11 Quality.tsx
- **Purpose:** Quality certifications and compliance standards
- **Layout:** Center header + 4 certification cards + 2-column (checklist left, visual badge right)
- **Certifications:** ISO Certified, WHO-cGMP, SIDCUL Facility, Debt-Free
- **Quality points:** 6 bullet items about QC processes
- **Visual element:** Animated "Q" badge with pulsing gradient rings + stats (100% GMP, Zero Compromise)

### 5.12 Exports.tsx
- **Purpose:** International export reach and accreditations
- **Layout:** 2-column header + accreditation text marquee + 2-row badge image marquee
- **Accreditations (15):** WHO-GMP, ISO, AIRP Ivory Coast, PPB Kenya, NAFDAC Nigeria, MOH Afghanistan, FDA Philippines, MOH Azerbaijan, MOH Cambodia, FDA Vietnam, MOH Yemen, MOH Kazakhstan, MOH Iraq, MOH Kosovo, EFDA Ethiopia
- **Countries served (13):** Azerbaijan, Bolivia, Botswana, Cambodia, Dominican Republic, Georgia, Guatemala, Kenya, Kosovo, Myanmar, Nepal, Nigeria, Uzbekistan
- **Badge images:** 24 accreditation badge PNGs in 2 rows, opposite scroll directions

### 5.13 Markets.tsx
- **Purpose:** Domestic and international market overview
- **Layout:** 2 large cards side by side
- **Domestic card:** Pan-India distribution, hospitals, retail pharmacies, regional coverage
- **International card:** WHO-cGMP exports, competitive generics, regulatory support, flexible MOQ
- **CTA strip:** "Looking to partner with us?" → scrolls to `#contact`

### 5.14 Contact.tsx
- **Purpose:** Contact form and company info
- **Layout:** 2-column — info cards left, form right
- **Info cards:** Location, Specialization, Markets, Certification
- **Form fields:** Full Name, Email, Company Name, Area of Interest (dropdown), Message
- **Interest options:** Contract Manufacturing, Formulation Development, Product Licensing, Generic Medicines Supply, Nutraceuticals, Cosmetic Products, Other
- **Backend:** ❌ **None** — form `onSubmit` only sets `submitted=true` (client-side only)
- **Trust note:** "Trusted Since 2008" callout box

### 5.15 Footer.tsx
- **Purpose:** Site footer with branding and link columns
- **Columns:** Brand (logo + description + badges) | Company | Products | Services
- **Links:** Non-functional (cursor-default, no navigation)
- **Bottom bar:** Copyright + SIDCUL location

---

## 6. Design System & Theme

### Color Palette
| Token     | Hex       | Usage                                      |
| --------- | --------- | ------------------------------------------ |
| Blue/Teal | `#1fb8e5` | Primary accent, links, section highlights  |
| Amber     | `#f6b11b` | Secondary accent, badges, stats            |
| Yellow    | `#ddd82a` | Tertiary accent, alternating elements      |
| Background| `#ffffff` | Page background (light theme throughout)   |
| Foreground| `#0f172a` | Primary text color (slate-950)             |

### Typography
- **Font family:** Inter (via `next/font/google`)
- **Heading weights:** `font-black` (900)
- **Body text:** `font-light` (300)
- **Gradient text:** `bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text text-transparent`

### Animation Patterns
1. **Scroll-triggered entrance:** `useInView` (Framer Motion) with `once: true`, animate from opacity 0 + translate
2. **Staggered reveals:** Delay increments (0.05–0.15s) per item index
3. **Marquee scrolls:** `animate={{ x: ["0%", "-50%"] }}` with duplicated items
4. **GSAP timelines:** Hero entrance, word cycling
5. **GSAP ScrollTrigger:** Manufacturing gradient line (in unused component)
6. **Hover effects:** Scale, translate-y, border color changes, glow backgrounds
7. **CSS keyframes:** `gradient-shift` (background position), `shimmer`

### UI Patterns
- **Section badge:** Rounded pill with border `border-[#1fb8e5]/40` + bg `bg-[#1fb8e5]/10` + text `text-[#f6b11b]`
- **Cards:** `rounded-2xl border border-slate-200 bg-white` with hover glow overlays
- **Glow blobs:** Absolute-positioned blurred circles (`blur-[100px]–[120px]`)
- **Grid backgrounds:** Subtle linear-gradient grids at `opacity-[0.02]–[0.03]`
- **Scrollbar:** 4px wide, `#1fb8e5` thumb on white track

---

## 7. Key Configurations

### next.config.ts
- Empty / default — no custom config applied

### tsconfig.json
- Target: ES2017
- Module: ESNext with bundler resolution
- Path alias: `@/*` → `./*`
- Strict mode: enabled

### globals.css (Tailwind v4)
- Uses `@import "tailwindcss"` (v4 syntax)
- `@theme inline` block for custom tokens (colors, font, animations)
- Lenis smooth scroll CSS rules
- Custom scrollbar styling
- Selection highlight: `#1fb8e5` background

---

## 8. Known Issues & Notes

1. **No backend/API:** The contact form doesn't submit anywhere — purely client-side
2. **Unused component:** `Manufacturing.tsx` is not imported in `page.tsx` (only `ManufacturingUnit.tsx` is used)
3. **Duplicate section IDs:** Both `Manufacturing.tsx` and `ManufacturingUnit.tsx` use `id="manufacturing"`
4. **Footer links non-functional:** All footer links are `<span>` with `cursor-default`
5. **No routing:** Single-page app with no additional routes/pages
6. **No image optimization config:** Some images use `unoptimized` prop
7. **SEO:** Title and meta description set in `layout.tsx` metadata export

---

## 9. Scripts

```bash
npm run dev      # Start Next.js dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 10. Dependency Summary

### Production
| Package                | Version    | Purpose                          |
| ---------------------- | ---------- | -------------------------------- |
| `next`                 | `16.2.3`   | React framework                  |
| `react` / `react-dom`  | `19.2.4`   | UI library                       |
| `framer-motion`        | `^12.38.0` | Animation library                |
| `gsap` / `@gsap/react` | `^3.14.2`  | Advanced animations, ScrollTrigger|
| `three`                | `^0.183.2` | 3D rendering engine              |
| `@react-three/fiber`   | `^9.5.0`   | React renderer for Three.js      |
| `@react-three/drei`    | `^10.7.7`  | Three.js helpers (Line, etc.)    |
| `@types/three`         | `^0.183.1` | TypeScript types for Three.js    |
| `lenis`                | `^1.3.21`  | Smooth scroll library            |

### Dev
| Package                | Version | Purpose                    |
| ---------------------- | ------- | -------------------------- |
| `tailwindcss`          | `^4`    | Utility-first CSS          |
| `@tailwindcss/postcss` | `^4`    | PostCSS plugin for TW v4   |
| `typescript`           | `^5`    | TypeScript compiler        |
| `eslint`               | `^9`    | Linting                    |
| `eslint-config-next`   | `16.2.3`| Next.js ESLint rules       |
| `@types/node/react/react-dom` | `^20/^19/^19` | Type definitions |

---

## 11. Change Log

| Date       | Change Description                                        |
| ---------- | --------------------------------------------------------- |
| 2026-05-19 | Initial reference file created — full codebase documented |
| 2026-05-19 | Removed all section vertical padding (`py-28`/`py-32`/`py-10` → `py-0`) across 10 components |
| 2026-05-19 | Balanced spacing: set `py-12` on all sections (StatsStrip gets `py-6`). ~96px gap between sections — half the original |
| 2026-05-19 | Hero redesigned as two-column layout: text/CTAs left, 3D particle Canvas in visible container right. Stats bar spans full width below both columns. Floating badges added. |
| 2026-05-19 | Hero right column replaced with glassmorphism enquiry form (Name, Email, Phone, Interest, Message). Three.js/Canvas removed from Hero. Trust indicators + WHO-cGMP badge added. |
| 2026-05-19 | Hero spacing fix: reduced headline to `text-4xl`–`text-6xl`, changed grid to `items-start`, removed scroll indicator, tightened stats padding. |
| 2026-05-19 | Hero spacing fix: reduced headline to `text-4xl`–`text-6xl`, changed grid to `items-start`, removed scroll indicator, tightened stats padding. |
| 2026-05-19 | Implemented top-tier mobile responsive layout: added Amazon/Nykaa-style fixed bottom navigation bar with icons (`Navbar.tsx`), hid the enquiry form on mobile view (`Hero.tsx`), and added `pb-20` padding to `<main>` (`app/page.tsx`) to prevent content hiding behind the bottom nav. |
| 2026-05-19 | Upgraded Hero stats for mobile: changed layout to `grid-cols-2`, applied gradient typography (`bg-clip-text`), and enhanced GSAP entrance animation to an elastic `back.out(1.5)` pop with scaling for a premium UX. |
