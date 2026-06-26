import { ServiceCard, IndustryCard, AdvantageItem, TradeFinanceItem, ShipmentOrder, FabricationJob } from "./types";

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: "asset-procurement",
    title: "Industrial Asset Procurement",
    subtitle: "High-Spec Machinery & Asset Sourcing",
    description: "Sourcing certified heavy machinery, specialized spare parts, turbines, high-pressure pumps, and precision engineered assemblies across a global vendor network.",
    iconName: "Cpu",
    items: [
      "Rig and drill site packages",
      "Heavy duty rotating machinery",
      "Industrial pumps & compressors",
      "Specialized valves & fluid control",
      "OEM spare parts consolidation"
    ]
  },
  {
    id: "infrastructure-sourcing",
    title: "Infrastructure Sourcing",
    subtitle: "Bulk Civil & Structural Sourcing",
    description: "Providing comprehensive material and component procurement for heavy civil works, structural retrofits, and large-scale industrial infrastructure developments.",
    iconName: "Grid",
    items: [
      "Structural steel plates & beams",
      "Reinforced high-diameter piping",
      "High-power electrical transformers",
      "HVAC & industrial cooling systems",
      "Prefabricated structural modules"
    ]
  },
  {
    id: "fabrication-coordination",
    title: "Fabrication Coordination",
    subtitle: "End-to-End Build & QA Overseeing",
    description: "Supervising specialized manufacturing partners, managing quality assurance/control, conducting on-site non-destructive testing (NDT), and coordinating dimensional validation.",
    iconName: "Hammer",
    items: [
      "Houston & international partner yards",
      "API/ASME compliance vetting",
      "Dimensional & paint thickness inspection",
      "Welding inspector certification (AWS CWI)",
      "Production timeline auditing"
    ]
  },
  {
    id: "global-logistics",
    title: "Global Logistics Solutions",
    subtitle: "Multi-Modal Freight & Customs Management",
    description: "Executing complex heavy-haul transport, ocean chartering, breakbulk forwarding, and international customs clearance across major global ports.",
    iconName: "Compass",
    items: [
      "Charter vessel & breakbulk planning",
      "Over-dimensional heavy-haul routes",
      "Customs brokerage & tariff classification",
      "Bonded warehousing & consolidation",
      "End-to-end GPS container tracking"
    ]
  },
  {
    id: "project-procurement",
    title: "Project Procurement Management",
    subtitle: "Capital Project Supply Coordination",
    description: "Formulating end-to-end sourcing strategies, vendor selection plans, and logistics synchronization for multi-year capital projects in challenging environments.",
    iconName: "Briefcase",
    items: [
      "Pre-qualification of global suppliers",
      "SLA formulation & contract negotiations",
      "Material receipt & expediting logs",
      "On-site material management (OSMM)",
      "Supply chain risk diversification"
    ]
  },
  {
    id: "supply-chain",
    title: "Supply Chain Coordination",
    subtitle: "Strategic Vendor Optimization",
    description: "Optimizing supply chain efficiencies, implementing transparent supplier audit systems, and establishing agile vendor-managed inventory networks.",
    iconName: "Shuffle",
    items: [
      "Total cost of ownership (TCO) analyses",
      "Supplier scorecarding & metrics tracking",
      "Just-in-Time (JIT) delivery setups",
      "Material data ledger tracing",
      "Alternate routing contingency plans"
    ]
  }
];

