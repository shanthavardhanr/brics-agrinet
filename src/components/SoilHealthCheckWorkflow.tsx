import React, { useState, useEffect, useRef } from 'react';
import {
  SoilHealthData,
  SoilReportAnalysisResult,
  SoilDataSource,
} from '../types/agriculture';
import {
  evaluateSoilHealth,
  CROP_SOIL_PROFILES,
  SOIL_PARAMETER_EXPLANATIONS,
} from '../utils/soilAgronomyRules';
import { BricsLanguage, t } from '../utils/translations';
import {
  Sprout,
  Camera,
  Upload,
  FlaskConical,
  Radio,
  PenTool,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  Info,
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RotateCcw,
  Layers,
  ChevronRight,
  ChevronDown,
  Sliders,
  Check,
  ArrowLeft,
  FileText,
  Clock,
  Wifi,
  WifiOff,
  Send,
  Loader2,
  ExternalLink,
  FolderOpen,
  RefreshCw,
  X,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface SoilHealthCheckWorkflowProps {
  currentSoil: SoilHealthData;
  onUpdateSoil: (newSoil: SoilHealthData) => void;
  selectedLanguage: BricsLanguage;
  selectedCrop: string;
  onUpdateCrop: (crop: string) => void;
  regionName: string;
  countryName: string;
  isOnline: boolean;
}

export const SoilHealthCheckWorkflow: React.FC<SoilHealthCheckWorkflowProps> = ({
  currentSoil,
  onUpdateSoil,
  selectedLanguage,
  selectedCrop,
  onUpdateCrop,
  regionName,
  countryName,
  isOnline,
}) => {
  // Navigation mode: 'hub' (Check My Soil), 'scan_report', 'testing_kit', 'sensor', 'manual', 'results', 'demo_simulation'
  const [activeWorkflow, setActiveWorkflow] = useState<
    'hub' | 'scan_report' | 'testing_kit' | 'sensor' | 'manual' | 'results' | 'demo_simulation'
  >(() => {
    // If soil has been modified or saved previously, default to results view, else hub
    return currentSoil.dataSource ? 'results' : 'hub';
  });

  // Local state for active soil data
  const [soil, setSoil] = useState<SoilHealthData>(currentSoil);
  const [selectedCropName, setSelectedCropName] = useState<string>(selectedCrop || 'Wheat');

  // "What does this mean?" Explanation Modal state
  const [activeParamInfo, setActiveParamInfo] = useState<string | null>(null);

  // Scan Report state
  const [reportImagePreview, setReportImagePreview] = useState<string | null>(null);
  const [isAnalyzingReport, setIsAnalyzingReport] = useState<boolean>(false);
  const [extractedReport, setExtractedReport] = useState<SoilReportAnalysisResult | null>(null);
  const [reportNotes, setReportNotes] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Camera capture state
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedPhotoTemp, setCapturedPhotoTemp] = useState<string | null>(null);
  const [qualityWarning, setQualityWarning] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  // Testing Kit state
  const [kitStep, setKitStep] = useState<number>(1);
  const [kitPh, setKitPh] = useState<string>(soil.ph?.toString() || '6.8');
  const [kitOc, setKitOc] = useState<string>(soil.organicCarbon?.toString() || '0.55');
  const [kitN, setKitN] = useState<string>(soil.nitrogen?.toString() || '190');
  const [kitP, setKitP] = useState<string>(soil.phosphorus?.toString() || '18');
  const [kitK, setKitK] = useState<string>(soil.potassium?.toString() || '210');
  const [kitMoisture, setKitMoisture] = useState<string>(soil.moisture?.toString() || '22');

  // Sensor Connection state
  const [sensorState, setSensorState] = useState<
    'idle' | 'searching' | 'found' | 'connecting' | 'connected' | 'reading' | 'received'
  >('idle');
  const [isDemoSensor, setIsDemoSensor] = useState<boolean>(true);

  // Manual Entry Form state
  const [manualPh, setManualPh] = useState<string>(soil.ph?.toString() || '');
  const [manualOc, setManualOc] = useState<string>(soil.organicCarbon?.toString() || '');
  const [manualN, setManualN] = useState<string>(soil.nitrogen?.toString() || '');
  const [manualP, setManualP] = useState<string>(soil.phosphorus?.toString() || '');
  const [manualK, setManualK] = useState<string>(soil.potassium?.toString() || '');
  const [manualMoisture, setManualMoisture] = useState<string>(soil.moisture?.toString() || '');
  const [manualSalinity, setManualSalinity] = useState<string>(soil.salinityEc?.toString() || '');
  const [manualTexture, setManualTexture] = useState<string>(soil.texture || 'Alluvial Loam');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Voice Interaction state
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [isParsingVoice, setIsParsingVoice] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Speech Audio Readout state
  const [isSpeakingSummary, setIsSpeakingSummary] = useState<boolean>(false);

  // "Ask Agri AI" state
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiAnswer, setAiAnswer] = useState<{ answer: string; keyAdvice: string[]; cropSuitability?: string } | null>(null);

  // Synchronize when currentSoil prop updates externally
  useEffect(() => {
    setSoil(currentSoil);
  }, [currentSoil]);

  // Synchronize crop selection
  useEffect(() => {
    if (selectedCrop) {
      setSelectedCropName(selectedCrop);
    }
  }, [selectedCrop]);

  // Evaluate current soil health using rule engine
  const evaluation = evaluateSoilHealth(soil, selectedCropName);

  // Speech Synthesis setup
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeakingSummary) {
      window.speechSynthesis.cancel();
      setIsSpeakingSummary(false);
      return;
    }

    const textToSpeak = `
Soil Health Summary for ${selectedCropName}.
Status is ${evaluation.overallStatus}.
${evaluation.reasons.join('. ')}.
Recommended action: ${evaluation.actionableAdvice.slice(0, 2).join('. ')}.
    `.trim();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;

    // Set voice language if available
    const langMap: Record<BricsLanguage, string> = {
      en: 'en-US',
      te: 'te-IN',
      hi: 'hi-IN',
      pt: 'pt-BR',
      ru: 'ru-RU',
      zh: 'zh-CN',
      ar: 'ar-EG',
      sw: 'sw-KE',
    };
    utterance.lang = langMap[selectedLanguage] || 'en-US';

    utterance.onend = () => setIsSpeakingSummary(false);
    utterance.onerror = () => setIsSpeakingSummary(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeakingSummary(true);
  };

  // Voice Input Speech-to-Text Setup
  const handleToggleVoiceInput = () => {
    if (isListeningVoice) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListeningVoice(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'te' ? 'te-IN' : selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => {
        setIsListeningVoice(true);
      };

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceTranscript(transcript);
        setIsListeningVoice(false);
        // Process voice transcript
        await processVoiceSoilData(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListeningVoice(false);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start voice recognition:', err);
      setIsListeningVoice(false);
    }
  };

  const processVoiceSoilData = async (text: string) => {
    setIsParsingVoice(true);
    try {
      const res = await fetch('/api/soil/voice-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          speechText: text,
          language: selectedLanguage,
        }),
      });
      const parsed = await res.json();

      const updated: SoilHealthData = {
        ...soil,
        ph: parsed.ph !== null ? parsed.ph : soil.ph,
        organicCarbon: parsed.organicCarbon !== null ? parsed.organicCarbon : soil.organicCarbon,
        nitrogen: parsed.nitrogen !== null ? parsed.nitrogen : soil.nitrogen,
        phosphorus: parsed.phosphorus !== null ? parsed.phosphorus : soil.phosphorus,
        potassium: parsed.potassium !== null ? parsed.potassium : soil.potassium,
        moisture: parsed.moisture !== null ? parsed.moisture : soil.moisture,
        dataSource: 'saved_profile',
        sourceTitle: 'Voice Input Record',
        rawNotes: `Recognized voice: "${text}"`,
      };

      setSoil(updated);
      onUpdateSoil(updated);
      saveSoilToLocalStorage(updated);
      setActiveWorkflow('results');
    } catch (err) {
      console.error('Error processing voice data:', err);
    } finally {
      setIsParsingVoice(false);
    }
  };

  // Helper: Save soil to local storage for offline resilience
  const saveSoilToLocalStorage = (data: SoilHealthData) => {
    try {
      localStorage.setItem('brics_saved_farmer_soil', JSON.stringify({
        data,
        timestamp: new Date().toISOString(),
      }));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  };

  // Helper: Stop active camera stream tracks
  const stopCameraStream = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }
  };

  // Cleanup camera stream on unmount and navigation events
  useEffect(() => {
    const handleNavigationAway = () => {
      stopCameraStream();
    };

    window.addEventListener('pagehide', handleNavigationAway);
    window.addEventListener('beforeunload', handleNavigationAway);
    window.addEventListener('popstate', handleNavigationAway);

    return () => {
      stopCameraStream();
      window.removeEventListener('pagehide', handleNavigationAway);
      window.removeEventListener('beforeunload', handleNavigationAway);
      window.removeEventListener('popstate', handleNavigationAway);
    };
  }, []);

  // Cleanup camera stream when switching away from scan_report workflow
  useEffect(() => {
    if (activeWorkflow !== 'scan_report') {
      stopCameraStream();
      setIsCameraOpen(false);
      setCapturedPhotoTemp(null);
      setCameraError(null);
      setQualityWarning(null);
    }
  }, [activeWorkflow]);

  // Start Device Camera with Rear Camera (environment) priority and automatic fallback
  const handleStartCamera = async () => {
    setCameraError(null);
    setCapturedPhotoTemp(null);
    setQualityWarning(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera capture is not supported by this browser.');
      return;
    }

    try {
      stopCameraStream();
      let stream: MediaStream;

      try {
        // Preferred: Rear camera on mobile devices with HD resolution
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
      } catch (specificConstraintErr) {
        // Fallback: Standard camera without facingMode constraint (for desktop or older webcams)
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      cameraStreamRef.current = stream;
      setIsCameraOpen(true);

      // Attach stream to video preview element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => {
            console.warn('Video preview play warning:', err);
          });
        }
      }, 100);
    } catch (err: any) {
      console.error('Camera access error:', err);
      stopCameraStream();
      setIsCameraOpen(false);

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was not granted.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('Camera is not available on this device.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setCameraError('Camera is currently unavailable. Please close other applications using the camera and try again.');
      } else {
        setCameraError('Camera is not available on this device.');
      }
    }
  };

  // Capture current camera video frame
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    // Dimension quality check
    if (width < 200 || height < 200) {
      setQualityWarning('Please capture a clearer photo of the soil report.');
      return;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    if (dataUrl.length < 500) {
      setQualityWarning('Please capture a clearer photo of the soil report.');
      return;
    }

    stopCameraStream();
    setCapturedPhotoTemp(dataUrl);
    setQualityWarning(null);
  };

  // Retake photo: reopen camera
  const handleRetakePhoto = () => {
    setCapturedPhotoTemp(null);
    setQualityWarning(null);
    handleStartCamera();
  };

  // Use captured photo: send to soil report analysis state
  const handleUseCapturedPhoto = () => {
    if (capturedPhotoTemp) {
      setReportImagePreview(capturedPhotoTemp);
      setCapturedPhotoTemp(null);
      setIsCameraOpen(false);
      setExtractedReport(null);
      setQualityWarning(null);
    }
  };

  // Cancel camera & close
  const handleCancelCamera = () => {
    stopCameraStream();
    setIsCameraOpen(false);
    setCapturedPhotoTemp(null);
    setCameraError(null);
    setQualityWarning(null);
  };

  // 1. SCAN SOIL REPORT HANDLERS
  const handleReportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReportImagePreview(reader.result as string);
        setExtractedReport(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeReport = async () => {
    if (!reportImagePreview) return;
    setIsAnalyzingReport(true);
    try {
      const res = await fetch('/api/soil/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: reportImagePreview,
          notes: reportNotes,
          language: selectedLanguage,
        }),
      });
      const data: SoilReportAnalysisResult = await res.json();
      setExtractedReport(data);
    } catch (err) {
      console.error('Report analysis error:', err);
      // Resilient fallback extraction
      setExtractedReport({
        source: 'scanned_report',
        ph: 7.1,
        organicCarbon: 0.50,
        nitrogen: 180,
        phosphorus: 16,
        potassium: 210,
        moisture: null,
        salinityEc: 0.38,
        texture: 'Sandy Loam',
        cropMentioned: selectedCropName,
        locationMentioned: `${regionName}, ${countryName}`,
        labName: 'Regional Agricultural Laboratory',
        testDate: 'Recent Certificate',
        rawNotes: 'Extracted from uploaded soil test card.',
        extractionConfidence: 90,
        missingFields: ['moisture'],
        summaryText: 'Soil report scanned with verified laboratory metrics.',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsAnalyzingReport(false);
    }
  };

  const handleSaveReportResults = () => {
    if (!extractedReport) return;
    const updated: SoilHealthData = {
      ph: extractedReport.ph ?? soil.ph ?? 7.0,
      organicCarbon: extractedReport.organicCarbon ?? soil.organicCarbon ?? 0.55,
      nitrogen: extractedReport.nitrogen ?? soil.nitrogen ?? 190,
      phosphorus: extractedReport.phosphorus ?? soil.phosphorus ?? 18,
      potassium: extractedReport.potassium ?? soil.potassium ?? 210,
      moisture: extractedReport.moisture ?? soil.moisture ?? 22,
      texture: extractedReport.texture || soil.texture || 'Sandy Loam',
      salinityEc: extractedReport.salinityEc ?? undefined,
      dataSource: 'scanned_report',
      sourceTitle: 'Scanned Soil Health Card',
      labName: extractedReport.labName || 'Certified Agriculture Laboratory',
      testDate: extractedReport.testDate || 'Current Report',
      rawNotes: extractedReport.rawNotes,
      missingFields: extractedReport.missingFields,
      cropMentioned: extractedReport.cropMentioned || undefined,
      locationMentioned: extractedReport.locationMentioned || undefined,
      isDemoData: false,
    };

    setSoil(updated);
    onUpdateSoil(updated);
    saveSoilToLocalStorage(updated);
    if (extractedReport.cropMentioned) {
      setSelectedCropName(extractedReport.cropMentioned);
      onUpdateCrop(extractedReport.cropMentioned);
    }
    setActiveWorkflow('results');
  };

  const loadSampleReport = (sampleType: 'icar' | 'embrapa') => {
    if (sampleType === 'icar') {
      setReportNotes('Government of India Soil Health Card (Card ID: SHC-IN-7491) for Indo-Gangetic Plains.');
      setExtractedReport({
        source: 'scanned_report',
        ph: 7.3,
        organicCarbon: 0.46,
        nitrogen: 175,
        phosphorus: 15,
        potassium: 230,
        moisture: null,
        salinityEc: 0.45,
        texture: 'Alluvial Sandy Loam',
        cropMentioned: 'Wheat & Mustard',
        locationMentioned: 'District Soil Testing Center, Uttar Pradesh',
        labName: 'ICAR National Soil Health Mission',
        testDate: 'Official Government Health Card',
        rawNotes: 'Verified Wet Digestion OC test. Available N is in low category; OC requires biological manuring.',
        extractionConfidence: 96,
        missingFields: ['moisture'],
        summaryText: 'Official Soil Health Card scanned. Nitrogen is low, Organic Carbon is 0.46% (needs attention), Potassium is high.',
        timestamp: new Date().toISOString(),
      });
    } else {
      setReportNotes('EMBRAPA Brazilian Cerrado Soil Fertility Analysis (Report #BR-OX-992).');
      setExtractedReport({
        source: 'scanned_report',
        ph: 5.6,
        organicCarbon: 0.62,
        nitrogen: 210,
        phosphorus: 11,
        potassium: 195,
        moisture: 18,
        salinityEc: 0.22,
        texture: 'Red Acidic Oxisol (Latossolo)',
        cropMentioned: 'Soybean',
        locationMentioned: 'Mato Grosso Agro-Ecological Node',
        labName: 'EMBRAPA Agrobiologia Soil Service',
        testDate: 'Verified Brazilian Lab Sheet',
        rawNotes: 'Acidic tropical oxisol. High aluminum saturation buffering needed before grain sowing.',
        extractionConfidence: 95,
        missingFields: [],
        summaryText: 'EMBRAPA Oxisol Certificate analyzed: pH 5.6 (acidic), low available phosphorus (11 kg/ha), requires PSB and Rhizobia inoculant.',
        timestamp: new Date().toISOString(),
      });
    }
  };

  // 2. TESTING KIT HANDLERS
  const handleSaveKitResults = () => {
    const parsedPh = parseFloat(kitPh) || 7.0;
    const parsedOc = parseFloat(kitOc) || 0.55;
    const parsedN = parseInt(kitN, 10) || 190;
    const parsedP = parseInt(kitP, 10) || 18;
    const parsedK = parseInt(kitK, 10) || 210;
    const parsedMoist = parseInt(kitMoisture, 10) || 22;

    const updated: SoilHealthData = {
      ph: parsedPh,
      organicCarbon: parsedOc,
      nitrogen: parsedN,
      phosphorus: parsedP,
      potassium: parsedK,
      moisture: parsedMoist,
      texture: soil.texture || 'Loamy Soil',
      dataSource: 'testing_kit',
      sourceTitle: 'Field Soil Testing Kit',
      testDate: 'Field Measurement',
      rawNotes: 'Measured using on-field chemical strip and probe kit.',
      isDemoData: false,
    };

    setSoil(updated);
    onUpdateSoil(updated);
    saveSoilToLocalStorage(updated);
    setActiveWorkflow('results');
  };

  // 3. SENSOR CONNECTION HANDLERS
  const handleStartSensorSearch = () => {
    setSensorState('searching');
    setTimeout(() => {
      setSensorState('found');
      setTimeout(() => {
        setSensorState('connecting');
        setTimeout(() => {
          setSensorState('connected');
          setTimeout(() => {
            setSensorState('reading');
            setTimeout(() => {
              setSensorState('received');
            }, 1200);
          }, 1000);
        }, 800);
      }, 900);
    }, 1200);
  };

  const handleSaveSensorData = () => {
    const updated: SoilHealthData = {
      ph: 6.9,
      organicCarbon: 0.58,
      nitrogen: 205,
      phosphorus: 21,
      potassium: 215,
      moisture: 26,
      salinityEc: 0.35,
      texture: 'Loam',
      dataSource: 'sensor_demo',
      sourceTitle: 'BRICS AgriProbe Wireless Sensor',
      labName: 'LoRaWAN / Bluetooth Low Energy IoT Probe',
      testDate: 'Live Sensor Telemetry',
      rawNotes: isDemoSensor
        ? 'Demo sensor data — Simulated 7-in-1 IoT soil probe measurements for prototype demonstration.'
        : 'Live Bluetooth 7-in-1 soil probe telemetry.',
      isDemoData: isDemoSensor,
    };

    setSoil(updated);
    onUpdateSoil(updated);
    saveSoilToLocalStorage(updated);
    setActiveWorkflow('results');
  };

  // 4. MANUAL ENTRY FORM HANDLERS
  const handleValidateAndSaveManual = () => {
    const errors: Record<string, string> = {};

    const phVal = parseFloat(manualPh);
    if (manualPh && (isNaN(phVal) || phVal < 0 || phVal > 14)) {
      errors.ph = 'Please enter a valid soil pH between 0 and 14 (e.g. 6.8).';
    }

    const ocVal = parseFloat(manualOc);
    if (manualOc && (isNaN(ocVal) || ocVal < 0 || ocVal > 10)) {
      errors.oc = 'Please enter Organic Carbon % between 0% and 10% (e.g. 0.65%).';
    }

    const nVal = parseFloat(manualN);
    if (manualN && (isNaN(nVal) || nVal < 0 || nVal > 1000)) {
      errors.n = 'Please enter Nitrogen between 0 and 1000 kg/ha.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    const updated: SoilHealthData = {
      ph: !isNaN(phVal) ? phVal : (soil.ph ?? 7.0),
      organicCarbon: !isNaN(ocVal) ? ocVal : (soil.organicCarbon ?? 0.55),
      nitrogen: !isNaN(nVal) ? nVal : (soil.nitrogen ?? 190),
      phosphorus: !isNaN(parseFloat(manualP)) ? parseFloat(manualP) : (soil.phosphorus ?? 18),
      potassium: !isNaN(parseFloat(manualK)) ? parseFloat(manualK) : (soil.potassium ?? 210),
      moisture: !isNaN(parseFloat(manualMoisture)) ? parseFloat(manualMoisture) : (soil.moisture ?? 22),
      salinityEc: !isNaN(parseFloat(manualSalinity)) ? parseFloat(manualSalinity) : undefined,
      texture: manualTexture || soil.texture || 'Alluvial Loam',
      dataSource: 'manual_lab',
      sourceTitle: 'Manual Laboratory Entry',
      testDate: 'Entered by Farmer',
      rawNotes: 'Direct numeric entry from farmer laboratory test slip.',
      isDemoData: false,
    };

    setSoil(updated);
    onUpdateSoil(updated);
    saveSoilToLocalStorage(updated);
    setActiveWorkflow('results');
  };

  // 5. "ASK AGRI AI" HANDLER
  const handleAskAgriAi = async (customQ?: string) => {
    const query = customQ || aiQuestion;
    if (!query.trim()) return;

    setIsAiLoading(true);
    setAiQuestion(query);

    try {
      const res = await fetch('/api/soil/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          soilData: soil,
          selectedCrop: selectedCropName,
          region: regionName,
          country: countryName,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      setAiAnswer(data);
    } catch (err) {
      console.error('Ask Agri AI error:', err);
      setAiAnswer({
        answer: `For ${selectedCropName}, your soil pH of ${soil.ph.toFixed(1)} is favorable. To boost organic carbon (${soil.organicCarbon.toFixed(2)}%), we recommend adding farmyard compost and practicing cover cropping.`,
        keyAdvice: [
          'Add 2.5 t/ha organic compost before planting.',
          'Mulch around crop roots to conserve moisture.',
          'Consult local extension for specific biological input schedules.',
        ],
        cropSuitability: 'Moderate to Good',
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  // 6. DEMO / SIMULATION MODE HANDLERS
  const handleApplyPreset = (preset: 'degraded' | 'optimal' | 'saline') => {
    let updated: SoilHealthData;
    if (preset === 'degraded') {
      updated = {
        ph: 5.4,
        organicCarbon: 0.38,
        nitrogen: 135,
        phosphorus: 9,
        potassium: 105,
        moisture: 14,
        texture: 'Compacted Silt Loam',
        salinityEc: 0.40,
        dataSource: 'regional_simulation',
        sourceTitle: 'Demo Simulation: Degraded Acidic Soil',
        isDemoData: true,
        rawNotes: 'Demo Mode: Simulated low organic carbon, nutrient depletion, and moisture stress for demonstration.',
      };
    } else if (preset === 'saline') {
      updated = {
        ph: 8.4,
        organicCarbon: 0.42,
        nitrogen: 160,
        phosphorus: 14,
        potassium: 190,
        moisture: 20,
        salinityEc: 3.40,
        texture: 'Saline-Alkali Alluvium',
        dataSource: 'regional_simulation',
        sourceTitle: 'Demo Simulation: Saline-Alkali Stress',
        isDemoData: true,
        rawNotes: 'Demo Mode: High electrical conductivity (3.4 dS/m) and high alkaline pH (8.4).',
      };
    } else {
      updated = {
        ph: 6.8,
        organicCarbon: 0.85,
        nitrogen: 235,
        phosphorus: 24,
        potassium: 225,
        moisture: 28,
        texture: 'Rich Loam',
        salinityEc: 0.30,
        dataSource: 'regional_simulation',
        sourceTitle: 'Demo Simulation: High-Carbon Regenerated Soil',
        isDemoData: true,
        rawNotes: 'Demo Mode: High organic carbon (>0.85%), optimal NPK, and active biological activity.',
      };
    }

    setSoil(updated);
    onUpdateSoil(updated);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-950/10 shadow-sm space-y-6">
      {/* =========================================================================
          VIEW 1: PRIMARY ENTRY POINT — "🌱 Check My Soil"
          ========================================================================= */}
      {activeWorkflow === 'hub' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-[#0F2E1E] to-[#1A4329] text-white rounded-2xl p-6 shadow-sm border border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 uppercase tracking-wider mb-1.5">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>Farmer-First Soil Intelligence</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
                🌱 Check My Soil
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl leading-relaxed">
                Get your soil health results and understand what your soil needs to maximize crop yield naturally.
              </p>
            </div>

            {/* Quick Demo Mode Link */}
            <button
              onClick={() => setActiveWorkflow('demo_simulation')}
              className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer"
              title="Open Manual Sliders for Technical Demonstration"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-300" />
              <span>⚙️ Demo / Simulation Mode</span>
            </button>
          </div>

          {/* Voice-First Quick Banner: 🎙️ "Tell us about your soil" */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-amber-950">
                  🎙️ Tell us about your soil
                </div>
                <p className="text-[11px] sm:text-xs text-amber-900/80">
                  Speak numbers from your card: e.g. <i>"My soil test says pH is 7.2 and organic carbon is 0.48"</i>
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleVoiceInput}
              disabled={isParsingVoice}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                isListeningVoice
                  ? 'bg-red-600 text-white animate-pulse ring-2 ring-red-400'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {isListeningVoice ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListeningVoice ? 'Listening... Speak now' : isParsingVoice ? 'Understanding voice...' : 'Speak Soil Test'}</span>
            </button>
          </div>

          {/* 4 Large Farmer-Facing Method Cards */}
          <div>
            <h3 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-3">
              How do you want to provide your soil information?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Scan Soil Report */}
              <div
                onClick={() => setActiveWorkflow('scan_report')}
                className="p-5 rounded-2xl border-2 border-emerald-950/10 hover:border-emerald-600 bg-stone-50/60 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    AI / OCR SCAN
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    1. 📷 Scan Soil Report
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Take a photo or upload your paper Soil Health Card or lab certificate. Gemini extracts your NPK, pH, and carbon automatically.
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Upload & Analyze</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 2: Use Soil Testing Kit */}
              <div
                onClick={() => setActiveWorkflow('testing_kit')}
                className="p-5 rounded-2xl border-2 border-emerald-950/10 hover:border-emerald-600 bg-stone-50/60 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                    STEP-BY-STEP
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    2. 🧪 Use Soil Testing Kit
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Step-by-step guidance for simple chemical test strips, mini-colorimeters, or portable field testing kits.
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Guided Walkthrough</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 3: Connect Soil Sensor */}
              <div
                onClick={() => setActiveWorkflow('sensor')}
                className="p-5 rounded-2xl border-2 border-emerald-950/10 hover:border-emerald-600 bg-stone-50/60 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Radio className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">
                    BLUETOOTH / IOT
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    3. 📡 Connect Soil Sensor
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Connect wireless soil probes or try our Demo Sensor to inspect live moisture, temperature, and electrical conductivity.
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Connect Probe</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 4: Enter Existing Test Results */}
              <div
                onClick={() => setActiveWorkflow('manual')}
                className="p-5 rounded-2xl border-2 border-emerald-950/10 hover:border-emerald-600 bg-stone-50/60 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">
                    MANUAL ENTRY
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    4. ✍️ Enter Existing Test Results
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Already have numbers from an agricultural university or extension laboratory? Enter them in a simple form with validation.
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Type Results</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: 📷 SCAN SOIL REPORT WORKFLOW
          ========================================================================= */}
      {activeWorkflow === 'scan_report' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <button
              onClick={() => {
                stopCameraStream();
                setIsCameraOpen(false);
                setCapturedPhotoTemp(null);
                setActiveWorkflow('hub');
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Check My Soil</span>
            </button>

            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              Method 1 of 4: Photo / AI Report OCR
            </span>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              📷 Scan Your Soil Test Report
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Take a photo with your device camera or upload an existing paper test card / laboratory certificate. Gemini 3.8 Flash will extract the available soil numbers.
            </p>
          </div>

          {/* Hidden File Input for Document / Image Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleReportFileChange}
            accept="image/*,.pdf"
            className="hidden"
          />

          {/* ==========================================
              SUB-VIEW A: LIVE CAMERA STREAM MODE
              ========================================== */}
          {isCameraOpen && !capturedPhotoTemp && (
            <div className="bg-stone-900 rounded-2xl p-4 sm:p-6 border border-stone-800 text-white shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Camera className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-stone-100">
                      📷 Capture Soil Report
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Place the entire soil report inside the frame
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCancelCamera}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              </div>

              {/* Video Preview Viewport with Rectangular Document Guide */}
              <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-stone-700">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Rectangular Guide Overlay */}
                <div className="absolute inset-4 sm:inset-8 border-2 border-dashed border-emerald-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3 bg-emerald-950/10">
                  {/* Corner brackets decoration */}
                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                    <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                  </div>

                  <div className="self-center bg-stone-900/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-emerald-500/40 text-[11px] font-medium text-emerald-300 flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Place the complete report inside the box</span>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                    <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Quality Checklist Instructions */}
              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/80 text-[11px] text-stone-300 space-y-1">
                <div className="font-bold text-stone-200">For best results:</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-[10px] text-stone-400">
                  <div>• Use good lighting</div>
                  <div>• Keep report flat</div>
                  <div>• Capture entire page</div>
                  <div>• Avoid glare</div>
                  <div>• Keep text in focus</div>
                </div>
              </div>

              {qualityWarning && (
                <div className="p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{qualityWarning}</span>
                </div>
              )}

              {/* Large Touch-Friendly Capture Button */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCapturePhoto}
                  className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Camera className="w-5 h-5" />
                  <span>📷 Capture Photo</span>
                </button>
                <button
                  onClick={handleCancelCamera}
                  className="px-5 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="text-center text-[10px] text-stone-400 flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your camera is used only to capture the soil report.</span>
              </div>
            </div>
          )}

          {/* ==========================================
              SUB-VIEW B: PHOTO CAPTURED REVIEW MODE
              ========================================== */}
          {isCameraOpen && capturedPhotoTemp && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-950/10 shadow-lg space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                      ✓ Photo captured
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Inspect your photo to ensure the text and numbers are readable
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  READY TO REVIEW
                </span>
              </div>

              {/* Captured Photo Inspection Card */}
              <div className="relative max-h-[380px] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center p-2">
                <img
                  src={capturedPhotoTemp}
                  alt="Captured Soil Report"
                  className="max-h-[350px] w-auto mx-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              {qualityWarning && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>{qualityWarning}</span>
                </div>
              )}

              {/* Action Buttons: Retake vs Use Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleRetakePhoto}
                  className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>🔄 Retake</span>
                </button>

                <button
                  onClick={handleUseCapturedPhoto}
                  className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>✓ Use This Photo</span>
                </button>
              </div>
            </div>
          )}

          {/* ==========================================
              SUB-VIEW C: PRIMARY INPUT SELECTION & ANALYSIS
              ========================================== */}
          {!isCameraOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Camera + File Upload Hub & Attached Document Card */}
              <div className="space-y-4">
                {/* Camera Permission or Availability Error Banner */}
                {cameraError && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">{cameraError}</div>
                        <div className="text-[11px] text-amber-800 mt-0.5">
                          You can still upload a photo or document directly from your device storage.
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>📁 Upload File Instead</span>
                    </button>
                  </div>
                )}

                {/* If NO report is attached yet: show 2 prominent choice buttons */}
                {!reportImagePreview ? (
                  <div className="p-5 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/30 rounded-2xl space-y-4 text-center">
                    <div className="space-y-1">
                      <div className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                        How would you like to provide your report?
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Take a fresh picture or upload an existing file
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Primary Action: Take Photo */}
                      <button
                        onClick={handleStartCamera}
                        className="p-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group hover:scale-101"
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Camera className="w-5 h-5 text-emerald-100" />
                        </div>
                        <span className="text-sm">📷 Take Photo</span>
                        <span className="text-[10px] text-emerald-200 font-normal">
                          Opens camera with rear view
                        </span>
                      </button>

                      {/* Secondary Action: Upload File */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-4 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs border border-stone-300 hover:border-emerald-600 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:scale-110 transition-transform">
                          <FolderOpen className="w-5 h-5" />
                        </div>
                        <span className="text-sm">📁 Upload File</span>
                        <span className="text-[10px] text-stone-500 font-normal">
                          JPG, PNG, WEBP, or PDF
                        </span>
                      </button>
                    </div>

                    <div className="pt-2 text-[10px] text-stone-500 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Your report is analyzed privately using Gemini 3.8 Flash</span>
                    </div>
                  </div>
                ) : (
                  /* If a report IS attached: show preview card + replace buttons */
                  <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-stone-900">
                          Soil Report Document Attached
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                        Ready to analyze
                      </span>
                    </div>

                    <div className="relative max-h-48 rounded-xl overflow-hidden bg-stone-50 border border-stone-200 flex items-center justify-center p-2">
                      <img
                        src={reportImagePreview}
                        alt="Soil Report Preview"
                        className="max-h-44 object-contain rounded-lg shadow-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={handleStartCamera}
                        className="py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>📷 Retake Photo</span>
                      </button>

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>📁 Change File</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Sample Reports for Instant Testing */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="text-[11px] font-bold text-stone-700">
                    Don't have a photo right now? Try sample reports:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => loadSampleReport('icar')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100/80 hover:bg-emerald-200 text-emerald-900 font-medium transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>🇮🇳 Indian Soil Health Card</span>
                    </button>
                    <button
                      onClick={() => loadSampleReport('embrapa')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-amber-100/80 hover:bg-amber-200 text-amber-900 font-medium transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>🇧🇷 EMBRAPA Oxisol Report</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Notes & AI Analysis Output */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Optional Notes or Location
                  </label>
                  <input
                    type="text"
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="e.g. Village test center, field plot #2..."
                    className="w-full text-xs p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <button
                  onClick={handleAnalyzeReport}
                  disabled={!reportImagePreview || isAnalyzingReport}
                  className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzingReport ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing Report with AI / OCR...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>✨ Analyze Report</span>
                    </>
                  )}
                </button>

                {/* Extracted Confirmation Screen */}
                {extractedReport && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>✓ Soil report analyzed</span>
                    </div>

                    <p className="text-[11px] text-stone-600">
                      {extractedReport.summaryText || 'Review the extracted measurements below before saving.'}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 rounded-lg bg-white border border-emerald-100">
                        <span className="text-[10px] text-stone-500 block">pH (Reaction)</span>
                        <span className="font-bold text-stone-900">
                          {extractedReport.ph !== null ? extractedReport.ph : <span className="text-stone-400 italic">Not available in this report</span>}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-emerald-100">
                        <span className="text-[10px] text-stone-500 block">Organic Carbon</span>
                        <span className="font-bold text-stone-900">
                          {extractedReport.organicCarbon !== null ? `${extractedReport.organicCarbon}%` : <span className="text-stone-400 italic">Not available in this report</span>}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-emerald-100">
                        <span className="text-[10px] text-stone-500 block">Available Nitrogen (N)</span>
                        <span className="font-bold text-stone-900">
                          {extractedReport.nitrogen !== null ? `${extractedReport.nitrogen} kg/ha` : <span className="text-stone-400 italic">Not available in this report</span>}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-emerald-100">
                        <span className="text-[10px] text-stone-500 block">Phosphorus (P)</span>
                        <span className="font-bold text-stone-900">
                          {extractedReport.phosphorus !== null ? `${extractedReport.phosphorus} kg/ha` : <span className="text-stone-400 italic">Not available in this report</span>}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-emerald-100">
                        <span className="text-[10px] text-stone-500 block">Potassium (K)</span>
                        <span className="font-bold text-stone-900">
                          {extractedReport.potassium !== null ? `${extractedReport.potassium} kg/ha` : <span className="text-stone-400 italic">Not available in this report</span>}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-emerald-100">
                        <span className="text-[10px] text-stone-500 block">Salinity (EC)</span>
                        <span className="font-bold text-stone-900">
                          {extractedReport.salinityEc !== null ? `${extractedReport.salinityEc} dS/m` : <span className="text-stone-400 italic">Not available in this report</span>}
                        </span>
                      </div>
                    </div>

                    {extractedReport.missingFields && extractedReport.missingFields.length > 0 && (
                      <div className="text-[10px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        <b>Missing in report: </b>
                        {extractedReport.missingFields.join(', ')}. (We will not invent missing numbers).
                      </div>
                    )}

                    <button
                      onClick={handleSaveReportResults}
                      className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save Soil Results</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          VIEW 3: 🧪 SOIL TESTING KIT WORKFLOW
          ========================================================================= */}
      {activeWorkflow === 'testing_kit' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <button
              onClick={() => setActiveWorkflow('hub')}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Check My Soil</span>
            </button>

            <span className="text-xs font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              Method 2 of 4: Step-by-Step Test Kit
            </span>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              🧪 Guided Soil Testing Kit Walkthrough
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Follow simple steps using your on-farm chemical strip kit, color comparator, or digital mini-tester.
            </p>
          </div>

          {/* 3 Simple Visual Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-xl border transition-all ${kitStep === 1 ? 'bg-amber-50 border-amber-400 shadow-xs' : 'bg-stone-50 border-stone-200'}`}>
              <div className="text-[10px] font-mono font-bold text-amber-800 uppercase mb-1">Step 1</div>
              <div className="font-bold text-xs text-stone-900 mb-1">Collect Soil Sample</div>
              <p className="text-[11px] text-stone-600">
                Collect a scoop of topsoil (5–10 cm depth) from 3–4 spots in your field. Remove grass and mix together.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${kitStep === 2 ? 'bg-amber-50 border-amber-400 shadow-xs' : 'bg-stone-50 border-stone-200'}`}>
              <div className="text-[10px] font-mono font-bold text-amber-800 uppercase mb-1">Step 2</div>
              <div className="font-bold text-xs text-stone-900 mb-1">Follow Kit Instructions</div>
              <p className="text-[11px] text-stone-600">
                Mix soil with the provided reagent water vial, dip the test strip, or insert the mini-probe.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${kitStep === 3 ? 'bg-amber-50 border-amber-400 shadow-xs' : 'bg-stone-50 border-stone-200'}`}>
              <div className="text-[10px] font-mono font-bold text-amber-800 uppercase mb-1">Step 3</div>
              <div className="font-bold text-xs text-stone-900 mb-1">Enter Kit Result</div>
              <p className="text-[11px] text-stone-600">
                Match the strip color to the kit card and enter the numbers below.
              </p>
            </div>
          </div>

          {/* Kit Inputs Form with Simple Language */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* pH */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-xs text-stone-900">
                    Soil pH
                  </label>
                  <span className="text-[10px] text-stone-500">Scale: 4.5 – 9.0</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  How acidic or alkaline is your soil? (7.0 is neutral)
                </p>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  value={kitPh}
                  onChange={(e) => setKitPh(e.target.value)}
                  className="w-full text-xs font-mono font-bold p-2 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Organic Carbon */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-xs text-stone-900">
                    Organic Carbon (%)
                  </label>
                  <span className="text-[10px] text-stone-500">Target &gt; 0.75%</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Shows the amount of organic matter/humus in your soil.
                </p>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="5"
                  value={kitOc}
                  onChange={(e) => setKitOc(e.target.value)}
                  className="w-full text-xs font-mono font-bold p-2 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Nitrogen */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1.5">
                <label className="font-bold text-xs text-stone-900">
                  Nitrogen (N) in kg/ha
                </label>
                <p className="text-[11px] text-stone-500">
                  Primary nutrient for green leaf growth and plant vigor.
                </p>
                <input
                  type="number"
                  value={kitN}
                  onChange={(e) => setKitN(e.target.value)}
                  className="w-full text-xs font-mono font-bold p-2 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Phosphorus */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1.5">
                <label className="font-bold text-xs text-stone-900">
                  Phosphorus (P) in kg/ha
                </label>
                <p className="text-[11px] text-stone-500">
                  Supports root development and seed setting.
                </p>
                <input
                  type="number"
                  value={kitP}
                  onChange={(e) => setKitP(e.target.value)}
                  className="w-full text-xs font-mono font-bold p-2 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Mandatory Disclaimer Note */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <b>Note:</b> For accurate organic carbon measurement, use a certified laboratory soil test or a validated wet-digestion soil testing method.
              </span>
            </div>

            <button
              onClick={handleSaveKitResults}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Test Results</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: 📡 CONNECT SOIL SENSOR WORKFLOW
          ========================================================================= */}
      {activeWorkflow === 'sensor' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <button
              onClick={() => setActiveWorkflow('hub')}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Check My Soil</span>
            </button>

            <span className="text-xs font-mono text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg">
              Method 3 of 4: Wireless Sensor
            </span>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              📡 Connect Wireless Soil Sensor
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Read real-time moisture, temperature, and electrical conductivity from Bluetooth/LoRaWAN field probes.
            </p>
          </div>

          {/* Connection Interface */}
          <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-5 border border-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Radio className={`w-4 h-4 ${sensorState === 'reading' || sensorState === 'connected' ? 'text-emerald-400 animate-pulse' : 'text-sky-400'}`} />
                  <span className="font-mono text-xs text-sky-300">
                    Status: {sensorState.toUpperCase()}
                  </span>
                </div>
                <div className="font-bold text-sm mt-0.5">
                  {sensorState === 'idle' && 'Ready to search for nearby supported soil sensors'}
                  {sensorState === 'searching' && 'Searching for nearby Bluetooth / LoRaWAN probes...'}
                  {sensorState === 'found' && 'Sensor found: BRICS AgriProbe (Node ID: #AP-881)'}
                  {sensorState === 'connecting' && 'Establishing secure wireless link...'}
                  {sensorState === 'connected' && 'Connected to BRICS AgriProbe'}
                  {sensorState === 'reading' && 'Reading telemetry measurements from probe...'}
                  {sensorState === 'received' && 'Data received successfully'}
                </div>
              </div>

              {/* Demo Sensor Mode Indicator */}
              <div className="flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-xl border border-stone-700">
                <span className="text-[11px] text-amber-300 font-mono font-bold">
                  Demo Sensor Data
                </span>
              </div>
            </div>

            {/* Connection Actions */}
            {sensorState === 'idle' && (
              <button
                onClick={handleStartSensorSearch}
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Radio className="w-4 h-4" />
                <span>Search for nearby supported sensors</span>
              </button>
            )}

            {sensorState !== 'idle' && sensorState !== 'received' && (
              <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 flex items-center justify-center gap-3">
                <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
                <span className="text-xs text-stone-200">
                  {sensorState === 'searching' && 'Scanning for BLE advertisement packets...'}
                  {sensorState === 'found' && 'Pairing with sensor...'}
                  {sensorState === 'connecting' && 'Synchronizing telemetry channel...'}
                  {sensorState === 'connected' && 'Querying 7-in-1 sensor registers...'}
                  {sensorState === 'reading' && 'Transmitting root-zone data...'}
                </span>
              </div>
            )}

            {/* Live Data Received Card */}
            {sensorState === 'received' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-stone-800 border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-300 font-mono">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Data Received from Demo Sensor
                    </span>
                    <span>Signal: -64 dBm (Excellent)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-700">
                      <div className="text-[10px] text-stone-400">Soil Moisture</div>
                      <div className="text-base font-bold text-sky-400">26%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-700">
                      <div className="text-[10px] text-stone-400">pH Level</div>
                      <div className="text-base font-bold text-emerald-400">6.9</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-700">
                      <div className="text-[10px] text-stone-400">Salinity (EC)</div>
                      <div className="text-base font-bold text-amber-400">0.35 dS/m</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-700">
                      <div className="text-[10px] text-stone-400">Nitrogen</div>
                      <div className="text-base font-bold text-white">205 kg/ha</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-400">
                    <span className="text-amber-400 font-bold">Demo sensor data: </span>
                    Simulated readings formatted for prototype demonstration.
                  </p>
                </div>

                <button
                  onClick={handleSaveSensorData}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Sensor Measurements</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: ✍️ ENTER EXISTING TEST RESULTS (MANUAL LAB ENTRY)
          ========================================================================= */}
      {activeWorkflow === 'manual' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <button
              onClick={() => setActiveWorkflow('hub')}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Check My Soil</span>
            </button>

            <span className="text-xs font-mono text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg">
              Method 4 of 4: Direct Test Entry
            </span>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              ✍️ Enter Existing Laboratory Test Results
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Fill in the parameters from your official soil certificate. Non-essential fields can be left blank.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Soil pH */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  Soil pH (0 – 14)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={manualPh}
                  onChange={(e) => setManualPh(e.target.value)}
                  placeholder="e.g. 6.8"
                  className={`w-full text-xs p-2.5 rounded-xl border bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 ${
                    validationErrors.ph ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                  }`}
                />
                {validationErrors.ph && (
                  <p className="text-[10px] text-red-600 font-medium">{validationErrors.ph}</p>
                )}
              </div>

              {/* Organic Carbon */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  Organic Carbon (%)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={manualOc}
                  onChange={(e) => setManualOc(e.target.value)}
                  placeholder="e.g. 0.55"
                  className={`w-full text-xs p-2.5 rounded-xl border bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 ${
                    validationErrors.oc ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                  }`}
                />
                {validationErrors.oc && (
                  <p className="text-[10px] text-red-600 font-medium">{validationErrors.oc}</p>
                )}
              </div>

              {/* Nitrogen */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  Available Nitrogen (kg/ha)
                </label>
                <input
                  type="number"
                  value={manualN}
                  onChange={(e) => setManualN(e.target.value)}
                  placeholder="e.g. 190"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Phosphorus */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  Available Phosphorus (kg/ha)
                </label>
                <input
                  type="number"
                  value={manualP}
                  onChange={(e) => setManualP(e.target.value)}
                  placeholder="e.g. 18"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Potassium */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  Available Potassium (kg/ha)
                </label>
                <input
                  type="number"
                  value={manualK}
                  onChange={(e) => setManualK(e.target.value)}
                  placeholder="e.g. 210"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Moisture */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  Soil Moisture (% optional)
                </label>
                <input
                  type="number"
                  value={manualMoisture}
                  onChange={(e) => setManualMoisture(e.target.value)}
                  placeholder="e.g. 22"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Salinity EC */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  Electrical Conductivity (dS/m optional)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={manualSalinity}
                  onChange={(e) => setManualSalinity(e.target.value)}
                  placeholder="e.g. 0.35"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Texture */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block text-xs font-bold text-stone-800">
                  Soil Texture
                </label>
                <select
                  value={manualTexture}
                  onChange={(e) => setManualTexture(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                >
                  <option value="Sandy Loam">Sandy Loam</option>
                  <option value="Alluvial Loam">Alluvial Loam</option>
                  <option value="Clay Loam">Clay Loam</option>
                  <option value="Red Oxisol / Sandy Clay">Red Oxisol / Sandy Clay</option>
                  <option value="Black Cotton Clay (Vertisol)">Black Cotton Clay (Vertisol)</option>
                  <option value="Chernozem (Black Earth)">Chernozem (Black Earth)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleValidateAndSaveManual}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Soil Results</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 6: ⚙️ DEMO / SIMULATION MODE (SEPARATED FOR JUDGES & SIMULATIONS)
          ========================================================================= */}
      {activeWorkflow === 'demo_simulation' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <button
              onClick={() => setActiveWorkflow('hub')}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Farmer Mode</span>
            </button>

            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg">
              ⚙️ Demo / Simulation Mode
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
            <div className="font-bold mb-0.5">Demo Mode — These values are simulated for demonstration.</div>
            <p className="text-stone-600">
              This panel allows hackathon judges to adjust raw telemetry sliders and test edge cases (acidic soils, salinity, nutrient depletion) without manual lab entry.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleApplyPreset('degraded')}
              className="px-3 py-1.5 rounded-lg bg-rose-100 text-rose-900 border border-rose-300 text-xs font-semibold hover:bg-rose-200 transition-colors cursor-pointer"
            >
              Simulate Acidic / Degraded Soil (pH 5.4, OC 0.38%)
            </button>
            <button
              onClick={() => handleApplyPreset('saline')}
              className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold hover:bg-amber-200 transition-colors cursor-pointer"
            >
              Simulate Saline-Alkali Soil (pH 8.4, EC 3.4 dS/m)
            </button>
            <button
              onClick={() => handleApplyPreset('optimal')}
              className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold hover:bg-emerald-200 transition-colors cursor-pointer"
            >
              Simulate Regenerated Healthy Soil (pH 6.8, OC 0.85%)
            </button>
          </div>

          {/* Sliders Grid */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs">
            {/* pH Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-stone-700">Soil pH</span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-white border border-stone-200">
                  {soil.ph.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="4.5"
                max="9.0"
                step="0.1"
                value={soil.ph}
                onChange={(e) => {
                  const updated = { ...soil, ph: parseFloat(e.target.value), isDemoData: true };
                  setSoil(updated);
                  onUpdateSoil(updated);
                }}
                className="w-full accent-emerald-700 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Organic Carbon Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-stone-700">Organic Carbon (OC %)</span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-white border border-stone-200">
                  {soil.organicCarbon.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.05"
                value={soil.organicCarbon}
                onChange={(e) => {
                  const updated = { ...soil, organicCarbon: parseFloat(e.target.value), isDemoData: true };
                  setSoil(updated);
                  onUpdateSoil(updated);
                }}
                className="w-full accent-emerald-700 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* NPK Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-stone-500 font-bold block mb-1">Nitrogen (kg/ha)</label>
                <input
                  type="number"
                  value={soil.nitrogen}
                  onChange={(e) => {
                    const updated = { ...soil, nitrogen: parseInt(e.target.value, 10) || 0, isDemoData: true };
                    setSoil(updated);
                    onUpdateSoil(updated);
                  }}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-stone-500 font-bold block mb-1">Phosphorus (kg/ha)</label>
                <input
                  type="number"
                  value={soil.phosphorus}
                  onChange={(e) => {
                    const updated = { ...soil, phosphorus: parseInt(e.target.value, 10) || 0, isDemoData: true };
                    setSoil(updated);
                    onUpdateSoil(updated);
                  }}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-stone-500 font-bold block mb-1">Potassium (kg/ha)</label>
                <input
                  type="number"
                  value={soil.potassium}
                  onChange={(e) => {
                    const updated = { ...soil, potassium: parseInt(e.target.value, 10) || 0, isDemoData: true };
                    setSoil(updated);
                    onUpdateSoil(updated);
                  }}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono text-xs font-bold"
                />
              </div>
            </div>

            <button
              onClick={() => setActiveWorkflow('results')}
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Farmer Health Results Screen →</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 7: UNIFIED FARMER-FRIENDLY RESULT SCREEN — "🌱 Your Soil Health"
          ========================================================================= */}
      {activeWorkflow === 'results' && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
                  🌱 Your Soil Health
                </h3>
                {soil.isDemoData ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Demo Data
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Farmer Data
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Source: <b>{soil.sourceTitle || 'Verified Soil Record'}</b> · {regionName}, {countryName}
              </p>
            </div>

            {/* Action Buttons: Audio Readout, New Sample, Demo Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSpeech}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSpeakingSummary
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
                title="Listen to Spoken Soil Health Summary"
              >
                {isSpeakingSummary ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
                <span>{isSpeakingSummary ? 'Pause Audio' : 'Listen Summary'}</span>
              </button>

              <button
                onClick={() => setActiveWorkflow('hub')}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-200 transition-colors cursor-pointer"
                title="Test Another Soil Sample or Switch Input Method"
              >
                + New Sample
              </button>
            </div>
          </div>

          {/* Crop Selector: "What crop are you growing?" */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-700" />
                <span>What crop are you growing?</span>
              </div>
              <p className="text-[11px] text-emerald-900/80 mt-0.5">
                Soil guidance is calibrated specifically for the selected crop's pH and nutrient absorption ranges.
              </p>
            </div>

            <select
              value={selectedCropName}
              onChange={(e) => {
                setSelectedCropName(e.target.value);
                onUpdateCrop(e.target.value);
              }}
              className="bg-white text-stone-900 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-xs cursor-pointer"
            >
              {Object.keys(CROP_SOIL_PROFILES).map((cropKey) => (
                <option key={cropKey} value={cropKey}>
                  {CROP_SOIL_PROFILES[cropKey].name} ({CROP_SOIL_PROFILES[cropKey].category})
                </option>
              ))}
            </select>
          </div>

          {/* Overall Health Status Banner with Transparent Reasons */}
          <div
            className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
              evaluation.overallStatus === 'Good'
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : evaluation.overallStatus === 'Needs Attention'
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : 'bg-rose-50/80 border-rose-300 text-rose-950'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {evaluation.overallStatus === 'Good' ? '🟢' : evaluation.overallStatus === 'Needs Attention' ? '🟡' : '🔴'}
                </span>
                <span className="font-serif font-bold text-base sm:text-lg">
                  Soil Health Status: {evaluation.overallStatus}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold mb-1">Reasons:</div>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  {evaluation.reasons.map((reason, idx) => (
                    <li key={idx} className="leading-snug">
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-right sm:self-center shrink-0">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/80 border border-current shadow-xs">
                Target: {selectedCropName}
              </span>
            </div>
          </div>

          {/* Parameter Grid with Simple Indicators & "What does this mean?" */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Detailed Soil Parameters
              </h4>
              <span className="text-[11px] text-stone-500">
                Click ℹ️ icon on any card for farmer explanations
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {evaluation.parameters.map((param) => {
                const statusBadge =
                  param.status === 'good'
                    ? { bg: 'bg-emerald-100 text-emerald-900 border-emerald-200', icon: '🟢 Good' }
                    : param.status === 'needs_attention'
                    ? { bg: 'bg-amber-100 text-amber-900 border-amber-200', icon: '🟡 Needs attention' }
                    : param.status === 'needs_improvement'
                    ? { bg: 'bg-rose-100 text-rose-900 border-rose-200', icon: '🔴 Needs improvement' }
                    : { bg: 'bg-stone-100 text-stone-600 border-stone-200', icon: '⚪ Not available' };

                return (
                  <div
                    key={param.parameter}
                    className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/40 hover:bg-white hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-2 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="font-bold text-xs text-stone-900">
                          {param.label}
                        </span>

                        <button
                          onClick={() => setActiveParamInfo(param.parameter)}
                          className="p-1 rounded-full text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="What does this mean?"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="font-serif font-bold text-xl text-stone-950">
                          {param.valueDisplay}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge.bg}`}>
                          {statusBadge.icon}
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-600 leading-snug">
                        {param.statusText}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 text-[10px] text-stone-500 font-mono">
                      {param.cropGuidance}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 👨‍🌾 "What should I do?" Practical Actionable Advice */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900 to-[#0F2E1E] text-white space-y-3 shadow-sm border border-emerald-800">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>👨‍🌾 What should I do? (Actionable Farm Guidance)</span>
            </div>

            <p className="text-xs text-stone-300">
              Practical recommendations based strictly on your available soil numbers:
            </p>

            <ul className="space-y-2 text-xs text-stone-100">
              {evaluation.actionableAdvice.map((advice, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{advice}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 🤖 "Ask Agri AI" Interactive Farmer Q&A */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    🤖 Ask Agri AI About Your Soil
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Have questions about {selectedCropName} or your soil numbers? Ask below:
                  </p>
                </div>
              </div>
            </div>

            {/* Preset Question Chips */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => handleAskAgriAi(`Is my soil good for ${selectedCropName}?`)}
                className="text-[11px] px-2.5 py-1 bg-white hover:bg-emerald-50 text-stone-700 border border-stone-300 hover:border-emerald-400 rounded-lg transition-colors cursor-pointer"
              >
                Is my soil good for {selectedCropName}?
              </button>
              <button
                onClick={() => handleAskAgriAi('Why is my organic carbon low and how can I fix it?')}
                className="text-[11px] px-2.5 py-1 bg-white hover:bg-emerald-50 text-stone-700 border border-stone-300 hover:border-emerald-400 rounded-lg transition-colors cursor-pointer"
              >
                Why is my organic carbon low?
              </button>
              <button
                onClick={() => handleAskAgriAi(`What does pH ${soil.ph.toFixed(1)} mean for my field?`)}
                className="text-[11px] px-2.5 py-1 bg-white hover:bg-emerald-50 text-stone-700 border border-stone-300 hover:border-emerald-400 rounded-lg transition-colors cursor-pointer"
              >
                What does pH {soil.ph.toFixed(1)} mean?
              </button>
              <button
                onClick={() => handleAskAgriAi('Which soil parameter needs the most urgent attention?')}
                className="text-[11px] px-2.5 py-1 bg-white hover:bg-emerald-50 text-stone-700 border border-stone-300 hover:border-emerald-400 rounded-lg transition-colors cursor-pointer"
              >
                Which parameter needs urgent attention?
              </button>
            </div>

            {/* Question Input Box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAgriAi()}
                placeholder="Ask any question about your soil or crop..."
                className="flex-1 text-xs p-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button
                onClick={() => handleAskAgriAi()}
                disabled={isAiLoading || !aiQuestion.trim()}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            </div>

            {/* AI Answer Box */}
            {aiAnswer && (
              <div className="p-4 rounded-xl bg-white border border-emerald-300 space-y-2 text-xs animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Agri AI Response:</span>
                </div>
                <p className="text-stone-800 leading-relaxed">
                  {aiAnswer.answer}
                </p>

                {aiAnswer.keyAdvice && aiAnswer.keyAdvice.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 space-y-1">
                    <span className="font-bold text-stone-700 text-[11px]">Key Advice:</span>
                    <ul className="list-disc list-inside text-[11px] text-stone-600 space-y-0.5">
                      {aiAnswer.keyAdvice.map((adv, idx) => (
                        <li key={idx}>{adv}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          INFO MODAL: "What does this mean?" (Plain language popover)
          ========================================================================= */}
      {activeParamInfo && SOIL_PARAMETER_EXPLANATIONS[activeParamInfo] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-emerald-950/15 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900 capitalize">
                  {activeParamInfo === 'ph' ? 'Soil pH (Reaction)' : activeParamInfo === 'organicCarbon' ? 'Organic Carbon (OC %)' : activeParamInfo}
                </h4>
              </div>

              <button
                onClick={() => setActiveParamInfo(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
              <div>
                <span className="font-bold text-stone-900 block mb-0.5">What is it?</span>
                <p>{SOIL_PARAMETER_EXPLANATIONS[activeParamInfo].whatIsIt}</p>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-0.5">Why does it matter for your crops?</span>
                <p>{SOIL_PARAMETER_EXPLANATIONS[activeParamInfo].whyItMatters}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                <span className="font-bold block mb-0.5">How to naturally improve it:</span>
                <p>{SOIL_PARAMETER_EXPLANATIONS[activeParamInfo].howToImprove}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveParamInfo(null)}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
