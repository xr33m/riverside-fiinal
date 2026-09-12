/**
 * Shared marketing content & technical specifications for Riverside Landscaping.
 * Official Website: https://riverside-landscaping.co.uk
 * Phone: 07507 604713 / +447507604713
 * Follows SEO_GEO_STRATEGY.md physical siloing and JSON-LD schema requirements.
 */

export interface PortfolioItem {
  id: string
  slug: string
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
  postcode?: string
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

// Ayrshire coverage silo shares the same shape minus depot-specific driving directions,
// since there is no dedicated Ayrshire address/GBP listing yet (see BRAND_AYRSHIRE below).
export interface AyrshireTown {
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
  // Optional real project photo for the services hub tile — until one exists
  // for a service, the hub renders a brand-colour/icon tile instead of a
  // fabricated or repeated stock photo.
  heroImage?: string
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

// Business Contact & NAP Data single source of truth.
// Address confirmed against the live Google Business Profile - do not change without checking GBP first.
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
    streetAddress: '46 West George Street',
    addressLocality: 'Glasgow',
    addressRegion: 'Scotland',
    postalCode: 'G2 4LL',
    addressCountry: 'GB',
  },
  geoCoordinates: {
    latitude: 55.8617,
    longitude: -4.2518,
  },
}

// PLACEHOLDER handles — not sourced from a real, confirmed Riverside Landscaping
// account yet. Swap for the real Facebook/LinkedIn/Instagram URLs before launch;
// until then these are best-guess handles based on the business name.
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/riversidelandscapingglasgow',
  linkedin: 'https://www.linkedin.com/company/riverside-landscaping',
  instagram: 'https://www.instagram.com/riversidelandscaping',
}

