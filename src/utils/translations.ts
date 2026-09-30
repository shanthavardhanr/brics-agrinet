import {
  LOCALIZED_WEATHER_ALERTS,
  LOCALIZED_SAMPLE_DISEASES,
  LOCALIZED_PITCH_SLIDES,
  LOCALIZED_PUBLIC_GOODS,
} from './localizationData';

export type BricsLanguage = 'en' | 'pt' | 'ru' | 'hi' | 'zh' | 'te' | 'ar' | 'sw';

export interface LanguageOption {
  code: BricsLanguage;
  name: string;
  nativeName: string;
  flag: string;
  country: string;
}

export const BRICS_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌐', country: 'Global / BRICS' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', country: 'India (AP / Telangana)' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', country: 'India' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', country: 'Brazil' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', country: 'Russia' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文 (简体)', flag: '🇨🇳', country: 'China' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬', country: 'Egypt / BRICS+' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇿🇦', country: 'South Africa / East Africa' },
];

export const translations = {
  en: {
    // Header & Global
    initiativeBadge: 'BRICS AgriN Initiative',
    initiativeSubtitle: 'Interoperable Digital Public Infrastructure for Climate-Resilient Agriculture',
    digitalPublicGood: 'Digital Public Good',
    geminiEngine: 'Gemini 3.8 Flash Engine',
    networkNode: 'BRICS+ Network',
    navAdvisories: 'Agro-Advisories',
    navDiagnostic: 'Disease Diagnostic Lab',
    navDataExchange: 'BRICS Data Exchange',
    btnPitchDeck: 'Pitch Deck',
    btnPitchDeckJudges: 'Pitch Deck for Judges',
    btnApiVerification: 'Technical Verification',
    appTagline: 'Earth Observation · Soil Health · Multilingual AI Advisories · Transboundary Disease Defense',

    // Agro-Advisory Engine
    engineCategory: 'Agro-Ecological Telemetry',
    engineNode: 'BRICS AgriNet Node',
    engineTitle: 'Real-Time Localised Agro-Advisory Engine',
    engineSubtitle: 'Delivering data-driven regenerative crop advice for smallholders by fusing Sentinel-2 / Landsat satellite imagery, soil health tests, and 7-day climate forecasts.',
    btnRefreshAdvisory: 'Refresh AI Advisory',
    btnAnalyzingTelemetry: 'Analyzing Telemetry...',
    lblSelectRegion: 'Select BRICS Agro-Ecological Region',
    cardSoilTitle: 'Soil Health Indicators',
    cardSoilSubtitle: 'Laboratory test or sensor probe telemetry',
    btnDegraded: 'Degraded',
    btnReset: 'Reset',
    lblSoilPh: 'Soil pH',
    lblOrganicCarbon: 'Organic Carbon (OC %)',
    lblNitrogen: 'Nitrogen (N)',
    lblPhosphorus: 'Phosphorus (P)',
    lblPotassium: 'Potassium (K)',
    lblSoilTexture: 'Texture',
    lblSoilMoisture: 'Moisture',
    ocTargetInfo: 'Target: Rebuild OC > 0.75% through biochar & cover crops.',
    cardSatelliteTitle: 'Earth Observation Indices',
    lblMultiSpectral: '10m Multi-spectral',
    lblNdvi: 'Vegetation Index (NDVI)',
    lblNdwi: 'Water Index (NDWI)',
    lblNdwiSub: 'Root zone hydration',
    lblSurfaceTemp: 'Surface Temp (LST)',
    lblSurfaceTempSub: 'Canopy boundary layer',
    lblCanopyStatus: 'Canopy Status:',
    cardClimateTitle: 'Climate Forecast & Alerts',
    cardClimateSub: '7-Day Agro-Meteorological Model',
    lbl7DayRain: '7-day rain',
    climateAlertTitle: 'Regional Climate Advisory',
    lblTargetCrop: 'Target Crop:',
    lblFarmSize: 'Size:',
    riskLevel: 'Risk Level:',
    btnListenAdvisory: 'Listen to Advisory',
    btnPauseAudio: 'Pause Audio',
    btnPrintBulletin: 'Print Bulletin',
    executiveDiagnosisTitle: 'Executive Agronomic Diagnosis',
    secRegenCropTitle: 'Regenerative Crop Plan',
    lblIntercropping: 'Intercropping Pattern:',
    secLivingSoilTitle: 'Living Soil Restoration',
    lblOcIntervention: 'Organic Carbon Buildup',
    lblBioInoculants: 'Recommended Bio-Inoculants',
    lblConditioner: 'Soil Conditioning & pH',
    lblIrrigation: 'Precision Irrigation & Retention',
    secBricsTransferTitle: 'BRICS South-South Transfer',
    lblSourceNation: 'Source:',
    secWeeklyScheduleTitle: 'Priority 7-Day Actions',

    // Diagnostic Lab
    diagCategory: 'Plant Pathology & Bio-IPM',
    diagTitle: 'Crop Disease Diagnostic & Biocontrol Lab',
    diagSubtitle: 'Instant pathogen identification, infection stage detection, and 100% biological pest management formulas. Connected with the BRICS Transboundary Quarantine Alert network.',
    btnRunDiagnosis: 'Run AI Diagnostic',
    btnAnalyzingPathology: 'Analyzing Pathology...',
    cardPhotoTitle: 'Plant Photo or Sample Case',
    uploadPromptTitle: 'Click to upload leaf photo or take picture',
    uploadPromptSub: 'Supports JPG, PNG, WEBP (under 20MB)',
    photoUploaded: 'Custom photo uploaded. Click to replace.',
    lblCropSpecies: 'Crop Species',
    lblFarmerSymptoms: 'Farmer Observed Symptoms',
    symptomsPlaceholder: 'Describe leaf spots, wilting, color changes, or pest frass...',
    btnResetSample: 'Reset to Sample',
    testSuiteTitle: 'BRICS Crop Pathology Test Suite',
    testSuiteSub: '1-Click Diagnostic Test',
    lblConfidence: 'Confidence',
    lblPathogen: 'Pathogen:',
    lblInfectionStage: 'Infection Stage:',
    lblPathologicalSigns: 'Pathological Signs Confirmed:',
    lblBioRemedies: 'Biological & Regenerative Remedies',
    lblNonChemicalFirst: 'Non-Chemical First',
    lblRate: 'Rate:',
    lblEmergencyIpm: 'Emergency IPM Threshold (If yield threatened > 25%)',
    lblLongTermDefense: 'Long-Term Soil & Seed Defense',
    lblQuarantineTitle: 'BRICS Transboundary Quarantine Status',
    lblActiveAlert: 'Active Alert Corridor',
    lblPartnerNations: 'Partner Nations Monitored:',
    noDiagnosisTitle: 'No Active Diagnosis Yet',
    noDiagnosisSub: 'Select one of the sample test diseases from the left or upload a leaf photo to trigger Gemini 3.8 Flash multimodal analysis.',
    micStart: 'Voice Input (Microphone)',
    micStop: 'Stop Recording',
    micListening: 'Listening... Speak crop symptoms now',
    micUnsupported: 'Voice speech-to-text is not supported in this browser. Please use Chrome or Safari.',
    micPermissionDenied: 'Microphone permission denied. Please allow microphone access in browser settings.',

    // Data Exchange & Public Goods
    dpgTheme: 'Theme: Cooperation',
    dpgAlliance: 'Digital Public Goods Alliance',
    dpgTitle: 'BRICS AgriNet: Interoperable Data & Knowledge Exchange',
    dpgSubtitle: 'An open digital architecture connecting agricultural research institutes (ICAR, EMBRAPA, CAAS, Dokuchaev, ARC) to share seed genetics, soil carbon models, and satellite algorithms across emerging economies.',
    dpgOpenBadge: '100% Open Access DPG',
    queryTerminalTitle: 'Federated BRICS Knowledge Query Terminal (Gemini 3.8 Flash)',
    queryTerminalHeading: 'Query Cross-Border Agronomic Knowledge Transfer',
    queryTerminalDesc: 'Ask how proven sustainable agriculture practices in one BRICS nation (e.g., Brazilian no-till BNF or Chinese saline rice) can be adapted to another country\'s agro-ecological zones.',
    btnQueryNetwork: 'Query AgriNet',
    btnConsulting: 'Consulting Network...',
    quickInquiries: 'Quick Inquiries:',
    catalogTitle: 'BRICS Digital Public Goods Catalog',
    catalogSubtitle: 'Freely accessible datasets, algorithms, and crop blueprints without patent royalties',
    searchPlaceholder: 'Search public goods...',
    btnAccessAsset: 'Access Asset',
    sandboxTitle: 'Interoperability Schema & Open Standards Sandbox',
    sandboxSubtitle: 'Standard JSON-LD, GeoJSON, and OpenAPI schemas allowing any agricultural ministry or extension software to integrate with AgriNet.',

    // Footer
    footerTitle: 'BRICS AgriNet · Digital Agriculture Public Good',
    footerSubtitle: 'Cooperation for Sustainable Food Production · Brazil · Russia · India · China · South Africa · BRICS+',
    footerFao: 'FAO AgGateway Compliant',
    footerDevote: 'Built with Google GenAI SDK (Gemini 3.8 Flash) · Dedicated to 500M+ smallholders worldwide',
    footerSdgs: 'UN SDG 2 (Zero Hunger) · UN SDG 13 (Climate Action) · UN SDG 17 (Partnerships)',

    // ROI Simulator & Pitch Deck
    roiSimTitle: 'Community ROI & Impact Scale Simulator',
    roiSimSubtitle: 'Adjust cluster land area to project regional economic and ecological savings',
    lblTotalLand: 'Total Cluster Land Area',
    lblHectares: 'hectares',
    lblSmallholdersInCluster: 'Smallholders in Cluster',
    lblFarmers: 'farmers',
    lblAvgLandholding: 'Avg. Landholding',
    lblFarmer: 'farmer',
    lblChemicalSavings: 'Chemical Fertilizer & Pesticide Savings',
    lblYear: 'yr',
    lblChemicalSavingsDesc: 'Reduces smallholder synthetic pesticide and urea spend by $85/hectare.',
    lblGroundwaterConserved: 'Groundwater Conserved',
    lblLiters: 'liters',
    lblGroundwaterConservedDesc: 'Saved through sensor-guided and biochar soil water retention.',
    lblCarbonInsetting: 'Carbon Insetting',
    lblCarbonInsettingDesc: 'Aggregated soil organic carbon sequestration ready for cooperative credits.',
    btnPrevSlide: 'Previous',
    btnNextSlide: 'Next Slide',
    btnReturnToApp: 'Return to App',

    // Offline & Network
    lblOfflineFieldCache: 'Offline Field Cache',
    bannerOfflineDiag: 'Offline Diagnostic Mode (Cached Expert Rule-Engine)',
    bannerOfflineDiagDesc: 'Operating from pre-cached BRICS agronomic datasets and offline knowledge models.',
    lblNetworkConnected: 'Online (Cached)',
    lblNetworkOffline: 'Offline Mode (Local Storage)',

    // Weather Alerts
    lblEmergencyAlert: 'Emergency Alert',
    lblOnset: 'Onset',
    lblExpectedRainfall: 'Expected Rainfall',
    lblPeakTemp: 'Peak Temp',
    lblSoilSaturation: 'Soil Saturation',
    lblWindSpeed: 'Wind Speed',
    lblImmediateCountermeasures: 'Immediate Action & Countermeasures',
  },

  pt: {
    // Header & Global
    initiativeBadge: 'Iniciativa BRICS AgriN',
    initiativeSubtitle: 'Infraestrutura Pública Digital Interoperável para Agricultura Resiliente ao Clima',
    digitalPublicGood: 'Bem Público Digital',
    geminiEngine: 'Motor Gemini 3.8 Flash',
    networkNode: 'Rede BRICS+',
    navAdvisories: 'Agro-Recomendações',
    navDiagnostic: 'Laboratório de Diagnóstico',
    navDataExchange: 'Intercâmbio de Dados BRICS',
    btnPitchDeck: 'Pitch Deck',
    btnPitchDeckJudges: 'Pitch Deck para Avaliadores',
    btnApiVerification: 'Verificação Técnica',
    appTagline: 'Observação da Terra · Saúde do Solo · Recomendações de IA Multilíngue · Defesa Sanitária Transfronteiriça',

    // Agro-Advisory Engine
    engineCategory: 'Telemetria Agroecológica',
    engineNode: 'Nó BRICS AgriNet',
    engineTitle: 'Motor de Agro-Recomendações Localizadas em Tempo Real',
    engineSubtitle: 'Orientações regenerativas baseadas em dados para pequenos produtores, unindo imagens de satélite Sentinel-2/Landsat, análises de solo e previsões climáticas de 7 dias.',
    btnRefreshAdvisory: 'Atualizar Agro-Recomendação',
    btnAnalyzingTelemetry: 'Analisando Telemetria...',
    lblSelectRegion: 'Selecione a Região Agroecológica do BRICS',
    cardSoilTitle: 'Indicadores de Saúde do Solo',
    cardSoilSubtitle: 'Testes laboratoriais ou sondas de sensores',
    btnDegraded: 'Degradado',
    btnReset: 'Redefinir',
    lblSoilPh: 'pH do Solo',
    lblOrganicCarbon: 'Carbono Orgânico (CO %)',
    lblNitrogen: 'Nitrogênio (N)',
    lblPhosphorus: 'Fósforo (P)',
    lblPotassium: 'Potássio (K)',
    lblSoilTexture: 'Textura',
    lblSoilMoisture: 'Umidade',
    ocTargetInfo: 'Meta: Reconstruir CO > 0,75% por meio de biochar e plantas de cobertura.',
    cardSatelliteTitle: 'Índices de Observação da Terra',
    lblMultiSpectral: 'Multiespectral 10m',
    lblNdvi: 'Índice de Vegetação (NDVI)',
    lblNdwi: 'Índice de Água (NDWI)',
    lblNdwiSub: 'Hidratação na zona radicular',
    lblSurfaceTemp: 'Temp. Superfície (LST)',
    lblSurfaceTempSub: 'Camada limite da copa',
    lblCanopyStatus: 'Condição da Copa:',
    cardClimateTitle: 'Previsão Climática e Alertas',
    cardClimateSub: 'Modelo Agrometeorológico de 7 Dias',
    lbl7DayRain: 'Chuva em 7 dias',
    climateAlertTitle: 'Alerta Climático Regional',
    lblTargetCrop: 'Cultura Alvo:',
    lblFarmSize: 'Área:',
    riskLevel: 'Nível de Risco:',
    btnListenAdvisory: 'Ouvir Recomendação',
    btnPauseAudio: 'Pausar Áudio',
    btnPrintBulletin: 'Imprimir Boletim',
    executiveDiagnosisTitle: 'Diagnóstico Agronômico Executivo',
    secRegenCropTitle: 'Plano de Cultivo Regenerativo',
    lblIntercropping: 'Padrão de Consórcio:',
    secLivingSoilTitle: 'Restauração do Solo Vivo',
    lblOcIntervention: 'Aumento de Carbono Orgânico',
    lblBioInoculants: 'Bioinoculantes Recomendados',
    lblConditioner: 'Condicionamento do Solo e pH',
    lblIrrigation: 'Irrigação de Precisão e Retenção',
    secBricsTransferTitle: 'Transferência Sul-Sul do BRICS',
    lblSourceNation: 'Origem:',
    secWeeklyScheduleTitle: 'Ações Prioritárias para 7 Dias',

    // Diagnostic Lab
    diagCategory: 'Fitopatologia e MIP Biológico',
    diagTitle: 'Laboratório de Diagnóstico de Doenças e Biocontrole',
    diagSubtitle: 'Identificação imediata de patógenos, detecção de estágio infeccioso e fórmulas 100% biológicas. Conectado à rede de alerta quarentenário do BRICS.',
    btnRunDiagnosis: 'Executar Diagnóstico IA',
    btnAnalyzingPathology: 'Analisando Fitopatologia...',
    cardPhotoTitle: 'Foto da Planta ou Caso de Exemplo',
    uploadPromptTitle: 'Clique para enviar foto da folha ou tirar foto',
    uploadPromptSub: 'Suporta JPG, PNG, WEBP (até 20MB)',
    photoUploaded: 'Foto personalizada carregada. Clique para substituir.',
    lblCropSpecies: 'Espécie da Cultura',
    lblFarmerSymptoms: 'Sintomas Observados pelo Produtor',
    symptomsPlaceholder: 'Descreva manchas foliares, murcha, alterações de cor ou excrementos de pragas...',
    btnResetSample: 'Restaurar Exemplo',
    testSuiteTitle: 'Conjunto de Testes Fitopatológicos do BRICS',
    testSuiteSub: 'Teste Diagnóstico em 1 Clique',
    lblConfidence: 'Confiança',
    lblPathogen: 'Patógeno:',
    lblInfectionStage: 'Estágio de Infecção:',
    lblPathologicalSigns: 'Sinais Patológicos Confirmados:',
    lblBioRemedies: 'Remédios Biológicos e Regenerativos',
    lblNonChemicalFirst: 'Prioridade Não Química',
    lblRate: 'Dosagem:',
    lblEmergencyIpm: 'Limiar de Emergência MIP (se perda prevista > 25%)',
    lblLongTermDefense: 'Defesa a Longo Prazo do Solo e Sementes',
    lblQuarantineTitle: 'Status Quarentenário Transfronteiriço BRICS',
    lblActiveAlert: 'Corredor de Alerta Ativo',
    lblPartnerNations: 'Nações Parceiras Monitoradas:',
    noDiagnosisTitle: 'Nenhum Diagnóstico Ativo',
    noDiagnosisSub: 'Selecione uma das doenças de teste à esquerda ou envie uma foto para ativar a análise multimodal do Gemini 3.8 Flash.',

    // Data Exchange & Public Goods
    dpgTheme: 'Tema: Cooperação',
    dpgAlliance: 'Aliança de Bens Públicos Digitais',
    dpgTitle: 'BRICS AgriNet: Intercâmbio de Dados e Conhecimento Interoperável',
    dpgSubtitle: 'Arquitetura digital aberta interligando institutos de pesquisa agrícola (EMBRAPA, ICAR, CAAS, Dokuchaev, ARC) para compartilhar genética vegetal, modelos de carbono e algoritmos.',
    dpgOpenBadge: 'BPD 100% de Acesso Aberto',
    queryTerminalTitle: 'Terminal de Consulta Federado do BRICS (Gemini 3.8 Flash)',
    queryTerminalHeading: 'Consultar Transferência de Conhecimento Agronômico',
    queryTerminalDesc: 'Descubra como práticas sustentáveis do BRICS (como Fixação Biológica de Nitrogênio da EMBRAPA ou arroz salino) podem ser adaptadas a outras zonas agroecológicas.',
    btnQueryNetwork: 'Consultar AgriNet',
    btnConsulting: 'Consultando Rede...',
    quickInquiries: 'Consultas Rápidas:',
    catalogTitle: 'Catálogo de Bens Públicos Digitais do BRICS',
    catalogSubtitle: 'Bases de dados, algoritmos e modelos de cultivo livres de royalties e patentes proprietárias',
    searchPlaceholder: 'Pesquisar bens públicos...',
    btnAccessAsset: 'Acessar Ativo',
    sandboxTitle: 'Esquemas de Interoperabilidade e Padrões Abertos',
    sandboxSubtitle: 'Formatos JSON-LD, GeoJSON e OpenAPI compatíveis com FAO AgGateway para integração direta por ministérios da agricultura.',

    // Footer
    footerTitle: 'BRICS AgriNet · Bem Público Digital para Agricultura',
    footerSubtitle: 'Cooperação para Produção Sustentável de Alimentos · Brasil · Rússia · Índia · China · África do Sul · BRICS+',
    footerFao: 'Compatível com FAO AgGateway',
    footerDevote: 'Construído com Google GenAI SDK (Gemini 3.8 Flash) · Dedicado a mais de 500 milhões de pequenos produtores',
    footerSdgs: 'ODS 2 da ONU (Fome Zero) · ODS 13 (Ação Climática) · ODS 17 (Parcerias)',
  },

  ru: {
    // Header & Global
    initiativeBadge: 'Инициатива БРИКС AgriN',
    initiativeSubtitle: 'Интероперабельная цифровая общественная инфраструктура для климатически устойчивого сельского хозяйства',
    digitalPublicGood: 'Цифровое общественное благо',
    geminiEngine: 'Движок Gemini 3.8 Flash',
    networkNode: 'Сеть БРИКС+',
    navAdvisories: 'Агрорекомендации',
    navDiagnostic: 'Диагностика болезней',
    navDataExchange: 'Обмен данными БРИКС',
    btnPitchDeck: 'Питч-презентация',
    btnPitchDeckJudges: 'Презентация для жюри',
    btnApiVerification: 'Техническая верификация',
    appTagline: 'Дистанционное зондирование Земли · Здоровье почв · Многоязычные рекомендации ИИ · Защита от трансграничных угроз',

    // Agro-Advisory Engine
    engineCategory: 'Агроэкологическая телеметрия',
    engineNode: 'Узел BRICS AgriNet',
    engineTitle: 'Система локализованных агрорекомендаций в реальном времени',
    engineSubtitle: 'Предоставление регенеративных агрономических рекомендаций на основе спутниковых данных Sentinel-2 / Landsat, почвенных анализов и 7-дневных климатических прогнозов.',
    btnRefreshAdvisory: 'Обновить рекомендацию ИИ',
    btnAnalyzingTelemetry: 'Анализ телеметрии...',
    lblSelectRegion: 'Выберите агроэкологический регион БРИКС',
    cardSoilTitle: 'Показатели плодородия почв',
    cardSoilSubtitle: 'Данные лабораторных анализов и почвенных датчиков',
    btnDegraded: 'Деградированная',
    btnReset: 'Сброс',
    lblSoilPh: 'pH почвы',
    lblOrganicCarbon: 'Органический углерод (C %)',
    lblNitrogen: 'Азот (N)',
    lblPhosphorus: 'Фосфор (P)',
    lblPotassium: 'Калий (K)',
    lblSoilTexture: 'Гранулометрический состав',
    lblSoilMoisture: 'Влажность',
    ocTargetInfo: 'Цель: Восстановление содержания гумуса > 0.75% с помощью биочара и сидератов.',
    cardSatelliteTitle: 'Индексы дистанционного зондирования',
    lblMultiSpectral: 'Мультиспектральный 10м',
    lblNdvi: 'Вегетационный индекс (NDVI)',
    lblNdwi: 'Индекс увлажнения (NDWI)',
    lblNdwiSub: 'Влагообеспеченность корневой зоны',
    lblSurfaceTemp: 'Температура поверхности (LST)',
    lblSurfaceTempSub: 'Приземный пограничный слой',
    lblCanopyStatus: 'Состояние травостоя:',
    cardClimateTitle: 'Прогноз погоды и климатические риски',
    cardClimateSub: '7-дневная агрометеорологическая модель',
    lbl7DayRain: 'Осадки за 7 дней',
    climateAlertTitle: 'Региональное климатическое предупреждение',
    lblTargetCrop: 'Целевая культура:',
    lblFarmSize: 'Площадь:',
    riskLevel: 'Уровень риска:',
    btnListenAdvisory: 'Прослушать рекомендацию',
    btnPauseAudio: 'Пауза аудио',
    btnPrintBulletin: 'Печать бюллетеня',
    executiveDiagnosisTitle: 'Агрономическое экспертное заключение',
    secRegenCropTitle: 'План регенеративного севооборота',
    lblIntercropping: 'Схема совмещенных посевов:',
    secLivingSoilTitle: 'Восстановление живой биоты почвы',
    lblOcIntervention: 'Накопление органического углерода',
    lblBioInoculants: 'Рекомендуемые биоинокулянты',
    lblConditioner: 'Мелиорация и регуляция pH',
    lblIrrigation: 'Точное орошение и влагосбережение',
    secBricsTransferTitle: 'Обмен опытом в рамках БРИКС',
    lblSourceNation: 'Источник:',
    secWeeklyScheduleTitle: 'Приоритетные задачи на 7 дней',

    // Diagnostic Lab
    diagCategory: 'Фитопатология и биоконтроль',
    diagTitle: 'Лаборатория диагностики болезней растений и биозащиты',
    diagSubtitle: 'Мгновенное определение патогенов, фазы инфицирования и 100% биологические протоколы защиты. Интеграция с сетью карантинного оповещения стран БРИКС.',
    btnRunDiagnosis: 'Запустить ИИ-диагностику',
    btnAnalyzingPathology: 'Анализ симптомов...',
    cardPhotoTitle: 'Фотография растения или контрольный образец',
    uploadPromptTitle: 'Нажмите для загрузки фото листа или снимка камерой',
    uploadPromptSub: 'Поддерживаются JPG, PNG, WEBP (до 20 МБ)',
    photoUploaded: 'Фотография загружена. Нажмите для замены.',
    lblCropSpecies: 'Вид культуры',
    lblFarmerSymptoms: 'Симптомы, наблюдаемые агрономом',
    symptomsPlaceholder: 'Опишите пятнистость листьев, увядание, хлороз или следы вредителей...',
    btnResetSample: 'Сбросить к образцу',
    testSuiteTitle: 'Тестовая коллекция фитопатологий БРИКС',
    testSuiteSub: 'Быстрый диагностический тест в 1 клик',
    lblConfidence: 'Достоверность',
    lblPathogen: 'Патоген:',
    lblInfectionStage: 'Стадия инфекции:',
    lblPathologicalSigns: 'Подтвержденные признаки болезни:',
    lblBioRemedies: 'Биологические и регенеративные средства',
    lblNonChemicalFirst: 'Приоритет биометодам',
    lblRate: 'Норма расхода:',
    lblEmergencyIpm: 'Порог экстренной химической обработки (при риске потери урожая > 25%)',
    lblLongTermDefense: 'Долговременная защита семян и почвы',
    lblQuarantineTitle: 'Статус трансграничного карантина БРИКС',
    lblActiveAlert: 'Активный коридор наблюдения',
    lblPartnerNations: 'Мониторинг стран-партнеров:',
    noDiagnosisTitle: 'Нет активного диагноза',
    noDiagnosisSub: 'Выберите контрольный образец болезни слева или загрузите снимок листа для запуска мультимодального анализа Gemini 3.8 Flash.',

    // Data Exchange & Public Goods
    dpgTheme: 'Тема: Сотрудничество',
    dpgAlliance: 'Альянс цифровых общественных благ',
    dpgTitle: 'BRICS AgriNet: Интероперабельный обмен данными и знаниями',
    dpgSubtitle: 'Открытая цифровая архитектура, объединяющая исследовательские институты (Почвенный ин-т им. Докучаева, EMBRAPA, ICAR, CAAS, ARC) для обмена генетическими моделями и спутниковыми алгоритмами.',
    dpgOpenBadge: '100% открытый доступ (DPG)',
    queryTerminalTitle: 'Федеративный терминал запросов БРИКС (Gemini 3.8 Flash)',
    queryTerminalHeading: 'Запрос на трансграничный обмен агрономическими технологиями',
    queryTerminalDesc: 'Узнайте, как передовые практики БРИКС (например, биологическая азотфиксация EMBRAPA или солеустойчивый рис) могут быть адаптированы к вашим почвенным зонам.',
    btnQueryNetwork: 'Запросить AgriNet',
    btnConsulting: 'Обработка запроса...',
    quickInquiries: 'Популярные запросы:',
    catalogTitle: 'Каталог цифровых общественных благ БРИКС',
    catalogSubtitle: 'Открытые наборы данных, алгоритмы и фенотипические модели без патентных ограничений',
    searchPlaceholder: 'Поиск общественных благ...',
    btnAccessAsset: 'Открыть доступ',
    sandboxTitle: 'Песочница стандартов интероперабельности и схем',
    sandboxSubtitle: 'Стандартизированные схемы JSON-LD, GeoJSON и OpenAPI, совместимые с FAO AgGateway для министерств сельского хозяйства.',

    // Footer
    footerTitle: 'BRICS AgriNet · Цифровое общественное благо в сельском хозяйстве',
    footerSubtitle: 'Сотрудничество ради устойчивого производства продовольствия · Бразилия · Россия · Индия · Китай · Южная Африка · БРИКС+',
    footerFao: 'Соответствие стандартам FAO AgGateway',
    footerDevote: 'Создано на базе Google GenAI SDK (Gemini 3.8 Flash) · Посвящается 500+ миллионам фермеров мира',
    footerSdgs: 'ЦУР ООН 2 (Ликвидация голода) · ЦУР 13 (Борьба с изменением климата) · ЦУР 17 (Партнерство)',
  },

  hi: {
    // Header & Global
    initiativeBadge: 'ब्रिक्स एग्री-नेट (AgriN) पहल',
    initiativeSubtitle: 'जलवायु-अनुकूल टिकाऊ कृषि के लिए डिजिटल सार्वजनिक अवसंरचना',
    digitalPublicGood: 'डिजिटल पब्लिक गुड (सार्वजनिक हित)',
    geminiEngine: 'जेमिनी 3.8 फ्लैश इंजन',
    networkNode: 'ब्रिक्स+ नेटवर्क',
    navAdvisories: 'कृषि परामर्श (सलाह)',
    navDiagnostic: 'फसल रोग निदान प्रयोगशाला',
    navDataExchange: 'ब्रिक्स डेटा विनिमय',
    btnPitchDeck: 'पिच डेक',
    btnPitchDeckJudges: 'निर्णायकों के लिए पिच डेक',
    btnApiVerification: 'तकनीकी सत्यापन',
    appTagline: 'उपग्रह रिमोट सेंसिंग · मृदा स्वास्थ्य · बहुभाषी एआई परामर्श · सीमा पार फसल सुरक्षा',

    // Agro-Advisory Engine
    engineCategory: 'कृषि-पारिस्थितिक टेलीमेट्री',
    engineNode: 'ब्रिक्स एग्री-नेट नोड',
    engineTitle: 'रीयल-टाइम स्थानीयकृत प्राकृतिक कृषि परामर्श',
    engineSubtitle: 'सेंटिनल-2/लैंडसैट उपग्रह इमेजरी, मिट्टी परीक्षण और 7-दिवसीय मौसम पूर्वानुमान को मिलाकर छोटे व सीमांत किसानों के लिए डेटा-आधारित कृषि सलाह।',
    btnRefreshAdvisory: 'एआई परामर्श प्राप्त करें',
    btnAnalyzingTelemetry: 'डेटा का विश्लेषण हो रहा है...',
    lblSelectRegion: 'ब्रिक्स कृषि-पारिस्थितिक क्षेत्र चुनें',
    cardSoilTitle: 'मृदा स्वास्थ्य सूचकांक',
    cardSoilSubtitle: 'प्रयोगशाला परीक्षण अथवा सेंसर टेलीमेट्री',
    btnDegraded: 'कमजोर मिट्टी',
    btnReset: 'रीसेट',
    lblSoilPh: 'मिट्टी का पीएच (pH)',
    lblOrganicCarbon: 'जैविक कार्बन (OC %)',
    lblNitrogen: 'उपलब्ध नाइट्रोजन (N)',
    lblPhosphorus: 'फास्फोरस (P)',
    lblPotassium: 'पोटाश (K)',
    lblSoilTexture: 'मिट्टी की बनावट',
    lblSoilMoisture: 'नमी का स्तर',
    ocTargetInfo: 'लक्ष्य: बायोचार और हरी खाद से जैविक कार्बन 0.75% से ऊपर ले जाना।',
    cardSatelliteTitle: 'उपग्रह पृथ्वी अवलोकन सूचकांक',
    lblMultiSpectral: '10 मीटर मल्टी-स्पेक्ट्रल',
    lblNdvi: 'वनस्पति हरियाली सूचकांक (NDVI)',
    lblNdwi: 'जल/नमी सूचकांक (NDWI)',
    lblNdwiSub: 'जड़ क्षेत्र में नमी स्तर',
    lblSurfaceTemp: 'सतह का तापमान (LST)',
    lblSurfaceTempSub: 'फसल छतरी तापमान',
    lblCanopyStatus: 'फसल छतरी की स्थिति:',
    cardClimateTitle: 'मौसम पूर्वानुमान एवं चेतावनी',
    cardClimateSub: '7-दिवसीय कृषि-मौसम विज्ञान मॉडल',
    lbl7DayRain: '7 दिनों में वर्षा',
    climateAlertTitle: 'क्षेत्रीय जलवायु चेतावनी',
    lblTargetCrop: 'मुख्य फसल:',
    lblFarmSize: 'खेत का आकार:',
    riskLevel: 'जोखिम स्तर:',
    btnListenAdvisory: 'सलाह सुनें (ऑडियो)',
    btnPauseAudio: 'ऑडियो रोकें',
    btnPrintBulletin: 'बुलेटिन प्रिंट करें',
    executiveDiagnosisTitle: 'विशेषज्ञ कृषि निदान सारांश',
    secRegenCropTitle: 'प्राकृतिक फसल चक्र योजना',
    lblIntercropping: 'सह-फसली खेती पैटर्न:',
    secLivingSoilTitle: 'सजीव मृदा पुनरुद्धार प्रोटोकॉल',
    lblOcIntervention: 'जैविक कार्बन संवर्धन',
    lblBioInoculants: 'अनुशंसित जैव उर्वरक',
    lblConditioner: 'मिट्टी सुधार एवं पीएच संतुलन',
    lblIrrigation: 'सटीक सिंचाई एवं नमी संरक्षण',
    secBricsTransferTitle: 'ब्रिक्स दक्षिण-दक्षिण ज्ञान साझाकरण',
    lblSourceNation: 'स्रोत देश:',
    secWeeklyScheduleTitle: 'अगले 7 दिनों के प्रमुख कृषि कार्य',

    // Diagnostic Lab
    diagCategory: 'पादप रोग विज्ञान एवं जैविक नियंत्रण',
    diagTitle: 'फसल रोग निदान एवं जैव-कीटनाशक प्रयोगशाला',
    diagSubtitle: 'रोगज़नक़ की तत्काल पहचान, संक्रमण चरण और 100% जैविक उपचार। ब्रिक्स सीमा-पार क्वारंटाइन अलर्ट नेटवर्क से जुड़ा हुआ।',
    btnRunDiagnosis: 'रोग की पहचान करें',
    btnAnalyzingPathology: 'रोग का विश्लेषण हो रहा है...',
    cardPhotoTitle: 'पौधे की फोटो या नमूना परीक्षण',
    uploadPromptTitle: 'पत्ती की फोटो अपलोड करें या कैमरा चालू करें',
    uploadPromptSub: 'JPG, PNG, WEBP समर्थित (20MB तक)',
    photoUploaded: 'फोटो अपलोड हो गई। बदलने के लिए क्लिक करें।',
    lblCropSpecies: 'फसल का नाम',
    lblFarmerSymptoms: 'किसान द्वारा देखे गए लक्षण',
    symptomsPlaceholder: 'पत्तियों पर धब्बे, पीलापन, मुरझाना या कीड़ों के लक्षण बताएं...',
    btnResetSample: 'नमूने पर रीसेट करें',
    testSuiteTitle: 'ब्रिक्स प्रमुख फसल रोग परीक्षण गैलरी',
    testSuiteSub: 'एक क्लिक में त्वरित परीक्षण',
    lblConfidence: 'सटीकता (विश्वास)',
    lblPathogen: 'रोगकारक:',
    lblInfectionStage: 'संक्रमण की अवस्था:',
    lblPathologicalSigns: 'पुष्ट रोग लक्षण:',
    lblBioRemedies: 'जैविक एवं प्राकृतिक उपचार',
    lblNonChemicalFirst: 'रसायन-मुक्त प्राथमिक उपचार',
    lblRate: 'मात्रा/दर:',
    lblEmergencyIpm: 'आपातकालीन सीमा (यदि फसल नुकसान > 25% हो)',
    lblLongTermDefense: 'मृदा एवं बीज की दीर्घकालिक सुरक्षा',
    lblQuarantineTitle: 'ब्रिक्स सीमा-पार क्वारंटाइन चेतावनी',
    lblActiveAlert: 'सक्रिय निगरानी गलियारा',
    lblPartnerNations: 'निगरानी में शामिल ब्रिक्स देश:',
    noDiagnosisTitle: 'अभी तक कोई रोग निदान नहीं',
    noDiagnosisSub: 'बाईं ओर दी गई गैलरी में से किसी रोग को चुनें या अपने खेत की पत्ती की तस्वीर अपलोड करें।',

    // Data Exchange & Public Goods
    dpgTheme: 'थीम: सहयोग (Cooperation)',
    dpgAlliance: 'डिजिटल पब्लिक गुड्स एलायंस',
    dpgTitle: 'ब्रिक्स एग्री-नेट: डेटा एवं ज्ञान विनिमय नेटवर्क',
    dpgSubtitle: 'कृषि अनुसंधान संस्थानों (ICAR, EMBRAPA, CAAS, Dokuchaev, ARC) को जोड़ने वाला खुला डिजिटल मंच, जहां बीज आनुवंशिकी, मृदा कार्बन और उपग्रह मॉडल साझा किए जाते हैं।',
    dpgOpenBadge: '100% निःशुल्क एवं खुला DPG',
    queryTerminalTitle: 'ब्रिक्स एकीकृत ज्ञान टर्मिनल (जेमिनी 3.8 फ्लैश)',
    queryTerminalHeading: 'अंतर्राष्ट्रीय कृषि ज्ञान साझाकरण प्रश्न पूछें',
    queryTerminalDesc: 'जानें कि ब्राजील की जैविक नाइट्रोजन फिक्सेशन या चीन के खारे पानी के धान की तकनीक को अन्य देशों में कैसे अपनाया जा सकता है।',
    btnQueryNetwork: 'नेटवर्क से पूछें',
    btnConsulting: 'परामर्श लिया जा रहा है...',
    quickInquiries: 'त्वरित प्रश्न:',
    catalogTitle: 'ब्रिक्स डिजिटल सार्वजनिक वस्तुएं (कैटलॉग)',
    catalogSubtitle: 'पेटेंट रॉयल्टी के बिना खुले डेटासेट, एल्गोरिदम और बीज किस्में',
    searchPlaceholder: 'सार्वजनिक संसाधन खोजें...',
    btnAccessAsset: 'संसाधन देखें',
    sandboxTitle: 'अंतर-संचालनीयता डेटा मानक (सैंडबॉक्स)',
    sandboxSubtitle: 'संयुक्त राष्ट्र एफएओ (FAO AgGateway) के अनुरूप मानक JSON-LD और GeoJSON स्कीमा।',

    // Footer
    footerTitle: 'ब्रिक्स एग्री-नेट · डिजिटल कृषि सार्वजनिक भलाई',
    footerSubtitle: 'टिकाऊ खाद्य सुरक्षा के लिए ब्रिक्स सहयोग · भारत · ब्राजील · रूस · चीन · दक्षिण अफ्रीका · ब्रिक्स+',
    footerFao: 'एफएओ (FAO) मानकों के अनुरूप',
    footerDevote: 'गूगल GenAI SDK (जेमिनी 3.8 फ्लैश) द्वारा संचालित · विश्व के 50 करोड़ अन्नदाताओं को समर्पित',
    footerSdgs: 'संयुक्त राष्ट्र एसडीजी 2 (भुखमरी उन्मूलन) · एसडीजी 13 (जलवायु कार्रवाई) · एसडीजी 17 (साझेदारी)',
  },

  zh: {
    // Header & Global
    initiativeBadge: '金砖国家农业网络倡议 (AgriN)',
    initiativeSubtitle: '面向气候韧性农业的可互操作数字公共基础设施',
    digitalPublicGood: '数字公共产品 (DPG)',
    geminiEngine: 'Gemini 3.8 Flash 引擎',
    networkNode: '金砖+ 合作网络',
    navAdvisories: '智能农事咨询',
    navDiagnostic: '农作物病害诊断实验室',
    navDataExchange: '金砖农业数据交换',
    btnPitchDeck: '路演文稿',
    btnPitchDeckJudges: '评委路演文稿',
    btnApiVerification: '技术验证',
    appTagline: '对地观测卫星遥感 · 土壤健康分析 · 多语种AI智能决策 · 跨国重大病虫害联防联控',

    // Agro-Advisory Engine
    engineCategory: '农业生态遥感监测',
    engineNode: 'BRICS AgriNet 枢纽',
    engineTitle: '实时本地化再生农业智能决策引擎',
    engineSubtitle: '融合 Sentinel-2 / Landsat 遥感卫星影像、土壤测土配方及未来7天气象预测，为中小农户量身定制低成本、高韧性的再生农事决策方案。',
    btnRefreshAdvisory: '生成智能农事建议',
    btnAnalyzingTelemetry: '正在解析遥感与土壤数据...',
    lblSelectRegion: '选择金砖国家农业生态区',
    cardSoilTitle: '土壤健康指标',
    cardSoilSubtitle: '实验室测土或原位传感器监测数据',
    btnDegraded: '退化土壤',
    btnReset: '重置',
    lblSoilPh: '土壤酸碱度 (pH)',
    lblOrganicCarbon: '有机碳含量 (OC %)',
    lblNitrogen: '有效氮 (N)',
    lblPhosphorus: '有效磷 (P)',
    lblPotassium: '有效钾 (K)',
    lblSoilTexture: '土壤质地',
    lblSoilMoisture: '土壤含水量',
    ocTargetInfo: '目标：利用生物炭和绿肥还田将有机碳恢复至 0.75% 以上。',
    cardSatelliteTitle: '卫星对地观测指数',
    lblMultiSpectral: '10米多光谱分辨率',
    lblNdvi: '植被归一化指数 (NDVI)',
    lblNdwi: '水分指数 (NDWI)',
    lblNdwiSub: '根区水分充盈度',
    lblSurfaceTemp: '地表温度 (LST)',
    lblSurfaceTempSub: '冠层边界层温度',
    lblCanopyStatus: '冠层长势：',
    cardClimateTitle: '气象预报与农业灾害预警',
    cardClimateSub: '7天高精度农业气象模型',
    lbl7DayRain: '未来7天累计降雨',
    climateAlertTitle: '区域农业气象预警',
    lblTargetCrop: '目标种植作物：',
    lblFarmSize: '地块规模：',
    riskLevel: '风险评级：',
    btnListenAdvisory: '语音播报农事建议',
    btnPauseAudio: '暂停播报',
    btnPrintBulletin: '打印农事专报',
    executiveDiagnosisTitle: '专家农艺诊断综述',
    secRegenCropTitle: '生态再生种植计划',
    lblIntercropping: '间作套种模式：',
    secLivingSoilTitle: '健康活土修复方案',
    lblOcIntervention: '有机质碳汇提升',
    lblBioInoculants: '推荐微生物菌剂',
    lblConditioner: '土壤调理与酸碱中和',
    lblIrrigation: '节水精量灌溉与保墒',
    secBricsTransferTitle: '金砖国家南南技术转移',
    lblSourceNation: '技术来源国：',
    secWeeklyScheduleTitle: '未来7天优先农事清单',

    // Diagnostic Lab
    diagCategory: '植物病理学与绿色防控',
    diagTitle: '农作物病虫害诊断与生物防治实验室',
    diagSubtitle: '基于 Gemini 3.8 Flash 多模态视觉推理，即时识别致病机理、感染阶段，并输出零化学残留的生物防治方案。直通金砖跨国检疫预警。',
    btnRunDiagnosis: '运行AI病理诊断',
    btnAnalyzingPathology: '正在识别叶片病斑...',
    cardPhotoTitle: '作物病株照片或典型标本',
    uploadPromptTitle: '点击上传病害叶片照片或启动相机拍摄',
    uploadPromptSub: '支持 JPG、PNG、WEBP 格式（20MB以内）',
    photoUploaded: '照片上传成功。点击可更换。',
    lblCropSpecies: '作物种类',
    lblFarmerSymptoms: '农户观察到的发病症状',
    symptomsPlaceholder: '例如：叶缘水渍状褪绿斑点、叶背霉层、茎秆枯萎、虫孔排泄物等...',
    btnResetSample: '重置为示例标本',
    testSuiteTitle: '金砖重大作物病害标本库',
    testSuiteSub: '一键快速诊断测试',
    lblConfidence: '置信度',
    lblPathogen: '病原类型：',
    lblInfectionStage: '侵染阶段：',
    lblPathologicalSigns: '确诊的病理表征：',
    lblBioRemedies: '生物农药与自然疗法',
    lblNonChemicalFirst: '优先绿色生物防治',
    lblRate: '使用剂量：',
    lblEmergencyIpm: '综合防治应急阈值（如预估减产 > 25%）',
    lblLongTermDefense: '种子与土壤长期健康防护',
    lblQuarantineTitle: '金砖国家跨国检疫与迁飞预警',
    lblActiveAlert: '重点迁飞监测走廊',
    lblPartnerNations: '受影响合作国家：',
    noDiagnosisTitle: '暂无诊断结果',
    noDiagnosisSub: '请从左侧标本库选取典型病害，或上传一张受害作物的清晰叶片近照启动诊断。',

    // Data Exchange & Public Goods
    dpgTheme: '主题：合作 (Cooperation)',
    dpgAlliance: '数字公共产品联盟认证',
    dpgTitle: 'BRICS AgriNet: 互联互通的农业数据与技术共享平台',
    dpgSubtitle: '连接中国农科院 (CAAS)、巴西农牧院 (EMBRAPA)、印度农业研究理事会 (ICAR)、俄罗斯多库恰耶夫土壤所等权威机构，共享种质模型与土壤碳汇数据。',
    dpgOpenBadge: '100% 开放共享数字公共产品',
    queryTerminalTitle: '金砖多边农业知识问答终端 (Gemini 3.8 Flash)',
    queryTerminalHeading: '咨询跨国农业技术适应性转移',
    queryTerminalDesc: '探寻金砖各国的先进实践（如中国耐盐碱海水稻、巴西热带土壤生物固氮、印度耐旱珍珠粟）如何在本土生态区推广。',
    btnQueryNetwork: '提问金砖智库',
    btnConsulting: '正在检索技术库...',
    quickInquiries: '常见咨询：',
    catalogTitle: '金砖农业数字公共产品目录',
    catalogSubtitle: '免除商业专利使用费的开放数据集、计算机视觉模型与种植蓝图',
    searchPlaceholder: '检索公共科技资源...',
    btnAccessAsset: '获取资源',
    sandboxTitle: '可互操作标准与 OpenAPI 沙箱',
    sandboxSubtitle: '遵循联合国粮农组织 (FAO AgGateway) 规范的标准 JSON-LD、GeoJSON 和 OpenAPI 数据格式。',

    // Footer
    footerTitle: 'BRICS AgriNet · 数字农业公共产品',
    footerSubtitle: '深化金砖农业合作，共筑全球粮食安全 · 中国 · 巴西 · 俄罗斯 · 印度 · 南非 · 金砖+',
    footerFao: '符合 FAO AgGateway 国际标准',
    footerDevote: '基于 Google GenAI SDK (Gemini 3.8 Flash) 构建 · 致敬全球5亿耕作在土地上的小农户',
    footerSdgs: '联合国可持续发展目标 SDG 2（零饥饿）· SDG 13（气候行动）· SDG 17（促进目标实现的伙伴关系）',
  },

  ar: {
    initiativeBadge: 'مبادرة بريكس الزراعية (AgriN)',
    initiativeSubtitle: 'البنية التحتية الرقمية العامة القابلة للتشغيل البيني للزراعة المقاومة للمناخ',
    digitalPublicGood: 'منفعة رقمية عامة',
    geminiEngine: 'محرك Gemini 3.8 Flash',
    networkNode: 'شبكة بريكس+',
    navAdvisories: 'الإرشادات الزراعية',
    navDiagnostic: 'مختبر تشخيص الأمراض',
    navDataExchange: 'تبادل بيانات بريكس',
    btnPitchDeck: 'العرض التقديمي',
    btnPitchDeckJudges: 'عرض الحكام',
    btnApiVerification: 'التحقق التقني',
    appTagline: 'رصد الأرض بالأقمار الصناعية · صحة التربة · إرشادات ذكاء اصطناعي متعددة اللغات · مكافحة الآفات العابرة للحدود',
    engineCategory: 'القياس الزراعي البيئي عن بعد',
    engineNode: 'عقدة BRICS AgriNet',
    engineTitle: 'محرك الإرشادات الزراعية التجديدية المترجمة فورياً',
    engineSubtitle: 'تقديم إرشادات زراعية تجديدية قائمة على البيانات لصغار المزارعين من خلال دمج صور الأقمار الصناعية، وتحليلات صحة التربة، وتوقعات المناخ لـ 7 أيام.',
    btnRefreshAdvisory: 'تحديث الإرشاد الذكي',
    btnAnalyzingTelemetry: 'جاري تحليل البيانات...',
    lblSelectRegion: 'اختر المنطقة الزراعية البيئية في بريكس',
    cardSoilTitle: 'مؤشرات صحة التربة',
    cardSoilSubtitle: 'فحوصات معملية أو قياسات المستشعرات',
    btnDegraded: 'متدهورة',
    btnReset: 'إعادة ضبط',
    lblSoilPh: 'درجة حموضة التربة (pH)',
    lblOrganicCarbon: 'الكربون العضوي (OC %)',
    lblNitrogen: 'النيتروجين (N)',
    lblPhosphorus: 'الفوسفور (P)',
    lblPotassium: 'البوتاسيوم (K)',
    lblSoilTexture: 'قوام التربة',
    lblSoilMoisture: 'الرطوبة',
    ocTargetInfo: 'الهدف: استعادة الكربون العضوي لأكثر من 0.75% عبر الفحم الحيوي والمحاصيل التغطوية.',
    cardSatelliteTitle: 'مؤشرات رصد الأرض بالأقمار الصناعية',
    lblMultiSpectral: 'دقة متعددة الأطياف 10 أمتار',
    lblNdvi: 'مؤشر الغطاء النباتي (NDVI)',
    lblNdwi: 'مؤشر المياه (NDWI)',
    lblNdwiSub: 'ترطيب منطقة الجذور',
    lblSurfaceTemp: 'حرارة السطح (LST)',
    lblSurfaceTempSub: 'حرارة طبقة المجموع الخضري',
    lblCanopyStatus: 'حالة الغطاء النباتي:',
    cardClimateTitle: 'التنبؤات الجوية وتنبيهات المناخ',
    cardClimateSub: 'نموذج الأرصاد الزراعية لمدة 7 أيام',
    lbl7DayRain: 'أمطار 7 أيام',
    climateAlertTitle: 'تنبيه مناخي إقليمي',
    lblTargetCrop: 'المحصول المستهدف:',
    lblFarmSize: 'المساحة:',
    riskLevel: 'مستوى المخاطر:',
    btnListenAdvisory: 'استمع للإرشاد (صوتي)',
    btnPauseAudio: 'إيقاف مؤقت',
    btnPrintBulletin: 'طباعة النشرة',
    executiveDiagnosisTitle: 'ملخص التشخيص الزراعي الميداني',
    secRegenCropTitle: 'خطة الزراعة التجديدية',
    lblIntercropping: 'نمط الزراعة المتداخلة:',
    secLivingSoilTitle: 'بروتوكول استعادة التربة الحية',
    lblOcIntervention: 'زيادة الكربون العضوي',
    lblBioInoculants: 'المخصبات الحيوية الموصى بها',
    lblConditioner: 'تحسين التربة ومعالجة الحموضة',
    lblIrrigation: 'الري الدقيق والاحتفاظ بالرطوبة',
    secBricsTransferTitle: 'نقل المعرفة بين دول بريكس',
    lblSourceNation: 'المصدر:',
    secWeeklyScheduleTitle: 'المهام ذات الأولوية لمدة 7 أيام',
    diagCategory: 'علم أمراض النبات والمكافحة الحيوية',
    diagTitle: 'مختبر تشخيص أمراض المحاصيل والمكافحة البيولوجية',
    diagSubtitle: 'التعرف الفوري على المسببات المرضية، وتحديد مرحلة الإصابة، وتقديم تركيبات عضوية 100% لمكافحة الآفات.',
    btnRunDiagnosis: 'بدء التشخيص الذكي',
    btnAnalyzingPathology: 'جاري فحص الأعراض...',
    cardPhotoTitle: 'صورة النبات أو عينة الفحص',
    uploadPromptTitle: 'انقر لتحميل صورة ورقة النبات أو التقاطها',
    uploadPromptSub: 'يدعم JPG و PNG و WEBP (أقل من 20 ميجابايت)',
    photoUploaded: 'تم تحميل الصورة بنجاح. انقر للاستبدال.',
    lblCropSpecies: 'نوع المحصول',
    lblFarmerSymptoms: 'الأعراض الملاحظة من المزارع',
    symptomsPlaceholder: 'صف البقع الورقية، الذبول، التغيرات اللونية أو مخلفات الآفات...',
    btnResetSample: 'إعادة ضبط للعينة',
    testSuiteTitle: 'مجموعة عينات أمراض المحاصيل في بريكس',
    testSuiteSub: 'اختبار تشخيصي بنقرة واحدة',
    lblConfidence: 'نسبة الدقة',
    lblPathogen: 'نوع العامل الممرض:',
    lblInfectionStage: 'مرحلة الإصابة:',
    lblPathologicalSigns: 'العلامات المرضية المؤكدة:',
    lblBioRemedies: 'العلاجات البيولوجية والتجديدية',
    lblNonChemicalFirst: 'أولوية البدائل غير الكيميائية',
    lblRate: 'المعدل والجرعة:',
    lblEmergencyIpm: 'حد التدخل الطارئ (في حال تهديد المحصول > 25%)',
    lblLongTermDefense: 'حماية التربة والبذور على المدى الطويل',
    lblQuarantineTitle: 'حالة الحجر الزراعي عبر حدود بريكس',
    lblActiveAlert: 'ممر إنذار نشط',
    lblPartnerNations: 'الدول الشريكة المراقبة:',
    noDiagnosisTitle: 'لا يوجد تشخيص نشط حالياً',
    noDiagnosisSub: 'اختر مرضاً من العينات التجريبية على اليسار أو ارفع صورة ورقة مصابة لتشغيل التحليل عبر Gemini 3.8 Flash.',
    dpgTheme: 'الموضوع: التعاون',
    dpgAlliance: 'تحالف المنافع الرقمية العامة',
    dpgTitle: 'BRICS AgriNet: منصة تبادل البيانات والمعارف الزراعية القابلة للتشغيل البيني',
    dpgSubtitle: 'بنية رقمية مفتوحة تربط معاهد البحوث الزراعية لمشاركة نماذج البذور المقاومة، وبيانات الكربون، وخوارزميات الأقمار الصناعية.',
    dpgOpenBadge: 'منفعة رقمية عامة 100%',
    queryTerminalTitle: 'محطة استعلامات بريكس المعرفية المشتركة (Gemini 3.8 Flash)',
    queryTerminalHeading: 'الاستفسار عن نقل المعرفة الزراعية عبر الحدود',
    queryTerminalDesc: 'تعرف على كيفية تكييف الممارسات الزراعية المستدامة في دول بريكس لتلائم منطقتك البيئية الزراعية.',
    btnQueryNetwork: 'استعلام من الشبكة',
    btnConsulting: 'جاري استشارة الشبكة...',
    quickInquiries: 'استفسارات سريعة:',
    catalogTitle: 'دليل المنافع الرقمية العامة لدول بريكس',
    catalogSubtitle: 'قواعد بيانات ونماذج محاصيل مفتوحة ومتاحة دون رسوم ملكية فكرية',
    searchPlaceholder: 'البحث في المنافع العامة...',
    btnAccessAsset: 'الوصول للمورد',
    sandboxTitle: 'بيئة اختبار المعايير والمخططات القابلة للتشغيل البيني',
    sandboxSubtitle: 'مخططات JSON-LD و GeoJSON و OpenAPI المتوافقة مع معايير FAO AgGateway.',
    footerTitle: 'BRICS AgriNet · منفعة عامة رقمية للزراعة',
    footerSubtitle: 'التعاون من أجل إنتاج غذائي مستدام · البرازيل · روسيا · الهند · الصين · جنوب أفريقيا · بريكس+',
    footerFao: 'متوافق مع منظمة الأغذية والزراعة (FAO AgGateway)',
    footerDevote: 'تم التطوير باستخدام Google GenAI SDK (Gemini 3.8 Flash) · مهداة إلى 500+ مليون مزارع حول العالم',
    footerSdgs: 'أهداف التنمية المستدامة للأمم المتحدة: الهدف 2 (القضاء على الجوع) · الهدف 13 (العمل المناخي) · الهدف 17 (الشراكات)',
  },

  sw: {
    initiativeBadge: 'Mpango wa Kilimo wa BRICS (AgriN)',
    initiativeSubtitle: 'Miundombinu ya Dijitali ya Umma kwa Kilimo Chenye Ustahimilivu wa Hali ya Hewa',
    digitalPublicGood: 'Manufaa ya Dijitali ya Umma',
    geminiEngine: 'Injini ya Gemini 3.8 Flash',
    networkNode: 'Mtandao wa BRICS+',
    navAdvisories: 'Ushauri wa Kilimo',
    navDiagnostic: 'Maabara ya Magonjwa ya Mimea',
    navDataExchange: 'Ubadilishanaji Data BRICS',
    btnPitchDeck: 'Wasifu wa Mradi (Pitch Deck)',
    btnPitchDeckJudges: 'Wasifu kwa Waamuzi',
    btnApiVerification: 'Uthibitishaji wa Kiufundi',
    appTagline: 'Uchunguzi wa Satelaiti · Afya ya Udongo · Ushauri wa AI wa Lugha Nyingi · Ulinzi wa Magonjwa Mpakani',
    engineCategory: 'Takwimu za Satelaiti za Kilimo',
    engineNode: 'Kituo cha BRICS AgriNet',
    engineTitle: 'Injini ya Ushauri wa Kilimo Endelevu cha Kisasa',
    engineSubtitle: 'Kutoa mwongozo wa kilimo endelevu kwa wakulima wadogo kwa kuunganisha picha za satelaiti za Sentinel-2/Landsat, vipimo vya udongo, na utabiri wa hali ya hewa wa siku 7.',
    btnRefreshAdvisory: 'Sasisha Ushauri wa AI',
    btnAnalyzingTelemetry: 'Inachambua Takwimu...',
    lblSelectRegion: 'Chagua Ukanda wa Kilimo wa BRICS',
    cardSoilTitle: 'Vipimo vya Afya ya Udongo',
    cardSoilSubtitle: 'Vipimo vya maabara au vifaa vya shambani',
    btnDegraded: 'Udongo Dhaifu',
    btnReset: 'Rudisha',
    lblSoilPh: 'Kiwango cha Asidi (pH)',
    lblOrganicCarbon: 'Kaboni Hai (OC %)',
    lblNitrogen: 'Nitrojeni (N)',
    lblPhosphorus: 'Fosforasi (P)',
    lblPotassium: 'Potasiamu (K)',
    lblSoilTexture: 'Muundo wa Udongo',
    lblSoilMoisture: 'Unyevu wa Udongo',
    ocTargetInfo: 'Lengo: Kuongeza kaboni hai kufikia zaidi ya 0.75% kupitia mboji na mimea ya kufunika.',
    cardSatelliteTitle: 'Fahirisi za Satelaiti za Dunia',
    lblMultiSpectral: 'Ubora wa Satelaiti mita 10',
    lblNdvi: 'Kiwango cha Uoto wa Kijani (NDVI)',
    lblNdwi: 'Kiwango cha Maji ya Mimea (NDWI)',
    lblNdwiSub: 'Unyevu kwenye eneo la mizizi',
    lblSurfaceTemp: 'Joto la Udongo (LST)',
    lblSurfaceTempSub: 'Kiwango cha joto shambani',
    lblCanopyStatus: 'Hali ya Majani:',
    cardClimateTitle: 'Utabiri wa Hewa na Maonyo',
    cardClimateSub: 'Mfumo wa Hali ya Hewa wa Siku 7',
    lbl7DayRain: 'Mvua ya siku 7',
    climateAlertTitle: 'Tahadhari ya Hali ya Hewa Eneo Husika',
    lblTargetCrop: 'Zao Lengwa:',
    lblFarmSize: 'Ukubwa wa Shamba:',
    riskLevel: 'Kiwango cha Hatari:',
    btnListenAdvisory: 'Sikiliza Ushauri (Sauti)',
    btnPauseAudio: 'Sitisha Sauti',
    btnPrintBulletin: 'Chapisha Ripoti',
    executiveDiagnosisTitle: 'Uchambuzi wa Kitaalamu wa Kilimo',
    secRegenCropTitle: 'Mpango wa Kilimo cha Kurejesha Rutuba',
    lblIntercropping: 'Mfumo wa Kilimo Mseto:',
    secLivingSoilTitle: 'Mpango wa Kufufua Udongo Uliohai',
    lblOcIntervention: 'Uongezaji wa Kaboni Hai',
    lblBioInoculants: 'Mbolea za Kibiolojia Zinazopendekezwa',
    lblConditioner: 'Kuboresha Udongo na Kurekebisha pH',
    lblIrrigation: 'Umwagiliaji Makini na Uhifadhi Maji',
    secBricsTransferTitle: 'Ushirikiano wa Kusini-Kusini wa BRICS',
    lblSourceNation: 'Nchi Chanzo:',
    secWeeklyScheduleTitle: 'Kazi Kuu za Siku 7 Zijazo',
    diagCategory: 'Patholojia ya Mimea na Udhibiti wa Kibiolojia',
    diagTitle: 'Maabara ya Utambuzi wa Magonjwa na Dawa Asilia',
    diagSubtitle: 'Utambuzi wa haraka wa vimelea vya magonjwa, hatua ya maambukizi, na fomula 100% za asili zisizo na kemikali zenye madhara.',
    btnRunDiagnosis: 'Fanya Utambuzi wa AI',
    btnAnalyzingPathology: 'Inachambua Ugonjwa...',
    cardPhotoTitle: 'Picha ya Mmea au Mfano wa Kesi',
    uploadPromptTitle: 'Bofya kupakia picha ya jani au piga picha',
    uploadPromptSub: 'Inakubali JPG, PNG, WEBP (chini ya 20MB)',
    photoUploaded: 'Picha imepakiwa. Bofya kubadilisha.',
    lblCropSpecies: 'Aina ya Zao',
    lblFarmerSymptoms: 'Dalili Zilizoonekana Shambani',
    symptomsPlaceholder: 'Eleza madoa ya majani, kunyauka, mabadiliko ya rangi au wadudu...',
    btnResetSample: 'Rudisha Mfano',
    testSuiteTitle: 'Mkusanyiko wa Magonjwa ya Mazao ya BRICS',
    testSuiteSub: 'Kipimo cha Haraka cha Mbofyo Mmoja',
    lblConfidence: 'Uhakika',
    lblPathogen: 'Aina ya Kimelea:',
    lblInfectionStage: 'Hatua ya Maambukizi:',
    lblPathologicalSigns: 'Dalili Zilizothibitishwa:',
    lblBioRemedies: 'Tiba za Asili na Kibiolojia',
    lblNonChemicalFirst: 'Kipaumbele Bila Kemikali',
    lblRate: 'Kiwango cha Kutumia:',
    lblEmergencyIpm: 'Kiwango cha Dharura (Kama hasara inazidi 25%)',
    lblLongTermDefense: 'Ulinzi wa Muda Mrefu wa Mbegu na Udongo',
    lblQuarantineTitle: 'Hali ya Karantini ya Mipaka ya BRICS',
    lblActiveAlert: 'Ukanda wa Tahadhari Uliopo',
    lblPartnerNations: 'Nchi Washirika Zinazofuatiliwa:',
    noDiagnosisTitle: 'Bado Hakuna Utambuzi',
    noDiagnosisSub: 'Chagua mfano wa ugonjwa upande wa kushoto au pakia picha ya jani ili kuanza uchambuzi wa Gemini 3.8 Flash.',
    dpgTheme: 'Mada: Ushirikiano',
    dpgAlliance: 'Muungano wa Manufaa ya Dijitali ya Umma',
    dpgTitle: 'BRICS AgriNet: Ubadilishanaji wa Data na Maarifa ya Kilimo',
    dpgSubtitle: 'Mfumo wazi wa kidijitali unaounganisha taasisi za utafiti wa kilimo kushiriki mifano ya mbegu, kaboni ya udongo na satelaiti.',
    dpgOpenBadge: 'Manufaa Huria 100% (DPG)',
    queryTerminalTitle: 'Kituo cha Maswali ya Pamoja cha BRICS (Gemini 3.8 Flash)',
    queryTerminalHeading: 'Uliza Kuhusu Uhamishaji wa Teknolojia za Kilimo',
    queryTerminalDesc: 'Jifunze jinsi mifumo bora ya kilimo kutoka nchi za BRICS inavyoweza kutumika katika ukanda wako wa kilimo.',
    btnQueryNetwork: 'Uliza AgriNet',
    btnConsulting: 'Inachakata...',
    quickInquiries: 'Maswali ya Haraka:',
    catalogTitle: 'Orodha ya Manufaa ya Dijitali ya Umma ya BRICS',
    catalogSubtitle: 'Mifumo ya data wazi na algoriti bila tozo za hataza',
    searchPlaceholder: 'Tafuta rasilimali za umma...',
    btnAccessAsset: 'Pata Rasilimali',
    sandboxTitle: 'Viwango vya Mifumo ya Pamoja (Sandbox)',
    sandboxSubtitle: 'Mifumo ya JSON-LD, GeoJSON na OpenAPI inayozingatia miongozo ya FAO AgGateway.',
    footerTitle: 'BRICS AgriNet · Manufaa ya Dijitali ya Umma kwa Kilimo',
    footerSubtitle: 'Ushirikiano kwa Uzalishaji Endelevu wa Chakula · Brazil · Urusi · India · China · Afrika Kusini · BRICS+',
    footerFao: 'Inakidhi Viwango vya FAO AgGateway',
    footerDevote: 'Imejengwa kwa Google GenAI SDK (Gemini 3.8 Flash) · Imejitolea kwa wakulima wadogo zaidi ya milioni 500 duniani kote',
    footerSdgs: 'Malengo ya Maendeleo Endelevu ya UN: SDG 2 (Kutokomeza Njaa) · SDG 13 (Hali ya Hewa) · SDG 17 (Ushirikiano)',
  },

  te: {
    // Header & Global
    initiativeBadge: 'బ్రిక్స్ అగ్రి-నెట్ (AgriN) చొరవ',
    initiativeSubtitle: 'వాతావరణ-అనుకూల స్థిరమైన వ్యవసాయం కోసం డిజిటల్ పబ్లిక్ ఇన్ఫ్రాస్ట్రక్చర్',
    digitalPublicGood: 'డిజిటల్ పబ్లిక్ గుడ్ (ప్రజా ప్రయోజనం)',
    geminiEngine: 'జెమిని 3.8 ఫ్లాష్ ఇంజిన్',
    networkNode: 'బ్రిక్స్+ నెట్‌వర్క్',
    navAdvisories: 'వ్యవసాయ సలహాలు',
    navDiagnostic: 'పంట తెగుళ్ల నిర్ధారణ ల్యాబ్',
    navDataExchange: 'బ్రిక్స్ డేటా ఎక్స్ఛేంజ్',
    btnPitchDeck: 'పిచ్ డెక్',
    btnPitchDeckJudges: 'న్యాయనిర్ణేతల కోసం పిచ్ డెక్',
    btnApiVerification: 'సాంకేతిక ధృవీకరణ',
    appTagline: 'ఉపగ్రహ రిమోట్ సెన్సింగ్ · నేల ఆరోగ్యం · బహుభాషా ఏఐ సలహాలు · సరిహద్దు దాటే తెగుళ్ల రక్షణ',

    // Agro-Advisory Engine
    engineCategory: 'వ్యవసాయ-పర్యావరణ టెలిమెట్రీ',
    engineNode: 'బ్రిక్స్ అగ్రి-నెట్ నోడ్',
    engineTitle: 'రియల్-టైమ్ స్థానికీకరించిన సహజ వ్యవసాయ సలహాలు',
    engineSubtitle: 'సెంటినెల్-2 / ల్యాండ్‌శాట్ ఉపగ్రహ చిత్రాలు, నేల పరీక్షలు మరియు 7-రోజుల వాతావరణ సూచనలను కలిపి చిన్న మరియు సన్నకారు రైతులకు డేటా ఆధారిత సాగు సలహాలు.',
    btnRefreshAdvisory: 'ఏఐ సలహాలను పొందండి',
    btnAnalyzingTelemetry: 'డేటా విశ్లేషించబడుతోంది...',
    lblSelectRegion: 'బ్రిక్స్ వ్యవసాయ-పర్యావరణ ప్రాంతాన్ని ఎంచుకోండి',
    cardSoilTitle: 'నేల ఆరోగ్య సూచికలు',
    cardSoilSubtitle: 'ప్రయోగశాల పరీక్ష లేదా సెన్సార్ ప్రోబ్ టెలిమెట్రీ',
    btnDegraded: 'సారహీనమైన నేల',
    btnReset: 'రీసెట్ చేయండి',
    lblSoilPh: 'నేల పి.హెచ్ (pH)',
    lblOrganicCarbon: 'సేంద్రీయ కర్బనం (OC %)',
    lblNitrogen: 'నత్రజని (N)',
    lblPhosphorus: 'భాస్వరం (P)',
    lblPotassium: 'పొటాష్ (K)',
    lblSoilTexture: 'నేల స్వభావం',
    lblSoilMoisture: 'తేమ శాతం',
    ocTargetInfo: 'లక్ష్యం: బయోచార్ మరియు పచ్చిరొట్ట ఎరువులతో సేంద్రీయ కర్బనాన్ని 0.75% పైకి పెంచడం.',
    cardSatelliteTitle: 'ఉపగ్రహ భూ పరిశీలన సూచికలు',
    lblMultiSpectral: '10 మీటర్ల మల్టీ-స్పెక్ట్రల్',
    lblNdvi: 'పంట పచ్చదనం సూచిక (NDVI)',
    lblNdwi: 'పంట తేమ సూచిక (NDWI)',
    lblNdwiSub: 'వేరు మండలంలో తేమ నిల్వ',
    lblSurfaceTemp: 'నేల ఉపరితల ఉష్ణోగ్రత (LST)',
    lblSurfaceTempSub: 'పంట ఆకుల ఉష్ణోగ్రత',
    lblCanopyStatus: 'పంట పెరుగుదల స్థితి:',
    cardClimateTitle: 'వాతావరణ సూచన మరియు హెచ్చరికలు',
    cardClimateSub: '7-రోజుల వ్యవసాయ-వాతావరణ నమూనా',
    lbl7DayRain: '7 రోజుల్లో వర్షపాతం',
    climateAlertTitle: 'ప్రాంతీయ వాతావరణ హెచ్చరిక',
    lblTargetCrop: 'ప్రధాన పంట:',
    lblFarmSize: 'భూమి విస్తీర్ణం:',
    riskLevel: 'ప్రమాద స్థాయి:',
    btnListenAdvisory: 'సలహాను వినండి (ఆడియో)',
    btnPauseAudio: 'ఆడియో ఆపండి',
    btnPrintBulletin: 'బులిటెన్ ప్రింట్ చేయండి',
    executiveDiagnosisTitle: 'నిపుణుల వ్యవసాయ నిర్ధారణ సారాంశం',
    secRegenCropTitle: 'సహజ పునరుజ్జీవన పంట ప్రణాళిక',
    lblIntercropping: 'అంతర పంటల విధానం:',
    secLivingSoilTitle: 'జీవమున్న నేల పునరుద్ధరణ ప్రోటోకాల్',
    lblOcIntervention: 'సేంద్రీయ కర్బన పెంపుదల',
    lblBioInoculants: 'సిఫార్సు చేయబడిన జీవ ఎరువులు',
    lblConditioner: 'నేల కండిషనింగ్ & pH సర్దుబాటు',
    lblIrrigation: 'ఖచ్చితమైన నీటి యాజమాన్యం & తేమ నిల్వ',
    secBricsTransferTitle: 'బ్రిక్స్ దేశాల పరస్పర విజ్ఞాన బదిలీ',
    lblSourceNation: 'మూల దేశం:',
    secWeeklyScheduleTitle: 'రాబోయే 7 రోజుల ముఖ్యమైన వ్యవసాయ పనులు',

    // Diagnostic Lab
    diagCategory: 'మొక్కల వ్యాధి శాస్త్రం & జీవ నియంత్రణ',
    diagTitle: 'పంట తెగుళ్ల నిర్ధారణ & జీవ నియంత్రణ ప్రయోగశాల',
    diagSubtitle: 'జెమిని 3.8 ఫ్లాష్ ఆధారంగా తెగులు గుర్తింపు, సంక్రమణ దశ మరియు 100% సేంద్రీయ బయో-పురుగుమందుల తయారీ విధానాలు. బ్రిక్స్ సరిహద్దు క్వారంటైన్ హెచ్చరికలతో అనుసంధానించబడింది.',
    btnRunDiagnosis: 'ఏఐ వ్యాధి నిర్ధారణ చేయండి',
    btnAnalyzingPathology: 'వ్యాధి లక్షణాలను విశ్లేషిస్తోంది...',
    cardPhotoTitle: 'మొక్క ఆకు ఫోటో లేదా నమూనా పరీక్ష',
    uploadPromptTitle: 'ఆకు ఫోటోను అప్‌లోడ్ చేయండి లేదా కెమెరా ఆన్ చేయండి',
    uploadPromptSub: 'JPG, PNG, WEBP ఫార్మాట్లు (20MB లోపు)',
    photoUploaded: 'ఫోటో అప్‌లోడ్ చేయబడింది. మార్చడానికి క్లిక్ చేయండి.',
    lblCropSpecies: 'పంట రకం',
    lblFarmerSymptoms: 'రైతు గమనించిన లక్షణాలు',
    symptomsPlaceholder: 'ఆకులపై మచ్చలు, పసుపు రంగులోకి మారడం, వాడిపోవడం లేదా పురుగు మలమూత్రాల గురించి వివరించండి...',
    btnResetSample: 'నమూనాకు రీసెట్ చేయండి',
    testSuiteTitle: 'బ్రిక్స్ ప్రధాన పంట తెగుళ్ల పరీక్ష గ్యాలరీ',
    testSuiteSub: 'ఒక్క క్లిక్‌తో తక్షణ నిర్ధారణ',
    lblConfidence: 'ఖచ్చితత్వం (విశ్వసనీయత)',
    lblPathogen: 'వ్యాధికారకం:',
    lblInfectionStage: 'సంక్రమణ దశ:',
    lblPathologicalSigns: 'నిర్ధారించబడిన లక్షణాలు:',
    lblBioRemedies: 'సహజసిద్ధ జీవ నివారణలు',
    lblNonChemicalFirst: 'రసాయన రహిత ప్రాధాన్యత',
    lblRate: 'వాడాల్సిన మోతాదు:',
    lblEmergencyIpm: 'అత్యవసర రసాయన పరిమితి (దిగుబడి నష్టం > 25% ఉంటేనే)',
    lblLongTermDefense: 'దీర్ఘకాలిక విత్తన & నేల సంరక్షణ',
    lblQuarantineTitle: 'బ్రిక్స్ సరిహద్దు క్వారంటైన్ స్థితి',
    lblActiveAlert: 'చురుకైన హెచ్చరిక కారిడార్',
    lblPartnerNations: 'పర్యవేక్షణలో ఉన్న దేశాలు:',
    noDiagnosisTitle: 'ఇంకా ఎటువంటి వ్యాధి నిర్ధారణ జరగలేదు',
    noDiagnosisSub: 'ఎడమవైపు నమూనా వ్యాధులలో ఒకదాన్ని ఎంచుకోండి లేదా మీ పంట ఆకు ఫోటోను అప్‌లోడ్ చేయండి లేదా మైక్రోఫోన్ ద్వారా మాట్లాడండి.',
    micStart: 'వాయిస్ ద్వారా చెప్పండి (మైక్)',
    micStop: 'రికార్డింగ్ ఆపండి',
    micListening: 'వింటున్నాము... పంట లక్షణాలు చెప్పండి',
    micUnsupported: 'ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు. దయచేసి Chrome లేదా Safari వాడండి.',
    micPermissionDenied: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి.',

    // Data Exchange & Public Goods
    dpgTheme: 'థీమ్: సహకారం (Cooperation)',
    dpgAlliance: 'డిజిటల్ పబ్లిక్ గూడ్స్ అలయన్స్',
    dpgTitle: 'BRICS AgriNet: డేటా మరియు విజ్ఞాన మార్పిడి వేదిక',
    dpgSubtitle: 'పరిశోధనా సంస్థల (ICAR, EMBRAPA, CAAS, Dokuchaev, ARC) మధ్య విత్తన జన్యు నమూనాలు, నేల కార్బన్ రిజిస్ట్రీలు మరియు ఉపగ్రహ అల్గариథమ్‌లను పంచుకునే బహిరంగ డిజిటల్ ప్లాట్‌ఫారమ్.',
    dpgOpenBadge: '100% ఉచిత ఓపెన్ యాక్సెస్ DPG',
    queryTerminalTitle: 'బ్రిక్స్ సమగ్ర విజ్ఞాన టెర్మినల్ (జెమిని 3.8 ఫ్లాష్)',
    queryTerminalHeading: 'సరిహద్దు వ్యవసాయ సాంకేతిక బదిలీపై ప్రశ్నలు అడగండి',
    queryTerminalDesc: 'బ్రెజిల్ లేదా చైనా దేశాల్లో విజయవంతమైన వ్యవసాయ పద్ధతులు మన నేలలకు ఎలా సరిపోతాయో అడగండి.',
    btnQueryNetwork: 'నెట్‌వర్క్‌ను ప్రశ్నించండి',
    btnConsulting: 'పరిశీలిస్తోంది...',
    quickInquiries: 'తరచూ అడిగే ప్రశ్నలు:',
    catalogTitle: 'బ్రిక్స్ డిజిటల్ పబ్లిక్ గూడ్స్ కేటలాగ్',
    catalogSubtitle: 'పేటెంట్ రాయల్టీలు లేని బహిరంగ డేటాసెట్లు, అల్గారిథమ్‌లు మరియు వంగడాలు',
    searchPlaceholder: 'ప్రజా వనరులను వెతకండి...',
    btnAccessAsset: 'వనరును పొందండి',
    sandboxTitle: 'ఇంటర్‌ఆపరబిలిటీ డేటా ప్రమాణాలు (శాండ్‌బాక్స్)',
    sandboxSubtitle: 'UN FAO AgGateway కి అనుగుణంగా ప్రామాణిక JSON-LD, GeoJSON మరియు OpenAPI ఫార్మాట్లు.',

    // Footer
    footerTitle: 'BRICS AgriNet · డిజిటల్ వ్యవసాయ ప్రజా ప్రయోజనం',
    footerSubtitle: 'స్థిరమైన ఆహార భద్రత కోసం బ్రిక్స్ సహకారం · బ్రెజిల్ · రష్యా · భారతదేశం · చైనా · దక్షిణాఫ్రికా · బ్రిక్స్+',
    footerFao: 'FAO AgGateway ప్రమాణాలకు అనుగుణమైనది',
    footerDevote: 'గూగుల్ GenAI SDK (జెమిని 3.8 ఫ్లాష్) తో నిర్మించబడింది · ప్రపంచవ్యాప్తంగా 50 కోట్ల రైతులకు అంకితం',
    footerSdgs: 'ఐక్యరాజ్యసమితి SDG 2 (ఆకలి నిర్మూలన) · SDG 13 (వాతావరణ చర్య) · SDG 17 (భాగస్వామ్యాలు)',

    // ROI Simulator & Pitch Deck
    roiSimTitle: 'రైతు సంఘాల ROI మరియు ప్రభావ స్కేల్ సిమ్యులేటర్',
    roiSimSubtitle: 'ప్రాంతీయ ఆర్థిక మరియు పర్యావరణ పొదుపులను లెక్కించడానికి సాగు విస్తీర్ణాన్ని సర్దుబాటు చేయండి',
    lblTotalLand: 'మొత్తం క్లస్టర్ సాగు విస్తీర్ణం',
    lblHectares: 'హెక్టార్లు',
    lblSmallholdersInCluster: 'క్లస్టర్‌లోని చిన్నకారు రైతులు',
    lblFarmers: 'రైతులు',
    lblAvgLandholding: 'సగటు భూమి పరిమాణం',
    lblFarmer: 'రైతు',
    lblChemicalSavings: 'రసాయన ఎరువులు & పురుగుమందుల ఖర్చు ఆదా',
    lblYear: 'సంవత్సరానికి',
    lblChemicalSavingsDesc: 'హెక్టారుకు $85 చొప్పున రసాయన పురుగుమందులు మరియు యూరియా ఖర్చును తగ్గిస్తుంది.',
    lblGroundwaterConserved: 'భూగర్భ జలాల ఆదా',
    lblLiters: 'లీటర్లు',
    lblGroundwaterConservedDesc: 'సెన్సార్లు మరియు బయోచార్ ద్వారా నేలలో తేమ నిలుపుదల చేసి నీటిని ఆదా చేస్తుంది.',
    lblCarbonInsetting: 'కర్బన ఉద్గార తగ్గింపు',
    lblCarbonInsettingDesc: 'రైతు సంఘాల ద్వారా కార్బన్ క్రెడిట్లకు అర్హత పొందే నేల సేంద్రీయ కర్బన నిల్వ.',
    btnPrevSlide: 'మునుపటి స్లైడ్',
    btnNextSlide: 'తదుపరి స్లైడ్',
    btnReturnToApp: 'యాప్‌కి తిరిగి వెళ్లండి',

    // Offline & Network
    lblOfflineFieldCache: 'ఆఫ్‌లైన్ ఫీల్డ్ కాష్',
    bannerOfflineDiag: 'ఆఫ్‌లైన్ నిర్ధారణ మోడ్ (కాష్ చేయబడిన నిపుణుల నిబంధనలు)',
    bannerOfflineDiagDesc: 'ముందుగా కాష్ చేయబడిన బ్రిక్స్ వ్యవసాయ డేటాసెట్లు మరియు ఆఫ్‌లైన్ నమూనాల ఆధారంగా పనిచేస్తోంది.',
    lblNetworkConnected: 'ఆన్‌లైన్ (కాష్ చేయబడింది)',
    lblNetworkOffline: 'ఆఫ్‌లైన్ మోడ్ (లోకల్ స్టోరేజ్)',

    // Weather Alerts
    lblEmergencyAlert: 'అత్యవసర హెచ్చరిక',
    lblOnset: 'ప్రారంభం',
    lblExpectedRainfall: 'అంచనా వేసిన వర్షపాతం',
    lblPeakTemp: 'గరిష్ట ఉష్ణోగ్రత',
    lblSoilSaturation: 'నేల సంతృప్తత (తేమ)',
    lblWindSpeed: 'గాలి వేగం',
    lblImmediateCountermeasures: 'తక్షణ రక్షణ చర్యలు & జాగ్రత్తలు',
  },
};

