/**
 * Shared marketing content & technical specifications for Riverside Landscaping.
 * Official Website: https://riverside-landscaping.co.uk
 * Phone: 07507 604713 / +447507604713
 * Follows SEO_GEO_STRATEGY.md physical siloing and JSON-LD schema requirements.
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
  accessProfile: string
  mainRoads: string[]
  keyLandmarks: string[]
  neighbourhoods: string[]
  gbpDrivingDirections: string
  titleTag: string
}

export interface ServiceDetail {
  slug: string
  name: string
  category: string
  primaryCategory: string
  h1Title: string
  h2Secondary1: string
  h2Secondary2: string
  h2PainPoint: string
  directAnswer3Sec: string
  soilContext: string
  bsStandard: string
  features: string[]
  faqs: { question: string; answer: string }[]
  titleTag: string
}

export interface KnowledgeArticle {
  slug: string
  title: string
  category: string
  publishDate: string
  readingTime: string
  summary: string
  directAnswer3Sec: string
  sections: { h2: string; directAnswer?: string; content: string }[]
  relatedServiceSlug: string
  relatedServiceAnchor: string
  titleTag: string
}

// Business Contact & NAP Data single source of truth
export const BRAND = {
  name: 'Riverside Landscaping',
  legalName: 'Riverside Landscaping Ltd',
  phoneDisplay: '07507 604713',
  phoneHref: 'tel:+447507604713',
  whatsappHref: 'https://wa.me/447507604713',
  emailDisplay: 'info@riverside-landscaping.co.uk',
  emailHref: 'mailto:info@riverside-landscaping.co.uk',
  domain: 'https://riverside-landscaping.co.uk',
  gbpAddress: {
    streetAddress: 'Central Depot, Mains Road',
    addressLocality: 'Glasgow',
    addressRegion: 'Greater Glasgow & Ayrshire',
    postalCode: 'G1 1AA',
    addressCountry: 'GB',
  },
  geoCoordinates: {
    latitude: 55.8642,
    longitude: -4.2518,
  },
}

// Suburb & Regional coverage matrix with rich local relevance vectors (streets, landmarks, directions)
export const SUBURBS: SuburbCoverage[] = [
  {
    slug: 'bearsden',
    name: 'Bearsden',
    postcodePrefix: 'G61',
    council: 'East Dunbartonshire',
    soilProfile: 'Heavy Boulder Clay & Glacial Till',
    keyChallenge: 'High rainfall retention causing boggy rear lawns and flooded patio edges.',
    highlightInstall: 'Deep MOT Type 1 sub-base with perimeter slot drainage & Italian 20mm porcelain.',
    accessProfile: 'Suburban driveways & open side access allowing micro-excavator access.',
    mainRoads: ['Drymen Road (A809)', 'Roman Road', 'Milngavie Road (A81)', 'Canniesburn Toll'],
    keyLandmarks: ['Bearsden Cross', 'Kilmardinny Loch', 'Roman Bath House', 'Douglas Park Golf Club'],
    neighbourhoods: ['Thorn', 'Bearsden Cross', 'Kilmardinny', 'Westerton', 'Mosshead'],
    gbpDrivingDirections: 'From Bearsden Cross, head south down Drymen Road (A809) towards Canniesburn Toll roundabout, taking the exit for A81 straight to our central Riverside Landscaping Glasgow depot.',
    titleTag: "BEST Porcelain Paving Bearsden - If you're looking for patio installers near me or garden drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'newton-mearns',
    name: 'Newton Mearns',
    postcodePrefix: 'G77',
    council: 'East Renfrewshire',
    soilProfile: 'Dense Clay with Shallow Water Table',
    keyChallenge: 'Low water absorption leading to surface pooling during Glasgow winter storms.',
    highlightInstall: 'Geotextile fabric layer + sub-surface land drain channeling to mains soakaway.',
    accessProfile: 'Wide suburban plots with direct access suitable for heavy aggregate machinery.',
    mainRoads: ['Ayr Road (A77)', 'Mearns Road', 'Malletsheugh Road', 'M77 Junction 4/5'],
    keyLandmarks: ['The Avenue Shopping Centre', 'Whitecraigs Golf Club', 'Rouken Glen Park Boundary', 'Mearns Castle'],
    neighbourhoods: ['Whitecraigs', 'Broom', 'Crookfur', 'Capelrig', 'Mearns Cross'],
    gbpDrivingDirections: 'Take Ayr Road (A77) northbound past The Avenue Shopping Centre, connecting to M77 northbound for 10 minutes directly to Riverside Landscaping HQ.',
    titleTag: "BEST Landscaping Newton Mearns - If you're looking for patio installers near me or driveway installers near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'west-end-glasgow',
    name: 'West End Glasgow',
    postcodePrefix: 'G12',
    council: 'Glasgow City Council',
    soilProfile: 'Mixed Clay, Silt & Historical Backfill',
    keyChallenge: 'Restricted tenement rear lane access, tight plot boundaries, and high water table retention.',
    highlightInstall: 'Compact excavator access, flush threshold slot drains, and precision diamond-cut vitrified porcelain.',
    accessProfile: 'Narrow rear lane access and shared tenement pend tight clearance handling.',
    mainRoads: ['Byres Road', 'Great Western Road (A82)', 'Hyndland Road', 'Dumbarton Road'],
    keyLandmarks: ['University of Glasgow', 'Glasgow Botanic Gardens', 'Kelvingrove Art Gallery', 'Ashton Lane'],
    neighbourhoods: ['Hyndland', 'Dowanhill', 'Kelvinside', 'Partickhill', 'Broomhill'],
    gbpDrivingDirections: 'Travel east along Great Western Road (A82) past Botanic Gardens, turning onto the M8 expressway connection straight to Riverside Landscaping depot.',
    titleTag: "BEST Patio Installers West End Glasgow - If you're looking for porcelain paving near me or garden drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'giffnock',
    name: 'Giffnock',
    postcodePrefix: 'G46',
    council: 'East Renfrewshire',
    soilProfile: 'Sloped Clay Glacial Till',
    keyChallenge: 'Water run-off towards house foundations and garden boundary walls.',
    highlightInstall: 'Retaining wall engineering with integrated catch basins & frost-proof mortar.',
    accessProfile: 'Elevated terraced gardens requiring calculated slope drainage falls.',
    mainRoads: ['Fenwick Road (A77)', 'Kilbride Road', 'Braidbar Road', 'Station Road'],
    keyLandmarks: ['Huntly Park', 'Giffnock Tennis Club', 'Orchard Park', 'Giffnock Synagogue'],
    neighbourhoods: ['Braidbar', 'Orchard Park', 'Thornliebank border', 'Merrylea'],
    gbpDrivingDirections: 'Head north along Fenwick Road (A77) towards Kilmarnock Road, accessing our central depot within 8 minutes.',
    titleTag: "BEST Hardscaping Giffnock - If you're looking for patio installers near me or retaining wall builders near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'clarkston',
    name: 'Clarkston',
    postcodePrefix: 'G76',
    council: 'East Renfrewshire',
    soilProfile: 'Compacted Heavy Clay',
    keyChallenge: 'Slab movement and joint degradation caused by frost heave.',
    highlightInstall: 'BS7533-compliant rigid pavement installation with zero water retention.',
    accessProfile: 'Established residential driveways requiring load-certified aggregate sub-bases.',
    mainRoads: ['Busby Road (A727)', 'Mearns Road', 'Stamperland Avenue', 'East Kilbride Road'],
    keyLandmarks: ['Clarkston Toll', 'Overlee Park', 'Cathcart Castle Golf Club', 'Greenbank Garden'],
    neighbourhoods: ['Stamperland', 'Netherlee', 'Williamwood', 'Busby'],
    gbpDrivingDirections: 'From Clarkston Toll, proceed north on Busby Road (A727) through Netherlee to connect directly to Riverside Landscaping HQ.',
    titleTag: "BEST Driveway Installers Clarkston - If you're looking for patio installers near me or garden drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'milngavie',
    name: 'Milngavie',
    postcodePrefix: 'G62',
    council: 'East Dunbartonshire',
    soilProfile: 'Mixed Clay & Silt Soil',
    keyChallenge: 'Slippery moss accumulation on traditional porous stone slabs.',
    highlightInstall: 'Non-porous vitrified porcelain paving with R11 anti-slip textured finish.',
    accessProfile: 'Mature garden boundaries requiring careful root zone preservation.',
    mainRoads: ['Glasgow Road (A81)', 'Strathblane Road', 'Station Road', 'Mugdock Road'],
    keyLandmarks: ['West Highland Way Start', 'Mugdock Country Park', 'Milngavie Reservoir', 'Clober Golf Club'],
    neighbourhoods: ['Barloch', 'Clober', 'Mains Estate', 'Tannoch'],
    gbpDrivingDirections: 'Take Glasgow Road (A81) southbound past Milngavie Reservoir through Bearsden straight to Riverside Landscaping depot.',
    titleTag: "BEST Porcelain Paving Milngavie - If you're looking for patio installers near me or garden drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
]

// Transactional Services Database matching physical silo /landscaping-services/
export const SERVICES: ServiceDetail[] = [
  {
    slug: 'porcelain-paving-glasgow',
    name: 'Porcelain Paving & Patio Installation',
    category: 'Landscaping Services',
    primaryCategory: 'Porcelain Paving',
    h1Title: 'Porcelain Paving & Patio Installation in Glasgow & Ayrshire',
    h2Secondary1: 'Driveway Installers & Hardscaping Near Me',
    h2Secondary2: 'Garden Drainage Solutions for Clay Soil & Wet Weather',
    h2PainPoint: 'Preventing Waterlogging & Frost Heave on Scottish Clay Soil',
    directAnswer3Sec: 'A standard 40m² porcelain patio in Glasgow takes 5 to 7 working days to complete by Riverside Landscaping, including excavation, 150mm-200mm sub-base compaction, slurry priming, and weather-sheltered mortar installation.',
    soilContext: 'Glasgow and Ayrshire clay soil expands rapidly during wet winters. Riverside Landscaping excavates 250mm to 300mm deep, laying non-woven geotextile membrane under 150mm-200mm of MOT Type 1 aggregate to prevent sinking or shifting.',
    bsStandard: 'Strictly built to BS7533 standards with full-bed polymer slurry priming and rapid-setting frost-proof mortars for year-round durability.',
    features: [
      'Italian 20mm Vitrified R11 Anti-Slip Porcelain Slabs',
      'BS7533 Polymer Slurry Primer Adhesion Layer',
      '150mm–200mm MOT Type 1 Sub-Base Compaction',
      'Integrated Sub-Surface ACO Slot Drainage Channels',
      '10-Year Written Structural Guarantee Certificate',
    ],
    faqs: [
      {
        question: 'Can Riverside Landscaping lay porcelain paving during Scottish winters?',
        answer: 'Yes. We use rapid-setting frost-proof mortars and weather-sheltered working rigs. As long as ground temps remain above 0°C, hardscaping can safely continue through winter.',
      },
      {
        question: 'How thick is the sub-base required for heavy Glasgow clay soil?',
        answer: 'Heavy Glasgow clay requires a 150mm to 200mm compacted MOT Type 1 sub-base lined with a non-woven geotextile membrane to isolate clay movement.',
      },
      {
        question: 'What is the cost per m² for porcelain paving in Glasgow?',
        answer: 'Fully installed vitrified porcelain paving in Glasgow ranges between £120 and £180 per m² depending on site levels, drainage setup, and material specs.',
      },
    ],
    titleTag: "BEST Porcelain Paving Glasgow - If you're looking for patio installers near me or garden drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'driveway-installers-glasgow',
    name: 'Driveway Installation & Hardscaping',
    category: 'Landscaping Services',
    primaryCategory: 'Driveway Installation',
    h1Title: 'Driveway Installers & Permeable Block Paving in Glasgow & Ayrshire',
    h2Secondary1: 'Porcelain Paving & Patio Installers Near Me',
    h2Secondary2: 'Retaining Walls & Heavy Vehicle Load Foundations',
    h2PainPoint: 'Engineered Driveways Built to Withstand Scottish Rain & Frost Cycles',
    directAnswer3Sec: 'Riverside Landscaping driveway installations take 4 to 6 days for a 60m² area, utilizing heavy vehicle load-rated foundations, permeable block paving, and integrated perimeter water channels.',
    soilContext: 'Scottish glacial till and clay require 200mm-250mm of crushed aggregate foundation with geotextile isolation to prevent tire rutting and surface subsidence.',
    bsStandard: 'Complies with BS7533 structural paving requirements, featuring load-bearing aggregate beds and high-adhesion edge restraints.',
    features: [
      'Heavy Load-Bearing 200mm+ MOT Sub-Base',
      'Permeable Block Paving & Scottish Whinstone Coping',
      'ACO Channel Drainage Connected to Mains Soakaways',
      'Concrete Kerb Edge Restraints Set in Full Beds',
      '10-Year Load & Settlement Guarantee',
    ],
    faqs: [
      {
        question: 'Do I need planning permission for a new driveway in Glasgow?',
        answer: 'Driveways using permeable block paving or discharging water onto your lawn do not require planning permission in Glasgow. Riverside Landscaping handles SUDS compliance on every build.',
      },
      {
        question: 'How long does a block paving driveway take to install?',
        answer: 'A standard 50m²–80m² driveway takes 4 to 6 working days, from initial sub-base excavation to final silica sand jointing.',
      },
    ],
    titleTag: "BEST Driveway Installers Glasgow - If you're looking for block paving near me or resin driveways near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'garden-drainage-solutions-glasgow',
    name: 'Garden Drainage & Land Drainage Engineering',
    category: 'Landscaping Services',
    primaryCategory: 'Garden Drainage Solutions',
    h1Title: 'Garden Drainage Solutions for Clay Soil in Glasgow & Ayrshire',
    h2Secondary1: 'Sub-Surface Land Drains & Perimeter Slot Channels',
    h2Secondary2: 'Porcelain Patios with Integrated Water Mitigation',
    h2PainPoint: 'Eliminating Waterlogged Lawns & Standing Water in Wet Weather',
    directAnswer3Sec: 'Riverside Landscaping garden drainage systems resolve waterlogged clay soils in 2 to 4 days using deep perforated land drain piping, wrapped in clean gravel and non-woven geotextile fleece.',
    soilContext: 'Glasgow receives over 1,200mm of annual rainfall on non-porous clay soil. Our French drain networks and catch basins divert water away from house footings directly into approved soakaways.',
    bsStandard: 'Engineered in accordance with British Building Regulations Part H for gravity drainage and surface water discharge compliance.',
    features: [
      'Deep French Drain Networks & Perforated Pipe Runs',
      'Geotextile Fleece Wrapping to Prevent Silt Clogging',
      'High-Volume Catch Basins & Underground Silt Traps',
      'Perimeter Slot Drains Flush with Patio Thresholds',
      '10-Year Water Mitigation Guarantee',
    ],
    faqs: [
      {
        question: 'How does Riverside Landscaping fix a waterlogged garden in Glasgow?',
        answer: 'We install sub-surface land drains wrapped in geotextile filter socks and 20mm clean gravel, redirecting groundwater into high-capacity soakaway crates.',
      },
      {
        question: 'Will land drains work in heavy Glasgow boulder clay?',
        answer: 'Yes. By excavating through the clay crust and surrounding pipes with porous aggregate, groundwater flows freely without back-pooling.',
      },
    ],
    titleTag: "BEST Garden Drainage Solutions Glasgow - If you're looking for land drains near me or patio drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'decking-fencing-glasgow',
    name: 'Composite Decking & Architectural Fencing',
    category: 'Landscaping Services',
    primaryCategory: 'Decking & Fencing',
    h1Title: 'Composite Decking & Architectural Slatted Fencing in Glasgow & Ayrshire',
    h2Secondary1: 'Porcelain Paving & Terraced Hardscaping Near Me',
    h2Secondary2: 'Weatherproof Composite Framing & Privacy Screens',
    h2PainPoint: 'Rot-Proof Outdoor Living Built for Damp Scottish Climates',
    directAnswer3Sec: 'Composite decking and cedar-style slatted fencing by Riverside Landscaping take 3 to 5 days, utilizing sub-frame aluminum substructures that resist rot in damp Scottish climates.',
    soilContext: 'High atmospheric moisture in Glasgow rots traditional timber posts. We set structural posts in 600mm deep concrete footings with sub-surface drainage sleeves.',
    bsStandard: 'Built using structural grade C24 treated timber or rot-proof aluminum joists anchored with stainless steel fixings.',
    features: [
      'Ultra-Low Maintenance Composite Deck Boards',
      'Rot-Proof Aluminum & C24 Sub-Frame Framing',
      'Contemporary Cedar Slatted Privacy Fencing',
      'Integrated Under-Deck Drainage Systems',
      '15-Year Manufacturer & 10-Year Workmanship Warranty',
    ],
    faqs: [
      {
        question: 'Does composite decking get slippery in Glasgow winters?',
        answer: 'Quality composite decking features anti-slip woodgrain texturing and non-porous capping, preventing algae build-up and remaining safe to walk on year-round.',
      },
    ],
    titleTag: "BEST Composite Decking Glasgow - If you're looking for fence builders near me or timber decking near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
]

// Informational Articles Database for /knowledge-base/
export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    slug: 'cost-guides',
    title: 'How Much Does a Patio Cost in Glasgow? [2026 Price Breakdown]',
    category: 'Cost Guides',
    publishDate: '2026-01-15',
    readingTime: '6 min read',
    summary: 'Comprehensive 2026 cost breakdown for porcelain paving, excavation, sub-base prep, and drainage by Riverside Landscaping.',
    directAnswer3Sec: 'A fully installed porcelain patio in Glasgow costs between £120 and £180 per m² in 2026 from Riverside Landscaping, including excavation of clay soil, 150mm MOT Type 1 sub-base, slurry priming, and resin grouting.',
    sections: [
      {
        h2: 'Average Cost per m² for Glasgow Patios',
        directAnswer: 'Standard 40m² porcelain patio projects in Glasgow range from £4,800 to £7,200 total, depending on ground levels, access conditions, and slot drainage requirements.',
        content: 'When budgeting for hardscaping in Glasgow suburbs like Bearsden or Newton Mearns, material selection is only one part of the calculation. Heavy clay soil excavation, waste disposal, and MOT Type 1 aggregate delivery represent approximately 40% of overall project costs.',
      },
      {
        h2: 'Why Glasgow Clay Soil Increases Sub-Base Prep Costs',
        directAnswer: 'Glasgow clay soil requires 250mm to 300mm deep excavation to prevent frost heave, adding aggregate depth and labor compared to standard UK sandy sub-grades.',
        content: 'Failing to dig deep enough into Scottish till results in cracked paving within two winter cycles. Professional landscapers use geotextile separation membranes and high-compaction rollers to ensure structural stability.',
      },
    ],
    relatedServiceSlug: 'porcelain-paving-glasgow',
    relatedServiceAnchor: 'Read our full Glasgow porcelain paving installation process',
    titleTag: "Patio Installation Cost Glasgow 2026 - Porcelain Paving Price Guide - Riverside Landscaping",
  },
  {
    slug: 'glasgow-garden-maintenance',
    title: 'Glasgow Garden Maintenance & Winter Hardscaping Care',
    category: 'Maintenance & Care',
    publishDate: '2026-02-01',
    readingTime: '5 min read',
    summary: 'Essential guide to protecting vitrified porcelain, drainage channels, and mortar joints during harsh Scottish winters.',
    directAnswer3Sec: 'Maintain porcelain paving in Glasgow by clearing leaves in autumn, cleaning drainage slots twice annually, and applying rock salt alternatives during sub-zero freezing spells.',
    sections: [
      {
        h2: 'Protecting Porcelain Paving Against Winter Frost',
        directAnswer: 'Vitrified porcelain has an ultra-low water absorption rate (<0.05%), meaning ice cannot penetrate the slab, preventing frost cracking and spalling.',
        content: 'Unlike porous sandstone or concrete flags, vitrified porcelain will not absorb surface moisture. Ensure jointing mortar remains free of organic debris to maintain maximum water shedding into perimeter channels.',
      },
    ],
    relatedServiceSlug: 'garden-drainage-solutions-glasgow',
    relatedServiceAnchor: 'Explore our Glasgow garden drainage solutions',
    titleTag: "Glasgow Garden Maintenance & Winter Care Guide - Riverside Landscaping",
  },
]

// FAQ Copy
export const faqs: [string, string][] = [
  [
    'Can Riverside Landscaping lay porcelain paving during Glasgow winters?',
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
    quote: 'After the first proper downpour in October, our patio was bone dry while our neighbours garden was flooded. The engineering quality from Riverside Landscaping is obvious.',
    rating: 5,
    date: 'Installed Winter 2025',
  },
  {
    id: 'test-2',
    name: 'Dr. Alistair K.',
    location: 'Newton Mearns',
    postcode: 'G77',
    projectType: '80m² Outdoor Dining Space',
    quote: 'Riverside Landscaping were spotless from day one. They excavated over 25 tonnes of heavy clay soil and left the site cleaner than they found it. Worth every penny.',
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

// Process Steps (The Riverside Method)
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
    subtitle: 'Removing Glasgow & Ayrshire clay down to firm sub-grade',
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

/**
 * JSON-LD Schema Generator Engine conforming strictly to SEO_GEO_STRATEGY.md (Section 4)
 * Updated with official Riverside Landscaping details: https://riverside-landscaping.co.uk
 */
