import { SoilHealthData, SoilHealthSummary, SoilParameterEvaluation } from '../types/agriculture';

export interface CropSoilProfile {
  name: string;
  category: string;
  optimalPh: string;
  minPh: number;
  maxPh: number;
  targetOc: number;
  typicalNitrogenNeed: string;
  soilNotes: string;
}

export const CROP_SOIL_PROFILES: Record<string, CropSoilProfile> = {
  Wheat: {
    name: 'Wheat',
    category: 'Cereal Grain',
    optimalPh: '6.0 – 7.5',
    minPh: 5.8,
    maxPh: 7.8,
    targetOc: 0.75,
    typicalNitrogenNeed: 'Medium to High (180–240 kg/ha)',
    soilNotes: 'Wheat thrives in well-drained loamy soils. Moderate organic carbon supports uniform crown root development.',
  },
  Rice: {
    name: 'Rice (Paddy)',
    category: 'Cereal Grain',
    optimalPh: '5.5 – 6.8',
    minPh: 5.2,
    maxPh: 7.2,
    targetOc: 0.75,
    typicalNitrogenNeed: 'High (200–260 kg/ha)',
    soilNotes: 'Rice tolerates slightly acidic soils and benefits from organic matter that enhances puddle water holding capacity.',
  },
  Maize: {
    name: 'Maize (Corn)',
    category: 'Cereal Grain',
    optimalPh: '6.0 – 7.2',
    minPh: 5.8,
    maxPh: 7.5,
    targetOc: 0.80,
    typicalNitrogenNeed: 'High (220–280 kg/ha)',
    soilNotes: 'Maize is very sensitive to soil compaction and waterlogging. Deep loams rich in organic matter produce superior cobs.',
  },
  Soybean: {
    name: 'Soybean',
    category: 'Legume / Oilseed',
    optimalPh: '6.2 – 7.0',
    minPh: 5.8,
    maxPh: 7.5,
    targetOc: 0.80,
    typicalNitrogenNeed: 'Low (Fixes own N with Bradyrhizobium)',
    soilNotes: 'Soybean relies heavily on biological nitrogen fixation in root nodules. Adequate phosphorus and near-neutral pH are vital.',
  },
  Tomato: {
    name: 'Tomato',
    category: 'Vegetable',
    optimalPh: '6.2 – 6.8',
    minPh: 5.8,
    maxPh: 7.2,
    targetOc: 0.90,
    typicalNitrogenNeed: 'Balanced (High Potassium & Calcium)',
    soilNotes: 'Tomatoes require high organic matter to buffer against blossom end rot and maintain constant root moisture.',
  },
  Cotton: {
    name: 'Cotton',
    category: 'Fiber / Cash Crop',
    optimalPh: '6.5 – 7.8',
    minPh: 6.0,
    maxPh: 8.2,
    targetOc: 0.70,
    typicalNitrogenNeed: 'Medium (160–210 kg/ha)',
    soilNotes: 'Cotton tolerates slightly alkaline deep black (Vertisol) soils. Needs good subsoil aeration.',
  },
  Groundnut: {
    name: 'Groundnut / Peanut',
    category: 'Legume / Oilseed',
    optimalPh: '6.0 – 6.8',
    minPh: 5.5,
    maxPh: 7.2,
    targetOc: 0.65,
    typicalNitrogenNeed: 'Low to Medium (Calcium rich)',
    soilNotes: 'Prefers light sandy loams allowing easy peg penetration and pod development. Needs adequate calcium.',
  },
  Millets: {
    name: 'Pearl / Finger Millet',
    category: 'Climate-Hardy Grain',
    optimalPh: '5.5 – 8.0',
    minPh: 5.0,
    maxPh: 8.5,
    targetOc: 0.60,
    typicalNitrogenNeed: 'Low to Moderate (100–150 kg/ha)',
    soilNotes: 'Extremely hardy in dry, marginal, and low-fertility sandy soils. Highly efficient water and nutrient scavenger.',
  },
  Other: {
    name: 'Other / General Crops',
    category: 'General Agriculture',
    optimalPh: '6.0 – 7.5',
    minPh: 5.8,
    maxPh: 7.8,
    targetOc: 0.75,
    typicalNitrogenNeed: 'General Balanced Crop Nutrition',
    soilNotes: 'General soil fertility guidelines based on standard agro-ecological thresholds.',
  },
};

