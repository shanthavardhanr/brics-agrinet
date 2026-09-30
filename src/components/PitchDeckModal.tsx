import React, { useState, useEffect } from 'react';
import { PitchSlide } from '../data/pitchDeckData';
import { BricsLanguage, t, getLocalizedPitchSlides } from '../utils/translations';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Presentation,
  Award,
  TrendingUp,
  Globe2,
  ShieldCheck,
  HeartHandshake,
  Download,
  Sliders,
  DollarSign,
  Droplets,
  Leaf,
  CheckCircle2,
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage?: BricsLanguage;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose,
  selectedLanguage = 'en',
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Community ROI Calculator State for Judges
  const [cooperativeSize, setCooperativeSize] = useState<number>(250); // smallholders in community cluster
  const [avgFarmHectares, setAvgFarmHectares] = useState<number>(1.4); // average landholding

  const slides = getLocalizedPitchSlides(selectedLanguage);
  const currentSlide: PitchSlide = slides[currentSlideIndex] || slides[0];

  // Keyboard navigation for slide deck
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, slides.length]);

  if (!isOpen) return null;

  // Impact Calculations
  const totalHectares = Math.round(cooperativeSize * avgFarmHectares);
  const fertilizerSavingsUSD = Math.round(totalHectares * 92); // ~$92/ha saved on synthetic urea & chemicals
  const waterConservedLiters = Math.round(totalHectares * 480000); // 480k liters/ha conserved via mulching & drip
  const carbonSequesteredTonnes = (totalHectares * 1.6).toFixed(1); // 1.6 t CO2e/ha/yr topsoil organic carbon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-emerald-950/20 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Presentation Bar */}
        <div className="bg-[#0F2E1E] text-stone-100 px-6 py-4 flex items-center justify-between border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-300">
                Official Pitch Deck &amp; Community Impact Dossier
              </div>
              <div className="font-serif font-bold text-sm text-white flex items-center gap-2">
                <span>BRICS AgriNet</span>
                <span className="text-emerald-400 text-xs">·</span>
                <span className="text-xs text-stone-300 font-sans font-normal">
                  Slide {currentSlide.slideNumber} of {slides.length}: {currentSlide.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-1 bg-[#091D13] p-1 rounded-xl border border-emerald-900">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-900/50 cursor-pointer"
                title="Previous Slide (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-xs text-emerald-300">
                {currentSlideIndex + 1}/{slides.length}
              </span>
              <button
                onClick={() =>
                  setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))
                }
                disabled={currentSlideIndex === slides.length - 1}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-900/50 cursor-pointer"
                title="Next Slide (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors cursor-pointer"
              title="Close Pitch Deck (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Selector Indicator Ribbon */}
        <div className="bg-[#091D13] px-6 py-2 border-b border-emerald-900/40 flex items-center justify-between overflow-x-auto gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                currentSlideIndex === idx
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-emerald-950/40'
              }`}
            >
              {slide.slideNumber}. {slide.category}
            </button>
          ))}
        </div>

        {/* Main Slide Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-stone-50/40">
          {/* Slide Header & Big Tagline */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
              {currentSlide.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {currentSlide.title}
            </h2>
            <p className="text-base font-serif italic text-emerald-900 font-medium">
              "{currentSlide.tagline}"
            </p>
          </div>

          {/* Key Metric Spotlight + Narrative Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Narrative & Bullets (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                {currentSlide.narrative}
              </p>

              <div className="space-y-3 pt-2">
                {currentSlide.bulletPoints.map((point, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{point.title}</span>
                    </div>
                    <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Community Impact Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800">
                  Community Impact Reality
                </span>
                <p className="font-medium leading-snug">
                  {currentSlide.communityImpactHighlight}
                </p>
              </div>
            </div>

            {/* Right Metric Card (4 cols) */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0F2E1E] to-[#1A4329] text-white text-center shadow-md border border-emerald-800/80 flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-1">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-300">
                  Key Verification Metric
                </div>
                <div className="font-serif text-4xl sm:text-5xl font-extrabold text-amber-400 tracking-tight">
                  {currentSlide.keyMetric.value}
                </div>
                <div className="text-xs text-stone-200 font-medium max-w-[200px] leading-snug">
                  {currentSlide.keyMetric.label}
                </div>
              </div>

              {/* UN SDG & BRICS Declaration Badges */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs space-y-2">
                <div className="font-bold text-stone-900 text-[11px] uppercase tracking-wider">
                  International Policy Alignment
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-medium text-stone-700">
                  <span className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-emerald-900">
                    UN SDG 2: Zero Hunger
                  </span>
                  <span className="bg-sky-50 border border-sky-200 px-2 py-0.5 rounded text-sky-900">
                    UN SDG 13: Climate Action
                  </span>
                  <span className="bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-amber-900">
                    BRICS 2024 Kazan Declaration
                  </span>
                  <span className="bg-stone-100 border border-stone-200 px-2 py-0.5 rounded text-stone-800">
                    FAO Digital Public Good Standard
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Community ROI Simulator for Judges (Slide 4 & Slide 6 feature) */}
          <div className="mt-6 p-6 rounded-3xl bg-white border border-emerald-950/15 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-800" />
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {t('roiSimTitle', selectedLanguage) || 'Interactive Community Impact & ROI Simulator'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {t('roiSimSubtitle', selectedLanguage) || 'Test projected economic and ecological outcomes for a village farming cooperative'}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono text-emerald-900 font-semibold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                {t('lblTotalLand', selectedLanguage) || 'Total Land:'} {totalHectares} {t('lblHectares', selectedLanguage) || 'Hectares'}
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-stone-700">{t('lblSmallholdersInCluster', selectedLanguage) || 'Smallholders in Cluster:'}</span>
                  <span className="font-mono font-bold text-stone-900">{cooperativeSize} {t('lblFarmers', selectedLanguage) || 'Farmers'}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={cooperativeSize}
                  onChange={(e) => setCooperativeSize(parseInt(e.target.value))}
                  className="w-full accent-emerald-700 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-stone-700">{t('lblAvgLandholding', selectedLanguage) || 'Average Landholding:'}</span>
                  <span className="font-mono font-bold text-stone-900">{avgFarmHectares.toFixed(1)} ha / {t('lblFarmer', selectedLanguage) || 'farmer'}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={avgFarmHectares}
                  onChange={(e) => setAvgFarmHectares(parseFloat(e.target.value))}
                  className="w-full accent-emerald-700 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Projected Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span>{t('lblChemicalSavings', selectedLanguage) || 'Chemical Input Cost Savings'}</span>
                </div>
                <div className="font-serif font-extrabold text-2xl text-emerald-950">
                  ${fertilizerSavingsUSD.toLocaleString()} / {t('lblYear', selectedLanguage) || 'yr'}
                </div>
                <div className="text-[11px] text-stone-600 mt-1">
                  {t('lblChemicalSavingsDesc', selectedLanguage) || '$92/ha saved by replacing 40% of synthetic urea with bio-inoculants'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80">
                <div className="flex items-center gap-1.5 text-xs text-sky-800 font-medium mb-1">
                  <Droplets className="w-4 h-4 text-sky-700" />
                  <span>{t('lblGroundwaterConserved', selectedLanguage) || 'Groundwater Conserved'}</span>
                </div>
                <div className="font-serif font-extrabold text-2xl text-sky-950">
                  {(waterConservedLiters / 1000000).toFixed(1)}M {t('lblLiters', selectedLanguage) || 'Liters'}
                </div>
                <div className="text-[11px] text-stone-600 mt-1">
                  {t('lblGroundwaterConservedDesc', selectedLanguage) || 'Via straw residue mulching & micro-irrigation scheduling'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80">
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium mb-1">
                  <Leaf className="w-4 h-4 text-amber-700" />
                  <span>{t('lblCarbonInsetting', selectedLanguage) || 'Topsoil Carbon Insetting'}</span>
                </div>
                <div className="font-serif font-extrabold text-2xl text-amber-950">
                  {carbonSequesteredTonnes} t CO₂e
                </div>
                <div className="text-[11px] text-stone-600 mt-1">
                  {t('lblCarbonInsettingDesc', selectedLanguage) || 'Verified organic carbon sequestered directly into farm topsoil'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slide Footer with Stepper Controls */}
        <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="font-bold text-stone-900">AgriN Digital Public Good:</span>
            <span>Zero proprietary lock-in. Powered by Gemini 3.8 Flash.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
            >
              {t('btnPrevSlide', selectedLanguage) || 'Previous Slide'}
            </button>

            <button
              onClick={() => {
                if (currentSlideIndex < slides.length - 1) {
                  setCurrentSlideIndex((prev) => prev + 1);
                } else {
                  onClose();
                }
              }}
              className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {currentSlideIndex < slides.length - 1 ? (t('btnNextSlide', selectedLanguage) || 'Next Slide') : (t('btnReturnToApp', selectedLanguage) || 'Return to App')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
