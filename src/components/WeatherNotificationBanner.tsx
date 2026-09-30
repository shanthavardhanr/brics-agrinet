import React, { useState, useEffect } from 'react';
import {
  ExtremeWeatherAlert,
  UserFarmLocation,
} from '../types/agriculture';
import {
  sendBrowserPushNotification,
  PRESET_FARM_LOCATIONS,
  saveStoredUserLocation,
  detectDeviceLocation,
} from '../utils/weatherAlertSystem';
import { BricsLanguage, t, getLocalizedWeatherAlert } from '../utils/translations';
import {
  Flame,
  CloudRain,
  Snowflake,
  Wind,
  Volume2,
  VolumeX,
  MapPin,
  CheckCircle2,
  Bell,
  BellOff,
  Navigation,
  ChevronDown,
  ShieldAlert,
  Compass,
} from 'lucide-react';

interface WeatherNotificationBannerProps {
  weatherAlert: ExtremeWeatherAlert | null;
  onDismissAlert?: () => void;
  userLocation: UserFarmLocation;
  onUpdateLocation: (loc: UserFarmLocation) => void;
  selectedLanguage: BricsLanguage;
  targetCrop: string;
  onTriggerSimulation: (type: 'flood' | 'drought' | 'frost' | 'cyclone_storm' | 'live') => void;
  activeSimulation: string | null;
}

