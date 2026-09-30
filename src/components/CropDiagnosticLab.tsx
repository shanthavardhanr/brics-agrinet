import React, { useState, useRef, useEffect } from 'react';
import { CropDiagnosisResult } from '../types/agriculture';
import { SampleDiseaseCase } from '../data/sampleDiseases';
import {
  BricsLanguage,
  t,
  getLocalizedSampleDiseases,
  localizeDiagnosisToLanguage,
  translateSeverity,
  translatePathogenType,
} from '../utils/translations';
import { saveCachedDiagnosis, getCachedDiagnoses } from '../utils/offlineStorage';
import {
  Camera,
  UploadCloud,
  Layers,
  ShieldAlert,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Leaf,
  Bug,
  Globe2,
  ArrowRight,
  Info,
  Mic,
  MicOff,
  Radio,
  Trash2,
} from 'lucide-react';

interface CropDiagnosticLabProps {
  selectedLanguage: BricsLanguage;
}

export const CropDiagnosticLab: React.FC<CropDiagnosticLabProps> = ({ selectedLanguage }) => {
  const sampleList = getLocalizedSampleDiseases(selectedLanguage);
  const initialSample = sampleList[0];

  const [selectedCrop, setSelectedCrop] = useState<string>(initialSample.crop);
  const [symptomsInput, setSymptomsInput] = useState<string>(initialSample.symptomsText);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string>(initialSample.id);

  const [diagnosis, setDiagnosis] = useState<CropDiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isOfflineDiagnosis, setIsOfflineDiagnosis] = useState<boolean>(false);

  // Sync inputs and diagnosis when selected language changes
  useEffect(() => {
    const localizedSamples = getLocalizedSampleDiseases(selectedLanguage);
    const activeSample = localizedSamples.find((s) => s.id === activeSampleId) || localizedSamples[0];
    if (activeSample && !imagePreview) {
      setSelectedCrop(activeSample.crop);
      setSymptomsInput(activeSample.symptomsText);
    }
    if (diagnosis) {
      setDiagnosis(localizeDiagnosisToLanguage(diagnosis, selectedLanguage));
    }
  }, [selectedLanguage]);

  // Voice-to-Text State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Sample selection
  const handleSelectSample = (sample: SampleDiseaseCase) => {
    setActiveSampleId(sample.id);
    setSelectedCrop(sample.crop);
    setSymptomsInput(sample.symptomsText);
    setImagePreview(null);
    setIsOfflineDiagnosis(false);
    handleRunDiagnosis(null, sample.crop, sample.symptomsText);
  };

  // Handle Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setActiveSampleId('');
        handleRunDiagnosis(base64, selectedCrop, symptomsInput);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const getSpeechLangCode = (lang: BricsLanguage): string => {
    switch (lang) {
      case 'te': return 'te-IN'; // Telugu
      case 'hi': return 'hi-IN'; // Hindi
      case 'pt': return 'pt-BR'; // Portuguese
      case 'ru': return 'ru-RU'; // Russian
      case 'zh': return 'zh-CN'; // Mandarin Chinese
      case 'ar': return 'ar-SA'; // Arabic
      case 'sw': return 'sw-KE'; // Swahili
      default: return 'en-IN'; // English
    }
  };

  // Voice-to-Text Input via Web Speech Recognition
  const toggleVoiceInput = () => {
    if (isListening && recognitionInstance) {
      recognitionInstance.stop();
      setIsListening(false);
      setVoiceNotice(null);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t('micUnsupported', selectedLanguage));
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getSpeechLangCode(selectedLanguage);

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice(t('micListening', selectedLanguage));
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript.trim()) {
          setSymptomsInput((prev) => {
            // Replace sample text if still unmodified, else append
            if (prev.includes('Parallel rows of bright yellow-orange') || !prev.trim()) {
              return finalTranscript.trim();
            }
            return prev + ' ' + finalTranscript.trim();
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          alert(t('micPermissionDenied', selectedLanguage));
        }
        setIsListening(false);
        setVoiceNotice(null);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceNotice(null);
      };

      recognition.start();
      setRecognitionInstance(recognition);
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setVoiceNotice(null);
    }
  };

  // Clean up recognition instance on unmount
  useEffect(() => {
    return () => {
      if (recognitionInstance) {
        try {
          recognitionInstance.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [recognitionInstance]);

  // Run Diagnosis via POST /api/diagnose
  const handleRunDiagnosis = async (
    customImageBase64: string | null = imagePreview,
    crop: string = selectedCrop,
    symptoms: string = symptomsInput
  ) => {
    setIsLoading(true);
    setErrorMsg(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: customImageBase64,
          cropType: crop,
          symptomsDescription: symptoms,
          language: getLanguagePromptName(selectedLanguage),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data: CropDiagnosisResult = await response.json();
      setDiagnosis(data);
      setIsOfflineDiagnosis(false);
      // Cache this diagnosis to local device storage
      saveCachedDiagnosis(data);
    } catch (err: any) {
      console.warn('Network offline, searching local pathology cache:', err);
      // Check cached diagnoses
      const cachedList = getCachedDiagnoses();
      const match = cachedList.find((d) => 
        d.cropIdentified.toLowerCase().includes(crop.toLowerCase().split(' ')[0]) ||
        d.conditionName.toLowerCase().includes(symptoms.toLowerCase().split(' ')[0])
      );

      if (match) {
        setDiagnosis(match);
        setIsOfflineDiagnosis(true);
        setErrorMsg(null);
      } else {
        // Fallback to sample pathology data if matching sample exists
        const sampleMatch = sampleList.find((s: SampleDiseaseCase) => s.crop.toLowerCase().includes(crop.toLowerCase().split(' ')[0]));
        if (sampleMatch) {
          const offlineDiag: CropDiagnosisResult = {
            isPlant: true,
            cropIdentified: sampleMatch.crop,
            conditionName: sampleMatch.commonName,
            scientificName: sampleMatch.scientificName,
            confidenceScore: 88,
            severity: sampleMatch.severity,
            pathogenType: sampleMatch.pathogenType,
            infectionStage: 'Field Symptom Evaluation (Offline Cache)',
            symptomsConfirmed: [sampleMatch.symptomsText],
            biologicalRemedies: [
              {
                treatment: 'Cold-pressed Neem Oil (10,000 ppm) + Mild Bio-soap',
                preparation: 'Dilute 5 ml neem oil with 2 g organic soap in 1 liter lukewarm water',
                applicationRate: 'Spray foliage thoroughly during early morning',
                frequency: 'Every 5-7 days',
              },
              {
                treatment: 'Wood Ash & Slaked Lime Dusting',
                preparation: 'Mix fine wood ash with 10% agricultural lime',
                applicationRate: 'Light dusting over affected canopies',
                frequency: 'After rain or dew dry-off',
              },
            ],
            conventionalEmergencyOption: 'Monitor pest progression; apply targeted biological or IPM controls if canopy defoliation exceeds 20%.',
            preventativeProtocol: [
              'Crop rotation with non-host legume cultivars',
              'Avoid excess chemical nitrogen which softens plant cell walls',
              'Ensure row spacing permits morning wind flow to dry foliage',
            ],
            bricsQuarantineAlert: {
              isTransboundaryAlert: true,
              details: 'Pathology monitored across BRICS transboundary agricultural corridors.',
              partnerNationsAffected: sampleMatch.regionsAffected,
            },
            farmerAudioSummaryText: `Offline mode: ${sampleMatch.commonName} symptoms detected. Apply neem oil or bio-fungicide mist immediately. Avoid late afternoon irrigation.`,
          };
          setDiagnosis(offlineDiag);
          setIsOfflineDiagnosis(true);
          setErrorMsg(null);
          saveCachedDiagnosis(offlineDiag);
        } else {
          setErrorMsg('Device offline. Could not establish network diagnosis or find matching cached pathology.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Voice player for smallholders
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

    if (!diagnosis) return;

    const speechText = diagnosis.farmerAudioSummaryText || `${diagnosis.conditionName} detected on ${diagnosis.cropIdentified}. Severity is ${diagnosis.severity}. Recommended biological remedy: ${diagnosis.biologicalRemedies?.[0]?.treatment || 'organic spray'}.`;
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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              <span>{t('diagCategory', selectedLanguage)}</span>
              <span aria-hidden="true">·</span>
              <span>Gemini 3.8 Flash Multimodal &amp; Voice Input</span>
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight">
              {t('diagTitle', selectedLanguage)}
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              {t('diagSubtitle', selectedLanguage)}
            </p>
          </div>

          <button
            onClick={() => handleRunDiagnosis()}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-medium text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'text-emerald-300'}`} />
            <span>{isLoading ? t('btnAnalyzingPathology', selectedLanguage) : t('btnRunDiagnosis', selectedLanguage)}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Inputs + Pathology Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Symptom Input (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>{t('cardPhotoTitle', selectedLanguage)}</span>
            </h2>

            {/* Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-xl p-4 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-emerald-50/20"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {imagePreview ? (
                <div className="space-y-2">
                  <img
                    src={imagePreview}
                    alt="Uploaded Crop Sample"
                    className="max-h-48 mx-auto rounded-lg object-contain shadow-xs border border-stone-200"
                  />
                  <div className="text-xs text-emerald-800 font-semibold">{t('photoUploaded', selectedLanguage)}</div>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-semibold text-stone-800">
                    {t('uploadPromptTitle', selectedLanguage)}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {t('uploadPromptSub', selectedLanguage)}
                  </div>
                </div>
              )}
            </div>

            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {t('lblCropSpecies', selectedLanguage)}
              </label>
              <input
                type="text"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                placeholder="e.g. Wheat, Rice, Soybean, Maize, Tomato"
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Observed Symptoms with Voice-to-Text Microphone Integration */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-stone-700">
                  {t('lblFarmerSymptoms', selectedLanguage)}
                </label>

                {/* Voice-to-Text Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isListening
                      ? 'bg-red-600 text-white shadow-sm animate-pulse ring-2 ring-red-400'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                  title="Speak crop symptoms via microphone"
                >
                  {isListening ? (
                    <>
                      <Radio className="w-3.5 h-3.5 animate-spin" />
                      <span>{t('micStop', selectedLanguage)}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{t('micStart', selectedLanguage)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Active Voice Listening Banner */}
              {isListening && (
                <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between text-xs text-red-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                    <span className="font-semibold">{voiceNotice || 'Listening in ' + getSpeechLangCode(selectedLanguage) + '...'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-500">Speak clearly</span>
                </div>
              )}

              <div className="relative">
                <textarea
                  rows={4}
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  placeholder={t('symptomsPlaceholder', selectedLanguage)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-3 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 resize-none"
                />

                {symptomsInput && (
                  <button
                    type="button"
                    onClick={() => setSymptomsInput('')}
                    className="absolute right-2 bottom-3 p-1 rounded hover:bg-stone-200 text-stone-400 hover:text-stone-700 text-[10px] flex items-center gap-0.5 cursor-pointer"
                    title="Clear text"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Clear / Reset button */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-stone-500">BRICS AI Lab</span>
              <button
                onClick={() => {
                  setImagePreview(null);
                  setActiveSampleId(sampleList[0].id);
                  handleSelectSample(sampleList[0]);
                }}
                className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('btnResetSample', selectedLanguage)}</span>
              </button>
            </div>
          </div>

          {/* BRICS Pre-Loaded Sample Library */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider">
                {t('testSuiteTitle', selectedLanguage)}
              </h3>
              <span className="text-[10px] text-stone-500">{t('testSuiteSub', selectedLanguage)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {sampleList.map((sample) => {
                const isSelected = activeSampleId === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-600'
                        : 'border-stone-200 bg-stone-50/60 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-800">
                        {translatePathogenType(sample.pathogenType, selectedLanguage)}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: sample.visualColor }}
                        title={`Severity: ${translateSeverity(sample.severity, selectedLanguage)}`}
                      />
                    </div>
                    <div className="font-bold text-xs text-stone-900 truncate">{sample.commonName}</div>
                    <div className="text-[10px] text-stone-500 italic truncate">{sample.crop.split('(')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Results (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {isOfflineDiagnosis && (
            <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-semibold">{t('bannerOfflineDiag', selectedLanguage) || 'Offline Diagnosis Active:'}</span>
                <span>{t('bannerOfflineDiagDesc', selectedLanguage) || 'Retrieved from local device pathology cache. Biological bio-pesticide protocols remain fully accessible.'}</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 mb-4">
              {errorMsg}
            </div>
          )}

          {diagnosis ? (
            <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-sm overflow-hidden space-y-5">
              {/* Diagnosis Header */}
              <div className="p-5 bg-gradient-to-r from-[#0F2E1E] to-[#1A4329] text-white flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono mb-1">
                    <span>{diagnosis.cropIdentified}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t('lblPathogen', selectedLanguage)} {translatePathogenType(diagnosis.pathogenType, selectedLanguage)}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-bold text-emerald-400">{diagnosis.confidenceScore}% {t('lblConfidence', selectedLanguage)}</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span>{diagnosis.conditionName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                      diagnosis.severity === 'Critical' ? 'bg-red-500 text-white' :
                      diagnosis.severity === 'Moderate' ? 'bg-amber-500 text-stone-900' :
                      'bg-emerald-500 text-white'
                    }`}>
                      {translateSeverity(diagnosis.severity, selectedLanguage)}
                    </span>
                  </h2>
                  <div className="text-xs text-emerald-200/90 italic font-serif">
                    {diagnosis.scientificName}
                  </div>
                </div>

                {/* Voice button */}
                <button
                  onClick={toggleSpeech}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-amber-500 hover:bg-amber-600 text-stone-900'
                      : 'bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-700'
                  }`}
                  title="Listen to diagnostic voice readout"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
                  <span>{isSpeaking ? t('btnPauseAudio', selectedLanguage) : t('btnListenAdvisory', selectedLanguage)}</span>
                </button>
              </div>

              {/* Infection Stage & Confirmed Symptoms */}
              <div className="px-5 space-y-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-stone-900">{t('lblInfectionStage', selectedLanguage)}</span>
                    <span className="font-medium text-emerald-800">{diagnosis.infectionStage}</span>
                  </div>
                  <div className="text-stone-600 space-y-1 mt-2">
                    <span className="font-semibold text-stone-800 block text-[11px] uppercase tracking-wider">
                      {t('lblPathologicalSigns', selectedLanguage)}
                    </span>
                    <ul className="space-y-1">
                      {diagnosis.symptomsConfirmed?.map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Biological & Regenerative Remedies */}
              <div className="px-5 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 border-b border-stone-200 pb-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-serif font-bold text-sm">{t('lblBioRemedies', selectedLanguage)}</h3>
                  <span className="text-[10px] text-emerald-800 font-mono bg-emerald-100 px-1.5 py-0.2 rounded ml-auto">
                    {t('lblNonChemicalFirst', selectedLanguage)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {diagnosis.biologicalRemedies?.map((remedy, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs space-y-1">
                      <div className="font-bold text-emerald-950 flex items-center justify-between">
                        <span>{remedy.treatment}</span>
                        <span className="text-[10px] font-mono text-emerald-800">{remedy.frequency}</span>
                      </div>
                      <p className="text-stone-700 leading-snug">{remedy.preparation}</p>
                      <div className="text-[11px] text-emerald-900 font-medium">
                        {t('lblRate', selectedLanguage)} {remedy.applicationRate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conventional IPM & Preventative Practices */}
              <div className="px-5 space-y-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t('lblEmergencyIpm', selectedLanguage)}</span>
                  </div>
                  <p className="text-stone-700">{diagnosis.conventionalEmergencyOption}</p>
                </div>

                <div className="text-xs space-y-1.5">
                  <span className="font-bold text-stone-900 block text-[11px] uppercase tracking-wider">
                    {t('lblLongTermDefense', selectedLanguage)}
                  </span>
                  <ul className="space-y-1 text-stone-700">
                    {diagnosis.preventativeProtocol?.map((proto, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold">•</span>
                        <span>{proto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Transboundary Quarantine Alert */}
              {diagnosis.bricsQuarantineAlert && (
                <div className="mx-5 mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-amber-950">
                      <Globe2 className="w-4 h-4 text-amber-700" />
                      <span>{t('lblQuarantineTitle', selectedLanguage)}</span>
                    </div>
                    {diagnosis.bricsQuarantineAlert.isTransboundaryAlert && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200 text-amber-900">
                        {t('lblActiveAlert', selectedLanguage)}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-700 leading-snug">
                    {diagnosis.bricsQuarantineAlert.details}
                  </p>
                  <div className="text-[11px] text-amber-900 font-medium">
                    {t('lblPartnerNations', selectedLanguage)}{' '}
                    {diagnosis.bricsQuarantineAlert.partnerNationsAffected?.join(', ') || 'BRICS Alliance'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-emerald-950/10 p-12 text-center text-stone-500">
              <Bug className="w-12 h-12 mx-auto text-stone-300 mb-3" />
              <div className="font-serif font-bold text-stone-800 text-lg">
                {t('noDiagnosisTitle', selectedLanguage)}
              </div>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                {t('noDiagnosisSub', selectedLanguage)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
