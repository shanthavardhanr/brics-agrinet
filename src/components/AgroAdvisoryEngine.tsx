import React, { useState, useEffect } from 'react';
import {
  AgroEcologicalRegion,
  SoilHealthData,
  SatelliteTelemetryData,
  WeatherForecastData,
  AgroAdvisoryResponse,
  UserFarmLocation,
  ExtremeWeatherAlert,
} from '../types/agriculture';
import { BRICS_REGIONS } from '../data/bricsRegions';
import {
  BricsLanguage,
  t,
  localizeAdvisoryToLanguage,
  translateCropName,
  translateNdviStatus,
  translateSoilTexture,
  translateSeverity,
} from '../utils/translations';
import {
  saveCachedAdvisory,
  getCachedAdvisory,
  preCacheAllRegionalFieldPacks,
} from '../utils/offlineStorage';
import { WeatherNotificationBanner } from './WeatherNotificationBanner';
import { SoilHealthCheckWorkflow } from './SoilHealthCheckWorkflow';
import {
  getStoredUserLocation,
  saveStoredUserLocation,
  evaluateWeatherAlert,
  simulateExtremeAlert,
  sendBrowserPushNotification,
  PRESET_FARM_LOCATIONS,
} from '../utils/weatherAlertSystem';
import {
  Sparkles,
  Satellite,
  Droplets,
  Thermometer,
  CloudRain,
  Sun,
  ShieldAlert,
  Volume2,
  VolumeX,
  Printer,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Leaf,
  Layers,
  Info,
  Calendar,
  Compass,
} from 'lucide-react';

interface AgroAdvisoryEngineProps {
  selectedLanguage: BricsLanguage;
}