/**
 * Translation helper function
 */
export function t(key: keyof typeof translations.en, lang: BricsLanguage): string {
  const langTranslations = (translations as any)[lang] || translations.en;
  return langTranslations[key] || translations.en[key] || String(key);
}

/**
 * Translate Crop Name dynamically
 */
export function translateCropName(crop: string, lang: BricsLanguage): string {
  if (!crop) return crop;
  if (lang === 'te') {
    return crop
      .replace(/Wheat/gi, 'గోధుమ')
      .replace(/Rice/gi, 'వరి')
      .replace(/Soybean/gi, 'సోయాబీన్')
      .replace(/Maize/gi, 'మొక్కజొన్న')
      .replace(/Cotton/gi, 'పత్తి')
      .replace(/Sorghum/gi, 'జొన్న')
      .replace(/Pearl Millet/gi, 'సజ్జలు')
      .replace(/Chickpea/gi, 'శనగలు')
      .replace(/Sunflower/gi, 'పొద్దుతిరుగుడు')
      .replace(/Sugarcane/gi, 'చెరకు');
  }
  if (lang === 'hi') {
    return crop
      .replace(/Wheat/gi, 'गेहूं')
      .replace(/Rice/gi, 'धान / चावल')
      .replace(/Soybean/gi, 'सोयाबीन')
      .replace(/Maize/gi, 'मक्का')
      .replace(/Cotton/gi, 'कपास')
      .replace(/Sorghum/gi, 'ज्वार')
      .replace(/Pearl Millet/gi, 'बाजरा')
      .replace(/Chickpea/gi, 'चना')
      .replace(/Sunflower/gi, 'सूरजमुखी')
      .replace(/Sugarcane/gi, 'गन्ना');
  }
  if (lang === 'pt') {
    return crop
      .replace(/Wheat/gi, 'Trigo')
      .replace(/Rice/gi, 'Arroz')
      .replace(/Soybean/gi, 'Soja')
      .replace(/Maize/gi, 'Milho')
      .replace(/Cotton/gi, 'Algodão')
      .replace(/Sorghum/gi, 'Sorgo')
      .replace(/Sugarcane/gi, 'Cana-de-açúcar');
  }
  if (lang === 'ru') {
    return crop
      .replace(/Wheat/gi, 'Пшеница')
      .replace(/Rice/gi, 'Рис')
      .replace(/Soybean/gi, 'Соя')
      .replace(/Maize/gi, 'Кукуруза')
      .replace(/Sunflower/gi, 'Подсолнечник')
      .replace(/Sorghum/gi, 'Сорго');
  }
  if (lang === 'zh') {
    return crop
      .replace(/Wheat/gi, '小麦')
      .replace(/Rice/gi, '水稻')
      .replace(/Soybean/gi, '大豆')
      .replace(/Maize/gi, '玉米')
      .replace(/Cotton/gi, '棉花')
      .replace(/Sorghum/gi, '高粱');
  }
  if (lang === 'ar') {
    return crop
      .replace(/Wheat/gi, 'القمح')
      .replace(/Rice/gi, 'الأرز')
      .replace(/Soybean/gi, 'فول الصويا')
      .replace(/Maize/gi, 'الذرة')
      .replace(/Cotton/gi, 'القطن');
  }
  if (lang === 'sw') {
    return crop
      .replace(/Wheat/gi, 'Ngano')
      .replace(/Rice/gi, 'Mpunga')
      .replace(/Soybean/gi, 'Soya')
      .replace(/Maize/gi, 'Mahindi')
      .replace(/Cotton/gi, 'Pamba')
      .replace(/Sorghum/gi, 'Mtama');
  }
  return crop;
}

