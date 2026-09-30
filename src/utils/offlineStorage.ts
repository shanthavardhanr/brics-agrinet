import { AgroAdvisoryResponse, CropDiagnosisResult, AgroEcologicalRegion } from '../types/agriculture';

const CACHE_KEYS = {
  ADVISORY_PREFIX: 'brics_agrinet_adv_',
  DIAGNOSIS_HISTORY: 'brics_agrinet_diag_history',
  PRECACHED_REGIONS: 'brics_agrinet_precached_regions',
  LAST_SYNC: 'brics_agrinet_last_sync',
  OFFLINE_PACK_STATUS: 'brics_agrinet_offline_pack_ready',
};

export interface CachedAdvisoryEntry {
  regionId: string;
  targetCrop: string;
  advisory: AgroAdvisoryResponse;
  savedAt: string;
}

export interface CacheMetrics {
  totalAdvisoriesCached: number;
  totalDiagnosesCached: number;
  isOfflinePackReady: boolean;
  lastSyncTimestamp: string | null;
  approxSizeKb: number;
}

/**
 * Register Service Worker for offline PWA functionality
 */
export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('🌾 [BRICS AgriNet] Service Worker registered successfully:', registration.scope);
        })
        .catch((error) => {
          console.warn('🌾 [BRICS AgriNet] Service Worker registration failed:', error);
        });
    });
  }
}

/**
 * Save an advisory to local storage cache
 */
export function saveCachedAdvisory(regionId: string, targetCrop: string, advisory: AgroAdvisoryResponse): void {
  try {
    const key = `${CACHE_KEYS.ADVISORY_PREFIX}${regionId}_${targetCrop.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const payload: CachedAdvisoryEntry = {
      regionId,
      targetCrop,
      advisory,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
    localStorage.setItem(CACHE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (err) {
    console.warn('Could not cache advisory to localStorage:', err);
  }
}

/**
 * Retrieve cached advisory if offline or network fails
 */
export function getCachedAdvisory(regionId: string, targetCrop: string): CachedAdvisoryEntry | null {
  try {
    const key = `${CACHE_KEYS.ADVISORY_PREFIX}${regionId}_${targetCrop.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    // Secondary fallback: Any cached advisory for this region
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey && storageKey.startsWith(`${CACHE_KEYS.ADVISORY_PREFIX}${regionId}`)) {
        const item = localStorage.getItem(storageKey);
        if (item) return JSON.parse(item);
      }
    }
  } catch (err) {
    console.warn('Error reading cached advisory:', err);
  }
  return null;
}

/**
 * Cache crop diagnosis in local storage
 */