export const WeatherNotificationBanner: React.FC<WeatherNotificationBannerProps> = ({
  weatherAlert,
  onDismissAlert,
  userLocation,
  onUpdateLocation,
  selectedLanguage,
  targetCrop,
  onTriggerSimulation,
  activeSimulation,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState<boolean>(false);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [pushEnabled, setPushEnabled] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushEnabled(Notification.permission === 'granted');
    }
  }, []);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleTogglePush = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showStatus('Browser notifications are not supported on this device.');
      return;
    }

    if (Notification.permission === 'granted') {
      showStatus('Push notifications are already active for extreme weather events.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPushEnabled(true);
        showStatus('✅ Native push notifications enabled for extreme events!');
        if (weatherAlert) {
          sendBrowserPushNotification(weatherAlert);
        }
      } else {
        showStatus('Push notification permission was not granted.');
      }
    } catch {
      showStatus('Could not request notification permission.');
    }
  };

  const handleDetectGps = async () => {
    setIsDetectingGps(true);
    try {
      const loc = await detectDeviceLocation();
      onUpdateLocation(loc);
      setIsLocationSelectorOpen(false);
      showStatus(`📍 Detected farm location: ${loc.name}`);
    } catch (err: any) {
      showStatus(`Could not detect GPS location: ${err.message || 'Permission denied'}`);
    } finally {
      setIsDetectingGps(false);
    }
  };

  const localizedAlert = weatherAlert ? getLocalizedWeatherAlert(weatherAlert, selectedLanguage) : null;

  const toggleAudioAlert = () => {
    if (!('speechSynthesis' in window)) {
      showStatus('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const activeAlert = localizedAlert || weatherAlert;
    if (!activeAlert) return;

    const speechText = `${activeAlert.headline}. ${activeAlert.description}. Immediate action: ${activeAlert.immediateTacticalSteps?.[0]?.step || ''}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;

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

  return (
    <div className="space-y-3">
      {/* Status Notice Toast */}
      {statusMessage && (
        <div className="p-3 bg-emerald-900 text-emerald-100 rounded-xl text-xs font-medium border border-emerald-700 shadow-sm animate-in fade-in duration-150 flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-300 hover:text-white ml-2">✕</button>
        </div>
      )}

      {/* Top Location Bar & Simulation Controls */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-emerald-950/10 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Farm Location Badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <span>{userLocation.name}</span>
              <span className="text-[10px] font-mono font-normal bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200">
                {userLocation.coordinates.lat.toFixed(2)}°, {userLocation.coordinates.lng.toFixed(2)}°
              </span>
            </div>
            <div className="text-[11px] text-stone-500 truncate max-w-xs sm:max-w-md">
              {userLocation.villageOrDistrict} · {userLocation.country}
            </div>
          </div>
        </div>

        {/* Action Controls: Change Location, GPS, Push Notifications, Event Simulators */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Location Picker Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsLocationSelectorOpen(!isLocationSelectorOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-stone-500" />
              <span>Change Farm Location</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isLocationSelectorOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-xs font-bold text-stone-900 mb-2 flex items-center justify-between">
                  <span>Select Stored Farm Location</span>
                  <button
                    onClick={handleDetectGps}
                    disabled={isDetectingGps}
                    className="text-[10px] text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{isDetectingGps ? 'Detecting...' : 'Use My GPS'}</span>
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-1.5">
                  {PRESET_FARM_LOCATIONS.map((loc) => {
                    const isSelected = loc.id === userLocation.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => {
                          onUpdateLocation(loc);
                          saveStoredUserLocation(loc);
                          setIsLocationSelectorOpen(false);
                          showStatus(`Switched to: ${loc.name}`);
                        }}
                        className={`w-full p-2 rounded-xl text-left transition-all cursor-pointer flex flex-col ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-950 border border-emerald-300 font-semibold'
                            : 'hover:bg-stone-50 text-stone-700 border border-transparent'
                        }`}
                      >
                        <div className="text-xs">{loc.name}</div>
                        <div className="text-[10px] text-stone-500 truncate">{loc.villageOrDistrict}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Native Browser Push Notification Toggle */}
          <button
            onClick={handleTogglePush}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
              pushEnabled
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200'
            }`}
            title="Enable push alerts for sudden weather anomalies"
          >
            {pushEnabled ? <Bell className="w-3.5 h-3.5 text-emerald-700" /> : <BellOff className="w-3.5 h-3.5 text-stone-500" />}
            <span className="hidden sm:inline">{pushEnabled ? 'Push Alerts Active' : 'Enable Push Alerts'}</span>
          </button>

          {/* Extreme Event Scenario Simulators for Evaluation */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <span className="text-[10px] font-bold text-stone-500 px-2 hidden md:inline">TEST SIMULATOR:</span>
            <button
              onClick={() => onTriggerSimulation('flood')}
              className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeSimulation === 'flood' ? 'bg-sky-600 text-white font-bold shadow-xs' : 'text-stone-700 hover:bg-stone-200'
              }`}
              title="Simulate flash flood alert"
            >
              <CloudRain className="w-3 h-3" />
              <span>Flood</span>
            </button>

            <button
              onClick={() => onTriggerSimulation('drought')}
              className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeSimulation === 'drought' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'text-stone-700 hover:bg-stone-200'
              }`}
              title="Simulate heatwave and drought shock"
            >
              <Flame className="w-3 h-3" />
              <span>Drought</span>
            </button>

            <button
              onClick={() => onTriggerSimulation('frost')}
              className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeSimulation === 'frost' ? 'bg-cyan-600 text-white font-bold shadow-xs' : 'text-stone-700 hover:bg-stone-200'
              }`}
              title="Simulate sudden ground frost surge"
            >
              <Snowflake className="w-3 h-3" />
              <span>Frost</span>
            </button>

            {activeSimulation && (
              <button
                onClick={() => onTriggerSimulation('live')}
                className="px-2 py-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline ml-1 cursor-pointer"
              >
                Reset Live
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVE REAL-TIME EXTREME EVENT NOTIFICATION BANNER */}
      {weatherAlert && (
        <div
          className={`rounded-2xl p-5 border shadow-md animate-in slide-in-from-top-3 duration-300 ${
            weatherAlert.type === 'flood'
              ? 'bg-gradient-to-r from-sky-950 via-sky-900 to-blue-950 text-white border-sky-600/60'
              : weatherAlert.type === 'frost'
              ? 'bg-gradient-to-r from-cyan-950 via-slate-900 to-sky-950 text-white border-cyan-500/60'
              : weatherAlert.type === 'drought'
              ? 'bg-gradient-to-r from-amber-950 via-red-950 to-orange-950 text-white border-amber-600/60'
              : 'bg-gradient-to-r from-purple-950 via-slate-900 to-stone-950 text-white border-purple-600/60'
          }`}
        >
          {/* Header Row: Severity Pill, Headline, Audio Voice Readout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                  weatherAlert.type === 'flood'
                    ? 'bg-sky-500/30 text-sky-300 border border-sky-400/40'
                    : weatherAlert.type === 'frost'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                    : 'bg-amber-500/30 text-amber-300 border border-amber-400/40'
                }`}
              >
                {weatherAlert.type === 'flood' ? (
                  <CloudRain className="w-5 h-5 animate-bounce" />
                ) : weatherAlert.type === 'frost' ? (
                  <Snowflake className="w-5 h-5 animate-spin" />
                ) : (
                  <Flame className="w-5 h-5 animate-pulse" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      weatherAlert.severity === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-amber-500 text-stone-950'
                    }`}
                  >
                    {weatherAlert.severity} {t('lblEmergencyAlert', selectedLanguage) || 'EMERGENCY'}
                  </span>
                  <span className="text-[11px] text-white/70 font-mono">
                    {t('lblOnset', selectedLanguage) || 'Onset:'} {(localizedAlert || weatherAlert).expectedOnset}
                  </span>
                </div>
                <h2 className="font-serif text-base sm:text-lg font-bold tracking-tight text-white mt-0.5">
                  {(localizedAlert || weatherAlert).headline}
                </h2>
              </div>
            </div>

            {/* Audio Readout & Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAudioAlert}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-400 hover:bg-amber-500 text-stone-950'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                }`}
                title="Listen to emergency voice alert in local language"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
                <span>{isSpeaking ? t('btnPauseAudio', selectedLanguage) : t('btnListenAdvisory', selectedLanguage)}</span>
              </button>
            </div>
          </div>

          {/* Description & Detected Anomaly Metrics */}
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-4">
            {(localizedAlert || weatherAlert).description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-[10px] text-white/60 font-sans uppercase">{t('lblExpectedRainfall', selectedLanguage) || 'Expected Rainfall'}</div>
              <div className="font-bold text-sm text-sky-300 mt-0.5">{weatherAlert.detectedMetrics.rainfallMm} mm</div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-[10px] text-white/60 font-sans uppercase">{t('lblPeakTemp', selectedLanguage) || 'Peak Temperature'}</div>
              <div className={`font-bold text-sm mt-0.5 ${weatherAlert.type === 'frost' ? 'text-cyan-300' : 'text-amber-300'}`}>
                {weatherAlert.detectedMetrics.temperature}°C
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-[10px] text-white/60 font-sans uppercase">{t('lblSoilSaturation', selectedLanguage) || 'Soil Saturation'}</div>
              <div className="font-bold text-sm text-emerald-300 mt-0.5">{weatherAlert.detectedMetrics.soilMoisturePct}%</div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-[10px] text-white/60 font-sans uppercase">{t('lblWindSpeed', selectedLanguage) || 'Wind Velocity'}</div>
              <div className="font-bold text-sm text-stone-300 mt-0.5">{weatherAlert.detectedMetrics.windSpeedKmh} km/h</div>
            </div>
          </div>

          {/* Immediate Tactical Emergency Steps */}
          <div className="bg-black/40 rounded-xl p-3.5 border border-white/10 space-y-2">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t('lblImmediateCountermeasures', selectedLanguage) || 'Immediate Tactical Countermeasures for'} {targetCrop}</span>
            </div>

            <div className="space-y-2">
              {(localizedAlert || weatherAlert).immediateTacticalSteps.map((step: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-100">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
                    step.urgency?.includes('Immediate') || step.priority === 'Immediate' ? 'bg-red-500/80 text-white' : 'bg-amber-500/80 text-stone-900'
                  }`}>
                    {step.urgency || step.timeline || 'Immediate'}
                  </span>
                  <span className="leading-snug">{step.step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