export const AgroAdvisoryEngine: React.FC<AgroAdvisoryEngineProps> = ({ selectedLanguage }) => {
  // Selected Region
  const [selectedRegion, setSelectedRegion] = useState<AgroEcologicalRegion>(BRICS_REGIONS[0]);

  // Farm Parameters
  const [farmSize, setFarmSize] = useState<number>(1.5);
  const [targetCrop, setTargetCrop] = useState<string>(selectedRegion.stapleCrops[0]);

  // Soil State
  const [soil, setSoil] = useState<SoilHealthData>(selectedRegion.defaultSoil);

  // Satellite State
  const [satellite, setSatellite] = useState<SatelliteTelemetryData>(selectedRegion.defaultSatellite);

  // Weather State
  const [weather, setWeather] = useState<WeatherForecastData>(selectedRegion.defaultWeather);

  // Stored Farm Location State
  const [userLocation, setUserLocation] = useState<UserFarmLocation>(getStoredUserLocation());

  // Real-time Extreme Weather Alert State
  const [extremeAlert, setExtremeAlert] = useState<ExtremeWeatherAlert | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);

  // Advisory Generation State
  const [advisory, setAdvisory] = useState<AgroAdvisoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCachedOffline, setIsCachedOffline] = useState<boolean>(false);
  const [cachedSavedAt, setCachedSavedAt] = useState<string | null>(null);

  // Audio Speech State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Auto-evaluate weather anomalies whenever weather, soil, or location updates
  useEffect(() => {
    if (activeSimulation) return;
    const computedAlert = evaluateWeatherAlert(weather, soil, satellite, userLocation, targetCrop);
    setExtremeAlert(computedAlert);
    if (computedAlert && computedAlert.severity === 'CRITICAL') {
      sendBrowserPushNotification(computedAlert);
    }
  }, [weather, soil, satellite, userLocation, targetCrop, activeSimulation]);

  // Synchronize defaults when user picks another region
  const handleRegionChange = (regionId: string) => {
    const region = BRICS_REGIONS.find((r) => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
      setSoil(region.defaultSoil);
      setSatellite(region.defaultSatellite);
      setWeather(region.defaultWeather);
      setTargetCrop(region.stapleCrops[0]);
      setIsCachedOffline(false);
      setCachedSavedAt(null);
      setActiveSimulation(null);

      // Map regional preset farm location
      const matchingPreset = PRESET_FARM_LOCATIONS.find((loc) =>
        loc.country.toLowerCase() === region.country.toLowerCase() ||
        loc.region.toLowerCase().includes(region.regionName.toLowerCase().split(' ')[0])
      );
      if (matchingPreset) {
        setUserLocation(matchingPreset);
        saveStoredUserLocation(matchingPreset);
      }

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  };

  // Trigger Extreme Weather Simulation Drill
  const handleTriggerSimulation = (type: 'flood' | 'drought' | 'frost' | 'cyclone_storm' | 'live') => {
    if (type === 'live') {
      setActiveSimulation(null);
      setSoil(selectedRegion.defaultSoil);
      setSatellite(selectedRegion.defaultSatellite);
      setWeather(selectedRegion.defaultWeather);
      const liveAlert = evaluateWeatherAlert(
        selectedRegion.defaultWeather,
        selectedRegion.defaultSoil,
        selectedRegion.defaultSatellite,
        userLocation,
        targetCrop
      );
      setExtremeAlert(liveAlert);
      return;
    }

    setActiveSimulation(type);
    const simAlert = simulateExtremeAlert(type, userLocation, targetCrop);
    setExtremeAlert(simAlert);
    sendBrowserPushNotification(simAlert);

    // Update telemetry state to match the simulated extreme event
    if (type === 'flood') {
      setWeather((prev) => ({
        ...prev,
        rainfallExpectedMm: 82,
        alert: 'CRITICAL INUNDATION: Severe monsoon depression active',
      }));
      setSoil((prev) => ({ ...prev, moisture: 88 }));
      setSatellite((prev) => ({ ...prev, ndwi: 0.65 }));
    } else if (type === 'drought') {
      setWeather((prev) => ({
        ...prev,
        rainfallExpectedMm: 0,
        avgTemp: 41,
        maxTemp: 42.5,
        alert: 'CRITICAL DROUGHT: Persistent heat dome with 0mm rain',
      }));
      setSoil((prev) => ({ ...prev, moisture: 11 }));
      setSatellite((prev) => ({ ...prev, ndvi: 0.28, ndwi: -0.2 }));
    } else if (type === 'frost') {
      setWeather((prev) => ({
        ...prev,
        minTemp: -1.2,
        avgTemp: 2.8,
        alert: 'CRITICAL FREEZE: Polar cold surge with ground frost',
      }));
    } else if (type === 'cyclone_storm') {
      setWeather((prev) => ({
        ...prev,
        rainfallExpectedMm: 55,
        windSpeedKmh: 68,
        alert: 'CRITICAL GALE: High-velocity squall and wind shear',
      }));
    }
  };

  // Language mapping to full language name for the backend prompt
  const getLanguagePromptName = (lang: BricsLanguage): string => {
    switch (lang) {
      case 'te': return 'Telugu';
      case 'hi': return 'Hindi';
      case 'pt': return 'Portuguese';
      case 'ru': return 'Russian';
      case 'zh': return 'Mandarin Chinese';
      case 'ar': return 'Arabic';
      case 'sw': return 'Swahili';
      default: return 'English';
    }
  };

  // Generate Advisory via backend API with offline cache fallback
  const handleGenerateAdvisory = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const response = await fetch('/api/advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: selectedRegion.country,
          region: selectedRegion.regionName,
          soilHealth: soil,
          satelliteTelemetry: satellite,
          weatherForecast: weather,
          targetCrop: targetCrop,
          farmSizeHectares: farmSize,
          language: getLanguagePromptName(selectedLanguage),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: AgroAdvisoryResponse = await response.json();
      setAdvisory(data);
      setIsCachedOffline(false);
      setCachedSavedAt(null);
      // Cache this fresh advisory to device local storage
      saveCachedAdvisory(selectedRegion.id, targetCrop, data);
    } catch (err: any) {
      console.warn('Network request failed, checking offline cache:', err);
      // Attempt to load from offline local storage
      const cached = getCachedAdvisory(selectedRegion.id, targetCrop);
      if (cached) {
        setAdvisory(cached.advisory);
        setIsCachedOffline(true);
        setCachedSavedAt(cached.savedAt);
        setErrorMsg(null);
      } else {
        setErrorMsg('Network offline. No pre-cached advisory found for this region/crop. Try downloading the Offline Field Pack.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate advisory on first mount, region change, or language change
  useEffect(() => {
    handleGenerateAdvisory();
  }, [selectedRegion.id, selectedLanguage]);

  const localizedAdvisory = advisory ? localizeAdvisoryToLanguage(advisory, selectedLanguage) : null;

  // Audio Readout using Web Speech API
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentAdv = localizedAdvisory || advisory;
    if (!currentAdv) return;

    const speechText = `${currentAdv.advisoryTitle}. ${t('riskLevel', selectedLanguage)} ${currentAdv.farmerRiskLevel}. ${currentAdv.executiveSummary} ${currentAdv.bricsKnowledgeTransfer?.adaptationInsight || ''}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;

    // Pick speech voice based on language code
    const voiceLangMap: Record<BricsLanguage, string> = {
      en: 'en-US',
      te: 'te-IN',
      hi: 'hi-IN',
      pt: 'pt-BR',
      ru: 'ru-RU',
      zh: 'zh-CN',
      ar: 'ar-SA',
      sw: 'sw-KE',
    };
    utterance.lang = voiceLangMap[selectedLanguage] || 'en-US';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Presets to simulate conditions
  const applyPreset = (type: 'degraded' | 'saline' | 'optimal') => {
    if (type === 'degraded') {
      setSoil((prev) => ({
        ...prev,
        organicCarbon: 0.38,
        nitrogen: 140,
        moisture: 16,
      }));
      setSatellite((prev) => ({
        ...prev,
        ndvi: 0.32,
        canopyStatus: 'High vegetative stress, chlorosis detected in satellite imagery',
      }));
    } else if (type === 'saline') {
      setSoil((prev) => ({
        ...prev,
        ph: 8.4,
        salinityEc: 3.5,
        moisture: 20,
      }));
      setSatellite((prev) => ({
        ...prev,
        ndvi: 0.38,
        canopyStatus: 'Salt-crusted perimeter and osmotic root inhibition',
      }));
    } else {
      setSoil(selectedRegion.defaultSoil);
      setSatellite(selectedRegion.defaultSatellite);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header & Regional Selector */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200/80 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              <span>{t('engineCategory', selectedLanguage)}</span>
              <span aria-hidden="true">·</span>
              <span>{t('engineNode', selectedLanguage)}</span>
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight">
              {t('engineTitle', selectedLanguage)}
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              {t('engineSubtitle', selectedLanguage)}
            </p>
          </div>

          {/* Quick Refresh Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGenerateAdvisory()}
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'text-emerald-300'}`} />
              <span>{isLoading ? t('btnAnalyzingTelemetry', selectedLanguage) : t('btnRefreshAdvisory', selectedLanguage)}</span>
            </button>
          </div>
        </div>

        {/* Region Selector Bar */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
            {t('lblSelectRegion', selectedLanguage)}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {BRICS_REGIONS.map((region) => {
              const isSelected = region.id === selectedRegion.id;
              return (
                <button
                  key={region.id}
                  onClick={() => handleRegionChange(region.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-50/80 shadow-sm ring-1 ring-emerald-600'
                      : 'border-stone-200 bg-stone-50/60 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-lg">{region.flag}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200/80 text-stone-700 font-semibold">
                      {region.countryCode}
                    </span>
                  </div>
                  <div className="font-semibold text-xs text-stone-900 truncate">{region.country}</div>
                  <div className="text-[11px] text-stone-500 truncate mt-0.5" title={region.regionName}>
                    {region.regionName.split('(')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-time Extreme Weather Notification & Stored Location System */}
      <WeatherNotificationBanner
        weatherAlert={extremeAlert}
        userLocation={userLocation}
        onUpdateLocation={(newLoc) => {
          setUserLocation(newLoc);
          saveStoredUserLocation(newLoc);
        }}
        selectedLanguage={selectedLanguage}
        targetCrop={targetCrop}
        onTriggerSimulation={handleTriggerSimulation}
        activeSimulation={activeSimulation}
      />

      {/* PRIMARY FARMER SOIL HEALTH CHECK WORKFLOW */}
      <SoilHealthCheckWorkflow
        currentSoil={soil}
        onUpdateSoil={(newSoil) => setSoil(newSoil)}
        selectedLanguage={selectedLanguage}
        selectedCrop={targetCrop}
        onUpdateCrop={(newCrop) => setTargetCrop(newCrop)}
        regionName={selectedRegion.regionName}
        countryName={selectedRegion.country}
        isOnline={navigator.onLine}
      />

      {/* Telemetry & Climate Inputs Grid: Satellite + Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CARD 1: Satellite Telemetry */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-800">
                  <Satellite className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-stone-900 text-sm">
                    {t('cardSatelliteTitle', selectedLanguage)}
                  </h2>
                  <p className="text-[11px] text-stone-500">{satellite.sourceSatellite}</p>
                </div>
              </div>

              <span className="text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded">
                {t('lblMultiSpectral', selectedLanguage)}
              </span>
            </div>

            {/* Simulated Satellite NDVI Heat Map */}
            <div className="relative h-28 rounded-xl overflow-hidden border border-stone-200 bg-stone-900 flex items-center justify-center mb-3">
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background: `radial-gradient(circle at 40% 40%, rgba(34,197,94,${satellite.ndvi}) 0%, rgba(234,179,8,${
                    1 - satellite.ndvi
                  }) 60%, rgba(185,28,28,${satellite.ndvi < 0.4 ? 0.6 : 0.1}) 100%)`,
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px]" />

              <div className="relative z-10 text-center px-4 py-2 bg-stone-900/70 backdrop-blur-xs rounded-lg border border-stone-700/60">
                <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">
                  {t('lblNdvi', selectedLanguage)}
                </div>
                <div className="text-2xl font-serif font-bold text-white tracking-tight">
                  {satellite.ndvi.toFixed(2)}
                </div>
                <div className="text-[10px] text-stone-300">
                  {translateNdviStatus(satellite.ndvi, selectedLanguage)}
                </div>
              </div>

              <div className="absolute bottom-1 right-2 text-[9px] font-mono text-stone-400">
                Lat: {selectedRegion.coordinates.lat.toFixed(2)}, Lng: {selectedRegion.coordinates.lng.toFixed(2)}
              </div>
            </div>

            {/* Satellite telemetry metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-1.5 text-stone-600 mb-0.5">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-[11px]">{t('lblNdwi', selectedLanguage)}</span>
                </div>
                <div className="font-mono font-bold text-stone-900 text-sm">{satellite.ndwi.toFixed(2)}</div>
                <div className="text-[10px] text-stone-500">{t('lblNdwiSub', selectedLanguage)}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-1.5 text-stone-600 mb-0.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[11px]">{t('lblSurfaceTemp', selectedLanguage)}</span>
                </div>
                <div className="font-mono font-bold text-stone-900 text-sm">{satellite.surfaceTemp.toFixed(1)}°C</div>
                <div className="text-[10px] text-stone-500">{t('lblSurfaceTempSub', selectedLanguage)}</div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-stone-600 bg-sky-50/50 p-2 rounded-lg border border-sky-100 flex items-center justify-between">
            <span>{t('lblCanopyStatus', selectedLanguage)}</span>
            <span className="font-medium text-sky-950 truncate max-w-[200px]">{translateNdviStatus(satellite.ndvi, selectedLanguage)}</span>
          </div>
        </div>

        {/* CARD 3: 7-Day Weather & Climate Alert */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <CloudRain className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-stone-900 text-sm">
                    {t('cardClimateTitle', selectedLanguage)}
                  </h2>
                  <p className="text-[11px] text-stone-500">
                    {t('cardClimateSub', selectedLanguage)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-xs text-stone-900">{weather.rainfallExpectedMm} mm</div>
                <div className="text-[10px] text-stone-500">{t('lbl7DayRain', selectedLanguage)}</div>
              </div>
            </div>

            {/* Proactive Climate Risk Alert */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 mb-3 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-900">{t('climateAlertTitle', selectedLanguage)}</div>
                <p className="text-xs text-amber-800/90 mt-0.5 leading-snug">{weather.alert}</p>
              </div>
            </div>

            {/* 7-Day Forecast Mini Cards */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {weather.forecastDays.map((day, idx) => (
                <div key={idx} className="p-1.5 rounded-lg bg-stone-50 border border-stone-200/70 text-[10px]">
                  <div className="font-medium text-stone-600">{day.day}</div>
                  <div className="my-1">
                    {day.condition === 'rainy' ? (
                      <CloudRain className="w-3.5 h-3.5 mx-auto text-sky-600" />
                    ) : day.condition === 'heatwave' ? (
                      <Sun className="w-3.5 h-3.5 mx-auto text-red-500" />
                    ) : day.condition === 'storm' ? (
                      <CloudRain className="w-3.5 h-3.5 mx-auto text-purple-600" />
                    ) : (
                      <Sun className="w-3.5 h-3.5 mx-auto text-amber-500" />
                    )}
                  </div>
                  <div className="font-bold font-mono text-stone-800">{day.high}°</div>
                  <div className="text-[9px] text-sky-700 font-mono">{day.rainChance}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Crop Selection */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
            <div className="text-xs text-stone-600">
              <span className="font-medium">{t('lblTargetCrop', selectedLanguage)}</span>
              <select
                value={targetCrop}
                onChange={(e) => setTargetCrop(e.target.value)}
                className="ml-2 text-xs font-semibold text-stone-900 bg-stone-100 border border-stone-300 rounded px-2 py-1"
              >
                {selectedRegion.stapleCrops.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-stone-600">
              <span className="font-medium">{t('lblFarmSize', selectedLanguage)}</span>
              <input
                type="number"
                min="0.2"
                max="50"
                step="0.1"
                value={farmSize}
                onChange={(e) => setFarmSize(parseFloat(e.target.value) || 1)}
                className="ml-1.5 w-14 text-xs font-mono font-semibold bg-stone-100 border border-stone-300 rounded px-1.5 py-1 text-center"
              />
              <span className="ml-1 text-[11px] text-stone-500">ha</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADVISORY OUTPUT SECTION */}
      {isCachedOffline && (
        <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-semibold">Offline Mode Active:</span>
            <span>Displaying verified advisory retrieved from device local cache. Full regenerative guidance remains accessible without internet.</span>
          </div>
          {cachedSavedAt && (
            <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded shrink-0">
              Cached: {new Date(cachedSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
          {errorMsg}
        </div>
      )}

      {(localizedAdvisory || advisory) && (() => {
        const activeAdv = localizedAdvisory || advisory!;
        return (
        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-sm overflow-hidden">
          {/* Advisory Header with Voice Player & Actions */}
          <div className="p-6 bg-gradient-to-r from-[#0F2E1E] to-[#1A4329] text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono uppercase tracking-wider mb-1">
                <span>{selectedRegion.country} Node</span>
                <span aria-hidden="true">·</span>
                <span>Language: {activeAdv.translatedLanguage || getLanguagePromptName(selectedLanguage)}</span>
                <span aria-hidden="true">·</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeAdv.farmerRiskLevel === 'Critical' ? 'bg-red-500/80 text-white' :
                  activeAdv.farmerRiskLevel === 'High' ? 'bg-amber-500/80 text-white' :
                  activeAdv.farmerRiskLevel === 'Medium' ? 'bg-yellow-500/80 text-stone-900' :
                  'bg-emerald-500/80 text-white'
                }`}>
                  {t('riskLevel', selectedLanguage)} {translateSeverity(activeAdv.farmerRiskLevel, selectedLanguage)}
                </span>
              </div>
              <h2 className="font-serif text-xl lg:text-2xl font-bold tracking-tight text-stone-100">
                {activeAdv.advisoryTitle}
              </h2>
            </div>

            {/* Audio Voice Player & Print Bulletin */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSpeech}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-500 hover:bg-amber-600 text-stone-900 shadow-sm'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-700'
                }`}
                title="Listen to advisory in selected language"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
                <span>{isSpeaking ? t('btnPauseAudio', selectedLanguage) : t('btnListenAdvisory', selectedLanguage)}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 text-xs transition-colors cursor-pointer"
                title="Print Extension Advisory Bulletin"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('btnPrintBulletin', selectedLanguage)}</span>
              </button>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-6 bg-stone-50/70 border-b border-stone-200/80">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
              {t('executiveDiagnosisTitle', selectedLanguage)}
            </div>
            <p className="text-stone-800 text-sm leading-relaxed">
              {activeAdv.executiveSummary}
            </p>
          </div>

          {/* Strategy Columns */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Regenerative Crop Strategy */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-2">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <h3 className="font-serif font-bold text-sm">
                  {t('secRegenCropTitle', selectedLanguage)}
                </h3>
              </div>

              <div className="space-y-3">
                {activeAdv.regenerativeCropStrategy?.recommendedCrops?.map((crop: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900">{crop.name}</span>
                      <span className="text-[10px] font-medium text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                        {crop.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">{crop.benefits}</p>
                    <div className="text-[11px] text-stone-700 font-medium pt-1">
                      <span className="text-emerald-700">Sowing: </span>{crop.sowingAdvice}
                    </div>
                  </div>
                ))}

                <div className="text-xs bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 text-stone-700">
                  <span className="font-bold text-emerald-900">{t('lblIntercropping', selectedLanguage)} </span>
                  {activeAdv.regenerativeCropStrategy?.intercroppingPattern}
                </div>
              </div>
            </div>

            {/* 2. Soil Restoration Protocol */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-2">
                <Layers className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif font-bold text-sm">
                  {t('secLivingSoilTitle', selectedLanguage)}
                </h3>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-3 text-xs">
                <div>
                  <div className="font-bold text-amber-950 mb-0.5">
                    {t('lblOcIntervention', selectedLanguage)}
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {activeAdv.soilRestorationPlan?.organicCarbonIntervention}
                  </p>
                </div>

                <div>
                  <div className="font-bold text-amber-950 mb-1">
                    {t('lblBioInoculants', selectedLanguage)}
                  </div>
                  <ul className="space-y-1">
                    {activeAdv.soilRestorationPlan?.biofertilizersRecommended?.map((bio: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5 text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{bio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-amber-950 mb-0.5">
                    {t('lblConditioner', selectedLanguage)}
                  </div>
                  <p className="text-stone-700">
                    {activeAdv.soilRestorationPlan?.phCorrection || activeAdv.soilRestorationPlan?.naturalSoilConditioner}
                  </p>
                </div>
              </div>

              {/* Water & Climate Guidance */}
              <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-200/60 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-sky-950">
                  <Droplets className="w-3.5 h-3.5 text-sky-700" />
                  <span>{t('lblIrrigation', selectedLanguage)}</span>
                </div>
                <p className="text-stone-700">{activeAdv.waterAndClimateGuidance?.irrigationSchedule}</p>
                <p className="text-stone-700 font-medium text-[11px] text-sky-900">
                  Mulch: {activeAdv.waterAndClimateGuidance?.waterRetentionMethod}
                </p>
              </div>
            </div>

            {/* 3. BRICS Knowledge Transfer & Weekly Tasks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-2">
                <Compass className="w-4 h-4 text-sky-700" />
                <h3 className="font-serif font-bold text-sm">
                  {t('secBricsTransferTitle', selectedLanguage)}
                </h3>
              </div>

              {/* BRICS Knowledge Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900 to-[#0F2E1E] text-stone-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
                  <span>{t('lblSourceNation', selectedLanguage)} {activeAdv.bricsKnowledgeTransfer?.sourceNation}</span>
                  <span>AgriNet Link</span>
                </div>
                <div className="font-serif font-bold text-sm text-white">
                  {activeAdv.bricsKnowledgeTransfer?.techniqueName}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {activeAdv.bricsKnowledgeTransfer?.adaptationInsight}
                </p>
              </div>

              {/* Weekly Action Schedule */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('secWeeklyScheduleTitle', selectedLanguage)}</span>
                </div>
                <div className="space-y-2">
                  {activeAdv.priorityWeeklyTasks?.map((task: any, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-stone-900 mb-0.5">
                        <span className="text-emerald-800">{task.dayRange}</span>
                      </div>
                      <div className="text-stone-800">{task.task}</div>
                      <div className="text-[10px] text-stone-500 mt-1 italic">Impact: {task.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
};