export function saveCachedDiagnosis(diagnosis: CropDiagnosisResult): void {
  try {
    const historyRaw = localStorage.getItem(CACHE_KEYS.DIAGNOSIS_HISTORY);
    let history: Array<CropDiagnosisResult & { diagnosedAt: string }> = historyRaw ? JSON.parse(historyRaw) : [];

    // Keep up to 15 recent offline diagnoses
    history = [
      { ...diagnosis, diagnosedAt: new Date().toISOString() },
      ...history.filter((d) => d.conditionName !== diagnosis.conditionName),
    ].slice(0, 15);

    localStorage.setItem(CACHE_KEYS.DIAGNOSIS_HISTORY, JSON.stringify(history));
    localStorage.setItem(CACHE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (err) {
    console.warn('Error saving diagnosis to localStorage:', err);
  }
}

/**
 * Get recent cached diagnoses
 */
export function getCachedDiagnoses(): Array<CropDiagnosisResult & { diagnosedAt: string }> {
  try {
    const raw = localStorage.getItem(CACHE_KEYS.DIAGNOSIS_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Pre-cache all BRICS regions with default baseline advisories
 * Gives farmers immediate complete offline coverage before going to the fields
 */
export function preCacheAllRegionalFieldPacks(regions: AgroEcologicalRegion[]): void {
  try {
    regions.forEach((region) => {
      region.stapleCrops.forEach((crop) => {
        const key = `${CACHE_KEYS.ADVISORY_PREFIX}${region.id}_${crop.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        // If not already cached, create baseline field advisory
        if (!localStorage.getItem(key)) {
          const baselineAdvisory: AgroAdvisoryResponse = {
            advisoryTitle: `Offline Field Pack: ${crop} in ${region.country}`,
            farmerRiskLevel: 'Medium',
            executiveSummary: `Pre-cached field guide for ${region.regionName}. Focus on soil moisture retention via residue mulching and microbial inoculants to withstand climate shifts.`,
            regenerativeCropStrategy: {
              recommendedCrops: [
                {
                  name: crop,
                  role: 'Primary Cash Crop',
                  benefits: 'Adapted to regional soil texture and temperature range',
                  sowingAdvice: 'Zero-till direct seeding into residue stubble to minimize soil disturbance',
                },
                {
                  name: 'Regional Pulse Companion',
                  role: 'Nitrogen Fixer',
                  benefits: 'Biological nitrogen fixation and soil shading against evaporation',
                  sowingAdvice: '4:1 row ratio alongside primary crop',
                },
              ],
              rotationPlan: 'Follow harvest with green manuring (Sesbania/Cowpea/Sunn hemp).',
              intercroppingPattern: 'Stripped companion planting with flowering boundary hedgerows.',
            },
            soilRestorationPlan: {
              organicCarbonIntervention: 'Apply 2 t/ha farmyard manure with 100 kg biochar to build soil sponge.',
              biofertilizersRecommended: ['Rhizobium inoculant', 'Trichoderma viride', 'Phosphate Solubilizing Bacteria'],
              naturalSoilConditioner: 'Broad-spectrum organic biomass mulching.',
              phCorrection: `Regional soil pH ${region.defaultSoil.ph.toFixed(1)} buffered naturally via organic amendments.`,
            },
            waterAndClimateGuidance: {
              irrigationSchedule: 'Irrigate during pre-dawn hours (04:00 - 07:00) to cut evaporative losses by 42%.',
              waterRetentionMethod: '5-8 cm organic biomass mulch over active root zone.',
              weatherAlertMitigation: 'Spray 2% potassium or seaweed extract foliar spray 48 hours prior to heat spike.',
            },
            bricsKnowledgeTransfer: {
              sourceNation: region.country,
              techniqueName: region.bricsCooperationFocus,
              adaptationInsight: 'Proven cross-border regenerative methodology designed for smallholder economics.',
            },
            priorityWeeklyTasks: [
              {
                dayRange: 'Day 1 - 2',
                task: 'Inspect soil moisture at 10cm depth beneath mulch layer',
                impact: 'Prevents water stress without unnecessary pumping',
              },
              {
                dayRange: 'Day 3 - 4',
                task: 'Prepare fermented bio-concoction (neem, garlic, compost tea)',
                impact: 'Early biological pest prevention saves chemical expenses',
              },
            ],
            translatedLanguage: 'Offline Cached Mode',
          };

          const payload: CachedAdvisoryEntry = {
            regionId: region.id,
            targetCrop: crop,
            advisory: baselineAdvisory,
            savedAt: new Date().toISOString(),
          };
          localStorage.setItem(key, JSON.stringify(payload));
        }
      });
    });

    localStorage.setItem(CACHE_KEYS.OFFLINE_PACK_STATUS, 'true');
    localStorage.setItem(CACHE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (err) {
    console.warn('Error precaching regional field packs:', err);
  }
}

/**
 * Calculate total cache metrics & storage usage
 */
export function getCacheMetrics(): CacheMetrics {
  let advisoriesCount = 0;
  let totalChars = 0;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const val = localStorage.getItem(key) || '';
        totalChars += key.length + val.length;
        if (key.startsWith(CACHE_KEYS.ADVISORY_PREFIX)) {
          advisoriesCount++;
        }
      }
    }
  } catch {
    // ignore
  }

  const diagnoses = getCachedDiagnoses();
  const isOfflinePackReady = localStorage.getItem(CACHE_KEYS.OFFLINE_PACK_STATUS) === 'true';
  const lastSync = localStorage.getItem(CACHE_KEYS.LAST_SYNC);

  return {
    totalAdvisoriesCached: advisoriesCount,
    totalDiagnosesCached: diagnoses.length,
    isOfflinePackReady,
    lastSyncTimestamp: lastSync,
    approxSizeKb: Math.round((totalChars * 2) / 1024), // UTF-16 approx
  };
}

/**
 * Clear cache if farmer wants to free space or refresh all data
 */
export function clearAgriNetCache(): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('brics_agrinet_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.warn('Error clearing cache:', err);
  }
}