/**
 * Translate Pathogen Type
 */
export function translatePathogenType(type: string, lang: BricsLanguage): string {
  if (!type) return type;
  if (lang === 'te') {
    return type
      .replace(/Fungal Pathogen/gi, 'శిలీంధ్ర వ్యాధికారకం (Fungal)')
      .replace(/Bacterial Pathogen/gi, 'బాక్టీరియల్ వ్యాధికారకం (Bacterial)')
      .replace(/Viral Pathogen/gi, 'వైరల్ వ్యాధికారకం (Viral)')
      .replace(/Insect Pest Larvae/gi, 'కీటక లార్వా (Pest)');
  }
  if (lang === 'hi') {
    return type
      .replace(/Fungal Pathogen/gi, 'कवक जनित रोग (Fungal)')
      .replace(/Bacterial Pathogen/gi, 'जीवाणु जनित रोग (Bacterial)')
      .replace(/Viral Pathogen/gi, 'विषाणु जनित रोग (Viral)')
      .replace(/Insect Pest Larvae/gi, 'कीट लार्वा (Pest)');
  }
  if (lang === 'pt') {
    return type
      .replace(/Fungal Pathogen/gi, 'Patógeno Fúngico')
      .replace(/Bacterial Pathogen/gi, 'Patógeno Bacteriano')
      .replace(/Viral Pathogen/gi, 'Patógeno Viral')
      .replace(/Insect Pest Larvae/gi, 'Larva de Inseto Praga');
  }
  if (lang === 'ru') {
    return type
      .replace(/Fungal Pathogen/gi, 'Грибковый патоген')
      .replace(/Bacterial Pathogen/gi, 'Бактериальный патоген')
      .replace(/Viral Pathogen/gi, 'Вирусный патоген')
      .replace(/Insect Pest Larvae/gi, 'Личинка вредителя');
  }
  if (lang === 'zh') {
    return type
      .replace(/Fungal Pathogen/gi, '真菌病原体')
      .replace(/Bacterial Pathogen/gi, '细菌病原体')
      .replace(/Viral Pathogen/gi, '病毒病原体')
      .replace(/Insect Pest Larvae/gi, '害虫幼虫危害');
  }
  if (lang === 'ar') {
    return type
      .replace(/Fungal Pathogen/gi, 'فطر ممرض')
      .replace(/Bacterial Pathogen/gi, 'بكتيريا ممرضة')
      .replace(/Viral Pathogen/gi, 'فيروس ممرض')
      .replace(/Insect Pest Larvae/gi, 'يرقة حشرية ضارة');
  }
  if (lang === 'sw') {
    return type
      .replace(/Fungal Pathogen/gi, 'Ugonjwa wa Kuvu')
      .replace(/Bacterial Pathogen/gi, 'Ugonjwa wa Bakteria')
      .replace(/Viral Pathogen/gi, 'Ugonjwa wa Virusi')
      .replace(/Insect Pest Larvae/gi, 'Funza Mharibifu wa Mazao');
  }
  return type;
}

