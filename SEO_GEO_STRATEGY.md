# SEO & GEO Implementation Blueprint: Glasgow Landscaping Master Strategy

This document serves as the absolute technical and content specification for building out the front-end SEO, Generative Engine Optimization (GEO), and Answer Engine Optimization (AEO) structure for **Riverside Landscaping** (Official Website: `https://riverside-landscaping.co.uk`, Phone: `07507 604713`).

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
│   ├── /clarkston/
│   ├── /giffnock/
│   └── /milngavie/
│
└── /knowledge-base/ (Topical Authority Silo)
    ├── /cost-guides/
    └── /glasgow-garden-maintenance/
```

### Linking Rules
- **Parent-to-Child**: Category hubs link down to exact service sub-pages.
- **Child-to-Parent**: All service pages breadcrumb back to `/landscaping-services/`.
- **Cross-Silo (Geo to Service)**: Location pages (`/locations/bearsden/`) link ONLY to specific service sub-pages with exact contextual anchor text (e.g., "Read about our Bearsden porcelain paving process").

---

## 2. On-Page SEO Formulas & Metadata Rules

Every page generated MUST adhere strictly to the exact Title Tag and Heading structures defined below.

### A. Title Tag Formula

`BEST [Primary Category] [Area] - If you're looking for [Service] near me or [Secondary Service] near me - Riverside Landscaping is the #1 [Primary Category] in Glasgow`

**Example (Paving Page):**
`BEST Porcelain Paving Bearsden - If you're looking for patio installers near me or garden drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow`

### B. Heading Tag Rules

- **H1**: `[Primary Category] in [Area]`
- **H2s**: `[Secondary Category 1]`, `[Secondary Category 2]`, `[Location Pain Point / Solution]`
- **H3s**: Specific features, micro-services, and local sub-neighbourhoods.

---

## 3. GEO & AEO Content Optimization Rules

AI Engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) extract concise, authoritative, and direct answers.

### A. The "3-Second Direct Answer" Rule

The first paragraph under ANY H2 query or FAQ item MUST begin with a 20-35 word direct statement answering the query before adding deeper narrative detail.

**Example:** "How long does a porcelain patio take to lay in Glasgow?"
**Direct Answer:** "A standard 40m² porcelain patio in Glasgow takes 5 to 7 working days to complete by Riverside Landscaping, including excavation, sub-base compaction, and weather-sheltered mortar installation."

### B. High-Impact Topical & Local Relevance Vectors

Incorporate local environmental context into content to establish local entity trust:
- **Glasgow & Ayrshire Clay Soil (Boulders/Till)**: Mention how wet weather turns clay into a bog and why a 150mm–200mm MOT Type 1 sub-base is required.
- **BS7533 Standards**: Reference British Standards for paving installation to signal technical expertise.
- **Tenement/Suburban Access**: Address real local hurdles (narrow alleyways, shared lanes in the West End vs. open access in Newton Mearns).

---

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
        "streetAddress": "Central Depot",
        "addressLocality": "Glasgow",
        "postalCode": "G1 1AA",
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
    }
  ]
}
```

---

## 5. Phased Implementation Roadmap

Antigravity must execute this plan systematically across 4 phases:
`[Phase 1: Foundation] ──► [Phase 2: Core Silos] ──► [Phase 3: Hyper-Local] ──► [Phase 4: GEO/AEO Authority]`

---

## 6. Top-Ranker Wireframe Architecture for Area & Service Pages

To guarantee #1 local search rankings, AI engine citation, and maximum customer conversion rates, all area and service pages must conform to these high-performance wireframe blueprints:

### Blueprint A: Hyper-Local Area Page Wireframe (`/locations/[slug]`)
1. **Header & Breadcrumbs**: Child-to-parent navigation (`Home / Locations / [Suburb Name]`).
2. **Hero Section (Above the Fold)**:
   - H1: `Porcelain Paving & Landscaping in [Suburb Name]`
   - Trust Badges: 5.0 ★ Google Rating, 10-Year Guarantee, BS7533 Structural Standard.
   - Subhead highlighting local soil profile (e.g. Heavy Boulder Clay in G61).
3. **3-Second Direct Answer Banner**: Concise 20-35 word summary answering installation timeframe and sub-base depth.
4. **Hardscaping & Driveways Near Me Section**:
   - H2: `Driveway Installers & Hardscaping Near Me in [Suburb Name]`
   - Direct Answer paragraph.
   - H3: Site Access & Logistics Profile.
   - H3: Recommended Installation Method.
5. **Micro-Geography & Local Entity Vectors (Crucial for Rank #1)**:
   - **Main Arterial Roads**: Drymen Road (A809), Ayr Road (A77), Byres Road, Busby Road (A727).
   - **Key Landmarks**: Bearsden Cross, The Avenue Shopping Centre, Botanic Gardens, Clarkston Toll.
   - **Sub-Districts**: Thorn, Whitecraigs, Hyndland, Netherlee, Kilmardinny.
6. **GBP Driving Directions & Entity Link**:
   - Step-by-step driving directions from suburb landmarks directly back to Riverside Landscaping Central Depot (`G1 1AA`).
7. **Cross-Silo Transactional Links**: Links pointing exclusively to service sub-pages with exact anchor text ("Read about our [Suburb] porcelain paving process").
8. **3-Step Lead Calculator Trigger CTA**.

### Blueprint B: Topical Authority Service Page Wireframe (`/landscaping-services/[slug]`)
1. **Header & Breadcrumbs**: Child-to-parent navigation (`Home / Landscaping Services / [Service Name]`).
2. **Hero Section**:
   - H1: `[Primary Category] & Patio Installation in Glasgow & Ayrshire`
   - BS7533 Specification Badge + 10-Year Guarantee.
3. **3-Second Direct Answer Banner**: Concise summary answering price, timeline, and sub-base prep.
4. **Secondary Category & Clay Soil Mitigation Sections**:
   - H2: `Driveway Installers & Hardscaping Near Me`
   - H2: `Garden Drainage Solutions for Clay Soil & Wet Weather`
   - H3: Geotextile Membrane & MOT Type 1 Sub-Base Prep.
   - H3: Scottish Whinstone & Resin Options.
5. **Technical Build Specifications**: Checklist covering slurry primer, diamond cutting, and slot drainage.
6. **AEO FAQ Accordion**: Conversational Q&As with JSON-LD `@graph` schema output.
7. **Suburb Coverage Grid**: Linking to all target suburb pages with contextual anchor text.
