import {
  ExtremeWeatherAlert,
  UserFarmLocation,
  WeatherEventType,
  AlertSeverity,
  WeatherForecastData,
  SoilHealthData,
  SatelliteTelemetryData,
} from '../types/agriculture';

const STORAGE_KEYS = {
  USER_LOCATION: 'brics_agrinet_user_location',
  ALERT_HISTORY: 'brics_agrinet_alert_history',
  NOTIFICATIONS_ENABLED: 'brics_agrinet_notify_enabled',
};

export const PRESET_FARM_LOCATIONS: UserFarmLocation[] = [
  {
    id: 'in-ap-guntur',
    name: 'Guntur - Krishna River Basin',
    villageOrDistrict: 'Tenali / Amaravati, Andhra Pradesh',
    region: 'Coastal Andhra / Krishna Basin',
    country: 'India',
    coordinates: { lat: 16.3067, lng: 80.4365 },
    elevationMeters: 31,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'in-pb-ludhiana',
    name: 'Indo-Gangetic Alluvial Basin',
    villageOrDistrict: 'Ludhiana / Khanna, Punjab',
    region: 'Indo-Gangetic Plain',
    country: 'India',
    coordinates: { lat: 30.901, lng: 75.8573 },
    elevationMeters: 244,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'br-sp-ribeirao',
    name: 'Cerrado Tropical Oxisol Hub',
    villageOrDistrict: 'Ribeirão Preto / Franca, São Paulo',
    region: 'Cerrado Biome',
    country: 'Brazil',
    coordinates: { lat: -21.1775, lng: -47.8103 },
    elevationMeters: 546,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ru-vrn-chernozem',
    name: 'Central Chernozem Black Earth Basin',
    villageOrDistrict: 'Semiluki / Ramon, Voronezh',
    region: 'Central Chernozem Steppe',
    country: 'Russia',
    coordinates: { lat: 51.6608, lng: 39.2003 },
    elevationMeters: 154,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'cn-hen-zhengzhou',
    name: 'Yellow River Silt & Loess Belt',
    villageOrDistrict: 'Zhongmou / Kaifeng, Henan',
    region: 'Yellow River Basin',
    country: 'China',
    coordinates: { lat: 34.7579, lng: 113.6654 },
    elevationMeters: 110,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'za-fs-bloem',
    name: 'Highveld Plateau Agro-Zone',
    villageOrDistrict: 'Kroonstad / Welkom, Free State',
    region: 'Highveld Plateau',
    country: 'South Africa',
    coordinates: { lat: -27.6521, lng: 27.2349 },
    elevationMeters: 1380,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'eg-fayoum-delta',
    name: 'Nile Delta & Alluvial Oasis',
    villageOrDistrict: 'Ibshaway / Itsa, Fayoum Oasis',
    region: 'Nile Delta & Riverine Basin',
    country: 'Egypt',
    coordinates: { lat: 29.3084, lng: 30.8428 },
    elevationMeters: 23,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'et-oro-rift',
    name: 'Rift Valley Volcanic Highlands',
    villageOrDistrict: 'Bishoftu / Adama, Oromia',
    region: 'East African Rift Highlands',
    country: 'Ethiopia',
    coordinates: { lat: 8.7523, lng: 38.9785 },
    elevationMeters: 1920,
    lastUpdated: new Date().toISOString(),
  },
];

/**
 * Get stored farm location from localStorage or default
 */
export function getStoredUserLocation(): UserFarmLocation {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_LOCATION);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading stored user location:', err);
  }
  // Default to Guntur / Amaravati (India)
  return PRESET_FARM_LOCATIONS[0];
}

/**
 * Save user farm location to localStorage
 */
export function saveStoredUserLocation(location: UserFarmLocation): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_LOCATION, JSON.stringify(location));
  } catch (err) {
    console.warn('Error saving user location:', err);
  }
}

