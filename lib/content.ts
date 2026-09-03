/**
 * Shared marketing content & technical specifications for Arden Works / Riverside Landscaping.
 * Used across client components and server JSON-LD schemas.
 */

export interface PortfolioItem {
  id: string
  title: string
  area: string
  postcode: string
  category: 'porcelain' | 'drainage' | 'pergola' | 'driveway'
  description: string
  specs: string[]
  imageBefore?: string
  imageAfter: string
  metric: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  postcode: string
  projectType: string
  quote: string
  rating: number
  date: string
}

export interface MaterialSwatch {
  id: string
  name: string
  origin: string
  description: string
  slipRating: string
  frostProof: boolean
  colorHex: string
}

export interface SuburbCoverage {
  slug: string
  name: string
  postcodePrefix: string
  council: string
  soilProfile: string
  keyChallenge: string
  highlightInstall: string
}

// Suburb coverage database for Glasgow High-End Suburbs
export const SUBURBS: SuburbCoverage[] = [
  {
    slug: 'bearsden',
    name: 'Bearsden',
    postcodePrefix: 'G61',
    council: 'East Dunbartonshire',
    soilProfile: 'Heavy Boulder Clay',
    keyChallenge: 'High rainfall retention causing boggy lawns and flooded patio edges.',
    highlightInstall: 'Deep MOT Type 1 sub-base with perimeter slot drainage & Italian 20mm porcelain.',
  },
  {
    slug: 'newton-mearns',
    name: 'Newton Mearns',
    postcodePrefix: 'G77',
    council: 'East Renfrewshire',
    soilProfile: 'Dense Clay with Shallow Water Table',
    keyChallenge: 'Low water absorption leading to surface pooling during Glasgow winter storms.',
    highlightInstall: 'Geotextile fabric layer + sub-surface land drain channeling to mains soakaway.',
  },
  {
    slug: 'giffnock',
    name: 'Giffnock',
    postcodePrefix: 'G46',
    council: 'East Renfrewshire',
    soilProfile: 'Sloped Clay Glacial Till',
    keyChallenge: 'Water run-off towards house foundations and garden boundary walls.',
    highlightInstall: 'Retaining wall engineering with integrated catch basins & frost-proof mortar.',
  },
  {
    slug: 'clarkston',
    name: 'Clarkston',
    postcodePrefix: 'G76',
    council: 'East Renfrewshire',
    soilProfile: 'Compacted Heavy Clay',
    keyChallenge: 'Slab movement and joint degradation caused by frost heave.',
    highlightInstall: 'BS7533-compliant rigid pavement installation with zero water retention.',
  },
  {
    slug: 'milngavie',
    name: 'Milngavie',
    postcodePrefix: 'G62',
    council: 'East Dunbartonshire',
    soilProfile: 'Mixed Clay & Silt Soil',
    keyChallenge: 'Slippery moss accumulation on traditional porous stone slabs.',
    highlightInstall: 'Non-porous vitrified porcelain paving with R11 anti-slip textured finish.',
  },
]

// FAQ Copy — single source of truth for accordion and schema JSON-LD
export const faqs: [string, string][] = [
  [
    'Can hardscaping and porcelain paving be laid during Glasgow winters?',
    'Yes. Hardscaping relies on structural excavation and frost-proof mortar systems, not plant cycles. We use covered working setups to continue installations clean through winter, saving you from 12-week spring waitlists.',
  ],
  [
    'How do you fix heavy Glasgow clay soil drainage issues?',
    'We excavate past the clay layer (250mm–300mm deep), install non-woven geotextile separation membranes, and use a deep MOT Type 1 sub-base engineered with integrated land drain channelling specifically for Scottish rainfall.',
  ],
  [
    'How much does a porcelain patio cost in Bearsden or Newton Mearns?',
    'Fully installed porcelain paving with complete site excavation, BS7533 sub-base preparation, and integrated drainage ranges between £120 and £180 per m² depending on site levels and material selection.',
  ],
  [
    'What is your structural guarantee on hardscaping builds?',
    'We provide a 10-Year Structural Guarantee covering sub-base stability, mortar adhesion, and sub-surface water mitigation. Every project receives a formal signed certificate upon handover.',
  ],
  [
    'Are your installations BS7533 compliant?',
    'Yes. BS7533 is the official British Standard for high-performance pavement engineering. We strictly adhere to core sub-base depth ratios, slurry primer bonding, and continuous perimeter expansion joints.',
  ],
]

