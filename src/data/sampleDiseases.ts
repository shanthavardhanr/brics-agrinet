export interface SampleDiseaseCase {
  id: string;
  crop: string;
  commonName: string;
  scientificName: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Infestation' | 'Nutrient Deficiency';
  regionsAffected: string[];
  severity: 'Mild' | 'Moderate' | 'Critical';
  imagePlaceholder: string;
  symptomsText: string;
  visualColor: string;
}

export const SAMPLE_DISEASES: SampleDiseaseCase[] = [
  {
    id: 'wheat-yellow-rust',
    crop: 'Wheat (Triticum aestivum)',
    commonName: 'Yellow / Stripe Rust',
    scientificName: 'Puccinia striiformis f. sp. tritici',
    pathogenType: 'Fungal',
    regionsAffected: ['India', 'Russia', 'China', 'South Africa', 'Egypt'],
    severity: 'Moderate',
    visualColor: '#EAB308',
    imagePlaceholder: 'Bright yellow-orange powdery pustules arranged in distinct parallel stripes along the leaf veins of wheat flag leaves.',
    symptomsText: 'Visible parallel strips of yellow-orange powdery spore pustules on the upper leaf surface, causing chlorosis and drying of the leaf blade.',
  },
  {
    id: 'soybean-rust',
    crop: 'Soybean (Glycine max)',
    commonName: 'Asian Soybean Rust (ASR)',
    scientificName: 'Phakopsora pachyrhizi',
    pathogenType: 'Fungal',
    regionsAffected: ['Brazil', 'South Africa', 'India', 'China'],
    severity: 'Critical',
    visualColor: '#B45309',
    imagePlaceholder: 'Tan to dark reddish-brown polygonal lesions on lower leaf surfaces with volcano-shaped raised pustules (uredinia).',
    symptomsText: 'Tiny brown-tan lesions predominantly on the underside of lower leaves, leading to rapid defoliation and premature maturation.',
  },
  {
    id: 'rice-bacterial-blight',
    crop: 'Rice (Oryza sativa)',
    commonName: 'Bacterial Leaf Blight (BLB)',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    pathogenType: 'Bacterial',
    regionsAffected: ['India', 'China'],
    severity: 'Critical',
    visualColor: '#D97706',
    imagePlaceholder: 'Water-soaked translucent lesions starting from leaf tips and margins, turning yellow-straw colored with wavy margins.',
    symptomsText: 'Lesions begin as water-soaked stripes on the leaf tips, progressing down the edges into bleached straw-colored blight with milky bacterial ooze under humid mornings.',
  },
  {
    id: 'maize-fall-armyworm',
    crop: 'Maize (Zea mays)',
    commonName: 'Fall Armyworm Infestation',
    scientificName: 'Spodoptera frugiperda',
    pathogenType: 'Pest Infestation',
    regionsAffected: ['South Africa', 'India', 'Brazil', 'Ethiopia'],
    severity: 'Critical',
    visualColor: '#991B1B',
    imagePlaceholder: 'Ragged window-paning on whorl leaves with moist sawdust-like dark green frass in the central funnel.',
    symptomsText: 'Ragged shot-hole feeding on leaf whorls with heavy accumulation of coarse fecal frass in the center funnel; caterpillars with inverted Y mark on head capsule.',
  },
  {
    id: 'tomato-early-blight',
    crop: 'Tomato (Solanum lycopersicum)',
    commonName: 'Target Spot / Early Blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungal',
    regionsAffected: ['Egypt', 'India', 'Brazil', 'Ethiopia'],
    severity: 'Moderate',
    visualColor: '#78350F',
    imagePlaceholder: 'Concentric dark brown rings resembling a bulls-eye or target pattern, surrounded by chlorotic yellow halos.',
    symptomsText: 'Circular dark brown spots with concentric target-like rings on older lower leaves, surrounded by bright yellow chlorotic halos causing premature leaf drop.',
  },
  {
    id: 'cassava-mosaic',
    crop: 'Cassava (Manihot esculenta)',
    commonName: 'Cassava Mosaic Disease (CMD)',
    scientificName: 'Cassava mosaic begomovirus',
    pathogenType: 'Viral',
    regionsAffected: ['Brazil', 'India', 'Ethiopia'],
    severity: 'Moderate',
    visualColor: '#15803D',
    imagePlaceholder: 'Severe mosaic mottling, leaf distortion, curling, and stunted crinkled leaflets transmitted by whiteflies.',
    symptomsText: 'Severe chlorotic green-yellow mosaic patches on leaf blades, marked leaf distortion and puckering, and reduction in storage root bulking.',
  },
];