// Ayrshire is a real, separate service area but does not have its own Google Business
// Profile, address, or phone number yet. Reuses the main contact channel for now -
// swap phoneDisplay/phoneHref/gbpAddress here once a dedicated Ayrshire GBP exists,
// and start emitting a full LandscapingBusiness schema for /ayrshire/ at that point
// (see generateAyrshireGraphSchema below, which deliberately omits address/geo today).
export const BRAND_AYRSHIRE = {
  name: 'Riverside Landscaping — Ayrshire',
  phoneDisplay: BRAND.phoneDisplay,
  phoneHref: BRAND.phoneHref,
  emailDisplay: BRAND.emailDisplay,
  emailHref: BRAND.emailHref,
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
  {
    slug: 'bothwell',
    name: 'Bothwell',
    postcodePrefix: 'G71',
    council: 'South Lanarkshire',
    soilProfile: 'Heavy Alluvial Clay & Glacial Till',
    keyChallenge: 'Sloped conservation area plots with heavy clay run-off towards home foundations.',
    highlightInstall: 'High-density retaining wall structures + permeable porcelain terraces with sub-base land drainage.',
    accessProfile: 'Gated residential properties requiring low-noise precision excavation equipment.',
    mainRoads: ['Main Street (B7071)', 'Bothwell Road', 'Uddingston Road', 'M74 Junction 5'],
    keyLandmarks: ['Bothwell Castle', 'Bothwell Parish Church', 'Bothwell Castle Golf Club', 'Clyde Walkway'],
    neighbourhoods: ['Castle Avenue area', 'Silverwells', 'Old Bothwell', 'Laighlands'],
    gbpDrivingDirections: 'Take M74 northbound from Junction 5 for 12 minutes to access Riverside Landscaping Central Depot.',
    titleTag: "BEST Luxury Landscaping Bothwell - If you're looking for patio installers near me or retaining wall builders near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'kilmacolm',
    name: 'Kilmacolm',
    postcodePrefix: 'PA13',
    council: 'Inverclyde',
    soilProfile: 'Upland Peat & Silt over Dense Clay',
    keyChallenge: 'Excess rain absorption causing boggy lawn areas and moss growth on traditional paving.',
    highlightInstall: 'BS7533 vitrified non-porous porcelain with R11 slip rating and deep land drain soakaways.',
    accessProfile: 'Large estate driveways suitable for multi-axle aggregate delivery trucks.',
    mainRoads: ['Lochwinnoch Road (A761)', 'Bridge of Weir Road', 'Gryffe Road', 'Port Glasgow Road'],
    keyLandmarks: ['Kilmacolm Hydro Site', 'Knpps Loch', 'Kilmacolm Golf Club', 'Birkmyre Park'],
    neighbourhoods: ['Gryffe Castle area', 'Birkmyre', 'West End Kilmacolm', 'Duchal Estate border'],
    gbpDrivingDirections: 'Head east on A761 through Bridge of Weir, connecting to M8 eastbound straight to Riverside Landscaping central headquarters.',
    titleTag: "BEST Landscaping & Driveways Kilmacolm - If you're looking for patio installers near me or resin driveways near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
]

// Ayrshire coverage silo - separate service area, pending its own Google Business Profile.
// Coastal Ayrshire towns run on links/sandy soil rather than Glasgow's boulder clay, so the
// copy below deliberately focuses on wind/salt exposure and free-draining ground instead of
// reusing the Glasgow clay-drainage narrative.
export const AYRSHIRE_TOWNS: AyrshireTown[] = [
  {
    slug: 'troon',
    name: 'Troon',
    postcodePrefix: 'KA10',
    council: 'South Ayrshire',
    soilProfile: 'Free-Draining Coastal Links Sand',
    keyChallenge: 'Salt-laden coastal winds accelerating wear on untreated timber and unsealed jointing.',
    highlightInstall: 'Wind-rated porcelain edge restraints with corrosion-resistant stainless fixings throughout.',
    accessProfile: 'Coastal villa plots with generous side access for aggregate delivery.',
    mainRoads: ['Bentinck Drive', 'Ayr Road (A78)', 'Templehill', 'Prestwick Road'],
    keyLandmarks: ['Royal Troon Golf Club', 'Troon Beach & Esplanade', 'Troon Harbour', 'Fullarton Woods'],
    neighbourhoods: ['South Beach', 'Fullarton', 'Barassie', 'St Meddans'],
    titleTag: "BEST Landscaping Troon - If you're looking for patio installers near me or coastal garden drainage near me - Riverside Landscaping",
  },
  {
    slug: 'prestwick',
    name: 'Prestwick',
    postcodePrefix: 'KA9',
    council: 'South Ayrshire',
    soilProfile: 'Sandy Links Soil over Compact Subsoil',
    keyChallenge: 'Rapid surface drying and wind-blown sand requiring stabilised, low-maintenance surfacing.',
    highlightInstall: 'Compacted MOT sub-base with wind-firm porcelain or resin bound surfacing.',
    accessProfile: 'Established residential streets with on-road aggregate delivery access.',
    mainRoads: ['Ayr Road (A79)', 'Main Street', 'Kingcase Road', 'Prestwick Airport Road'],
    keyLandmarks: ['Prestwick Beach', 'Prestwick Golf Club', 'Glasgow Prestwick Airport', 'Kingcase'],
    neighbourhoods: ['Kingcase', 'Monkton', 'Prestwick Toll'],
    titleTag: "BEST Landscaping Prestwick - If you're looking for patio installers near me or driveway installers near me - Riverside Landscaping",
  },
  {
    slug: 'ayr',
    name: 'Ayr & Alloway',
    postcodePrefix: 'KA7',
    council: 'South Ayrshire',
    soilProfile: 'River Ayr Floodplain Silt & Clay',
    keyChallenge: 'Riverside plots with higher flood-plain water tables needing engineered surface run-off.',
    highlightInstall: 'ACO slot drainage tied to soakaways, sized for floodplain-adjacent gardens.',
    accessProfile: 'Conservation-area properties in Alloway requiring careful, low-impact excavation.',
    mainRoads: ['Alloway Road (B7024)', 'Doonfoot Road', 'Whitletts Road', 'A77'],
    keyLandmarks: ['Robert Burns Birthplace Museum', 'Belleisle Park', 'Ayr Racecourse', 'Ayr Beach'],
    neighbourhoods: ['Alloway', 'Doonfoot', 'Belleisle', 'Wallacetown'],
    titleTag: "BEST Landscaping Ayr & Alloway - If you're looking for patio installers near me or garden drainage near me - Riverside Landscaping",
  },
  {
    slug: 'west-kilbride',
    name: 'West Kilbride',
    postcodePrefix: 'KA23',
    council: 'North Ayrshire',
    soilProfile: 'Exposed Coastal Clay & Rock Outcrop',
    keyChallenge: 'Exposed, windswept plots with shallow topsoil over rock needing anchored foundations.',
    highlightInstall: 'Pinned sub-base foundations with wind-rated fencing and sheltered planting borders.',
    accessProfile: 'Village properties with narrow lane access suited to compact excavation equipment.',
    mainRoads: ['Main Street', 'Kirktonhall Road', 'Corse Street', 'A78'],
    keyLandmarks: ['West Kilbride Village', 'Seamill Beach', 'Law Castle', 'Ardneil Bay'],
    neighbourhoods: ['Seamill', 'Law Wood', 'Hunterston'],
    titleTag: "BEST Landscaping West Kilbride - If you're looking for patio installers near me or coastal garden drainage near me - Riverside Landscaping",
  },
]

// Transactional Services Database matching physical silo /landscaping-services/
export const SERVICES: ServiceDetail[] = [
  {
    slug: 'porcelain-paving-glasgow',
    name: 'Porcelain Paving & Patio Installation',
    category: 'Landscaping Services',
    primaryCategory: 'Porcelain Paving',
    h1Title: 'Porcelain Paving & Patio Installation in Glasgow',
    h2Secondary1: 'Driveway Installers & Hardscaping Near Me',
    h2Secondary2: 'Garden Drainage Solutions for Clay Soil & Wet Weather',
    h2PainPoint: 'Preventing Waterlogging & Frost Heave on Scottish Clay Soil',
    directAnswer3Sec: 'A standard 40m² porcelain patio in Glasgow takes 5 to 7 working days to complete by Riverside Landscaping, including excavation, 150mm-200mm sub-base compaction, slurry priming, and weather-sheltered mortar installation.',
    soilContext: 'Glasgow clay soil expands rapidly during wet winters. Riverside Landscaping excavates 250mm to 300mm deep, laying non-woven geotextile membrane under 150mm-200mm of MOT Type 1 aggregate to prevent sinking or shifting.',
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
        answer: 'Fully installed vitrified porcelain paving in Glasgow ranges between £120 and £180 per m² depending on site levels, drainage setup, and material specs. Every job gets a written estimate based on your materials and labour before work starts.',
      },
    ],
    titleTag: "BEST Porcelain Paving Glasgow - If you're looking for patio installers near me or garden drainage near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'driveway-installers-glasgow',
    name: 'Driveway Installation & Hardscaping',
    category: 'Landscaping Services',
    primaryCategory: 'Driveway Installation',
    h1Title: 'Driveway Installers & Permeable Block Paving in Glasgow',
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
    h1Title: 'Garden Drainage Solutions for Clay Soil in Glasgow',
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
    slug: 'composite-decking-glasgow',
    name: 'Composite Decking Installation',
    category: 'Landscaping Services',
    primaryCategory: 'Composite Decking',
    h1Title: 'Composite Decking Installation in Glasgow',
    h2Secondary1: 'Porcelain Paving & Terraced Hardscaping Near Me',
    h2Secondary2: 'Rot-Proof Sub-Frame Engineering for Damp Scottish Climates',
    h2PainPoint: "Low-Maintenance Outdoor Living That Won't Rot, Warp, or Splinter",
    directAnswer3Sec: "Composite decking installations by Riverside Landscaping take 3 to 5 days, built on rot-proof aluminium or C24 treated sub-frames set in 600mm deep concrete footings to handle Glasgow's damp climate.",
    soilContext: 'High atmospheric moisture in Glasgow rots traditional timber joists fast. We set structural posts in concrete footings below frost line with sub-surface drainage sleeves so the frame never sits in standing water.',
    bsStandard: 'Sub-frames built using structural grade C24 treated timber or rot-proof aluminium joists anchored with stainless steel fixings.',
    features: [
      'Ultra-Low Maintenance Composite Deck Boards',
      'Rot-Proof Aluminium & C24 Sub-Frame Options',
      'Concrete Footings Set Below Frost Line',
      'Hidden Fixings & Anti-Slip Woodgrain Finish',
      '15-Year Manufacturer & 10-Year Workmanship Warranty',
    ],
    faqs: [
      {
        question: 'Does composite decking get slippery in Glasgow winters?',
        answer: 'Quality composite decking features anti-slip woodgrain texturing and non-porous capping, preventing algae build-up and remaining safe to walk on year-round.',
      },
      {
        question: 'How long does composite decking last compared to timber?',
        answer: "Composite boards typically carry a 15-year manufacturer warranty and don't rot, warp, or need annual staining the way timber decking does in Scotland's wet climate.",
      },
    ],
    titleTag: "BEST Composite Decking Glasgow - If you're looking for timber decking near me or garden decking installers near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'garden-fencing-glasgow',
    name: 'Architectural Fencing & Privacy Screens',
    category: 'Landscaping Services',
    primaryCategory: 'Garden Fencing',
    h1Title: 'Architectural Fencing & Privacy Screens in Glasgow',
    h2Secondary1: 'Composite Decking & Terraced Hardscaping Near Me',
    h2Secondary2: 'Wind-Rated Foundations for Exposed Scottish Gardens',
    h2PainPoint: 'Fencing That Survives Scottish Storms Without Leaning or Rotting',
    directAnswer3Sec: 'Architectural slatted fencing by Riverside Landscaping takes 2 to 4 days to install, using concrete-set posts and wind-rated panel spacing engineered for exposed Scottish gardens.',
    soilContext: "Waterlogged clay soil is the main cause of leaning fence posts in Glasgow. We set every post in a 450mm-600mm deep concrete footing with a gravel base to stop water pooling around the post foot.",
    bsStandard: 'Posts and panels fixed with stainless steel hardware to structural grade treated timber, rated for exposed and coastal wind loads.',
    features: [
      'Contemporary Cedar & Composite Slatted Panels',
      'Concrete-Set Posts Below Frost Line',
      'Wind-Rated Panel Spacing for Exposed Plots',
      'Pressure-Treated & Rot-Resistant Timber Options',
      '10-Year Workmanship Guarantee',
    ],
    faqs: [
      {
        question: 'Why do fence posts lean after a couple of years in Glasgow?',
        answer: "Most leaning fences come from posts set in soil rather than concrete. We set every post in a concrete footing below the frost line so waterlogged clay can't shift it.",
      },
      {
        question: 'Can you match fencing to an existing garden design?',
        answer: 'Yes — slatted panel spacing, height, and stain colour are all specified to match existing decking, cladding, or garden room finishes on the same job.',
      },
    ],
    titleTag: "BEST Garden Fencing Glasgow - If you're looking for fence installers near me or privacy screening near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'resin-bound-driveways-glasgow',
    name: 'Resin Bound Driveways & Surfaces',
    category: 'Landscaping Services',
    primaryCategory: 'Resin Bound Driveways',
    h1Title: 'Resin Bound Driveway Installers in Glasgow',
    h2Secondary1: 'Block Paving & Hardscaping Driveway Near Me',
    h2Secondary2: 'SUDS Permeable Drainage & MOT Sub-Base Engineering',
    h2PainPoint: 'Seamless, Weed-Free & Permeable Driveways Built for Scottish Weather',
    directAnswer3Sec: 'Riverside Landscaping resin bound driveways take 2 to 4 days to install, utilizing BBA-approved UV-stable polyurethane binder and natural marble or granite aggregates laid over an open-graded asphalt base.',
    soilContext: 'Glasgow rainfall requires fully permeable driveways. Our resin bound surfaces allow water to drain naturally at up to 850 liters per m² per minute into the sub-base, preventing puddling and SUDS planning delays.',
    bsStandard: 'Laid to strict 18mm–22mm thickness over load-bearing open-grade tarmacadam complying with BS EN 13108 standards.',
    features: [
      'BBA-Certified 100% UV-Stable Polyurethane Resin',
      '18mm–22mm Structural Aggregate Depth',
      'SUDS Compliant - Zero Planning Permission Needed',
      'Seamless, Weed-Resistant & Frost-Proof Finish',
      '15-Year Structural & Anti-Discoloration Guarantee',
    ],
    faqs: [
      {
        question: 'Does resin bound paving crack during severe Glasgow winter freezes?',
        answer: 'No. Our resin bound systems utilize flexible UV-stable polyurethane binders laid over a compacted open-grade binder course, allowing minor thermal expansion without cracking.',
      },
      {
        question: 'Can you lay resin bound surfacing over an existing driveway?',
        answer: 'Yes, provided the existing concrete or asphalt sub-base is structurally sound, crack-free, and set over adequate MOT Type 1 aggregate.',
      },
    ],
    titleTag: "BEST Resin Bound Driveways Glasgow - If you're looking for resin driveways near me or permeable paving near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'retaining-walls-glasgow',
    name: 'Retaining Walls & Bricklaying',
    category: 'Landscaping Services',
    primaryCategory: 'Walls & Bricklaying',
    h1Title: 'Retaining Walls & Garden Bricklaying in Glasgow',
    h2Secondary1: 'Porcelain Terracing & Tiered Garden Landscaping',
    h2Secondary2: 'Sub-Surface Weep Hole Drainage & Foundation Engineering',
    h2PainPoint: 'Preventing Soil Movement & Landslip on Sloped Glasgow Gardens',
    directAnswer3Sec: 'Riverside Landscaping installs structural retaining walls in 3 to 7 days, using reinforced concrete footings, Scottish Whinstone, or engineered blockwork with integrated back-drainage.',
    soilContext: 'Sloped gardens in Bearsden and Giffnock exert immense lateral earth pressure when heavy clay becomes saturated. We install deep concrete footings and backfill with clean 20mm gravel to relieve hydro-static pressure.',
    bsStandard: 'Built strictly to BS8002 code of practice for earth retaining structures with weep-hole water relief channels.',
    features: [
      'Engineered Concrete Strip Footings below Frost Line',
      'Scottish Whinstone & Vitrified Porcelain Facing Option',
      'Boundary & Garden Brick Walls to Match Existing Property',
      'Continuous Geotextile Backfill & Filter Sock Drainage',
      'Integrated Weep-Holes to Prevent Hydrostatic Bulging',
      '10-Year Structural Wall Guarantee',
    ],
    faqs: [
      {
        question: 'How high can a garden retaining wall be built without structural calculations?',
        answer: 'Retaining walls under 1.0m height can be constructed without full structural calculations, but still require engineered concrete footings and weep-hole drainage under Scottish building guidelines.',
      },
    ],
    titleTag: "BEST Retaining Wall Builders Glasgow - If you're looking for stone wall builders near me or terraced landscaping near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'artificial-grass-glasgow',
    name: 'Luxury Artificial Turf & Lawns',
    category: 'Landscaping Services',
    primaryCategory: 'Artificial Turf',
    h1Title: 'Luxury Artificial Grass Installers in Glasgow',
    h2Secondary1: 'Porcelain Paving & Patio Landscaping Integration',
    h2Secondary2: 'Granite Dust Sub-Base Prep & Mud-Free Pet Lawns',
    h2PainPoint: 'Eliminating Muddy Lawns & Constant Mowing in Wet Scottish Climates',
    directAnswer3Sec: 'Riverside Landscaping artificial grass installations take 2 to 3 days, replacing soggy lawn turf with a 100mm compacted crushed granite sub-base, weed barrier, and child/pet-safe 38mm-45mm memory yarn grass.',
    soilContext: 'Clay soils in Glasgow turn natural lawns into mud pits from October to April. Our 100mm granite dust sub-base permits rapid drainage while staying 100% firm under foot.',
    bsStandard: 'Uses non-toxic, heavy metal-free yarns with high UV stability and latex/polyurethane backing for zero water retention.',
    features: [
      '38mm–45mm Ultra-Realism C-Shape Memory Yarns',
      '100mm Compacted Granite Dust & Type 1 Sub-Base',
      'Heavy-Duty Geotextile Weed Suppression Membrane',
      '100% Pet-Friendly Antimicrobial Infill Available',
      '10-Year Manufacturer & Installation Warranty',
    ],
    faqs: [
      {
        question: 'Will artificial grass drain properly on Glasgow heavy clay soil?',
        answer: 'Yes. We excavate the muddy clay surface and replace it with a 100mm permeable aggregate sub-base, ensuring rainfall drains through at over 60 liters per minute per m².',
      },
    ],
    titleTag: "BEST Artificial Grass Glasgow - If you're looking for astro turf near me or mud free lawn near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'garden-landscaping-glasgow',
    name: 'Garden Landscaping & Design',
    category: 'Landscaping Services',
    primaryCategory: 'Garden Landscaping',
    h1Title: 'Garden Landscaping & Design in Glasgow',
    h2Secondary1: 'Porcelain Paving & Patio Installers Near Me',
    h2Secondary2: 'Garden Drainage Solutions for Clay Soil & Wet Weather',
    h2PainPoint: 'A Full Garden Redesign, Planned Around Scottish Clay & Rainfall',
    directAnswer3Sec: 'A full garden landscaping project with Riverside Landscaping typically takes 1 to 3 weeks depending on scope, covering groundworks, planting, turfing, and hardscaping under one sequenced build.',
    soilContext: 'Most Glasgow gardens need groundworks before anything else — levelling, drainage, and topsoil correction on heavy clay — so planting and lawns actually establish instead of waterlogging.',
    bsStandard: 'Groundworks and any structural elements (steps, walls, drainage) are built to the same BS7533 / BS8002 standards used across every Riverside Landscaping service.',
    features: [
      'Full Garden Design & Sequenced Build Planning',
      'Groundworks, Levelling & Topsoil Correction',
      'Planting, Turfing & Border Design',
      'Coordinated Hardscaping, Drainage & Lighting',
      '10-Year Structural Guarantee on Hard Landscaping',
    ],
    faqs: [
      {
        question: 'Do you handle the whole garden or just hardscaping?',
        answer: "We plan and sequence the whole project — groundworks, drainage, hardscaping, planting, and turfing — so nothing gets built in the wrong order or has to be dug up again.",
      },
      {
        question: 'How long does a full garden landscaping project take?',
        answer: "Most full redesigns take 1 to 3 weeks depending on garden size and how much groundwork, planting, and hardscaping is involved. You'll get a project timeline as part of your written estimate.",
      },
    ],
    titleTag: "BEST Garden Landscaping Glasgow - If you're looking for garden designers near me or landscape gardeners near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: 'garden-rooms-glasgow',
    name: 'Garden Rooms & Outdoor Buildings',
    category: 'Landscaping Services',
    primaryCategory: 'Garden Rooms',
    h1Title: 'Garden Rooms & Outdoor Buildings in Glasgow',
    h2Secondary1: 'Composite Decking & Patio Access Platforms Near Me',
    h2Secondary2: 'Insulated, Damp-Proof Foundations for Scottish Weather',
    h2PainPoint: 'A Year-Round Garden Room That Stays Warm & Dry in Scottish Winters',
    directAnswer3Sec: 'Garden room installations by Riverside Landscaping take 2 to 4 weeks, built on insulated concrete or screw-pile foundations designed to stay level and damp-free on Glasgow clay.',
    soilContext: 'Clay soil movement is the main cause of garden room doors and windows sticking over time. We use screw-pile or reinforced concrete raft foundations rated for clay heave, keeping the structure level year-round.',
    bsStandard: 'Built with insulated wall and roof panels to current Building Standards for habitable outbuildings, with damp-proof membranes throughout the foundation.',
    features: [
      'Insulated Walls, Roof & Double-Glazed Units',
      'Screw-Pile or Reinforced Concrete Raft Foundations',
      'Electrics, Lighting & Heating First-Fix Included',
      'Matched External Cladding & Decking Thresholds',
      '10-Year Structural Guarantee',
    ],
    faqs: [
      {
        question: 'Do I need planning permission for a garden room in Glasgow?',
        answer: "Most garden rooms fall under permitted development if they're under 2.5m eaves height and within a certain footprint of your garden, but we check your specific plot and council rules before quoting.",
      },
      {
        question: 'Can a garden room be used year-round as an office or gym?',
        answer: "Yes, provided it's insulated and has heating — which is how we build every garden room by default, not as an optional extra.",
      },
    ],
    titleTag: "BEST Garden Rooms Glasgow - If you're looking for garden offices near me or outdoor buildings near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  },
  {
    slug: '3d-garden-design-glasgow',
    name: '3D Garden Design & Visualisation',
    category: 'Landscaping Services',
    primaryCategory: '3D Garden Design',
    h1Title: '3D Garden Design & Visualisation in Glasgow',
    h2Secondary1: 'Garden Landscaping & Full Redesign Projects Near Me',
    h2Secondary2: 'Planning Drainage & Levels Before Groundworks Begin',
    h2PainPoint: 'See Your Garden Before We Dig — No Surprises Mid-Build',
    directAnswer3Sec: 'Riverside Landscaping produces a full 3D design and material plan within 5 to 10 working days of your site survey, so you can see layout, materials, and levels before any groundworks start.',
    soilContext: "Every 3D design is built around your garden's actual survey data — levels, drainage falls, and access — so the design that gets modelled is one that can actually be built on your clay soil.",
    bsStandard: 'Design output includes a materials and levels plan used directly by our installation crews, keeping the built result matched to the design.',
    features: [
      'Full 3D Render From Your Site Survey Measurements',
      'Material, Planting & Lighting Visualisation',
      'Levels & Drainage Fall Planning Built Into the Design',
      'Revisions Before Any Groundworks Are Booked',
      'Design Handed Directly to Your Installation Crew',
    ],
    faqs: [
      {
        question: 'Do you charge separately for a 3D garden design?',
        answer: "An initial concept comes from your free site survey — detailed material and planting revisions for larger projects are scoped and agreed with you individually.",
      },
      {
        question: 'How long does a 3D garden design take?',
        answer: 'Most designs are ready within 5 to 10 working days of your site survey, depending on garden size and how many revisions are needed.',
      },
    ],
    titleTag: "BEST 3D Garden Design Glasgow - If you're looking for garden designers near me or landscape visualisation near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
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
    directAnswer3Sec: 'A fully installed porcelain patio in Glasgow costs between £120 and £180 per m² in 2026, based on typical material and labour costs. Riverside Landscaping confirms your exact number with a written estimate after a free site survey.',
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
  {
    slug: 'clay-soil-drainage-guide',
    title: 'Solving Heavy Clay Soil Drainage in Glasgow Gardens: Complete Engineering Guide',
    category: 'Technical Guides',
    publishDate: '2026-02-20',
    readingTime: '7 min read',
    summary: 'Technical guide to French drains, geotextile sub-base separation, and soakaway calculations for Greater Glasgow soils.',
    directAnswer3Sec: 'Fix heavy clay soil drainage in Glasgow by excavating 250mm–300mm deep, laying non-woven geotextile fleece, and installing perforated French drain pipes surrounded by 20mm clean gravel connected to soakaway crates.',
    sections: [
      {
        h2: 'Why Standard Lawns & Patios Fail on Scottish Glacial Till',
        directAnswer: 'Glasgow clay soil retains up to 70% more surface water than sandy loam, creating hydrostatic pressure under paving slabs during severe freeze-thaw cycles.',
        content: 'Glacial till in areas like Bearsden (G61) and Newton Mearns (G77) acts as a water barrier. Without subsurface land drains, heavy winter rain collects beneath shallow patio bases, forcing aggregate upwards during freeze events.',
      },
      {
        h2: 'The 3-Layer Drainage Solution for Waterlogged Gardens',
        directAnswer: 'A robust clay drainage system comprises: 1) Geotextile isolation fleece, 2) 150mm MOT Type 1 sub-base with perforated land drains, and 3) Flush ACO slot channels shedding water to soakaways.',
        content: 'By establishing continuous laser-leveled falls (1:60 ratio), surface runoff flows cleanly into perimeter slot channels before penetrating sub-layers.',
      },
    ],
    relatedServiceSlug: 'garden-drainage-solutions-glasgow',
    relatedServiceAnchor: 'View our full Glasgow land drainage engineering specifications',
    titleTag: "Glasgow Clay Soil Drainage Guide - French Drains & Sub-Base Prep - Riverside Landscaping",
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
    'Porcelain paving with complete site excavation, BS7533 sub-base preparation, and integrated drainage typically runs between £120 and £180 per m². We do not quote fixed prices upfront — every job gets a written estimate based on your specific materials and labour after a free site survey.',
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
    slug: 'bearsden-outdoor-lounge-heated-pergola',
    title: 'Architectural Outdoor Lounge & Heated Pergola',
    area: 'Bearsden',
    postcode: 'G61',
    category: 'porcelain',
    description: 'Transformation of a waterlogged clay rear garden into a multi-tiered luxury outdoor dining space with integrated perimeter slot drainage and ambient LED step lighting.',
    specs: ['60m² 20mm Italian Porcelain', 'Sub-Surface Slot Drainage', 'Heated Pergola Footings', 'BS7533 Sub-Base'],
    imageBefore: '/images/garden-before.webp',
    imageAfter: '/images/garden-after.webp',
    metric: '100% Sub-Surface Water Mitigation',
  },
  {
    id: 'proj-2',
    slug: 'newton-mearns-clay-drainage-raised-terrace',
    title: 'Deep Clay Drainage & Raised Terrace',
    area: 'Newton Mearns',
    postcode: 'G77',
    category: 'drainage',
    description: 'Complete excavation of boggy clay soil replaced with 300mm MOT Type 1 sub-base, geotextile membrane grid, and dark slate porcelain coping edges.',
    specs: ['Geotextile Clay Separation', 'ACO Slot Drain Channeling', '300mm Excavation Depth', 'Scottish Whinstone Borders'],
    imageAfter: '/images/garden-after.webp',
    metric: 'Eliminated Standing Water',
  },
  {
    id: 'proj-3',
    slug: 'giffnock-sun-terrace-sunken-seating',
    title: 'Contemporary Sun Terrace & Sunken Seating',
    area: 'Giffnock',
    postcode: 'G46',
    category: 'porcelain',
    description: 'Precision-cut light beige vitrified porcelain with R11 anti-slip rating, built with flush threshold drainage against sliding glass doors.',
    specs: ['Vitrified R11 Anti-Slip', 'Flush Door Threshold Drain', 'Concealed Access Inspection Covers'],
    imageAfter: '/images/garden-after.webp',
    metric: 'Zero-Step Threshold Transition',
  },
  {
    id: 'proj-4',
    slug: 'clarkston-driveway-retaining-wall',
    title: 'Permeable Driveway & Retaining Wall Complex',
    area: 'Clarkston',
    postcode: 'G76',
    category: 'driveway',
    description: 'Heavy vehicle load-rated granite block paving combined with structural retaining walls to handle steep elevation runoff.',
    specs: ['BS7533 Load-Bearing Foundation', 'Granite Coping Stones', 'Sub-Surface Retaining Wall Drainage'],
    imageAfter: '/images/garden-after.webp',
    metric: 'Vehicle Load Certified',
  },
]

// Cross-silo link from a portfolio category to its matching /landscaping-services/
// slug, for "read the full spec" links on each case study page.
export const PORTFOLIO_CATEGORY_TO_SERVICE_SLUG: Record<PortfolioItem['category'], string> = {
  porcelain: 'porcelain-paving-glasgow',
  drainage: 'garden-drainage-solutions-glasgow',
  driveway: 'driveway-installers-glasgow',
  pergola: 'garden-landscaping-glasgow',
}

export const PORTFOLIO_CATEGORY_LABELS: Record<PortfolioItem['category'], string> = {
  porcelain: 'Porcelain Patio',
  drainage: 'Garden Drainage',
  driveway: 'Driveway',
  pergola: 'Pergola & Landscaping',
}

// Completed PORTFOLIO_ITEMS whose category maps to this service slug — real
// case-study proof for a service detail page, when one exists yet.
export function getPortfolioForService(slug: string): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => PORTFOLIO_CATEGORY_TO_SERVICE_SLUG[item.category] === slug)
}

