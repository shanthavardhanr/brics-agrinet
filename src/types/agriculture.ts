export interface SoilHealthData {
  ph: number;
  organicCarbon: number; // percentage (e.g. 0.55%)
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  moisture: number; // percentage
  texture: string;
  salinityEc?: number; // dS/m
  dataSource?: 'scanned_report' | 'testing_kit' | 'sensor_demo' | 'manual_lab' | 'regional_simulation' | 'saved_profile';
  sourceTitle?: string;
  isDemoData?: boolean;
  labName?: string;
  testDate?: string;
  rawNotes?: string;
  missingFields?: string[];
  cropMentioned?: string;
  locationMentioned?: string;
}

export type SoilDataSource = 'scanned_report' | 'testing_kit' | 'sensor_demo' | 'manual_lab' | 'regional_simulation' | 'saved_profile';

export interface SoilReportAnalysisResult {
  source: SoilDataSource;
  ph: number | null;
  organicCarbon: number | null;
  nitrogen: number | null;
  phosphorus: number | null;
  potassium: number | null;
  moisture: number | null;
  salinityEc: number | null;
  texture: string | null;
  cropMentioned: string | null;
  locationMentioned: string | null;
  labName?: string | null;
  testDate?: string | null;
  rawNotes?: string;
  extractionConfidence: number;
  missingFields: string[];
  summaryText?: string;
  isDemoData?: boolean;
  timestamp: string;
}

export type SoilParameterStatus = 'good' | 'needs_attention' | 'needs_improvement' | 'not_available';

export interface SoilParameterEvaluation {
  parameter: string;
  label: string;
  valueDisplay: string;
  rawNumericValue: number | null;
  unit: string;
  status: SoilParameterStatus;
  statusText: string;
  explanation: string;
  cropGuidance: string;
  recommendation?: string;
}

export interface SoilHealthSummary {
  overallStatus: 'Good' | 'Needs Attention' | 'Needs Improvement';
  statusColor: 'emerald' | 'amber' | 'rose';
  reasons: string[];
  parameters: SoilParameterEvaluation[];
  actionableAdvice: string[];
  cropSelected: string;
}

export interface SatelliteTelemetryData {
  ndvi: number; // 0.0 - 1.0 (Normalized Difference Vegetation Index)
  ndwi: number; // -1.0 - 1.0 (Normalized Difference Water Index)
  surfaceTemp: number; // °C
  canopyStatus: string;
  imageryDate: string;
  sourceSatellite: string;
  resolutionMeters: number;
}

export interface WeatherForecastData {
  rainfallExpectedMm: number;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  alert: string;
  windSpeedKmh: number;
  forecastDays: Array<{
    day: string;
    condition: 'sunny' | 'rainy' | 'cloudy' | 'storm' | 'heatwave';
    high: number;
    low: number;
    rainChance: number;
  }>;
}

export interface AgroEcologicalRegion {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  regionName: string;
  climateZone: string;
  dominantSoils: string;
  stapleCrops: string[];
  keyChallenges: string[];
  bricsCooperationFocus: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  defaultSoil: SoilHealthData;
  defaultSatellite: SatelliteTelemetryData;
  defaultWeather: WeatherForecastData;
}

export interface AgroAdvisoryResponse {
  advisoryTitle: string;
  farmerRiskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  executiveSummary: string;
  regenerativeCropStrategy: {
    recommendedCrops: Array<{
      name: string;
      role: 'Primary Cash Crop' | 'Cover Crop' | 'Nitrogen Fixer' | 'Pest Repellent Companion';
      benefits: string;
      sowingAdvice: string;
    }>;
    rotationPlan: string;
    intercroppingPattern: string;
  };
  soilRestorationPlan: {
    organicCarbonIntervention: string;
    biofertilizersRecommended: string[];
    naturalSoilConditioner: string;
    phCorrection: string;
  };
  waterAndClimateGuidance: {
    irrigationSchedule: string;
    waterRetentionMethod: string;
    weatherAlertMitigation: string;
  };
  bricsKnowledgeTransfer: {
    sourceNation: string;
    techniqueName: string;
    adaptationInsight: string;
  };
  priorityWeeklyTasks: Array<{
    dayRange: string;
    task: string;
    impact: string;
  }>;
  translatedLanguage: string;
}

export interface CropDiagnosisResult {
  isPlant: boolean;
  cropIdentified: string;
  conditionName: string;
  scientificName: string;
  confidenceScore: number;
  severity: 'Mild' | 'Moderate' | 'Critical';
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Infestation' | 'Nutrient Deficiency' | 'Abiotic / Climate Stress';
  infectionStage: string;
  symptomsConfirmed: string[];
  biologicalRemedies: Array<{
    treatment: string;
    preparation: string;
    applicationRate: string;
    frequency: string;
  }>;
  conventionalEmergencyOption: string;
  preventativeProtocol: string[];
  bricsQuarantineAlert: {
    isTransboundaryAlert: boolean;
    details: string;
    partnerNationsAffected: string[];
  };
  farmerAudioSummaryText: string;
}

export interface BRICSPublicGoodItem {
  id: string;
  title: string;
  category: 'Genetic Models' | 'Soil Carbon' | 'Satellite Algorithms' | 'Biological Pest Control' | 'Water Governance';
  leadNation: string;
  leadFlag: string;
  institutionalPartner: string;
  license: string;
  description: string;
  impactMetric: string;
  downloadDataSize: string;
  apiEndpoint: string;
}

export type WeatherEventType = 'flood' | 'drought' | 'frost' | 'cyclone_storm' | 'heatwave' | 'normal';
export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'WATCH' | 'NORMAL';

export interface UserFarmLocation {
  id: string;
  name: string;
  villageOrDistrict: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  elevationMeters?: number;
  lastUpdated: string;
  isAutoDetected?: boolean;
}

export interface ExtremeWeatherAlert {
  id: string;
  type: WeatherEventType;
  severity: AlertSeverity;
  headline: string;
  description: string;
  expectedOnset: string;
  duration: string;
  detectedMetrics: {
    temperature: number;
    rainfallMm: number;
    soilMoisturePct: number;
    windSpeedKmh: number;
  };
  immediateTacticalSteps: Array<{
    step: string;
    timeline: string;
    priority: 'Immediate' | 'Within 24h' | 'Post-Event';
  }>;
  voiceAudioSummary: string;
  timestamp: string;
  locationName: string;
}