export function generateGraphSchema(pageUrl: string, faqItems: { question: string; answer: string }[] = []) {
  const schemaFaqs = faqItems.length > 0 ? faqItems : faqs.map(([question, answer]) => ({ question, answer }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LandscapingBusiness',
        '@id': `${BRAND.domain}/#business`,
        'name': BRAND.name,
        'url': BRAND.domain,
        'telephone': BRAND.phoneDisplay,
        'priceRange': '££-£££',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': BRAND.gbpAddress.streetAddress,
          'addressLocality': BRAND.gbpAddress.addressLocality,
          'addressRegion': BRAND.gbpAddress.addressRegion,
          'postalCode': BRAND.gbpAddress.postalCode,
          'addressCountry': BRAND.gbpAddress.addressCountry,
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': BRAND.geoCoordinates.latitude,
          'longitude': BRAND.geoCoordinates.longitude,
        },
        'areaServed': SUBURBS.map((s) => ({
          '@type': 'Place',
          'name': `${s.name}, ${s.council}`,
        })),
        'knowsAbout': [
          'Porcelain Paving',
          'Sub-Base Garden Drainage',
          'Scottish Whinstone Retaining Walls',
          'Driveway Installation',
          'Winter Hardscaping',
          'BS7533 Pavement Engineering',
          'Turfing and Decking Contractors',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        'mainEntity': schemaFaqs.map((f) => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.answer,
          },
        })),
      },
    ],
  }
}
