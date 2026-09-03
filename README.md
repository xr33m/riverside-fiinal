# Master Implementation Plan: Riverside Landscaping / Arden Works
## Ultra-Clean, High-Converting Hardscaping Landing Page & Scalable Multi-Location Engine (Glasgow Suburbs)

### Executive Summary
**Arden Works / Riverside Landscaping** is a premium hardscaping & landscape engineering business operating in Greater Glasgow, targeting high-net-worth residential suburbs including **Bearsden (G61)**, **Newton Mearns (G77)**, **Clarkston (G76)**, **Giffnock (G46)**, **Milngavie (G62)**, and **Kilmacolm (PA13)**. 

The application combines a **£10k luxury design aesthetic** (smooth parallax scrolling, glassmorphism, architectural grid overlays, Higgsfield AI cinematic video loops) with a **scalable GEO/SEO engine** capable of dynamically generating hyper-localized suburb & service pages for AI Search Engine Optimization (AEO/GEO).

---

### Tech Stack & Architectural Overview
- **Framework**: Next.js 16 (App Router with dynamic `[slug]` routing & 301 legacy redirects in `next.config.mjs`)
- **Styling**: Tailwind CSS v4, Custom CSS tokens in `globals.css` (Deep Forest Green `#1b3b2b`, Dark Slate `#22252a`, Warm Clay `#c87d55`, Crisp White `#ffffff`)
- **Animation & Video**: Framer Motion 13+ (`useScroll`, `useTransform`, `useSpring`), Higgsfield AI Video Hero Loops (`WebM`/`MP4` with poster fallbacks)
- **Icons**: Lucide React
- **Analytics & Tracking**: Event logging in `lib/analytics.ts` + Vercel Analytics integration
- **SEO & AEO**: Semantic HTML5, linked `@graph` JSON-LD structured data (`LocalBusiness`, `Service`, `Place`, `FAQPage`) optimized for Google SGE, ChatGPT, and Perplexity.

---

### Synthesized Master Feature Matrix

| Feature Section | Bolt Plan | Gemini Plan | Our Strategic & Design Elevation | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Section** | AEO headline, subhead, season toggle, trust badges | Summer/Winter toggle, AEO copy, trust strip | Higgsfield AI dual cinematic video loops, scroll parallax, scarcity badge | Built (Refining) |
| **Before/After Proof** | Drag-to-reveal slider + metric callouts | Flooded clay vs. porcelain patio + 100% water mitigation | Multi-angle project toggle & smooth inertia drag | Built |
| **AEO FAQ Accordion** | Conversational Scottish Q&As for AI scraping | 3 specific local Q&A items (£120-£180/m² pricing) | Search-optimized structured Schema markup | Built |
| **Lead Survey Modal** | 3-Step survey, postcode check, sticky mobile CTA bar | Postcode validator (Bearsden, Newton Mearns, etc.) | Server API endpoint lead persistence (`/api/survey`) | Partial (API pending) |
| **Portfolio Showcase** | Recommended as suggestion | - | Tagged grid by suburb with lightbox detail modal | To Build |
| **Testimonials** | Recommended as suggestion | - | 3-4 card grid with verified suburb badges & star ratings | To Build |
| **4-Step Process Timeline** | Recommended as suggestion | - | CAD/Blueprint line-draw animated excavation timeline | To Build |
| **Service Area Map** | Recommended as suggestion | - | Interactive postcode checker widget + regional map | To Build |
| **Footer Contact Options** | Recommended as suggestion | - | Click-to-call phone line & 1-step quick callback form | To Build |
| **ROI / Value Estimator** | - | - | Interactive patio lifespan & home value boost calculator | Proposed |
| **Legacy 301 Redirects** | Recommended | - | `next.config.mjs` rules for `.html`, `.php`, and old service URLs | Built |
| **Scalable GEO Architecture**| - | - | Dynamic `[slug]` pages for suburbs & services with linked JSON-LD | Phase 6 |

---

### Higgsfield AI Hero Video Integration Strategy

Using **Higgsfield AI** for the Hero design will instantly transform the site into an ultra-luxurious architectural Digest showcase:

#### 1. Dual-Season Cinematic Crossfade Video Loops
- 🎬 **Summer Mode Prompt**:
  > *"Cinematic slow dolly forward shot of a high-end architectural garden patio in Bearsden Glasgow, smooth large-format grey porcelain tiles, lush green lawn, warm summer golden hour sunlight filtering through birch trees, subtle water fountain feature trickling into dark granite basin, ultra-photorealistic, 8k resolution, architectural photography style, 60fps."*