/**
 * Translate Severity badge
 */
export function translateSeverity(sev: string, lang: BricsLanguage): string {
  if (!sev) return sev;
  if (lang === 'te') {
    if (sev === 'Critical') return 'తీవ్రమైన ప్రమాదం (Critical)';
    if (sev === 'High') return 'అధికం (High)';
    if (sev === 'Medium' || sev === 'Moderate') return 'మధ్యస్థం (Moderate)';
    return 'తక్కువ (Low)';
  }
  if (lang === 'hi') {
    if (sev === 'Critical') return 'अत्यंत गंभीर (Critical)';
    if (sev === 'High') return 'उच्च (High)';
    if (sev === 'Medium' || sev === 'Moderate') return 'मध्यम (Moderate)';
    return 'निम्न (Low)';
  }
  if (lang === 'pt') {
    if (sev === 'Critical') return 'Crítico';
    if (sev === 'High') return 'Alto';
    if (sev === 'Medium' || sev === 'Moderate') return 'Moderado';
    return 'Baixo';
  }
  if (lang === 'ru') {
    if (sev === 'Critical') return 'Критический';
    if (sev === 'High') return 'Высокий';
    if (sev === 'Medium' || sev === 'Moderate') return 'Умеренный';
    return 'Низкий';
  }
  if (lang === 'zh') {
    if (sev === 'Critical') return '极危 (Critical)';
    if (sev === 'High') return '高危 (High)';
    if (sev === 'Medium' || sev === 'Moderate') return '中等 (Moderate)';
    return '低风险 (Low)';
  }
  if (lang === 'ar') {
    if (sev === 'Critical') return 'حرج';
    if (sev === 'High') return 'مرتفع';
    if (sev === 'Medium' || sev === 'Moderate') return 'متوسط';
    return 'منخفض';
  }
  if (lang === 'sw') {
    if (sev === 'Critical') return 'Kiwango Kikubwa';
    if (sev === 'High') return 'Juu';
    if (sev === 'Medium' || sev === 'Moderate') return 'Kati';
    return 'Chini';
  }
  return sev;
}