// Luxury Portfolio Showcase Items
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'proj-1',
    title: 'Architectural Outdoor Lounge & Heated Pergola',
    area: 'Bearsden',
    postcode: 'G61',
    category: 'porcelain',
    description: 'Transformation of a waterlogged clay rear garden into a multi-tiered luxury outdoor dining space with integrated perimeter slot drainage and ambient LED step lighting.',
    specs: ['60m² 20mm Italian Porcelain', 'Sub-Surface Slot Drainage', 'Heated Pergola Footings', 'BS7533 Sub-Base'],
    imageAfter: '/images/garden-after.png',
    metric: '100% Sub-Surface Water Mitigation',
  },
  {
    id: 'proj-2',
    title: 'Deep Clay Drainage & Raised Terrace',
    area: 'Newton Mearns',
    postcode: 'G77',
    category: 'drainage',
    description: 'Complete excavation of boggy clay soil replaced with 300mm MOT Type 1 sub-base, geotextile membrane grid, and dark slate porcelain coping edges.',
    specs: ['Geotextile Clay Separation', 'ACO Slot Drain Channeling', '300mm Excavation Depth', 'Scottish Whinstone Borders'],
    imageAfter: '/images/garden-after.png',
    metric: 'Eliminated Standing Water',
  },
  {
    id: 'proj-3',
    title: 'Contemporary Sun Terrace & Sunken Seating',
    area: 'Giffnock',
    postcode: 'G46',
    category: 'porcelain',
    description: 'Precision-cut light beige vitrified porcelain with R11 anti-slip rating, built with flush threshold drainage against sliding glass doors.',
    specs: ['Vitrified R11 Anti-Slip', 'Flush Door Threshold Drain', 'Concealed Access Inspection Covers'],
    imageAfter: '/images/garden-after.png',
    metric: 'Zero-Step Threshold Transition',
  },
  {
    id: 'proj-4',
    title: 'Permeable Driveway & Retaining Wall Complex',
    area: 'Clarkston',
    postcode: 'G76',
    category: 'driveway',
    description: 'Heavy vehicle load-rated granite block paving combined with structural retaining walls to handle steep elevation runoff.',
    specs: ['BS7533 Load-Bearing Foundation', 'Granite Coping Stones', 'Sub-Surface Retaining Wall Drainage'],
    imageAfter: '/images/garden-after.png',
    metric: 'Vehicle Load Certified',
  },
]

// Customer Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Fraser & Catriona M.',
    location: 'Bearsden',
    postcode: 'G61',
    projectType: 'Porcelain Patio & Clay Drainage',
    quote: 'After the first proper downpour in October, our patio was bone dry while our neighbours garden was flooded. The engineering quality is obvious in every detail.',
    rating: 5,
    date: 'Installed Winter 2025',
  },
  {
    id: 'test-2',
    name: 'Dr. Alistair K.',
    location: 'Newton Mearns',
    postcode: 'G77',
    projectType: '80m² Outdoor Dining Space',
    quote: 'Arden Works were spotless from day one. They excavated over 25 tonnes of heavy clay soil and left the site cleaner than they found it. Worth every penny.',
    rating: 5,
    date: 'Installed Spring 2025',
  },
  {
    id: 'test-3',
    name: 'Evelyn S.',
    location: 'Giffnock',
    postcode: 'G46',
    projectType: 'Terraced Garden & Pergola',
    quote: 'The Summer/Winter toggle in their proposal convinced us to go ahead in November. We used our heated outdoor space straight through the winter months.',
    rating: 5,
    date: 'Installed Winter 2025',
  },
]

// Material Swatches
export const MATERIALS: MaterialSwatch[] = [
  {
    id: 'mat-1',
    name: 'Italian Anthracite Porcelain',
    origin: 'Bologna, Italy',
    description: 'Ultra-dense, non-porous 20mm vitrified porcelain with natural slate veining and frost-proof durability.',
    slipRating: 'R11 Anti-Slip',
    frostProof: true,
    colorHex: '#2b2d31',
  },
  {
    id: 'mat-2',
    name: 'Scottish Whinstone Edging',
    origin: 'Stirlingshire Quarry',
    description: 'Traditional Scottish basalt stone cut to precision architectural dimensions for sharp perimeter borders.',
    slipRating: 'Natural Textured',
    frostProof: true,
    colorHex: '#42484d',
  },
  {
    id: 'mat-3',
    name: 'Cream Vitrified Limestone Porcelain',
    origin: 'Modena, Italy',
    description: 'Warm neutral stone aesthetic with zero water absorption (<0.05%), perfect for bright south-facing gardens.',
    slipRating: 'R11 Anti-Slip',
    frostProof: true,
    colorHex: '#d8cfbc',
  },
  {
    id: 'mat-4',
    name: 'Architectural Stainless Slot Drains',
    origin: 'UK Engineered',
    description: 'Concealed 10mm slot drainage channel that sits flush between porcelain slabs with high-volume flow rate.',
    slipRating: 'Heel-Safe Rated',
    frostProof: true,
    colorHex: '#8e969d',
  },
]

// Process Steps (The Arden Method)
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Laser Levels & Water Table Survey',
    subtitle: 'Fall calculation & drainage mapping',
    description: 'We map site contours, door threshold clearance, and rainwater runoff paths before a single slab is ordered.',
    details: ['Laser transit level check', 'Mains drainage connection audit', 'Fixed-price written proposal'],
  },
  {
    step: '02',
    title: 'Heavy Clay Excavation & Membrane',
    subtitle: 'Removing Glasgow clay down to firm sub-grade',
    description: 'We excavate 250mm–300mm deep to eliminate unstable clay. A non-woven geotextile membrane isolates the sub-base.',
    details: ['Sub-grade compaction', 'Geotextile clay isolation', 'Waste disposal certified'],
  },
  {
    step: '03',
    title: 'BS7533 Sub-Base & Slot Drainage',
    subtitle: 'Engineered for Scottish rainfall load',
    description: 'Compacted MOT Type 1 aggregate layered with continuous land drain channeling to guarantee sub-surface water mitigation.',
    details: ['MOT Type 1 compaction', 'ACO slot drain integration', 'Frost-proof slurry bonding'],
  },
  {
    step: '04',
    title: 'Precision Porcelain & Handover',
    subtitle: 'Architect-level finish & 10-year certificate',
    description: 'Porcelain laid on full wet mortar beds, jointed with exterior resin grout, and backed by our signed 10-Year Guarantee.',
    details: ['Precision diamond cuts', 'Weather-proof resin grouting', '10-Year structural certificate'],
  },
]
