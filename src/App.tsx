/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AgroAdvisoryEngine } from './components/AgroAdvisoryEngine';
import { CropDiagnosticLab } from './components/CropDiagnosticLab';
import { BRICSPublicGoodNetwork } from './components/BRICSPublicGoodNetwork';
import { PitchDeckModal } from './components/PitchDeckModal';
import { DocumentationModal } from './components/DocumentationModal';
import { OfflineManagerModal } from './components/OfflineManagerModal';
import { HackathonSubmissionModal } from './components/HackathonSubmissionModal';
import { BricsLanguage, t } from './utils/translations';
import { preCacheAllRegionalFieldPacks } from './utils/offlineStorage';
import { BRICS_REGIONS } from './data/bricsRegions';
import {
  Globe2,
  Sprout,
  ShieldCheck,
  Presentation,
  FileCode2,
  Trophy,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'advisory' | 'diagnostic' | 'publicGoods' | 'deck' | 'docs'>('advisory');
  const [selectedLanguage, setSelectedLanguage] = useState<BricsLanguage>('en');
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isOfflineManagerOpen, setIsOfflineManagerOpen] = useState<boolean>(false);
  const [isHackathonModalOpen, setIsHackathonModalOpen] = useState<boolean>(false);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);

  // Real-time network connectivity state
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    // Listen to network transitions
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize background regional cache for emergency offline field readiness
    preCacheAllRegionalFieldPacks(BRICS_REGIONS);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleTabChange = (tab: 'advisory' | 'diagnostic' | 'publicGoods' | 'deck' | 'docs') => {
    if (tab === 'deck') {
      setIsPitchDeckOpen(true);
    } else if (tab === 'docs') {
      setIsDocsOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleSelectScenario = (scenario: 'offlineDiagnostic' | 'satelliteAdvisory' | 'publicGoods' | 'weatherAlert') => {
    if (scenario === 'offlineDiagnostic') {
      setActiveTab('diagnostic');
    } else if (scenario === 'satelliteAdvisory' || scenario === 'weatherAlert') {
      setActiveTab('advisory');
    } else if (scenario === 'publicGoods') {
      setActiveTab('publicGoods');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-stone-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Application Header with Network & Offline Indicators */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        isOnline={isOnline}
        isSimulatedOffline={isSimulatedOffline}
        onToggleSimulatedOffline={() => setIsSimulatedOffline(!isSimulatedOffline)}
        onOpenOfflineManager={() => setIsOfflineManagerOpen(true)}
        onOpenHackathonModal={() => setIsHackathonModalOpen(true)}
      />

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {activeTab === 'advisory' && (
          <AgroAdvisoryEngine selectedLanguage={selectedLanguage} />
        )}

        {activeTab === 'diagnostic' && (
          <CropDiagnosticLab selectedLanguage={selectedLanguage} />
        )}

        {activeTab === 'publicGoods' && (
          <BRICSPublicGoodNetwork selectedLanguage={selectedLanguage} />
        )}
      </main>

      {/* Floating Action Buttons for Judges */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col sm:flex-row items-end sm:items-center gap-2">
        <button
          onClick={() => setIsHackathonModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all border border-emerald-400/50 cursor-pointer active:scale-95"
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>Track 4: Submission Hub</span>
        </button>

        <button
          onClick={() => setIsPitchDeckOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-xs shadow-lg hover:shadow-xl transition-all border border-amber-400/40 cursor-pointer active:scale-95"
        >
          <Presentation className="w-4 h-4 text-amber-200" />
          <span>{t('btnPitchDeckJudges', selectedLanguage)}</span>
        </button>
      </div>

      {/* Modals */}
      <HackathonSubmissionModal
        isOpen={isHackathonModalOpen}
        onClose={() => setIsHackathonModalOpen(false)}
        selectedLanguage={selectedLanguage}
        isSimulatedOffline={isSimulatedOffline}
        onToggleSimulatedOffline={() => setIsSimulatedOffline(!isSimulatedOffline)}
        onSelectScenario={handleSelectScenario}
      />

      <PitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        selectedLanguage={selectedLanguage}
      />

      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        selectedLanguage={selectedLanguage}
      />

      <OfflineManagerModal
        isOpen={isOfflineManagerOpen}
        onClose={() => setIsOfflineManagerOpen(false)}
        isOnline={isOnline && !isSimulatedOffline}
        selectedLanguage={selectedLanguage}
      />

      {/* Footer */}
      <footer className="bg-[#091D13] text-stone-400 border-t border-emerald-900/60 mt-12 py-8 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/80 flex items-center justify-center text-emerald-200">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif font-bold text-white text-sm">
                {t('footerTitle', selectedLanguage)}
              </div>
              <p className="text-[11px] text-emerald-300/80">
                {t('footerSubtitle', selectedLanguage)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setIsOfflineManagerOpen(true)}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{t('lblOfflineFieldCache', selectedLanguage) || 'Offline Field Cache'}</span>
            </button>
            <span className="text-emerald-900" aria-hidden="true">|</span>
            <button
              onClick={() => setIsDocsOpen(true)}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>{t('btnApiVerification', selectedLanguage)}</span>
            </button>
            <span className="text-emerald-900" aria-hidden="true">|</span>
            <button
              onClick={() => setIsPitchDeckOpen(true)}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>{t('btnPitchDeck', selectedLanguage)}</span>
            </button>
            <span className="text-emerald-900" aria-hidden="true">|</span>
            <span className="text-stone-300">{t('footerFao', selectedLanguage)}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-stone-300">
          <div>
            {t('footerDevote', selectedLanguage)}
          </div>
          <div>
            {t('footerSdgs', selectedLanguage)}
          </div>
        </div>
      </footer>
    </div>
  );
}