export const INDUSTRIES_DATA: IndustryCard[] = [
  {
    id: "trans-fleet",
    title: "TRANSPORTATION & FLEET SOLUTIONS",
    iconName: "Truck",
    description: "Heavy-duty commercial assets, vocational fleets, and highly specialized freight hauling hardware.",
    subservices: [
      "Heavy-duty class-8 trucks",
      "Vocational construction vehicles",
      "Multi-axle lowboys & specialized trailers",
      "Bulk fleet acquisition packages"
    ]
  },
  {
    id: "energy-power",
    title: "ENERGY & POWER SYSTEMS",
    iconName: "Flame",
    description: "Generators, high-capacity sub-station transformers, oil & gas extraction support, and power grids.",
    subservices: [
      "Industrial standby generators",
      "High-voltage transformers & switchgear",
      "Wellhead & flowback assemblies",
      "Power grid infrastructure hardware"
    ]
  },
  {
    id: "mining-resources",
    title: "MINING & RESOURCES",
    iconName: "HardHat",
    description: "Heavy surface mining equipment, drilling rigs, HDD units, and robust material handling systems.",
    subservices: [
      "High-tonnage mining trucks",
      "Rotary blasthole drill rigs",
      "Heavy-duty conveyor systems",
      "Horizontal directional drilling kits"
    ]
  },
  {
    id: "infra-civil",
    title: "INFRASTRUCTURE & CIVIL",
    iconName: "Bridge",
    description: "Civil construction equipment, mobile crawler cranes, municipal solutions, and municipal steelworks.",
    subservices: [
      "High-capacity crawler & tower cranes",
      "Bridge structural erection girders",
      "Earthmoving & highway machinery",
      "Heavy hydraulic shoring systems"
    ]
  },
  {
    id: "marine-logistics",
    title: "MARINE & PORT LOGISTICS",
    iconName: "Ship",
    description: "Cargo vessels, specialized port rigging, marine propulsion elements, and container logistics systems.",
    subservices: [
      "Support vessel procurement",
      "High-capacity port terminal cranes",
      "Marine diesel engines & prop shafts",
      "Shipboard handling and deck gear"
    ]
  },
  {
    id: "power-systems",
    title: "POWER GRID SYSTEMS",
    iconName: "Zap",
    description: "Renewable integration assets, sub-stations, and high-capacity battery power arrays.",
    subservices: [
      "Utility-scale battery storages",
      "Sub-station controls & protective relays",
      "Industrial inverter setups",
      "High-voltage AC/DC converters"
    ]
  },
  {
    id: "fab-engineering",
    title: "FABRICATION & ENGINEERING",
    iconName: "Settings",
    description: "Custom structures, pressure vessels, modular skids, and precision heavy assemblies.",
    subservices: [
      "Heavy wall structural skids",
      "ASME Sec. VIII pressure vessels",
      "Subsea production manifolds",
      "Precision custom-tooled components"
    ]
  }
];

export const ADVANTAGES_DATA: AdvantageItem[] = [
  {
    title: "GLOBAL PROCUREMENT",
    description: "Access to vetted, tier-1 suppliers, manufacturers, and asset holders on six continents.",
    iconName: "Globe"
  },
  {
    title: "INDUSTRIAL NETWORK",
    description: "Deep relationships with dry docks, heavy haul carriers, and certified ASME fabrication facilities.",
    iconName: "Network"
  },
  {
    title: "STRUCTURED TRANSACTIONS",
    description: "Rigorous compliance management, strict SLA contracts, and bulletproof trade documentation.",
    iconName: "FileCheck"
  },
  {
    title: "HOUSTON HEADQUARTERS",
    description: "Strategically located in the global capital of energy and industrial logistics for instantaneous oversight.",
    iconName: "MapPin"
  }
];

export const TRADE_FINANCE_DATA: TradeFinanceItem[] = [
  {
    title: "SBA 7(a) Financing Support",
    subtitle: "Federal Sourcing Backing",
    description: "Coordinating standard commercial loans with federal agency backing to fund major fleet expansions.",
    iconName: "TrendingUp"
  },
  {
    title: "SBA Express Financing Support",
    subtitle: "Expedited Capital Sourcing",
    description: "Arranging quick-turnaround liquidity loans for time-critical, auction-based machinery acquisition.",
    iconName: "Zap"
  },
  {
    title: "Asset-Based Lending Assistance",
    subtitle: "Leverage Existing Worth",
    description: "Unlocking immediate operating capital by pledging current heavy fleets and material reserves.",
    iconName: "Layers"
  },
  {
    title: "Equipment Leasing Programs",
    subtitle: "Flexible Fleet Additions",
    description: "Setting up off-balance-sheet operating leases to deploy high-spec assets without heavy capital expenditure.",
    iconName: "Percent"
  },
  {
    title: "Export Finance Coordination",
    subtitle: "Cross-Border Settlement",
    description: "Enforcing Exim-bank compliance, processing international letters of credit (LC), and risk mitigation.",
    iconName: "ShieldAlert"
  },
  {
    title: "Trade Credit Insurance Support",
    subtitle: "Insolvency Risk Safeguard",
    description: "Securing comprehensive credit policies that shield cross-border receivables against buyer defaults.",
    iconName: "Activity"
  }
];