/**
 * Educational parameter definitions for "What does this mean?"
 */
export const SOIL_PARAMETER_EXPLANATIONS: Record<string, { whatIsIt: string; whyItMatters: string; howToImprove: string }> = {
  ph: {
    whatIsIt: 'Soil pH measures how acidic or alkaline (sweet or sour) your soil is on a scale from 0 to 14. A pH of 7.0 is neutral.',
    whyItMatters: 'Different crops prefer different pH ranges. If pH is too low (acidic) or too high (alkaline), plant roots cannot absorb fertilizers even if they are present in the soil.',
    howToImprove: 'If acidic (below 6.0): apply agricultural lime or wood ash. If alkaline (above 8.0): apply agricultural gypsum, sulfur, or compost.',
  },
  organicCarbon: {
    whatIsIt: 'Organic carbon shows the amount of living and decomposed plant and animal matter (humus) stored in your topsoil.',
    whyItMatters: 'Organic carbon is the life of the soil. It acts like a sponge holding moisture during dry spells, houses beneficial microbes, and steadily feeds roots.',
    howToImprove: 'Incorporate well-rotted cattle manure, compost, vermicompost, retain crop stubble, use cover crops (like cowpea or sunn hemp), and avoid excessive plowing.',
  },
  nitrogen: {
    whatIsIt: 'Nitrogen (N) is the primary macronutrient responsible for green leaf growth, chlorophyll formation, and plant vigor.',
    whyItMatters: 'When nitrogen is low, older leaves turn pale yellow (chlorosis), and plants remain stunted. Excess synthetic nitrogen can cause leafy weak stems and pest attacks.',
    howToImprove: 'Apply compost, grow nitrogen-fixing legume green manures, use bio-fertilizers like Azotobacter or Rhizobium, or apply balanced organic cakes (neem cake).',
  },
  phosphorus: {
    whatIsIt: 'Phosphorus (P) is an essential nutrient needed for strong root development, flowering, seed setting, and early crop establishment.',
    whyItMatters: 'Without adequate phosphorus, seedlings develop weak root systems and purple-tinted leaves, leading to poor grain filling.',
    howToImprove: 'Apply rock phosphate enriched with Phosphate Solubilizing Bacteria (PSB), farmyard compost, or bone meal.',
  },
  potassium: {
    whatIsIt: 'Potassium (K, Potash) regulates water movement inside plant cells and builds resistance against disease, drought, and cold.',
    whyItMatters: 'Potassium strengthens plant stalks, prevents lodging (falling over), improves grain/fruit weight, and helps crops survive dry spells.',
    howToImprove: 'Apply wood ash, organic potash (derived from molasses or compost), green waste compost, or bio-potash inoculants.',
  },
  moisture: {
    whatIsIt: 'Soil moisture is the percentage of water stored in the active root zone available for plant uptake.',
    whyItMatters: 'Even with good nutrients, plants cannot drink food if the soil is too dry. Too much standing water suffocates root breathing.',
    howToImprove: 'Maintain 5-8 cm straw or leaf mulch over bare soil, practice drip or micro-sprinkler irrigation in early mornings, and build organic matter.',
  },
  salinityEc: {
    whatIsIt: 'Electrical Conductivity (EC) measures the amount of dissolved mineral salts in soil water.',
    whyItMatters: 'High salinity (above 2.0–3.0 dS/m) draws water out of plant roots through osmotic pressure, causing salt burn on leaf tips and stunted growth.',
    howToImprove: 'Ensure proper field drainage, avoid over-applying chemical fertilizers, flush root zones with good quality irrigation water, and use salt-tolerant cultivars.',
  },
  texture: {
    whatIsIt: 'Soil texture describes the mixture of sand, silt, and clay particles that make up the mineral fabric of your field.',
    whyItMatters: 'Sandy soils drain fast and lose nutrients quickly. Clay soils hold water but can become waterlogged. Loamy soils provide the ideal balance.',
    howToImprove: 'Soil texture is permanent, but adding organic compost improves both sandy soils (holds moisture) and heavy clay soils (improves drainage).',
  },
};

