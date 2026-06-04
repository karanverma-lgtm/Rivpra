# Rivpra Formulations — Codebase Structure & Architecture Guide

This document maps out the file structure, component responsibilities, styling configurations, and core design patterns of the **Rivpra Formulations** codebase. Use this as a reference guide to onboard quickly or when adding new features.

---

## 1. Project Directory Tree

Below is the directory structure highlighting key source files, configurations, and public assets:

```
Rivpra/
├── app/                          # Next.js App Router (Layout & Entry Page)
│   ├── favicon.ico               # Tab icon
│   ├── globals.css               # Tailwind CSS v4 styling & custom @theme rules
│   ├── layout.tsx                # Root layout with fonts, metadata, & Lenis wrapper
│   └── page.tsx                  # Home page assembly of all section components
│
├── components/                   # Core UI components (Interactive Client Components)
│   ├── SmoothScroll.tsx          # Lenis Smooth Scrolling & GSAP Ticker link
│   ├── Navbar.tsx                # Responsive top navigation (desktop) + bottom tab-bar (mobile)
│   ├── Hero.tsx                  # Hero section with a glassmorphism contact/enquiry form
│   ├── StatsStrip.tsx            # Infinite horizontal marquee of client logos
│   ├── Welcome.tsx               # Intro with a 3D R3F DNA Helix & embedded YouTube video
│   ├── About.tsx                 # Company overview cards & animated stat counter
│   ├── Strengths.tsx             # Honeycomb hex-grid layout (desktop) / card grid (mobile)
│   ├── Services.tsx              # Product/therapy area cards (8 divisions)
│   ├── ManufacturingUnit.tsx     # Facility description, annual capabilities, & photo marquee
│   ├── Quality.tsx               # Quality policy cards, checklist, & animated "Q" badge
│   ├── Exports.tsx               # International reaches, map, & double accreditation marquee
│   ├── Markets.tsx               # Domestic vs. International market grid cards
│   ├── Contact.tsx               # Direct enquiry form + local office contact details
│   ├── Footer.tsx                # Nav links, licensing information, & copyrights
│   └── Manufacturing.tsx         # [UNUSED] Alternative manufacturing flow (GSAP ScrollTrigger)
│
├── public/                       # Static public assets (referenced relative to root `/`)
│   ├── Rivpra Logo.svg           # Main SVG logo
│   ├── clients/                  # Client logo images (client_image_1..10.jpg)
│   ├── exports/                  # Accreditation badge assets (1-1..1-24.png)
│   ├── Unit/                     # Manufacturing plant infrastructure photos (1..14.jpg)
│   └── images1/                  # Therapy/product area icon PNGs (pic-1..8-150x150.png)
│
├── next.config.ts                # Next.js config
├── tsconfig.json                 # TypeScript setup & alias paths (@/* -> ./*)
├── postcss.config.mjs            # PostCSS wrapper configuration
├── eslint.config.mjs             # ESLint config
├── package.json                  # Dependencies & scripts
└── REFERENCE.md                  # Detailed company information, timeline and history log
```

---

## 2. Layout & Page Assembly

The application is structured as a **Single-Page Application (SPA)** with sections stacked vertically. Navigating to any link scrolls the viewport smoothly to the corresponding HTML section anchor ID.

### Section Anchors & IDs

| Component | Anchor ID | Mobile Nav Active? | Description |
| :--- | :--- | :--- | :--- |
| **`Navbar`** | *N/A (Fixed)* | *N/A* | Top fixed bar (desktop) and bottom navigation (mobile). |
| **`Hero`** | `none` | `Home` | Headline, key stats, floating badges, and the Enquiry glass form. |
| **`StatsStrip`** | `none` | `Home` | Carousel of client logos. |
| **`Welcome`** | `welcome` | `Home` | Corporate summary, 3D DNA, and corporate video. |
| **`About`** | `about` | `About` | Corporate introduction, 4 category blocks. |
| **`Strengths`** | `strengths` | `About` | 8 key strengths displayed inside a honeycomb hex grid. |
| **`Services`** | `services` | `Services` | 8 product/therapy segments. |
| **`ManufacturingUnit`** | `manufacturing` | `Services` | Factory details, production capacity, infrastructure photos marquee. |
| **`Quality`** | `quality` | `Quality` | Standard certifications, quality policies, and glowing badges. |
| **`Exports`** | `exports` | `Quality` | 15+ export accreditations and 24 accreditation images. |
| **`Markets`** | `markets` | `Quality` | Domestic and export markets. |
| **`Contact`** | `contact` | `Contact` | Enquiry forms and office contacts. |
| **`Footer`** | `none` | `Contact` | Footer navigation and branding. |

