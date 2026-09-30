export interface PitchSlide {
  id: string;
  slideNumber: number;
  category: string;
  title: string;
  tagline: string;
  keyMetric: {
    value: string;
    label: string;
  };
  narrative: string;
  bulletPoints: Array<{
    title: string;
    description: string;
  }>;
  communityImpactHighlight: string;
}

export const PITCH_DECK_SLIDES: PitchSlide[] = [
  {
    id: 'problem',
    slideNumber: 1,
    category: 'The Global Crisis',
    title: '500 Million Smallholders Blinded by Climate Volatility',
    tagline: 'Traditional ancestral calendars no longer work in an era of unseasonal heat spells and erratic monsoons.',
    keyMetric: {
      value: '70%',
      label: 'Of Food in Emerging Nations Produced by Smallholders Under 2 Hectares',
    },
    narrative: 'Small and marginal farmers across BRICS nations are trapped between expensive proprietary chemical inputs and unpredictable climate extremes. Without access to high-resolution satellite vegetation data, soil health analytics, or prompt disease identification, single pest outbreaks or unseasonal heatwaves wipe out an entire season of subsistence livelihood.',
    bulletPoints: [
      {
        title: 'Asymmetric Information Divide',
        description: 'Big ag-corporations have satellite telemetry and AI; smallholders rely on guesswork or predatory agrochemical retail salespeople.',
      },
      {
        title: 'Severe Soil Degradation Cycle',
        description: 'Over-application of synthetic urea depletes soil organic carbon below 0.5%, stripping the soil of its natural microbial resilience and water-holding sponge capacity.',
      },
      {
        title: 'Fragmented Silos',
        description: 'Solutions developed in Brazil (like no-till biomass systems) or India (natural farming consortia) rarely reach farmers in South Africa or Egypt due to lack of open digital public rails.',
      },
    ],
    communityImpactHighlight: 'In emerging economies, a single crop failure pushes vulnerable farming families 2 to 3 years into high-interest debt cycles.',
  },
  {
    id: 'solution',
    slideNumber: 2,
    category: 'The Innovation',
    title: 'BRICS AgriNet: Sovereign Digital Public Infrastructure for Food Security',
    tagline: 'Uniting Earth Observation, Soil Intelligence, and Gemini 3.8 Flash into localized, voice-ready agro-advisories.',
    keyMetric: {
      value: '< 3 sec',
      label: 'Real-time Localised Multilingual Advisory Latency via Gemini 3.8 Flash',
    },
    narrative: 'Inspired by the BRICS AgriN initiative, we architected an interoperable Digital Public Good (DPG) that ingests open satellite data (Sentinel-2, CBERS-4A, Landsat 9), real-time soil test parameters, and 7-day micro-climate forecasts. The system translates complex telemetry into simple, actionable regenerative agronomy delivered directly in regional languages.',
    bulletPoints: [
      {
        title: 'Hyper-Localized Precision Context',
        description: 'Advisories are not generic. They account for exact soil pH, N-P-K deficits, NDVI canopy stress indices, and forecasted heat spikes.',
      },
      {
        title: 'Computer Vision Pathology Lab',
        description: 'Farmers upload a leaf photo to diagnose fungal, bacterial, or transboundary pests with biological IPM formulations using locally available bio-resources.',
      },
      {
        title: 'Voice-First Accessibility',
        description: 'Built-in audio synthesizer reads out step-by-step guidance in local languages for smallholders who face literacy barriers.',
      },
    ],
    communityImpactHighlight: 'Zero paywalls, zero vendor lock-in, and zero proprietary seed entrapment. Pure digital public good.',
  },
  {
    id: 'cooperation',
    slideNumber: 3,
    category: 'BRICS Cooperation Theme',
    title: 'Cross-Border Knowledge Transfer as a Digital Public Good',
    tagline: 'Bridging the Global South by sharing agricultural science, not proprietary patents.',
    keyMetric: {
      value: '10+',
      label: 'Agro-Ecological Zones Bridged Across Brazil, Russia, India, China & South Africa',
    },
    narrative: 'The strength of BRICS lies in ecological diversity: Brazil pioneered tropical no-till and biological nitrogen fixation; India mastered drought-resilient millets and natural farming; China leads in saline-alkali land reclamation; Russia stewards deep chernozem carbon reservoirs; South Africa excels in regenerative rangeland resilience. AgriNet bridges these institutions through open APIs.',
    bulletPoints: [
      {
        title: 'EMBRAPA × ICAR Bilateral Transfer',
        description: 'Adapting Brazilian tropical oxisol straw-mulching to Indian Indo-Gangetic wheat farms reduces soil temperature by 4-6°C during terminal heat.',
      },
      {
        title: 'Transboundary Early Warning Network',
        description: 'Airborne wheat rust spores and Fall Armyworm migratory corridors are tracked cooperatively across Eurasian and Afro-Asian flyways.',
      },
      {
        title: 'Federated Open Germplasm DB',
        description: 'Open-access genetic models for orphan drought-hardy crops shared under FAO standard multilateral agreements.',
      },
    ],
    communityImpactHighlight: 'Turns geopolitical cooperation into tangible yield improvements in the hands of village farmers.',
  },
  {
    id: 'regenerative-impact',
    slideNumber: 4,
    category: 'Environmental Stewardship',
    title: 'From Chemical Dependency to Soil Carbon Regeneration',
    tagline: 'Building living soil sponges that sequester carbon and withstand climate extremes.',
    keyMetric: {
      value: '+1.8x',
      label: 'Target Increase in Soil Organic Carbon Over 3 Cropping Seasons',
    },
    narrative: 'Conventional agriculture treats soil as inert dirt fed by chemical drips. BRICS AgriNet champions regenerative protocols: microbial bio-fertilizers (Rhizobium, Trichoderma, Mycorrhizae), companion trap-cropping, biochar soil conditioning, and cover cropping. Every recommendation actively rebuilds topsoil biology.',
    bulletPoints: [
      {
        title: '42% Water Savings',
        description: 'Mulching and biological organic matter retention increases soil water infiltration, halving evaporative losses during dry spells.',
      },
      {
        title: 'Bio-Inputs Cost Reduction',
        description: 'Substituting 40% of synthetic urea with locally brewed bio-consortia saves $85-$120 per hectare for marginal farmers.',
      },
      {
        title: 'Carbon Insetting for Smallholders',
        description: 'Soil carbon flux data verifiable via open satellite registries, laying ground for community-level soil carbon credits.',
      },
    ],
    communityImpactHighlight: 'Restores degraded agricultural land into resilient agro-ecosystems capable of surviving 3-week rainless spells.',
  },
  {
    id: 'architecture',
    slideNumber: 5,
    category: 'System Architecture',
    title: 'Scalable, Interoperable Full-Stack Engineering',
    tagline: 'Express backend proxying Gemini 3.8 Flash with robust edge-case prompt instructions and resilient fallback modes.',
    keyMetric: {
      value: '100%',
      label: 'Uptime Resiliency via Cached Regional Knowledge Base & Offline Standards',
    },
    narrative: 'Built as a production-grade full-stack web application. The frontend leverages React 19, Tailwind CSS, and Lucide icons with zero unnecessary bloat. The Express backend integrates with Google GenAI SDK using Gemini 3.8 Flash with specialized system prompts designed for edge-case resilience (extreme soil pH, conflicting symptoms, non-crop photo rejections).',
    bulletPoints: [
      {
        title: 'Server-Side Secure Gemini Proxy',
        description: 'Zero API keys exposed in browser bundles. Clean RESTful endpoints for advisory generation, multimodal disease diagnosis, and public good discovery.',
      },
      {
        title: 'Interoperable Data Standards',
        description: 'Compliant with FAO AgGateway, GeoJSON, and W3C JSON-LD schema definitions, allowing seamless integration by any national ministry of agriculture.',
      },
      {
        title: 'Zero-Dead-Click UX Constitution',
        description: 'Every control, filter, region switcher, soil slider, and camera capture works seamlessly with instant visual feedback and audio readout.',
      },
    ],
    communityImpactHighlight: 'Lightweight code footprint (<50MB) and optimized for low-bandwidth 3G mobile networks in rural villages.',
  },
  {
    id: 'scale-roadmap',
    slideNumber: 6,
    category: 'Scalability & Policy Roadmap',
    title: 'Path to 50 Million Smallholders by 2028',
    tagline: 'Deploying as open Digital Public Infrastructure (DPI) through agricultural extension centers.',
    keyMetric: {
      value: 'SDG 2, 13, 17',
      label: 'Aligned with UN Sustainable Development Goals & BRICS 2024 Kazan Declaration',
    },
    narrative: 'We are not building a walled-garden SaaS startup; we are deploying a sovereign Digital Public Good. By partnering with existing agricultural extension workers, Krishi Vigyan Kendras (India), EMBRAPA rural extension hubs (Brazil), and agricultural colleges in South Africa, AgriNet scales through trusted community intermediaries.',
    bulletPoints: [
      {
        title: 'Phase 1: Pilot Validation (Months 1-6)',
        description: 'Deployment across 50 regional cluster cooperatives in India, Brazil, and South Africa covering 100,000 marginal farmers.',
      },
      {
        title: 'Phase 2: BRICS+ Expansion (Months 7-18)',
        description: 'Integration with Egypt, Ethiopia, UAE, and Iran national soil telemetry networks and multilingual voice models.',
      },
      {
        title: 'Phase 3: Global South Public Good (Months 19-36)',
        description: 'Federated release to the African Union and CELAC through open-source digital public good alliances.',
      },
    ],
    communityImpactHighlight: 'Strengthens national food sovereignty while fostering genuine South-South technological solidarity.',
  },
];