- 🎬 **Winter Mode Prompt**:
  > *"Exact same camera angle in winter twilight: warm outdoor fire pit glowing with soft amber flames, warm low-voltage LED strip lights beneath cantilevered steps illuminating rain-dappled porcelain paving, crisp winter air with gentle mist rising, warm ambient outdoor living room feel, ultra-photorealistic, 8k resolution, 60fps."*

---

### Legacy 301 Redirect Strategy (`next.config.mjs`)
To ensure zero domain authority drop or lost traffic during launch, all legacy URLs are permanently mapped:
- `/services.html` & `/services` ➔ `/#services`
- `/contact.html` & `/contact` ➔ `/#contact`
- `/gallery.html` & `/portfolio` ➔ `/#portfolio`
- `/landscaping-bearsden` ➔ `/areas/bearsden`
- `/patios-newton-mearns` ➔ `/areas/newton-mearns`
- `/*.html` & `/*.php` ➔ Clean canonical Next.js routes.

---

### Detailed Implementation Phases

#### Phase 1: Foundation & Brand Design System
- [x] Next.js App Router & Tailwind CSS setup.
- [x] Configure brand color tokens (`--primary`, `--accent`, `--foreground`, `--background`, `--muted`).
- [x] Establish typography hierarchy (Georgia serif headers + clean sans-serif body).
- [x] Create shared UI primitives (buttons, badges, sticky bar, accessibility helpers).

#### Phase 2: Hero Section, Season Switch & Trust Strip
- [x] **AEO Headline**: *"Bespoke Patios & Landscaping Engineered For Glasgow Weather"*
- [x] **Subheadline**: *"Eliminate waterlogged lawns with BS7533-compliant deep sub-base drainage. Installed year-round across Greater Glasgow."*
- [x] **Summer / Winter Toggle**: Framer Motion switch swapping visuals and copy.
- [x] **Trust Strip**: 5.0 ★ Google Rating (128 reviews), Marshall's Approved Installer, 10-Year Guarantee.
- [ ] **Higgsfield AI Video Integration**: Video loops for Summer/Winter modes with WebM/MP4 support & poster fallback.
- [ ] **Parallax Depth Layering**: Implement Framer Motion `useScroll` scroll-driven background transform.

#### Phase 3: Interactive Proof & Objection Handling
- [x] **Drag-to-Reveal Before/After Slider**: Waterlogged clay garden vs. finished porcelain patio with 100% water mitigation callout.
- [x] **Off-Season Conversion Banner**: Highlight winter booking incentives to beat 12-week spring backlog.
- [x] **AEO Accordion (GEO-targeted Q&As)**: Scottish dialect Q&As covering winter laying, clay drainage, and per m² pricing.

#### Phase 4: Lead Funnel, Multi-Step Modal & Mobile UX
- [x] **3-Step Lead Modal**: Goal select, Postcode check (G61, G77, G76, G46), Contact details.
- [x] **Mobile Sticky CTA Bar**: Floating bottom bar.
- [ ] **Lead Persistence API Route**: `/api/survey/route.ts` storing submissions & sending email dispatches.

#### Phase 5: £10k Design Elevation & Component Expansion
- [ ] **Scroll Parallax & Glassmorphic Header Bar**: Smooth dynamic shrinking header with glassmorphism blur.
- [ ] **Blueprint Grid Overlay & Line-Draw Traces**: Architectural grid & animated SVG borders on scroll.
- [ ] **Portfolio Showcase Grid**: Tagged luxury project cards with suburb tags & modal lightbox.
- [ ] **4-Step CAD Engineering Timeline**: Consultation -> Excavation & Geotextile -> BS7533 Sub-Base & Permeable Drainage -> Porcelain Handover.
- [ ] **Interactive Material Swatch Switcher**: Italian Porcelain, Whinstone channels, Pergola slating.
- [ ] **Interactive Service Area Coverage Map**: Postcode search widget with instant area verification.
- [ ] **ROI & Value Estimator Component**: Interactive patio lifespan & home value boost calculator.

#### Phase 6: Legacy Migration, Scalable GEO Engine & Production Deployment
- [x] Legacy 301 Redirect rules configured in `next.config.mjs`.
- [ ] Implement `lib/geo-data.ts` and `lib/services-data.ts`.
- [ ] Build dynamic route `/areas/[slug]/page.tsx` for suburban landing pages.
- [ ] Build dynamic route `/services/[slug]/page.tsx` for hardscaping services.
- [ ] Linked `@graph` JSON-LD schema output for AI search engine ranking.
- [ ] Dynamic Sitemap generator (`app/sitemap.ts`).
- [ ] Final production build & accessibility audit (`npm run build`).

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