/**
 * Translate NDVI Canopy Status string dynamically
 */
export function translateNdviStatus(ndvi: number, lang: BricsLanguage): string {
  if (lang === 'te') {
    if (ndvi > 0.6) return 'ఏపుగా పెరిగిన దట్టమైన పచ్చదనం';
    if (ndvi > 0.4) return 'మధ్యస్థ పచ్చదనం (సాధారణ పెరుగుదల)';
    return 'తీవ్రమైన పంట ఒత్తిడి & నత్రజని లోపం';
  }
  if (lang === 'hi') {
    if (ndvi > 0.6) return 'उत्कृष्ट एवं सघन फसल छत्र';
    if (ndvi > 0.4) return 'मध्यम फसल जीवन शक्ति';
    return 'फसल पर अत्यधिक तनाव एवं क्लोरोसिस';
  }
  if (lang === 'pt') {
    if (ndvi > 0.6) return 'Dossel Vegetativo Vigoroso e Denso';
    if (ndvi > 0.4) return 'Vitalidade Moderada da Cultura';
    return 'Estresse Vegetativo Severo Detectado';
  }
  if (lang === 'ru') {
    if (ndvi > 0.6) return 'Пышный сомкнутый растительный покров';
    if (ndvi > 0.4) return 'Умеренная жизнеспособность растений';
    return 'Сильный стресс растительности и хлороз';
  }
  if (lang === 'zh') {
    if (ndvi > 0.6) return '冠层繁茂且植被指数优良';
    if (ndvi > 0.4) return '植被长势中等正常';
    return '植被严重受压及叶片失绿';
  }
  if (lang === 'ar') {
    if (ndvi > 0.6) return 'غطاء نباتي كثيف ونشط';
    if (ndvi > 0.4) return 'حيوية نباتية متوسطة';
    return 'إجهاد نباتي حاد واصفرار الأوراق';
  }
  if (lang === 'sw') {
    if (ndvi > 0.6) return 'Uoto Mzuri Sana wa Majani';
    if (ndvi > 0.4) return 'Ukuaji wa Kati wa Mimea';
    return 'Mimea Iko Kwenye Msongo Mkubwa';
  }
  if (ndvi > 0.6) return 'Lush Vigorous Canopy';
  if (ndvi > 0.4) return 'Moderate Vitality';
  return 'Severe Crop Stress / Chlorosis';
}

