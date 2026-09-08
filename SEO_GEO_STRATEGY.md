# SEO & GEO Implementation Blueprint: Glasgow Landscaping Master Strategy

This document serves as the absolute technical and content specification for building out the front-end SEO, Generative Engine Optimization (GEO), and Answer Engine Optimization (AEO) structure for our Glasgow landscaping business.

## 1. Siloing & Information Architecture (IA)

We run a strict Physical/Directory Silo Architecture. Content must never cross-link outside its parent silo unless using contextually relevant bottom-silo links to prevent PageRank leakage.

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
│   └── /clarkston/
│
└── /knowledge-base/ (Topical Authority Silo)
    ├── /cost-guides/
    └── /glasgow-garden-maintenance/
```

### Linking Rules
- **Parent-to-Child**: Category hubs link down to exact service sub-pages.
- **Child-to-Parent**: All service pages breadcrumb back to `/landscaping-services/`.
- **Cross-Silo (Geo to Service)**: Location pages (`/locations/bearsden/`) link ONLY to specific service sub-pages with exact contextual anchor text (e.g., "Read about our Bearsden porcelain paving process").

## 2. On-Page SEO Formulas & Metadata Rules

Every page generated MUST adhere strictly to the exact Title Tag and Heading structures defined below.

### A. Title Tag Formula

`BEST [Primary Category] [Area] - If you're looking for [Service] near me or [Secondary Service] near me - [Business Name] is the #1 [Primary Category] in Glasgow`

**Example (Paving Page):**
`BEST Porcelain Paving Bearsden - If you're looking for patio installers near me or garden drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow`

### B. Heading Tag Rules

- **H1**: `[Primary Category] in [Area]`
- **H2s**: `[Secondary Category 1]`, `[Secondary Category 2]`, `[Location Pain Point / Solution]`
- **H3s**: Specific features, micro-services, and local sub-neighbourhoods.

#### Heading Template for Service Pages:
- **H1**: Porcelain Paving & Patio Installation in Bearsden
- **H2**: Driveway Installers & Hardscaping Near Me
- **H2**: Garden Drainage Solutions for Clay Soil & Wet Glasgow Weather
- **H2**: Frequently Asked Questions About Paving in Bearsden
- **H3**: Geotextile Membrane & MOT Type 1 Sub-Base Prep
- **H3**: Scottish Whinstone & Resin Bound Driveway Options

## 3. GEO & AEO Content Optimization Rules

AI Engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) extract concise, authoritative, and direct answers.

### A. The "3-Second Direct Answer" Rule

The first paragraph under ANY H2 query or FAQ item MUST begin with a 20-35 word direct statement answering the query before adding deeper narrative detail.

**Example:** "How long does a porcelain patio take to lay in Glasgow?"
**Direct Answer:** "A standard 40m² porcelain patio in Glasgow takes 5 to 7 working days to complete, including excavation, sub-base compaction, and weather-sheltered mortar installation."

### B. High-Impact Topical & Local Relevance Vectors

Incorporate local environmental context into content to establish local entity trust:
- **Glasgow Clay Soil (Boulders/Till)**: Mention how wet weather turns clay into a bog and why a 150mm–200mm MOT Type 1 sub-base is required.
- **BS7533 Standards**: Reference British Standards for paving installation to signal technical expertise.
- **Tenement/Suburban Access**: Address real local hurdles (narrow alleyways, shared lanes in the West End vs. open access in Newton Mearns).

## 4. Technical Schema Engine (JSON-LD)

Inject comprehensive JSON-LD schema into Next.js layouts (`/app/layout.tsx` or dynamic route wrappers).

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LandscapingBusiness",
      "@id": "https://riverside-landscaping.co.uk/#business",
      "name": "Riverside Landscaping",
      "url": "https://riverside-landscaping.co.uk",
      "telephone": "+447507604713",
      "priceRange": "££-£££",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "46 West George Street",
        "addressLocality": "Glasgow",
        "postalCode": "G2 4LL",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 55.8642,
        "longitude": -4.2518
      },
      "areaServed": [
        { "@type": "City", "name": "Glasgow" },
        { "@type": "Place", "name": "Bearsden" },
        { "@type": "Place", "name": "Newton Mearns" },
        { "@type": "Place", "name": "West End Glasgow" }
      ],
      "knowsAbout": [
        "Porcelain Paving",
        "Sub-Base Garden Drainage",
        "Scottish Whinstone Retaining Walls",
        "Driveway Installation",
        "Winter Hardscaping"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://riverside-landscaping.co.uk/porcelain-paving-glasgow/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can you lay porcelain paving during Glasgow winters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We use rapid-setting frost-proof mortars and weather-sheltered working rigs. As long as ground temps remain above 0°C, hardscaping can safely continue through winter."
          }
        }
      ]
    }
  ]
}
```

## 5. Phased Implementation Roadmap

Antigravity must execute this plan systematically across 4 phases:
`[Phase 1: Foundation] ──► [Phase 2: Core Silos] ──► [Phase 3: Hyper-Local] ──► [Phase 4: GEO/AEO Authority]`

### Phase 1: Technical & Schema Infrastructure
- Set up global Next.js routing matching the physical silo structure.
- Build dynamic Meta & Schema generation handlers supporting LandscapingBusiness, Service, and FAQPage JSON-LD.
- Generate dynamic sitemap.xml and robots.txt prioritizing `/landscaping-services/` and `/locations/`.

### Phase 2: Core Hubs & Service Pages
- Build out Homepage, `/landscaping-services/` (Hub), and main transactional child pages.
- Enforce Title Tag formula, H1/H2 hierarchy, and the 3-Second Direct Answer rule across all service pages.
- Embed before/after comparison components and winter CTA conversion triggers on every service page.

### Phase 3: Location Page Expansion (GEO Dominance)
- Deploy target suburb pages (`/locations/bearsden/`, `/locations/newton-mearns/`).
- Populate each with location-specific contextual signals (clay soil depth, rainfall mitigation, specific housing style references).
- Implement cross-silo internal links from location pages directly to core service pages.

### Phase 4: Topical Authority Engine (AEO Capture)
- Deploy knowledge base hub (`/knowledge-base/`).
- Publish high-intent local question guides (e.g., "How Much Does a Patio Cost in Glasgow? [2026 Price Breakdown]").
- Connect all informational articles back to the main transactional service pages using exact match anchor text.