// KNOWLEDGE_ARTICLES tagged as relating to this service slug — real guide
// cross-links for a service detail page, when one exists yet.
export function getArticlesForService(slug: string): KnowledgeArticle[] {
  return KNOWLEDGE_ARTICLES.filter((article) => article.relatedServiceSlug === slug)
}

// Shared date display format for KNOWLEDGE_ARTICLES.publishDate wherever an
// article byline is rendered (knowledge base hub/detail, home page teaser).
export function formatArticleDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Two genuinely related services to cross-link from each service detail page —
// curated by hand (not derived from heading text, which is often about the
// *same* service's own subtopics rather than a sibling service) for accurate
// internal linking / topical clustering.
export const RELATED_SERVICES: Record<string, [string, string]> = {
  'porcelain-paving-glasgow': ['driveway-installers-glasgow', 'garden-drainage-solutions-glasgow'],
  'driveway-installers-glasgow': ['porcelain-paving-glasgow', 'retaining-walls-glasgow'],
  'garden-drainage-solutions-glasgow': ['porcelain-paving-glasgow', 'garden-landscaping-glasgow'],
  'composite-decking-glasgow': ['garden-fencing-glasgow', 'garden-rooms-glasgow'],
  'garden-fencing-glasgow': ['composite-decking-glasgow', 'garden-landscaping-glasgow'],
  'resin-bound-driveways-glasgow': ['driveway-installers-glasgow', 'garden-drainage-solutions-glasgow'],
  'retaining-walls-glasgow': ['garden-drainage-solutions-glasgow', 'garden-landscaping-glasgow'],
  'artificial-grass-glasgow': ['garden-landscaping-glasgow', 'garden-drainage-solutions-glasgow'],
  'garden-landscaping-glasgow': ['3d-garden-design-glasgow', 'porcelain-paving-glasgow'],
  'garden-rooms-glasgow': ['composite-decking-glasgow', 'garden-landscaping-glasgow'],
  '3d-garden-design-glasgow': ['garden-landscaping-glasgow', 'garden-rooms-glasgow'],
}