---

## 3. Design System & Styling (Tailwind v4)

Styling configuration is defined directly inside `app/globals.css` using the Tailwind CSS v4 `@theme inline` block:

### Brand Color Tokens
- **Blue/Teal (`--color-blue` / `--color-teal`)**: `#1fb8e5` (Primary accents, icons, and focus states)
- **Amber (`--color-amber`)**: `#f6b11b` (Secondary accents, buttons, and stats counter)
- **Yellow (`--color-yellow`)**: `#ddd82a` (Tertiary accents)
- **Foreground (`--color-foreground`)**: `#0f172a` (Deep Slate for text)
- **Background (`--color-background` / `--color-dark`)**: `#ffffff` (Pure White theme)

### Key Typography Patterns
- **Font Family**: Inter (imported via `next/font/google` in `layout.tsx` and mapped to `--font-sans`).
- **Heading Text**: Heavy weights (`font-black`), usually paired with gradient fills:
  ```css
  bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text text-transparent
  ```
- **Body Text**: Light weights (`font-light` / Slate-500 or Slate-600) for high legibility.

### Custom Animations & Utilities
Defined as inline theme keys in CSS:
- `--animate-gradient-shift`: `gradient-shift 3s linear infinite`
- `--animate-shimmer`: `shimmer 2s linear infinite`

---

## 4. Key Engineering & Interaction Patterns

### 1. Hybrid Responsive Navigation
The `Navbar.tsx` component is dynamically adaptive:
- **Desktop**: A standard top fixed bar that hides when scrolling down and reveals when scrolling up to maximize viewport space.
- **Mobile/Tablet**: A fixed, app-like bottom navigation dock (inspired by Amazon/Nykaa UI) featuring clean SVG icons and micro-indicators mapping active sections.
- **Scroll Padding**: A global padding `pb-20` is declared on the `<main>` tag in `app/page.tsx` for mobile screen sizes to prevent the bottom navigation dock from overlaying important content or buttons.

### 2. Smooth Scrolling & GSAP Integration
- **`SmoothScroll.tsx`** sets up **Lenis** scroll management.
- It connects the Lenis update loops to **GSAP** `ScrollTrigger` to coordinate smooth web animations with scroll positions.
- Integrates a frame-rate-independent ticker callback using `gsap.ticker.add`.

### 3. Hexagonal Honeycomb (CSS Clip-Paths)
- In `Strengths.tsx`, desktop sizes display cells structured into a hexagonal honeycomb grid.
- Uses CSS `clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)` to render individual elements.
- Alternating row margins are offset to overlap cells correctly and form a seamless honeycomb structure.

### 4. 3D WebGL (React Three Fiber & Drei)
- **DNA Helix** (`Welcome.tsx`): Built inside a `<Canvas>` wrapper. Renders two intertwined spirals using `@react-three/drei` `<Line>` components connected by cross rungs. A `useFrame` hook continuously increments the rotation of the group mesh.
- *Note*: Particle Fields were originally utilized in the Hero component, but were updated to a glassmorphic layout to optimize loading speeds and lead generation.

---

## 5. Development Tasks & Commands

Use the following scripts in the package root to manage the project:

- **Run Dev Server**:
  ```bash
  npm run dev
  ```
- **Compile Production Build**:
  ```bash
  npm run build
  ```
- **Preview Production Build**:
  ```bash
  npm run start
  ```
- **Code Linting Check**:
  ```bash
  npm run lint
  ```