// High-fidelity Mock Shipment Orders for Client Portal Simulator
export const MOCK_SHIPMENTS: ShipmentOrder[] = [
  {
    id: "sh-101",
    trackingId: "STR-8890-TX",
    cargoType: "API Spec-5L Steel Pipe Racks (300 Tons)",
    origin: "Port of Rotterdam, Netherlands",
    destination: "Port of Houston, Texas, USA",
    status: "In Transit",
    progress: 68,
    eta: "July 04, 2026",
    carrier: "Maersk Industrial Marine",
    vesselName: "MV STRAWON GUARDIAN",
    value: "$1,850,000",
    lat: 32.75,
    lng: -42.20,
    timeline: [
      { stage: "Asset Sourcing & Verification", date: "June 10, 2026", location: "Düsseldorf, Germany", completed: true },
      { stage: "AWS Inspector Dimension QA", date: "June 15, 2026", location: "Rotterdam Depot", completed: true },
      { stage: "Vessel Loading & Port Export Clearance", date: "June 18, 2026", location: "Port of Rotterdam", completed: true },
      { stage: "Atlantic Crossing Transit", date: "June 26, 2026", location: "Atlantic Ocean Sector 4", completed: false },
      { stage: "Customs Tariff Classification Validation", date: "July 02, 2026", location: "Houston Port customs", completed: false },
      { stage: "Yard Dispatch & Final Delivery Check", date: "July 05, 2026", location: "Houston Refinery Site", completed: false }
    ]
  },
  {
    id: "sh-102",
    trackingId: "STR-2294-AZ",
    cargoType: "Caterpillar 797F Mining Truck Chassis & Spares",
    origin: "Peoria Fabrication Yard, IL, USA",
    destination: "Port of Antofagasta, Chile",
    status: "Customs Clearance",
    progress: 90,
    eta: "June 29, 2026",
    carrier: "Excellence Heavy Haul",
    vesselName: "SeaStar Transporter",
    value: "$3,400,000",
    lat: -23.65,
    lng: -70.40,
    timeline: [
      { stage: "Sourcing Contract Execution", date: "May 20, 2026", location: "Houston HQ", completed: true },
      { stage: "Chassis Non-Destructive Testing (NDT)", date: "May 25, 2026", location: "Peoria Facility", completed: true },
      { stage: "Heavy Haul Land Transport", date: "June 02, 2026", location: "USA Interstate Transit", completed: true },
      { stage: "Ocean Charter Transit", date: "June 10, 2026", location: "Pacific Marine Way", completed: true },
      { stage: "Antofagasta Port Customs Inspection", date: "June 25, 2026", location: "Chile Customs Depot", completed: true },
      { stage: "Mining Concession Deliverable Support", date: "June 29, 2026", location: "Atacama Copper Concession", completed: false }
    ]
  },
  {
    id: "sh-103",
    trackingId: "STR-4091-QA",
    cargoType: "ASME Sec. VIII Pressure Vessel (Custom build)",
    origin: "Stravon Partner Fabrication Yard, Houston, TX",
    destination: "Santos Petrochemical Expansion, Brazil",
    status: "Fabrication",
    progress: 45,
    eta: "August 12, 2026",
    carrier: "Global Breakbulk Logistics",
    vesselName: "Stravon Heavy Lift",
    value: "$2,200,000",
    lat: 29.76,
    lng: -95.36,
    timeline: [
      { stage: "Sourcing & Metal Plates Quality Vetting", date: "June 12, 2026", location: "Houston Steelworks", completed: true },
      { stage: "Hydrostatic & ASME Code Welding", date: "June 24, 2026", location: "Houston Fab Yard 3", completed: true },
      { stage: "In-Progress NDT Weld Inspections", date: "June 26, 2026", location: "Houston Fab Yard 3", completed: false },
      { stage: "Dimensional Sandblast & Paint Coating", date: "July 15, 2026", location: "Houston Coating Yard", completed: false },
      { stage: "Port of Houston Embarkation", date: "July 24, 2026", location: "Port of Houston", completed: false },
      { stage: "Delivery & Commissioning Check", date: "August 12, 2026", location: "Santos Petrochemical", completed: false }
    ]
  }
];

export const MOCK_FAB_JOBS: FabricationJob[] = [
  {
    id: "fab-01",
    component: "12-Inch High Pressure Manifold Assembly",
    quantity: "4 Units",
    partnerFacility: "Houston Precision Tool & Weld (API Certified)",
    status: "Welding",
    progress: 60,
    qaOfficer: "H. G. Miller (AWS CWI #990214)",
    specifications: "API-6A PSL-3, EE-Trim, 10,000 PSI Working Pressure"
  },
  {
    id: "fab-02",
    component: "Structural Deck Crane Swivel Bases",
    quantity: "2 Units",
    partnerFacility: "Gulf Coast Structural Fab, Beaumont, TX",
    status: "QA Inspection",
    progress: 95,
    qaOfficer: "S. J. Vance (ASNT Level III NDT)",
    specifications: "AWS D1.1 Structural Carbon, Radiography Checked Welds"
  }
];
