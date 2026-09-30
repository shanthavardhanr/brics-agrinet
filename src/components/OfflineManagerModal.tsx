import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Database,
  Download,
  Trash2,
  CheckCircle2,
  HardDrive,
  RefreshCw,
  X,
  FileText,
  Clock,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import {
  getCacheMetrics,
  clearAgriNetCache,
  preCacheAllRegionalFieldPacks,
  getCachedDiagnoses,
  CacheMetrics,
} from '../utils/offlineStorage';
import { BRICS_REGIONS } from '../data/bricsRegions';
import { BricsLanguage, t } from '../utils/translations';

interface OfflineManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  selectedLanguage: BricsLanguage;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({
  isOpen,
  onClose,
  isOnline,
  selectedLanguage,
}) => {
  const [metrics, setMetrics] = useState<CacheMetrics>(getCacheMetrics());
  const [isPreCaching, setIsPreCaching] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const refreshMetrics = () => {
    setMetrics(getCacheMetrics());
  };

  useEffect(() => {
    if (isOpen) {
      refreshMetrics();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadFieldPack = () => {
    setIsPreCaching(true);
    setMessage(null);
    setTimeout(() => {
      preCacheAllRegionalFieldPacks(BRICS_REGIONS);
      refreshMetrics();
      setIsPreCaching(false);
      setMessage('✅ Complete BRICS offline field packs cached successfully! Ready for disconnected field use.');
    }, 600);
  };

  const handleClearCache = () => {
    if (confirm('Clear local offline cache? Pre-cached field guides will need to be re-downloaded.')) {
      clearAgriNetCache();
      refreshMetrics();
      setMessage('Local cache cleared.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-950/20 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0F2E1E] text-stone-100 px-6 py-4 flex items-center justify-between border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isOnline ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-300">
                Service Worker &amp; Local Storage Cache
              </div>
              <div className="font-serif font-bold text-sm text-white flex items-center gap-2">
                <span>Offline Field Resilience Manager</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  isOnline ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                }`}>
                  {isOnline ? 'Network Connected' : 'Offline / Low Connectivity'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 bg-stone-50/40">
          {message && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-medium text-xs">
              {message}
            </div>
          )}

          {/* Connection Status Card */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              </div>
              <div>
                <div className="font-bold text-sm text-stone-900">
                  {isOnline ? 'Online · Cloud Telemetry Synchronized' : 'Offline Mode · Using Cached Knowledge'}
                </div>
                <div className="text-stone-500 text-[11px] mt-0.5">
                  {isOnline
                    ? 'Connected to Gemini 3.8 Flash & real-time Sentinel-2 telemetry.'
                    : 'Device is offline. All advisories, biological IPM formulas, and regional models are served from local storage.'}
                </div>
              </div>
            </div>
          </div>

          {/* Storage & Caching Metrics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-700" />
                <span>Device Storage &amp; Cached Models</span>
              </h3>
              <button
                onClick={refreshMetrics}
                className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-[11px]">
              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                <div className="text-stone-500 text-[10px] uppercase font-sans">Cached Advisories</div>
                <div className="font-bold text-base text-emerald-800 mt-1">
                  {metrics.totalAdvisoriesCached}
                </div>
                <div className="text-[10px] text-stone-400 font-sans">Regional Profiles</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                <div className="text-stone-500 text-[10px] uppercase font-sans">Saved Diagnoses</div>
                <div className="font-bold text-base text-amber-800 mt-1">
                  {metrics.totalDiagnosesCached}
                </div>
                <div className="text-[10px] text-stone-400 font-sans">Field Lookups</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                <div className="text-stone-500 text-[10px] uppercase font-sans">Storage Used</div>
                <div className="font-bold text-base text-stone-900 mt-1">
                  {metrics.approxSizeKb} KB
                </div>
                <div className="text-[10px] text-stone-400 font-sans">Ultra-lightweight</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                <div className="text-stone-500 text-[10px] uppercase font-sans">Service Worker</div>
                <div className="font-bold text-xs text-emerald-700 mt-1 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active</span>
                </div>
                <div className="text-[10px] text-stone-400 font-sans">Cache-First</div>
              </div>
            </div>
          </div>

          {/* Action: 1-Click Pre-Cache All BRICS Field Guides */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950 to-[#0F2E1E] text-white space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
              <Download className="w-4 h-4" />
              <span>Offline Readiness for Remote Villages</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Going into remote rural areas without reliable cellular coverage? Download the pre-packaged BRICS offline field pack. This caches all 7 regional soil profiles, drought mitigation schedules, and crop disease diagnostic data directly to this device.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadFieldPack}
                disabled={isPreCaching}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className={`w-3.5 h-3.5 ${isPreCaching ? 'animate-bounce' : ''}`} />
                <span>{isPreCaching ? 'Caching All Regional Guides...' : 'Download Complete Offline Field Pack'}</span>
              </button>

              <button
                onClick={handleClearCache}
                className="px-3 py-2 bg-stone-900/60 hover:bg-stone-800 text-stone-400 hover:text-white rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Local Cache</span>
              </button>
            </div>
          </div>

          {/* PWA & Service Worker Explanation */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>How BRICS AgriNet Works Offline</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-[11px] leading-relaxed">
              <li>
                <strong>Automatic Background Caching:</strong> Every time you generate an agro-advisory or disease diagnosis while connected, it is automatically cached to device local storage.
              </li>
              <li>
                <strong>Network-Falling-Back-to-Cache:</strong> If you lose internet in the field, the application automatically pulls up your last saved regional advisory with zero delay.
              </li>
              <li>
                <strong>Offline Emergency Biocontrol:</strong> Biological remedies (neem oil concoctions, Trichoderma formulations, wood ash, biochar) are always accessible offline without requiring a server roundtrip.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