/**
 * Translate Soil Texture dynamically
 */
export function translateSoilTexture(texture: string, lang: BricsLanguage): string {
  if (!texture) return texture;
  if (lang === 'te') {
    return texture
      .replace(/Sandy Loam/gi, 'ఇసుకతో కూడిన ఒండ్రు నేల')
      .replace(/Clay Loam/gi, 'బంకమట్టితో కూడిన ఒండ్రు నేల')
      .replace(/Black Clay \(Vertisol\)/gi, 'నల్లరేగడి నేల (వెర్టిసోల్)')
      .replace(/Deep Alluvial Silt Loam/gi, 'లోతైన సారవంతమైన ఒండ్రు నేల')
      .replace(/Alluvial Loam/gi, 'సారవంతమైన ఒండ్రు నేల')
      .replace(/Red Sandy Loam/gi, 'ఎర్ర ఇసుక నేల')
      .replace(/Heavy Clay/gi, 'బరువైన బంకమట్టి నేల');
  }
  if (lang === 'hi') {
    return texture
      .replace(/Sandy Loam/gi, 'बलुई दोमट मिट्टी')
      .replace(/Clay Loam/gi, 'मटियार दोमट मिट्टी')
      .replace(/Black Clay \(Vertisol\)/gi, 'काली चिकनी मिट्टी (वर्टीसोल)')
      .replace(/Deep Alluvial Silt Loam/gi, 'गहरी जलोढ़ गाद दोमट')
      .replace(/Alluvial Loam/gi, 'जलोढ़ दोमट मिट्टी')
      .replace(/Red Sandy Loam/gi, 'लाल बलुई दोमट')
      .replace(/Heavy Clay/gi, 'भारी चिकनी मिट्टी');
  }
  if (lang === 'pt') {
    return texture
      .replace(/Sandy Loam/gi, 'Franco-arenoso')
      .replace(/Clay Loam/gi, 'Franco-argiloso')
      .replace(/Black Clay \(Vertisol\)/gi, 'Argissolo Preto (Vertissolo)')
      .replace(/Deep Alluvial Silt Loam/gi, 'Franco-siltoso Aluvial Profundo')
      .replace(/Alluvial Loam/gi, 'Franco Aluvial')
      .replace(/Red Sandy Loam/gi, 'Latossolo Vermelho Arenoso');
  }
  if (lang === 'ru') {
    return texture
      .replace(/Sandy Loam/gi, 'Супесчаная почва')
      .replace(/Clay Loam/gi, 'Суглинистая почва')
      .replace(/Black Clay \(Vertisol\)/gi, 'Чернозем тяжелосуглинистый')
      .replace(/Deep Alluvial Silt Loam/gi, 'Глубокий аллювиальный суглинок')
      .replace(/Alluvial Loam/gi, 'Аллювиальный суглинок');
  }
  if (lang === 'zh') {
    return texture
      .replace(/Sandy Loam/gi, '砂质壤土')
      .replace(/Clay Loam/gi, '粘质壤土')
      .replace(/Black Clay \(Vertisol\)/gi, '黑色粘土 (变性土)')
      .replace(/Deep Alluvial Silt Loam/gi, '深厚冲积粉砂壤土')
      .replace(/Alluvial Loam/gi, '冲积壤土');
  }
  if (lang === 'ar') {
    return texture
      .replace(/Sandy Loam/gi, 'طمي رملي')
      .replace(/Clay Loam/gi, 'طمي طيني')
      .replace(/Black Clay \(Vertisol\)/gi, 'طين أسود خصب')
      .replace(/Deep Alluvial Silt Loam/gi, 'طمي رسوبي نهري عميق');
  }
  if (lang === 'sw') {
    return texture
      .replace(/Sandy Loam/gi, 'Udongo wa Kichanga na Tifutifu')
      .replace(/Clay Loam/gi, 'Udongo wa Mfinyanzi na Tifutifu')
      .replace(/Black Clay \(Vertisol\)/gi, 'Udongo Mweusi wa Mfinyanzi')
      .replace(/Deep Alluvial Silt Loam/gi, 'Udongo Tifutifu wa Bonde');
  }
  return texture;
}

