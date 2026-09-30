import React from 'react';
import {
  Sprout,
  Globe2,
  Presentation,
  FileCode2,
  Layers,
  Sparkles,
  ShieldCheck,
  Wifi,
  WifiOff,
  Trophy,
} from 'lucide-react';
import { BricsLanguage, BRICS_LANGUAGES, t } from '../utils/translations';

interface HeaderProps {
  activeTab: 'advisory' | 'diagnostic' | 'publicGoods' | 'deck' | 'docs';
  setActiveTab: (tab: 'advisory' | 'diagnostic' | 'publicGoods' | 'deck' | 'docs') => void;
  selectedLanguage: BricsLanguage;
  setSelectedLanguage: (lang: BricsLanguage) => void;
  onOpenPitchDeck: () => void;
  isOnline: boolean;
  isSimulatedOffline: boolean;
  onToggleSimulatedOffline: () => void;
  onOpenOfflineManager: () => void;
  onOpenHackathonModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  onOpenPitchDeck,
  isOnline,
  isSimulatedOffline,
  onToggleSimulatedOffline,
  onOpenOfflineManager,
  onOpenHackathonModal,
}) => {
  const effectiveOnline = isOnline && !isSimulatedOffline;

  return (
    <header className="sticky top-0 z-40 bg-[#0F2E1E] text-stone-100 border-b border-emerald-900/60 shadow-md">
      {/* Top Banner: BRICS Cooperation & DPI Initiative */}
      <div className="bg-[#091D13] text-emerald-300 text-xs py-1.5 px-4 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">{t('initiativeBadge', selectedLanguage)}</span>
            <span className="text-emerald-500/70" aria-hidden="true">·</span>
            <span className="text-stone-300">{t('initiativeSubtitle', selectedLanguage)}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-stone-300">
            {/* Hackathon Track Tag */}
            <button
              onClick={onOpenHackathonModal}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30 transition-all cursor-pointer"
              title="Click to view Hackathon Submission Hub & 1-Click Judge Scenarios"
            >
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>Track 4 · Team Nirvana</span>
            </button>

            {/* Offline Simulator Switch */}
            <button
              onClick={onToggleSimulatedOffline}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                isSimulatedOffline
                  ? 'bg-amber-950 text-amber-300 border border-amber-500 animate-pulse'
                  : 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800'
              }`}
              title="Click to toggle Simulated Offline (Airplane Mode)"
            >
              {effectiveOnline ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
              <span>{isSimulatedOffline ? 'Offline Mode (Airplane ON)' : (effectiveOnline ? 'Online (Cached)' : 'Offline (Local)')}</span>
            </button>

            <span className="text-emerald-600 hidden md:inline" aria-hidden="true">|</span>
            <span className="font-mono text-emerald-300 hidden md:inline">{t('networkNode', selectedLanguage)}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('advisory')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-white shadow-inner border border-emerald-400/30">
            <Sprout className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-tight text-white">BRICS AgriNet</span>
              <span className="text-[10px] uppercase font-mono tracking-wider bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 px-1.5 py-0.5 rounded">
                AgriN DPG
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 hidden sm:block">
              {t('appTagline', selectedLanguage)}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-[#091D13] p-1 rounded-xl border border-emerald-900/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('advisory')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'advisory'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t('navAdvisories', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'diagnostic'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('navDiagnostic', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveTab('publicGoods')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'publicGoods'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-sky-300" />
            <span>{t('navDataExchange', selectedLanguage)}</span>
          </button>
        </nav>

        {/* Right Controls: Hackathon Hub, Pitch Deck, Language Selector */}
        <div className="flex items-center gap-2">
          {/* Hackathon Hub button */}
          <button
            onClick={onOpenHackathonModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-medium text-xs shadow-sm transition-all border border-emerald-400/40 cursor-pointer"
            title="Open Hackathon Submission Dossier & 1-Click Judge Demos"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Hackathon Hub</span>
          </button>

          {/* Pitch Deck presentation button for judges */}
          <button
            onClick={onOpenPitchDeck}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-50 font-medium text-xs shadow-sm transition-all border border-amber-500/40 cursor-pointer"
            title="Open Interactive Pitch Deck for Judges"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>{t('btnPitchDeck', selectedLanguage)}</span>
          </button>

          {/* Technical Docs */}
          <button
            onClick={() => setActiveTab('docs')}
            className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
              activeTab === 'docs'
                ? 'bg-emerald-800 border-emerald-600 text-white'
                : 'border-emerald-800/60 bg-[#091D13] text-stone-300 hover:text-white hover:border-emerald-700'
            }`}
            title="Technical Architecture & Endpoint Verification"
          >
            <FileCode2 className="w-4 h-4" />
          </button>

          {/* Multi-lingual Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as BricsLanguage)}
              aria-label="Preferred BRICS Language"
              className="bg-[#091D13] border border-emerald-700 text-stone-100 text-xs font-medium rounded-lg px-2.5 py-1.5 pr-7 appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
            >
              {BRICS_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-stone-900 text-white">
                  {lang.flag} {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