export function getRelatedServices(slug: string): ServiceDetail[] {
  const slugs = RELATED_SERVICES[slug] ?? []
  return slugs.map((s) => SERVICES.find((service) => service.slug === s)).filter((s): s is ServiceDetail => Boolean(s))
}

// Customer Testimonials
// Real Google Business Profile reviews for Riverside Landscaping.
// No per-customer suburb is available from GBP, so location stays at city level
// rather than inventing a specific postcode for a named person.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-marie-dee',
    name: 'Marie Dee',
    location: 'Glasgow',
    projectType: 'Full Garden Transformation',
    quote: 'I recently had Riverside Landscaping complete work in my garden and I couldn’t be happier with the results. From the initial quotation through to completion, Leon and his team were professional, reliable, and hardworking. They kept everything tidy throughout the project and completed the work to a very high standard. The finished garden has completely transformed the look of my property, and the attention to detail was excellent.',
    rating: 5,
    date: '10 August 2026',
  },
  {
    id: 'test-susanne-thomson',
    name: 'Susanne Thomson',
    location: 'Glasgow',
    projectType: 'Garden Landscaping',
    quote: 'Excellent landscaping service! The team was friendly, professional, and did an amazing job transforming our garden. They worked hard, paid attention to detail, and left everything clean and tidy.',
    rating: 5,
    date: '30 June 2026',
  },
  {
    id: 'test-nicholas-mcwilson',
    name: 'Nicholas McWilson',
    location: 'Glasgow',
    projectType: 'Driveway Installation',
    quote: 'What an amazing team — came out and done my driveway stress free and quickly, so reliable. Couldn’t be any more happier with them.',
    rating: 5,
    date: '30 June 2026',
  },
  {
    id: 'test-suzie-macleod',
    name: 'Suzie MacLeod',
    location: 'Glasgow',
    projectType: 'Landscaping Project',
    quote: 'Great team, hard working and consistent in good product. Would recommend.',
    rating: 5,
    date: '8 June 2026',
  },
  {
    id: 'test-willma-govan',
    name: 'Willma Govan',
    location: 'Glasgow',
    projectType: 'Large-Scale Garden Project',
    quote: 'The lads at Riverside Landscaping done a fantastic job for me, a big project got it done in convenient time — would absolutely recommend to anyone, so happy with the finished job.',
    rating: 5,
    date: '19 May 2026',
  },
  {
    id: 'test-l-d',
    name: 'L D',
    location: 'Glasgow',
    projectType: 'Back Garden Renovation',
    quote: 'Thank you to the lads at Riverside Landscaping for transforming my back garden and bringing life back to it, would definitely recommend.',
    rating: 5,
    date: '18 May 2026',
  },
  {
    id: 'test-heidi-sm',
    name: 'Heidi Sm',
    location: 'Glasgow',
    projectType: 'Patio & Fencing Installation',
    quote: 'Leon and his team came to our property, installed our new patio and surrounding fences. Would highly recommend this company.',
    rating: 5,
    date: '18 April 2026',
  },
  {
    id: 'test-latalia-stewart',
    name: 'Latalia Stewart',
    location: 'Glasgow',
    projectType: 'Back Garden Tiling & Fencing',
    quote: 'Great experience from start to finish. The team from Riverside did an excellent job on our back garden, installing Caledonian tiles and new fencing to a very high standard. The work was professional throughout, and the price reflected the quality.',
    rating: 5,
    date: '27 March 2026',
  },
  {
    id: 'test-isaac-foy',
    name: 'Isaac Foy',
    location: 'Glasgow',
    projectType: 'Landscaping Project',
    quote: 'Brilliant in every way — great advice, experience and highly standard tradesmen. Done a fantastic job and a good fair estimate for the work undertaken.',
    rating: 5,
    date: '27 March 2026',
  },
  {
    id: 'test-geoff-runcie',
    name: 'Geoff Runcie',
    location: 'Glasgow',
    projectType: 'Landscaping Works',
    quote: 'They responded to my request and I agreed the work scope and accepted their price. Work was done promptly and generally to my satisfaction. On the back of the original job I asked them to do some more work — this again was done promptly. My experience was positive.',
    rating: 4,
    date: '27 March 2026',
  },
  {
    id: 'test-l-foy',
    name: 'L Foy',
    location: 'Glasgow',
    projectType: 'Garden Landscaping',
    quote: 'Had great service from this company — came out, emailed a quote, agreed a price, work got completed and I was very happy with it. Looking forward to spending the spring/summer in my new garden.',
    rating: 5,
    date: '10 March 2026',
  },
]