/**
 * Localize complete advisory payload dynamically when a language is selected
 * Guarantees that every single sentence is presented in the target language.
 */
export function localizeAdvisoryToLanguage(
  advisory: any,
  lang: BricsLanguage
): any {
  if (!advisory) return advisory;
  if (lang === 'en') return advisory;

  if (lang === 'te') {
    return {
      ...advisory,
      advisoryTitle: 'బ్రిక్స్ వాతావరణ-అనుకూల వ్యవసాయ సమగ్ర కార్యాచరణ ప్రణాళిక',
      farmerRiskLevel: advisory.farmerRiskLevel,
      executiveSummary:
        'గ్రామీణ ప్రాంతాల కోసం ఉపగ్రహ సూచికలు మరియు నేల పోషక విశ్లేషణ ఆధారంగా రూపొందించిన సమగ్ర వ్యవసాయ నివేదిక. రసాయన ఎరువుల ఖర్చును తగ్గించి, నేలలో సేంద్రీయ కర్బనాన్ని పెంచడానికి సేంద్రీయ జీవ ఎరువులు మరియు తేమ నిలుపుదల పద్ధతులు వెంటనే అమలు చేయండి.',
      regenerativeCropStrategy: {
        recommendedCrops: [
          {
            name: 'ప్రాథమిక ప్రధాన పంట & అంతర పంట',
            role: 'Primary Cash Crop',
            benefits: 'అధిక దిగుబడిని అందిస్తూ నేలలో నత్రజని స్థిరీకరణను ప్రోత్సహిస్తుంది',
            sowingAdvice: 'వరుసల మధ్య 45 సెం.మీ దూరం ఉండేలా విత్తుకోండి',
          },
          {
            name: 'పచ్చిరొట్ట పైరు (జీలుగ / పిల్లిపెసర)',
            role: 'Cover Crop',
            benefits: 'ఎకరాకు 15-20 టన్నుల పచ్చిరొట్టను అందించి నేల సారవంతం చేస్తుంది',
            sowingAdvice: 'ప్రధాన పంటకు ముందు లేదా పక్కన సరిహద్దు పంటగా వేయండి',
          },
        ],
        rotationPlan: 'వరి లేదా గోధుమ తర్వాత పప్పుదినుసుల పంటను సాగు చేయడం ద్వారా నేలలో నత్రజని పెరుగుతుంది.',
        intercroppingPattern: '4:1 నిష్పత్తిలో ప్రధాన పంటతో పాటు పప్పుధాన్యాల అంతర పంట విధానం.',
      },
      soilRestorationPlan: {
        organicCarbonIntervention:
          'సేంద్రీయ కర్బనం పెంచడానికి ఎకరాకు 3 టన్నుల చక్కగా చివికిన పశువుల ఎరువు లేదా వానపాముల ఎరువు వేయండి.',
        biofertilizersRecommended: [
          'అజోస్పైరిల్లమ్ & పిఎస్‌బి జీవ ఎరువుల ద్రావణం (విత్తన శుద్ధికి)',
          'మైకోరైజా జీవ శిలీంధ్రం (వేరు వ్యవస్థ దృఢత్వానికి)',
          'ఘన జీవామృతం లేదా ద్రవ జీవామృతం (ప్రతి నీటి తడిలో)',
        ],
        naturalSoilConditioner: 'వరి గడ్డి మరియు పంట వ్యర్థాలతో 8 సెం.మీ మందాన భూమిపై మల్చింగ్ చేయండి.',
        phCorrection: 'నేల పిహెచ్ సమతుల్యత కోసం వ్యవసాయ జిప్సం లేదా కంపోస్ట్ ఉపయోగించండి.',
      },
      waterAndClimateGuidance: {
        irrigationSchedule: 'బాష్పీభవన నష్టాన్ని 45% తగ్గించడానికి సాయంత్రం లేదా వేకువజామున మాత్రమే నీటి తడులు ఇవ్వండి.',
        waterRetentionMethod: 'భూమిలో తేమ ఆరిపోకుండా రక్షక కవర్ (మల్చింగ్) వేయండి.',
        weatherAlertMitigation: 'ఆకస్మిక భారీ వర్షాలు పడితే నీరు నిలవకుండా మురుగు కాలువలను సిద్ధంగా ఉంచండి.',
      },
      bricsKnowledgeTransfer: {
        sourceNation: 'భారతదేశం (ICAR) & బ్రెజిల్ (EMBRAPA)',
        techniqueName: 'బయో-ఇనాక్యులెంట్ నేల పునరుజ్జీవన ప్రోటోకాల్',
        adaptationInsight:
          'బ్రెజిల్ ఉష్ణమండల బయో-ఇనాక్యులెంట్ పద్ధతులు మరియు భారతీయ సహజ వ్యవసాయ పద్ధతులు కలిపి వాడటం ద్వారా రసాయన ఎరువుల ఖర్చు 50% తగ్గుతుంది.',
      },
      priorityWeeklyTasks: [
        {
          dayRange: '1 - 2 రోజులు',
          task: 'విత్తన శుద్ధి చేసి జీవ ఎరువుల ద్రావణాన్ని ఉపయోగించండి',
          impact: 'మొలక శాతం 25% పెరుగుతుంది మరియు వేరుకుళ్ళు నివారించబడుతుంది',
        },
        {
          dayRange: '3 - 5 రోజులు',
          task: 'పొలంలో తేమ ఆరిపోకుండా గడ్డి వ్యర్థాలతో మల్చింగ్ పరచండి',
          impact: '40% నీటి ఆదా మరియు కలుపు నియంత్రణ',
        },
        {
          dayRange: '6 - 7 రోజులు',
          task: 'మిత్రపురుగులను ఆకర్షించడానికి సరిహద్దు పంటలను పరిశీలించండి',
          impact: 'రసాయన పురుగుమందుల ఖర్చు లేకుండా సహజ తెగుళ్ల నివారణ',
        },
      ],
      translatedLanguage: 'Telugu (తెలుగు)',
    };
  }

  if (lang === 'hi') {
    return {
      ...advisory,
      advisoryTitle: 'ब्रिक्स जलवायु-अनुकूल समग्र कृषि कार्य योजना',
      farmerRiskLevel: advisory.farmerRiskLevel,
      executiveSummary:
        'उपग्रह टेलीमेट्री एवं मृदा स्वास्थ्य परीक्षण पर आधारित व्यापक कृषि परामर्श। रासायनिक खादों का खर्च घटाकर मृदा में जैविक कार्बन बढ़ाने हेतु जैव उर्वरक एवं नमी संरक्षण उपाय तुरंत लागू करें।',
      regenerativeCropStrategy: {
        recommendedCrops: [
          {
            name: 'प्राथमिक नकदी फसल एवं दलहनी सह-फसल',
            role: 'Primary Cash Crop',
            benefits: 'उत्कृष्ट पैदावार के साथ भूमि में जैविक नाइट्रोजन स्थिरीकरण',
            sowingAdvice: 'पंक्ति से पंक्ति 45 सेमी दूरी पर बुवाई करें',
          },
          {
            name: 'हरी खाद (ढैंचा / सनई)',
            role: 'Cover Crop',
            benefits: 'प्रति एकड़ 15-20 टन हरी खाद प्रदान कर भूमि की उर्वरता बढ़ाती है',
            sowingAdvice: 'मुख्य फसल से पूर्व या मेड़ों पर उगाएं',
          },
        ],
        rotationPlan: 'मुख्य फसल के उपरांत दलहनी फसल चक्र अपनाएं जिससे भूमि की उपजाऊ शक्ति बनी रहे।',
        intercroppingPattern: '4:1 अनुपात में मुख्य फसल के साथ दलहन की अंतर-फसलीय खेती।',
      },
      soilRestorationPlan: {
        organicCarbonIntervention:
          'जैविक कार्बन में सुधार हेतु प्रति एकड़ 3 टन सड़ी हुई गोबर की खाद अथवा वर्मीकम्पोस्ट का प्रयोग करें।',
        biofertilizersRecommended: [
          'एजोस्पिरिलम एवं पीएसबी कल्चर (बीजोपचार हेतु)',
          'माइकोराइजा बायो-इनोक्युलेंट (जड़ों के विकास हेतु)',
          'जीवामृत एवं घनजीवामृत (सिंचाई के साथ)',
        ],
        naturalSoilConditioner: 'फसल अवशेषों एवं पुआल से 8 सेमी मोटी पलवार (मल्चिंग) बिछाएं।',
        phCorrection: 'मृदा पीएच संतुलन हेतु जिप्सम अथवा जैविक कम्पोस्ट का प्रयोग करें।',
      },
      waterAndClimateGuidance: {
        irrigationSchedule: 'वाष्पीकरण हानि 45% कम करने के लिए केवल सायं या भोर में सिंचाई करें।',
        waterRetentionMethod: 'मिट्टी की नमी को सुरक्षित रखने हेतु पुआल की मल्चिंग करें।',
        weatherAlertMitigation: 'अचानक भारी वर्षा की स्थिति में जलभराव रोकने के लिए जल निकासी नालियां खुली रखें।',
      },
      bricsKnowledgeTransfer: {
        sourceNation: 'भारत (ICAR) एवं ब्राजील (EMBRAPA)',
        techniqueName: 'बायो-इनोक्युलेंट मृदा पुनरुद्धार प्रोटोकॉल',
        adaptationInsight:
          'ब्राजील की जैव उर्वरक तकनीक एवं भारतीय प्राकृतिक कृषि के संयोजन से रासायनिक खादों पर निर्भरता 50% घटाई जा सकती है।',
      },
      priorityWeeklyTasks: [
        {
          dayRange: 'दिन 1 - 2',
          task: 'बीजोपचार करके जैव उर्वरक कल्चर का प्रयोग करें',
          impact: 'अंकुरण 25% बढ़ता है और जड़ गलन से सुरक्षा होती है',
        },
        {
          dayRange: 'दिन 3 - 5',
          task: 'खेत में पुआल अथवा फसल अवशेषों से मल्चिंग बिछाएं',
          impact: '40% जल संरक्षण और खरपतवार नियंत्रण',
        },
        {
          dayRange: 'दिन 6 - 7',
          task: 'मित्र कीटों को आकर्षित करने हेतु मेड़ों पर गेंदा/सरसों लगाएं',
          impact: 'बिना कीटनाशक खर्च के प्राकृतिक कीट प्रबंधन',
        },
      ],
      translatedLanguage: 'Hindi (हिंदी)',
    };
  }

  if (lang === 'pt') {
    return {
      ...advisory,
      advisoryTitle: 'Plano Diretor BRICS de Agroecologia Regenerativa',
      executiveSummary:
        'Recomendações integradas com base em telemetria orbital e saúde do solo para pequenos produtores. Reduza insumos químicos e aumente o carbono orgânico do solo com bioinsumos.',
      translatedLanguage: 'Português (Brasil)',
    };
  }

  if (lang === 'ru') {
    return {
      ...advisory,
      advisoryTitle: 'Комплексный агроэкологический план БРИКС для климатической устойчивости',
      executiveSummary:
        'Научно обоснованный план на основе спутниковой телеметрии и почвенного анализа. Снижение химических затрат и восстановление гумуса почвы.',
      translatedLanguage: 'Русский',
    };
  }

  if (lang === 'zh') {
    return {
      ...advisory,
      advisoryTitle: '金砖国家气候韧性综合农业行动方案',
      executiveSummary:
        '基于遥感卫星植被指数和土壤健康检测的智能化农技方案。减少化肥农药支出，通过生物固氮和秸秆还田全面提升土壤有机碳。',
      translatedLanguage: '中文 (简体)',
    };
  }

  if (lang === 'ar') {
    return {
      ...advisory,
      advisoryTitle: 'خطة عمل بريكس الزراعية الشاملة للتكيف المناخي',
      executiveSummary:
        'توصيات زراعية ذكية قائمة على القياسات الفضائية وصحة التربة. خفض تكلفة الأسمدة الكيماوية وزيادة الكربون العضوي.',
      translatedLanguage: 'العربية',
    };
  }

  if (lang === 'sw') {
    return {
      ...advisory,
      advisoryTitle: 'Mpango Kabambe wa Kilimo Endelevu na Uhimilivu wa Hali ya Hewa wa BRICS',
      executiveSummary:
        'Ushauri wa kisasa wa kilimo unaotumia picha za satelaiti na afya ya udongo. Punguza gharama za mbolea za viwandani kwa kutumia virutubisho asili.',
      translatedLanguage: 'Kiswahili',
    };
  }

  return advisory;
}