/**
 * Detect device location via HTML5 Geolocation API
 */
export function detectDeviceLocation(): Promise<UserFarmLocation> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const elevation = position.coords.altitude || undefined;

        // Find nearest matching preset region
        let nearestPreset = PRESET_FARM_LOCATIONS[0];
        let minDistance = Number.MAX_VALUE;

        PRESET_FARM_LOCATIONS.forEach((loc) => {
          const d = Math.hypot(loc.coordinates.lat - lat, loc.coordinates.lng - lng);
          if (d < minDistance) {
            minDistance = d;
            nearestPreset = loc;
          }
        });

        const detectedLocation: UserFarmLocation = {
          id: `custom-geo-${Date.now()}`,
          name: `Current Farm GPS (${lat.toFixed(3)}°, ${lng.toFixed(3)}°)`,
          villageOrDistrict: `${nearestPreset.villageOrDistrict} (Geo-Located)`,
          region: nearestPreset.region,
          country: nearestPreset.country,
          coordinates: { lat, lng },
          elevationMeters: elevation ? Math.round(elevation) : nearestPreset.elevationMeters,
          lastUpdated: new Date().toISOString(),
          isAutoDetected: true,
        };

        saveStoredUserLocation(detectedLocation);
        resolve(detectedLocation);
      },
      (error) => {
        reject(error);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

/**
 * Evaluate real-time weather data against extreme event thresholds
 */
export function evaluateWeatherAlert(
  weather: WeatherForecastData,
  soil: SoilHealthData,
  satellite: SatelliteTelemetryData,
  location: UserFarmLocation,
  cropName: string = 'Staple Crop'
): ExtremeWeatherAlert | null {
  const rain = weather.rainfallExpectedMm;
  const temp = weather.avgTemp;
  const minTemp = weather.minTemp;
  const maxTemp = weather.maxTemp;
  const moisture = soil.moisture;
  const ndvi = satellite.ndvi;
  const wind = weather.windSpeedKmh;

  // 1. FLOOD / WATERLOGGING CHECK
  if (rain >= 40 || (rain >= 25 && moisture >= 65) || (weather.alert.toLowerCase().includes('flood') || weather.alert.toLowerCase().includes('deluge') || weather.alert.toLowerCase().includes('monsoon'))) {
    const isCritical = rain >= 65 || moisture >= 75;
    return {
      id: `alert-flood-${Date.now()}`,
      type: 'flood',
      severity: isCritical ? 'CRITICAL' : 'HIGH',
      headline: isCritical ? `CRITICAL FLASH FLOOD & INUNDATION WARNING` : `High Waterlogging & Deluge Alert`,
      description: `Meteorological radars and soil saturation sensors detect ${rain}mm rainfall accumulation with root-zone moisture at ${moisture}%. Extreme waterlogging poses immediate risk of hypoxic root suffocation for ${cropName}.`,
      expectedOnset: 'Immediate - within next 6 to 18 hours',
      duration: '48 to 72 hours',
      detectedMetrics: {
        temperature: temp,
        rainfallMm: rain,
        soilMoisturePct: moisture,
        windSpeedKmh: wind,
      },
      immediateTacticalSteps: [
        {
          step: 'Dig 30cm perimeter drainage furrows (trenches) to rapidly evacuate stagnant standing water.',
          timeline: 'Immediate (0-4 hours)',
          priority: 'Immediate',
        },
        {
          step: 'Elevate seed bags, harvested grain, and bio-inputs onto bamboo or wooden pallets above ground line.',
          timeline: 'Immediate (0-6 hours)',
          priority: 'Immediate',
        },
        {
          step: 'Apply foliar spray of Trichoderma viride / Bacillus bio-consortium immediately post-flood to halt fungal collar-rot.',
          timeline: 'Post-flood recession',
          priority: 'Post-Event',
        },
      ],
      voiceAudioSummary: `Emergency Flood Alert for ${location.name}. Expected rainfall ${rain} millimeters with saturated soil. Open trench drains immediately and protect harvested grain.`,
      timestamp: new Date().toISOString(),
      locationName: location.name,
    };
  }

  // 2. UNEXPECTED FROST / FREEZING COLD SURGE
  if (minTemp <= 3.5 || (temp <= 5 && weather.alert.toLowerCase().includes('frost')) || (weather.alert.toLowerCase().includes('cold') && minTemp <= 4)) {
    const isCritical = minTemp <= 0.5;
    return {
      id: `alert-frost-${Date.now()}`,
      type: 'frost',
      severity: isCritical ? 'CRITICAL' : 'HIGH',
      headline: isCritical ? `CRITICAL GROUND FROST & CELL FREEZING ALERT` : `Severe Cold Wave & Frost Advisory`,
      description: `Arctic/polar air front drop detected down to ${minTemp}°C at ${location.name} (Elevation: ${location.elevationMeters || 120}m). High risk of intracellular ice nucleation and flower abortion in ${cropName}.`,
      expectedOnset: 'Tonight between 02:00 and 06:30 hours',
      duration: 'Nighttime freezing window (approx 6-8 hours)',
      detectedMetrics: {
        temperature: minTemp,
        rainfallMm: rain,
        soilMoisturePct: moisture,
        windSpeedKmh: wind,
      },
      immediateTacticalSteps: [
        {
          step: 'Flood furrow ditches with ground water before sunset; the high thermal mass of water elevates ground temperature by 2-3°C.',
          timeline: 'Before 17:30 dusk',
          priority: 'Immediate',
        },
        {
          step: 'Ignite controlled micro-smudge straw burns along the upwind field boundary to generate a protective thermal smoke canopy.',
          timeline: '03:00 to 06:00 pre-dawn',
          priority: 'Immediate',
        },
        {
          step: 'Spray foliar seaweed extract or 1% potassium solution to increase osmotic solute concentration in plant vascular sap.',
          timeline: 'Afternoon before freeze',
          priority: 'Within 24h',
        },
      ],
      voiceAudioSummary: `Frost warning for ${location.name}. Temperatures plunging to ${minTemp} degrees Celsius tonight. Flood furrows before dusk and generate boundary thermal smoke.`,
      timestamp: new Date().toISOString(),
      locationName: location.name,
    };
  }

  // 3. SEVERE DROUGHT / HEAT SHOCK
  if ((rain <= 5 && maxTemp >= 37) || (maxTemp >= 41) || (moisture <= 16 && ndvi <= 0.38) || weather.alert.toLowerCase().includes('drought') || weather.alert.toLowerCase().includes('heatwave')) {
    const isCritical = maxTemp >= 40 || moisture <= 14;
    return {
      id: `alert-drought-${Date.now()}`,
      type: 'drought',
      severity: isCritical ? 'CRITICAL' : 'HIGH',
      headline: isCritical ? `CRITICAL SEVERE DROUGHT & HEAT SHOCK ALERT` : `High Evapotranspiration & Drought Watch`,
      description: `Satellite thermal imagery detects land surface heat spike at ${maxTemp}°C with rainfall deficiency (${rain}mm) and soil moisture dipping to ${moisture}%. Critical stomatal closure and desiccation risk for ${cropName}.`,
      expectedOnset: 'Active now - persistent 5 to 7 day heat dome',
      duration: '5 to 7 consecutive days',
      detectedMetrics: {
        temperature: maxTemp,
        rainfallMm: rain,
        soilMoisturePct: moisture,
        windSpeedKmh: wind,
      },
      immediateTacticalSteps: [
        {
          step: 'Apply 5-8cm straw, crop residue, or dry biomass mulch over root zone to reduce soil moisture evaporation by 55%.',
          timeline: 'Today (Within 12 hours)',
          priority: 'Immediate',
        },
        {
          step: 'Shift irrigation timing exclusively to pre-dawn (03:30 - 06:30) via micro-drip emitters to prevent midday evaporative loss.',
          timeline: 'Daily pre-dawn cycle',
          priority: 'Immediate',
        },
        {
          step: 'Strictly suspend synthetic urea/nitrogen topdressing; apply 2% potassium nitrate or humic acid foliar mist instead.',
          timeline: 'During heat dome duration',
          priority: 'Within 24h',
        },
      ],
      voiceAudioSummary: `Severe heatwave and drought alert for ${location.name}. Maximum temperature ${maxTemp} degrees Celsius. Lay down straw mulch immediately and irrigate only at pre-dawn.`,
      timestamp: new Date().toISOString(),
      locationName: location.name,
    };
  }

  return null;
}

/**
 * Generate simulated extreme event alerts for demonstration & farmer drill testing
 */
export function simulateExtremeAlert(
  eventType: 'flood' | 'drought' | 'frost' | 'cyclone_storm',
  location: UserFarmLocation,
  cropName: string = 'Target Crop'
): ExtremeWeatherAlert {
  if (eventType === 'flood') {
    return {
      id: `sim-flood-${Date.now()}`,
      type: 'flood',
      severity: 'CRITICAL',
      headline: `FLASH FLOOD & MONSOON DELUGE EMERGENCY`,
      description: `Simulated Doppler radar telemetry predicts 82mm extreme downpour over ${location.villageOrDistrict}. Riverine catchment overflow and saturated topsoil will induce root hypoxia in ${cropName}.`,
      expectedOnset: 'Within 3 hours',
      duration: '48 hours',
      detectedMetrics: {
        temperature: 24.5,
        rainfallMm: 82,
        soilMoisturePct: 88,
        windSpeedKmh: 45,
      },
      immediateTacticalSteps: [
        {
          step: 'Clear perimeter drainage furrows immediately; evacuate standing water toward lowest elevation gradient.',
          timeline: '0-2 hours',
          priority: 'Immediate',
        },
        {
          step: 'Elevate seed bags, grain silos, and organic inoculants to high ground.',
          timeline: '0-4 hours',
          priority: 'Immediate',
        },
        {
          step: 'Prepare Trichoderma viride and Pseudomonas fluorescens for soil drench once floodwaters recede.',
          timeline: 'Post-flood',
          priority: 'Post-Event',
        },
      ],
      voiceAudioSummary: `Emergency Flash Flood Warning for ${location.name}. 82mm rainfall imminent. Clear field drains immediately.`,
      timestamp: new Date().toISOString(),
      locationName: location.name,
    };
  }

  if (eventType === 'frost') {
    return {
      id: `sim-frost-${Date.now()}`,
      type: 'frost',
      severity: 'CRITICAL',
      headline: `UNEXPECTED GROUND FROST & FREEZING SHOCK`,
      description: `Simulated polar cold air tongue plunging temperatures to -1.2°C across ${location.villageOrDistrict}. High risk of irreversible ice crystallization and blossom drop in ${cropName}.`,
      expectedOnset: 'Tonight from 03:00 to 06:30 hours',
      duration: '6 hours',
      detectedMetrics: {
        temperature: -1.2,
        rainfallMm: 0,
        soilMoisturePct: 32,
        windSpeedKmh: 12,
      },
      immediateTacticalSteps: [
        {
          step: 'Flood field furrows before sunset; ground water thermal mass buffers soil temperature by +2.5°C.',
          timeline: 'Before 17:30',
          priority: 'Immediate',
        },
        {
          step: 'Deploy windward damp straw smudge piles to produce a low-hanging thermal blanket across canopy.',
          timeline: '03:00 to 06:00 pre-dawn',
          priority: 'Immediate',
        },
        {
          step: 'Spray 1% potassium silicate or seaweed amino acids to thicken cell sap osmolarity.',
          timeline: 'This afternoon',
          priority: 'Within 24h',
        },
      ],
      voiceAudioSummary: `Severe frost warning for ${location.name}. Night temperature plunging below freezing. Flood furrows before dark.`,
      timestamp: new Date().toISOString(),
      locationName: location.name,
    };
  }

  if (eventType === 'cyclone_storm') {
    return {
      id: `sim-cyclone-${Date.now()}`,
      type: 'cyclone_storm',
      severity: 'CRITICAL',
      headline: `TROPICAL SQUALL & GALE FORCE STORM WARNING`,
      description: `Simulated satellite pressure trough detecting 68 km/h wind gusts and 55mm horizontal rain squall approaching ${location.villageOrDistrict}. Risk of crop lodging and canopy shredding.`,
      expectedOnset: 'Within 8 hours',
      duration: '24 hours',
      detectedMetrics: {
        temperature: 26.0,
        rainfallMm: 55,
        soilMoisturePct: 70,
        windSpeedKmh: 68,
      },
      immediateTacticalSteps: [
        {
          step: 'Erect bamboo stakes and earthing-up soil ridges around base of vulnerable crops to prevent stem lodging.',
          timeline: '0-4 hours',
          priority: 'Immediate',
        },
        {
          step: 'Harvest mature pods, fruits, or green leaves ahead of high winds to avoid yield loss.',
          timeline: 'Immediate',
          priority: 'Immediate',
        },
        {
          step: 'Secure poly-tunnels and nursery shade netting.',
          timeline: 'Before squall arrival',
          priority: 'Immediate',
        },
      ],
      voiceAudioSummary: `Gale force storm alert for ${location.name}. 68 km/h winds approaching. Stake crops and harvest mature yield immediately.`,
      timestamp: new Date().toISOString(),
      locationName: location.name,
    };
  }

  // Default: Drought
  return {
    id: `sim-drought-${Date.now()}`,
    type: 'drought',
    severity: 'CRITICAL',
    headline: `EXTREME HEATWAVE & DROUGHT SHOCK ALERT`,
    description: `Simulated 42.5°C heat dome with zero rainfall forecast over ${location.villageOrDistrict}. Evapotranspiration will exhaust topsoil moisture within 48 hours for ${cropName}.`,
    expectedOnset: 'Active now - peak intensity for next 5 days',
    duration: '5 days',
    detectedMetrics: {
      temperature: 42.5,
      rainfallMm: 0,
      soilMoisturePct: 11,
      windSpeedKmh: 18,
    },
    immediateTacticalSteps: [
      {
        step: 'Spread 6-8cm organic straw mulch across active drip line and root beds to insulate soil from solar baking.',
        timeline: 'Today',
        priority: 'Immediate',
      },
      {
        step: 'Run drip irrigation strictly during pre-dawn (03:30 - 06:30); zero daytime sprinkler spraying.',
        timeline: 'Daily pre-dawn',
        priority: 'Immediate',
      },
      {
        step: 'Apply foliar bio-fertilizer and anti-transpirant potassium mist to prevent wilting.',
        timeline: 'Within 24h',
        priority: 'Within 24h',
      },
    ],
    voiceAudioSummary: `Severe heatwave alert for ${location.name}. Temperatures hitting 42.5 degrees. Mulch soil immediately and irrigate at pre-dawn.`,
    timestamp: new Date().toISOString(),
    locationName: location.name,
  };
}

/**
 * Send native browser push notification if permitted
 */
export function sendBrowserPushNotification(alert: ExtremeWeatherAlert): void {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      try {
        new Notification(`⚠️ ${alert.headline}`, {
          body: `${alert.description.substring(0, 140)}...\nLocation: ${alert.locationName}`,
          icon: '/favicon.ico',
          tag: alert.type,
        });
      } catch (err) {
        console.warn('Could not trigger native notification:', err);
      }
    }
  }
}