// Derived from TESTIMONIALS — rounds the true average to a whole star for
// display (matches how the rating badge is shown everywhere on the site),
// and keeps the review count in sync with the actual testimonial list
// instead of a separately hardcoded number.
export const AVG_GOOGLE_RATING = Math.round(
  TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length,
)
export const GOOGLE_REVIEW_COUNT = TESTIMONIALS.length

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
    details: ['Laser transit level check', 'Mains drainage connection audit', 'Written estimate from materials & labour costs'],
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

/**
 * JSON-LD Schema Generator Engine conforming strictly to SEO_GEO_STRATEGY.md (Section 4)
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
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': String(AVG_GOOGLE_RATING),
          'reviewCount': String(GOOGLE_REVIEW_COUNT),
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

/**
 * Lightweight schema for the /ayrshire/ silo. Deliberately omits LandscapingBusiness
 * address/geo (no dedicated Ayrshire GBP listing exists yet) so we don't publish a
 * fabricated NAP record - swap this for generateGraphSchema-style full business
 * markup once BRAND_AYRSHIRE has a real address and phone number.
 */
export function generateAyrshireGraphSchema(pageUrl: string, faqItems: { question: string; answer: string }[] = []) {
  const schemaFaqs = faqItems.length > 0 ? faqItems : faqs.map(([question, answer]) => ({ question, answer }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
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
