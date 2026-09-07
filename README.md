# Master Implementation Plan: Riverside Landscaping / Arden Works
## Ultra-Clean, High-Converting Hardscaping Landing Page & Scalable Multi-Location Engine (Glasgow Suburbs)

### Executive Summary
**Arden Works / Riverside Landscaping** is a premium hardscaping & landscape engineering business operating in Greater Glasgow, targeting high-net-worth residential suburbs including **Bearsden (G61)**, **Newton Mearns (G77)**, **West End Glasgow (G12)**, **Clarkston (G76)**, **Giffnock (G46)**, **Milngavie (G62)**, and **Kilmacolm (PA13)**. 

The application combines a **£10k luxury design aesthetic** (smooth parallax scrolling, glassmorphism, architectural grid overlays, Higgsfield AI cinematic video loops) with a **scalable GEO/SEO physical silo engine** adhering to [`SEO_GEO_STRATEGY.md`](./SEO_GEO_STRATEGY.md) specifications for AI Search Engine Optimization (AEO/GEO).

---

### Physical Silo Information Architecture (IA)
```
/ (Home: Glasgow Master Hub)
│
├── /landscaping-services/ (Core Category Hub)
│   ├── /porcelain-paving-glasgow/
│   ├── /driveway-installers-glasgow/
│   ├── /garden-drainage-solutions-glasgow/
│   └── /decking-fencing-glasgow/
│
├── /locations/ (GEO Location Silo)
│   ├── /bearsden/
│   ├── /newton-mearns/
│   ├── /west-end-glasgow/
│   ├── /clarkston/
│   ├── /giffnock/
│   └── /milngavie/
│
└── /knowledge-base/ (Topical Authority Silo)
    ├── /cost-guides/
    └── /glasgow-garden-maintenance/
```

---

### Tech Stack & Architectural Overview
- **Framework**: Next.js 16 (App Router with dynamic `[slug]` physical silos & 301 legacy redirects in `next.config.mjs`)
- **Styling**: Tailwind CSS v4, Custom CSS tokens in `globals.css` (Deep Forest Green `#1b3b2b`, Dark Slate `#22252a`, Warm Clay `#c87d55`, Crisp White `#ffffff`)
- **Animation & Video**: Framer Motion 13+ (`useScroll`, `useTransform`, `useSpring`), Higgsfield AI Video Hero Loops (`WebM`/`MP4` with poster fallbacks)
- **Icons**: Lucide React
- **Analytics & Tracking**: Event logging in `lib/analytics.ts` + Vercel Analytics integration
- **SEO & AEO Engine**: Title tag formulas (`BEST [Category] [Area] - ...`), 3-Second Direct Answer blocks (20–35 words), BS7533 standards, Glasgow clay soil context, linked `@graph` JSON-LD schema (`LandscapingBusiness`, `Service`, `Place`, `FAQPage`).

---

### Completed Blueprint Implementation Phases

#### Phase 1: Technical & Schema Infrastructure
- [x] Global Next.js routing established for physical silos (`/landscaping-services/`, `/locations/`, `/knowledge-base/`).
- [x] Dynamic `@graph` JSON-LD Schema builder in `lib/content.ts` handling `LandscapingBusiness`, `Service`, `Place`, and `FAQPage`.
- [x] Dynamic `sitemap.ts` and `robots.ts` prioritizing category and location silos.

#### Phase 2: Core Hubs & Service Pages
- [x] Built category hub `/landscaping-services/` and transactional child pages (`porcelain-paving-glasgow`, `driveway-installers-glasgow`, `garden-drainage-solutions-glasgow`, `decking-fencing-glasgow`).
- [x] Enforced exact Title Tag formulas, H1/H2/H3 tag hierarchies, and 3-Second Direct Answer blocks.
- [x] Embedded before/after comparison components and winter CTA conversion triggers.

#### Phase 3: Location Page Expansion (GEO Dominance)
- [x] Deployed target suburb pages (`/locations/bearsden/`, `/locations/newton-mearns/`, `/locations/west-end-glasgow/`, `/locations/clarkston/`, `/locations/giffnock/`, `/locations/milngavie/`).
- [x] Contextual signals incorporated (Glasgow heavy boulder clay, 150mm–200mm MOT sub-base, West End tenement lane access vs. suburban driveway access).
- [x] Strict cross-silo internal links linking location pages exclusively to core service pages with exact contextual anchor text.

#### Phase 4: Topical Authority Engine (AEO Capture)
- [x] Deployed knowledge base hub `/knowledge-base/`.
- [x] Published 2026 pricing breakdowns & maintenance guides (`cost-guides`, `glasgow-garden-maintenance`).
- [x] Connected all informational articles back to transactional service pages using exact match anchor text.

---

### Local Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Verify production build
npm run build
```