/**
 * Evaluates soil parameters against crop-specific rules
 */
export function evaluateSoilHealth(
  soil: SoilHealthData,
  cropName: string = 'Wheat'
): SoilHealthSummary {
  const profile = CROP_SOIL_PROFILES[cropName] || CROP_SOIL_PROFILES.Other;
  const reasons: string[] = [];
  const actionableAdvice: string[] = [];
  const parameters: SoilParameterEvaluation[] = [];

  let goodCount = 0;
  let attentionCount = 0;
  let improvementCount = 0;

  // 1. pH Evaluation
  if (typeof soil.ph === 'number' && !isNaN(soil.ph)) {
    let phStatus: SoilParameterEvaluation['status'] = 'good';
    let phText = `Good — within ${profile.name}'s optimal range (${profile.optimalPh})`;
    let phRec = 'Maintain current soil balance with organic mulch.';

    if (soil.ph < profile.minPh - 0.5 || soil.ph > profile.maxPh + 0.5) {
      phStatus = 'needs_improvement';
      phText = soil.ph < 6.0
        ? `Needs improvement — highly acidic (pH ${soil.ph.toFixed(1)}), limiting nutrient availability.`
        : `Needs improvement — highly alkaline (pH ${soil.ph.toFixed(1)}), causing micronutrient lock-up.`;
      reasons.push(`Soil pH (${soil.ph.toFixed(1)}) is outside ${profile.name}'s recommended range (${profile.optimalPh}).`);
      phRec = soil.ph < 6.0 ? 'Apply agricultural lime or composted wood ash.' : 'Apply agricultural gypsum and organic matter.';
      improvementCount++;
    } else if (soil.ph < profile.minPh || soil.ph > profile.maxPh) {
      phStatus = 'needs_attention';
      phText = `Needs attention — slightly ${soil.ph < profile.minPh ? 'low' : 'high'} for ${profile.name}.`;
      reasons.push(`Soil pH (${soil.ph.toFixed(1)}) is borderline for optimal ${profile.name} performance.`);
      phRec = 'Incorporate organic compost to naturally buffer pH.';
      attentionCount++;
    } else {
      goodCount++;
    }

    parameters.push({
      parameter: 'ph',
      label: 'Soil pH (Reaction)',
      valueDisplay: soil.ph.toFixed(1),
      rawNumericValue: soil.ph,
      unit: '',
      status: phStatus,
      statusText: phText,
      explanation: SOIL_PARAMETER_EXPLANATIONS.ph.whatIsIt,
      cropGuidance: `Optimal for ${profile.name}: ${profile.optimalPh}`,
      recommendation: phRec,
    });
  } else {
    parameters.push({
      parameter: 'ph',
      label: 'Soil pH (Reaction)',
      valueDisplay: 'Not tested',
      rawNumericValue: null,
      unit: '',
      status: 'not_available',
      statusText: 'Not available in this report',
      explanation: SOIL_PARAMETER_EXPLANATIONS.ph.whatIsIt,
      cropGuidance: `Target for ${profile.name}: ${profile.optimalPh}`,
    });
  }

  // 2. Organic Carbon Evaluation
  if (typeof soil.organicCarbon === 'number' && !isNaN(soil.organicCarbon)) {
    let ocStatus: SoilParameterEvaluation['status'] = 'good';
    let ocText = `Good — above the target of >${profile.targetOc}% for healthy soil biology.`;
    let ocRec = 'Continue crop residue recycling to maintain carbon levels.';

    if (soil.organicCarbon < 0.45) {
      ocStatus = 'needs_improvement';
      ocText = `Needs improvement — severely depleted (${soil.organicCarbon.toFixed(2)}%), soil biology is stressed.`;
      reasons.push(`Organic carbon (${soil.organicCarbon.toFixed(2)}%) is below the healthy target of ${profile.targetOc}%.`);
      actionableAdvice.push('Apply 2.5 to 3.0 tonnes/ha of well-rotted farmyard manure, compost, or vermicompost before sowing.');
      ocRec = 'Apply 2.5–3.0 t/ha farmyard manure or vermicompost.';
      improvementCount++;
    } else if (soil.organicCarbon < profile.targetOc) {
      ocStatus = 'needs_attention';
      ocText = `Needs attention — moderate (${soil.organicCarbon.toFixed(2)}%), below the optimal target of ${profile.targetOc}%.`;
      reasons.push(`Organic carbon (${soil.organicCarbon.toFixed(2)}%) would benefit from organic matter enrichment.`);
      actionableAdvice.push('Incorporate crop residues and use green manuring (e.g., cowpea or dhaincha) to steadily build humus.');
      ocRec = 'Grow cover crops and avoid burning crop stubble.';
      attentionCount++;
    } else {
      goodCount++;
    }

    parameters.push({
      parameter: 'organicCarbon',
      label: 'Organic Carbon (OC %)',
      valueDisplay: `${soil.organicCarbon.toFixed(2)}%`,
      rawNumericValue: soil.organicCarbon,
      unit: '%',
      status: ocStatus,
      statusText: ocText,
      explanation: SOIL_PARAMETER_EXPLANATIONS.organicCarbon.whatIsIt,
      cropGuidance: `Target for ${profile.name}: > ${profile.targetOc}%`,
      recommendation: ocRec,
    });
  } else {
    parameters.push({
      parameter: 'organicCarbon',
      label: 'Organic Carbon (OC %)',
      valueDisplay: 'Not tested',
      rawNumericValue: null,
      unit: '%',
      status: 'not_available',
      statusText: 'Not available in this report',
      explanation: SOIL_PARAMETER_EXPLANATIONS.organicCarbon.whatIsIt,
      cropGuidance: `Target for ${profile.name}: > ${profile.targetOc}%`,
    });
  }

  // 3. Available Nitrogen (N)
  if (typeof soil.nitrogen === 'number' && !isNaN(soil.nitrogen)) {
    let nStatus: SoilParameterEvaluation['status'] = 'good';
    let nText = `Good — adequate available nitrogen (${soil.nitrogen} kg/ha).`;
    let nRec = 'Maintain balanced nutrient management.';

    if (soil.nitrogen < 150) {
      nStatus = 'needs_improvement';
      nText = `Needs improvement — low nitrogen (${soil.nitrogen} kg/ha), vegetative growth will be slow.`;
      reasons.push(`Available nitrogen (${soil.nitrogen} kg/ha) is low for robust plant growth.`);
      actionableAdvice.push('Inoculate seeds with bio-fertilizers like Azotobacter or Rhizobium, or apply organic neem cake.');
      nRec = 'Apply Azotobacter bio-fertilizer and compost.';
      improvementCount++;
    } else if (soil.nitrogen < 210) {
      nStatus = 'needs_attention';
      nText = `Needs attention — medium nitrogen (${soil.nitrogen} kg/ha).`;
      nRec = 'Consider legume intercropping to supply natural nitrogen.';
      attentionCount++;
    } else {
      goodCount++;
    }

    parameters.push({
      parameter: 'nitrogen',
      label: 'Available Nitrogen (N)',
      valueDisplay: `${soil.nitrogen} kg/ha`,
      rawNumericValue: soil.nitrogen,
      unit: 'kg/ha',
      status: nStatus,
      statusText: nText,
      explanation: SOIL_PARAMETER_EXPLANATIONS.nitrogen.whatIsIt,
      cropGuidance: `Typical requirement: ${profile.typicalNitrogenNeed}`,
      recommendation: nRec,
    });
  } else {
    parameters.push({
      parameter: 'nitrogen',
      label: 'Available Nitrogen (N)',
      valueDisplay: 'Not recorded',
      rawNumericValue: null,
      unit: 'kg/ha',
      status: 'not_available',
      statusText: 'Not available in this report',
      explanation: SOIL_PARAMETER_EXPLANATIONS.nitrogen.whatIsIt,
      cropGuidance: `Typical requirement: ${profile.typicalNitrogenNeed}`,
    });
  }

  // 4. Available Phosphorus (P)
  if (typeof soil.phosphorus === 'number' && !isNaN(soil.phosphorus)) {
    let pStatus: SoilParameterEvaluation['status'] = 'good';
    let pText = `Good — adequate phosphorus (${soil.phosphorus} kg/ha) for root establishment.`;

    if (soil.phosphorus < 12) {
      pStatus = 'needs_improvement';
      pText = `Needs improvement — low phosphorus (${soil.phosphorus} kg/ha), root vigor may be restricted.`;
      reasons.push(`Available phosphorus (${soil.phosphorus} kg/ha) is low for root development.`);
      actionableAdvice.push('Apply Phosphate Solubilizing Bacteria (PSB) bio-inoculant @ 5 kg/ha with compost to unlock soil phosphorus.');
      improvementCount++;
    } else if (soil.phosphorus < 18) {
      pStatus = 'needs_attention';
      pText = `Needs attention — moderate phosphorus (${soil.phosphorus} kg/ha).`;
      attentionCount++;
    } else {
      goodCount++;
    }

    parameters.push({
      parameter: 'phosphorus',
      label: 'Available Phosphorus (P)',
      valueDisplay: `${soil.phosphorus} kg/ha`,
      rawNumericValue: soil.phosphorus,
      unit: 'kg/ha',
      status: pStatus,
      statusText: pText,
      explanation: SOIL_PARAMETER_EXPLANATIONS.phosphorus.whatIsIt,
      cropGuidance: 'Supports early root development and seed germination',
    });
  } else {
    parameters.push({
      parameter: 'phosphorus',
      label: 'Available Phosphorus (P)',
      valueDisplay: 'Not recorded',
      rawNumericValue: null,
      unit: 'kg/ha',
      status: 'not_available',
      statusText: 'Not available in this report',
      explanation: SOIL_PARAMETER_EXPLANATIONS.phosphorus.whatIsIt,
      cropGuidance: 'Supports early root development and seed germination',
    });
  }

  // 5. Available Potassium (K)
  if (typeof soil.potassium === 'number' && !isNaN(soil.potassium)) {
    let kStatus: SoilParameterEvaluation['status'] = 'good';
    let kText = `Good — adequate potassium (${soil.potassium} kg/ha) for plant immunity and grain filling.`;

    if (soil.potassium < 110) {
      kStatus = 'needs_improvement';
      kText = `Needs improvement — low potassium (${soil.potassium} kg/ha), drought tolerance may decrease.`;
      reasons.push(`Available potassium (${soil.potassium} kg/ha) is low for crop disease and drought resistance.`);
      actionableAdvice.push('Apply wood ash or bio-potash inoculants to support cellular turgor and stem strength.');
      improvementCount++;
    } else if (soil.potassium < 180) {
      kStatus = 'needs_attention';
      kText = `Needs attention — medium potassium (${soil.potassium} kg/ha).`;
      attentionCount++;
    } else {
      goodCount++;
    }

    parameters.push({
      parameter: 'potassium',
      label: 'Available Potassium (K)',
      valueDisplay: `${soil.potassium} kg/ha`,
      rawNumericValue: soil.potassium,
      unit: 'kg/ha',
      status: kStatus,
      statusText: kText,
      explanation: SOIL_PARAMETER_EXPLANATIONS.potassium.whatIsIt,
      cropGuidance: 'Improves drought resilience and pest resistance',
    });
  } else {
    parameters.push({
      parameter: 'potassium',
      label: 'Available Potassium (K)',
      valueDisplay: 'Not recorded',
      rawNumericValue: null,
      unit: 'kg/ha',
      status: 'not_available',
      statusText: 'Not available in this report',
      explanation: SOIL_PARAMETER_EXPLANATIONS.potassium.whatIsIt,
      cropGuidance: 'Improves drought resilience and pest resistance',
    });
  }

  // 6. Soil Moisture
  if (typeof soil.moisture === 'number' && !isNaN(soil.moisture)) {
    let mStatus: SoilParameterEvaluation['status'] = 'good';
    let mText = `Good — soil moisture is ${soil.moisture}%, favorable for root uptake.`;

    if (soil.moisture < 15) {
      mStatus = 'needs_improvement';
      mText = `Needs improvement — dry root zone (${soil.moisture}%), moisture deficit detected.`;
      reasons.push(`Soil moisture (${soil.moisture}%) is low; plants are at risk of water stress.`);
      actionableAdvice.push('Apply 5-8 cm organic straw mulch over rows and irrigate in the early morning to prevent evaporation.');
      improvementCount++;
    } else if (soil.moisture > 45) {
      mStatus = 'needs_attention';
      mText = `Needs attention — high soil moisture (${soil.moisture}%), check drainage to prevent aeration loss.`;
      reasons.push(`High soil moisture (${soil.moisture}%) may reduce root aeration if drainage is slow.`);
      attentionCount++;
    } else {
      goodCount++;
    }

    parameters.push({
      parameter: 'moisture',
      label: 'Soil Moisture',
      valueDisplay: `${soil.moisture}%`,
      rawNumericValue: soil.moisture,
      unit: '%',
      status: mStatus,
      statusText: mText,
      explanation: SOIL_PARAMETER_EXPLANATIONS.moisture.whatIsIt,
      cropGuidance: 'Optimal range: 20% - 35% in active root zone',
    });
  }

  // 7. Salinity (EC)
  if (typeof soil.salinityEc === 'number' && !isNaN(soil.salinityEc)) {
    let ecStatus: SoilParameterEvaluation['status'] = 'good';
    let ecText = `Good — low electrical conductivity (${soil.salinityEc} dS/m), safe for roots.`;

    if (soil.salinityEc > 3.0) {
      ecStatus = 'needs_improvement';
      ecText = `Needs improvement — high salinity (${soil.salinityEc} dS/m), risk of salt injury.`;
      reasons.push(`Soil salinity (${soil.salinityEc} dS/m) exceeds the safe threshold for ${profile.name}.`);
      actionableAdvice.push('Ensure field drainage is open and flush root zones with clean irrigation water before planting.');
      improvementCount++;
    } else if (soil.salinityEc > 1.8) {
      ecStatus = 'needs_attention';
      ecText = `Needs attention — moderate salinity (${soil.salinityEc} dS/m).`;
      attentionCount++;
    } else {
      goodCount++;
    }

    parameters.push({
      parameter: 'salinityEc',
      label: 'Electrical Conductivity (Salinity)',
      valueDisplay: `${soil.salinityEc} dS/m`,
      rawNumericValue: soil.salinityEc,
      unit: 'dS/m',
      status: ecStatus,
      statusText: ecText,
      explanation: SOIL_PARAMETER_EXPLANATIONS.salinityEc.whatIsIt,
      cropGuidance: 'Ideal for most crops: < 1.5 dS/m',
    });
  }

  // 8. Soil Texture
  if (soil.texture) {
    parameters.push({
      parameter: 'texture',
      label: 'Soil Texture',
      valueDisplay: soil.texture,
      rawNumericValue: null,
      unit: '',
      status: 'good',
      statusText: `Identified texture: ${soil.texture}`,
      explanation: SOIL_PARAMETER_EXPLANATIONS.texture.whatIsIt,
      cropGuidance: profile.soilNotes,
    });
  }

  // Standard universal farmer recommendations
  if (actionableAdvice.length === 0) {
    actionableAdvice.push('Maintain regular compost additions and crop rotations to preserve existing soil fertility.');
    actionableAdvice.push('Avoid unnecessary deep tillage to protect existing microbial earthworm tunnels.');
    actionableAdvice.push('Consult your local agricultural extension officer for season-specific crop schedules.');
  } else {
    actionableAdvice.push('Avoid unnecessary soil disturbance to allow beneficial fungi and earthworms to multiply.');
    actionableAdvice.push('Consult a local agricultural extension professional for exact organic input timing.');
  }

  // Determine Overall Status
  let overallStatus: SoilHealthSummary['overallStatus'] = 'Good';
  let statusColor: SoilHealthSummary['statusColor'] = 'emerald';

  if (improvementCount > 0) {
    overallStatus = 'Needs Improvement';
    statusColor = 'rose';
  } else if (attentionCount > 0 || reasons.length > 0) {
    overallStatus = 'Needs Attention';
    statusColor = 'amber';
  }

  if (reasons.length === 0) {
    reasons.push('Key soil indicators are balanced and favorable for crop establishment.');
    reasons.push(`Soil conditions are well-suited for ${profile.name} growth.`);
  }

  return {
    overallStatus,
    statusColor,
    reasons,
    parameters,
    actionableAdvice,
    cropSelected: profile.name,
  };
}