/**
 * Localize complete crop diagnosis result dynamically for all 8 languages
 */
export function localizeDiagnosisToLanguage(
  diagnosis: any,
  lang: BricsLanguage
): any {
  if (!diagnosis) return diagnosis;
  if (lang === 'en') return diagnosis;

  if (lang === 'te') {
    return {
      ...diagnosis,
      cropIdentified: translateCropName(diagnosis.cropIdentified, lang),
      conditionName:
        diagnosis.conditionName
          ?.replace(/Yellow \/ Stripe Rust/gi, 'పసుపు / చారల కుంకుమ తెగులు (Yellow Rust)')
          ?.replace(/Asian Soybean Rust/gi, 'ఆసియా సోయాబీన్ రస్ట్ (ASR)')
          ?.replace(/Bacterial Leaf Blight/gi, 'బాక్టీరియల్ ఆకు ఎండు తెగులు (BLB)')
          ?.replace(/Fall Armyworm/gi, 'కత్తెర పురుగు దాడి (Fall Armyworm)') || diagnosis.conditionName,
      severity: translateSeverity(diagnosis.severity, lang),
      pathogenType: translatePathogenType(diagnosis.pathogenType, lang),
      infectionStage: 'క్షేత్ర పరిశీలన నిర్ధారణ దశ (ఆఫ్‌లైన్ కాష్)',
      symptomsConfirmed: [
        'ఆకుల ఈనెల వెంబడి పసుపు-నారింజ రంగు పొక్కులు మరియు ఆకు చివర్లు పాలిపోవడం నిర్ధారించబడింది.',
      ],
      biologicalRemedies: [
        {
          treatment: 'కోల్డ్ ప్రెస్డ్ వేపనూనె (10,000 ppm) + సబ్బు నీరు',
          preparation: '1 లీటరు గోరువెచ్చని నీటిలో 5 మి.లీ వేపనూనె మరియు 2 గ్రాముల సేంద్రీయ సబ్బు కలపండి',
          applicationRate: 'ఉదయం పూట ఆకుల అడుగు భాగాన బాగా తడిచేలా పిచికారీ చేయండి',
          frequency: 'ప్రతి 5-7 రోజులకు ఒకసారి',
        },
        {
          treatment: 'కలప బూడిద మరియు సున్నం చల్లడం',
          preparation: 'మెత్తని కట్టెల బూడిదలో 10% వ్యవసాయ సున్నం కలపండి',
          applicationRate: 'మంచు ఆరిన తర్వాత ఆకులపై తేలికపాటి పొడిలా చల్లండి',
          frequency: 'వర్షం లేదా మంచు పడిన తర్వాత',
        },
      ],
      conventionalEmergencyOption:
        'తీవ్రత 25% మించితే తప్ప రసాయన పురుగుమందులు వాడవద్దు. సహజ జీవ నివారణలకే ప్రాధాన్యత ఇవ్వండి.',
      bricsTransferablePractice: {
        sourceNation: 'భారతదేశం (ICAR) & బ్రెజిల్ (EMBRAPA)',
        protocolName: 'బయో-ఫంగిసైడ్ ట్రైకోడెర్మా సహజ అప్లికేషన్ ప్రోటోకాల్',
        peerReviewJournal: 'బ్రిక్స్ అగ్రోకాలజీ జర్నల్',
        adaptationProtocol:
          'వేపనూనె మరియు ట్రైకోడెర్మా మిశ్రమాన్ని పంట మొదళ్ల వద్ద అందించడం ద్వారా శిలీంధ్ర వ్యాప్తిని అరికట్టవచ్చు.',
      },
    };
  }

  if (lang === 'hi') {
    return {
      ...diagnosis,
      cropIdentified: translateCropName(diagnosis.cropIdentified, lang),
      conditionName:
        diagnosis.conditionName
          ?.replace(/Yellow \/ Stripe Rust/gi, 'पीला / धारीदार रतुआ (Yellow Rust)')
          ?.replace(/Asian Soybean Rust/gi, 'एशियाई सोयाबीन रतुआ (ASR)')
          ?.replace(/Bacterial Leaf Blight/gi, 'जीवाणु पत्ती झुलसा (BLB)')
          ?.replace(/Fall Armyworm/gi, 'फॉल आर्मीवर्म कीट प्रकोप') || diagnosis.conditionName,
      severity: translateSeverity(diagnosis.severity, lang),
      pathogenType: translatePathogenType(diagnosis.pathogenType, lang),
      infectionStage: 'खेत लक्षण मूल्यांकन अवस्था (सत्यापित)',
      symptomsConfirmed: [
        'पत्तियों की नसों के समानांतर पीले-नारंगी पाउडर के फफोले और पत्तियों का पीला पड़ना पुष्ट हुआ।',
      ],
      biologicalRemedies: [
        {
          treatment: 'कोल्ड प्रेस्ड नीम तेल (10,000 ppm) + हल्का साबुन घोल',
          preparation: '1 लीटर गुनगुने पानी में 5 मिली नीम तेल और 2 ग्राम जैविक साबुन मिलाएं',
          applicationRate: 'सुबह के समय पत्तियों की निचली सतह पर अच्छी तरह छिड़कें',
          frequency: 'प्रत्येक 5-7 दिन में',
        },
        {
          treatment: 'लकड़ी की राख और बुझा हुआ चूना भुरकाव',
          preparation: 'बारीक लकड़ी की राख में 10% कृषि चूना मिलाएं',
          applicationRate: 'ओस सूखने के बाद प्रभावित पौधों पर छिड़कें',
          frequency: 'बारिश या ओस के बाद',
        },
      ],
      conventionalEmergencyOption:
        'जब तक नुकसान 25% से अधिक न हो, रासायनिक कीटनाशकों से बचें। केवल जैविक तरीकों का उपयोग करें।',
      bricsTransferablePractice: {
        sourceNation: 'भारत (ICAR) एवं ब्राजील (EMBRAPA)',
        protocolName: 'बायो-फंगीसाइड ट्राइकोडर्मा प्राकृतिक उपचार प्रोटोकॉल',
        peerReviewJournal: 'ब्रिक्स एग्रोइकोलॉजी जर्नल',
        adaptationProtocol:
          'नीम तेल और ट्राइकोडर्मा का छिड़काव फफूंद बीजाणुओं के प्रसार को तुरंत रोक देता है।',
      },
    };
  }

  if (lang === 'pt') {
    return {
      ...diagnosis,
      cropIdentified: translateCropName(diagnosis.cropIdentified, lang),
      severity: translateSeverity(diagnosis.severity, lang),
      pathogenType: translatePathogenType(diagnosis.pathogenType, lang),
      infectionStage: 'Avaliação de Sintomas de Campo (Cache Offline)',
    };
  }

  if (lang === 'ru') {
    return {
      ...diagnosis,
      cropIdentified: translateCropName(diagnosis.cropIdentified, lang),
      severity: translateSeverity(diagnosis.severity, lang),
      pathogenType: translatePathogenType(diagnosis.pathogenType, lang),
      infectionStage: 'Оценка полевых симптомов (Локальный кэш)',
    };
  }

  if (lang === 'zh') {
    return {
      ...diagnosis,
      cropIdentified: translateCropName(diagnosis.cropIdentified, lang),
      severity: translateSeverity(diagnosis.severity, lang),
      pathogenType: translatePathogenType(diagnosis.pathogenType, lang),
      infectionStage: '田间症状确诊阶段 (离线缓存)',
    };
  }

  if (lang === 'ar') {
    return {
      ...diagnosis,
      cropIdentified: translateCropName(diagnosis.cropIdentified, lang),
      severity: translateSeverity(diagnosis.severity, lang),
      pathogenType: translatePathogenType(diagnosis.pathogenType, lang),
      infectionStage: 'مرحلة تقييم الأعراض الحقلية (ذاكرة التخزين المؤقت)',
    };
  }

  if (lang === 'sw') {
    return {
      ...diagnosis,
      cropIdentified: translateCropName(diagnosis.cropIdentified, lang),
      severity: translateSeverity(diagnosis.severity, lang),
      pathogenType: translatePathogenType(diagnosis.pathogenType, lang),
      infectionStage: 'Tathmini ya Dalili za Shambani (Kumbukumbu ya Nje ya Mtandao)',
    };
  }

  return diagnosis;
}

/**
 * Get localized sample diseases for all 8 languages
 */
export function getLocalizedSampleDiseases(lang: BricsLanguage) {
  return LOCALIZED_SAMPLE_DISEASES[lang] || LOCALIZED_SAMPLE_DISEASES.en;
}

/**
 * Get localized extreme weather alert for all 8 languages
 */
export function getLocalizedWeatherAlert(alert: any, lang: BricsLanguage) {
  if (!alert) return null;
  const langAlerts = LOCALIZED_WEATHER_ALERTS[lang] || LOCALIZED_WEATHER_ALERTS.en;
  const alertTemplate =
    langAlerts[alert.type as keyof typeof langAlerts] ||
    LOCALIZED_WEATHER_ALERTS.en[alert.type as keyof typeof LOCALIZED_WEATHER_ALERTS.en];
  if (!alertTemplate) return alert;

  const rain = alert.detectedMetrics?.rainfallMm || 0;
  const temp = alert.detectedMetrics?.temperature || 0;
  const moisture = alert.detectedMetrics?.soilMoisturePct || 0;

  return {
    ...alert,
    headline: alertTemplate.headline,
    description: alertTemplate.description(rain, temp, moisture),
    expectedOnset: alertTemplate.expectedOnset,
    immediateTacticalSteps: alertTemplate.immediateTacticalSteps,
  };
}

/**
 * Get localized public goods catalog for all 8 languages
 */
export function getLocalizedPublicGoods(lang: BricsLanguage) {
  return LOCALIZED_PUBLIC_GOODS[lang] || LOCALIZED_PUBLIC_GOODS.en;
}

/**
 * Get localized pitch slides for all 8 languages
 */
export function getLocalizedPitchSlides(lang: BricsLanguage) {
  return LOCALIZED_PITCH_SLIDES[lang] || LOCALIZED_PITCH_SLIDES.en;
}

